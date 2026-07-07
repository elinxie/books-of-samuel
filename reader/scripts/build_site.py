#!/usr/bin/env python3
"""Build the single-file web reader (``index.html``) from ``web/template.html``
and the structured JSON under ``data/``.

The template contains a placeholder comment, ``/*__DATA__*/``, inside an
inline ``<script>`` tag. This script replaces that placeholder with a
``const DATA = {...};`` statement holding a compact form of all four book
files plus a small translations index, then writes the result to
``index.html`` at the repo root. The output is a single self-contained
HTML file: no external requests, works from ``file://`` and GitHub Pages.

Per-verse compact form (a plain JSON array, not an object, to keep the
payload small): ``[v, displayText, notes?, para?]``

  - ``v``: verse number (int)
  - ``displayText``: ``fmt`` if the source verse had one, else ``text``.
    Translator-supplied words are still marked with [[brackets]]; the
    reader's JS renders those as <em> and strips the brackets.
  - ``notes`` (optional, only present when non-empty): array of note strings
  - ``para`` (optional, only present when true): literal ``true``

  The two optional trailing elements are identified by type (an array is
  notes, the literal ``true`` is para) so either, both, or neither may be
  omitted -- e.g. ``[12, "some text"]``, ``[12, "some text", true]``,
  ``[12, "some text", ["a note"]]``, ``[12, "some text", ["a note"], true]``.

Usage:
    python3 scripts/build_data.py --kjv <...> --web <...>   # first
    python3 scripts/build_site.py
"""

import json
import pathlib

REPO_ROOT = pathlib.Path(__file__).resolve().parent.parent
DATA_DIR = REPO_ROOT / "data"
TEMPLATE_PATH = REPO_ROOT / "web" / "template.html"
OUTPUT_PATH = REPO_ROOT / "index.html"

PLACEHOLDER = "/*__DATA__*/"


def compact_verse(v: dict) -> list:
    display = v.get("fmt", v["text"])
    out = [v["v"], display]
    if v.get("notes"):
        out.append(v["notes"])
    if v.get("para"):
        out.append(True)
    return out


def load_book_text(path: pathlib.Path):
    book = json.loads(path.read_text(encoding="utf-8"))
    chapters = [[compact_verse(v) for v in c["verses"]] for c in book["chapters"]]
    return chapters, book["title"]


def build_payload() -> dict:
    index = json.loads((DATA_DIR / "books.json").read_text(encoding="utf-8"))

    books_payload = []
    for b in index["books"]:
        kjv_chapters, kjv_title = load_book_text(REPO_ROOT / "data" / b["files"]["kjv"])
        web_chapters, web_title = load_book_text(REPO_ROOT / "data" / b["files"]["web"])
        books_payload.append(
            {
                "slug": b["slug"],
                "name": b["name"],
                "osisId": b["osisId"],
                "chapterCount": b["chapters"],
                "titles": {"KJV": kjv_title, "WEB": web_title},
                "chapters": {"KJV": kjv_chapters, "WEB": web_chapters},
            }
        )

    translations = [
        {"abbrev": t["abbrev"], "name": t["name"]} for t in index["translations"]
    ]

    return {"translations": translations, "books": books_payload}


def main() -> None:
    if not DATA_DIR.is_dir():
        raise SystemExit(f"data directory not found: {DATA_DIR} (run build_data.py first)")
    if not TEMPLATE_PATH.is_file():
        raise SystemExit(f"template not found: {TEMPLATE_PATH}")

    payload = build_payload()
    payload_json = json.dumps(payload, ensure_ascii=False, separators=(",", ":"))
    # Guard against a stray "</script>" inside embedded text prematurely
    # closing the inline <script> tag.
    payload_json = payload_json.replace("</", "<\\/")

    template = TEMPLATE_PATH.read_text(encoding="utf-8")
    if PLACEHOLDER not in template:
        raise SystemExit(f"placeholder {PLACEHOLDER!r} not found in {TEMPLATE_PATH}")

    html = template.replace(PLACEHOLDER, "const DATA = " + payload_json + ";")
    OUTPUT_PATH.write_text(html, encoding="utf-8")
    print(
        f"wrote {OUTPUT_PATH} ({len(html):,} bytes total, "
        f"{len(payload_json):,} bytes of embedded data)"
    )


if __name__ == "__main__":
    main()
