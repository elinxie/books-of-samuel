# The Books of Samuel — text reader

Structured, public-domain text of 1 & 2 Samuel in two English translations —
the **King James Version** (1611) and the **World English Bible** — plus a
single-file web reader for browsing, comparing, and searching them.

This is a companion tool inside the [Books of Samuel](../README.md) repository,
whose main project is a 3D historical visualizer of the same two books. This
reader exists because that visualizer deliberately stores only short ESV
excerpts (see its [source-ingestion policy](../docs/source-ingestion-policy.md));
this subproject is where you go to read the full text, in full public-domain
translations, alongside it.

## About the books

1 and 2 Samuel narrate Israel's transition from the tribal confederacy of
the judges to a centralized monarchy, following the intertwined lives of
Samuel (the last judge and a prophet), Saul (the first king), and David
(the second king). They are a single book, _Samuel_, in the Hebrew Bible;
the Greek Septuagint's division of Samuel and Kings into a four-part history
is what gives us the two books used here, and the reason the King James
Version's traditional title also calls them "the First/Second Book of the
Kings." See [`notes/overview.md`](notes/overview.md) for a fuller
encyclopedic overview: outline, key figures, and famous passages.

## The reader

`index.html`, at the root of this folder, is a single self-contained HTML
file — all CSS and JavaScript inline, no external requests, no build step to
view it. Open it directly from disk (`file://`) or serve it via GitHub Pages
(it's deployed at `/reader/` alongside the main visualizer) and it works
identically either way.

Features:

- Switch between the KJV and WEB translations.
- Light/dark theme, defaulting to the system preference and remembering
  your choice.
- Browse by book and chapter, with previous/next buttons and ←/→ keyboard
  navigation.
- Case-insensitive search across both books in the current translation,
  with highlighted snippets that jump to the matching verse.
- Shareable, bookmarkable URLs via hash routing, e.g.
  `index.html#/kjv/1-samuel/17`.
- KJV translator-supplied words rendered in _italics_, and KJV marginal
  notes surfaced as a small † marker with a "Notes" section per chapter.

## Layout (this folder)

```
data/
  books.json          cross-translation index (see schema below)
  kjv/1-samuel.json   kjv/2-samuel.json
  web/1-samuel.json   web/2-samuel.json
scripts/
  build_data.py       parses the source npm packages into data/
  validate_data.py    hard-asserts the data in data/ is well-formed
  build_site.py       embeds data/ into web/template.html -> index.html
web/
  template.html       reader source (with a /*__DATA__*/ placeholder)
notes/
  overview.md         encyclopedic overview of 1 & 2 Samuel
index.html            generated reader (build output, also committed)
```

The repo-wide [`LICENSE`](../LICENSE) covers the code here (MIT); the
scripture texts themselves are public domain (see Provenance, below).

## Data format

Each of `data/kjv/1-samuel.json`, `data/kjv/2-samuel.json`,
`data/web/1-samuel.json`, and `data/web/2-samuel.json` has the shape:

```jsonc
{
  "book": "1 Samuel",
  "slug": "1-samuel",
  "title": "The First Book of Samuel, otherwise called The First Book of the Kings",
  "osisId": "1Sam",
  "canonOrder": 9,
  "translation": "KJV",
  "chapters": [
    {
      "chapter": 1,
      "verses": [
        { "v": 1, "text": "...", "fmt": "...", "notes": ["..."], "para": true }
      ]
    }
  ]
}
```

Verse object fields:

- **`text`** (always present, non-empty): clean plain text, markup
  stripped, whitespace collapsed to single spaces and trimmed.
- **`fmt`** (KJV only, present only when the verse contains
  translator-supplied words): the same text with those words wrapped in
  `[brackets]` — the traditional plain-text stand-in for KJV italics.
- **`notes`** (present only when non-empty): an array of marginal-note
  strings (from the KJV's `<RF>...<Rf>` cross-references/alternate
  renderings). The WEB source text has no equivalent footnote markup for
  these two books (see "Rebuild" below), so WEB verses never carry `notes`.
- **`para`** (present only when `true`): this verse ends a paragraph, i.e.
  a reader should start a new `<p>` after it.

`data/books.json` indexes both translations and both books:

```jsonc
{
  "translations": [
    { "abbrev": "KJV", "name": "King James Version", "year": 1611, "rights": "Public domain", "source": { "package": "bible-kjv", "version": "1.1.3", "registry": "...", "license": "MIT" } },
    { "abbrev": "WEB", "name": "World English Bible", "rights": "Public domain", "source": { "package": "world-english-bible", "version": "1.0.1", "registry": "...", "license": "UNLICENSED" } }
  ],
  "books": [
    {
      "slug": "1-samuel", "name": "1 Samuel", "osisId": "1Sam", "canonOrder": 9, "chapters": 31,
      "verses": { "kjv": 810, "web": 810 },
      "chapterVerses": { "kjv": [28, 36, ...], "web": [28, 36, ...] },
      "files": { "kjv": "kjv/1-samuel.json", "web": "web/1-samuel.json" }
    }
  ]
}
```

The web reader (`web/template.html`, built into `index.html`) doesn't embed
these files verbatim; `build_site.py` re-encodes each verse into a compact
tuple `[v, displayText, notes?, para?]` (`displayText` is `fmt` when present,
otherwise `text`) to keep the payload small. See the comments at the top of
`build_site.py` for the exact encoding.

## Rebuild

The data and reader are build output, generated with the Python standard
library only (no pip installs). Run these commands from inside this
(`reader/`) folder — the scripts locate `data/`/`web/` relative to their own
path, so they work the same whether the repo is at its own root or nested as
it is here:

```bash
cd reader   # if not already there

# 1. Fetch and extract the two source packages.
curl -sSO https://registry.npmjs.org/bible-kjv/-/bible-kjv-1.1.3.tgz
tar xzf bible-kjv-1.1.3.tgz                       # -> package/dist/resources/...

curl -sSO https://registry.npmjs.org/world-english-bible/-/world-english-bible-1.0.1.tgz
mkdir -p web-pkg && tar xzf world-english-bible-1.0.1.tgz -C web-pkg   # -> web-pkg/package/json/...

# 2. Build data/ from both sources.
python3 scripts/build_data.py --kjv package/dist/resources --web web-pkg/package/json

# 3. Validate the result (exits non-zero on any hard failure).
python3 scripts/validate_data.py

# 4. Build the single-file reader (index.html) from web/template.html + data/.
python3 scripts/build_site.py
```

After rebuilding, the repo root's `npm run build` copies this folder's
`index.html` into the main site's build output at `/reader/` — see
`scripts/copy-reader.mjs` at the repo root.

## Provenance & licensing

The code in this repository (scripts and the reader) is MIT-licensed — see
[`LICENSE`](../LICENSE). The scripture texts themselves are in the public
domain:

| Translation | Text rights | Source package | Package license |
| --- | --- | --- | --- |
| King James Version (1611) | Public domain | [`bible-kjv@1.1.3`](https://www.npmjs.com/package/bible-kjv) | MIT |
| World English Bible | Public domain (dedicated by its publisher, Rainbow Missions, Inc.) | [`world-english-bible@1.0.1`](https://www.npmjs.com/package/world-english-bible) | UNLICENSED |

The `world-english-bible` package's own `package.json` declares its license
as `UNLICENSED` — that describes the npm package's code/build tooling, not
the Bible text it bundles. The World English Bible translation itself is
explicitly public domain per its publisher; this project uses only the
extracted scripture text, not any of that package's code.

### Source markup this project parses

- **KJV** (`bible-kjv`): each chapter is a JSON array of verse strings with
  three inline tags: `<FI>...<Fi>` (translator-supplied words), `<RF>...<Rf>`
  (a marginal note), and `<CM>` (a paragraph break after the verse).
- **WEB** (`world-english-bible`): each book is a JSON array of ordered
  "event" objects (`paragraph start/end`, `paragraph text`, `stanza
  start/end`, `line text`, `line break`); text events carry a chapter and
  verse number and a text fragment, which `build_data.py` reassembles into
  full verses and uses to detect paragraph/stanza boundaries. No leftover
  markup or footnote-style content was found in the WEB text for 1 or 2
  Samuel — every verse has only `text` (see `scripts/build_data.py`'s
  module docstring for the full parsing notes).

### Data validation

`scripts/validate_data.py` hard-asserts, among other things: exact chapter
counts (31 & 24) and KJV verse counts (810 & 695) for both books; verse
numbers contiguous from 1 in every chapter; no leftover markup characters in
any text/fmt/note field; `fmt` differing from `text` only by bracket
characters; and a handful of known-text spot checks. It also prints a
chapter-by-chapter WEB-vs-KJV verse count comparison — for 1 & 2 Samuel,
WEB and KJV happen to have identical per-chapter verse counts throughout
both books, so this diff table is empty in practice, though the script does
not require that (a difference of up to 2 verses in a chapter is tolerated
as normal versification variation; anything larger fails validation as a
likely parsing bug).
