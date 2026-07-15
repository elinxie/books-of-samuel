import type { SceneEntityDef } from '../types';

/**
 * Label set for Beth-shan: terrain/identification, the wall and its display
 * (the composition's fixed point, per the brief), the gate plaza, the
 * Egyptian monuments, and the eastern sightline the news and the retrieval
 * travel. Saul is not re-staged as a living figure here — the display forms
 * are referenced through claim-body-display, not a named-figure label,
 * matching the brief ("Saul’s entry is not re-staged as a living figure
 * here").
 */
export const BETH_SHAN_WALLS_ENTITIES: SceneEntityDef[] = [
  {
    id: 'ent-beth-shan-tell',
    title: 'Beth-shan (Tel Beth-Shean)',
    kind: 'settlement',
    position: [0, 8, 0],
    description:
      'A securely identified, extensively excavated tell at the junction of the Harod and Jordan valleys — a long-held Egyptian garrison town, and the project’s first securely identified urban site. The Iron I town on the summit, generations after the garrison’s end, is where the text sets the display of Saul’s body.',
    claimIds: ['claim-beth-shan-identification', 'claim-chronology'],
  },
  {
    id: 'ent-beth-shan-wall',
    title: 'The wall above the gate',
    kind: 'structure',
    position: [-60, 5, 0],
    description:
      'A modest mudbrick-on-stone perimeter along the tell brow, rendered as narrated (1 Samuel 31:10, 12) and disclosed as archaeologically thin — no substantial Iron I fortification wall is clearly attested here. A textual variant (2 Samuel 21:12) names a public square rather than a wall; the display is staged at the wall face directly above the gate plaza so both readings point at the same spot.',
    claimIds: ['claim-beth-shan-wall', 'claim-beth-shan-control'],
  },
  {
    id: 'ent-display-forms',
    title: 'The display on the wall',
    kind: 'feature',
    position: [-60, 8, 0],
    description:
      'Four bound, wrapped forms — Saul and his three sons (1 Samuel 31:10, 12) — fastened to the wall face above the gate plaza, rendered as anatomically unresolved silhouettes at wall-top distance. No head or headless geometry is shown in any mode; distance and wrapping carry what the captions state plainly.',
    claimIds: ['claim-body-display', 'claim-jabesh-retrieval'],
  },
  {
    id: 'ent-gate-plaza',
    title: 'The gate plaza',
    kind: 'feature',
    position: [-96, 4, 0],
    description:
      'The open ground below the wall — the "public square" of the 2 Samuel 21:12 variant. Townspeople gather here through the daylight beats; the Philistine escort arrives and departs along the valley road that meets it.',
    claimIds: ['claim-beth-shan-wall', 'claim-dress'],
  },
  {
    id: 'ent-town-quarter',
    title: 'The summit quarter',
    kind: 'settlement',
    position: [10, 6, 10],
    description:
      'A dense cluster of small conjoined mudbrick houses along narrow lanes — the Iron I domestic quarter, disclosed as a labeled massing placeholder informed by the excavated town rather than a reproduction of its plan.',
    claimIds: ['claim-beth-shan-town-form'],
  },
  {
    id: 'ent-egyptian-monuments',
    title: 'Egyptian monuments',
    kind: 'feature',
    position: [15, 3, 18],
    description:
      'Weathered basalt monuments — in the tradition of the excavated Seti I stelae and the Ramesses III statue — curated into visibility in the later Iron Age town. Additive, not load-bearing; the curated-into-Iron-I reading awaits page-verification (fable-review-queue #16).',
    claimIds: ['claim-egyptian-monuments'],
  },
  {
    id: 'ent-jordan-sightline',
    title: 'The Jordan valley, toward Jabesh',
    kind: 'route',
    position: [200, 5, -20],
    description:
      'The ground falls away east toward the Jordan. Across it, Jabesh-gilead hears the news at dusk (1 Samuel 31:11), and the retrieval party comes and goes by this same sightline the following night.',
    claimIds: ['claim-jabesh-retrieval'],
  },
];
