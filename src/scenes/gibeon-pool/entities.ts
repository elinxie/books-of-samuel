import type { SceneEntityDef } from '../types';

/**
 * Label set for gibeon-pool: the pool/terrain features along the journey
 * (pool, champions' ground, spreading battlefield, pursuit route, hill of
 * Ammah) and the four named principals actually staged at Gibeon (Abner,
 * Joab, Abishai, Asahel). Ish-bosheth is referenced only (2:8-10) and is
 * never staged here, per the brief, so he has no entity. Crowd/champion
 * figures are unlabeled ambient instances, matching the project's
 * convention of labeling named narrative figures and terrain/route
 * features, not every crowd instance.
 */
export const GIBEON_POOL_ENTITIES: SceneEntityDef[] = [
  {
    id: 'ent-gibeon-pool',
    title: 'The pool of Gibeon',
    kind: 'feature',
    position: [0, 2, 0],
    description:
      'A rock-cut basin at the site identified with Gibeon (2 Samuel 2:13), where the two companies sat opposite each other before a blow was struck. Pritchard’s excavation at Tell el-Jib found an actual pool/water-tunnel system here — a rare text-to-feature match — but whether that excavated form already existed in its present shape this early is an open dating question, disclosed rather than resolved.',
    claimIds: ['claim-gibeon-pool-form', 'claim-gibeon-terrain-form'],
  },
  {
    id: 'ent-champions-ground',
    title: 'Helkath-hazzurim — the field of sword-edges',
    kind: 'feature',
    position: [0, 2, 27],
    description:
      'Immediately beside the pool: twelve young men of Benjamin and twelve servants of David seize one another by the head and fall together, giving the ground its name (2 Samuel 2:14–16). Rendered at the text’s own exact count, 1:1 — no ratio applies.',
    claimIds: ['claim-gibeon-contest'],
  },
  {
    id: 'ent-battle-spread',
    title: 'The battle spreads',
    kind: 'feature',
    position: [0, 3, 95],
    description:
      'The contest ignites a wider clash; Israel is routed before the servants of David (2 Samuel 2:17). The two wider contingents shown here are a disclosed, deliberately modest design count — smaller than gilboa-battle’s already-modest musters — not a ratio of any asserted true army size, and not derived from the casualty figures stated later.',
    claimIds: ['claim-gibeon-contest', 'claim-gibeon-battle-scale'],
  },
  {
    id: 'ent-pursuit-route',
    title: 'The pursuit route',
    kind: 'route',
    position: [10, 2, 260],
    description:
      'Open ground south of Gibeon, away from the pool, where Asahel alone pursues Abner, is twice warned to turn aside, and is struck down (2 Samuel 2:19–23) — and where Joab and Abishai continue the wider pursuit toward the hill of Ammah.',
    claimIds: ['claim-asahel-death', 'claim-abner-pursuit-halted'],
  },
  {
    id: 'ent-ammah-hill',
    title: 'The hill of Ammah',
    kind: 'feature',
    position: [22, 18, 430],
    description:
      'A modest rise where Benjaminites rally to Abner and Joab’s pursuit halts (2 Samuel 2:24–28). The rallying band holds the high ground even though its side has just lost badly by the numbers stated afterward (2:30–31) — a deliberate visual irony this scene keeps rather than "fixing" into a more conventionally heroic composition.',
    claimIds: ['claim-abner-pursuit-halted'],
  },
  {
    id: 'ent-abner',
    title: 'Abner son of Ner',
    kind: 'person',
    position: [-13, 3, 4],
    description:
      'Saul’s army commander. Proposes the champions’ contest, and — after twice warning him to turn aside — kills the pursuing Asahel with a backward thrust of his spear. Staged as reluctant throughout, per his own words: "how then could I hold up my face to your brother Joab?" (2 Samuel 2:22).',
    claimIds: [
      'claim-ish-bosheth-installed',
      'claim-gibeon-contest',
      'claim-asahel-death',
      'claim-abner-pursuit-halted',
      'claim-dress',
    ],
  },
  {
    id: 'ent-joab',
    title: 'Joab son of Zeruiah',
    kind: 'person',
    position: [13, 3, -4],
    description:
      'David’s army commander, brother of Abishai and Asahel. Agrees to the contest, then pursues Abner toward the hill of Ammah — and, on Abner’s appeal and despite having just lost his youngest brother to him, sounds the trumpet and calls the pursuit off.',
    claimIds: ['claim-gibeon-contest', 'claim-abner-pursuit-halted', 'claim-dress'],
  },
  {
    id: 'ent-abishai',
    title: 'Abishai son of Zeruiah',
    kind: 'person',
    position: [19, 3, -9],
    description: 'Joab’s brother, Asahel’s brother, who joins the pursuit of Abner.',
    claimIds: ['claim-abner-pursuit-halted', 'claim-dress'],
  },
  {
    id: 'ent-asahel',
    title: 'Asahel son of Zeruiah',
    kind: 'person',
    position: [17, 3, 3],
    description:
      'Joab’s youngest brother, "swift of foot as a wild gazelle" (2 Samuel 2:18). Refuses to turn aside from pursuing Abner — framed by the text as loyal zeal, not folly — and is killed. The project’s first named-character-kills-named-character death, rendered at documentary distance with no wound geometry, per ADR-009.',
    claimIds: ['claim-asahel-death', 'claim-dress'],
  },
];
