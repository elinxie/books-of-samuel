# ADR-003: ESV text policy

**Status:** Fixed. Changing the excerpt budget or ingestion approach requires a
Fable review (it's a copyright-risk decision, not a routine engineering one).

## Context

The project anchors every passage to the ESV translation but must not reproduce
copyrighted Crossway text beyond fair/permitted use.

## Decision

- Store canonical references (`"1 Samuel 30:6"`), original-words summaries, and at
  most a handful of short excerpts per passage — never full chapters.
- Hard budget, enforced by `src/data/integrity.test.ts`: ≤3 excerpts per passage,
  ≤200 characters each, ≤500 characters total per passage. This is deliberately
  tighter than Crossway's standard non-commercial quotation allowance.
- Full-chapter display, if ever added, must go through Crossway's ESV API
  (api.esv.org) with compliant attribution — tracked as feature `f-esv-api`, not
  built yet.
- Every page/scene that shows ESV-anchored content carries the standard Crossway
  attribution notice (see `SiteChrome.tsx` footer and the Sources page).

### Amendment (2026-08-10, M5 sign-off review)

Two rules added after the M5 review found a paraphrase of 2 Samuel 3:1 presented
inside quotation marks with a verse citation in `/atlas`'s M5 lede — wording that
matches no translation, in prose the enforced test never scanned:

- **Quoted means verbatim.** Any span in double quotation marks attributed to a
  verse must be verbatim in the passage's `translationAnchor` (ESV). If the
  wording is the project's own, it must not be in quotation marks — a paraphrase
  in quotes is a false claim about the translation, independent of the budget.
- **Study-page/UI copy is a third budgeted surface.** The ≤3 excerpts / ≤200 chars
  each / ≤500 chars total budget applies per page to ESV spans in page and UI
  copy (`src/pages/**`, `src/ui/**`), alongside the two surfaces the test already
  enforces (a passage's `keyExcerpts`, and a scene's quoted beat captions). The
  three surfaces are budgeted separately rather than pooled per passage: pooling
  would retroactively break already-released M4 content, and the point of the cap
  is preventing incremental full-text creep, which a per-surface cap does.
  Enforcement for this third surface is a **manual review responsibility, not
  currently automated** — same standing as the summary-paraphrase check above.
  A candidate future test is tracked in `docs/next-run.md`, not here.

## Consequences

- The app can never accidentally become a full-text Bible reader through
  incremental excerpt creep — the test fails first.
- Passage summaries must genuinely be original prose, not a lightly-reworded
  paraphrase of the ESV — this is a manual review responsibility, not currently
  automated (candidate future test: excerpt/summary similarity check).
