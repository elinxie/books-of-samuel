#!/usr/bin/env python3
"""Build clean, structured JSON for 1 & 2 Samuel in two public-domain translations.

Sources (both extracted from npm tarballs, not fetched by this script):

  KJV  https://www.npmjs.com/package/bible-kjv (MIT license)
       One JSON array of verse strings per chapter, at
       ``dist/resources/<canon-order>/<chapter>.json``. Verse strings carry
       lightweight inline markup:

           <FI>word<Fi>   translator-supplied words (italicized in print)
           <RF>note<Rf>   marginal note / cross-rendering
           <CM>           paragraph break after this verse (pilcrow in print)

  WEB  https://www.npmjs.com/package/world-english-bible
       One JSON array of "event" objects per book, at
       ``json/<bookname>.json``, in document order. Text-bearing events
       (``paragraph text`` / ``line text``) carry chapterNumber, verseNumber
       and a value fragment; a verse's text can be split across several
       consecutive text events (paragraph splits, poetry lines) which this
       script re-assembles. Structural events (``paragraph start/end``,
       ``stanza start/end``, ``line break``) carry no text and are used only
       to detect paragraph boundaries (see ``_web_para`` below).

This script emits, under ``data/``:

    books.json              cross-translation index
    kjv/1-samuel.json       kjv/2-samuel.json
    web/1-samuel.json       web/2-samuel.json

Verse objects use ``text`` for clean plain text. KJV verses with
translator-supplied words also get ``fmt``: the same text with those words in
[brackets] (the traditional plain-text stand-in for KJV italics). Marginal
notes land in ``notes``. A trailing paragraph break sets ``para``.

Usage:
    curl -sSO https://registry.npmjs.org/bible-kjv/-/bible-kjv-1.1.3.tgz
    tar xzf bible-kjv-1.1.3.tgz
    curl -sSO https://registry.npmjs.org/world-english-bible/-/world-english-bible-1.0.1.tgz
    tar xzf world-english-bible-1.0.1.tgz -C web-pkg
    python3 scripts/build_data.py --kjv package/dist/resources --web web-pkg/package/json
"""

import argparse
import json
import pathlib
import re
import sys

REPO_ROOT = pathlib.Path(__file__).resolve().parent.parent

BOOKS = [
    {
        "slug": "1-samuel",
        "book": "1 Samuel",
        "osisId": "1Sam",
        "canonOrder": 9,
        "chapters": 31,
        "kjv_title": "The First Book of Samuel, otherwise called The First Book of the Kings",
        "web_title": "The First Book of Samuel",
        "web_file": "1samuel.json",
    },
    {
        "slug": "2-samuel",
        "book": "2 Samuel",
        "osisId": "2Sam",
        "canonOrder": 10,
        "chapters": 24,
        "kjv_title": "The Second Book of Samuel, otherwise called The Second Book of the Kings",
        "web_title": "The Second Book of Samuel",
        "web_file": "2samuel.json",
    },
]

WS_RE = re.compile(r"\s+")
RF_RE = re.compile(r"<RF>(.*?)<Rf>")


def norm(s: str) -> str:
    """Collapse all whitespace runs to a single space and trim."""
    return WS_RE.sub(" ", s).strip()


# --------------------------------------------------------------------------
# KJV (bible-kjv)
# --------------------------------------------------------------------------


def parse_kjv_verse(raw: str) -> dict:
    """Parse one raw KJV verse string into a verse dict (without ``v``)."""
    notes = [norm(n) for n in RF_RE.findall(raw)]
    s = RF_RE.sub("", raw)

    para = "<CM>" in s
    s = s.replace("<CM>", "")

    has_added = "<FI>" in s
    fmt = norm(s.replace("<FI>", "[").replace("<Fi>", "]"))
    text = norm(s.replace("<FI>", "").replace("<Fi>", ""))

    for out in (text, fmt):
        if "<" in out or ">" in out:
            raise ValueError(f"unhandled markup in KJV verse: {raw!r}")
    if not text:
        raise ValueError(f"empty KJV verse text: {raw!r}")

    verse = {"text": text}
    if has_added:
        verse["fmt"] = fmt
    if notes:
        verse["notes"] = notes
    if para:
        verse["para"] = True
    return verse


def build_kjv_book(meta: dict, resources_dir: pathlib.Path) -> dict:
    src = resources_dir / str(meta["canonOrder"])
    chapters = []
    for ch in range(1, meta["chapters"] + 1):
        chapter_path = src / f"{ch}.json"
        raw_verses = json.loads(chapter_path.read_text(encoding="utf-8"))
        verses = []
        for i, raw in enumerate(raw_verses, start=1):
            verse = {"v": i}
            verse.update(parse_kjv_verse(raw))
            verses.append(verse)
        chapters.append({"chapter": ch, "verses": verses})
    return {
        "book": meta["book"],
        "slug": meta["slug"],
        "title": meta["kjv_title"],
        "osisId": meta["osisId"],
        "canonOrder": meta["canonOrder"],
        "translation": "KJV",
        "chapters": chapters,
    }


# --------------------------------------------------------------------------
# WEB (world-english-bible)
# --------------------------------------------------------------------------

WEB_TEXT_TYPES = {"paragraph text", "line text"}
WEB_END_TYPES = {"paragraph end", "stanza end"}
WEB_DISALLOWED_CHARS = ("<", ">", "{", "}")


def _web_group_events(events: list) -> list:
    """Group consecutive text events sharing the same (chapter, verse).

    Structural events (paragraph/stanza start-end, line break) are skipped
    when deciding adjacency: two text events for the same verse remain in
    one group even if e.g. a ``paragraph end``/``paragraph start`` pair (a
    verse whose text is split across a paragraph boundary) sits between
    them. A verse's text never resumes after a *different* verse's text has
    appeared, which this function's caller double-checks.
    """
    groups = []
    cur_key = None
    cur_indices = []
    for idx, ev in enumerate(events):
        if ev.get("type") not in WEB_TEXT_TYPES:
            continue
        value = ev.get("value", "")
        for ch in WEB_DISALLOWED_CHARS:
            if ch in value:
                raise ValueError(
                    f"unhandled markup {ch!r} in WEB "
                    f"{ev.get('chapterNumber')}:{ev.get('verseNumber')}: {value!r}"
                )
        key = (ev["chapterNumber"], ev["verseNumber"])
        if key == cur_key:
            cur_indices.append(idx)
        else:
            if cur_key is not None:
                groups.append((cur_key, cur_indices))
            cur_key = key
            cur_indices = [idx]
    if cur_key is not None:
        groups.append((cur_key, cur_indices))
    return groups


def _web_para(events: list, indices: list) -> bool:
    """Does a paragraph/stanza end follow this verse's last real text event?

    We look past trailing "line break" events (pure line-wrap hints inside a
    stanza, not boundaries) and past any trailing zero-content text event for
    the *same* verse (an artifact of how the source package represents the
    blank carry-over line at the start of a new stanza -- it tags a
    whitespace-only fragment with the *previous* verse number). What we want
    is: does the verse's last event with actual content end a formatting
    block?
    """
    nonempty = [i for i in indices if norm(events[i].get("value", ""))]
    last_idx = nonempty[-1] if nonempty else indices[-1]
    j = last_idx + 1
    while j < len(events) and events[j]["type"] == "line break":
        j += 1
    return j < len(events) and events[j]["type"] in WEB_END_TYPES


def build_web_book(meta: dict, json_dir: pathlib.Path) -> dict:
    path = json_dir / meta["web_file"]
    events = json.loads(path.read_text(encoding="utf-8"))

    groups = _web_group_events(events)

    seen_keys = set()
    by_chapter: dict = {}
    for key, indices in groups:
        if key in seen_keys:
            # Would indicate a verse's text resuming non-contiguously, which
            # the aggregation rule above does not expect.
            raise ValueError(f"WEB verse {key} split across non-adjacent groups")
        seen_keys.add(key)

        chapter_num, verse_num = key
        text = norm(" ".join(events[i]["value"] for i in indices))
        if not text:
            raise ValueError(f"empty WEB verse text at {chapter_num}:{verse_num}")

        verse = {"v": verse_num, "text": text}
        if _web_para(events, indices):
            verse["para"] = True
        by_chapter.setdefault(chapter_num, []).append(verse)

    chapters = []
    for ch in range(1, meta["chapters"] + 1):
        verses = by_chapter.get(ch)
        if not verses:
            raise ValueError(f"missing WEB chapter {ch} for {meta['book']}")
        verses.sort(key=lambda v: v["v"])
        expected = list(range(1, len(verses) + 1))
        actual = [v["v"] for v in verses]
        if actual != expected:
            raise ValueError(
                f"WEB {meta['book']} chapter {ch} verse numbers not contiguous: {actual}"
            )
        chapters.append({"chapter": ch, "verses": verses})

    extra_chapters = sorted(set(by_chapter) - set(range(1, meta["chapters"] + 1)))
    if extra_chapters:
        raise ValueError(f"unexpected WEB chapters for {meta['book']}: {extra_chapters}")

    return {
        "book": meta["book"],
        "slug": meta["slug"],
        "title": meta["web_title"],
        "osisId": meta["osisId"],
        "canonOrder": meta["canonOrder"],
        "translation": "WEB",
        "chapters": chapters,
    }


# --------------------------------------------------------------------------
# Index + driver
# --------------------------------------------------------------------------


def build_index(kjv_books: list, web_books: list, web_license: str) -> dict:
    books_index = []
    for meta, kb, wb in zip(BOOKS, kjv_books, web_books):
        kjv_cv = [len(c["verses"]) for c in kb["chapters"]]
        web_cv = [len(c["verses"]) for c in wb["chapters"]]
        books_index.append(
            {
                "slug": meta["slug"],
                "name": meta["book"],
                "osisId": meta["osisId"],
                "canonOrder": meta["canonOrder"],
                "chapters": meta["chapters"],
                "verses": {"kjv": sum(kjv_cv), "web": sum(web_cv)},
                "chapterVerses": {"kjv": kjv_cv, "web": web_cv},
                "files": {
                    "kjv": f"kjv/{meta['slug']}.json",
                    "web": f"web/{meta['slug']}.json",
                },
            }
        )
    return {
        "translations": [
            {
                "abbrev": "KJV",
                "name": "King James Version",
                "year": 1611,
                "rights": "Public domain",
                "source": {
                    "package": "bible-kjv",
                    "version": "1.1.3",
                    "registry": "https://www.npmjs.com/package/bible-kjv",
                    "license": "MIT",
                },
            },
            {
                "abbrev": "WEB",
                "name": "World English Bible",
                "rights": "Public domain",
                "source": {
                    "package": "world-english-bible",
                    "version": "1.0.1",
                    "registry": "https://www.npmjs.com/package/world-english-bible",
                    "license": web_license,
                },
            },
        ],
        "books": books_index,
    }


def write_json(path: pathlib.Path, obj: dict) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(json.dumps(obj, ensure_ascii=False, indent=1) + "\n", encoding="utf-8")


def main() -> None:
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument(
        "--kjv",
        required=True,
        type=pathlib.Path,
        help="path to the bible-kjv package's dist/resources directory",
    )
    ap.add_argument(
        "--web",
        required=True,
        type=pathlib.Path,
        help="path to the world-english-bible package's json directory",
    )
    ap.add_argument(
        "--web-license",
        default="UNLICENSED",
        help=(
            "license string to record for the world-english-bible npm package "
            "in data/books.json (default: %(default)s, matching its package.json; "
            "this describes the package's own code, not the public-domain WEB "
            "text -- see README)"
        ),
    )
    args = ap.parse_args()

    if not args.kjv.is_dir():
        sys.exit(f"--kjv path is not a directory: {args.kjv}")
    if not args.web.is_dir():
        sys.exit(f"--web path is not a directory: {args.web}")

    out_dir = REPO_ROOT / "data"

    kjv_books = []
    web_books = []
    for meta in BOOKS:
        kb = build_kjv_book(meta, args.kjv)
        kjv_books.append(kb)
        kjv_path = out_dir / "kjv" / f"{meta['slug']}.json"
        write_json(kjv_path, kb)
        kjv_verses = sum(len(c["verses"]) for c in kb["chapters"])
        print(f"wrote {kjv_path} ({kjv_verses} verses in {len(kb['chapters'])} chapters)")

        wb = build_web_book(meta, args.web)
        web_books.append(wb)
        web_path = out_dir / "web" / f"{meta['slug']}.json"
        write_json(web_path, wb)
        web_verses = sum(len(c["verses"]) for c in wb["chapters"])
        print(f"wrote {web_path} ({web_verses} verses in {len(wb['chapters'])} chapters)")

    index = build_index(kjv_books, web_books, args.web_license)
    index_path = out_dir / "books.json"
    write_json(index_path, index)
    print(f"wrote {index_path}")


if __name__ == "__main__":
    main()
