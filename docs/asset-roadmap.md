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

## Current placeholders (gilboa-battle scene, Milestone 3, archer-volley beat added 2026-07-13)

| Asset                           | Represents                                                                                                                     | Why temporary                                                                                                                                                  | Replace at |
| ------------------------------- | ------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------- |
| `asset-terrain-gilboa-ridge`    | Mount Gilboa ridge, northern approach, eastern rout slope                                                                      | Procedural ridge + hills, not DEM-derived from Jebel Faqqu’a/Gilboa                                                                                            | M4         |
| `asset-figure-fallen`           | The death sequence + rout: sons overtaken, Saul wounded/fallen, armor-bearer follows, routers                                  | Rotation/scale collapse transform on the existing ADR-010 rig, not a modeled fallen-body pose or skeletal clip                                                 | M4         |
| `asset-military-kit-israelite`  | Israelite spear/oval shield/bow, non-uniform, marginally more kit on Saul/sons/armor-bearer                                    | Primitive-geometry InstancedMesh attachments, not modeled weapons/shields or a specific excavated panoply                                                      | M4         |
| `asset-military-kit-philistine` | Philistine bow (archers)/round shield + straight sword (infantry, principals)/plumed headdress (principals only)               | Primitive-geometry InstancedMesh attachments; headdress ethnic/temporal attribution is disputed and provisional (fable-review-queue #13)                       | M4         |
| `asset-dust-motion`             | Rout-dust over the eastern draw (heavier) and the Philistine northern climb (lighter), reading the mass movement of the defeat | Stylized GPU point-sprite field (shared shader material, vertex-displaced drift, `RoutDust.tsx`), not a physical dust simulation                               | M4         |
| `asset-arrow-volley`            | The `b-archers` arrow volley (1 Samuel 31:3) arcing from the archer line to the crest                                          | Primitive shaft/tip/fletching InstancedMesh, per-frame matrix update on a small fixed roster (`ArrowVolley.tsx`); wave cadence/scatter is staging, not sourced | M4         |

## Current placeholders (amalekite-camp scene, Milestone 2, built 2026-07-08)

| Asset                            | Represents                                            | Why temporary                                                                                                   | Replace at        |
| -------------------------------- | ----------------------------------------------------- | --------------------------------------------------------------------------------------------------------------- | ----------------- |
| `asset-terrain-camp-basin`       | Shallow basin south of the Besor drainage             | Procedural; the camp's real location is unknowable ("south of the Besor" is all the text gives) — stays generic | M4 (palette only) |
| `asset-camp-shelter-placeholder` | Raider-camp shelters (ridge-awnings, windbreaks)      | Suggestive forms only — deliberately NOT goat-hair tents (unattested this early, `claim-camp-shelters`)         | M4                |
| `asset-camp-props`               | Spoil heaps + tether posts                            | Abstract mounds/posts                                                                                           | M4 (optional)     |
| `asset-camp-fire`                | Camp fire points (the dusk signature)                 | Emissive cones + glow discs, deliberately not real lights                                                       | M4 (optional)     |
| `asset-livestock-placeholder`    | Sheep/goat flocks + cattle (spoil, 1 Sam 30:20)       | Low-poly instanced quadrupeds, color-varied, not real breeds                                                    | M3                |
| `asset-camel-placeholder`        | The four hundred fleeing on camels (flight beat only) | Low-poly dromedary+rider merged form, pad tack only (no frame saddle — register #6)                             | M3                |

## Current placeholders (beth-shan-walls scene, Milestone 3, built 2026-07-15)

| Asset                          | Represents                                                                                                                              | Why temporary                                                                                                                                                                                                                                                                                                        | Replace at                                                            |
| ------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------- |
| `asset-terrain-beth-shan-tell` | Beth-shan tell above the Harod/Jordan valley junction: mound, flattened summit, valley-road approach, eastern fall to the Jordan valley | Procedural hills + hand-tuned mound/flatten/ramp features, not DEM-derived from the real, extensively surveyed tell                                                                                                                                                                                                  | M4                                                                    |
| `asset-tell-town-blocks`       | Iron I domestic quarter on the Beth-shan summit                                                                                         | Simple box massing from a scene-local layout (`src/scenes/beth-shan-walls/layout.ts`, ADR-006 conventions), not the excavated Iron I plan                                                                                                                                                                            | M4                                                                    |
| `asset-beth-shan-wall`         | Narrated wall of Beth-shan (1 Sam 31:10, 12) above the gate plaza                                                                       | Generic modest mudbrick-on-stone wall + simple two-tower gate, disclosed as archaeologically thin per `claim-beth-shan-wall` (no substantial Iron I fortification clearly attested)                                                                                                                                  | M4                                                                    |
| `asset-display-forms`          | The four bound, wrapped bodies fastened to the wall (Saul and his sons) — `claim-body-display`                                          | Single parametrized lathe-revolved wrapped-cloth silhouette (`src/engine/characters/wrappedForm.ts`, `buildWrappedFormGeometry`), anatomically unresolved _by design_, not awaiting detail — ADR-009 permanently bans head/limb articulation for this content in any mode; reused by `jabesh-burial` at bundle scale | M4 (cloth/weathering fidelity only — anatomy constraint is permanent) |
| `asset-egyptian-monuments`     | One or two weathered Egyptian monuments in the Iron Age town — `claim-egyptian-monuments`                                               | Simple primitive stela-slab/statue-block geometry, not modeled reproductions of the excavated Seti I stelae or the Ramesses III statue; placement page-verification queued (queue #16)                                                                                                                               | M4                                                                    |
| `asset-bier-props`             | Plank-and-pole frames the men of Jabesh use to bear the bodies away — `claim-jabesh-retrieval`; also used by `jabesh-burial`            | Simple box/cylinder primitive geometry, appears only during the night retrieval's carry-out                                                                                                                                                                                                                          | M4                                                                    |
| `asset-torch-sprites`          | Torchlight at the wall during the night retrieval (`b-retrieval`); also used by `jabesh-burial`                                         | Emissive flame-cone + ember-glow discs (two instanced meshes), reusing the amalekite-camp fire-sprite technique (`asset-camp-fire`), deliberately not real lights                                                                                                                                                    | M4                                                                    |

## Current placeholders (jabesh-burial scene, Milestone 3, built 2026-07-15)

| Asset                       | Represents                                                                                                                          | Why temporary                                                                                                                                                                                                   | Replace at                                                                |
| --------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------- |
| `asset-terrain-jabesh-wadi` | Terraced Gilead hill-flank ground above a modest perennial wadi (Wadi Yabis form) — `claim-gilead-terrain`, `claim-jabesh-location` | Procedural noise + hand-tuned channel feature (ADR-005), not derived from real elevation data of either candidate site — the composite setting is deliberate, not a data gap                                    | M4                                                                        |
| `asset-tamarisk-tree`       | The single mature tamarisk under which the bones are buried (1 Sam 31:13a) — `claim-tamarisk-burial`                                | Generic multi-lobed canopy over a trunk cylinder, not a species-accurate tamarisk model; Chronicles oak/terebinth variant carried as a label note, not an alternate model                                       | M4                                                                        |
| `asset-pyre`                | Stacked-timber platform covering the four wrapped forms before burning (1 Sam 31:12b) — `claim-burning-bodies`                      | Generic stacked-cylinder log geometry + emissive flame/glow sprites; deliberately never renders before the forms are fully covered, in any mode — a permanent ADR-009 constraint, not a placeholder gap         | M4 (log detail/smoke only — covered-before-flame sequencing is permanent) |
| `asset-village-cluster`     | Small open, unwalled house cluster on the Jabesh-gilead village terrace — `claim-jabesh-town-form`                                  | Simple box massing from a scene-local layout (`src/scenes/jabesh-burial/layout.ts`, ADR-006 conventions) — a looser form than both Ziklag's ring and Beth-shan's dense summit quarter, no excavated plan exists | M4                                                                        |
| `asset-vegetation-gilead`   | Oak/scrub cover on the Gilead slopes + tamarisk/oleander waterline along the Wadi Yabis — `claim-gilead-terrain`                    | Disclosed broadening of the generic instanced scrub/blob-tree families (`asset-vegetation-scrub`, `asset-olive-tree`) with a Gilead palette + distance-to-channel density gradient, not species-differentiated  | M4                                                                        |

Also reuses `asset-bier-props`, `asset-torch-sprites` (both beth-shan-walls,
by id), `asset-figure-procedural`, and `asset-rocks` — no new records for
these.

## Current placeholders (ziklag-lament scene, Milestone 4, built 2026-07-22, PROVISIONAL)

The cheapest scene shipped so far: reused `ziklag` terrain/settlement geometry
(damage-state re-dressed, no new geometry family) and a cast an order of
magnitude smaller than any prior scene. Only one genuinely new asset:

| Asset                | Represents                                                                                                   | Why temporary                                                                                                                                                   | Replace at                                                        |
| -------------------- | ------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------- |
| `asset-royal-tokens` | Crown and armlet the messenger brings to David as tokens of Saul's death (2 Sam 1:10) — `claim-royal-tokens` | Two small primitive torus meshes; no securely identified Iron Age Israelite royal regalia exists to model from, so exact form is a permanent design placeholder | M4 (material/finish fidelity only — form constraint is permanent) |

Reuses `asset-terrain-negev`, `asset-house-block`, `asset-perimeter-wall`,
`asset-gate-simple` (damage-state re-dressed for a "recovering" town, not a
new geometry family — see `RecoveringSettlement.tsx`), `asset-figure-procedural`
(the messenger and the small witness cluster), `asset-david-marker`,
`asset-vegetation-scrub`, `asset-olive-tree`, and `asset-rocks` — no new
records for these. This scene's status stays `in-progress`
(`docs/design/ziklag-lament-brief.md` is a Sonnet-authored provisional brief,
Fable-unavailable fallback, tracked at `fable-review-queue.md` #18) pending a
real Fable pass before it can ship `released`.

## Current placeholders (hebron-anointing scene, Milestone 4, built 2026-07-22, PROVISIONAL)

The largest M4 crowd (~250-310 figures at high tier across three distinct,
disclosed crowd-scale treatments — David's ~600 men at the standard ~1:10
ratio, a ~40-50-figure household column, and a ~150-200-figure representative
Judah assembly), but a static/ceremonial one, not a moving battle line — the
project's fifth regional terrain palette (Judean highland).

| Asset                        | Represents                                                                                                                | Why temporary                                                                                                                                                                                                  | Replace at |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------- |
| `asset-terrain-hebron-hills` | Terraced limestone hill country above Hebron's spring-fed valley, with a south approach ridge — `claim-hebron-town-form`  | Procedural noise + hand-tuned mound/channel/ridge/ramp features (ADR-005), not derived from real elevation data for Tell Rumeida or its valley                                                                 | M4         |
| `asset-hebron-town-form`     | The modest hill-town/gate-plaza structure on Tell Rumeida — `claim-hebron-town-form`                                      | Simple box massing from a scene-local layout (ADR-006 conventions), not a reproduction of any excavated Tell Rumeida plan — no dedicated excavation-results source card exists yet (researcher gap, queue #18) | M4         |
| `asset-terrace-walls`        | Judean hill-country dry-stone terrace walls for olive/vine cultivation                                                    | Generic instanced low stone-wall segments following elevation contour bands, not surveyed or excavated terrace remains                                                                                         | M4         |
| `asset-household-camp`       | The satellite camp where David's men's households settle "in the towns of Hebron" (2 Sam 2:3) — `claim-david-move-hebron` | Simple tent/lean-structure primitive geometry at a disclosed design-choice headcount (~40-50 figures), not a reconstruction of any specific excavated domestic form                                            | M4         |
| `asset-anointing-props`      | The oil vessel used in the anointing gesture staged for 2 Sam 2:4 — `claim-anointing-rite-form`                           | A single primitive horn-shaped mesh; 2:4 narrates the fact of anointing only, not the vessel or physical choreography, so exact form is a disclosed design placeholder                                         | M4         |

Reuses `asset-figure-procedural`, `asset-david-marker`, `asset-olive-tree`,
and `asset-rocks` — no new records for these. This scene's status stays
`in-progress` (`docs/design/hebron-anointing-brief.md` is a Sonnet-authored
provisional brief, Fable-unavailable fallback, tracked at
`fable-review-queue.md` #18) pending a real Fable pass before it can ship
`released` — in particular a `researcher` pass on the Tell Rumeida
excavation-results citation gap noted on `claim-hebron-town-form` /
`asset-hebron-town-form`.

## Current placeholders (gibeon-pool scene, Milestone 4, built 2026-07-23, PROVISIONAL)

The last of the three M4 scenes, and the smallest combat-figure total the
project has staged (~90-115 high-tier combat figures — 24 champions rendered
literally 1:1, plus disclosed-design-count Benjamin/Judah contingents —
noticeably below `gilboa-battle`'s already-modest 120-140). Two genuinely new
asset families: the basin/water-plane terrain feature, and the extension of
`engine/terrain.ts`'s `TerrainSpec` with a new `basin` kind.

| Asset                       | Represents                                                                                                                           | Why temporary                                                                                                                                                                             | Replace at |
| --------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------- |
| `asset-terrain-gibeon-pool` | The Gibeon plateau: pool basin, champions' ground, spreading battlefield, pursuit route, hill of Ammah — `claim-gibeon-terrain-form` | Procedural noise + hand-tuned basin/mound/ramp features (ADR-005, extended with a new `basin` `TerrainFeature` kind), not derived from real elevation data for Tell el-Jib or its plateau | M4         |
| `asset-water-plane`         | Standing water in the pool basin (2 Sam 2:13) — `claim-gibeon-terrain-form`                                                          | Single flat, minimally-lit tinted plane nested inside the basin depression; no reflection/refraction/ripple shader, matching the gilboa-battle/jabesh-burial precedent of declining one   | M4         |

Reuses `asset-figure-fallen` (the champions' mutual fall, the wider
contingents' battle-spread casualties, and Asahel's death), `asset-figure-
procedural`/`asset-david-marker` (Abner, Joab, Abishai, Asahel), `asset-
military-kit-israelite` (spear/oval-shield/bow on both sides, undifferentiated,
plus the straight-sword builder for the champions' contest), `asset-dust-
motion` (single-density reuse for the `b-battle-spreads` beat, see
`BattleDust.tsx`), and `asset-rocks`/`asset-vegetation-scrub` (no new
regional vegetation system) — no new records for these. This scene's status
stays `in-progress` (`docs/design/gibeon-pool-brief.md` is a Sonnet-authored
provisional brief, Fable-unavailable fallback, tracked at
`fable-review-queue.md` #18) pending a real Fable pass before it can ship
`released` — in particular the `researcher` flag on `claim-gibeon-pool-form`'s
open dating question (does the excavated rock-cut pool/tunnel system predate
or postdate the early Iron IIA setting of 2 Samuel 2?).

## Upcoming needs by milestone

- **M2 (Besor/recovery):** both scenes built 2026-07-08 (`besor-crossing`,
  `amalekite-camp` — see tables above); the resolved camel call is implemented
  (flight beat only, minimal early tack, dispute surfaced in-scene,
  `asset-camel-placeholder`, modeled replacement at M3). Real elevation data
  investigation (`f-dem-terrain`) still outstanding for the Besor scene; n/a
  for the camp basin (unlocatable site — stays a labeled generic).
- **M3 (Gilboa):** all three scenes built (`gilboa-battle`, `beth-shan-walls`,
  `jabesh-burial` — see tables above): period-dressed modeled figures
  (`f-period-figures`) replaced capsules; battlefield terrain, Beth-shan
  city/wall, Jabesh-gilead route assets, and the reduced-intensity violence
  rendering path (ADR-009) all shipped, each scene still `status:
'in-progress'` pending Fable M3 sign-off (queue #13/#16/#17 gate `released`).
- **M4 (2 Sam 1–2):** all three planned M4 scenes now built — `ziklag-lament`
  and `hebron-anointing` (2026-07-22) and `gibeon-pool` (2026-07-23), all
  PROVISIONAL/`in-progress` pending a real Fable pass (queue #18); regional
  overview map (`f-overview-map`) with confidence-shaded political geography
  still outstanding.

## Policy

No placeholder ships silently. Every one is labeled in the UI (basis chip =
"Design placeholder", dashed border) and listed here and in `assets.ts` before a
scene is marked `released`.
