import type { SceneEntityDef } from '../types';
import {
  ASIDE_POINT,
  GATE_PLAZA_CENTER,
  JOAB_PLAZA_POS,
  MOURNING_GATHER_CENTER,
  PROCESSION_ROUTE_CURVE,
  RAID_PARTY_CENTER,
  TOMB_CENTER,
  TOWN_CENTER,
} from './layout';

const PROCESSION_MID = PROCESSION_ROUTE_CURVE.getPointAt(0.5);

/**
 * Label set for hebron-gate: the town/plaza continuity anchor with
 * hebron-anointing/hebron-covenant, the new gate passage, the procession
 * route, the tomb ground, and the principals/groups present. No 2 Samuel 4
 * geometry (Ish-bosheth's assassination) or any 2 Samuel 5+/1 Kings content
 * appears here, per the brief's hard scope guard.
 */
export const HEBRON_GATE_ENTITIES: SceneEntityDef[] = [
  {
    id: 'ent-hebron-town-gate',
    title: 'Hebron (Tell Rumeida)',
    kind: 'settlement',
    position: [TOWN_CENTER[0], 12, TOWN_CENTER[1]],
    description:
      'The same highland hill town seen in hebron-anointing and hebron-covenant. Same disclosed placeholder massing; no new claim about the town’s form is made here.',
    claimIds: ['claim-hebron-identification', 'claim-hebron-town-form'],
  },
  {
    id: 'ent-gate-plaza-killing',
    title: 'The gate plaza',
    kind: 'feature',
    position: [GATE_PLAZA_CENTER[0], 4, GATE_PLAZA_CENTER[1]],
    description:
      'The same ground that hosted the anointing (2 Samuel 2:4) and received Abner in peace (hebron-covenant) — the reuse is the point. Joab’s protest to David happens here (3:24-25); the killing itself happens one structure further in, inside the gate passage.',
    claimIds: ['claim-judah-anointing', 'claim-covenant-feast', 'claim-joab-return-protest'],
  },
  {
    id: 'ent-gate-passage',
    title: 'The gate passage',
    kind: 'structure',
    position: [ASIDE_POINT[0], 4, ASIDE_POINT[1]],
    description:
      '"The midst of the gate" (3:27) — a modest, disclosed-placeholder two-chamber gateway, not a monumental six-chamber Solomonic-type gate. Joab draws Abner aside into its interior for a private word, then strikes him; rendered at documentary distance throughout, no wound/blood geometry in any mode.',
    claimIds: ['claim-hebron-gate-form', 'claim-abner-killing'],
  },
  {
    id: 'ent-raid-party',
    title: 'Joab’s raid party',
    kind: 'group',
    position: [RAID_PARTY_CENTER[0], 3, RAID_PARTY_CENTER[1]],
    description:
      'Joab returns from a raid "bringing much spoil" (3:22) and is told Abner has been received and sent away in peace — the third repetition of that formula. The roughly 15-25 figures shown are a disclosed design count (claim-gate-cast-scale), not a narrated number.',
    claimIds: ['claim-joab-return-protest', 'claim-gate-cast-scale'],
  },
  {
    id: 'ent-mourning-assembly',
    title: '"All the people"',
    kind: 'group',
    position: [MOURNING_GATHER_CENTER[0], 3, MOURNING_GATHER_CENTER[1]],
    description:
      'Present near the gate throughout, then commanded to mourn, tear their clothes, and follow Abner’s bier to the grave (3:31-32, 35-36). A disclosed representative crowd (claim-gate-cast-scale), the same no-narrated-count convention as claim-judah-assembly-scale — smaller than the anointing crowd, a funeral rather than a founding.',
    claimIds: ['claim-abner-funeral', 'claim-public-response', 'claim-gate-cast-scale'],
  },
  {
    id: 'ent-procession-route',
    title: 'The funeral procession',
    kind: 'route',
    position: [PROCESSION_MID.x, 3, PROCESSION_MID.z],
    description:
      'The bier’s route from the gate to the tomb, at funeral pace — David walks behind it, as 3:31b itself states. The route’s exact course is a disclosed staging choice.',
    claimIds: ['claim-abner-funeral'],
  },
  {
    id: 'ent-tomb-ground',
    title: 'The tomb at Hebron',
    kind: 'structure',
    position: [TOMB_CENTER[0], 6, TOMB_CENTER[1]],
    description:
      '"They buried Abner in Hebron" (3:32) — the text gives no form or precise location beyond the town itself. Rendered as a simple rock-cut entry, a disclosed placeholder (claim-abner-tomb-form); this project does not adopt the medieval "Tomb of Abner" tradition/site in modern Hebron.',
    claimIds: ['claim-abner-tomb-form', 'claim-abner-funeral'],
  },
  {
    id: 'ent-david-gate',
    title: 'David',
    kind: 'person',
    position: [0, 3, -18],
    description:
      'Receives Joab’s protest, is told nothing of the recall ("but David did not know it," 3:26b), and publicly disavows the killing and curses Joab’s house once he hears of it (3:28-29). Commands the mourning, follows the bier, weeps aloud at the grave, laments, and fasts until sundown.',
    claimIds: ['claim-david-historical', 'claim-david-disavowal', 'claim-abner-funeral'],
  },
  {
    id: 'ent-joab-gate',
    title: 'Joab son of Zeruiah',
    kind: 'person',
    position: [JOAB_PLAZA_POS[0], 3, JOAB_PLAZA_POS[1]],
    description:
      'David’s army commander, the same Joab who pursued Abner after Asahel’s death at Gibeon (gibeon-pool). Protests Abner’s reception, recalls him under a false privacy pretext, and strikes him alone in the gate passage "for the blood of Asahel his brother" (3:27) — then is himself commanded to tear his clothes and mourn before Abner’s bier (3:31), the killer made a public mourner at his victim’s funeral.',
    claimIds: ['claim-joab-return-protest', 'claim-abner-killing', 'claim-abner-funeral'],
  },
  {
    id: 'ent-abner-gate',
    title: 'Abner son of Ner',
    kind: 'person',
    position: [ASIDE_POINT[0], 3, ASIDE_POINT[1]],
    description:
      'Had just been received and sent away "in peace" (hebron-covenant) when messengers overtake him and bring him back. Killed by Joab alone in the gate passage; the text gives two stated readings of Joab’s motive (blood vengeance for Asahel, and Joab’s own charge of deception/spying) and scholars additionally read an unstated political rival-elimination motive — carried as scholarlyViews on claim-abner-killing, adjudicated by neither the text nor this app as a single settled answer.',
    claimIds: ['claim-abner-killing', 'claim-asahel-death', 'claim-abner-funeral'],
  },
  {
    id: 'ent-abishai-gate',
    title: 'Abishai son of Zeruiah',
    kind: 'person',
    position: [-3, 3, -32],
    description:
      'Joab’s brother, named alongside him as sharing responsibility for Abner’s death (3:30) — present near the gate, but the text attributes the strike to Joab alone, and this scene stages it that way.',
    claimIds: ['claim-abner-killing'],
  },
];
