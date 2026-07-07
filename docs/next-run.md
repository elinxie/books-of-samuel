# Next run

**Read `docs/sonnet-continuation.md` first if you haven't (Sonnet), or
`docs/model-handoff.md` for the model-routing policy.**

## Since the last version of this note

The 2026-07-07 Fable session (run-log entry of that date) resolved every open
generalization and creative-direction item except queue #4:

- **ADR-005** — terrain is per-scene (`TerrainSpec` + `createTerrain`); engine
  core landed, output regression-pinned identical; consumer migration is item 1
  below.
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

1. **ADR-005 consumer migration** (routine, fully specified, unblocks M2
   terrain work):
   - Move `ZIKLAG_TERRAIN_SPEC` / `ZIKLAG_TERRAIN` from `src/engine/terrain.ts`
     into a new `src/scenes/ziklag/terrain.ts`.
   - Add `terrain: Terrain` to the Zustand store (initial value: Ziklag's);
     set it where the active scene is selected — the `SCENE_COMPONENTS` registry
     in `ObservePage` becomes a module record (component + terrain).
   - Migrate the six Ziklag components plus `engine/ObserverControls.tsx` and
     `ui/scene/EntityLabel.tsx` off the deprecated `terrainHeight` /
     `buildTerrainGeometry`, then delete those exports.
   - Move `SceneEntityDef` out of `scenes/ziklag/entities.ts` into a shared
     module (suggest `src/scenes/types.ts`) so `ui/` stops importing from a
     specific scene.
   - `src/engine/terrain.test.ts` pin values must NOT change — update imports
     only. Full details: ADR-005 "Runtime wiring."
2. **Citation verification pass** (queue #4): verify exact venue for
   `garfinkel-ganor-2019` and first-proposer history for `oren-tel-sera-1993`;
   update `confidenceNotes`, clear `TO VERIFY`, narrow hedges. Research/doc
   only. This is also the last queue blocker for M1's close-out review.
3. **Milestone 2 groundwork**: flesh out the `besor-crossing` `SceneDef`
   (beats/viewpoints) and its claims. Terrain-wise this is now unblocked —
   compose against `createTerrain` with a `channel` feature (ADR-005). Route
   _distances_ still depend on the Ziklag-candidate question
   (`uncertainty-register.md` #1–2), so keep the crossing "representative," the
   same composite framing Ziklag uses, rather than asserting a measured route.
   Camel-depiction constraints for the Amalekite camp are already decided
   (register #6).
4. **Repo hygiene**: confirm GitHub Pages is actually live (README
   "Deploying" — one manual repo-settings step). If not live, that jumps to
   top priority: it's a Milestone 0 acceptance criterion.

Milestone 3 (Gilboa) is no longer policy-blocked (ADR-009 decided) but stays
after M2 in milestone order; when it starts, build to ADR-009 and get a
world-director brief first.

## Known state

- Full gate green as of this commit (format / lint / typecheck / 39 vitest /
  build / 7 playwright e2e).
- No open bugs.
- `M1` stays `in-progress`: remaining close-out = queue #4 plus one short final
  checklist pass (`docs/fable-review-checklist.md`) — the creative-direction
  review items were all resolved 2026-07-07.

## Files most recently changed

`src/engine/terrain.ts` (+ new `terrain.test.ts`), `src/data/claims.ts` (camel
depiction note), `docs/architecture-decisions/adr-005…adr-009`, and the
queue / register / roadmap / method / run-log / progress / model-handoff /
architecture docs.
