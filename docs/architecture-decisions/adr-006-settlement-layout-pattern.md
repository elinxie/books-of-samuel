# ADR-006: Settlement layout — defer extraction, standardize the conventions

**Status:** Accepted (2026-07-07, Fable review — resolves `fable-review-queue.md` #8).

## Context

`src/scenes/ziklag/layout.ts` generates the enclosed-ring settlement (houses,
wall segments, gate towers, smoke origins, plaza slots, approach/exit curves)
bespoke to Ziklag. Queue #8 asked whether to extract it into a reusable
parameterized generator now or wait — a real YAGNI-vs-DRY call, and superficially
the same question as terrain (ADR-005), which was parameterized immediately.

## Decision

**Defer the extraction. Document the conventions as the standard, here.**

The two cases differ in exactly the ways that matter:

- Terrain constants sat in _shared engine code_ with eight consumers (two of
  them scene-agnostic) and a concrete second consumer arriving at Milestone 2.
  The layout generator is _scene-local_, has zero outside consumers, and its
  parameter surface (ring radius, gate arcs, house-belt jitter) fits exactly one
  settlement type.
- The next settlement scenes are not ring villages: Beth-shan (M3) is a major
  fortified tell city with excavated plans to follow; Jabesh-gilead and Hebron
  have no secure site plan at all. A second _enclosed-ring_ consumer may never
  arrive. Extracting now would freeze Ziklag's incidental choices as API.

**Extraction trigger:** the first time a second enclosed-ring settlement scene
is composed, extract the generator then — against two live examples — into a
shared module. Until then, new settlement scenes copy the conventions below,
not the code wholesale.

## The layout-module conventions (standard for all future scenes)

Every scene gets a `layout.ts` that is data, not rendering:

1. **Deterministic, seeded.** All randomness via `mulberry32` with a fixed
   literal seed; independent concerns (houses vs. smoke picks vs. plaza slots)
   get independent seeded generators so editing one doesn't reshuffle another.
2. **Specs, not meshes.** Export plain-object spec arrays (`HouseSpec`,
   `WallSpec`, …) computed once at module level; components instance geometry
   from specs. Keeps layout unit-testable without a renderer.
3. **Ring/arc math where used:** polar placement with jittered theta and radius;
   gates and posterns as arc-gap masks applied consistently to both the house
   belt and the wall ring so openings line up.
4. **Paths as curves.** Approach/departure routes as `CatmullRomCurve3` with a
   small hand-set control-point list; sample with `samplePath`-style helpers.
5. **Rejection-sampled gathering areas.** Crowd slots via seeded rejection
   sampling with a minimum spacing and a bounded attempt guard.
6. **Layout constants carry claims.** Radii, counts, and plan type must trace to
   the scene's claims (e.g. `claim-oval-plan`, `claim-ziklag-scale`) — a layout
   file is a reconstruction statement, not free composition.

## Consequences

- No premature abstraction; Ziklag's generator stays legible and scene-owned.
- The conventions above are the review checklist for any new scene's layout
  module (referenced from `docs/reconstruction-method.md`'s new-scene checklist).
- Slight duplication risk if two ring settlements do eventually coexist —
  accepted; the extraction trigger bounds it to one refactor at a known moment.
