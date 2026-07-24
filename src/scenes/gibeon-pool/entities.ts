import type { SceneEntityDef } from '../types';
import {
  AMMAH_HILL_CENTER,
  ASAHEL_DEATH_POS,
  BATTLE_SPREAD_CENTER,
  CHAMPIONS_X,
  JOAB_HALT_POS,
  POOL_CENTER,
} from './layout';

/**
 * Label set for gibeon-pool. Mahanaim is deliberately not given an entity
 * here — it is narrated only (2:8, 2:12, 2:29), never built, per the
 * disputed/low-confidence `mahanaim` LocationEntry (see
 * claim-mahanaim-installation's notes) — nothing in this scene's geometry
 * or labels should gesture at a rendered Mahanaim.
 */
export const GIBEON_POOL_ENTITIES: SceneEntityDef[] = [
  {
    id: 'ent-gibeon-pool',
    title: 'The pool of Gibeon',
    kind: 'feature',
    position: [POOL_CENTER[0], 3, POOL_CENTER[1]],
    description:
      'Named directly in the text (2 Samuel 2:13) — Abner’s company and Joab’s company sit down "one on one side of the pool and the other on the other side" before a blow is struck. Pritchard’s excavation at the identified site (Tell el-Jib) found an actual rock-cut pool and stepped water-tunnel system, a striking text-to-feature match — but whether that excavated form already existed in this early Iron IIA setting, or is a later expansion, is an open, disclosed dating question. Rendered as a modest basin, not Pritchard’s exact excavated dimensions.',
    claimIds: ['claim-gibeon-pool-feature', 'claim-gibeon-terrain-form'],
  },
  {
    id: 'ent-gibeon-champions',
    title: 'The champions’ ground',
    kind: 'group',
    position: [CHAMPIONS_X, 3, 0],
    description:
      'Twelve chosen young men from Abner’s side and twelve from Joab’s (2 Samuel 2:14-16) — a literal, exact count, not a design ratio. Each pair seizes the other by the head and drives a sword into the other’s side, a simultaneous mutual killing repeated twelve times; the place is afterward named Helkath-hazzurim, "the field of sword-edges."',
    claimIds: ['claim-champions-contest'],
  },
  {
    id: 'ent-gibeon-battle-spread',
    title: 'The wider battle',
    kind: 'feature',
    position: [BATTLE_SPREAD_CENTER[0], 3, 0],
    description:
      'The contest ignites a full engagement (2 Samuel 2:17): "the battle was very fierce that day, and Abner and the men of Israel were beaten before the servants of David." This is civil war, not a foreign-enemy battle — men on both sides are Israelite, distinguished here only by grouping and position, never by an invented uniform. The two wider contingents are a disclosed, deliberately modest design count, smaller than gilboa-battle’s, and are not derived from this scene’s own later casualty figures (2:30-31).',
    claimIds: ['claim-gibeon-battle', 'claim-gibeon-battle-scale', 'claim-dress'],
  },
  {
    id: 'ent-gibeon-asahel-death',
    title: 'Where Asahel fell',
    kind: 'feature',
    position: [ASAHEL_DEATH_POS[0], 3, ASAHEL_DEATH_POS[1]],
    description:
      'Asahel, Joab’s youngest brother, "swift of foot as a wild gazelle" (2 Samuel 2:18), pursues Abner alone and will not turn aside despite two warnings. Abner strikes him with the back end of his spear, and he dies there — this project’s first rendering of one named character killing another at close range, at documentary distance, with no wound geometry in either mode. All who came to the place stood still (2:23b), the held reaction beat this scene uses in place of graphic detail.',
    claimIds: ['claim-asahel-pursuit-death'],
  },
  {
    id: 'ent-gibeon-ammah-hill',
    title: 'The hill of Ammah',
    kind: 'feature',
    position: [AMMAH_HILL_CENTER[0], 3, AMMAH_HILL_CENTER[1]],
    description:
      'Benjaminites rally to Abner atop this modest rise (2 Samuel 2:25) — physically above Joab and Abishai below, even though Abner’s side is losing badly by the numbers (2:30-31). Abner’s plea ("Shall the sword devour forever?", 2:26) and Joab’s trumpet halt (2:27-28) end the pursuit here: restraint, not exhaustion or a treaty, stops the killing.',
    claimIds: ['claim-ammah-standoff'],
  },
  {
    id: 'ent-gibeon-abner',
    title: 'Abner son of Ner',
    kind: 'person',
    position: [POOL_CENTER[0] - 14, 3, 34 - 6],
    description:
      'Saul’s army commander. Installs Ish-bosheth over the northern tribes at Mahanaim (referenced only, not built here); proposes the champions’ contest; kills Asahel reluctantly, after two on-record warnings; pleads for the pursuit to stop.',
    claimIds: [
      'claim-mahanaim-installation',
      'claim-champions-contest',
      'claim-asahel-pursuit-death',
    ],
  },
  {
    id: 'ent-gibeon-joab',
    title: 'Joab son of Zeruiah',
    kind: 'person',
    position: [POOL_CENTER[0] - 10, 3, -34 + 6],
    description:
      'David’s army commander, brother of Abishai and Asahel. Agrees to the champions’ contest; pursues Abner after his youngest brother is killed; grants Abner’s appeal and sounds the trumpet to call the pursuit off.',
    claimIds: ['claim-champions-contest', 'claim-ammah-standoff'],
  },
  {
    id: 'ent-gibeon-asahel',
    title: 'Asahel son of Zeruiah',
    kind: 'person',
    position: [ASAHEL_DEATH_POS[0], 3, ASAHEL_DEATH_POS[1] + 2],
    description:
      'Joab’s youngest brother, "swift as a gazelle." His pursuit of Abner is framed by the text as loyal zeal, not recklessness — and his death is the project’s first named-character-kills-named-character killing, rendered at documentary distance with no wound geometry. Buried afterward in his father’s tomb at Bethlehem (2:32, a text-only closing card — not built in this scene).',
    claimIds: ['claim-asahel-pursuit-death', 'claim-asahel-burial-hebron-march'],
  },
  {
    id: 'ent-gibeon-abishai',
    title: 'Abishai son of Zeruiah',
    kind: 'person',
    position: [JOAB_HALT_POS[0], 3, JOAB_HALT_POS[1] + 4],
    description:
      'Joab’s brother, Asahel’s brother, who joins the pursuit of Abner to the hill of Ammah.',
    claimIds: ['claim-ammah-standoff'],
  },
];
