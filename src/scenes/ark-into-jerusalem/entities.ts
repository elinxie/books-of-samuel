import type { SceneEntityDef } from '../types';
import {
  CONFRONTATION_POS,
  CONSTRUCTION_GROUND_CENTER,
  DISTRIBUTION_CENTER,
  HOUSEHOLD_POS,
  OFFERING_GROUND_POS,
  STRONGHOLD_CENTER,
  TENT_POS,
  WINDOW_POS,
} from './layout';

/**
 * Label set for ark-into-jerusalem: the reused enclosure and Hiram building
 * (cross-referenced, not restated), the new tent and offering ground, the
 * ark itself (settled), the reused-and-repositioned procession, the
 * distribution ground, and Michal's window/household room — no label
 * anywhere for the accusation itself (spoken/caption only, the
 * jerusalem-stronghold blind-and-lame discipline).
 */
export const ARK_INTO_JERUSALEM_ENTITIES: SceneEntityDef[] = [
  {
    id: 'ent-stronghold-enclosure',
    title: 'The stronghold enclosure (reused)',
    kind: 'structure',
    position: [STRONGHOLD_CENTER[0], 8, STRONGHOLD_CENTER[1]],
    description:
      'The same modest stone circuit jerusalem-stronghold built (claim-jebusite-stronghold-form), unchanged — the city of David, now the setting for a festival rather than a construction site. See that scene for the fortification-extent dispute this render deliberately sits at the conservative end of.',
    claimIds: ['claim-jebusite-stronghold-form', 'claim-city-of-david-naming'],
  },
  {
    id: 'ent-hiram-house',
    title: "Hiram's craftsmen's house (reused, unchanged)",
    kind: 'structure',
    position: [CONSTRUCTION_GROUND_CENTER[0], 4, CONSTRUCTION_GROUND_CENTER[1]],
    description:
      'The house Hiram’s craftsmen were building in jerusalem-stronghold (5:11-12), reused here in exactly the same under-construction state — the text gives no timeline connecting the two beats, and this scene does not invent one by rendering it more finished.',
    claimIds: ['claim-hiram-building'],
  },
  {
    id: 'ent-ark-tent',
    title: "David's tent for the ark",
    kind: 'structure',
    position: [TENT_POS[0], 3, TENT_POS[1]],
    description:
      'A simple woven/leather tent David pitched for the ark (2 Samuel 6:17) — modest, not monumental, and explicitly not the tabernacle at Gibeon (1 Chronicles 16:39 keeps that structure and its altar at Gibeon at this time; it is never rendered or implied present here). See claim-ark-tent-form.',
    claimIds: ['claim-ark-tent-form', 'claim-ark-tent-offerings'],
  },
  {
    id: 'ent-ark',
    title: 'The ark of the covenant',
    kind: 'structure',
    position: [TENT_POS[0], 3.4, TENT_POS[1]],
    description:
      'The same plain, rectangular gold-toned chest with visible carrying poles perez-uzzah built, reused unchanged (claim-ark-physical-form) — no cherubim geometry, in any mode. Carried up from Obed-edom’s house and set in its place inside the tent (6:17a).',
    claimIds: ['claim-ark-physical-form'],
  },
  {
    id: 'ent-offering-ground',
    title: 'The offering ground',
    kind: 'feature',
    position: [OFFERING_GROUND_POS[0], 2, OFFERING_GROUND_POS[1]],
    description:
      'Where the sacrifices of 6:13 and the burnt/peace offerings of 6:17-19a are conveyed — living animals and ritual activity only; the act of slaughter itself is elided in every mode, no wound, blood, or carcass geometry, extending ADR-009’s restraint principle to this project’s first staged sacrifice. No priest or Levitical office is named at this point in the text; the officiants here are unnamed. See claim-sacrifice-depiction.',
    claimIds: [
      'claim-sacrifice-depiction',
      'claim-ark-arrival-jerusalem',
      'claim-ark-tent-offerings',
    ],
  },
  {
    id: 'ent-procession',
    title: 'The procession (reused, repositioned)',
    kind: 'group',
    position: [STRONGHOLD_CENTER[0] - 2, 4, STRONGHOLD_CENTER[1] - 2],
    description:
      'The same disclosed representative gathering perez-uzzah staged (claim-ark-procession-cast-scale), reused and repositioned for its arrival in Jerusalem rather than doubled into a second crowd — the rephaim-valley precedent for a population that moves between beats. Dances, shouts, and receives the distribution alongside the reused ambient Jerusalem population.',
    claimIds: [
      'claim-ark-procession-cast-scale',
      'claim-ark-arrival-jerusalem',
      'claim-dance-depiction',
    ],
  },
  {
    id: 'ent-distribution-ground',
    title: 'The distribution ground',
    kind: 'feature',
    position: [DISTRIBUTION_CENTER[0], 2, DISTRIBUTION_CENTER[1]],
    description:
      'Where bread, a portion of meat, and a raisin cake reach “the whole multitude of Israel, both men and women” (6:19b) — a genuinely communal beat, not an elite banquet; no hierarchy-first framing. See claim-ark-tent-offerings.',
    claimIds: ['claim-ark-tent-offerings', 'claim-ark-into-jerusalem-cast-scale'],
  },
  {
    id: 'ent-household-window',
    title: "Michal's household room and window",
    kind: 'structure',
    position: [HOUSEHOLD_POS[0], 3, HOUSEHOLD_POS[1]],
    description:
      'A single occupied, functional room within the same partially-built house jerusalem-stronghold established — a partially built house can still have occupied rooms, an ordinary state, not a design compromise. Michal watches from the window (6:16, position: [' +
      `${WINDOW_POS[0]}, ${WINDOW_POS[1]}` +
      ']) and later comes out from here to meet David (6:20b). Never rendered more finished than jerusalem-stronghold’s own under-construction state.',
    claimIds: ['claim-hiram-building', 'claim-michal-confrontation'],
  },
  {
    id: 'ent-confrontation-ground',
    title: 'The confrontation ground',
    kind: 'feature',
    position: [CONFRONTATION_POS[0], 2, CONFRONTATION_POS[1]],
    description:
      'Just outside the household, conversation-scale, modeled on hebron-reckoning’s vp-receiving-ground pattern — two named figures, no crowd staged here. Michal’s rebuke and David’s reply (6:20b-22) are carried entirely by caption and ESV excerpt; no gesture is ever invented for either, and no exposure is ever rendered, in any mode.',
    claimIds: ['claim-michal-confrontation'],
  },
];
