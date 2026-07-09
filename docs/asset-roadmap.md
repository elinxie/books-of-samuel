# Asset roadmap

`src/data/assets.ts` (`ASSETS`) is the source of truth — every placeholder asset
record there requires `whyTemporary`, `historicalRequirements`, and a
`replacementMilestoneId`, enforced by `integrity.test.ts`. This doc is the
human-readable narrative companion; keep it in sync when assets.ts changes.

**Pipeline decision (ADR-008):** modeled assets are authored in Blender and
exported as glTF (.glb), loaded with drei's `useGLTF` — no new dependencies.
Sourcing is project-authored or CC0-adapted only, with provenance recorded in
`assets.ts`. Modeling starts at **Milestone 3** with a single pilot figure
walking the whole path first; Milestone 2 replacements stay procedural. Budgets,
file locations, and the licensing policy live in
`docs/architecture-decisions/adr-008-asset-pipeline.md`.

**Update (ADR-009, 2026-07-07):** the M3 pilot figure landed early and
project-original, not via Blender/glTF: `src/engine/characters/` is a
procedural skinned character system (17-bone rig, period dress, walk/idle/
kneel/mourn clips, baked-pose instanced crowds) generated entirely in code.
It replaces the capsule figures now (`asset-figure-procedural`,
`asset-david-marker`) and settles ADR-008's instanced-skinned-crowd risk. The
`CharacterRig` bone/clip-name contract keeps the Blender→glTF path open as a
seam for a later swap-in; see `docs/architecture-decisions/adr-009-procedural-
characters.md` and `docs/design/character-system.md`.

## Current placeholders (Ziklag scene, Milestone 1)

| Asset                     | Represents                             | Why temporary                                                                         | Replace at            |
| ------------------------- | -------------------------------------- | ------------------------------------------------------------------------------------- | --------------------- |
| `asset-terrain-negev`     | Semi-arid Negev/Shephelah hill terrain | Procedural noise, not DEM-derived                                                     | M2                    |
| `asset-house-block`       | Mudbrick dwellings (burned state)      | Simple box massing, no interiors/pillared plans                                       | M2                    |
| `asset-perimeter-wall`    | Town enclosure                         | Generic ring; real form unknown                                                       | M3                    |
| `asset-gate-simple`       | Town gate                              | Generic two-tower gap                                                                 | M3                    |
| `asset-figure-procedural` | David's men (~1:10 of narrated 600)    | Procedural skinned figures w/ period dress; schematic face, dress/gear pending review | M3                    |
| `asset-david-marker`      | David / Abiathar                       | Principal rig distinguished by pinned dress colors + label                            | M3                    |
| `asset-smoke-particles`   | Smoldering aftermath                   | Stylized GPU particles — acceptable long-term                                         | M4 (optional upgrade) |
| `asset-vegetation-scrub`  | Steppe scrub cover                     | Generic instanced clumps, no species differentiation                                  | M3                    |
| `asset-olive-tree`        | Orchard/maquis trees                   | Trunk+canopy blobs                                                                    | M3                    |
| `asset-rocks`             | Surface stone                          | Generic polyhedra                                                                     | M4 (optional)         |
| `asset-well`              | Water point                            | Illustrative form/placement                                                           | M2                    |
| `asset-threshing-floor`   | Grain-processing floor                 | Illustrative placement                                                                | M2                    |
| `asset-field-plots`       | Subsistence grain plots                | Flat tinted patches                                                                   | M2                    |

## Upcoming needs by milestone

- **M2 (Besor/recovery):** real elevation data investigation (`f-dem-terrain`);
  Besor wadi geometry (ADR-005 `channel` feature); Egyptian-servant and
  Amalekite-camp figures; camel placeholder mounts per the resolved queue #5
  call — flight beat only, minimal early tack, dispute surfaced in-scene
  (`asset-camel-placeholder`, modeled replacement at M3).
- **M3 (Gilboa):** period-dressed figures (`f-period-figures`) landed early as
  a procedural skinned character system (ADR-009); remaining M3 work is
  historical-detail review of dress/gear against King & Stager, addition of
  gear/pack animals, and — optional — a Blender-authored replacement body via
  the `CharacterRig` seam (ADR-008); plus battlefield terrain; Beth-shan
  city/wall; Jabesh-gilead route assets; reduced-intensity violence rendering
  path.
- **M4 (2 Sam 1–2):** Hebron settlement; regional overview map
  (`f-overview-map`) with confidence-shaded political geography.

## Policy

No placeholder ships silently. Every one is labeled in the UI (basis chip =
"Design placeholder", dashed border) and listed here and in `assets.ts` before a
scene is marked `released`.
