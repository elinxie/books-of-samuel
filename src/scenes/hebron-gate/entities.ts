import type { SceneEntityDef } from '../types';
import {
  DAVID_PLAZA_POS,
  GATE_ASIDE_POCKET,
  GATE_PASSAGE_CENTER,
  JOAB_RAID_GROUND_CENTER,
  TOMB_POS,
  TOWN_CENTER,
} from './layout';

/**
 * Label set for hebron-gate: the gate passage (the killing ground), the
 * procession route, the tomb ground, the mourning assembly, Joab's raid
 * party, the ambient town, and the four staged principals (David, Joab,
 * Abner, Abishai). No other named figures appear — the raid party and
 * mourners are anonymous masses, per the brief's hard scope guard. Nothing
 * here stages the cistern-of-Sirah recall (narrated only) or anything past
 * 2 Samuel 3:39.
 */
export const HEBRON_GATE_ENTITIES: SceneEntityDef[] = [
  {
    id: 'ent-gate-passage',
    title: 'The gate of Hebron',
    kind: 'feature',
    position: [GATE_PASSAGE_CENTER[0], 3, GATE_PASSAGE_CENTER[1]],
    description:
      '"Joab took him aside into the midst of the gate to speak with him privately, and there he struck him in the stomach" (2 Samuel 3:27). A modest, disclosed two-chamber gate passage — deep enough to draw someone into its interior shadow — not a monumental six-chamber Solomonic-type gate; no gate is archaeologically attested at Tell Rumeida for this period. The strike is staged at documentary distance, at or behind the gate’s own shadow line: no wound geometry in any mode.',
    claimIds: ['claim-hebron-gate-form', 'claim-abner-killing'],
  },
  {
    id: 'ent-aside-pocket',
    title: 'The midst of the gate',
    kind: 'feature',
    position: [GATE_ASIDE_POCKET[0], 2.2, GATE_ASIDE_POCKET[1]],
    description:
      'The gate passage’s own shadowed alcove — where Joab draws Abner aside "to speak with him privately" and strikes him. Abner had come to Hebron under safe-conduct and left in peace three times over (3:21, 22, 23); the killing happens inside David’s own capital, against a guest, not on any battlefield. Abishai is present nearby per 3:30’s shared culpability, but the strike is staged as Joab’s alone.',
    claimIds: ['claim-abner-killing'],
  },
  {
    id: 'ent-procession-route',
    title: 'The procession to the tomb',
    kind: 'route',
    position: [-30, 4, -40],
    description:
      'The bier — a wrapped, anatomically unresolved form, never a modeled corpse — is carried from the gate to Abner’s tomb at funeral pace, the crowd following; King David walks directly behind the bier, exactly as 3:31 places him. This beat, not the killing, carries the scene’s real weight: the text gives more verses to the mourning than to the murder.',
    claimIds: ['claim-abner-funeral'],
  },
  {
    id: 'ent-tomb',
    title: 'Abner’s tomb at Hebron',
    kind: 'feature',
    position: [TOMB_POS[0], 3, TOMB_POS[1]],
    description:
      'A simple rock-cut entry on the hill’s flank, disclosed as a placeholder — not the medieval "Tomb of Abner" tradition in modern Hebron, which this project does not adopt as a site or form. David weeps aloud at the grave; all the people weep with him (3:32b), and the lament follows (3:33-34).',
    claimIds: ['claim-abner-tomb-form', 'claim-abner-funeral'],
  },
  {
    id: 'ent-mourning-assembly',
    title: 'All the people',
    kind: 'group',
    position: [10, 3, -22],
    description:
      '"And all the people took notice of it, and it pleased them... And all the people and all Israel understood that day that it had not been the king’s will to put Abner the son of Ner to death" (3:36-37). A disclosed representative crowd, not a literal census — present near the plaza throughout, then gathered in mourning: sackcloth, weeping, and the procession to the tomb.',
    claimIds: [
      'claim-gate-cast-scale',
      'claim-abner-funeral',
      'claim-public-response',
      'claim-mourning-dress',
    ],
  },
  {
    id: 'ent-joab-raid-party',
    title: "Joab's raid party",
    kind: 'group',
    position: [JOAB_RAID_GROUND_CENTER[0], 3, JOAB_RAID_GROUND_CENTER[1]],
    description:
      '"Joab and all the army that was with him came back from a raid, bringing much spoil with them" (2 Samuel 3:22) — a disclosed design-choice headcount; no number is narrated for the raiding party itself. They return to learn Abner has already come to Hebron and gone in peace.',
    claimIds: ['claim-joab-return-protest', 'claim-gate-cast-scale', 'claim-dress'],
  },
  {
    id: 'ent-town-ambient',
    title: 'Hebron, the same town',
    kind: 'group',
    position: [TOWN_CENTER[0] - 30, 3, TOWN_CENTER[1] + 10],
    description:
      'The same modest highland hill town seen in hebron-anointing and hebron-covenant — the same plaza that hosted the anointing and received Abner in peace now hosts his killing and his funeral. The reuse is deliberate, not an oversight.',
    claimIds: ['claim-hebron-identification', 'claim-hebron-town-form'],
  },
  {
    id: 'ent-david',
    title: 'David',
    kind: 'person',
    position: [DAVID_PLAZA_POS[0], 3, DAVID_PLAZA_POS[1]],
    description:
      'Learns of the killing after the fact — "David did not know it" (3:26b) is the narrative’s own explicit statement, carried at the point the text states it. Publicly disavows the killing, curses Joab’s house, commands mourning, and orders Joab himself to tear his clothes and walk behind the bier. Whether this public insistence on David’s innocence reflects plain reporting or apologetic shaping for a politically convenient death is a genuine scholarly dispute, carried as scholarlyViews on claim-public-response, not resolved by the staging.',
    claimIds: [
      'claim-david-historical',
      'claim-david-disavowal',
      'claim-abner-funeral',
      'claim-public-response',
    ],
  },
  {
    id: 'ent-joab',
    title: 'Joab son of Zeruiah',
    kind: 'person',
    position: [JOAB_RAID_GROUND_CENTER[0], 3, JOAB_RAID_GROUND_CENTER[1] - 4],
    description:
      'Returns from a raid, protests Abner’s reception to David, and draws Abner aside at the gate to kill him — the text names two of his own reasons (deception/spying, 3:24-25; blood for his brother Asahel, 3:27) and scholars additionally read an unstated rivalry for command; the text adjudicates none of these fully, and this project editorializes Joab into neither a simple villain nor a simple avenger (see claim-abner-killing’s scholarlyViews). Made a public mourner at his own victim’s bier by David’s own command (3:31) — staged exactly as narrated, without invented interiority.',
    claimIds: ['claim-joab-return-protest', 'claim-abner-killing', 'claim-abner-funeral'],
  },
  {
    id: 'ent-abner',
    title: 'Abner son of Ner',
    kind: 'person',
    position: [GATE_ASIDE_POCKET[0], 3, GATE_ASIDE_POCKET[1]],
    description:
      'Having left Hebron in peace (hebron-covenant), Abner is overtaken by David’s messengers and recalled — narrated only, at an unbuilt, unidentified site (the cistern of Sirah, 3:26) — and returns through the gate, where Joab draws him aside and kills him. See claim-asahel-death (gibeon-pool) for the battlefield killing of Joab’s brother Asahel that the text names as one of Joab’s own stated motives here.',
    claimIds: ['claim-abner-killing', 'claim-abner-funeral'],
  },
  {
    id: 'ent-abishai',
    title: 'Abishai son of Zeruiah',
    kind: 'person',
    position: [GATE_ASIDE_POCKET[0] + 4.4, 3, GATE_ASIDE_POCKET[1] + 1.4],
    description:
      'Named at 3:30 as sharing responsibility for Abner’s killing "because he had put their brother Asahel to death in the battle at Gibeon" — staged present near the gate, never as the one who strikes; the text attributes the strike to Joab alone.',
    claimIds: ['claim-abner-killing'],
  },
];
