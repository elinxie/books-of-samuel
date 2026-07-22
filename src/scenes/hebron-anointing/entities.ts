import type { SceneEntityDef } from '../types';
import {
  ASSEMBLY_SLOTS,
  DAVID_PLAZA_POS,
  ELDER_PLAZA_POS,
  GATE_PLAZA_CENTER,
  HOUSEHOLD_CAMP_CENTERS,
  MESSENGER_EXIT_POS,
  RETINUE_SLOTS,
  TOWN_CENTER,
} from './layout';
import { INQUIRY_POS } from './poses';

/**
 * Label set for hebron-anointing: the town/terrace setting, the three
 * distinct crowds (David's men, the households, the Judah assembly — never
 * conflated, per the brief), the principal figures, and the two narrated
 * beats bracketing the anointing (the inquiry, the Jabesh commendation).
 * No individual elder, wife, or messenger is named beyond the text's own
 * named figures (David, Abiathar) — the assembly and the messengers are
 * labeled as groups only.
 */
export const HEBRON_ANOINTING_ENTITIES: SceneEntityDef[] = [
  {
    id: 'ent-hebron-town',
    title: 'Hebron (Tell Rumeida)',
    kind: 'settlement',
    position: [TOWN_CENTER[0], 12, TOWN_CENTER[1]],
    description:
      'David’s first stop as a local king: a modest highland hill town, not a royal capital. Identified with Tell Rumeida, above the modern city — one of the more securely located Old Testament highland sites, though no dedicated excavation-results source covers its early Iron IIA town form, so the settlement shown here is a disclosed generic placeholder, not a reproduction of any excavated plan.',
    claimIds: ['claim-hebron-identification', 'claim-hebron-town-form', 'claim-chronology'],
  },
  {
    id: 'ent-terraces',
    title: 'Terraced hillside',
    kind: 'feature',
    position: [TOWN_CENTER[0] + 40, 6, TOWN_CENTER[1] + 30],
    description:
      'Dry-stone agricultural terracing on the slopes around Hebron — the Judean highland’s signature form, rockier and more intensively terraced than the Gilead hill-flank seen at Jabesh-gilead. A generic, disclosed placeholder; no specific surveyed terrace system is depicted.',
    claimIds: ['claim-hebron-town-form'],
  },
  {
    id: 'ent-gate-plaza',
    title: 'The gate plaza',
    kind: 'feature',
    position: [GATE_PLAZA_CENTER[0], 4, GATE_PLAZA_CENTER[1]],
    description:
      'The open ground outside the town where the assembly gathers and the anointing itself is staged (2 Samuel 2:4) — this scene’s ceremonial center, its equivalent of Ziklag’s open center or Beth-shan’s gate plaza.',
    claimIds: ['claim-judah-anointing', 'claim-anointing-rite-form'],
  },
  {
    id: 'ent-household-camp',
    title: 'The household camp',
    kind: 'settlement',
    position: [HOUSEHOLD_CAMP_CENTERS[0][0], 3, HOUSEHOLD_CAMP_CENTERS[0][1]],
    description:
      '"He brought up his men who were with him, everyone with his household, and they lived in the towns of Hebron" (2 Samuel 2:3) — staged as a dispersed satellite camp rather than a single walled interior. The roughly 40-50 figures shown are a disclosed design choice, not a headcount the text gives.',
    claimIds: ['claim-david-move-hebron'],
  },
  {
    id: 'ent-approach-column',
    title: 'David’s six hundred',
    kind: 'group',
    position: [RETINUE_SLOTS[0][0], 3, RETINUE_SLOTS[0][1]],
    description:
      'The same core following the observer has tracked since Ziklag and the Besor pursuit, rendered at the project’s standard ~1:10 narrated ratio. Kept visually distinct from the household camp and from the Judah assembly below — a political founding growing out of a following, not a conquest; David’s men are received here, not occupying the town as an army.',
    claimIds: ['claim-600-men', 'claim-dress'],
  },
  {
    id: 'ent-judah-assembly',
    title: 'The men of Judah (representative assembly)',
    kind: 'group',
    position: [ASSEMBLY_SLOTS[0][0], 3, ASSEMBLY_SLOTS[0][1]],
    description:
      '"The men of Judah came and anointed David king over the house of Judah" (2 Samuel 2:4) — Hebron’s own townspeople and elders, the actors performing the anointing. No number or gathering mechanism is narrated; the ~150-200 figures shown are an explicitly labeled representative civic assembly, not a census or a literal tribal muster (a literal rendering would be several thousand at minimum on the project’s own cited regional population figures).',
    claimIds: ['claim-judah-anointing', 'claim-judah-assembly-scale', 'claim-dress'],
  },
  {
    id: 'ent-david',
    title: 'David',
    kind: 'person',
    position: [DAVID_PLAZA_POS[0], 3, DAVID_PLAZA_POS[1]],
    description:
      'Inquires of the LORD, moves his men and their households to Hebron, and is anointed king — over the house of Judah only, not Israel. The wider anointing "king over all Israel" is still three chapters and several years away (2 Samuel 5:3), not asserted as having happened here. Saul’s house still holds the rest of the former kingdom, as the next scene (Mahanaim, the pool of Gibeon) shows.',
    claimIds: ['claim-david-historical', 'claim-david-move-hebron', 'claim-judah-anointing'],
  },
  {
    id: 'ent-inquiry',
    title: 'The inquiry',
    kind: 'feature',
    position: [INQUIRY_POS[0], 3, INQUIRY_POS[1]],
    description:
      '"After this David inquired of the LORD" (2 Samuel 2:1). The text does not fix where this happens; the mechanism (the ephod, carried by Abiathar) is inferred from the identical practice already shown at 1 Samuel 30:7-8, not restated here.',
    claimIds: ['claim-hebron-inquiry'],
  },
  {
    id: 'ent-elder',
    title: 'The elder (unnamed)',
    kind: 'person',
    position: [ELDER_PLAZA_POS[0], 3, ELDER_PLAZA_POS[1]],
    description:
      'No individual elder is named in the text. The pour gesture staged here is a design-placeholder choreography for 2:4’s bare statement that Judah "anointed David king" — the verse narrates the fact of anointing, not who poured, what vessel was used, or what the assembled elders did.',
    claimIds: ['claim-anointing-rite-form', 'claim-judah-anointing'],
  },
  {
    id: 'ent-jabesh-message',
    title: 'The message to Jabesh-gilead',
    kind: 'route',
    position: [MESSENGER_EXIT_POS[0], 4, MESSENGER_EXIT_POS[1]],
    description:
      'David sends messengers commending the men of Jabesh-gilead for burying Saul, and telling them of his own new, partial kingship (2 Samuel 2:5-7) — closing a loop the observer saw half of at jabesh-burial. Staged as a dispatch only: the messengers walk this road east until they are out of frame; the burial itself is not re-rendered here.',
    claimIds: ['claim-jabesh-commendation'],
  },
];
