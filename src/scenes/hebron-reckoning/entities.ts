import type { SceneEntityDef } from '../types';
import {
  DAVID_PLAZA_POS,
  EXECUTION_GROUND,
  POOL_CENTER,
  PRESENTATION_POS,
  TOMB_POS,
  TOWN_CENTER,
} from './layout';

/**
 * Label set for hebron-reckoning: the receiving ground, the Arabah-road
 * approach, the pool of Hebron, the tomb (reused from hebron-gate), the
 * ambient town, David's attendants, and the three staged principals (David,
 * Rechab, Baanah). Ish-bosheth and Mephibosheth are deliberately absent —
 * referenced in captions only, never staged or labeled here, the same hard
 * scope guard gibeon-pool's entities.ts used for Ish-bosheth and Mahanaim.
 */
export const HEBRON_RECKONING_ENTITIES: SceneEntityDef[] = [
  {
    id: 'ent-receiving-ground',
    title: "David's receiving ground",
    kind: 'feature',
    position: [DAVID_PLAZA_POS[0], 3, DAVID_PLAZA_POS[1]],
    description:
      'The same plaza that hosted the anointing (hebron-anointing), the covenant feast (hebron-covenant), and David’s disavowal (hebron-gate) — now where Rechab and Baanah present themselves and their bundle, and where David answers them (2 Samuel 4:8–11).',
    claimIds: ['claim-hebron-town-form', 'claim-david-judgment'],
  },
  {
    id: 'ent-arrival-road',
    title: 'The Arabah road, at first light',
    kind: 'route',
    position: [200, 4, -55],
    description:
      'Rechab and Baanah travel by way of the Arabah all night (4:7b) and arrive the next day, entering from the east — a defensible inference from the text’s own "all night," disclosed as a design choice, not asserted as stated fact. No Mahanaim geometry precedes this: the murder itself is narrated by card only. (2 Samuel 4:7b–8a)',
    claimIds: ['claim-ish-bosheth-assassination'],
  },
  {
    id: 'ent-pool',
    title: 'The pool of Hebron',
    kind: 'feature',
    position: [POOL_CENTER[0], 3, POOL_CENTER[1]],
    description:
      'Named at 4:12 as the site where Rechab’s and Baanah’s bodies were hanged after their hands and feet were cut off — a fact this project carries in caption only, per ADR-009’s absolute bar on dismemberment and display geometry. The pool itself renders as a modest, disclosed basin (the same rock-cut-depression-plus-flat-water-plane convention as the pool of Gibeon); the extant Birket es-Sultan pool in modern Hebron is explicitly not adopted as this pool’s site or form.',
    claimIds: ['claim-hebron-pool-feature', 'claim-david-judgment'],
  },
  {
    id: 'ent-execution-ground',
    title: 'The execution',
    kind: 'feature',
    position: [EXECUTION_GROUND[0], 3, EXECUTION_GROUND[1]],
    description:
      'At David’s command, the young men execute Rechab and Baanah — documentary distance, no wound geometry in any mode; the text gives no method detail, so none is invented (unlike Asahel’s reversed spear grip or the gate-aside at Hebron’s own gate). Reduced mode cuts from the command straight to the aftermath card. (2 Samuel 4:12a)',
    claimIds: ['claim-david-judgment'],
  },
  {
    id: 'ent-tomb',
    title: 'The tomb of Abner, again',
    kind: 'feature',
    position: [TOMB_POS[0], 3, TOMB_POS[1]],
    description:
      'The same tomb hebron-gate built, days apart — Abner buried here first, and now the head of Ish-bosheth is buried in it too (4:12b), the milestone’s deliberate closing echo. The covered bundle is laid at the mouth and interred; never a graphic burial, and never an anatomical shape at any point.',
    claimIds: ['claim-abner-tomb-form', 'claim-david-judgment'],
  },
  {
    id: 'ent-attendants',
    title: "David's attendants",
    kind: 'group',
    position: [DAVID_PLAZA_POS[0] - 8, 3, DAVID_PLAZA_POS[1] - 4],
    description:
      '"David commanded the young men, and they killed them" (4:12a) — a disclosed design-choice headcount (~8–14 at high tier), present throughout at the receiving ground; a designated pair carries out the execution at David’s word. David commands, attendants act.',
    claimIds: ['claim-reckoning-cast-scale', 'claim-dress', 'claim-david-judgment'],
  },
  {
    id: 'ent-town-ambient',
    title: 'Hebron, the same town',
    kind: 'group',
    position: [TOWN_CENTER[0] - 30, 3, TOWN_CENTER[1] + 10],
    description:
      'The same modest highland hill town seen across all three M5 scenes — going about its own life while this second reckoning plays out at the plaza and the pool.',
    claimIds: [
      'claim-hebron-identification',
      'claim-hebron-town-form',
      'claim-reckoning-cast-scale',
    ],
  },
  {
    id: 'ent-david',
    title: 'David',
    kind: 'person',
    position: [DAVID_PLAZA_POS[0], 3, DAVID_PLAZA_POS[1]],
    description:
      'Receives Rechab and Baanah’s claim, retells the Ziklag episode himself as the standard he judges by (4:10 — see ziklag-lament’s claim-execution-messenger, the text’s own cross-link, not this project’s invention), pronounces Ish-bosheth "a righteous man" wrongly killed, and commands the execution. Whether this pattern of David publicly condemning every death that clears his path is plain report or apologetic shaping is the same dispute already carried on hebron-gate’s claim-public-response — referenced here, not restated.',
    claimIds: ['claim-david-historical', 'claim-david-judgment'],
  },
  {
    id: 'ent-rechab',
    title: 'Rechab son of Rimmon',
    kind: 'person',
    position: [PRESENTATION_POS[0] - 0.8, 3, PRESENTATION_POS[1] + 0.6],
    description:
      'A Beerothite, one of the two captains of raiding bands under Ish-bosheth (4:2). With Baanah his brother, kills Ish-bosheth at noon rest and carries his head to David at Hebron, expecting reward — staged exactly as the text states, without inventing motive beyond what it gives.',
    claimIds: ['claim-ish-bosheth-assassination', 'claim-david-judgment'],
  },
  {
    id: 'ent-baanah',
    title: 'Baanah son of Rimmon',
    kind: 'person',
    position: [PRESENTATION_POS[0] + 1.2, 3, PRESENTATION_POS[1] - 0.4],
    description:
      'Rechab’s brother, the second of the two captains (4:2). Executed alongside Rechab at David’s command (4:12a).',
    claimIds: ['claim-ish-bosheth-assassination', 'claim-david-judgment'],
  },
];
