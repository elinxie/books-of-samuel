import type { SceneEntityDef } from '../types';
import {
  ABNER_MEN_CENTER,
  ABNER_SEAT_POS,
  DAVID_ESCORT_CENTER,
  DAVID_SEAT_POS,
  FEAST_GROUND_CENTER,
  NORTH_ROAD_CURVE,
  TOWN_CENTER,
} from './layout';

/**
 * Label set for hebron-covenant: the reused town/terrace setting, the north
 * road (arrival and departure both), the feast ground, the three
 * distinct crowds (Abner's twenty, David's escort, the ambient town — never
 * conflated, mirroring hebron-anointing's own three-crowd discipline), and
 * the two principal figures. Michal, Paltiel, and Rizpah are deliberately
 * absent — referenced in captions/characters only, never staged or labeled
 * here (brief's hard scope guard). No individual among the twenty is named
 * beyond the text's own figure, Abner.
 */
export const HEBRON_COVENANT_ENTITIES: SceneEntityDef[] = [
  {
    id: 'ent-hebron-town',
    title: 'Hebron (Tell Rumeida)',
    kind: 'settlement',
    position: [TOWN_CENTER[0], 12, TOWN_CENTER[1]],
    description:
      'The same modest highland hill town seen in hebron-anointing, a few years on — David’s base since the men of Judah anointed him here (2 Samuel 2:4). Identified with Tell Rumeida; the settlement massing itself is a disclosed generic placeholder, reused unchanged from that scene, not a reproduction of any excavated plan.',
    claimIds: ['claim-hebron-identification', 'claim-hebron-town-form', 'claim-chronology'],
  },
  {
    id: 'ent-terraces',
    title: 'Terraced hillside',
    kind: 'feature',
    position: [TOWN_CENTER[0] + 40, 6, TOWN_CENTER[1] + 30],
    description:
      'The same Judean-highland dry-stone terracing rendered for hebron-anointing, reused here for visual continuity — this is one place across two scenes, not two compositions of the same idea.',
    claimIds: ['claim-hebron-town-form'],
  },
  {
    id: 'ent-north-road',
    title: 'The road from the north',
    kind: 'route',
    position: [NORTH_ROAD_CURVE.getPointAt(0.3).x, 8, NORTH_ROAD_CURVE.getPointAt(0.3).z],
    description:
      'Abner comes to Hebron from the direction of Israel and Benjamin — the deliberate inverse of hebron-anointing’s approach column, which climbed from the south. The same stretch of road carries both the arrival (2 Samuel 3:20a) and, at the scene’s close, the peaceable departure (3:21b) — one road used twice, this scene’s own visual symmetry.',
    claimIds: ['claim-covenant-feast'],
  },
  {
    id: 'ent-feast-ground',
    title: 'The feast ground',
    kind: 'feature',
    position: [FEAST_GROUND_CENTER[0], 3, FEAST_GROUND_CENTER[1]],
    description:
      'The same gate plaza hebron-anointing staged the anointing at, dressed here for an open-air shared meal — "David made Abner and the men who were with him a feast" (2 Samuel 3:20b). No hall or banquet architecture is shown: the text describes no building, and Hebron’s own town-form placeholder stays modest. Mats and shared vessels are a disclosed, generic staging, not a reconstructed period feast form.',
    claimIds: ['claim-covenant-feast', 'claim-feast-form'],
  },
  {
    id: 'ent-david',
    title: 'David',
    kind: 'person',
    position: [DAVID_SEAT_POS[0], 3, DAVID_SEAT_POS[1]],
    description:
      'King over the house of Judah at Hebron (still not over Israel — see claim-judah-anointing). Receives Abner and the twenty at his own table: the same commander who killed Asahel at the pool of Gibeon two years before is fed here, not turned away — statecraft over vendetta, the scene’s whole subject.',
    claimIds: ['claim-david-historical', 'claim-judah-anointing', 'claim-covenant-feast'],
  },
  {
    id: 'ent-abner',
    title: 'Abner son of Ner',
    kind: 'person',
    position: [ABNER_SEAT_POS[0], 3, ABNER_SEAT_POS[1]],
    description:
      'Saul’s former army commander, who made Ish-bosheth king at Mahanaim and later killed Asahel at Gibeon (gibeon-pool). Ish-bosheth’s accusation over Rizpah — narrated, never adjudicated by the text — drives Abner to defect; he negotiates with David, secures the north’s own consent, and comes to Hebron with twenty men to pledge the kingdom over. He leaves in peace: the first of the chapter’s three repetitions of that phrase, before it says what Joab did.',
    claimIds: ['claim-abner-break', 'claim-abner-overture', 'claim-covenant-feast'],
  },
  {
    id: 'ent-abner-party',
    title: 'The twenty',
    kind: 'group',
    position: [ABNER_MEN_CENTER[0], 3, ABNER_MEN_CENTER[1]],
    description:
      '"Abner came to David at Hebron, and twenty men with him" (2 Samuel 3:20a) — the text’s own exact count, rendered literally, one figure per man named in the narrative’s own tally. No individual among them is invented or named.',
    claimIds: ['claim-covenant-feast', 'claim-dress'],
  },
  {
    id: 'ent-david-escort',
    title: 'David’s escort',
    kind: 'group',
    position: [DAVID_ESCORT_CENTER[0], 3, DAVID_ESCORT_CENTER[1]],
    description:
      'A household/escort presence drawn from the following the observer has tracked since Ziklag — no headcount is narrated for who attended the feast at David’s side, so the roughly 15–25 figures shown are a disclosed design choice (claim-covenant-cast-scale), not a count the text gives.',
    claimIds: ['claim-covenant-cast-scale', 'claim-dress'],
  },
  {
    id: 'ent-town-ambient',
    title: 'Hebron, an ordinary day',
    kind: 'group',
    position: [TOWN_CENTER[0] - 30, 3, TOWN_CENTER[1] + 10],
    description:
      'Townsfolk going about a working day around the house cluster — deliberately far below hebron-anointing’s 150–200-figure civic assembly. This is a closed political meal, not a public founding; the contrast in scale is itself part of what the scene says.',
    claimIds: ['claim-covenant-cast-scale', 'claim-hebron-town-form'],
  },
];
