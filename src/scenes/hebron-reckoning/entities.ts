import type { SceneEntityDef } from '../types';
import { TOWN_CENTER } from '../hebron-anointing/layout';
import { TOMB_POS } from '../hebron-gate/layout';
import {
  ARRIVAL_ROAD_START,
  BAANAH_EXECUTION_POS,
  DAVID_RECEIVING_POS,
  POOL_CENTER,
  PRESENTATION_POS,
  RECHAB_EXECUTION_POS,
} from './layout';

/**
 * Label set for hebron-reckoning: the reused town setting, the new arrival
 * road and pool of Hebron, the tomb (reused exactly from hebron-gate), the
 * two crowds (attendants, ambient town — the `claim-reckoning-cast-scale`
 * pair), and the principals (David, Rechab, Baanah). Ish-bosheth and
 * Mephibosheth are referenced-only characters (`src/data/characters.ts`)
 * with no entity here — neither appears as geometry in this scene, matching
 * the Michal/Paltiel/Rizpah precedent from hebron-covenant.
 */
export const HEBRON_RECKONING_ENTITIES: SceneEntityDef[] = [
  {
    id: 'ent-hebron-town-reckoning',
    title: 'Hebron (Tell Rumeida), the same ground a third time',
    kind: 'settlement',
    position: [TOWN_CENTER[0], 12, TOWN_CENTER[1]],
    description:
      'The same modest highland hill town seen at David’s anointing, the covenant feast, and the killing at the gate — unchanged in form. The house of Saul’s last king is judged and buried here, at the place that is already, three times over, where David’s own conduct toward that house has been tested.',
    claimIds: ['claim-hebron-identification', 'claim-hebron-town-form'],
  },
  {
    id: 'ent-receiving-ground',
    title: 'The receiving ground',
    kind: 'feature',
    position: [DAVID_RECEIVING_POS[0], 3, DAVID_RECEIVING_POS[1]],
    description:
      'A courtyard/plaza space near the same gate-plaza continuity anchor the covenant feast and the killing scenes use — where Rechab and Baanah present their claim, and where David delivers his verdict.',
    claimIds: ['claim-hebron-town-form', 'claim-david-judgment'],
  },
  {
    id: 'ent-arrival-road-reckoning',
    title: 'The road from the Arabah',
    kind: 'route',
    position: [ARRIVAL_ROAD_START.x, 4, ARRIVAL_ROAD_START.z + 60],
    description:
      'Rechab and Baanah’s approach, after their narrated night march “all the way through the Arabah” (4:7b) — carrying the covered bundle low, arriving as the light comes up. The morning-arrival hour is a disclosed design inference from the overnight march, not an asserted text detail; the exact course of the road is likewise a disclosed placeholder.',
    claimIds: ['claim-ish-bosheth-assassination'],
  },
  {
    id: 'ent-hebron-pool',
    title: 'The pool of Hebron',
    kind: 'feature',
    position: [POOL_CENTER[0], 3, POOL_CENTER[1]],
    description:
      'Named at 4:12 as an existing landmark — a modest, shallow rock-cut basin, disclosed `design-placeholder` form and placement, modeled on the pool of Gibeon’s own basin/no-water-shader convention. Not the extant “Birket es-Sultan” pool shown to visitors in modern Hebron, which is a much later installation and is deliberately not adopted here. Rechab and Baanah are executed at documentary distance near this ground; the hands-and-feet display the text states was hung here renders as caption text only, in every mode — no geometry stands in for it, per ADR-009’s absolute dismemberment bar.',
    claimIds: ['claim-hebron-pool-feature', 'claim-david-judgment'],
  },
  {
    id: 'ent-execution-ground',
    title: 'Where Rechab and Baanah were struck down',
    kind: 'feature',
    position: [
      (RECHAB_EXECUTION_POS[0] + BAANAH_EXECUTION_POS[0]) / 2,
      3,
      (RECHAB_EXECUTION_POS[1] + BAANAH_EXECUTION_POS[1]) / 2,
    ],
    description:
      'At David’s command, “the young men” kill Rechab and Baanah (4:12a) — the third application of ADR-009’s named-killing template, and the first as a judicial act rather than a personal one. The text gives no method or gesture, so none is invented: the strike is shown at documentary distance as a body-orientation collapse only, identical in kind to Abner’s at the Hebron gate, with no wound, blood, or weapon geometry in either violence mode.',
    claimIds: ['claim-david-judgment'],
  },
  {
    id: 'ent-tomb-reckoning',
    title: 'Abner’s tomb at Hebron, days apart',
    kind: 'feature',
    position: [TOMB_POS[0], 3, TOMB_POS[1]],
    description:
      'The same rock-cut entry hebron-gate builds, reused at the identical coordinates and form — the milestone’s deliberate closing image: two burials at the same ground, days apart. Ish-bosheth’s head, still only a covered bundle, is buried here (4:12b); the text does not state David’s own presence at this burial, unlike Abner’s (3:31–32), so none is staged here.',
    claimIds: ['claim-abner-tomb-form', 'claim-david-judgment'],
  },
  {
    id: 'ent-head-bundle',
    title: 'The covered bundle',
    kind: 'feature',
    position: [PRESENTATION_POS[0], 3, PRESENTATION_POS[1]],
    description:
      '“The head of Ish-bosheth” (4:8), rendered only as a small wrapped, anatomically unresolved bundle — the `buildWrappedFormGeometry` treatment already used for the Jabesh bone bundle, at its smallest scale yet. Carried low throughout, never brandished or framed as a trophy; identifiable by caption alone, never by geometry, at both the presentation and the burial.',
    claimIds: ['claim-david-judgment', 'claim-ish-bosheth-assassination'],
  },
  {
    id: 'ent-attendants',
    title: 'David’s attendants',
    kind: 'group',
    position: [DAVID_RECEIVING_POS[0] + 6, 3, DAVID_RECEIVING_POS[1] - 4],
    description:
      '“The young men” 4:12a attributes the execution to — a disclosed design count, ≈8–14 figures at high quality tier, present near the receiving ground throughout. David commands; attendants act, exactly as the text’s own division of agency states.',
    claimIds: ['claim-reckoning-cast-scale', 'claim-dress'],
  },
  {
    id: 'ent-ambient-town-reckoning',
    title: 'The town, on an ordinary morning',
    kind: 'group',
    position: [TOWN_CENTER[0] + 28, 3, TOWN_CENTER[1] + 18],
    description:
      'A working highland town continuing an ordinary morning around the judgment — a disclosed design count, ≈10–20 figures at high quality tier, static throughout, deliberately the smallest ambient-town treatment of the three M5 scenes.',
    claimIds: ['claim-reckoning-cast-scale', 'claim-hebron-town-form'],
  },
  {
    id: 'ent-david-reckoning',
    title: 'David',
    kind: 'person',
    position: [DAVID_RECEIVING_POS[0], 3, DAVID_RECEIVING_POS[1]],
    description:
      'Receives Rechab and Baanah’s claim and answers by recalling his own execution of the messenger who once claimed to have killed Saul at Ziklag (4:10; see `claim-execution-messenger`, ziklag-lament) — the text’s own cross-reference, not this project’s invention. Pronounces them wicked men who killed “a righteous man in his own house on his bed” and has them executed. Whether this insistence on David’s own innocence across every death that clears his path is accurate report or apologetic shaping is the same dispute already carried on hebron-gate’s `claim-public-response`; it is not restated here.',
    claimIds: ['claim-david-historical', 'claim-david-judgment'],
  },
  {
    id: 'ent-rechab',
    title: 'Rechab son of Rimmon',
    kind: 'person',
    position: [RECHAB_EXECUTION_POS[0], 3, RECHAB_EXECUTION_POS[1]],
    description:
      'One of Ish-bosheth’s own captains, a Beerothite. With his brother Baanah, kills Ish-bosheth in his own house at noon rest and carries his head to Hebron expecting reward. Executed at David’s command for the killing itself, not for any doubt about whether it happened.',
    claimIds: ['claim-ish-bosheth-assassination', 'claim-david-judgment'],
  },
  {
    id: 'ent-baanah',
    title: 'Baanah son of Rimmon',
    kind: 'person',
    position: [BAANAH_EXECUTION_POS[0], 3, BAANAH_EXECUTION_POS[1]],
    description:
      'Rechab’s brother, named alongside him at every stage the text mentions either — the assassination, the flight, the presentation, and the execution (2 Samuel 4:1–12). Staged identically to Rechab throughout; the text never distinguishes their individual roles.',
    claimIds: ['claim-ish-bosheth-assassination', 'claim-david-judgment'],
  },
];
