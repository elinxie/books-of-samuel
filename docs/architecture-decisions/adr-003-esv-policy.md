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

## Consequences

- The app can never accidentally become a full-text Bible reader through
  incremental excerpt creep — the test fails first.
- Passage summaries must genuinely be original prose, not a lightly-reworded
  paraphrase of the ESV — this is a manual review responsibility, not currently
  automated (candidate future test: excerpt/summary similarity check).
