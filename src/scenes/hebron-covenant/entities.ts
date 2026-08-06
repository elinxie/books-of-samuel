import type { SceneEntityDef } from '../types';
import {
  ABNER_HEAD_POS,
  ABNER_SIDE_CENTER,
  DAVID_HEAD_POS,
  DAVID_SIDE_CENTER,
  FEAST_GROUND_CENTER,
  GATE_PLAZA_CENTER,
  NORTH_ROAD_CURVE,
  TOWN_CENTER,
} from './layout';

const ROAD_MID = NORTH_ROAD_CURVE.getPointAt(0.42);
const ROAD_FAR = NORTH_ROAD_CURVE.getPointAt(0.15);

/**
 * Label set for hebron-covenant: the reused town/gate plaza (continuity with
 * hebron-anointing), the new northern road and feast ground, the three
 * crowds (Abner's twenty, David's escort, the town background — never
 * conflated, per the brief), and the two named principals. No Michal,
 * Paltiel, Rizpah, or Joab entity exists here — they are referenced-only or
 * (Joab) entirely absent from this scene, per the brief's hard scope guard;
 * see their light character entries in src/data/characters.ts instead.
 */
export const HEBRON_COVENANT_ENTITIES: SceneEntityDef[] = [
  {
    id: 'ent-hebron-town-covenant',
    title: 'Hebron (Tell Rumeida)',
    kind: 'settlement',
    position: [TOWN_CENTER[0], 12, TOWN_CENTER[1]],
    description:
      'The same hill town, a few years after hebron-anointing: still David’s modest capital of Judah, not yet a royal capital over Israel. Same massing, same disclosed design-placeholder town form (claim-hebron-town-form) — nothing about the settlement itself is re-invented for this scene.',
    claimIds: ['claim-hebron-identification', 'claim-hebron-town-form'],
  },
  {
    id: 'ent-gate-plaza-covenant',
    title: 'The gate plaza',
    kind: 'feature',
    position: [GATE_PLAZA_CENTER[0], 4, GATE_PLAZA_CENTER[1]],
    description:
      'The same ground where David was anointed king over Judah, years earlier — where Abner’s party is received on arrival and where they are sent off in peace. A deliberate continuity anchor, not a new plaza.',
    claimIds: ['claim-covenant-feast', 'claim-hebron-town-form'],
  },
  {
    id: 'ent-north-road',
    title: 'The northern road',
    kind: 'route',
    position: [ROAD_MID.x, 6, ROAD_MID.z],
    description:
      'Abner comes up from the north — the direction of the territory Ish-bosheth holds — the deliberate inverse of David’s own southern approach from the Negev in hebron-anointing. The same road carries both the arrival (3:20a) and the peace departure (3:21b), this scene’s symmetry axis.',
    claimIds: ['claim-covenant-feast'],
  },
  {
    id: 'ent-feast-ground',
    title: 'The feast ground',
    kind: 'feature',
    position: [FEAST_GROUND_CENTER[0], 3, FEAST_GROUND_CENTER[1]],
    description:
      '"David made Abner and the men who were with him a feast" (2 Samuel 3:20) — an open-air courtyard meal, mats and shared vessels, not a hall or palace interior. Hebron’s town-form placeholder stays at its released fidelity; this is a disclosed design-placeholder staging of the meal itself, not an upgrade to the settlement.',
    claimIds: ['claim-feast-form', 'claim-covenant-feast'],
  },
  {
    id: 'ent-abner-party',
    title: 'Abner’s twenty men',
    kind: 'group',
    position: [ABNER_SIDE_CENTER[0], 3, ABNER_SIDE_CENTER[1]],
    description:
      '"Abner came to David at Hebron, and with him twenty men" (2 Samuel 3:20) — rendered literally 1:1, the text’s own exact, small, countable number, the same register as gibeon-pool’s twelve-a-side champions. No individual among the twenty is named or invented.',
    claimIds: ['claim-covenant-feast', 'claim-dress'],
  },
  {
    id: 'ent-davids-escort',
    title: 'David’s escort',
    kind: 'group',
    position: [DAVID_SIDE_CENTER[0], 3, DAVID_SIDE_CENTER[1]],
    description:
      'David’s own household/escort presence at the feast — a disclosed design count (~15-25 figures at high quality tier), not a headcount the text gives. Kept visually distinct from Abner’s twenty and from the town background, facing Abner’s side across the shared ground.',
    claimIds: ['claim-covenant-cast-scale', 'claim-dress'],
  },
  {
    id: 'ent-town-background',
    title: 'Hebron, an ordinary day',
    kind: 'group',
    position: [TOWN_CENTER[0] + 18, 3, TOWN_CENTER[1] - 8],
    description:
      'Ambient townspeople, static and few — deliberately far below hebron-anointing’s 150-200-figure civic assembly. This is a closed political meal between two commanders’ households, not a public founding, and the scale difference is meant to be felt.',
    claimIds: ['claim-covenant-cast-scale'],
  },
  {
    id: 'ent-abner',
    title: 'Abner son of Ner',
    kind: 'person',
    position: [ABNER_HEAD_POS[0], 3, ABNER_HEAD_POS[1]],
    description:
      'Saul’s former army commander — the same man who killed Joab’s brother Asahel at the pool of Gibeon. Having broken with Ish-bosheth over Rizpah, he comes to Hebron under safe-conduct, is received, feasted, and pledges to bring all Israel to David — then departs in peace, the narrative’s first of three repetitions of that formula.',
    claimIds: ['claim-abner-break', 'claim-abner-overture', 'claim-covenant-feast'],
  },
  {
    id: 'ent-david-covenant',
    title: 'David',
    kind: 'person',
    position: [DAVID_HEAD_POS[0], 3, DAVID_HEAD_POS[1]],
    description:
      'King over Judah, receiving the man who made and commanded his rival’s kingship — statecraft over vendetta. Still king of Judah only at this point in the narrative; the wider anointing "king over all Israel" (2 Samuel 5:3) is still ahead, beyond this milestone.',
    claimIds: ['claim-david-historical', 'claim-judah-anointing', 'claim-covenant-feast'],
  },
  {
    id: 'ent-peace-departure',
    title: 'He went in peace',
    kind: 'route',
    position: [ROAD_FAR.x, 8, ROAD_FAR.z],
    description:
      'David sends Abner away, and he goes in peace — held straight, unhurried, watched, under safe-conduct. The text repeats this formula three times before it says what Joab does; this scene owns only the first occurrence. Joab himself never appears here — the text states he was away (2 Samuel 3:22) — and what follows at this same gate belongs to hebron-gate, a separate scene.',
    claimIds: ['claim-covenant-feast'],
  },
];
