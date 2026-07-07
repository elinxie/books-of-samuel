# Next run

**Read `docs/sonnet-continuation.md` first if you haven't (Sonnet), or
`docs/model-handoff.md` for the model-routing policy.**

## Since the last version of this note

The 2026-07-07 Fable session (run-log entry of that date) resolved every open
generalization and creative-direction item except queue #4. A same-day Sonnet 5
session then landed the ADR-005 consumer migration (item 1 below, now done):

- **ADR-005** — terrain is per-scene (`TerrainSpec` + `createTerrain`); engine
  core and consumer migration are both landed. Ziklag's spec lives in
  `src/scenes/ziklag/terrain.ts`; the Zustand store holds the active scene's
  `Terrain` (`setTerrain`); `ObservePage`'s `SCENE_REGISTRY` maps scene id →
  `{ component, terrain }`; the deprecated `terrainHeight`/`buildTerrainGeometry`
  globals are deleted. `SceneEntityDef` now lives in `src/scenes/types.ts`.
- **ADR-006** — settlement-layout extraction deferred; layout-module conventions
  standardized.
- **ADR-007** — pure pose functions confirmed as the reenactment standard.
- **ADR-008** — asset pipeline: Blender → glTF at Milestone 3, pilot first;
  M2 stays procedural.
- **ADR-009** — violence depiction: standard mode default behind a first-visit
  advisory; reduced mode abstracts depiction, never facts.
- Camels: **render** in the narrated flight beat only (queue Resolved #5,
  register #6). Ziklag's plan type, figure ratio, and lighting: confirmed.

`docs/fable-review-queue.md`'s Open table now holds only **#4** (citation
verification — a Sonnet task).

## Next Sonnet session: pick in this order

1. **Citation verification pass** (queue #4): verify exact venue for
   `garfinkel-ganor-2019` and first-proposer history for `oren-tel-sera-1993`;
   update `confidenceNotes`, clear `TO VERIFY`, narrow hedges. Research/doc
   only. This is also the last queue blocker for M1's close-out review.
2. **Milestone 2 groundwork**: flesh out the `besor-crossing` `SceneDef`
   (beats/viewpoints) and its claims. Terrain-wise this is now unblocked —
   compose against `createTerrain` with a `channel` feature (ADR-005; put the
   spec in a new `src/scenes/besor-crossing/terrain.ts` and add its entry to
   `SCENE_REGISTRY` in `ObservePage`, following Ziklag's pattern). Route
   _distances_ still depend on the Ziklag-candidate question
   (`uncertainty-register.md` #1–2), so keep the crossing "representative," the
   same composite framing Ziklag uses, rather than asserting a measured route.
   Camel-depiction constraints for the Amalekite camp are already decided
   (register #6).
3. **Repo hygiene**: confirm GitHub Pages is actually live (README
   "Deploying" — one manual repo-settings step). If not live, that jumps to
   top priority: it's a Milestone 0 acceptance criterion.

Milestone 3 (Gilboa) is no longer policy-blocked (ADR-009 decided) but stays
after M2 in milestone order; when it starts, build to ADR-009 and get a
world-director brief first.

## Known state

- Full gate green as of this commit (format / lint / typecheck / 38 vitest /
  build / 7 playwright e2e). Vitest count is 39 minus the deprecated
  `terrainHeight` delegate test, which was deleted along with the function it
  tested.
- No open bugs.
- `M1` stays `in-progress`: remaining close-out = queue #4 plus one short final
  checklist pass (`docs/fable-review-checklist.md`) — the creative-direction
  review items were all resolved 2026-07-07, and ADR-005's migration is done.

## Files most recently changed

`src/engine/terrain.ts` (deprecated exports removed), new
`src/scenes/ziklag/terrain.ts` + `terrain.test.ts`, new `src/scenes/types.ts`,
`src/state/store.ts` (`terrain`/`setTerrain`), `src/pages/ObservePage.tsx`
(`SCENE_REGISTRY`), the five Ziklag scene components, `engine/ObserverControls.tsx`,
`ui/scene/EntityLabel.tsx`, and `docs/architecture-decisions/adr-005-terrain-generalization.md` /
`docs/progress.md` / `docs/run-log.md`.
