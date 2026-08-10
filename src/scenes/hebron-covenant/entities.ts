import type { SceneEntityDef } from '../types';
import {
  ABNER_FEAST_POS,
  DAVID_FEAST_POS,
  FEAST_GROUND_CENTER,
  GATE_PLAZA_CENTER,
  NORTH_ROAD_CURVE,
  TOWN_AMBIENT_SLOTS,
  TOWN_CENTER,
} from './layout';

const NORTH_ROAD_MID = NORTH_ROAD_CURVE.getPointAt(0.25);

/**
 * Label set for hebron-covenant: the town/plaza continuity anchor with
 * hebron-anointing, the north road (arrival and, in reverse, the peace
 * departure), the feast ground, and the principals/groups present —
 * deliberately no label for Michal, Paltiel, Rizpah, or Mahanaim/Bahurik
 * geometry, none of which is staged here (brief's hard scope guard). Joab is
 * absent from this cast entirely (explicit in the text, 3:22).
 */
export const HEBRON_COVENANT_ENTITIES: SceneEntityDef[] = [
  {
    id: 'ent-hebron-town-covenant',
    title: 'Hebron (Tell Rumeida)',
    kind: 'settlement',
    position: [TOWN_CENTER[0], 12, TOWN_CENTER[1]],
    description:
      "The same modest highland hill town seen in hebron-anointing, a few years on — David's local capital, not a royal city. Same disclosed placeholder massing; no new claim about the town's form is made here.",
    claimIds: ['claim-hebron-identification', 'claim-hebron-town-form'],
  },
  {
    id: 'ent-gate-plaza-covenant',
    title: 'The gate plaza',
    kind: 'feature',
    position: [GATE_PLAZA_CENTER[0], 4, GATE_PLAZA_CENTER[1]],
    description:
      "The same open ground where Judah anointed David king (2 Samuel 2:4) — the continuity anchor with hebron-anointing. Abner's party passes through here on the way to the feast ground; a closed political meal now stands where a public civic ceremony once did.",
    claimIds: ['claim-judah-anointing', 'claim-hebron-town-form'],
  },
  {
    id: 'ent-north-road',
    title: 'The road from the north',
    kind: 'route',
    position: [NORTH_ROAD_MID.x, 3, NORTH_ROAD_MID.z],
    description:
      "Abner and the twenty come up this road from the direction of Israel/Benjamin territory (3:20a) — the deliberate inverse of hebron-anointing's southern approach column, David came up from the Negev; the north now comes to him. The same road carries the peace departure (3:21b) in reverse. Its exact course is a disclosed staging choice, not a claim about Hebron's real bearing to Mahanaim.",
    claimIds: ['claim-covenant-feast'],
  },
  {
    id: 'ent-feast-ground',
    title: 'The feast ground',
    kind: 'feature',
    position: [FEAST_GROUND_CENTER[0], 3, FEAST_GROUND_CENTER[1]],
    description:
      '"David made Abner and the men who were with him a feast" (2 Samuel 3:20b) — an open-air meal in a courtyard space, not a banquet hall or palace. Mats, shared vessels, and seated groups are a disclosed design placeholder; the text gives no physical detail beyond the fact of a feast.',
    claimIds: ['claim-covenant-feast', 'claim-feast-form'],
  },
  {
    id: 'ent-abner-covenant',
    title: 'Abner son of Ner',
    kind: 'person',
    position: [ABNER_FEAST_POS[0], 3, ABNER_FEAST_POS[1]],
    description:
      'The man who made Ish-bosheth king now brings the north\'s allegiance to David — the same Abner the observer saw kill Asahel at the pool of Gibeon (gibeon-pool). David receives him anyway: statecraft over vendetta, the scene\'s whole subject. Pledges to gather all Israel to a covenant with David (3:21a), then departs "in peace."',
    claimIds: ['claim-abner-break', 'claim-abner-overture', 'claim-covenant-feast'],
  },
  {
    id: 'ent-abners-men',
    title: "Abner's twenty",
    kind: 'group',
    position: [ABNER_FEAST_POS[0] - 6, 3, ABNER_FEAST_POS[1] - 4],
    description:
      '"Abner came to David at Hebron with twenty men" (2 Samuel 3:20a) — the text\'s own exact count, rendered literally 1:1, the same register as gibeon-pool\'s twelve-a-side champions: no ratio, no disclosure needed beyond "this is the stated count."',
    claimIds: ['claim-covenant-feast'],
  },
  {
    id: 'ent-david-covenant',
    title: 'David',
    kind: 'person',
    position: [DAVID_FEAST_POS[0], 3, DAVID_FEAST_POS[1]],
    description:
      "Receives Abner and his men at table — a rival kingdom's strongman welcomed, not turned away. Still king over Judah alone at this point in the narrative (2 Samuel 5:3's wider anointing over all Israel is still ahead); Abner's overture is the mechanism by which the rest of the former kingdom begins to come to him.",
    claimIds: ['claim-david-historical', 'claim-judah-anointing', 'claim-covenant-feast'],
  },
  {
    id: 'ent-davids-feast-party',
    title: "David's household/escort presence",
    kind: 'group',
    position: [DAVID_FEAST_POS[0] + 8, 3, DAVID_FEAST_POS[1] + 6],
    description:
      "David's side at the feast — an escort/household presence drawn from the established following. No count is narrated for who attended; the roughly 15-25 figures shown are a disclosed design choice (claim-covenant-cast-scale), not a headcount the text gives.",
    claimIds: ['claim-covenant-cast-scale', 'claim-dress'],
  },
  {
    id: 'ent-town-ambient',
    title: 'Hebron on an ordinary day',
    kind: 'group',
    position: [TOWN_AMBIENT_SLOTS[0][0], 3, TOWN_AMBIENT_SLOTS[0][1]],
    description:
      "A working town going about its business, deliberately far below hebron-anointing's 150-200-figure civic assembly — that was a public founding; this is a closed political meal. The roughly 20-30 background figures shown are a disclosed design choice (claim-covenant-cast-scale).",
    claimIds: ['claim-covenant-cast-scale', 'claim-hebron-town-form'],
  },
];
