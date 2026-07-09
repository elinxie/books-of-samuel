import type { SceneEntityDef } from '../types';

/**
 * Label set for the Gilboa terrain (Step 1) plus the crest death-group's
 * five named principals (Step 2). Rout/press crowd figures are unlabeled
 * ambient figures, matching the project's convention of labeling named
 * narrative figures and terrain/route features, not every crowd instance.
 */
export const GILBOA_BATTLE_ENTITIES: SceneEntityDef[] = [
  {
    id: 'ent-gilboa-ridge',
    title: 'Mount Gilboa',
    kind: 'feature',
    position: [0, 6, 0],
    description:
      'An identified ridge (Jebel Faqqu’a) on the eastern rim of the Jezreel Valley. Israel held this high ground; the terrain’s crest, the lower northern approach, and the eastern escape slope are what make the rout that follows legible as a rout.',
    claimIds: ['claim-gilboa-topography', 'claim-gilboa-terrain-form'],
  },
  {
    id: 'ent-jezreel-approach',
    title: 'The Jezreel plain (Philistine approach)',
    kind: 'feature',
    position: [0, 5, -300],
    description:
      'The valley floor falls away to the north. The Philistines mustered near Shunem, on the plain below, and pressed up this open ground toward the ridge (1 Samuel 28:4; 31:1).',
    claimIds: ['claim-gilboa-topography'],
  },
  {
    id: 'ent-eastern-draw-terrain',
    title: 'The eastern escape slope',
    kind: 'route',
    position: [340, 5, 40],
    description:
      'The ridge descends east toward the Beth-shan/Jordan side — the direction the rout drains. No figures are staged in this terrain-only slice.',
    claimIds: ['claim-gilboa-topography', 'claim-gilboa-terrain-form'],
  },
  {
    id: 'ent-saul',
    title: 'Saul',
    kind: 'person',
    position: [0, 3, 0],
    description:
      'Israel’s first king, at the composition’s still center on the ridge crest with his sons, his armor-bearer, and a thin retinue. A principal-detail procedural rig; identity stays label-based, not a portrait (1 Samuel 31).',
    claimIds: ['claim-battle-scale', 'claim-gilboa-topography', 'claim-dress'],
  },
  {
    id: 'ent-jonathan',
    title: 'Jonathan',
    kind: 'person',
    position: [-2.4, 3, 1.8],
    description:
      'Saul’s eldest son and David’s covenant friend earlier in the narrative, killed with his brothers by the Philistines on Gilboa (1 Samuel 31:2). The death sequence itself is a later step of this build.',
    claimIds: ['claim-battle-scale', 'claim-gilboa-topography', 'claim-dress'],
  },
  {
    id: 'ent-abinadab',
    title: 'Abinadab',
    kind: 'person',
    position: [2.6, 3, 1.3],
    description:
      'A son of Saul, named among the three killed with him on Gilboa (1 Samuel 31:2). The death sequence itself is a later step of this build.',
    claimIds: ['claim-battle-scale', 'claim-gilboa-topography', 'claim-dress'],
  },
  {
    id: 'ent-malchi-shua',
    title: 'Malchi-shua',
    kind: 'person',
    position: [1.1, 3, -2.4],
    description:
      'A son of Saul, named among the three killed with him on Gilboa (1 Samuel 31:2). The death sequence itself is a later step of this build.',
    claimIds: ['claim-battle-scale', 'claim-gilboa-topography', 'claim-dress'],
  },
  {
    id: 'ent-armor-bearer',
    title: 'Saul’s armor-bearer',
    kind: 'person',
    position: [-1.6, 3, -1.9],
    description:
      'Unnamed in the narrative. Asked by the badly wounded Saul to run him through rather than let the Philistines take him; he will not, "for he feared greatly" — the death sequence’s emotional pivot, staged in a later step (1 Samuel 31:4–5).',
    claimIds: ['claim-battle-scale', 'claim-gilboa-topography', 'claim-dress'],
  },
];
