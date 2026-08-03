import type { SceneEntityDef } from '../types';
import {
  ABNER_BANK_CENTER,
  HILL_CENTER,
  JOAB_BANK_CENTER,
  POOL_CENTER,
  PURSUER_BASE_CENTER,
} from './layout';

/**
 * Label set for gibeon-pool: the pool itself, the champions' ground, the
 * spreading battlefield, the pursuit route, the hill of Ammah, and the four
 * named principals who appear at Gibeon (Abner, Joab, Abishai, Asahel).
 * Ish-bosheth and Mahanaim are deliberately absent — referenced in captions
 * only, never staged or labeled here (the brief's hard scope guard).
 */
export const GIBEON_POOL_ENTITIES: SceneEntityDef[] = [
  {
    id: 'ent-pool',
    title: 'The pool of Gibeon',
    kind: 'feature',
    position: [POOL_CENTER[0], 3, POOL_CENTER[1]],
    description:
      '"They sat down, one on one side of the pool and the other on the other side" (2:13) — a genuine text/archaeology convergence. Pritchard’s excavation at Tell el-Jib found a rock-cut pool and stepped water-tunnel system at the identified site, but neither the excavation record nor the site’s own dating establishes whether that monumental form already existed in the early Iron IIA setting of 2 Samuel 2 or is a later expansion — an open question, not smoothed over. Rendered as a modest basin depression and a flat, unlit water plane, not Pritchard’s excavated dimensions.',
    claimIds: ['claim-gibeon-pool-form', 'claim-gibeon-terrain-form'],
  },
  {
    id: 'ent-champions-ground',
    title: "The champions' contest",
    kind: 'feature',
    position: [0, 3, 0],
    description:
      'Twelve chosen men from Benjamin/Ish-bosheth and twelve from Judah/David seize each other by the head and each drives a sword into the other’s side — a simultaneous, paired killing, twelve times over. Rendered literally 1:1 (2:14-16); the place is named Helkath-hazzurim, "the field of sword-edges," for what happens here.',
    claimIds: ['claim-gibeon-contest'],
  },
  {
    id: 'ent-battle-spread',
    title: 'The wider clash',
    kind: 'feature',
    position: [16, 3, 0],
    description:
      'The contest ignites a wider battle; Israel is routed before David’s servants (2:17). This is civil war, not a foreign-enemy fight — men who may have stood together against the Philistines at Gilboa two years earlier are now killing each other here. The two contingents’ sizes are a disclosed design choice, deliberately smaller than gilboa-battle’s, and not derived from the casualty count stated later in the text.',
    claimIds: ['claim-gibeon-contest', 'claim-gibeon-battle-scale', 'claim-david-historical'],
  },
  {
    id: 'ent-pursuit-route',
    title: 'The pursuit',
    kind: 'route',
    position: [190, 6, 0],
    description:
      'Asahel, Joab’s youngest brother and "swift as a gazelle," alone pursues Abner; Abner warns him twice to turn aside before striking him with the back end of his spear. Documentary distance throughout, no wound geometry in any mode — the project’s first named-character-kills-named-character death.',
    claimIds: ['claim-asahel-death'],
  },
  {
    id: 'ent-ammah-hill',
    title: 'The hill of Ammah',
    kind: 'feature',
    position: [HILL_CENTER[0], 20, HILL_CENTER[1]],
    description:
      'The Benjaminites rally behind Abner on this rise; Abner pleads for the pursuit to stop ("Shall the sword devour forever?", 2:26), and Joab sounds the trumpet. Staged so the rallying band stands physically above the pursuers below — a deliberate irony, since by the numbers this is the losing side (2:30-31).',
    claimIds: ['claim-abner-pursuit-halted'],
  },
  {
    id: 'ent-abner',
    title: 'Abner son of Ner',
    kind: 'person',
    position: [ABNER_BANK_CENTER[0], 3, ABNER_BANK_CENTER[1] + 14],
    description:
      'Saul’s former army commander, who installed Ish-bosheth at Mahanaim and leads Israel’s force to Gibeon. Proposes the contest, kills Asahel with visible reluctance after two warnings ("how then could I hold up my face to your brother Joab?", 2:22), and pleads for the pursuit to stop.',
    claimIds: [
      'claim-ish-bosheth-installed',
      'claim-gibeon-contest',
      'claim-asahel-death',
      'claim-abner-pursuit-halted',
    ],
  },
  {
    id: 'ent-joab',
    title: 'Joab son of Zeruiah',
    kind: 'person',
    position: [JOAB_BANK_CENTER[0], 3, JOAB_BANK_CENTER[1] - 14],
    description:
      'David’s army commander at Gibeon. Agrees to the contest, pursues Abner after his youngest brother Asahel is killed, and grants Abner’s appeal anyway — a real act of restraint, not exhaustion or a treaty.',
    claimIds: ['claim-gibeon-contest', 'claim-abner-pursuit-halted'],
  },
  {
    id: 'ent-abishai',
    title: 'Abishai son of Zeruiah',
    kind: 'person',
    position: [PURSUER_BASE_CENTER[0] + 3, 3, PURSUER_BASE_CENTER[1] + 3],
    description:
      "Joab's brother, Asahel's brother, who joins the pursuit of Abner to the hill of Ammah (2:24).",
    claimIds: ['claim-abner-pursuit-halted'],
  },
  {
    id: 'ent-asahel',
    title: 'Asahel son of Zeruiah',
    kind: 'person',
    position: [0, 3, 12],
    description:
      'Joab’s youngest brother, "swift as a gazelle" (2:18). Pursues Abner despite two warnings to turn aside, and is killed by a backward thrust of Abner’s spear — rendered at documentary distance, no wound geometry, with the text’s own "stood still" reaction (2:23b) held as the emotional pivot rather than replayed. Buried afterward at Bethlehem, in his father’s tomb (2:32) — not shown; out of this scene’s location scope.',
    claimIds: ['claim-asahel-death'],
  },
];
