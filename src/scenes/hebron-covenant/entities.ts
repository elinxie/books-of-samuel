import type { SceneEntityDef } from '../types';
import {
  ABNER_FEAST_POS,
  DAVID_FEAST_POS,
  FEAST_GROUND_CENTER,
  RECEPTION_POS,
  TOWN_CENTER,
} from './layout';

/**
 * Label set for hebron-covenant: the town/terrace setting (reused from
 * hebron-anointing), the gate plaza (the continuity-anchor reception point),
 * the feast ground, the northern road, the two named principals, and the
 * three covenant-scene crowds. Michal, Paltiel, and Rizpah are deliberately
 * not labeled here — they are referenced-only character entries carried by
 * the context-card captions, not by any position in this scene (per the
 * brief's "Resolved design calls").
 */
export const HEBRON_COVENANT_ENTITIES: SceneEntityDef[] = [
  {
    id: 'ent-covenant-hebron-town',
    title: 'Hebron (Tell Rumeida)',
    kind: 'settlement',
    position: [TOWN_CENTER[0], 12, TOWN_CENTER[1]],
    description:
      'The same town, terracing, and gate-plaza massing already rendered at hebron-anointing — a few years later in the narrative. Reused unmodified, per the brief’s "Hard continuity rule": no divergence from that scene’s Hebron palette/massing, and the disclosed generic-placeholder town form (claim-hebron-town-form) is not upgraded here.',
    claimIds: ['claim-hebron-identification', 'claim-hebron-town-form'],
  },
  {
    id: 'ent-covenant-gate-plaza',
    title: 'The gate plaza — reception and dismissal',
    kind: 'feature',
    position: [RECEPTION_POS[0], 4, RECEPTION_POS[1]],
    description:
      'The same open ground outside the town used for the anointing at hebron-anointing, reused here as the point where Abner’s party is received on arrival and where David sees them off "in peace" (2 Samuel 3:20a, 21b) — a deliberate continuity anchor between the two scenes.',
    claimIds: ['claim-covenant-feast'],
  },
  {
    id: 'ent-feast-ground',
    title: 'The feast ground',
    kind: 'feature',
    position: [FEAST_GROUND_CENTER[0], 3, FEAST_GROUND_CENTER[1]],
    description:
      'A prepared open-air meal in a courtyard space near the town — mats, shared vessels, seated groups. The narrative states only that David hosted Abner and his men at a meal on arrival (2 Samuel 3:20b); no hall, throne room, or palace architecture is asserted, a disclosed design-placeholder staging.',
    claimIds: ['claim-covenant-feast', 'claim-feast-form'],
  },
  {
    id: 'ent-north-road',
    title: 'The road from the north',
    kind: 'route',
    position: [-70, 6, -150],
    description:
      'Abner’s party climbs from the direction of Israel and Benjamin territory — the deliberate inverse of hebron-anointing’s southern approach column, David’s own years earlier. The same road is used twice: the arrival march and, reversed, the peace departure. Its exact course is a disclosed placeholder; no specific ancient route survey is claimed.',
    claimIds: ['claim-covenant-feast'],
  },
  {
    id: 'ent-david',
    title: 'David',
    kind: 'person',
    position: [DAVID_FEAST_POS[0], 3, DAVID_FEAST_POS[1]],
    description:
      'Receives Abner — the man who killed Asahel, Joab’s brother, at the pool of Gibeon — and makes him a feast anyway. Statecraft over vendetta is the scene’s whole subject; Joab is deliberately absent throughout (the text states he was away, 2 Samuel 3:22).',
    claimIds: ['claim-david-historical', 'claim-covenant-feast'],
  },
  {
    id: 'ent-abner',
    title: 'Abner son of Ner',
    kind: 'person',
    position: [ABNER_FEAST_POS[0], 3, ABNER_FEAST_POS[1]],
    description:
      'Saul’s army commander, having broken with Ish-bosheth over the Rizpah accusation (2 Samuel 3:6–11, narrated, not adjudicated), comes to Hebron with twenty men, is feasted, and pledges to gather all Israel to a covenant with David before being sent away in peace (2 Samuel 3:20–21).',
    claimIds: ['claim-abner-break', 'claim-abner-overture', 'claim-covenant-feast'],
  },
  {
    id: 'ent-abners-men',
    title: 'Abner’s twenty men',
    kind: 'group',
    position: [ABNER_FEAST_POS[0] + 4, 2, ABNER_FEAST_POS[1] + 3],
    description:
      'Twenty men accompany Abner to Hebron, the exact count the narrative gives (2 Samuel 3:20a) — rendered literally, one to one, the same register as gibeon-pool’s twelve-a-side champions. No ratio applies.',
    claimIds: ['claim-covenant-feast', 'claim-dress'],
  },
  {
    id: 'ent-davids-escort',
    title: "David's escort",
    kind: 'group',
    position: [FEAST_GROUND_CENTER[0] - 16, 2, FEAST_GROUND_CENTER[1] - 4],
    description:
      'An escort/household presence drawn from David’s established following, present at the feast. No count is narrated for who attended; the ~15–25 figures shown at high quality tier are a disclosed design choice (claim-covenant-cast-scale), not a headcount the text gives.',
    claimIds: ['claim-covenant-cast-scale', 'claim-dress'],
  },
  {
    id: 'ent-town-ambient',
    title: "Hebron's townspeople",
    kind: 'group',
    position: [TOWN_CENTER[0] + 40, 2, TOWN_CENTER[1] + 20],
    description:
      'Ambient townspeople going about an ordinary working day — deliberately far below hebron-anointing’s 150–200-figure civic assembly. That was a public founding; this is a closed political meal, and the contrast in scale is itself part of what the scene communicates (claim-covenant-cast-scale).',
    claimIds: ['claim-covenant-cast-scale', 'claim-dress'],
  },
];
