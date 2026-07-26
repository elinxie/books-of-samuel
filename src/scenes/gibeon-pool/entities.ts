import type { SceneEntityDef } from '../types';
import {
  ABISHAI_POOL_POS,
  ABNER_POOL_POS,
  AMMAH_HILL_POS,
  ASAHEL_POOL_POS,
  BATTLE_SPREAD_ABNER_CENTER,
  BATTLE_SPREAD_JOAB_CENTER,
  ISRAEL_BANK_CENTER,
  JOAB_POOL_POS,
  JUDAH_BANK_CENTER,
  POOL_CENTER,
} from './layout';

/**
 * Label set for gibeon-pool: the pool itself, the champions' ground, the
 * spreading battlefield, the hill of Ammah, the two wider contingents, and
 * the four named principals actually present at Gibeon (Abner, Joab,
 * Abishai, Asahel). Ish-bosheth is deliberately not given a positioned
 * entity here — he does not appear at Gibeon in the text and this scene
 * never stages him (see the character entry's own claimIds instead).
 */
export const GIBEON_POOL_ENTITIES: SceneEntityDef[] = [
  {
    id: 'ent-pool',
    title: 'The pool of Gibeon',
    kind: 'feature',
    position: [POOL_CENTER[0], 2, POOL_CENTER[1]],
    description:
      "\"The pool of Gibeon\" (2 Samuel 2:13) — a genuine text/archaeology convergence: Pritchard's excavation at Tell el-Jib found an actual rock-cut pool and stepped water-tunnel system at the identified site. Whether that excavated form existed as early as this narrative's early Iron IIA setting, or is a later Iron II expansion, is a genuinely open dating question (see claim-gibeon-pool-form) — this render is a modest, undated-fidelity basin, not a reproduction of Pritchard's excavated dimensions.",
    claimIds: ['claim-gibeon-pool-form'],
  },
  {
    id: 'ent-champions-ground',
    title: "Helkath-hazzurim — the champions' ground",
    kind: 'feature',
    position: [0, 2, 0],
    description:
      'Twelve young men from Benjamin/Ish-bosheth and twelve from David/Judah rise, seize one another by the head, and kill one another in pairs — the text\'s own exact count, rendered literally, no ratio (2 Samuel 2:14-16). The place is named "the field of sword-edges" (Helkath-hazzurim) for what happens here.',
    claimIds: ['claim-gibeon-contest', 'claim-dress'],
  },
  {
    id: 'ent-battle-spread',
    title: 'The wider battle',
    kind: 'feature',
    position: [
      (BATTLE_SPREAD_ABNER_CENTER[0] + BATTLE_SPREAD_JOAB_CENTER[0]) / 2,
      2,
      (BATTLE_SPREAD_ABNER_CENTER[1] + BATTLE_SPREAD_JOAB_CENTER[1]) / 2,
    ],
    description:
      "The contest ignites a wider clash; Israel is routed before the servants of David (2 Samuel 2:17). Israelites against Israelites, not a foreign-enemy battle — the tribal fracture stated in 2:9-10 is the point, not conquest. The two wider contingents shown here are a disclosed design choice (claim-gibeon-battle-scale), deliberately smaller than gilboa-battle's already-modest groupings.",
    claimIds: ['claim-gibeon-contest', 'claim-gibeon-battle-scale', 'claim-dress'],
  },
  {
    id: 'ent-israel-contingent',
    title: "Abner's contingent (Israel/Benjamin)",
    kind: 'group',
    position: [ISRAEL_BANK_CENTER[0], 2, ISRAEL_BANK_CENTER[1]],
    description:
      'No headcount is narrated for either side\'s force. The figures shown are a disclosed design choice, not a ratio of any asserted "true" number, and are not sized to match the 360-man casualty figure delivered as text later in the scene (claim-gibeon-battle-scale, claim-abner-pursuit-halted).',
    claimIds: ['claim-gibeon-battle-scale', 'claim-dress'],
  },
  {
    id: 'ent-judah-contingent',
    title: "Joab's contingent (Judah)",
    kind: 'group',
    position: [JUDAH_BANK_CENTER[0], 2, JUDAH_BANK_CENTER[1]],
    description:
      'Dressed identically to Abner\'s contingent — both sides are Israelite, and the text gives no visual marker distinguishing them (no invented "Judah kit" vs. "Benjamin kit" uniform). Sides read by grouping and position, not insignia.',
    claimIds: ['claim-gibeon-battle-scale', 'claim-dress'],
  },
  {
    id: 'ent-ammah-hill',
    title: 'The hill of Ammah',
    kind: 'feature',
    position: [AMMAH_HILL_POS[0], 14, AMMAH_HILL_POS[1]],
    description:
      'Abner\'s pursued Benjaminites rally into a single band atop this rise (2 Samuel 2:24-25), physically above Joab and Abishai\'s pursuers below — a deliberate visual irony the composition keeps rather than "fixing": the side losing badly by the numbers (2:30-31) holds the high ground and is the one asking for mercy.',
    claimIds: ['claim-abner-pursuit-halted'],
  },
  {
    id: 'ent-abner',
    title: 'Abner son of Ner',
    kind: 'person',
    position: [ABNER_POOL_POS[0], 3, ABNER_POOL_POS[1]],
    description:
      "Saul's army commander. Installs Ish-bosheth at Mahanaim, proposes the champions' contest, and kills Asahel in the pursuit that follows — staged as reluctant throughout, per his two on-record warnings and his own line explaining why he does not want to do this (2:22).",
    claimIds: ['claim-ish-bosheth-installed', 'claim-gibeon-contest', 'claim-asahel-death'],
  },
  {
    id: 'ent-joab',
    title: 'Joab son of Zeruiah',
    kind: 'person',
    position: [JOAB_POOL_POS[0], 3, JOAB_POOL_POS[1]],
    description:
      "David's army commander at Gibeon, brother of Abishai and Asahel. Agrees to the contest, pursues Abner to the hill of Ammah, and — on Abner's appeal, and despite having just lost his youngest brother to that same Abner — sounds the trumpet and calls the pursuit off.",
    claimIds: [
      'claim-gibeon-contest',
      'claim-abner-pursuit-halted',
      'claim-asahel-burial-hebron-march',
    ],
  },
  {
    id: 'ent-abishai',
    title: 'Abishai son of Zeruiah',
    kind: 'person',
    position: [ABISHAI_POOL_POS[0], 3, ABISHAI_POOL_POS[1]],
    description:
      "Joab's brother, Asahel's brother, who joins the pursuit of Abner to the hill of Ammah.",
    claimIds: ['claim-abner-pursuit-halted'],
  },
  {
    id: 'ent-asahel',
    title: 'Asahel son of Zeruiah',
    kind: 'person',
    position: [ASAHEL_POOL_POS[0], 3, ASAHEL_POOL_POS[1]],
    description:
      "Joab's youngest brother, \"swift as a gazelle.\" Pursues Abner alone despite two warnings to turn aside, and is killed by a backward thrust of Abner's spear — the project's first rendering of one named character killing another at close range, held at documentary distance with no wound geometry (ADR-009). Later taken up and buried in his father's tomb at Bethlehem, not shown here.",
    claimIds: ['claim-asahel-death', 'claim-asahel-burial-hebron-march'],
  },
];
