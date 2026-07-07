#!/usr/bin/env python3
"""Validate the structured scripture data under ``data/``.

Runs a battery of hard assertions against the KJV and WEB JSON produced by
``build_data.py`` (chapter/verse counts, contiguous verse numbering, no
leftover markup, fmt/text bracket consistency, a handful of known-text spot
checks, and cross-checks against ``data/books.json``). Also prints a
chapter-by-chapter WEB-vs-KJV verse count diff table for visibility (WEB
versification can legitimately differ slightly from KJV; this only *fails*
the run if some chapter differs by more than 2 verses, which would point to
a parsing bug rather than a genuine versification difference).

Exits non-zero with a clear message if any hard check fails. Prints a
summary table and exits 0 if everything passes.

Usage:
    python3 scripts/validate_data.py [--data-dir data]
"""

import argparse
import json
import pathlib
import sys

REPO_ROOT = pathlib.Path(__file__).resolve().parent.parent

EXPECTED_BOOKS = [
    {"slug": "1-samuel", "name": "1 Samuel", "chapters": 31, "kjv_verses": 810},
    {"slug": "2-samuel", "name": "2 Samuel", "chapters": 24, "kjv_verses": 695},
]

SPOT_CHECKS = [
    # (translation, slug, chapter, verse, field, expected substring)
    ("kjv", "1-samuel", 3, 10, "text", "Speak; for thy servant heareth"),
    ("kjv", "2-samuel", 12, 7, "text", "Thou art the man"),
    ("kjv", "2-samuel", 12, 7, "fmt", "[art]"),
    ("web", "1-samuel", 1, 1, "text", "Ramathaim Zophim"),
    ("web", "1-samuel", 1, 3, "text", "Yahweh of Armies"),
]

MARKUP_CHARS = ("<", ">")

errors = []
warnings = []


def fail(msg: str) -> None:
    errors.append(msg)


def load(path: pathlib.Path):
    if not path.is_file():
        fail(f"missing file: {path}")
        return None
    try:
        return json.loads(path.read_text(encoding="utf-8"))
    except json.JSONDecodeError as e:
        fail(f"invalid JSON in {path}: {e}")
        return None


def check_book(translation: str, expected: dict, data_dir: pathlib.Path) -> dict:
    """Validate one book/translation file; returns it (or None on load failure)."""
    path = data_dir / translation / f"{expected['slug']}.json"
    book = load(path)
    if book is None:
        return None

    label = f"{translation.upper()} {expected['name']}"

    for key in ("book", "slug", "title", "osisId", "canonOrder", "translation", "chapters"):
        if key not in book:
            fail(f"{label}: missing top-level key {key!r}")

    if book.get("slug") != expected["slug"]:
        fail(f"{label}: slug mismatch: {book.get('slug')!r} != {expected['slug']!r}")

    chapters = book.get("chapters", [])
    if len(chapters) != expected["chapters"]:
        fail(
            f"{label}: expected {expected['chapters']} chapters, found {len(chapters)}"
        )

    total_verses = 0
    for c in chapters:
        ch_num = c.get("chapter")
        verses = c.get("verses", [])
        total_verses += len(verses)

        verse_nums = [v.get("v") for v in verses]
        expected_nums = list(range(1, len(verses) + 1))
        if verse_nums != expected_nums:
            fail(
                f"{label} ch.{ch_num}: verse numbers not contiguous from 1: {verse_nums}"
            )

        for v in verses:
            text = v.get("text", "")
            if not text:
                fail(f"{label} {ch_num}:{v.get('v')}: empty text")
            for field in ("text", "fmt"):
                val = v.get(field)
                if val is None:
                    continue
                for ch in MARKUP_CHARS:
                    if ch in val:
                        fail(f"{label} {ch_num}:{v.get('v')}: markup {ch!r} in {field}: {val!r}")
            for note in v.get("notes", []) or []:
                for ch in MARKUP_CHARS:
                    if ch in note:
                        fail(f"{label} {ch_num}:{v.get('v')}: markup {ch!r} in note: {note!r}")
            if "fmt" in v:
                stripped = v["fmt"].replace("[", "").replace("]", "")
                if stripped != v["text"]:
                    fail(
                        f"{label} {ch_num}:{v.get('v')}: fmt/text mismatch beyond "
                        f"brackets:\n  fmt (brackets stripped) = {stripped!r}\n"
                        f"  text                    = {v['text']!r}"
                    )

    if translation == "kjv" and total_verses != expected["kjv_verses"]:
        fail(
            f"{label}: expected {expected['kjv_verses']} total verses, found {total_verses}"
        )

    return book


def check_web_markup(book: dict, label: str) -> None:
    """WEB-specific: no markup characters ``<``, ``>``, ``{``, ``}`` anywhere."""
    for c in book.get("chapters", []):
        for v in c.get("verses", []):
            for field in ("text",):
                val = v.get(field, "")
                for ch in ("<", ">", "{", "}"):
                    if ch in val:
                        fail(f"{label} {c.get('chapter')}:{v.get('v')}: markup {ch!r} in {field}")


def chapter_verse_counts(book: dict) -> list:
    return [len(c.get("verses", [])) for c in book.get("chapters", [])]


def run_spot_checks(loaded: dict) -> None:
    for translation, slug, chapter, verse, field, expected_substr in SPOT_CHECKS:
        book = loaded.get((translation, slug))
        if book is None:
            fail(f"spot check skipped (book failed to load): {translation} {slug}")
            continue
        chapters = book.get("chapters", [])
        if chapter - 1 >= len(chapters):
            fail(f"spot check: {translation} {slug} has no chapter {chapter}")
            continue
        verses = chapters[chapter - 1].get("verses", [])
        if verse - 1 >= len(verses):
            fail(f"spot check: {translation} {slug} {chapter} has no verse {verse}")
            continue
        v = verses[verse - 1]
        val = v.get(field)
        ok = val is not None and expected_substr in val
        status = "ok" if ok else "FAIL"
        print(
            f"  spot check [{status}] {translation.upper()} {slug} {chapter}:{verse} "
            f"{field} contains {expected_substr!r}"
        )
        if not ok:
            fail(
                f"spot check failed: {translation.upper()} {slug} {chapter}:{verse} "
                f"{field}={val!r} does not contain {expected_substr!r}"
            )


def check_books_index(data_dir: pathlib.Path, loaded: dict) -> None:
    index = load(data_dir / "books.json")
    if index is None:
        return

    translations = {t.get("abbrev"): t for t in index.get("translations", [])}
    for abbrev in ("KJV", "WEB"):
        if abbrev not in translations:
            fail(f"books.json: missing translations entry for {abbrev}")

    by_slug = {b.get("slug"): b for b in index.get("books", [])}
    for expected in EXPECTED_BOOKS:
        slug = expected["slug"]
        entry = by_slug.get(slug)
        if entry is None:
            fail(f"books.json: missing books[] entry for {slug}")
            continue

        if entry.get("chapters") != expected["chapters"]:
            fail(
                f"books.json {slug}: chapters={entry.get('chapters')} != {expected['chapters']}"
            )

        kjv_book = loaded.get(("kjv", slug))
        web_book = loaded.get(("web", slug))
        if kjv_book is not None:
            actual_kjv_cv = chapter_verse_counts(kjv_book)
            if entry.get("chapterVerses", {}).get("kjv") != actual_kjv_cv:
                fail(f"books.json {slug}: chapterVerses.kjv does not match kjv/{slug}.json")
            if entry.get("verses", {}).get("kjv") != sum(actual_kjv_cv):
                fail(f"books.json {slug}: verses.kjv does not match kjv/{slug}.json total")
        if web_book is not None:
            actual_web_cv = chapter_verse_counts(web_book)
            if entry.get("chapterVerses", {}).get("web") != actual_web_cv:
                fail(f"books.json {slug}: chapterVerses.web does not match web/{slug}.json")
            if entry.get("verses", {}).get("web") != sum(actual_web_cv):
                fail(f"books.json {slug}: verses.web does not match web/{slug}.json total")

        for translation in ("kjv", "web"):
            expected_file = f"{translation}/{slug}.json"
            if entry.get("files", {}).get(translation) != expected_file:
                fail(
                    f"books.json {slug}: files.{translation}="
                    f"{entry.get('files', {}).get(translation)!r} != {expected_file!r}"
                )


def print_diff_table(loaded: dict) -> None:
    print("\nWEB vs KJV per-chapter verse counts:")
    any_diff = False
    for expected in EXPECTED_BOOKS:
        slug = expected["slug"]
        kjv_book = loaded.get(("kjv", slug))
        web_book = loaded.get(("web", slug))
        if kjv_book is None or web_book is None:
            continue
        kjv_cv = chapter_verse_counts(kjv_book)
        web_cv = chapter_verse_counts(web_book)
        diffs = [
            (i + 1, k, w)
            for i, (k, w) in enumerate(zip(kjv_cv, web_cv))
            if k != w
        ]
        if not diffs:
            print(f"  {expected['name']}: no differences ({len(kjv_cv)} chapters)")
            continue
        any_diff = True
        print(f"  {expected['name']}:")
        print(f"    {'chapter':>7}  {'kjv':>4}  {'web':>4}  {'diff':>4}")
        for ch, k, w in diffs:
            d = w - k
            print(f"    {ch:>7}  {k:>4}  {w:>4}  {d:>+4}")
            if abs(d) > 2:
                fail(
                    f"{expected['name']} chapter {ch}: KJV/WEB verse counts differ by "
                    f"{abs(d)} (kjv={k}, web={w}) -- exceeds the +/-2 tolerance, likely a parsing bug"
                )
    if not any_diff:
        print("  (KJV and WEB have identical per-chapter verse counts for 1 & 2 Samuel)")


def print_summary(loaded: dict) -> None:
    print("\nSummary:")
    header = f"  {'book':<10} {'kjv chapters':>12} {'kjv verses':>10} {'web chapters':>12} {'web verses':>10}"
    print(header)
    for expected in EXPECTED_BOOKS:
        slug = expected["slug"]
        kjv_book = loaded.get(("kjv", slug))
        web_book = loaded.get(("web", slug))
        kjv_ch = len(kjv_book["chapters"]) if kjv_book else "-"
        kjv_v = sum(chapter_verse_counts(kjv_book)) if kjv_book else "-"
        web_ch = len(web_book["chapters"]) if web_book else "-"
        web_v = sum(chapter_verse_counts(web_book)) if web_book else "-"
        print(f"  {expected['name']:<10} {kjv_ch:>12} {kjv_v:>10} {web_ch:>12} {web_v:>10}")


def main() -> None:
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument(
        "--data-dir",
        default=REPO_ROOT / "data",
        type=pathlib.Path,
        help="path to the data/ directory to validate (default: %(default)s)",
    )
    args = ap.parse_args()
    data_dir = args.data_dir

    loaded = {}
    for translation in ("kjv", "web"):
        for expected in EXPECTED_BOOKS:
            book = check_book(translation, expected, data_dir)
            if book is not None:
                loaded[(translation, expected["slug"])] = book
                if translation == "web":
                    check_web_markup(book, f"WEB {expected['name']}")

    print("Spot checks:")
    run_spot_checks(loaded)

    check_books_index(data_dir, loaded)

    print_diff_table(loaded)

    if errors:
        print(f"\n{len(errors)} VALIDATION FAILURE(S):", file=sys.stderr)
        for e in errors:
            print(f"  - {e}", file=sys.stderr)
        sys.exit(1)

    print_summary(loaded)
    print("\nAll validation checks passed.")


if __name__ == "__main__":
    main()
