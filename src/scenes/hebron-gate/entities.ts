import type { SceneEntityDef } from '../types';
import { GATE_PLAZA_CENTER, TOWN_CENTER } from '../hebron-anointing/layout';
import {
  ABISHAI_GATE_POS,
  ASIDE_POINT,
  DAVID_GATE_POS,
  GATE_PASSAGE_CENTER,
  JOAB_GATE_WAIT_POS,
  MOURNING_GATHER_CENTER,
  RAID_GATHER_CENTER,
  TOMB_POS,
} from './layout';

/**
 * Label set for hebron-gate: the reused town/gate-plaza setting, the new
 * gate-passage structure and its "midst of the gate" killing ground, the
 * tomb, the three crowds (raid party, mourning assembly, ambient town — the
 * `claim-gate-cast-scale` triple), and the four principals. 3:1-21 (the
 * covenant feast) is `hebron-covenant`'s territory and gets no entity here.
 */
export const HEBRON_GATE_ENTITIES: SceneEntityDef[] = [
  {
    id: 'ent-hebron-town-gate',
    title: 'Hebron (Tell Rumeida), at its own gate',
    kind: 'settlement',
    position: [TOWN_CENTER[0], 12, TOWN_CENTER[1]],
    description:
      'The same modest highland hill town seen at David’s anointing and at Abner’s covenant feast — unchanged in form. What happens here is a breach of that same town’s own safe-conduct, at its own gate.',
    claimIds: ['claim-hebron-identification', 'claim-hebron-town-form'],
  },
  {
    id: 'ent-gate-plaza-killing',
    title: 'The gate plaza',
    kind: 'feature',
    position: [GATE_PLAZA_CENTER[0], 4, GATE_PLAZA_CENTER[1]],
    description:
      'The same open ground that received Abner in peace in hebron-covenant — Joab returns here from his raid, protests to David, and, once recalled, Abner re-enters the scene through it on his way back to the gate.',
    claimIds: ['claim-hebron-town-form', 'claim-joab-return-protest'],
  },
  {
    id: 'ent-gate-passage',
    title: 'The gate passage — "the midst of the gate"',
    kind: 'feature',
    position: [GATE_PASSAGE_CENTER[0], 3, GATE_PASSAGE_CENTER[1]],
    description:
      'A modest two-chamber gateway between the town and the plaza — a roofed corridor with two small flanking chamber recesses, disclosed `design-placeholder`: no gate of any period is excavated at Tell Rumeida, and this is deliberately not a monumental six-chamber Solomonic-type gate, which would be both an over-claim for the site and an anachronism risk for the period. "The midst of the gate" (3:27) is this corridor’s own shaded interior.',
    claimIds: ['claim-hebron-gate-form'],
  },
  {
    id: 'ent-killing-ground',
    title: 'Where Joab struck Abner',
    kind: 'feature',
    position: [ASIDE_POINT[0], 3, ASIDE_POINT[1]],
    description:
      'Joab takes Abner aside into the gate passage’s interior to speak with him privately, and strikes him in the stomach; he dies — "for the blood of Asahel his brother," the text states, though the text also gives Joab’s own stated reason (suspected deception) and never fully adjudicates between the two. Shown at documentary distance: no wound or blood geometry, no close-up on the strike, in either violence mode. Abishai shares responsibility (3:30) but the strike itself is staged as Joab’s alone.',
    claimIds: ['claim-abner-killing'],
  },
  {
    id: 'ent-tomb',
    title: 'Abner’s tomb at Hebron',
    kind: 'feature',
    position: [TOMB_POS[0], 3, TOMB_POS[1]],
    description:
      'A simple rock-cut entry on the town hill’s flank, disclosed `design-placeholder` — the medieval "Tomb of Abner" tradition in modern Hebron is deliberately not adopted here. David weeps aloud at the grave; the lament is sung over it; the fast begins here at sundown.',
    claimIds: ['claim-abner-tomb-form', 'claim-abner-funeral'],
  },
  {
    id: 'ent-raid-party',
    title: 'Joab’s returning raid party',
    kind: 'group',
    position: [RAID_GATHER_CENTER[0], 3, RAID_GATHER_CENTER[1]],
    description:
      '"Joab and the servants of David returned from a raid, bringing much spoil with them" (3:22) — a disclosed design count, ≈15-25 figures at high quality tier, no narrated headcount. No spoil or weapon geometry is staged; the fact is carried by caption alone.',
    claimIds: ['claim-joab-return-protest', 'claim-gate-cast-scale', 'claim-dress'],
  },
  {
    id: 'ent-mourning-assembly',
    title: '"All the people"',
    kind: 'group',
    position: [MOURNING_GATHER_CENTER[0], 3, MOURNING_GATHER_CENTER[1]],
    description:
      'The mourning assembly (3:31-32, 35-36) — a disclosed representative crowd, ≈60-90 figures at high quality tier, smaller than hebron-anointing’s civic-founding assembly: this is a funeral, not a founding. Present at the plaza throughout, then follows the bier to the tomb at funeral pace.',
    claimIds: ['claim-abner-funeral', 'claim-gate-cast-scale', 'claim-dress'],
  },
  {
    id: 'ent-town-background-gate',
    title: 'The town, going on around it',
    kind: 'group',
    position: [TOWN_CENTER[0] - 30, 3, TOWN_CENTER[1] + 15],
    description:
      'Ambient townsfolk continuing an ordinary day around the killing and the funeral — a disclosed design count, ≈15-25 figures at high quality tier, deliberately smaller than the mourning assembly.',
    claimIds: ['claim-gate-cast-scale', 'claim-hebron-town-form'],
  },
  {
    id: 'ent-david-gate',
    title: 'David',
    kind: 'person',
    position: [DAVID_GATE_POS[0], 3, DAVID_GATE_POS[1]],
    description:
      'Hears Joab’s protest, but is not shown near the gate passage when Abner is struck — "but David did not know it" (3:26b), stated at the point the text states it. Publicly disavows the killing, curses Joab’s house without softening its content, commands the mourning, and walks behind the bier himself.',
    claimIds: ['claim-david-historical', 'claim-david-disavowal', 'claim-abner-funeral'],
  },
  {
    id: 'ent-joab-gate',
    title: 'Joab son of Zeruiah',
    kind: 'person',
    position: [JOAB_GATE_WAIT_POS[0], 3, JOAB_GATE_WAIT_POS[1]],
    description:
      'Returns from a raid, protests Abner’s reception to David, and — once messengers have recalled Abner without David’s knowledge — draws him aside into the gate passage and strikes him. At David’s command, tears his own clothes and mourns before Abner’s bier — the killer made a public mourner at his victim’s funeral, staged exactly as narrated, without interiority commentary the text does not give.',
    claimIds: ['claim-joab-return-protest', 'claim-abner-killing', 'claim-abner-funeral'],
  },
  {
    id: 'ent-abner-gate',
    title: 'Abner son of Ner',
    kind: 'person',
    position: [ASIDE_POINT[0], 3, ASIDE_POINT[1]],
    description:
      'Re-enters the scene already returning through the gate, recalled by Joab’s messengers after departing Hebron in peace (hebron-covenant). Drawn aside and killed inside his own destination’s gate — the man who killed Asahel at Gibeon (see claim-asahel-death, gibeon-pool), now killed in turn, for the blood of Asahel among the reasons the text gives.',
    claimIds: ['claim-abner-killing', 'claim-abner-funeral'],
  },
  {
    id: 'ent-abishai-gate',
    title: 'Abishai son of Zeruiah',
    kind: 'person',
    position: [ABISHAI_GATE_POS[0], 3, ABISHAI_GATE_POS[1]],
    description:
      'Named alongside Joab as sharing responsibility for Abner’s death (3:30), present near the gate — but the text attributes the strike to Joab alone, and this scene stages it that way.',
    claimIds: ['claim-abner-killing'],
  },
];
