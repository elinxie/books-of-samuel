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

## Current placeholders (gibeon-pool scene, Milestone 4, built 2026-08-02, PROVISIONAL)

Third and last M4 scene: twenty-four champions rendered literally 1:1 (2 Sam
2:14-16's own exact number), the two wider contingents at a disclosed
design-choice scale deliberately smaller than gilboa-battle's (~90-115
high-tier combat total), and the project's first named-character-kills-named-
character death (Asahel) — documentary distance, the reversed-spear-grip
gesture shown without penetration, and 2:23b's "stood still" reaction beat
implemented as a literal motion freeze across the whole pursuing cast. One
new terrain-engine primitive (`basin`, `src/engine/terrain.ts`) for the pool
depression.

| Asset                          | Represents                                                                                                                      | Why temporary                                                                                                                                                                                      | Replace at |
| ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------- |
| `asset-terrain-gibeon-plateau` | The Benjamin-highlands plateau around Gibeon, the pursuit route, and the hill of Ammah                                          | Procedural hills + a hand-tuned mound (the hill of Ammah), not DEM-derived from Tell el-Jib or its surroundings                                                                                    | M4         |
| `asset-gibeon-pool-basin`      | The rock-cut pool named at 2 Sam 2:13 — `claim-gibeon-pool-form`, `claim-gibeon-terrain-form`                                   | A shallow, flat-floored radial depression (new `basin` `TerrainFeature` kind), modest disclosed dimensions — not Pritchard's excavated monumental pool/tunnel form; the dating question stays open | M4         |
| `asset-water-plane`            | The pool's water surface                                                                                                        | A single flat, minimally-lit tinted disc — no reflection/refraction/ripple shader, matching gilboa-battle/jabesh-burial's declined-water-shader precedent (`asset-water-pool`)                     | M4         |
| `asset-military-kit-gibeon`    | Spear/oval shield on both wider contingents; the straight sword 2 Sam 2:16 names for the champions; Abner's reversed-grip spear | Primitive-geometry attachments (`src/scenes/gibeon-pool/kitMeshes.ts`), deliberately undifferentiated between Abner's and Joab's sides (`claim-dress`) — no invented Judah/Benjamin kit split      | M4         |

Reuses `asset-figure-procedural`, `asset-figure-fallen`, `asset-dust-motion`
(a lighter, single-group reuse of gilboa-battle's GPU point-sprite dust
technique over the spread battlefield), `asset-vegetation-scrub`, and
`asset-rocks` — no new records for these. This scene's status stays
`in-progress` (`docs/design/gibeon-pool-brief.md` is a Sonnet-authored
provisional brief, Fable-unavailable fallback, tracked at
`fable-review-queue.md` #18) pending a real Fable pass before it can ship
`released` — in particular the open dating question on
`claim-gibeon-pool-form`/`asset-gibeon-pool-basin` (does Pritchard's
excavated pool/tunnel predate or postdate the early Iron IIA setting of
2 Samuel 2?), already tracked in `docs/next-run.md`.

## Current placeholders (hebron-covenant scene, Milestone 5, built 2026-08-10)

First M5 scene, deliberately the cheapest: the same Hebron terrain/town/
terrace assets hebron-anointing built are reused directly (no new terrain
spec, no new town-form asset — see `src/scenes/hebron-covenant/terrain.ts`
and `layout.ts`, which import hebron-anointing's `HEBRON_TERRAIN_SPEC` and
town/plaza/terrace layout constants rather than re-generating them). Abner's
twenty rendered literally 1:1 (2 Sam 3:20's own count); a small
David's-side feast presence and ambient town background at disclosed
design counts (~15-25 / ~20-30 at high tier); total cast ≈70 figures at
high tier, the smallest of any scene so far. One genuinely new asset:

| Asset               | Represents                                                                            | Why temporary                                                                                                                                                                 | Replace at |
| ------------------- | ------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------- |
| `asset-feast-props` | The open-air meal David lays for Abner and his men (2 Sam 3:20b) — `claim-feast-form` | A single small instanced prop family (mats at every seating slot, a handful of shared low vessels); the text names only the fact of a feast, no physical/architectural detail | M5         |

Reuses `asset-terrain-hebron-hills`, `asset-hebron-town-form`,
`asset-terrace-walls`, `asset-figure-procedural`, `asset-david-marker`,
`asset-olive-tree`, and `asset-rocks` — no new records for these (all
imported/re-instantiated from hebron-anointing's own spec/layout data, per
ADR-006). The seated posture for both feast-side crowds and the two named
principals (David, Abner) is a rigid-body squash-and-lower transform on the
existing ADR-010 rig — the same kind of stylized device already used for
the fallen pose at gibeon-pool/gilboa-battle (`asset-figure-fallen`), not a
new asset record of its own. This scene's status stays `in-progress`
pending a Fable M5 sign-off review (`docs/next-run.md`), and its shared
passage (`2sam-3`, also used by the not-yet-built `hebron-gate`) carries
only one short ESV quote (3:21a) — the remaining shared excerpt budget is
reserved for `hebron-gate`'s lament, per the brief.

## Current placeholders (hebron-gate scene, Milestone 5, built 2026-08-10)

Second, load-bearing M5 scene — the second application of ADR-009's
named-character-killing template (`gibeon-pool`'s Asahel death set the
template). Same Hebron terrain/town/terrace/ambient-town assets reused
directly again (`src/scenes/hebron-gate/terrain.ts` and `layout.ts` import
`HEBRON_TERRAIN_SPEC` from hebron-anointing and `NORTH_ROAD_CURVE`/
`TOWN_AMBIENT_SLOTS` from hebron-covenant, rather than re-generating them).
Joab's raid party (~15-25), the mourning assembly (~60-90, the scene's one
crowd that moves, at funeral pace along a single shared route curve), and
ambient town background (~15-25) are all disclosed design counts
(`claim-gate-cast-scale`); with the four named principals (David, Joab,
Abner, Abishai) the high-tier total is ≈100-140 figures, the largest M5
scene by figure count but cheaper than a combat scene (no fight
choreography). One genuinely new asset:

| Asset                       | Represents                                                      | Why temporary                                                                                                                                                                                                                   | Replace at |
| --------------------------- | --------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------- |
| `asset-hebron-gate-passage` | "The midst of the gate" (2 Sam 3:27) — `claim-hebron-gate-form` | Simple box-massed piers/corridor/roof built on hebron-anointing's own gate-post line; deliberately not a monumental six-chamber gate; no walkable interior modeled since the camera never enters (ADR-009 documentary distance) | M5         |

Abner's bier reuses `asset-bier-props` (jabesh-burial's existing plank-and-pole
carrying frame record) rather than a new asset — the same
`buildWrappedFormGeometry` wrapped-cloth silhouette Beth-shan/Jabesh already
established for the ADR-009 funerary standard, at full-length scale, with no
new record needed (jabesh-burial's own `Biers.tsx` also uses this builder
without a dedicated asset entry of its own). The fallen/collapse transform at
the strike reuses `asset-figure-fallen`. The tomb ground (a simple rock-cut
entry, `claim-abner-tomb-form` — explicitly not the medieval "Tomb of Abner"
tradition/site) is built from the same generic primitive-geometry vocabulary
already used everywhere else in the project and does not warrant its own
asset record. This scene's status stays `in-progress` pending a Fable M5
sign-off review (`docs/next-run.md`); its shared passage (`2sam-3`) now
carries its full three-quote ESV budget: one from hebron-covenant (3:21a)
and two here (the 3:33b-34a lament core and 3:38).

## Current placeholders (hebron-reckoning scene, Milestone 5, built 2026-08-10)

Third and last M5 scene, closing the milestone — ADR-009's named-character-
killing template's third application, and its first judicial one (the
execution of Rechab and Baanah, 2 Sam 4:12a). Stricter than gibeon-pool's
reversed-spear-grip and hebron-gate's strike lean: 4:12a gives no method
detail to invent, so no gesture at all precedes the collapse in either mode
(`src/scenes/hebron-reckoning/poses.ts`). The hands-and-feet display itself
is an absolute bar — it renders in no mode, caption-only, not even a
shrouded/wrapped-form stand-in (unlike Beth-shan's whole-body display, there
is no honest non-anatomical way to render a severed-limb display). Same
Hebron terrain/town/terrace assets reused directly again
(`src/scenes/hebron-reckoning/terrain.ts` extends `HEBRON_TERRAIN_SPEC` from
hebron-anointing with one added landform), and the tomb ground is the
literal same ground `hebron-gate` built (`TombGround` imported directly, no
new component). David's attendants (~8-14, "the young men" of 4:12a) and
ambient town background (~10-20) are disclosed design counts
(`claim-reckoning-cast-scale`); with the three named principals (David,
Rechab, Baanah) the high-tier total is ≈20-35 figures — by far the smallest
M5 scene, conversation-scale like `ziklag-lament` (its structural twin). One
genuinely new asset:

| Asset                     | Represents                                                    | Why temporary                                                                                                                                                                                                                                              | Replace at |
| ------------------------- | ------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------- |
| `asset-hebron-pool-basin` | The pool of Hebron (2 Sam 4:12) — `claim-hebron-pool-feature` | A shallow basin depression + flat water plane, same device as `asset-gibeon-pool-basin`/`asset-water-plane`; explicitly not the extant Birket es-Sultan pool/site in modern Hebron, which postdates this scene's Iron IIA setting by roughly two millennia | M5         |

The head of Ish-bosheth (4:8, 4:12b) reuses `asset-display-forms`'s
`buildWrappedFormGeometry` builder at a short length scale — the same device
already used for Jabesh's bone bundle — rather than a new asset record; the
fallen/collapse transform at the execution reuses `asset-figure-fallen`. The
murder itself (4:5-7) is cards-only: Mahanaim is disputed and never built
(the standing rule since gibeon-pool), so no geometry, no new asset, exists
for it. This scene's status stays `in-progress` pending a Fable M5 sign-off
review (`docs/next-run.md`); its own fresh passage (`2sam-4`) carries two
ESV quotes (the 4:11a verdict core and the 4:10 Ziklag-retelling fragment),
under its own 3-quote budget.

## Current placeholders (jerusalem-stronghold scene, Milestone 6, built 2026-08-24)

The project's first geometry at Jerusalem, and M6's load-bearing scene. A
new, fresh Judean-highland-palette terrain (the ridge/valley landform is new;
the palette values are carried directly from `asset-terrain-hebron-hills`,
not reinvented). No capture-mechanism geometry of any kind renders in any
mode (no water shaft, tunnel, hook, scaling, or siege equipment) — the
capture itself (5:7) is staged as the narrative's own unrendered gap. Cast:
David's force (~40-60, approach column then occupying presence), the
Jebusite stronghold population (~25-40, static wall presence, never enacting
the "blind and the lame" taunt), Tyrian craftsmen (~10-15, static, at the
construction ground), and an ambient settlement presence after the
occupation (~20-30, static, deliberately not asserting continuity or
replacement of the Jebusite population) — plus David as the one
principal-detail rig. High-tier total ≈120 figures, within the brief's
100-130 target and well below `gilboa-battle`'s measured band.

| Asset                                 | Represents                                                                                                                     | Why temporary                                                                                                                                                                                               | Replace at |
| ------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------- |
| `asset-terrain-jerusalem-ridge`       | The narrow, steep-sided City of David ridge, the Kidron/western valleys, and the Gihon spring — `claim-jerusalem-terrain-form` | Procedural hills + hand-tuned ridge/channel/flatten/mound/basin features (ADR-005), not DEM-derived; palette carried directly from `asset-terrain-hebron-hills`                                             | M6         |
| `asset-jerusalem-stronghold-form`     | The stone circuit and simple two-post gateway at the ridge's high end — `claim-jebusite-stronghold-form`                       | Simple instanced wall-segment ring, deliberately not a monumental six-chamber gate, casemate system, glacis, or towers — the render sits at the conservative end of the extent dispute by deliberate policy | M6         |
| `asset-jerusalem-terrace-walls`       | Terracing on the eastern (Kidron-facing) slope, the Millo question's own ground — `claim-millo-identification`                 | Generic instanced wall segments in bands parallel to the ridge axis — no rendered element is labeled "the Millo"                                                                                            | M6         |
| `asset-gihon-spring-basin`            | The Gihon spring's outflow at the foot of the eastern slope — `claim-gihon-spring`                                             | Shallow basin depression (`engine/terrain.ts`'s `basin` feature) + flat water plane (`asset-water-plane`'s technique) — no shaft, tunnel, channel, or monumental spring fortification in any mode           | M6         |
| `asset-jerusalem-construction-ground` | Timber baulks, dressed-stone courses, and a partially raised structure — `claim-hiram-building`                                | Simple primitive cylinder/box geometry standing for cedar timber and dressed stone; deliberately not a finished cedar palace and not any 9th-8th century royal-architecture vocabulary                      | M6         |

Reuses `asset-figure-procedural`, `asset-david-marker`, `asset-olive-tree`,
`asset-rocks`, and `asset-water-plane` — no new records for these. **Released
2026-08-25** (`docs/fable-review-queue.md`'s #21-#24 all closed, #24 via
ADR-013). Its fresh passage (`2sam-5`, shared with `rephaim-valley`) carries
two of its shared 3-quote ESV budget (5:6b's taunt, 5:8a's tsinnôr clause);
the third (5:24) is spent by `rephaim-valley`, below. Live-source ESV
wording verification for both quotes is still open, non-blocking, carried
forward per the standing pre-release-caveat pattern.

## Current placeholders (rephaim-valley scene, Milestone 6, built 2026-08-24)

Milestone 6's second and last scene, and the project's second battle scene
after `gilboa-battle` — deliberately a much lighter violence treatment: no
fight-stance pose buckets and no melee-clash cycle anywhere (contrast
`gilboa-battle`'s `defenderClashPose`/`clashPhase01`), both engagements read
purely as formation movement (an advance, a formation breaking, a
population dispersing). A new, fresh Judean-highland-palette terrain (the
valley/rim landform is new; the palette values are carried directly from
`asset-terrain-hebron-hills`/`asset-terrain-jerusalem-ridge`, not
reinvented) — no Jerusalem geometry renders anywhere in this scene, not
even an undetailed horizon ridge (stricter than the brief's "at most"
allowance). No divination apparatus renders at either inquiry beat (no
ephod, lots, priest, altar, or shrine), and the 5:24 sign is never
visualized anywhere — no wind, light, or canopy motion keyed to the wait
beat (`claim-divine-sign-depiction`, escalated as `fable-review-queue` #24,
this scene's single most load-bearing constraint). Cast: one Philistine
population (~55-70 at high tier) and one force for David (~45-60),
_repositioned, never doubled_, across both phases, plus David and 3-4
unnamed companions at the inquiry beats — measured at ~131 figures at high
tier, below `gilboa-battle`'s measured ~330 and materially cheaper per
figure (formation movement along two shared route curves —
`ADVANCE_ROUTE_CURVE`/`FLANK_ROUTE_CURVE`/`ENGAGE_TWO_ROUTE_CURVE` — with
per-figure lane offsets, the `hebron-gate` procession pattern, rather than
per-figure pathing or pose-bucket cycling).

| Asset                          | Represents                                                                                          | Why temporary                                                                                                                                                          | Replace at |
| ------------------------------ | --------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------- |
| `asset-terrain-rephaim-valley` | A broad, open valley floor with a rising highland rim along one side — `claim-rephaim-terrain-form` | Procedural hills + a `ridge` feature for the rim and a gentle `ramp` into the floor (ADR-005), not DEM-derived; palette carried directly from the Judean-highland spec | M6         |
| `asset-bakaim-grove`           | The unidentified small-canopy trees of 5:23-24 — `claim-bakaim-grove`                               | Generic instanced tree form, no species asserted — deliberately not mulberry (Morus) and not a distinctive resin/balsam form                                           | M6         |

Reuses `asset-figure-procedural`, `asset-figure-fallen`,
`asset-military-kit-israelite`, `asset-military-kit-philistine` (both from
`gilboa-battle`'s `kitMeshes.ts`, imported directly — the `beth-shan-walls`
precedent for cross-scene kit reuse), and `asset-david-marker` — no new
records for these. Baal-perazim (5:20b) is staged but never located: no
`LocationEntry`, no atlas pin, per the same discipline that keeps Mahanaim
unbuilt. **Released 2026-08-25** (`docs/fable-review-queue.md`'s #21-#24 all
closed, #24 via `docs/architecture-decisions/adr-013-narrated-supernatural-
depiction.md`, ratifying this scene's never-visualized-sign treatment as
project-wide policy). Its shared passage (`2sam-5`) spends its third and
last ESV quote here (5:24's "the sound of marching in the tops of the
balsam trees") — entered from the build agent's own recollection, not a
live source check (this sandbox session had no outbound access to
Bible-text sites and no `WebSearch` tool). Live-source verification of this
quote (and the two `jerusalem-stronghold` quotes above) is still open,
non-blocking, carried forward — unlike M4/M5, where the equivalent ESV
wording check was closed as part of the citation-gate pass before the
release flip, M6's release wasn't gated on it and it stays an open rider.

## Divided-kingdom atlas overlay (`/atlas`, Milestone 4, built 2026-08-02)

Not a 3D-scene asset, so it has no `AssetRecord` in `src/data/assets.ts` — the
project's placeholder-asset machinery (`whyTemporary`/`historicalRequirements`/
`replacementMilestoneId`) is scoped to modeled/procedural scene geometry, and
this is a 2D SVG UI page (`src/pages/AtlasPage.tsx`,
`src/ui/DividedKingdomMap.tsx`). Noted here anyway because it's a genuinely new
placeholder-fidelity rendering approach worth tracking: a plain
equirectangular-ish SVG projection (no external tileset/basemap, no modern
borders or place names), location markers sized by `approxCoordinates`
confidence, and two soft, Gaussian-blurred radial-gradient region shapes for
Ish-bosheth's writ vs. the house of Judah — deliberately never a bordered
polygon (per `claim-divided-kingdom-atlas-overlay` and the 2026-08-02 Fable
review, `docs/fable-review-queue.md` #18). Region shapes/softness/projection
are the disclosed design-placeholder layer; the underlying allegiance split is
biblical text at high confidence (`claim-ish-bosheth-installed`,
`claim-judah-anointing`). Toggleable (shading can be turned off, leaving just
the plotted points) and reached only by choosing to visit `/atlas` — no forced
gate, per ADR-011.

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
- **M4 (2 Sam 1–2):** all three scenes now built — `ziklag-lament` and
  `hebron-anointing` 2026-07-22, `gibeon-pool` 2026-08-02 (see tables above);
  all three approved as built at the 2026-08-02 Fable review (queue #18
  resolved), still `in-progress` pending queue #19's citation gates. The 4th
  goal's divided-kingdom atlas overlay (`/atlas`) also built 2026-08-02 (see
  section above) — the wider `f-overview-map` feature (Philistia/Amalekite
  fringe too) stays a separate, still-`planned` future scope.
- **M5 (2 Sam 3–4):** all three scenes now built 2026-08-10 —
  `hebron-covenant`, `hebron-gate`, and `hebron-reckoning`, all at the
  already-built Hebron (see tables above). `hebron-reckoning` closes the
  milestone at the tomb of Abner; all three remain `in-progress` pending a
  Fable M5 sign-off review.
- **M6 (2 Sam 5): released 2026-08-25.** Both scenes built 2026-08-24 —
  `jerusalem-stronghold` (the project's first geometry at Jerusalem) and
  `rephaim-valley` (5:17-25, both Philistine engagements, see tables above)
  — plus the `/atlas` M6 phase extension (the two regions unify, the
  capital shifts Hebron -> Jerusalem), also built 2026-08-24, same session
  as the two scenes. Queue #24 (narrated divine-sign depiction policy)
  closed via ADR-013; release cascade executed 2026-08-25.

## Policy

No placeholder ships silently. Every one is labeled in the UI (basis chip =
"Design placeholder", dashed border) and listed here and in `assets.ts` before a
scene is marked `released`.
