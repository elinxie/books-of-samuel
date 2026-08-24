import type { SceneEntityDef } from '../types';
import {
  BAAL_PERAZIM_MARKER,
  DAVID_INQUIRY_POS,
  GROVE_CENTER,
  PHILISTINE_SPREAD_CENTER,
  RIM_EDGE,
} from './layout';

/**
 * Label set for rephaim-valley: the valley/rim landform, the grove, the
 * Baal-perazim naming beat's staged (unlocated) position, and the two
 * anonymous forces. No commander labels (Joab/Abishai are not staged, per
 * the brief), and no label anywhere for the 5:24 sign itself — the caption
 * on `b-sound` carries that, not an entity.
 */
export const REPHAIM_VALLEY_ENTITIES: SceneEntityDef[] = [
  {
    id: 'ent-rephaim-valley',
    title: 'The Valley of Rephaim',
    kind: 'feature',
    position: [30, 8, -20],
    description:
      'A broad, open valley running up toward Jerusalem’s western approaches, southwest of the ridge just taken in 2 Samuel 5:6–16 — the geography itself shows a force striking at the new center. The landform’s exact profile is this project’s own disclosed approximation, not a survey (claim-rephaim-terrain-form).',
    claimIds: ['claim-rephaim-terrain-form', 'claim-philistine-reaction'],
  },
  {
    id: 'ent-valley-rim',
    title: 'The highland rim',
    kind: 'feature',
    position: [RIM_EDGE[0], 10, RIM_EDGE[1]],
    description:
      'The high ground David’s force holds and stages from at both engagements — the default vantage looks down the length of the valley from here, framing both spreads in the same geography.',
    claimIds: ['claim-rephaim-terrain-form'],
  },
  {
    id: 'ent-grove',
    title: 'The grove',
    kind: 'feature',
    position: [GROVE_CENTER[0], 6, GROVE_CENTER[1]],
    description:
      'An unidentified stand of small-canopy dryland trees, the bĕkāʾim of 5:23–24 (English versions render “balsam” or “mulberry”; the identification is a guess in either case). No species is asserted, and no distinctive resin/balsam form or mulberry (Morus) form is modeled (claim-bakaim-grove). The grove is deliberately small and ordinary — nothing here is staged as, or animated as, the sign itself.',
    claimIds: ['claim-bakaim-grove', 'claim-divine-sign-depiction'],
  },
  {
    id: 'ent-baal-perazim',
    title: 'Baal-perazim (staged position)',
    kind: 'feature',
    position: [BAAL_PERAZIM_MARKER[0], 4, BAAL_PERAZIM_MARKER[1]],
    description:
      'The place David names after the first engagement — "the LORD has broken through my enemies before me, like a breaking through of water" (5:20b). The site is unlocated; this position is an openly disclosed placeholder within the valley setting, not a claimed identification. No LocationEntry or atlas pin exists for this place.',
    claimIds: ['claim-rephaim-first-engagement'],
  },
  {
    id: 'ent-david-rephaim',
    title: 'David',
    kind: 'person',
    position: [DAVID_INQUIRY_POS[0], 3, DAVID_INQUIRY_POS[1]],
    description:
      'David inquires of the LORD before each engagement and is answered — no apparatus is staged (no ephod, lots, priest, altar, or shrine); the text names none here (claim-inquiry-depiction). He leads both the advance and the flanking march at the column’s center.',
    claimIds: [
      'claim-rephaim-first-engagement',
      'claim-rephaim-second-engagement',
      'claim-inquiry-depiction',
    ],
  },
  {
    id: 'ent-davids-force-rephaim',
    title: "David's men",
    kind: 'group',
    position: [-102, 3, -32],
    description:
      'An unnamed force staged as a disclosed design count (≈ 45–60 figures, claim-rephaim-cast-scale), not a headcount the text gives. Reused across both phases: the same instanced population advances, returns, circles, and converges, rather than two separate forces.',
    claimIds: [
      'claim-rephaim-cast-scale',
      'claim-dress',
      'claim-rephaim-first-engagement',
      'claim-rephaim-second-engagement',
    ],
  },
  {
    id: 'ent-philistines-rephaim',
    title: 'The Philistines',
    kind: 'group',
    position: [PHILISTINE_SPREAD_CENTER[0], 3, PHILISTINE_SPREAD_CENTER[1]],
    description:
      'One instanced population (≈ 55–70 figures, claim-rephaim-cast-scale), reused — repositioned, never doubled — for the second deployment ("came up yet again... and spread themselves," 5:22). The disputed feathered/plumed headdress (claim-philistine-kit) renders on the small principal-tier cluster only, never on crowd/infantry.',
    claimIds: [
      'claim-rephaim-cast-scale',
      'claim-dress',
      'claim-philistine-kit',
      'claim-rephaim-first-engagement',
      'claim-rephaim-second-engagement',
    ],
  },
];
