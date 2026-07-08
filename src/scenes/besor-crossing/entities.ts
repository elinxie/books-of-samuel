import type { SceneEntityDef } from '../types';
import {
  DONKEY_SLOTS,
  EGYPTIAN_POS,
  FORD_POS,
  LAAGER_CENTER,
  REUNION_POS,
  SOUTH_FIELD_CENTER,
} from './layout';

export const BESOR_CROSSING_ENTITIES: SceneEntityDef[] = [
  {
    id: 'ent-besor-wadi',
    title: 'The brook Besor',
    kind: 'feature',
    position: [FORD_POS[0], 4, FORD_POS[1] - 30],
    description:
      'A broad braided wadi bed — dry gravel and sand braid channels with a few standing pools — cut into rolling loess country. The largest wadi system of the western Negev; three days off a forced march, it is where exhaustion becomes arithmetic.',
    claimIds: ['claim-besor', 'claim-besor-channel-form'],
  },
  {
    id: 'ent-ford',
    title: 'The ford',
    kind: 'feature',
    position: [FORD_POS[0], 3, FORD_POS[1]],
    description:
      'Where the pursuit route crosses the wadi. The exact crossing point is not fixed by the text; its position here is illustrative.',
    claimIds: ['claim-besor-channel-form'],
  },
  {
    id: 'ent-two-hundred',
    title: 'The two hundred (rendered ~1:10)',
    kind: 'group',
    position: [LAAGER_CENTER[0] - 14, 4, LAAGER_CENTER[1] - 10],
    description:
      'Unable to go farther, they remain with the baggage on the near bank — spent, not unwilling. The narrative’s own resolution (vv. 21–25) turns on this distinction.',
    claimIds: ['claim-two-hundred-stay', 'claim-600-men'],
  },
  {
    id: 'ent-four-hundred',
    title: 'The four hundred (rendered ~1:10)',
    kind: 'group',
    position: [SOUTH_FIELD_CENTER[0] - 10, 4, SOUTH_FIELD_CENTER[1] - 15],
    description:
      'David and the four hundred who could still cross ford the wadi and press on south, on the trail of the raiders.',
    claimIds: ['claim-600-men'],
  },
  {
    id: 'ent-baggage-laager',
    title: 'Baggage laager (illustrative)',
    kind: 'structure',
    position: [LAAGER_CENTER[0] + 12, 3.5, LAAGER_CENTER[1] + 12],
    description:
      'Packs and pack donkeys gathered on the north bank. Wheeled transport is unevidenced for this narrative and terrain; donkeys are the Hebrew Bible’s default pack animal for a mobile force.',
    claimIds: ['claim-pack-donkeys'],
  },
  {
    id: 'ent-david',
    title: 'David (narrative figure)',
    kind: 'person',
    position: [EGYPTIAN_POS[0] - 8, 3, EGYPTIAN_POS[1] - 10],
    description:
      'Leads the four hundred across, is present for the Egyptian’s revival and oath, and later rules on the spoil. A principal-detail procedural rig continues his Ziklag marker; still label-based, not a portrait.',
    claimIds: ['claim-david-historical', 'claim-dress'],
  },
  {
    id: 'ent-abiathar',
    title: 'Abiathar the priest',
    kind: 'person',
    position: [EGYPTIAN_POS[0] - 14, 3, EGYPTIAN_POS[1] - 14],
    description:
      'The priest who brought the ephod at Ziklag continues with the column here, rendered at the same principal detail as David.',
    claimIds: ['claim-dress'],
  },
  {
    id: 'ent-egyptian',
    title: 'The Egyptian servant',
    kind: 'person',
    position: [EGYPTIAN_POS[0], 3, EGYPTIAN_POS[1]],
    description:
      'Found abandoned in the open country, sick and left behind by his Amalekite master three days earlier — property discarded when he stopped being useful. Revived with bread, water, a cake of figs, and raisins, he negotiates an oath before agreeing to guide the pursuit.',
    claimIds: ['claim-egyptian-servant', 'claim-dress'],
  },
  {
    id: 'ent-spoil-ruling',
    title: 'Share and share alike',
    kind: 'feature',
    position: [REUNION_POS[0], 3.5, REUNION_POS[1]],
    description:
      'Days later, back at this same ford, some would deny the two hundred any share of the recovered spoil. David rules that all share alike — a decision the narrative marks as a lasting statute in Israel.',
    claimIds: ['claim-spoil-statute'],
  },
  {
    id: 'ent-donkeys',
    title: 'Pack donkeys (illustrative)',
    kind: 'feature',
    position: [DONKEY_SLOTS[0][0], 3, DONKEY_SLOTS[0][1]],
    description:
      'Baggage animals at the laager. Placeholder low-poly forms; see claim-pack-donkeys.',
    claimIds: ['claim-pack-donkeys'],
  },
  {
    id: 'ent-route-north',
    title: 'North: back toward Ziklag',
    kind: 'route',
    position: [FORD_POS[0] + 6, 4, FORD_POS[1] - 100],
    description: 'The road the pursuit came in by, three days off a forced march from Aphek.',
    claimIds: ['claim-besor'],
  },
  {
    id: 'ent-route-south',
    title: 'South: toward the raiders',
    kind: 'route',
    position: [SOUTH_FIELD_CENTER[0] + 15, 4, SOUTH_FIELD_CENTER[1] + 90],
    description:
      'The route the Egyptian guides the four hundred along, toward the Amalekite camp (see the next scene).',
    claimIds: ['claim-besor'],
  },
];
