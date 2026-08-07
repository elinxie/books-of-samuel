import type { SceneEntityDef } from '../types';
import { GATE_PLAZA_CENTER, TOWN_CENTER } from '../hebron-anointing/layout';
import {
  ABNER_PRINCIPAL_SEAT,
  DAVID_PRINCIPAL_SEAT,
  FEAST_GROUND_CENTER,
  NORTH_ROAD_START,
} from './layout';

/**
 * Label set for hebron-covenant: the reused town/gate-plaza setting, the
 * feast ground, the northern road (arrival and departure, the scene's
 * symmetry axis), the three crowds (Abner's twenty, David's escort, ambient
 * townsfolk — never conflated, per the brief), and the two principals
 * (David, Abner). 3:1-19 (the long war, the Rizpah accusation, the
 * messenger overture, the elders) is card-only per the brief and gets no
 * entity here — nothing in that stretch is staged or given a position.
 * Michal, Paltiel, and Rizpah are referenced-only character entries
 * (src/data/characters.ts); none of them get a scene entity, since none of
 * them appear as geometry in this scene.
 */
export const HEBRON_COVENANT_ENTITIES: SceneEntityDef[] = [
  {
    id: 'ent-hebron-town-covenant',
    title: 'Hebron (Tell Rumeida), some years on',
    kind: 'settlement',
    position: [TOWN_CENTER[0], 12, TOWN_CENTER[1]],
    description:
      'The same modest highland hill town seen at David’s anointing over Judah (2 Samuel 2) — unchanged in form, a few years later. Identified with Tell Rumeida; the settlement rendering stays the same disclosed generic placeholder as before (no dedicated excavation-results source covers its early Iron IIA town form).',
    claimIds: ['claim-hebron-identification', 'claim-hebron-town-form'],
  },
  {
    id: 'ent-gate-plaza-covenant',
    title: 'The gate plaza',
    kind: 'feature',
    position: [GATE_PLAZA_CENTER[0], 4, GATE_PLAZA_CENTER[1]],
    description:
      'The same open ground outside the town seen at the anointing — where Abner and his twenty are received (2 Samuel 3:20a) before moving on to the feast ground proper. A deliberate continuity anchor: the same place, doing different political work a few years later.',
    claimIds: ['claim-hebron-town-form', 'claim-covenant-feast'],
  },
  {
    id: 'ent-feast-ground',
    title: 'The feast ground',
    kind: 'feature',
    position: [FEAST_GROUND_CENTER[0], 3, FEAST_GROUND_CENTER[1]],
    description:
      '"David made Abner and the men who were with him a feast" (2 Samuel 3:20b) — the text names only the fact of a feast, no hall, no throne room, no palace. Staged as a modest, open-air prepared meal in a courtyard space consistent with Hebron’s existing town rendering: mats, shared vessels, two facing groups. Physical form is a disclosed design placeholder, upgradeable only if a researcher pass finds citable meal/feasting material culture.',
    claimIds: ['claim-feast-form', 'claim-covenant-feast'],
  },
  {
    id: 'ent-north-road',
    title: 'The northern road',
    kind: 'route',
    position: [NORTH_ROAD_START.x, 4, NORTH_ROAD_START.z + 60],
    description:
      'The road from the direction of Israel/Benjamin territory — the deliberate inverse of the anointing scene’s southern approach column (David came up from the Negev; the north now comes to him). Used twice: Abner’s arrival with the twenty (3:20a), and, at the scene’s close, the same road walked back out in peace (3:21b). Its exact course is a disclosed placeholder; the text does not describe a route.',
    claimIds: ['claim-covenant-feast'],
  },
  {
    id: 'ent-abner-party',
    title: 'Abner and the twenty',
    kind: 'group',
    position: [ABNER_PRINCIPAL_SEAT[0] - 6, 3, ABNER_PRINCIPAL_SEAT[1] - 4],
    description:
      '"Abner came to David at Hebron with twenty men" (2 Samuel 3:20a) — rendered literally 1:1, the text’s own exact count, the same register as the twelve-a-side champions at the pool of Gibeon. No individual among the twenty is named or invented.',
    claimIds: ['claim-covenant-feast', 'claim-covenant-cast-scale', 'claim-dress'],
  },
  {
    id: 'ent-davids-escort',
    title: 'David’s household at the feast',
    kind: 'group',
    position: [DAVID_PRINCIPAL_SEAT[0] + 6, 3, DAVID_PRINCIPAL_SEAT[1] + 4],
    description:
      'David’s own escort/household presence hosting the meal — the text gives no count for who attended on David’s side, only that David made the feast. Rendered as a disclosed design-choice group of roughly 15–25 figures at high quality tier, deliberately smaller than any of the project’s civic-assembly crowds: this is a closed political meal, not a public gathering.',
    claimIds: ['claim-covenant-feast', 'claim-covenant-cast-scale', 'claim-dress'],
  },
  {
    id: 'ent-town-background',
    title: 'The town, on an ordinary day',
    kind: 'group',
    position: [TOWN_CENTER[0] + 30, 3, TOWN_CENTER[1] + 20],
    description:
      'A working highland town going about an ordinary day around the covenant meal — deliberately far below the anointing scene’s 150–200-figure civic assembly (roughly 20–30 figures at high quality tier). The contrast is meaningful: that was a public founding; this is a closed political meeting at the same place.',
    claimIds: ['claim-covenant-cast-scale', 'claim-hebron-town-form'],
  },
  {
    id: 'ent-david-covenant',
    title: 'David',
    kind: 'person',
    position: [DAVID_PRINCIPAL_SEAT[0], 3, DAVID_PRINCIPAL_SEAT[1]],
    description:
      'Receives Abner — the man who killed Asahel at the pool of Gibeon — at his own table anyway. The scene’s whole subject is statecraft over vendetta: a rival kingdom’s strongman received, fed, and sent away safely, in the service of ending the civil war by negotiation rather than battle.',
    claimIds: ['claim-david-historical', 'claim-covenant-feast', 'claim-judah-anointing'],
  },
  {
    id: 'ent-abner-covenant',
    title: 'Abner son of Ner',
    kind: 'person',
    position: [ABNER_PRINCIPAL_SEAT[0], 3, ABNER_PRINCIPAL_SEAT[1]],
    description:
      'Saul’s former army commander, the man who made Ish-bosheth king — now switching sides after his break with Ish-bosheth over the Rizpah accusation (3:6-11, narrated, never adjudicated). At Hebron he pledges to gather all Israel to David (3:21a) and departs in peace (3:21b), the first of the passage’s threefold repetition of that phrase.',
    claimIds: ['claim-abner-break', 'claim-abner-overture', 'claim-covenant-feast'],
  },
  {
    id: 'ent-pledge',
    title: 'The pledge',
    kind: 'feature',
    position: [
      (ABNER_PRINCIPAL_SEAT[0] + DAVID_PRINCIPAL_SEAT[0]) / 2,
      3,
      (ABNER_PRINCIPAL_SEAT[1] + DAVID_PRINCIPAL_SEAT[1]) / 2,
    ],
    description:
      'Abner pledges to gather all Israel to David in a covenant, so that David may reign over everything he desires (2 Samuel 3:21a) — the political turn the rest of the passage, and the next scene at the Hebron gate, will hinge on. A dialogue beat, not a formal rite: no ceremonial gesture is invented beyond a plain spoken pledge. This scene deliberately spends none of the shared 2sam-3 ESV excerpt budget (see passage notes) — direct quotation of 3:21 is left for hebron-gate.',
    claimIds: ['claim-covenant-feast'],
  },
];
