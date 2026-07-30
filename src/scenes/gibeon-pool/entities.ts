import type { SceneEntityDef } from '../types';
import { ABNER_BANK_CENTER, CHAMPION_PAIR_SLOTS, JOAB_BANK_CENTER } from './layout';
import { HILL_OF_AMMAH_CENTER, POOL_CENTER } from './terrain';

/**
 * Label set for gibeon-pool: the pool itself, the champions' ground
 * (Helkath-hazzurim), the two contingents (never given an invented kit
 * distinction — see claim-dress), the hill of Ammah, and the four named
 * principals. Ish-bosheth is deliberately not labeled here — he is
 * referenced only in the b-context caption, never staged at Gibeon.
 * Mahanaim likewise has no entity marker in this scene (narrated only, not
 * built — see the `mahanaim` LocationEntry's own disputed identification).
 */
export const GIBEON_POOL_ENTITIES: SceneEntityDef[] = [
  {
    id: 'ent-pool',
    title: 'The pool of Gibeon',
    kind: 'feature',
    position: [POOL_CENTER[0], 2, POOL_CENTER[1]],
    description:
      '"The pool of Gibeon" (2 Samuel 2:13) — a rare, striking text/archaeology convergence: Pritchard\'s excavation at the identified site (Tell el-Jib) found an actual rock-cut pool and stepped water-tunnel system. Whether that excavated, monumental form already existed in the early Iron IIA setting of this narrative, or is a later expansion, is an open question this scene cannot resolve — rendered here as a modest basin/water-plane feature, not asserted at Pritchard\'s excavated dimensions.',
    claimIds: ['claim-gibeon-pool-feature', 'claim-gibeon-terrain-form'],
  },
  {
    id: 'ent-champions-ground',
    title: 'Helkath-hazzurim',
    kind: 'feature',
    position: [CHAMPION_PAIR_SLOTS[0].x, 3, 0],
    description:
      'Twelve chosen young men from each side seize one another by the head and drive a sword into each other\'s side — a simultaneous, mutually fatal contest, twelve times over (2 Samuel 2:14-16). The place was named Helkath-hazzurim, "the field of sword-edges," from what happened there. Rendered literally, 1:1 — the text\'s own exact number is small enough to need no ratio.',
    claimIds: ['claim-champions-contest'],
  },
  {
    id: 'ent-abner-contingent',
    title: "Abner's company (Israel/Benjamin)",
    kind: 'group',
    position: [ABNER_BANK_CENTER[0], 3, ABNER_BANK_CENTER[1]],
    description:
      "The servants of Ish-bosheth/Abner, gathered on the north side of the pool (2 Samuel 2:13). No headcount is narrated for either side's wider force; the figures shown are a disclosed design choice, deliberately smaller than gilboa-battle's already-modest combat totals — a contingent-level clash, not a national muster. Dress is not distinguished from Joab's company below: both sides are Israelite, and no \"Benjamin kit\" is invented (claim-dress, reused as-is).",
    claimIds: ['claim-gibeon-battle', 'claim-gibeon-battle-scale', 'claim-dress'],
  },
  {
    id: 'ent-joab-contingent',
    title: "Joab's company (Judah)",
    kind: 'group',
    position: [JOAB_BANK_CENTER[0], 3, JOAB_BANK_CENTER[1]],
    description:
      "David's servants, gathered on the south side of the pool (2 Samuel 2:13) — the same men, in the same undifferentiated dress, as the following the observer has tracked since Ziklag. This is civil war: men who may have stood together against the Philistines at Gilboa two years earlier now face each other across a well outside Gibeon.",
    claimIds: ['claim-gibeon-battle', 'claim-gibeon-battle-scale', 'claim-dress'],
  },
  {
    id: 'ent-hill-of-ammah',
    title: 'The hill of Ammah',
    kind: 'feature',
    position: [HILL_OF_AMMAH_CENTER[0], 20, HILL_OF_AMMAH_CENTER[1]],
    description:
      "Where Abner's Benjaminites rally and the pursuit is finally called off (2 Samuel 2:24-28). Deliberately composed so the rallying band stands physically above the pursuers below — the side losing badly by the numbers (2:29-31) holds the high ground here; height does not equal the military outcome in this scene.",
    claimIds: ['claim-ammah-standoff', 'claim-gibeon-terrain-form'],
  },
  {
    id: 'ent-abner',
    title: 'Abner son of Ner',
    kind: 'person',
    position: [ABNER_BANK_CENTER[0] - 6, 3, ABNER_BANK_CENTER[1] - 4],
    description:
      'Saul\'s former army commander, who installed Ish-bosheth over the northern tribes at Mahanaim (2:8-10, referenced only — not rendered here) and proposes the contest at the pool. Kills Asahel in the pursuit that follows, reluctantly: the text gives him two on-record warnings to turn aside and a line explaining exactly why he does not want this fight ("how then could I hold up my face to your brother Joab?", 2:22). Staged as a man trying to avoid a killing he cannot prevent, not as a hunter.',
    claimIds: [
      'claim-mahanaim-installation',
      'claim-champions-contest',
      'claim-gibeon-battle',
      'claim-asahel-pursuit-death',
      'claim-ammah-standoff',
    ],
  },
  {
    id: 'ent-joab',
    title: 'Joab son of Zeruiah',
    kind: 'person',
    position: [JOAB_BANK_CENTER[0] - 6, 3, JOAB_BANK_CENTER[1] + 4],
    description:
      "David's army commander, brother of Abishai and Asahel. Agrees to the contest, commands through the battle, and — having just lost his youngest brother to this same Abner — grants Abner's plea for restraint anyway, sounding the trumpet to call the pursuit back (2:26-28). A genuine ethical choice inside a civil war, not a tactical retreat.",
    claimIds: ['claim-champions-contest', 'claim-gibeon-battle', 'claim-ammah-standoff'],
  },
  {
    id: 'ent-abishai',
    title: 'Abishai son of Zeruiah',
    kind: 'person',
    position: [JOAB_BANK_CENTER[0] + 6, 3, JOAB_BANK_CENTER[1] + 4],
    description:
      "Joab's brother and Asahel's brother, who joins Joab in pursuing Abner all the way to the hill of Ammah (2:24).",
    claimIds: ['claim-ammah-standoff'],
  },
  {
    id: 'ent-asahel',
    title: 'Asahel son of Zeruiah',
    kind: 'person',
    position: [JOAB_BANK_CENTER[0] + 3, 3, JOAB_BANK_CENTER[1] + 2],
    description:
      "Joab's youngest brother, \"swift as a gazelle\" (2:18) — introduced by that description specifically because it matters to what follows: he alone outruns the rest of the pursuit and closes on Abner despite being twice warned to turn aside. Killed by a backward thrust of Abner's spear (2:23) — this project's first rendering of one named character killing another at close range, held at documentary distance with no wound geometry in either mode. Later taken up and buried in his father's tomb at Bethlehem (2:32, not rendered — out of this scene's location scope); Joab and his men march through the night and reach Hebron by daybreak.",
    claimIds: ['claim-asahel-pursuit-death', 'claim-asahel-burial-hebron-march'],
  },
];
