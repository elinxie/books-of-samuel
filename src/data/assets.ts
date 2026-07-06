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
    id: 'asset-figure-capsule',
    name: 'Capsule human figures',
    represents: 'David’s men (rendered ~1:10 of the narrated six hundred)',
    placeholder: true,
    whyTemporary:
      'Abstract capsule bodies with color-varied wool-tone cloaks; no faces, dress detail, or gear.',
    historicalRequirements:
      'Low-poly rigged figures with period dress (tunic, cloak, sandals, head covering), pack animals and gear per King & Stager; no anachronistic armor.',
    replacementMilestoneId: 'M3',
  },
  {
    id: 'asset-david-marker',
    name: 'David / Abiathar marker figures',
    represents: 'Named narrative figures within the crowd',
    placeholder: true,
    whyTemporary: 'Distinguished only by cloak color and a label.',
    historicalRequirements:
      'Same as figures; no portraiture pretensions — identity stays label-based.',
    replacementMilestoneId: 'M3',
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
    name: 'Blob olive trees',
    represents: 'Scattered orchard/maquis trees',
    placeholder: true,
    whyTemporary: 'Trunk + canopy blobs.',
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
];

export const ASSETS_BY_ID: ReadonlyMap<string, AssetRecord> = new Map(ASSETS.map((a) => [a.id, a]));
