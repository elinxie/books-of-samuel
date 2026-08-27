import type { SceneEntityDef } from '../types';
import {
  ABINADAB_HOUSE_POS,
  KIRIATH_JEARIM_CENTER,
  OBED_EDOM_POS,
  THRESHING_FLOOR_POS,
} from './layout';

/**
 * Label set for perez-uzzah: Kiriath-jearim and the house on the hill, the
 * ark itself, the procession, the threshing floor of Nacon/Perez-uzzah
 * (staged, unlocated), and Obed-edom's house (staged, unlocated) — no label
 * for the divine strike itself anywhere (the `b-strike` beat's caption
 * carries the text's stated claim; no entity stands in for it, the same
 * discipline `rephaim-valley`'s entities.ts used for 5:24's sign).
 */
export const PEREZ_UZZAH_ENTITIES: SceneEntityDef[] = [
  {
    id: 'ent-kiriath-jearim',
    title: 'Kiriath-jearim (Baale-judah)',
    kind: 'settlement',
    position: [KIRIATH_JEARIM_CENTER[0], 14, KIRIATH_JEARIM_CENTER[1]],
    description:
      'The hill town where the ark has rested since its return from Philistine territory (1 Samuel 7:1-2, outside this project’s built timeline). Identified with Deir el-Azhar/Tell el-Azhar, in the vicinity of modern Abu Ghosh — a reasonably secure identification, though the project currently has no dedicated source card for this specific site (a researcher gap, see claim-kiriath-jearim-form).',
    claimIds: ['claim-kiriath-jearim-form', 'claim-ark-procession-departure'],
  },
  {
    id: 'ent-abinadab-house',
    title: 'The house of Abinadab, on the hill',
    kind: 'structure',
    position: [ABINADAB_HOUSE_POS[0], 6, ABINADAB_HOUSE_POS[1]],
    description:
      'Where the ark has rested and where the new cart is loaded (2 Samuel 6:3-4). Abinadab himself is named as the house’s owner; no action is attributed to him beyond this, and no character record exists for him (his sons Uzzah and Ahio drive the cart).',
    claimIds: ['claim-kiriath-jearim-form', 'claim-ark-procession-departure'],
  },
  {
    id: 'ent-ark',
    title: 'The ark of the covenant',
    kind: 'structure',
    position: [ABINADAB_HOUSE_POS[0] + 3, 6.5, ABINADAB_HOUSE_POS[1] + 1],
    description:
      'A plain, rectangular gold-toned chest with visible carrying poles — the project’s first staging of the ark as a physical object. 2 Samuel 6 gives no construction detail of its own; the form here is a cross-book citation to Exodus 25:10-22, not corroborated by any excavated comparandum. No cherubim geometry renders, in any mode: the text names them but gives no visual detail beyond the word itself, and rendering a specific ancient Near Eastern composite-creature iconography here would invent an artistic program no evidence attests for this object.',
    claimIds: ['claim-ark-physical-form'],
  },
  {
    id: 'ent-procession',
    title: 'The procession',
    kind: 'group',
    position: [-40, 4, -12],
    description:
      'A disclosed representative gathering (claim-ark-procession-cast-scale) standing for "all the chosen men of Israel, thirty thousand" (6:1) — not a literal muster and not a fixed ratio of that number, the same departure claim-judah-assembly-scale already established. Genuinely joyful before the threshing floor: songs, lyres, harps, tambourines, castanets, and cymbals (6:5), rendered as generic disclosed-placeholder instrument forms (claim-music-instruments).',
    claimIds: [
      'claim-ark-procession-cast-scale',
      'claim-ark-procession-departure',
      'claim-music-instruments',
      'claim-dress',
    ],
  },
  {
    id: 'ent-threshing-floor',
    title: 'The threshing floor of Nacon (staged position)',
    kind: 'feature',
    position: [THRESHING_FLOOR_POS[0], 4, THRESHING_FLOOR_POS[1]],
    description:
      'Where the oxen stumbled and Uzzah died (2 Samuel 6:6-7), afterward named Perez-uzzah (6:8), "to this day." The site is unlocated beyond "on the way" from Kiriath-jearim — this position is an openly disclosed placeholder within this scene’s own terrain, not a claimed identification. There is no LocationEntry or atlas pin for this place, the same Baal-perazim precedent rephaim-valley established.',
    claimIds: ['claim-uzzah-death', 'claim-uzzah-death-depiction'],
  },
  {
    id: 'ent-obed-edom-house',
    title: 'The house of Obed-edom the Gittite (staged position)',
    kind: 'structure',
    position: [OBED_EDOM_POS[0], 5, OBED_EDOM_POS[1]],
    description:
      'Where the ark is diverted after Uzzah’s death (2 Samuel 6:10-11) — David, unwilling to bring it to himself in the city of David, turns it aside here instead. The site is unlocated; this position is a disclosed placeholder within this scene’s own terrain, not a claimed identification. No LocationEntry or atlas pin exists for this place.',
    claimIds: ['claim-david-fear-diversion', 'claim-obed-edom-blessing'],
  },
];
