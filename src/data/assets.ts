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
    represents:
      'Raider-camp shelters (see claim-camp-shelters — deliberately not goat-hair tents)',
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
    whyTemporary: 'Simple low-poly instanced quadruped forms with color variation, not real breeds.',
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
];

export const ASSETS_BY_ID: ReadonlyMap<string, AssetRecord> = new Map(ASSETS.map((a) => [a.id, a]));
