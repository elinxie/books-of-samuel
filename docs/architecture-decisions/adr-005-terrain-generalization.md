# ADR-005: Per-scene terrain via `TerrainSpec` + `createTerrain()`

**Status:** Accepted and fully implemented (2026-07-07, Fable review — resolves
`fable-review-queue.md` #7). Engine core landed in `src/engine/terrain.ts` with
regression-pinned identical Ziklag output; the consumer migration below (assigned
via `docs/next-run.md`) landed the same day (Sonnet 5).

## Context

`terrainHeight()` hardcoded Ziklag's constants (tell, flatten zone, south fall
toward the Besor) in nominally shared engine code, and was imported directly by
eight files — including two scene-agnostic ones (`engine/ObserverControls.tsx`,
`ui/scene/EntityLabel.tsx`) that must keep working when a second scene exists.
Milestone 2's Besor crossing needs a wadi channel; Milestone 3 needs a battlefield
ridge (Gilboa) and a larger tell (Beth-shan). Without parameterization the only
path was per-scene copy-paste forks of engine code.

## Decision

Terrain becomes a per-scene value, not a global function:

- **`TerrainSpec`** — a declarative config: `hills` (a list of fbm layers:
  `frequency`, `amplitude` in meters, `octaves`, noise-domain `offset`),
  `features` (a discriminated union list), `colors` (base/scrub/rocky ramp,
  moisture-mask parameters, and radial color `zones` such as Ziklag's ash-darkened
  core), plus default geometry `size`/`segments`.
- **Features** (v1, exactly what shipped scenes plus Besor need):
  - `mound` — radial gaussian rise (tells, knolls).
  - `flatten` — radial suppression of hill noise (settlement pads).
  - `ramp` — directional smoothstep fall/rise (drainage trends like Ziklag's
    south fall).
  - `channel` — carved bed along a polyline with a smooth cross-profile (wadis;
    built for Besor).
  - A `ridge` variant (elongated rise between two points) is anticipated for
    Gilboa and should be added to the union when that scene is directed — do not
    approximate ridges by stacking mounds.
- **Composition semantics** (fixed, documented in code): height =
  `sum(hills) × product(flatten multipliers) + sum(additive features)`.
  Features encode narrative geography and are O(n) per sample — keep the list
  short (units are meters; this is not a detail-noise mechanism).
- **`createTerrain(spec): Terrain`** where `Terrain` exposes `heightAt(x, z)`,
  `buildGeometry(size?, segments?)`, and the originating `spec`. The `Terrain`
  object — not any module-level function — is the boundary every consumer sees.

### Runtime wiring (migration spec — implemented)

1. Each scene folder owns its spec: `src/scenes/<id>/terrain.ts` exporting a
   `Terrain` built with `createTerrain`. Ziklag's spec now lives in
   `src/scenes/ziklag/terrain.ts`; `engine/terrain.ts` carries no scene constants.
2. The scene registry in `ObservePage` (`SCENE_REGISTRY`) is a module record of
   `{ component, terrain }`; activating a scene sets `terrain` in the Zustand
   store (`setTerrain`), mirroring how quality profiles are already distributed
   (ADR-004).
3. `ObserverControls` (walk-mode ground clamp, teleports), `EntityLabel` (label
   anchoring), and the five Ziklag-scene components read `terrain` from the
   store instead of importing engine globals. `EntityLabel` imports
   `SceneEntityDef` from the shared `src/scenes/types.ts`, not
   `scenes/ziklag/entities`.
4. The deprecated `terrainHeight`/`buildTerrainGeometry` re-exports are deleted;
   `ZIKLAG_TERRAIN`'s regression-pin tests moved to `src/scenes/ziklag/terrain.test.ts`
   alongside the spec they pin (`src/engine/terrain.test.ts` keeps only the
   scene-agnostic `createTerrain` feature-primitive tests).

## Alternatives considered

- **Named biome/preset functions** (`negevTerrain()`, `wadiTerrain()`): rejected —
  presets don't compose. Besor is "gentle hills + a channel"; Gilboa is "steeper
  hills + a ridge". Every new scene would fork a preset, recreating the problem.
- **Per-scene copies of `terrain.ts`**: rejected — eight consumers drift apart,
  and shared components have no way to pick the right copy.
- **A general SDF/node-graph terrain DSL**: rejected as over-engineering for the
  project's five or six planned scenes; a flat feature list stays legible to
  historical reviewers (each feature maps to a describable landform claim).

## Consequences

- New scenes state their landforms declaratively and get sampler + colored
  geometry for free; no engine edits needed until a genuinely new feature kind
  appears (ridge at M3).
- The reviewed Milestone 1 heightfield is pinned by unit tests
  (`src/engine/terrain.test.ts`) — the refactor provably changed nothing
  on-screen, and future accidental terrain drift fails tests. Deliberate terrain
  changes update the pins in the same commit.
- When Milestone 2 investigates DEM-derived terrain (`f-dem-terrain`), a
  heightfield source can be added to `TerrainSpec` as an alternative to `hills`
  (features and colors still apply) without changing the `Terrain` interface —
  consumers are already insulated.
- The consumer migration is done: no engine module holds a scene-specific
  global any more, so the second scene (Besor crossing, M2) is unblocked.
