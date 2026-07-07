# ADR-002: Claim-centered data model

**Status:** Fixed in shape (the five `ClaimBasis` values, four `Confidence` levels,
and the claim/source separation). Adding new claims/sources/scenes is routine
Sonnet work; changing the taxonomy itself requires a Fable review.

## Context

The project's core requirement is that every visual assertion be traceable to
evidence and honest about uncertainty, with genuine scholarly disputes exposed
rather than collapsed into a single narrative.

## Decision

- `ReconstructionClaim` is the atomic unit of historical assertion: `statement` +
  `basis` (`biblical-text` | `archaeology` | `comparative-ane` |
  `scholarly-reconstruction` | `design-placeholder`) + `confidence` (`high` |
  `moderate` | `low` | `speculative`) + `sourceIds` + optional `scholarlyViews`.
- `SourceCard` is a separate registry (bibliographic metadata + original summary +
  copyright status), loaded from versioned JSON files rather than TypeScript, so
  non-code contributions (adding a source) don't require touching the type-checked
  codebase.
- Scenes, locations, routes, and characters hold `claimIds: string[]` rather than
  embedding historical text — the UI resolves claims on demand
  (`resolveClaims`/`resolveSources` in `src/data/index.ts`), so the same claim can
  back a scene label, the certainty panel, and the inspector without duplication.
- Disputed questions live as `ScholarlyView[]` inside the relevant claim (or inside
  `LocationEntry.identification.views` for site identifications specifically),
  each with its own confidence and sources — never resolved to a single "winning"
  view in the main statement.

## Consequences

- Every new scene/entity must be authored claims-first (see
  `docs/reconstruction-method.md` checklist) — this is slower than writing scene
  code directly, by design.
- Referential integrity (claim → source, scene → claim, etc.) is enforced by
  `src/data/integrity.test.ts`, so a broken reference fails CI rather than
  silently rendering an unlabeled or uncredited element.
- Attribution hedging ("e.g., scholars following...") is used where a proponent
  hasn't been page-verified — this is a known, tracked gap
  (`docs/uncertainty-register.md` #10), not a data model flaw.
