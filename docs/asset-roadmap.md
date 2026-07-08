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

## Current placeholders (Ziklag scene, Milestone 1)

| Asset                    | Represents                                                                    | Why temporary                                                                                                        | Replace at            |
| ------------------------ | ----------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------- | --------------------- |
| `asset-terrain-negev`    | Semi-arid Negev/Shephelah hill terrain                                        | Procedural noise, not DEM-derived                                                                                    | M2                    |
| `asset-house-block`      | Mudbrick dwellings (burned state)                                             | Simple box massing, no interiors/pillared plans                                                                      | M2                    |
| `asset-perimeter-wall`   | Town enclosure                                                                | Generic ring; real form unknown                                                                                      | M3                    |
| `asset-gate-simple`      | Town gate                                                                     | Generic two-tower gap                                                                                                | M3                    |
| `asset-figure-capsule`   | David's men (~1:10 of narrated 600)                                           | Abstract capsules, no dress/gear detail                                                                              | M3                    |
| `asset-david-marker`     | Named-figure marker rigs (David, Abiathar; from M2 also the Egyptian servant) | Segmented merged-silhouette rig, pinned dress colors + label; pose-function-posed, no bone-driven skeletal animation | M3                    |
| `asset-smoke-particles`  | Smoldering aftermath                                                          | Stylized GPU particles — acceptable long-term                                                                        | M4 (optional upgrade) |
| `asset-vegetation-scrub` | Steppe scrub cover                                                            | Generic instanced clumps, no species differentiation                                                                 | M3                    |
| `asset-olive-tree`       | Orchard/maquis trees (Ziklag); reused for wadi-bank trees (besor-crossing)    | Trunk+canopy blobs, not species-differentiated                                                                       | M3                    |
| `asset-rocks`            | Surface stone                                                                 | Generic polyhedra                                                                                                    | M4 (optional)         |
| `asset-well`             | Water point                                                                   | Illustrative form/placement                                                                                          | M2                    |
| `asset-threshing-floor`  | Grain-processing floor                                                        | Illustrative placement                                                                                               | M2                    |
| `asset-field-plots`      | Subsistence grain plots                                                       | Flat tinted patches                                                                                                  | M2                    |

## Current placeholders (besor-crossing scene, Milestone 2, built 2026-07-08)

| Asset                 | Represents                                           | Why temporary                                                                                   | Replace at |
| --------------------- | ---------------------------------------------------- | ----------------------------------------------------------------------------------------------- | ---------- |
| `asset-terrain-besor` | Braided wadi bed + loess banks at the Besor crossing | Procedural noise + hand-tuned channel feature, not DEM-derived                                  | M3         |
| `asset-water-pool`    | Standing water in wadi-bed low points                | Static low-poly mesh, no real-time water sim; water level unstated in text (design placeholder) | M4         |
| `asset-pack-donkeys`  | Baggage animals at the north-bank laager             | Simple low-poly instanced quadruped form                                                        | M3         |

## Current placeholders (amalekite-camp scene, Milestone 2, built 2026-07-08)

| Asset                            | Represents                                            | Why temporary                                                                                                    | Replace at        |
| -------------------------------- | ----------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------- | ----------------- |
| `asset-terrain-camp-basin`       | Shallow basin south of the Besor drainage             | Procedural; the camp's real location is unknowable ("south of the Besor" is all the text gives) — stays generic | M4 (palette only) |
| `asset-camp-shelter-placeholder` | Raider-camp shelters (ridge-awnings, windbreaks)      | Suggestive forms only — deliberately NOT goat-hair tents (unattested this early, `claim-camp-shelters`)          | M4                |
| `asset-camp-props`               | Spoil heaps + tether posts                            | Abstract mounds/posts                                                                                              | M4 (optional)     |
| `asset-camp-fire`                | Camp fire points (the dusk signature)                 | Emissive cones + glow discs, deliberately not real lights                                                          | M4 (optional)     |
| `asset-livestock-placeholder`    | Sheep/goat flocks + cattle (spoil, 1 Sam 30:20)       | Low-poly instanced quadrupeds, color-varied, not real breeds                                                       | M3                |
| `asset-camel-placeholder`        | The four hundred fleeing on camels (flight beat only) | Low-poly dromedary+rider merged form, pad tack only (no frame saddle — register #6)                                | M3                |

## Upcoming needs by milestone

- **M2 (Besor/recovery):** both scenes built 2026-07-08 (`besor-crossing`,
  `amalekite-camp` — see tables above); the resolved camel call is implemented
  (flight beat only, minimal early tack, dispute surfaced in-scene,
  `asset-camel-placeholder`, modeled replacement at M3). Real elevation data
  investigation (`f-dem-terrain`) still outstanding for the Besor scene; n/a
  for the camp basin (unlocatable site — stays a labeled generic).
- **M3 (Gilboa):** period-dressed modeled figures (`f-period-figures`) replacing
  capsules; battlefield terrain; Beth-shan city/wall; Jabesh-gilead route assets;
  reduced-intensity violence rendering path.
- **M4 (2 Sam 1–2):** Hebron settlement; regional overview map
  (`f-overview-map`) with confidence-shaded political geography.

## Policy

No placeholder ships silently. Every one is labeled in the UI (basis chip =
"Design placeholder", dashed border) and listed here and in `assets.ts` before a
scene is marked `released`.
