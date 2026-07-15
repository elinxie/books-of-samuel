import type { SceneEntityDef } from '../types';
import { PYRE_POS, TAMARISK_POS, VILLAGE_CENTER, VILLAGE_EDGE_POS } from './layout';

/**
 * Label set for Jabesh-gilead: the disputed identification (composite
 * disclosure), the terrain/setting, the village form, the wadi path the
 * column arrives along, the pyre ground, and the tamarisk — the scene's
 * landmark and final resting point. No named individuals are labeled; the
 * retrieval column and the townspeople are labeled as groups only, per the
 * brief's "leadership reads by staging only."
 */
export const JABESH_BURIAL_ENTITIES: SceneEntityDef[] = [
  {
    id: 'ent-jabesh-gilead',
    title: 'Jabesh-gilead',
    kind: 'settlement',
    position: [VILLAGE_CENTER[0], 6, VILLAGE_CENTER[1]],
    description:
      'The town whose men rescued by Saul’s first act as king (1 Samuel 11) later walked all night to reclaim his body. Its precise site is genuinely disputed between two candidate tells; this scene renders a disclosed composite of the lower Wadi Yabis setting rather than either candidate’s actual plan.',
    claimIds: ['claim-jabesh-location', 'claim-chronology'],
  },
  {
    id: 'ent-wadi-yabis',
    title: 'The Wadi Yabis corridor',
    kind: 'feature',
    position: [-230, 8, -15],
    description:
      'A perennial stream line in Gilead hill country, the topographic common denominator of both candidate identifications — narrower and greener than the Negev/Besor wadi forms seen earlier in the project.',
    claimIds: ['claim-gilead-terrain'],
  },
  {
    id: 'ent-village-cluster',
    title: 'The village terrace',
    kind: 'settlement',
    position: [VILLAGE_CENTER[0] + 10, 8, VILLAGE_CENTER[1] + 8],
    description:
      'A small, open, unwalled cluster of mudbrick houses on the hill terrace — a hamlet-scale placeholder representative of a small Gilead town, disclosed rather than reproducing either candidate site’s excavated plan (no plan-level evidence exists for a site we cannot even securely locate).',
    claimIds: ['claim-jabesh-town-form'],
  },
  {
    id: 'ent-wadi-path',
    title: 'The wadi path',
    kind: 'route',
    position: [-230, 6, -10],
    description:
      'The route the retrieval column climbs by night from the Jordan valley — the direction of Beth-shan. The narrative gives no distance or duration for the round trip, and none is asserted on screen; the crossing of the Jordan itself happens off-scene.',
    claimIds: ['claim-night-march', 'claim-jabesh-retrieval'],
  },
  {
    id: 'ent-pyre-ground',
    title: 'The pyre ground',
    kind: 'feature',
    position: [PYRE_POS[0], 8, PYRE_POS[1]],
    description:
      'Just outside the village. "They came to Jabesh and burned them there" (1 Samuel 31:12b) — cremation is exceptional against normal Israelite burial practice; 1 Chronicles 10:12 omits it, and the reason has long been debated (honorable treatment of mutilated, days-exposed bodies; prevention of further desecration; a possible textual variant). The scene states the anomaly plainly and depicts it at documentary distance: the wrapped forms are fully covered by timber before any flame renders, in every mode.',
    claimIds: ['claim-burning-bodies'],
  },
  {
    id: 'ent-tamarisk',
    title: 'The tamarisk',
    kind: 'feature',
    position: [TAMARISK_POS[0], 9, TAMARISK_POS[1]],
    description:
      'A single mature tree — the scene’s landmark and the bones’ final resting place (1 Samuel 31:13a), echoing the tamarisk Saul sat beneath at Gibeah (1 Samuel 22:6). The parallel account in 1 Chronicles 10:12 names "the oak" (or terebinth) instead — a genuine textual variant carried here as a label note, not resolved by picking one tree species over the other.',
    claimIds: ['claim-tamarisk-burial'],
  },
  {
    id: 'ent-retrieval-column',
    title: 'The men of Jabesh',
    kind: 'group',
    position: [VILLAGE_EDGE_POS[0], 4, VILLAGE_EDGE_POS[1]],
    description:
      '"All the valiant men" (1 Samuel 31:12) — unnamed in the text. No elder or leader is invented; any sense of who leads comes from staging (a slight lead position in the column) rather than a distinguished, named figure.',
    claimIds: ['claim-jabesh-retrieval', 'claim-dress'],
  },
];
