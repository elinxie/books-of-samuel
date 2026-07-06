# Source ingestion policy

## What may be stored in this repository

| Content                                                        | Allowed?                                                              | Where                                                                                                                               |
| -------------------------------------------------------------- | --------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| Bibliographic metadata + original summary of a source          | Yes                                                                   | `sources/source-cards/*.json`                                                                                                       |
| Full text of a public-domain source                            | Yes                                                                   | `sources/raw-text-cache/`                                                                                                           |
| Full text of a copyrighted source                              | **No**                                                                | —                                                                                                                                   |
| Short excerpt of ESV Scripture (a verse or two, for display)   | Yes, within the excerpt budget                                        | `src/data/passages.ts` (`keyExcerpts`), enforced by `integrity.test.ts`: ≤3 excerpts per passage, ≤200 chars each, ≤500 chars total |
| Full ESV chapter text                                          | **No**, unless served live through Crossway's ESV API under its terms | not implemented yet — tracked as feature `f-esv-api`                                                                                |
| Extracted claims / paraphrased notes from a copyrighted source | Yes, in your own words                                                | `sources/extracted-claims/` or inline in the source card's `extractedClaims`                                                        |
| Screenshots, scans, or images from a copyrighted source        | **No**                                                                | —                                                                                                                                   |

When in doubt, store less: a source card with a tight original summary and a
citation is almost always sufficient to support a `ReconstructionClaim`; the
underlying book/article does not need to live in this repo.

## Source card requirements

Every source card (`SourceCard` type, `src/data/types.ts`) must set:

- `copyrightStatus`: `public-domain` | `licensed` | `copyrighted-limited-use` | `unknown`.
  Default to `copyrighted-limited-use` for any modern scholarly book/article unless
  you have specific reason to think otherwise.
- `allowedUseNotes`: a plain statement of what this project may do with the source
  (e.g., "Summaries in project's own words only; no image reproductions").
- `summary`: written in the project's own words, not copied from the source.
- `confidenceNotes`: include `TO VERIFY` (all-caps, machine-checked convention — see
  `SourcesPage.tsx`) if bibliographic details or attributions were seeded from
  general knowledge rather than a direct citation check.

Validate new cards with `npm run build:sources` (regenerates
`sources/source-index.json`) and `npm test` (schema + referential-integrity checks
in `src/data/sourceCards.test.ts`).

## Folders

- `/sources/raw-text-cache/` — full-text snapshots, public-domain/permitted only.
  Empty until a qualifying source is added; do not seed with copyrighted material.
- `/sources/source-cards/` — one JSON file per source, filename = `${id}.json`.
- `/sources/extracted-claims/` — longer-form original notes extracted from a source
  when a source card's inline `extractedClaims` array isn't enough room; reference
  the source card's `id`.
- `/sources/source-index.json` — generated, do not hand-edit
  (`npm run build:sources`).

## ESV specifically

Crossway's standard non-commercial ESV terms permit quoting up to (at time of
writing) 1,000 verses / a chapter's worth without prior permission for many kinds of
use, but this project intentionally sets a **much tighter** internal budget (see
table above) and treats full-chapter display as requiring the API path regardless,
because:

1. The project's own house style is references + summaries, not text reproduction —
   this is a visualizer, not a Bible-reader app.
2. It keeps the excerpt-budget test meaningful as a hard backstop rather than a
   number close to the actual legal limit.

If a future milestone wants full passage text in-app, implement it against
Crossway's ESV API (https://api.esv.org) with compliant attribution, not by pasting
static text — this is tracked as feature `f-esv-api` and should go through a Fable
review first (changing the source-ingestion policy is on the Fable review queue).

## Adding a new source: checklist

1. Create `sources/source-cards/<id>.json` matching `sourceCardSchema`.
2. Run `npm run build:sources`.
3. Cite it from at least one claim's `sourceIds` (or it will sit unused — allowed,
   but check `docs/bibliography.md` gets a row).
4. Run `npm test` to confirm schema + referential integrity.
