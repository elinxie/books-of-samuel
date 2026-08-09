import type { SceneEntityDef } from '../types';
import {
  ABNER_FEAST_POS,
  ABNER_FEAST_SIDE_CENTER,
  ARRIVAL_MEET_POS,
  DAVID_FEAST_POS,
  DAVID_FEAST_SIDE_CENTER,
  FEAST_GROUND_CENTER,
  GATE_PLAZA_CENTER,
  NORTH_ROAD_CURVE,
  TOWN_CENTER,
} from './layout';

const NORTH_ROAD_MID = NORTH_ROAD_CURVE.getPointAt(0.35);

/**
 * Label set for hebron-covenant: the reused town/gate plaza (continuity
 * anchor with hebron-anointing), the new northern road and feast ground, the
 * two principals, and the three scaled crowds the brief is explicit about
 * never conflating (Abner's literal twenty, David's disclosed-count escort,
 * and the town's ambient background). Michal, Paltiel, and Rizpah are
 * referenced-only characters (src/data/characters.ts) — deliberately no
 * scene entity here, since none of them are staged (brief's hard scope
 * guard).
 */
export const HEBRON_COVENANT_ENTITIES: SceneEntityDef[] = [
  {
    id: 'ent-hebron-town',
    title: 'Hebron (Tell Rumeida)',
    kind: 'settlement',
    position: [TOWN_CENTER[0], 12, TOWN_CENTER[1]],
    description:
      'The same modest highland hill town as hebron-anointing, a few years on — David’s base since the men of Judah anointed him there. No new town-form claim is made here; the disclosed generic placeholder (claim-hebron-town-form) carries over unchanged.',
    claimIds: ['claim-hebron-identification', 'claim-hebron-town-form'],
  },
  {
    id: 'ent-gate-plaza',
    title: 'The gate plaza',
    kind: 'feature',
    position: [GATE_PLAZA_CENTER[0], 4, GATE_PLAZA_CENTER[1]],
    description:
      'The same open ground outside the town seen in hebron-anointing — a continuity anchor. Here Abner and his twenty are received on arrival, and here David stands watching the road as Abner departs "in peace" (2 Samuel 3:20a, 21b).',
    claimIds: ['claim-covenant-feast', 'claim-hebron-town-form'],
  },
  {
    id: 'ent-north-road',
    title: 'The road from the north',
    kind: 'route',
    position: [NORTH_ROAD_MID.x, 4, NORTH_ROAD_MID.z],
    description:
      'Abner’s road in from the direction of Israel and Benjamin territory — the deliberate inverse of hebron-anointing’s southern approach column (David came up from the Negev; the north now comes to him). The same road carries the arrival (3:20a) and, later, the peace departure (3:21b): the scene’s symmetry axis. Its exact course is an undisclosed detail of the text, staged here as a disclosed placeholder.',
    claimIds: ['claim-covenant-feast'],
  },
  {
    id: 'ent-feast-ground',
    title: 'The feast ground',
    kind: 'feature',
    position: [FEAST_GROUND_CENTER[0], 3, FEAST_GROUND_CENTER[1]],
    description:
      '"David made Abner and the men who were with him a feast" (2 Samuel 3:20b) — the text names no hall, no throne room, no vessel form; a modest open-air courtyard meal (mats, shared vessels) is the disclosed staging choice (claim-feast-form), consistent with Hebron’s own placeholder massing. The project’s first staged shared meal.',
    claimIds: ['claim-feast-form', 'claim-covenant-feast'],
  },
  {
    id: 'ent-david',
    title: 'David',
    kind: 'person',
    position: [DAVID_FEAST_POS[0], 3, DAVID_FEAST_POS[1]],
    description:
      'King over the house of Judah at Hebron (hebron-anointing). Receives Abner — the man who made Ish-bosheth king, and who killed Asahel at Gibeon (gibeon-pool) — at his own table anyway: diplomacy over vendetta is this scene’s whole subject, and what the next scene, hebron-gate, will shatter.',
    claimIds: ['claim-david-historical', 'claim-covenant-feast'],
  },
  {
    id: 'ent-abner',
    title: 'Abner son of Ner',
    kind: 'person',
    position: [ABNER_FEAST_POS[0], 3, ABNER_FEAST_POS[1]],
    description:
      'Saul’s former army commander, who made Ish-bosheth king at Mahanaim (2 Samuel 2:8-10) and led Israel’s force at Gibeon. His break with Ish-bosheth (3:6-11) is narrated only, by caption, not staged here — the text puts an accusation in Ish-bosheth’s mouth (that Abner went in to Saul’s concubine Rizpah) but never states whether it was true, and Abner’s own reply is indignation, not confession. He arrives at Hebron under his own oath to transfer the kingdom (3:9-10), pledges to gather all Israel to David (3:21a), and "goes in peace" (3:21b) — the narrative’s own load-bearing phrase, staged straight, without foreboding.',
    claimIds: ['claim-abner-break', 'claim-abner-overture', 'claim-covenant-feast'],
  },
  {
    id: 'ent-abners-twenty',
    title: 'Abner’s twenty men',
    kind: 'group',
    position: [ABNER_FEAST_SIDE_CENTER[0], 3, ABNER_FEAST_SIDE_CENTER[1]],
    description:
      '"Abner ... came to David at Hebron, and twenty men with him" (2 Samuel 3:20a) — rendered literally 1:1, the text’s own exact count, the same register as gibeon-pool’s twelve-a-side champions. No individual among the twenty is named or invented.',
    claimIds: ['claim-covenant-feast', 'claim-covenant-cast-scale', 'claim-dress'],
  },
  {
    id: 'ent-davids-escort',
    title: 'David’s escort',
    kind: 'group',
    position: [DAVID_FEAST_SIDE_CENTER[0], 3, DAVID_FEAST_SIDE_CENTER[1]],
    description:
      'An escort/household presence drawn from David’s established following, hosting the meal alongside him. The text gives no headcount for who attended; the ~15-25 figures shown at high quality tier are a disclosed design choice (claim-covenant-cast-scale), not a narrated number.',
    claimIds: ['claim-covenant-cast-scale', 'claim-dress'],
  },
  {
    id: 'ent-town-background',
    title: 'Hebron, an ordinary day',
    kind: 'group',
    position: [TOWN_CENTER[0] + 25, 3, TOWN_CENTER[1] - 30],
    description:
      'Townsfolk about their ordinary work on the town hill, apart from the feast — a closed political meal, not a public assembly (contrast hebron-anointing’s 150-200-figure civic crowd; the difference is meaningful). The ~20-30 figures shown are a disclosed design choice (claim-covenant-cast-scale).',
    claimIds: ['claim-covenant-cast-scale', 'claim-hebron-town-form'],
  },
  {
    id: 'ent-arrival-meet',
    title: 'The receiving',
    kind: 'feature',
    position: [ARRIVAL_MEET_POS[0], 3, ARRIVAL_MEET_POS[1]],
    description:
      'Where David and Abner meet as Abner’s party is received at the gate (3:20a), and where David stands afterward watching the road as Abner’s party departs "in peace" (3:21b) — the same spot used for both, deliberately.',
    claimIds: ['claim-covenant-feast'],
  },
];
