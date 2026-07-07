# ADR-007: Scripted reenactments use pure pose functions

**Status:** Accepted (2026-07-07, Fable review — added to and resolved from
`fable-review-queue.md` as #10 in the same session).

## Context

Ziklag's reenactment (`src/scenes/ziklag/ReturningMen.tsx`) choreographs the
returning column through `figurePose(t, figure, …)` — a pure function from scene
time and per-figure parameters to `{x, z, yaw, kneel, moving, visible}` — with
the component consuming it per frame into an instanced mesh. This worked well
and is easy to reinvent differently (and worse) per scene, so it gets named as
the standard before Milestone 2 builds more reenactments.

## Decision

Every scripted reenactment is choreographed by **pure pose functions**:

1. **Signature:** scene time `t` plus immutable per-figure parameters (rank,
   lane, assigned slot, seeded phase…) in; a plain pose object out. No stored
   state, no accumulation between frames — the pose at `t` must not depend on
   the path by which the user reached `t`.
2. **Why this is load-bearing, not style:** the product promises pause, scrub,
   and replay. State-accumulating animation drifts under scrubbing; pure
   functions make replay correctness structural. It also makes choreography
   unit-testable without a renderer.
3. **Pose vocabulary:** position + yaw + `moving`/`visible`, plus a small set of
   scene-defined normalized gesture channels (Ziklag: `kneel` 0..1) that the
   component maps to transforms. Add channels per scene as needed; keep them
   normalized and few.
4. **What stays in the component:** terrain-height lookup, walk-bob, instanced
   matrix/color writes, scratch-object reuse (module-level `Object3D`/`Vector3`
   to stay allocation-free). The pure function never touches THREE objects
   except read-only curve sampling.
5. **Timeline constants** (`GRIEF_T`, `DEPART_T`, …) are named module constants
   derived from the scene's beats in `scenes.ts`, cross-referenced in a comment.
6. **Named figures too.** Principals (David, Abiathar, Saul…) get their own pure
   pose functions from Milestone 2 onward. Ziklag's inline `useFrame` blocks for
   David/Abiathar are grandfathered; refactor opportunistically if that file is
   touched for other reasons, not as standalone churn.
7. **Every reenactment ships a beat-invariant test** in the scene folder, in the
   mold of `reenactment.test.ts`: for representative figures (head, tail), assert
   position/gesture invariants at beat boundaries (marching before arrival,
   settled and gesturing during the central beat, departed after the exit beat).

## Consequences

- Scrub-safe, deterministic reenactments by construction; choreography bugs are
  caught by unit tests instead of eyeballing playback.
- Slight ceremony for trivial one-figure scenes — accepted; consistency across
  scenes is worth more to future authors than brevity in small ones.
- If a future scene genuinely needs physics or figure-to-figure interaction
  (flocking, collisions), that's a new architectural question — bring it back to
  a Fable review rather than silently abandoning purity.
