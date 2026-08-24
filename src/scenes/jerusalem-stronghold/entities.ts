import type { SceneEntityDef } from '../types';
import { CONSTRUCTION_GROUND_CENTER, GIHON_CENTER, STRONGHOLD_CENTER } from './layout';
import { DAVID_INTERIOR_ANCHOR } from './poses';

/**
 * Label set for jerusalem-stronghold: the ridge itself, the stronghold
 * enclosure, the Gihon spring (the tsinnôr card's home), the terraced
 * eastern slope (the Millo card's home), the construction ground, and the
 * principal/groups present — deliberately no label for Joab, Hiram in
 * person, or any 2 Samuel 6+ content, none of which is staged here (brief's
 * hard scope guard).
 */
const ENCLOSURE_LABEL_OFFSET = 27;

export const JERUSALEM_STRONGHOLD_ENTITIES: SceneEntityDef[] = [
  {
    id: 'ent-jerusalem-ridge',
    title: 'Jerusalem (the City of David)',
    kind: 'settlement',
    position: [STRONGHOLD_CENTER[0], 14, STRONGHOLD_CENTER[1] - 30],
    description:
      'A narrow, steep-sided southeastern ridge on the seam between Judah and Benjamin — the Kidron valley falling away east, a shallower valley west, the Gihon spring at the foot of the eastern slope, the ridge climbing to a saddle at its north end. The site identification is secure; the character and extent of its 10th-century settlement is genuinely disputed, and this scene renders at the conservative end of that dispute (see claim-jebusite-stronghold-form).',
    claimIds: ['claim-jerusalem-terrain-form', 'claim-jebusite-stronghold-form'],
  },
  {
    id: 'ent-stronghold-enclosure',
    title: 'The stronghold enclosure',
    kind: 'structure',
    position: [STRONGHOLD_CENTER[0], 5, STRONGHOLD_CENTER[1]],
    description:
      'A modest stone circuit around a small summit area, with a simple gateway — deliberately not a monumental fortification (no six-chamber gate, no casemate system, no glacis, no towers). "Nevertheless David took the stronghold of Zion, that is, the city of David" (2 Samuel 5:7) — the taking itself is not staged; this ground is where the narrative’s own gap is held.',
    claimIds: [
      'claim-jerusalem-capture',
      'claim-jebusite-stronghold-form',
      'claim-city-of-david-naming',
    ],
  },
  {
    id: 'ent-gihon-spring',
    title: 'The Gihon',
    kind: 'feature',
    position: [GIHON_CENTER[0], 3, GIHON_CENTER[1]],
    description:
      "Jerusalem's water source, at the foot of the eastern slope rather than inside the walls — the exact place 5:8's tsinnôr crux is about. No water shaft, tunnel, channel, or spring fortification is rendered here in any mode; the project takes no position on how David's men reached the stronghold (claim-tsinnor-crux).",
    claimIds: ['claim-gihon-spring', 'claim-tsinnor-crux'],
  },
  {
    id: 'ent-terraces',
    title: 'The terraced eastern slope',
    kind: 'feature',
    position: [30, 8, 20],
    description:
      '5:9 says David built the city "from the Millo inward" and explains nothing further. The eastern slope genuinely required terracing to be built on, so terracing renders here as terrain form — but no rendered element is labeled "the Millo." The identification with excavated terrace/stepped-stone structures is a named proposal with a contested dating, carried in the claim layer only (claim-millo-identification).',
    claimIds: ['claim-millo-identification', 'claim-city-of-david-naming'],
  },
  {
    id: 'ent-construction-ground',
    title: "Hiram's building",
    kind: 'feature',
    position: [CONSTRUCTION_GROUND_CENTER[0], 4, CONSTRUCTION_GROUND_CENTER[1]],
    description:
      "Cedar timber, dressed stone courses, and a partially raised structure — construction, not architecture. Hiram king of Tyre sent messengers, cedar trees, carpenters, and masons; the house he built David is shown unfinished and in progress, never as a completed cedar palace, and never identified with any excavated building proposed as David's palace (claim-hiram-building).",
    claimIds: ['claim-hiram-building'],
  },
  {
    id: 'ent-david-jerusalem',
    title: 'David',
    kind: 'person',
    position: [DAVID_INTERIOR_ANCHOR[0], 3, DAVID_INTERIOR_ANCHOR[1]],
    description:
      'Now anointed king over all Israel, not Judah alone (5:1-3, opening cards), David and his men go up against the Jebusite stronghold, take it, dwell in it, name it the city of David, and receive Tyrian materials and craftsmen to build there. No account is given of how the stronghold was taken, and none is staged.',
    claimIds: ['claim-jerusalem-capture', 'claim-city-of-david-naming', 'claim-hiram-building'],
  },
  {
    id: 'ent-davids-force',
    title: "David's men",
    kind: 'group',
    position: [-6, 3, 40],
    description:
      '"The king and his men" (5:6) — deliberately not an army: an approach column at the capture beats, redistributed as an occupying presence inside the enclosure afterward. No headcount is narrated; the ~40-60 figures shown are a disclosed design choice (claim-stronghold-cast-scale), not a headcount the text gives.',
    claimIds: ['claim-jerusalem-capture', 'claim-stronghold-cast-scale', 'claim-dress'],
  },
  {
    id: 'ent-jebusites',
    title: 'The Jebusites',
    kind: 'group',
    position: [STRONGHOLD_CENTER[0], 4, STRONGHOLD_CENTER[1] - ENCLOSURE_LABEL_OFFSET],
    description:
      'The stronghold’s inhabitants, unnamed in the text. They tell David he will not come in, taunting that the blind and the lame would keep him out — a saying spoken and captioned only, never enacted by any figure. No headcount is narrated; the ~25-40 figures shown are a disclosed design choice, itself a historical statement about the site’s scale (claim-stronghold-cast-scale, claim-jebusite-stronghold-form).',
    claimIds: ['claim-jerusalem-capture', 'claim-stronghold-cast-scale', 'claim-dress'],
  },
  {
    id: 'ent-tyrian-craftsmen',
    title: 'Tyrian carpenters and masons',
    kind: 'group',
    position: [CONSTRUCTION_GROUND_CENTER[0], 3, CONSTRUCTION_GROUND_CENTER[1] - 6],
    description:
      'Unnamed craftsmen Hiram sends with cedar trees (5:11) — the same undifferentiated dress as every other group in this project, distinguished only by the timber and stone they handle. Hiram himself is never staged; he sends messengers, and the text says nothing about his appearing.',
    claimIds: ['claim-hiram-building', 'claim-dress'],
  },
];
