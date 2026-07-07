/**
 * Labeled, inspectable entities in the Ziklag scene. Positions: x/z in scene
 * meters, y = offset above local terrain. Claims resolve through the data
 * registry so every label traces to sources.
 */
export interface SceneEntityDef {
  id: string;
  title: string;
  kind: 'settlement' | 'structure' | 'group' | 'person' | 'route' | 'feature';
  position: [number, number, number];
  description: string;
  claimIds: string[];
}

export const ZIKLAG_ENTITIES: SceneEntityDef[] = [
  {
    id: 'ent-ziklag-town',
    title: 'Ziklag (site disputed)',
    kind: 'settlement',
    position: [0, 14, 0],
    description:
      'A small frontier town granted to David by Achish of Gath (1 Sam 27:6), shown the morning of his return: burned, emptied, still smoking. The real site is unidentified — this render is a generic composite of a small early Iron Age Negev/Shephelah town, not a portrait of any candidate tell.',
    claimIds: [
      'claim-ziklag-location',
      'claim-ziklag-scale',
      'claim-oval-plan',
      'claim-ziklag-raided',
    ],
  },
  {
    id: 'ent-burned-dwellings',
    title: 'Burned dwellings',
    kind: 'structure',
    position: [24, 6, -16],
    description:
      'Mudbrick houses on stone footings, roofs of beam and packed mud — standard construction of the period. Shown charred and partly collapsed per the narrative’s "burned it with fire."',
    claimIds: ['claim-mudbrick', 'claim-four-room', 'claim-ziklag-raided', 'claim-smoke-duration'],
  },
  {
    id: 'ent-perimeter-wall',
    title: 'Perimeter wall (speculative)',
    kind: 'structure',
    position: [-34, 5, -28],
    description:
      'A modest enclosure ring with a simple gate. No evidence fixes Ziklag’s fortifications; this belt follows the "enclosed settlement" plan type of the era and is flagged speculative.',
    claimIds: ['claim-wall-gate', 'claim-oval-plan'],
  },
  {
    id: 'ent-davids-men',
    title: 'David’s six hundred (rendered ~1:10)',
    kind: 'group',
    position: [0, 5, -6],
    description:
      'The narrative counts six hundred men returning from the Philistine muster. For performance the scene renders roughly one figure per ten narrated men; dress is placeholder wool-tone cloth.',
    claimIds: ['claim-600-men', 'claim-dress'],
  },
  {
    id: 'ent-david',
    title: 'David (narrative figure)',
    kind: 'person',
    position: [14, 3, -1],
    description:
      'Fugitive commander, soon king. His dynasty is epigraphically attested ("House of David," Tel Dan stele); his appearance here is entirely conventional — a marker, not a portrait.',
    claimIds: ['claim-david-historical'],
  },
  {
    id: 'ent-missing-households',
    title: 'The missing households',
    kind: 'group',
    position: [-10, 3, 12],
    description:
      'No dead are found in the ruin: the raiders killed no one, but drove off every wife, son, and daughter — including Ahinoam and Abigail. Their absence is the scene’s center of gravity.',
    claimIds: ['claim-ziklag-raided', 'claim-amalekite-raiders'],
  },
  {
    id: 'ent-route-besor',
    title: 'South: toward the brook Besor',
    kind: 'route',
    position: [-10, 5, 130],
    description:
      'The pursuit road. The Besor is widely identified with Nahal Besor, the great wadi of the western Negev; distance from Ziklag depends on which candidate site is adopted (roughly 15–25 km).',
    claimIds: ['claim-besor', 'claim-ziklag-location'],
  },
  {
    id: 'ent-route-north',
    title: 'North: toward Gath and Aphek',
    kind: 'route',
    position: [12, 5, -150],
    description:
      'The road David’s column arrives by, returning from the Philistine muster at Aphek (1 Sam 29) via Gath territory — a three-day march in the narrative.',
    claimIds: ['claim-negev-terrain'],
  },
  {
    id: 'ent-fields',
    title: 'Grain plots (illustrative)',
    kind: 'feature',
    position: [85, 5, -18],
    description:
      'Wheat and barley plots near the town stand for the settlement’s subsistence base. Placement is illustrative; the practice is well documented for the period.',
    claimIds: ['claim-agriculture'],
  },
  {
    id: 'ent-threshing-floor',
    title: 'Threshing floor',
    kind: 'feature',
    position: [27, 3, -66],
    description:
      'A packed floor outside the gate for treading and winnowing grain — a fixture of settlement edges in the period. Placement here is typical rather than evidenced.',
    claimIds: ['claim-agriculture'],
  },
  {
    id: 'ent-well',
    title: 'Well (illustrative)',
    kind: 'feature',
    position: [14, 3.5, -60],
    description:
      'Assured water was the precondition of Negev-frontier settlement. The well head is illustrative; candidate sites relied on wells and cisterns.',
    claimIds: ['claim-well'],
  },
];
