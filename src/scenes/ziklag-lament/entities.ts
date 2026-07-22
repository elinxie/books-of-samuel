import type { SceneEntityDef } from '../types';
import {
  DAVID_PLAZA_POS,
  LAMENT_RISE_POS,
  MESSENGER_FALL_POS,
  PLAZA_CENTER,
  WITNESS_PLAZA_SLOTS,
} from './layout';

/**
 * Label set for ziklag-lament. The town itself is the same `ziklag`
 * settlement as ziklag-aftermath (see terrain.ts/RecoveringSettlement.tsx) —
 * this scene's own entities cover only what's new here: the gate approach,
 * the plaza conversation, the lament rise, and the small named/witness cast.
 */
export const ZIKLAG_LAMENT_ENTITIES: SceneEntityDef[] = [
  {
    id: 'ent-lament-ziklag-recovering',
    title: 'Ziklag, recovering',
    kind: 'settlement',
    position: [0, 14, 0],
    description:
      'The same town as the burned Ziklag of 1 Samuel 30, three narrative days on: families are home (nothing was missing), and the ruin is now a recovery site — scaffolding and part-repaired walls on some structures, no active smoke. The real site remains unidentified; this render stays the same generic composite used in ziklag-aftermath.',
    claimIds: ['claim-ziklag-location', 'claim-ziklag-scale', 'claim-oval-plan', 'claim-mudbrick'],
  },
  {
    id: 'ent-lament-gate-approach',
    title: 'The gate approach',
    kind: 'route',
    position: [6, 4, -95],
    description:
      'The messenger arrives alone, on foot, clothes torn and dust on his head (2 Samuel 1:2) — the town reads the bad news off his body before he speaks a word. David has been back at Ziklag two days; the messenger arrives on the third (2 Samuel 1:1–2).',
    claimIds: ['claim-amalekite-messenger-account', 'claim-mourning-dress', 'claim-wall-gate'],
  },
  {
    id: 'ent-lament-plaza',
    title: 'The plaza',
    kind: 'feature',
    position: [PLAZA_CENTER[0], 4, PLAZA_CENTER[1]],
    description:
      'The same open center used in ziklag-aftermath. Here the messenger falls to the ground before David, gives his account, and produces the crown and armlet (2 Samuel 1:2, 10); here too David and his men mourn until evening, then David judges the messenger.',
    claimIds: [
      'claim-amalekite-messenger-account',
      'claim-royal-tokens',
      'claim-execution-messenger',
      'claim-lords-anointed-principle',
    ],
  },
  {
    id: 'ent-lament-rise',
    title: 'The lament rise, at dusk',
    kind: 'feature',
    position: [LAMENT_RISE_POS[0], 4, LAMENT_RISE_POS[1]],
    description:
      'A modest rise near the wall, deliberately apart from the plaza — new staging within the same reused terrain, not new geometry. Here David delivers the Song of the Bow, mourning Saul and Jonathan together and ordering the lament taught to the sons of Judah (2 Samuel 1:17–27).',
    claimIds: ['claim-song-of-the-bow', 'claim-lament-evening'],
  },
  {
    id: 'ent-lament-messenger',
    title: 'The Amalekite messenger',
    kind: 'person',
    position: [MESSENGER_FALL_POS[0], 3, MESSENGER_FALL_POS[1]],
    description:
      'Unnamed in the text. Claims to have killed Saul at his own request — a claim the narrative itself frames as unverified and which contradicts 1 Samuel 31:4’s own account (already rendered in gilboa-battle). Executed for the self-incriminating confession, not a proven killing.',
    claimIds: ['claim-amalekite-messenger-account', 'claim-execution-messenger'],
  },
  {
    id: 'ent-lament-david',
    title: 'David',
    kind: 'person',
    position: [DAVID_PLAZA_POS[0], 3, DAVID_PLAZA_POS[1]],
    description:
      'Receives the news, mourns genuinely before he judges, executes the messenger for the confession itself, then composes and commissions the Song of the Bow. His restraint toward Saul’s person is consistent whether Saul is alive and hunting him (1 Sam 24:6; 26:9–11) or dead and slandered by a man claiming credit for killing him.',
    claimIds: ['claim-david-historical', 'claim-lords-anointed-principle'],
  },
  {
    id: 'ent-lament-witness-cluster',
    title: 'The witness cluster (disclosed small headcount)',
    kind: 'group',
    position: [WITNESS_PLAZA_SLOTS[0][0], 3, WITNESS_PLAZA_SLOTS[0][1]],
    description:
      '"All the men who were with him" (2 Samuel 1:11–12), rendered as a small, disclosed headcount (6–10 figures) rather than a scaled fraction of the narrated six hundred — the text gives no headcount for who is present at the telling, and the ~1:10 muster ratio used for narrated armies elsewhere is the wrong register for this intimate scene.',
    claimIds: ['claim-600-men', 'claim-dress'],
  },
  {
    id: 'ent-lament-royal-tokens',
    title: 'The crown and armlet',
    kind: 'feature',
    position: [MESSENGER_FALL_POS[0] + 0.4, 3.6, MESSENGER_FALL_POS[1] - 0.25],
    description:
      'Physical tokens the messenger brings as proof of Saul’s death (2 Samuel 1:10). That royal insignia were brought is narrated at high confidence; their exact form is unattested and stays a design placeholder — no securely identified Iron Age Israelite royal regalia exists to model from.',
    claimIds: ['claim-royal-tokens'],
  },
];
