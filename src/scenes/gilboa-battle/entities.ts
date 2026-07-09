import type { SceneEntityDef } from '../types';

/**
 * Minimal label set for the M3 terrain shell (Step 1 of the Gilboa build) —
 * the geometry itself, not yet the figures/kit that later steps add.
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
];
