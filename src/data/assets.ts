import type { AssetRecord } from './types';

/**
 * Asset registry. Everything marked `placeholder: true` is disclosed in the UI
 * and tracked in /docs/asset-roadmap.md with replacement requirements.
 */
export const ASSETS: AssetRecord[] = [
  {
    id: 'asset-terrain-negev',
    name: 'Procedural Negev terrain',
    represents: 'Semi-arid loess/chalk hill country of the Ziklag frontier',
    placeholder: true,
    whyTemporary:
      'Heightfield is procedural noise shaped by hand, not derived from real elevation data of any candidate site.',
    historicalRequirements:
      'DEM-derived terrain for the adopted candidate site(s) (Tel Sera’ / Tel Halif / Khirbet al-Ra’i surroundings), with wadi courses in correct positions.',
    replacementMilestoneId: 'M2',
  },
  {
    id: 'asset-house-block',
    name: 'Mudbrick house massing blocks',
    represents: 'Dwellings of a small early Iron Age frontier town (burned state)',
    placeholder: true,
    whyTemporary:
      'Simple box massing with flat roofs; no pillared plans, courtyards, or interiors.',
    historicalRequirements:
      'Modeled houses reflecting Iron I–IIA southern types (incl. pillared/four-room variants where defensible), mudbrick over stone socle, roof construction visible in ruined state.',
    replacementMilestoneId: 'M2',
  },
  {
    id: 'asset-perimeter-wall',
    name: 'Perimeter wall segments',
    represents: 'Speculative town enclosure (belt of walls/houses)',
    placeholder: true,
    whyTemporary: 'Generic low wall ring; the real town’s enclosure form is unknown.',
    historicalRequirements:
      'Enclosure consistent with the adopted site candidate’s excavated evidence, or explicitly labeled speculative composite.',
    replacementMilestoneId: 'M3',
  },
  {
    id: 'asset-gate-simple',
    name: 'Simple gate with flanking towers',
    represents: 'Town gate (speculative)',
    placeholder: true,
    whyTemporary: 'Generic two-tower gap, not based on an excavated gate plan of this period/site.',
    historicalRequirements:
      'Gate form defensible for a small Iron I–IIA town (e.g., simple two-chamber), with sources.',
    replacementMilestoneId: 'M3',
  },
  {
    id: 'asset-figure-procedural',
    name: 'Procedural period figures',
    represents: 'David’s men (rendered ~1:10 of the narrated six hundred)',
    placeholder: true,
    whyTemporary:
      'Procedurally generated skinned figures with period dress (tunic, belt, mantle, sandals, head wrap, beard) and gait animation (ADR-010). Dress details and gear have not yet passed full historical review.',
    historicalRequirements:
      'Full King & Stager dress/gear review, plus pack animals and no anachronistic armor.',
    replacementMilestoneId: 'M3',
    modelPath: 'src/engine/characters',
    modelLicense: 'project-original',
    modelProvenance:
      'Generated in code by src/engine/characters; no external mesh or texture sources. See ADR-010.',
  },
  {
    id: 'asset-david-marker',
    name: 'Named-figure marker rigs',
    represents:
      'Named narrative figures within a crowd (David, Abiathar; from M2, the Egyptian servant)',
    placeholder: true,
    whyTemporary:
      'A principal-detail procedural rig (ADR-010) with a segmented (torso/head/limb) silhouette, distinguished from the crowd only by pinned dress colors and a label — identity remains label-based by design. Bone-driven pose animation (`applyClipPose`) is still an unimplemented stub; principal figures are posed as rigid groups via the same pure-pose-function pattern as the crowd (ADR-007), not skeletally animated.',
    historicalRequirements:
      'Same as figures; no portraiture pretensions — identity stays label-based.',
    replacementMilestoneId: 'M3',
    modelPath: 'src/engine/characters',
    modelLicense: 'project-original',
    modelProvenance:
      'Generated in code by src/engine/characters; no external mesh or texture sources. See ADR-010.',
  },
  {
    id: 'asset-smoke-particles',
    name: 'Smoke columns (GPU particles)',
    represents: 'Smoldering aftermath of the burning',
    placeholder: true,
    whyTemporary:
      'Stylized particle smoke is acceptable long-term for a transient phenomenon; flagged for optional upgrade only.',
    historicalRequirements: 'None strictly; visual upgrade optional.',
    replacementMilestoneId: 'M4',
  },
  {
    id: 'asset-vegetation-scrub',
    name: 'Instanced steppe scrub',
    represents: 'Semi-arid dwarf-shrub steppe cover',
    placeholder: true,
    whyTemporary: 'Generic low-poly clumps, not species-differentiated.',
    historicalRequirements:
      'Representative Negev-fringe flora (e.g., thorny burnet, wormwood, annual grasses) with seasonal state matching the scene date.',
    replacementMilestoneId: 'M3',
  },
  {
    id: 'asset-olive-tree',
    name: 'Blob trees',
    represents:
      'Scattered orchard/maquis trees (Ziklag); reused for wadi-bank tamarisk-type trees near the Besor bed (besor-crossing)',
    placeholder: true,
    whyTemporary: 'Trunk + canopy blobs, not species-differentiated.',
    historicalRequirements:
      'Olive/tamarisk/acacia models appropriate to the northwestern Negev fringe; density justified from surveys.',
    replacementMilestoneId: 'M3',
  },
  {
    id: 'asset-rocks',
    name: 'Instanced rocks',
    represents: 'Surface stone of loess/chalk country',
    placeholder: true,
    whyTemporary: 'Generic polyhedra.',
    historicalRequirements: 'Optional upgrade; keep unobtrusive.',
    replacementMilestoneId: 'M4',
  },
  {
    id: 'asset-well',
    name: 'Well/cistern head',
    represents: 'Water point near the settlement (illustrative)',
    placeholder: true,
    whyTemporary: 'Simple stone ring; form and placement illustrative.',
    historicalRequirements:
      'Cistern/well form per Iron Age Negev parallels (rock-cut cisterns, wadi wells), with sources.',
    replacementMilestoneId: 'M2',
  },
  {
    id: 'asset-threshing-floor',
    name: 'Threshing floor',
    represents: 'Grain-processing floor outside the gate (illustrative placement)',
    placeholder: true,
    whyTemporary: 'Flat disc; placement typical rather than evidenced.',
    historicalRequirements: 'Surface, size, and gate-adjacency per Borowski and comparative sites.',
    replacementMilestoneId: 'M2',
  },
  {
    id: 'asset-field-plots',
    name: 'Grain field plots',
    represents: 'Subsistence plots near the town',
    placeholder: true,
    whyTemporary: 'Flat tinted patches with row texture.',
    historicalRequirements:
      'Field systems, crop mix (wheat/barley), and seasonal state per Borowski; season must match scene dating once decided.',
    replacementMilestoneId: 'M2',
  },
  {
    id: 'asset-terrain-besor',
    name: 'Procedural Besor wadi terrain',
    represents: 'Braided wadi bed and loess banks at the brook Besor crossing',
    placeholder: true,
    whyTemporary:
      'Heightfield is procedural noise plus a hand-tuned channel feature, not derived from real elevation data of Nahal Besor.',
    historicalRequirements:
      'DEM-derived terrain for the wadi once a specific crossing point is adopted, with braid-channel and pool positions from survey rather than procedural placement.',
    replacementMilestoneId: 'M3',
  },
  {
    id: 'asset-terrain-gilboa-ridge',
    name: 'Procedural Gilboa ridge terrain',
    represents: 'Mount Gilboa ridge, northern Jezreel-side approach, and eastern rout slope',
    placeholder: true,
    whyTemporary:
      'Heightfield is procedural hills plus a hand-tuned ridge feature, not DEM-derived terrain from Jebel Faqqu’a/Gilboa.',
    historicalRequirements:
      'DEM-derived terrain only after a terrain-data sourcing/licensing ADR defines source, attribution, vertical datum, and resampling policy.',
    replacementMilestoneId: 'M4',
  },
  {
    id: 'asset-figure-fallen',
    name: 'Fallen/prone pose transform',
    represents:
      'The Gilboa death sequence and rout: sons overtaken, Saul wounded/kneeling and fallen, the armor-bearer following, and routing figures who crumple at distance',
    placeholder: true,
    whyTemporary:
      'A body-orientation/collapse transform (rotation + non-uniform scale) applied to the existing ADR-010 procedural rig, not a distinct fallen-body mesh or skeletal animation clip — see the pure pose functions in src/scenes/gilboa-battle/poses.ts. No wound, blood, or dismemberment geometry in either violence-rendering mode (ADR-009).',
    historicalRequirements:
      'A modeled prone/collapsed pose bucket on the ADR-010 rig (baked geometry per detail tier), and/or skeletal fall animation, once the character pipeline supports it beyond the current rigid-transform approach.',
    replacementMilestoneId: 'M4',
  },
  {
    id: 'asset-military-kit-israelite',
    name: 'Israelite military-kit attachments (spear, oval shield, bow)',
    represents:
      'Simple, non-uniform arms on Israelite combatants at Gilboa — spear, oval shield, and a minority of bows on the retinue; spear + shield on Saul, his sons, and his armor-bearer as marginally-better-equipped principals',
    placeholder: true,
    whyTemporary:
      'Cylinder/cone/sphere primitive geometry (see src/scenes/gilboa-battle/kitMeshes.ts), attached as InstancedMesh instances at a fixed offset from a representative joint position on the existing ADR-010 rig — not modeled weapon/shield assets and not bound to a specific excavated Israelite panoply. No sword is rendered on Israelite figures; the brief specifies swords for Philistines only.',
    historicalRequirements:
      'Modeled weapon/shield forms sourced from a specific comparative-ANE assemblage or excavated Iron I–IIA highland find, once the character/kit pipeline moves beyond primitive attachment geometry.',
    replacementMilestoneId: 'M4',
  },
  {
    id: 'asset-military-kit-philistine',
    name: 'Philistine military-kit attachments (round shield, straight sword, bow, plumed headdress)',
    represents:
      'The Philistine force’s distinct kit profile — bow on the forward archer element; round shield + straight sword on infantry and the kit-differentiated principal cluster; a plumed/feathered headdress (Medinet Habu "Sea Peoples" marker) on the principal cluster only',
    placeholder: true,
    whyTemporary:
      'Cylinder/cone/sphere/torus primitive geometry (see src/scenes/gilboa-battle/kitMeshes.ts), attached as InstancedMesh instances, not modeled weapon/shield/headdress assets. The headdress in particular carries a disputed ethnic/temporal attribution (Egyptian Medinet Habu relief, c. 1175 BCE, applied here to Iron I/IIA highland warfare) — see claim-philistine-kit’s scholarlyViews and docs/fable-review-queue.md item #13, which requires source page-verification before this scene ships released. It is rendered on the small kit-differentiated principal cluster only, never on crowd/infantry/archer instances, as the provisional, disclosed default.',
    historicalRequirements:
      'Modeled weapon/shield forms from a defensible comparative-ANE/Aegean-influenced assemblage, and a resolved (not provisional) citation for the headdress attribution and its applicability to this context, once fable-review-queue item #13 clears.',
    replacementMilestoneId: 'M4',
  },
  {
    id: 'asset-dust-motion',
    name: 'Rout-dust GPU sprite system',
    represents:
      'Dust kicked up by the mass movement of the routing Israelites draining down the eastern slope, and (lighter density) the Philistine press climbing the northern slope — the visual device the brief assigns to carry the scale of the defeat in place of a blow-by-blow crowd (illustrates claim-gilboa-rout, claim-battle-scale; not a new claim of its own)',
    placeholder: true,
    whyTemporary:
      'A stylized GPU point-sprite field (one shared shader material, vertex-displaced drift keyed to scene time, in the manner of ziklag/SmokeColumns.tsx — see src/scenes/gilboa-battle/RoutDust.tsx), not a physical dust/particle simulation. Density and drift direction are seeded and hand-tuned to the rout/press footprints, not derived from any period-specific account of visibility or weather.',
    historicalRequirements:
      'None achievable beyond stylization — no historical record specifies dust density or drift; any upgrade is a visual-fidelity improvement only (e.g. a true GPU particle-simulation pass), not a claim-driven replacement.',
    replacementMilestoneId: 'M4',
  },
  {
    id: 'asset-arrow-volley',
    name: 'Instanced arrow-volley projectiles',
    represents:
      'The archer volley of 1 Samuel 31:3 — three staggered waves of arrows arcing from the Philistine archer line toward the crest death-group (see claim-saul-wounded-archers)',
    placeholder: true,
    whyTemporary:
      "Simple primitive shaft/tip/fletching geometry (see src/scenes/gilboa-battle/ArrowVolley.tsx), one shared InstancedMesh with per-frame matrix updates for a small fixed-size roster (capped well inside the brief's performance target regardless of quality tier) — not modeled arrow assets. Wave count, cadence, and convergence-on-target scatter are the project's own staging/timing choice (`claim-saul-wounded-archers`'s notes), not sourced from any attested volley tactic or cadence.",
    historicalRequirements:
      'None specific — no source fixes volley cadence or arrow density for this engagement; any upgrade (modeled arrow geometry, a true physics-driven arc) is a visual-fidelity improvement only, not a claim-driven replacement.',
    replacementMilestoneId: 'M4',
  },
  {
    id: 'asset-water-pool',
    name: 'Standing pool meshes',
    represents: 'Standing water in low points of the braided wadi bed',
    placeholder: true,
    whyTemporary:
      'Static low-poly mesh with a simple fresnel-ish material, no real-time water simulation; season/water level is unstated in the text and is a design placeholder, not an assertion.',
    historicalRequirements:
      'None strictly — an ephemeral, undated feature; visual upgrade optional.',
    replacementMilestoneId: 'M4',
  },
  {
    id: 'asset-pack-donkeys',
    name: 'Instanced pack donkeys',
    represents: 'Baggage animals at the north-bank laager (see claim-pack-donkeys)',
    placeholder: true,
    whyTemporary: 'Simple low-poly instanced quadruped form, not a detailed animal model.',
    historicalRequirements:
      'Donkey model and pack/load fidelity per comparative Iron Age Levantine pack-animal evidence.',
    replacementMilestoneId: 'M3',
  },
  {
    id: 'asset-terrain-camp-basin',
    name: 'Procedural camp-basin terrain',
    represents:
      'Shallow open basin south of the Besor drainage where the Amalekite camp sprawls (see claim-camp-sprawl)',
    placeholder: true,
    whyTemporary:
      'Heightfield is procedural noise with a hand-tuned basin and scout’s-rise landform; the camp’s real location is unknown and unknowable ("south of the Besor" is all the text gives).',
    historicalRequirements:
      'None achievable for a site the text does not locate — remains a labeled generic western-Negev basin; only palette/flora fidelity can improve.',
    replacementMilestoneId: 'M4',
  },
  {
    id: 'asset-camp-shelter-placeholder',
    name: 'Ridge-awning and windbreak shelters',
    represents: 'Raider-camp shelters (see claim-camp-shelters — deliberately not goat-hair tents)',
    placeholder: true,
    whyTemporary:
      'Low-poly ridge-awnings and brush windbreak arcs — suggestive forms only, since no documented shelter type can be asserted for this camp.',
    historicalRequirements:
      'Any upgrade must keep the same honesty: no black goat-hair tent form without period attestation; improve silhouette/material only.',
    replacementMilestoneId: 'M4',
  },
  {
    id: 'asset-camp-props',
    name: 'Spoil heaps and tether posts',
    represents: 'Loot piles and animal tether points at the camp clusters (see claim-camp-sprawl)',
    placeholder: true,
    whyTemporary: 'Squashed low-poly mounds and plain posts; contents of the heaps are abstract.',
    historicalRequirements:
      'Optional upgrade — recognizable period goods (textiles, vessels, sacks) per material-culture sources if ever detailed.',
    replacementMilestoneId: 'M4',
  },
  {
    id: 'asset-camp-fire',
    name: 'Instanced camp fires (emissive)',
    represents: 'The fire points that make the camp sprawl legible at dusk (see claim-camp-sprawl)',
    placeholder: true,
    whyTemporary:
      'Emissive flame cones and ember-glow discs in two instanced meshes — deliberately not real lights, per the scene brief’s lighting budget.',
    historicalRequirements: 'None strictly; visual upgrade (sprite flicker, smoke wisps) optional.',
    replacementMilestoneId: 'M4',
  },
  {
    id: 'asset-livestock-placeholder',
    name: 'Instanced flocks and herds',
    represents: 'Sheep/goat flocks and cattle taken as spoil (see claim-livestock-spoil)',
    placeholder: true,
    whyTemporary:
      'Simple low-poly instanced quadruped forms with color variation, not real breeds.',
    historicalRequirements:
      'Period-plausible fat-tailed sheep, black goats, and small zebu-free taurine cattle per zooarchaeological literature, if ever modeled.',
    replacementMilestoneId: 'M3',
  },
  {
    id: 'asset-camel-placeholder',
    name: 'Instanced camels with riders (flight beat only)',
    represents:
      'The four hundred young men fleeing on camels (see claim-camel-depiction; dispute on claim-amalekite-raiders)',
    placeholder: true,
    whyTemporary:
      'Low-poly dromedary-with-rider merged form, minimal early tack (no frame saddle); appears only in the narrated flight beat per the register #6 decision.',
    historicalRequirements:
      'Dromedary form and rope-halter/pad tack per early-camel-use literature; must never gain a frame saddle or ambient herd use without a Fable review.',
    replacementMilestoneId: 'M3',
  },
  {
    id: 'asset-terrain-beth-shan-tell',
    name: 'Procedural Beth-shan tell terrain',
    represents:
      'The Beth-shan tell above the Harod/Jordan valley junction: mound, flattened summit, valley-road approach, and the eastern fall toward the Jordan valley',
    placeholder: true,
    whyTemporary:
      'Heightfield is procedural hills plus hand-tuned mound/flatten/ramp features, not DEM-derived terrain from the real, extensively surveyed tell.',
    historicalRequirements:
      'DEM-derived terrain once a terrain-data sourcing/licensing ADR defines source, attribution, vertical datum, and resampling policy — Beth-shan is a natural early candidate given its secure identification (queue #12).',
    replacementMilestoneId: 'M4',
  },
  {
    id: 'asset-tell-town-blocks',
    name: 'Dense summit-quarter house massing',
    represents:
      'The Iron I domestic quarter on the Beth-shan summit — small conjoined mudbrick houses along narrow lanes',
    placeholder: true,
    whyTemporary:
      'Simple box massing generated by a scene-local layout (src/scenes/beth-shan-walls/layout.ts, ADR-006 conventions), not a reproduction of the excavated Iron I plan.',
    historicalRequirements:
      'Modeled houses reflecting the published excavated Iron I Beth-shan domestic-quarter plans, if published in sufficient plan-level detail.',
    replacementMilestoneId: 'M4',
  },
  {
    id: 'asset-beth-shan-wall',
    name: 'Beth-shan wall and gate',
    represents: 'The narrated wall of Beth-shan (1 Samuel 31:10, 12) above the gate plaza',
    placeholder: true,
    whyTemporary:
      'A generic modest mudbrick-on-stone wall belt and simple two-tower gate — disclosed as archaeologically thin per claim-beth-shan-wall (no substantial Iron I fortification is clearly attested), never presented as an excavated-verified fortification.',
    historicalRequirements:
      'Revise or remove pending further excavation evidence for an Iron I perimeter at Beth-shan; until then this stays a narrated, disclosed placeholder.',
    replacementMilestoneId: 'M4',
  },
  {
    id: 'asset-display-forms',
    name: 'Wrapped display-form silhouettes',
    represents:
      'The four bound, wrapped bodies fastened to the wall (Saul and his three sons, 1 Samuel 31:10, 12) — see claim-body-display',
    placeholder: true,
    whyTemporary:
      'A single parametrized lathe-revolved wrapped-cloth silhouette (src/engine/characters/wrappedForm.ts, buildWrappedFormGeometry), anatomically unresolved by design — not a placeholder awaiting anatomical detail. ADR-009 permanently bans headless/dismemberment geometry for this content in any mode, so no future fidelity upgrade may add head or limb articulation; only cloth/weathering fidelity can improve. The same builder is intended for jabesh-burial’s bone bundle at a shorter length scale.',
    historicalRequirements:
      'None beyond improved cloth/weathering surface fidelity — the no-head/no-anatomy constraint is permanent, not a placeholder gap.',
    replacementMilestoneId: 'M4',
    modelPath: 'src/engine/characters/wrappedForm.ts',
    modelLicense: 'project-original',
    modelProvenance: 'Generated in code; no external mesh or texture sources.',
  },
  {
    id: 'asset-egyptian-monuments',
    name: 'Curated Egyptian monuments (stela and statue block)',
    represents:
      'One or two weathered Egyptian monuments visible in the Iron Age town — see claim-egyptian-monuments',
    placeholder: true,
    whyTemporary:
      'Simple primitive stela-slab and statue-block geometry, not modeled reproductions of the excavated Seti I stelae or the Ramesses III statue.',
    historicalRequirements:
      'Modeled reproductions of the excavated forms (fidelity only — see claim-egyptian-monuments). Queue #16 verification pass (2026-07-16): the curated-into-Iron-I reading itself is corroborated across independent secondary summaries of the excavations (a "Monuments Courtyard" fronting the twin temples, read as deliberate post-garrison display) and is no longer a release-blocking gap; the residual hedge is fine-grained sub-phase timing, not primary-copy page access.',
    replacementMilestoneId: 'M4',
  },
  {
    id: 'asset-bier-props',
    name: 'Bier/litter carrying props',
    represents:
      'The plank-and-pole frames the men of Jabesh use to bear the bodies away at night — see claim-jabesh-retrieval',
    placeholder: true,
    whyTemporary:
      'Simple box/cylinder primitive geometry, appearing only during the night retrieval’s carry-out.',
    historicalRequirements:
      'Comparative ANE bier/litter form, if a specific type is ever sourced; currently an abstract, undetailed carrying frame by design (no nail/rope rigging detail per the scene brief).',
    replacementMilestoneId: 'M4',
  },
  {
    id: 'asset-torch-sprites',
    name: 'Instanced torch sprites (emissive)',
    represents: 'Torchlight at the wall during the night retrieval (b-retrieval)',
    placeholder: true,
    whyTemporary:
      'Emissive flame-cone and ember-glow discs in two instanced meshes, reusing the amalekite-camp fire-sprite technique (asset-camp-fire) — deliberately not real lights, so the single-directional + hemisphere lighting rig stays unchanged.',
    historicalRequirements: 'None strictly; visual upgrade (sprite flicker, smoke wisps) optional.',
    replacementMilestoneId: 'M4',
  },
  {
    id: 'asset-terrain-jabesh-wadi',
    name: 'Procedural Jabesh-gilead / Wadi Yabis terrain',
    represents:
      'Terraced Gilead hill-flank ground above a modest perennial wadi (the Wadi Yabis form) — see claim-gilead-terrain, claim-jabesh-location',
    placeholder: true,
    whyTemporary:
      'Heightfield is procedural noise plus a hand-tuned channel feature (ADR-005), not derived from real elevation data of either candidate Jabesh-gilead site — the composite setting is deliberate, not a placeholder awaiting a specific DEM.',
    historicalRequirements:
      'DEM-derived terrain becomes appropriate only once register #8 resolves and a specific candidate site is adopted for terrain purposes; until then this stays a disclosed composite by design, not merely a temporary data gap.',
    replacementMilestoneId: 'M4',
  },
  {
    id: 'asset-tamarisk-tree',
    name: 'Tamarisk landmark tree',
    represents:
      'The single mature tamarisk under which the bones are buried (1 Samuel 31:13a) — see claim-tamarisk-burial',
    placeholder: true,
    whyTemporary:
      'A generic multi-lobed canopy over a simple trunk cylinder, not a species-accurate tamarisk model; the Chronicles oak/terebinth variant is carried as a label note rather than an alternate model.',
    historicalRequirements:
      'A botanically distinct tamarisk (Tamarix) silhouette and bark texture, if ever modeled at higher fidelity.',
    replacementMilestoneId: 'M4',
  },
  {
    id: 'asset-pyre',
    name: 'Pyre timber and flame',
    represents:
      'The stacked-timber platform that covers the four wrapped forms before burning (1 Samuel 31:12b) — see claim-burning-bodies',
    placeholder: true,
    whyTemporary:
      'Generic stacked-cylinder log geometry plus emissive flame-cone/glow-disc sprites (reusing the amalekite-camp/Beth-shan fire-sprite technique at a larger, brighter scale) — deliberately not a real light, and deliberately never renders before the wrapped forms are fully covered, in any mode (a permanent constraint, not a placeholder gap).',
    historicalRequirements:
      'None beyond optional visual upgrade (log detail, smoke) — the covered-before-flame sequencing and the absence of any burning-silhouette/charring detail are permanent per ADR-009’s extension in docs/design/jabesh-burial-brief.md, not subject to a future fidelity upgrade.',
    replacementMilestoneId: 'M4',
  },
  {
    id: 'asset-village-cluster',
    name: 'Open hamlet house massing',
    represents:
      'The small, open, unwalled cluster of mudbrick houses on the Jabesh-gilead village terrace — see claim-jabesh-town-form',
    placeholder: true,
    whyTemporary:
      'Simple box massing generated by a scene-local layout (src/scenes/jabesh-burial/layout.ts, ADR-006 conventions) — a different, looser settlement form from both Ziklag’s enclosed ring and Beth-shan’s dense summit quarter, not a reproduction of any excavated plan (none exists for a site that cannot be securely located).',
    historicalRequirements:
      'Revise only if register #8 resolves and a specific candidate site with published plan-level evidence is adopted; until then this stays a disclosed generic placeholder.',
    replacementMilestoneId: 'M4',
  },
  {
    id: 'asset-vegetation-gilead',
    name: 'Gilead hill-flank vegetation (oak/scrub + wadi waterline)',
    represents:
      'Oak and scrub cover on the Gilead slopes and a tamarisk/oleander line along the Wadi Yabis — see claim-gilead-terrain',
    placeholder: true,
    whyTemporary:
      'A disclosed broadening of the project’s generic instanced scrub/blob-tree families (asset-vegetation-scrub, asset-olive-tree) with a Gilead-toned palette and a distance-to-channel density gradient, not species-differentiated models.',
    historicalRequirements:
      'Representative Gilead oak/scrub and riparian flora (e.g., Tabor oak, tamarisk, oleander) if ever modeled at species-accurate fidelity.',
    replacementMilestoneId: 'M4',
  },
  {
    id: 'asset-royal-tokens',
    name: 'Crown and armlet props',
    represents:
      'The crown and armlet the messenger brings to David as tokens of Saul’s death (2 Samuel 1:10) — see claim-royal-tokens',
    placeholder: true,
    whyTemporary:
      'Two small primitive torus meshes (a shallow circlet for the crown, a slimmer band for the armlet), presented near the messenger figure — no securely identified Iron Age Israelite royal regalia exists to model from, so exact form is a permanent design placeholder, not merely unfinished detail.',
    historicalRequirements:
      'None achievable beyond stylization without an excavated or iconographic comparandum for an Iron Age Israelite royal diadem/armlet; any upgrade improves material/finish fidelity only, not a claim-driven replacement.',
    replacementMilestoneId: 'M4',
  },
];

export const ASSETS_BY_ID: ReadonlyMap<string, AssetRecord> = new Map(ASSETS.map((a) => [a.id, a]));
