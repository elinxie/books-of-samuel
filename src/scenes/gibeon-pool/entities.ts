import type { SceneEntityDef } from '../types';
import {
  AMMAH_FOOT_CENTER,
  AMMAH_HILL_CENTER,
  CHAMPIONS_GROUND_CENTER,
  ISRAEL_BANK_CENTER,
  JUDAH_BANK_CENTER,
  POOL_CENTER,
} from './layout';

/**
 * Label set for gibeon-pool: the pool itself, the champions' ground, the two
 * bank contingents, the hill of Ammah, and the five named principals (Abner,
 * Ish-bosheth referenced only, Joab, Abishai, Asahel). Mahanaim is referenced
 * in the context/casualty-count captions only, never given its own entity
 * here — it is not built in this scene (see the brief's "Location note").
 */
export const GIBEON_POOL_ENTITIES: SceneEntityDef[] = [
  {
    id: 'ent-pool',
    title: 'The pool of Gibeon',
    kind: 'feature',
    position: [POOL_CENTER[0], 3, POOL_CENTER[1]],
    description:
      "The two companies arrived and sat down on opposite banks of the pool, one on each side, before a blow was struck (2 Samuel 2:13). A rare, striking text/archaeology convergence: Pritchard's excavation at Tell el-Jib found an actual rock-cut pool and stepped water-tunnel system at this identified site. Rendered as a modest basin, not Pritchard's excavated monumental dimensions — whether that monumental form already existed in the early Iron IIA setting of this narrative, or is a later expansion, is a genuinely open dating question this scene does not resolve.",
    claimIds: ['claim-gibeon-pool-form'],
  },
  {
    id: 'ent-champions-ground',
    title: 'The champions’ ground (Helkath-hazzurim)',
    kind: 'feature',
    position: [CHAMPIONS_GROUND_CENTER[0], 3, CHAMPIONS_GROUND_CENTER[1]],
    description:
      'Twelve chosen young men from each side, seized their opponents by the head, and drove their swords into each other’s sides — a simultaneous, mutually fatal contest, twelve times over. The place was named Helkath-hazzurim for what happened here — a name usually glossed "the field of sword-edges" or "the field of strong men" (the KJV’s marginal reading); the Hebrew etymology is not fully certain (2 Samuel 2:14-16). Rendered literally, 1:1 — the text’s own exact number, not a design-choice ratio.',
    claimIds: ['claim-gibeon-contest'],
  },
  {
    id: 'ent-israel-contingent',
    title: 'Abner’s company (Israel/Benjamin)',
    kind: 'group',
    position: [ISRAEL_BANK_CENTER[0], 3, ISRAEL_BANK_CENTER[1]],
    description:
      'The men who came out with Abner from Mahanaim, gathered on the pool’s north bank. No headcount is narrated for either side’s wider force; the figures shown are a disclosed, deliberately modest design choice — smaller than the gilboa-battle wide shots, and not derived from the 360-man casualty figure given later in the text. Dressed identically to Joab’s company (claim-dress) — no invented Judah-kit/Benjamin-kit distinction; the two sides read by grouping and position, not insignia.',
    claimIds: ['claim-gibeon-contest', 'claim-gibeon-battle-scale', 'claim-dress'],
  },
  {
    id: 'ent-judah-contingent',
    title: 'Joab’s company (Judah)',
    kind: 'group',
    position: [JUDAH_BANK_CENTER[0], 3, JUDAH_BANK_CENTER[1]],
    description:
      'David’s servants under Joab, gathered on the pool’s south bank. The same disclosed, modest design-choice headcount convention as Abner’s company — this is a contingent-level clash between two commanders’ followings at one town, not a national muster.',
    claimIds: ['claim-gibeon-contest', 'claim-gibeon-battle-scale', 'claim-dress'],
  },
  {
    id: 'ent-ammah-hill',
    title: 'The hill of Ammah',
    kind: 'feature',
    position: [AMMAH_HILL_CENTER[0], 18, AMMAH_HILL_CENTER[1]],
    description:
      '"The people of Benjamin gathered themselves together after Abner and became one group and stood on the top of a hill" (2 Samuel 2:25) — a modest rise, not a dramatic peak. The side that is losing badly by the numbers (2:30-31) holds the higher ground here; height does not track the military outcome in this scene, a deliberate composition choice, not a "fix." The rallying band’s size is drawn from, not added to, Abner’s wider contingent’s disclosed design-choice headcount.',
    claimIds: ['claim-abner-pursuit-halted', 'claim-gibeon-battle-scale'],
  },
  {
    id: 'ent-ammah-foot',
    title: 'Below the hill',
    kind: 'group',
    position: [AMMAH_FOOT_CENTER[0], 4, AMMAH_FOOT_CENTER[1]],
    description:
      'Joab’s pursuing detachment halts here, at the foot of the hill, looking up at the rallied band above — the losing side, by casualty count, asking for and receiving mercy from the numerically stronger pursuers.',
    claimIds: ['claim-abner-pursuit-halted', 'claim-gibeon-battle-scale'],
  },
  {
    id: 'ent-abner',
    title: 'Abner son of Ner',
    kind: 'person',
    position: [ISRAEL_BANK_CENTER[0], 3, ISRAEL_BANK_CENTER[1] + 5],
    description:
      'Saul’s former army commander. Installed Ish-bosheth over the northern tribes at Mahanaim (referenced, not shown here); proposes the champions’ contest; is pursued by Asahel and, after two on-record warnings to turn aside, kills him with a backward thrust of his spear — staged as reluctant, not as a hunter. Pleads for restraint at the hill of Ammah, and Joab grants it.',
    claimIds: ['claim-ish-bosheth-installed', 'claim-gibeon-contest', 'claim-asahel-death'],
  },
  {
    id: 'ent-joab',
    title: 'Joab son of Zeruiah',
    kind: 'person',
    position: [JUDAH_BANK_CENTER[0], 3, JUDAH_BANK_CENTER[1] + 5],
    description:
      'David’s army commander, Abishai and Asahel’s brother. Agrees to Abner’s proposed contest; continues the pursuit of Abner after his youngest brother’s death; halts it at Abner’s appeal, sounding the trumpet to call his men back — a genuine act of restraint, not exhaustion or a treaty.',
    claimIds: ['claim-gibeon-contest', 'claim-abner-pursuit-halted'],
  },
  {
    id: 'ent-abishai',
    title: 'Abishai son of Zeruiah',
    kind: 'person',
    position: [JUDAH_BANK_CENTER[0] + 3, 3, JUDAH_BANK_CENTER[1] + 5],
    description: 'Joab’s brother, Asahel’s brother, who joins Joab in the pursuit of Abner.',
    claimIds: ['claim-abner-pursuit-halted'],
  },
  {
    id: 'ent-asahel',
    title: 'Asahel son of Zeruiah',
    kind: 'person',
    position: [JUDAH_BANK_CENTER[0] - 3, 3, JUDAH_BANK_CENTER[1] + 5],
    description:
      'Joab’s youngest brother, described in the text as swift of foot, like a wild gazelle (2:18). Pursues Abner alone, refusing to turn aside despite two warnings, and is killed by a backward thrust of Abner’s spear — the project’s first named-character-kills-named-character death, shown at documentary distance with no wound geometry. His refusal reads as loyal zeal, not folly; both readings of Abner and Asahel stay available, per the text’s own framing. Buried afterward at Bethlehem, in his father’s tomb (2:32) — not shown, outside this scene’s location.',
    claimIds: ['claim-asahel-death'],
  },
];
