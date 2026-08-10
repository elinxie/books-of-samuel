import type { SceneEntityDef } from '../types';
import {
  ARABAH_ROAD_CURVE,
  ATTENDANT_CENTER,
  DAVID_PLAZA_POS,
  POOL_CENTER,
  PRESENTATION_POS,
  TOMB_CENTER,
  TOWN_AMBIENT_SLOTS,
  TOWN_CENTER,
} from './layout';

const ARABAH_ROAD_MID = ARABAH_ROAD_CURVE.getPointAt(0.4);

/**
 * Label set for hebron-reckoning: the town continuity anchor, David's
 * receiving ground, the Arabah road, the pool of Hebron, the tomb ground
 * (shared with hebron-gate), and the staged cast. Deliberately no label for
 * Ish-bosheth, Mephibosheth, or any Mahanaim geometry — none of which is
 * staged here (brief's hard scope guard: the murder is cards-only, and
 * neither man is ever rendered as a figure in this project).
 */
export const HEBRON_RECKONING_ENTITIES: SceneEntityDef[] = [
  {
    id: 'ent-hebron-town-reckoning',
    title: 'Hebron (Tell Rumeida)',
    kind: 'settlement',
    position: [TOWN_CENTER[0], 12, TOWN_CENTER[1]],
    description:
      'The same highland hill town seen in hebron-anointing, hebron-covenant, and hebron-gate — days after Abner’s burial, the house of Saul’s own end plays out on the same ground. Same disclosed placeholder massing; no new claim about the town’s form is made here.',
    claimIds: ['claim-hebron-identification', 'claim-hebron-town-form'],
  },
  {
    id: 'ent-receiving-ground',
    title: 'David’s receiving ground',
    kind: 'feature',
    position: [DAVID_PLAZA_POS[0], 4, DAVID_PLAZA_POS[1]],
    description:
      'The same household-presence ground the observer has already seen David occupy at the anointing, the covenant feast, and the gate. Here Rechab and Baanah present their claim, and here David answers them — the scene’s gravitational center, per the brief’s "petitioners before David" sightline (no trophy framing).',
    claimIds: ['claim-ish-bosheth-assassination', 'claim-david-judgment'],
  },
  {
    id: 'ent-arabah-road',
    title: 'The road from the Arabah',
    kind: 'route',
    position: [ARABAH_ROAD_MID.x, 3, ARABAH_ROAD_MID.z],
    description:
      'Rechab and Baanah "went by way of the Arabah all night" (4:7b) after the murder at Ish-bosheth’s house — narrated only, never staged; this route begins already well inside the composition, at first light, carrying the covered bundle low. A disclosed staging choice, not a claim about Hebron’s real bearing to Mahanaim.',
    claimIds: ['claim-ish-bosheth-assassination'],
  },
  {
    id: 'ent-hebron-pool-reckoning',
    title: 'The pool of Hebron',
    kind: 'feature',
    position: [POOL_CENTER[0], 3, POOL_CENTER[1]],
    description:
      '"They hanged them beside the pool of Hebron" (4:12a) — a landmark the text names but whose physical form and location do not survive in any usable way. Rendered as a modest, disclosed-placeholder basin (the same conventions as gibeon-pool), explicitly not the much-later Birket es-Sultan pool/site in modern Hebron. The pool itself renders; the display beside it does not — an absolute ADR-009 bar, carried by caption text only.',
    claimIds: ['claim-hebron-pool-feature', 'claim-david-judgment'],
  },
  {
    id: 'ent-tomb-ground-reckoning',
    title: 'The tomb of Abner',
    kind: 'structure',
    position: [TOMB_CENTER[0], 6, TOMB_CENTER[1]],
    description:
      'The same tomb hebron-gate built, days on — "they buried the head of Ish-bosheth in the tomb of Abner at Hebron" (4:12b). The compositional echo (two burials, same ground, days apart) is the milestone’s closing image; the head itself renders only as a small covered bundle, never as anatomy.',
    claimIds: ['claim-abner-tomb-form', 'claim-david-judgment'],
  },
  {
    id: 'ent-david-reckoning',
    title: 'David',
    kind: 'person',
    position: [DAVID_PLAZA_POS[0], 3, DAVID_PLAZA_POS[1]],
    description:
      'Receives Rechab and Baanah’s claim, then answers by retelling his own execution of the man who claimed Saul’s death at Ziklag (4:9-10, this scene’s deliberate textual twin with ziklag-lament) — and pronounces the two "wicked men" who killed "a righteous man in his own house on his bed." Commands their execution, the hands-and-feet display (caption-only, never rendered), and the head’s burial in Abner’s tomb.',
    claimIds: ['claim-david-historical', 'claim-david-judgment'],
  },
  {
    id: 'ent-rechab',
    title: 'Rechab son of Rimmon',
    kind: 'person',
    position: [PRESENTATION_POS[0] - 1.2, 3, PRESENTATION_POS[1]],
    description:
      'A captain of one of Ish-bosheth’s raiding bands, a Beerothite of the people of Benjamin (4:2-3). With his brother Baanah, kills Ish-bosheth in his own house at noon rest and carries his head to David at Hebron, expecting reward. The narrative’s own judgment on them is David’s spoken verdict, carried as text; this project does not villain-cartoon them beyond what the text states.',
    claimIds: ['claim-ish-bosheth-assassination', 'claim-david-judgment'],
  },
  {
    id: 'ent-baanah',
    title: 'Baanah son of Rimmon',
    kind: 'person',
    position: [PRESENTATION_POS[0] + 1.2, 3, PRESENTATION_POS[1]],
    description:
      'Rechab’s brother, named alongside him throughout (4:2-3, 5-9, 12) — the two act as a pair in every verse that mentions them, and this scene stages them that way.',
    claimIds: ['claim-ish-bosheth-assassination', 'claim-david-judgment'],
  },
  {
    id: 'ent-attendants',
    title: 'David’s attendants',
    kind: 'group',
    position: [ATTENDANT_CENTER[0], 3, ATTENDANT_CENTER[1]],
    description:
      '"The young men" David commands to kill Rechab and Baanah (4:12a) — David commands, attendants act. A disclosed small design count (8-14 at high tier, claim-reckoning-cast-scale), not a headcount the text gives; no separate execution gesture is modeled for them (see claim-david-judgment’s notes on the ADR-009 no-invented-method constraint).',
    claimIds: ['claim-reckoning-cast-scale'],
  },
  {
    id: 'ent-town-ambient-reckoning',
    title: 'Hebron on an ordinary day',
    kind: 'group',
    position: [TOWN_AMBIENT_SLOTS[0][0], 3, TOWN_AMBIENT_SLOTS[0][1]],
    description:
      'A working town going about its business — this is the smallest cast of any M5 scene (claim-reckoning-cast-scale), a judgment scene rather than a crowd event, the same small-cast register as ziklag-lament, its structural twin.',
    claimIds: ['claim-reckoning-cast-scale', 'claim-hebron-town-form'],
  },
];
