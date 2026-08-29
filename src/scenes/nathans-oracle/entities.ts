import type { SceneEntityDef } from '../types';
import {
  DAVID_HOUSE_POS,
  DAVID_TENT_SIT_POS,
  HOUSE_CENTER,
  NATHAN_HOUSE_POS,
  NIGHT_CORNER_POS,
  STRONGHOLD_CENTER,
  TENT_POS,
} from './layout';

/**
 * Label set for nathans-oracle: the reused enclosure (cross-referenced, not
 * restated), David's house now shown complete, the night-stillness corner
 * (disclosed placeholder, no atlas pin — the Perez-uzzah threshing-floor
 * treatment), the reused tent and ark, and the two named principals — no
 * label anywhere for the oracle's reception itself (the `b-night-word`
 * beat's caption carries the text's own claim; no entity stands in for it,
 * the same discipline rephaim-valley's/perez-uzzah's entities.ts used for
 * their own ADR-013 beats).
 */
export const NATHANS_ORACLE_ENTITIES: SceneEntityDef[] = [
  {
    id: 'ent-stronghold-enclosure',
    title: 'The stronghold enclosure (reused, unchanged)',
    kind: 'structure',
    position: [STRONGHOLD_CENTER[0], 8, STRONGHOLD_CENTER[1]],
    description:
      'The same modest stone circuit jerusalem-stronghold built (claim-jebusite-stronghold-form), unchanged — the city of David, now the setting for a quiet night and a long prayer rather than a construction site or a festival. See that scene for the fortification-extent dispute this render still sits at the conservative end of.',
    claimIds: ['claim-jebusite-stronghold-form', 'claim-city-of-david-naming'],
  },
  {
    id: 'ent-davids-house',
    title: "David's house, now complete",
    kind: 'structure',
    position: [HOUSE_CENTER[0], 5, HOUSE_CENTER[1]],
    description:
      'The same house Hiram’s craftsmen were building in jerusalem-stronghold and ark-into-jerusalem (5:11-12), shown finished for the first time on 7:1’s own textual license: "the king lived in his house." Closed walls, a finished roof, no scaffolding or craftsmen — the interior layout, decoration, and exact scale stay an undisclosed design placeholder, exactly as the under-construction state itself was a placeholder for its own final form.',
    claimIds: ['claim-davids-house-complete', 'claim-hiram-building'],
  },
  {
    id: 'ent-night-corner',
    title: 'A quiet corner of the enclosure (staged position)',
    kind: 'feature',
    position: [NIGHT_CORNER_POS[0], 3, NIGHT_CORNER_POS[1]],
    description:
      'Where Nathan is shown settled for the night (7:4-17) — an unremarkable spot within this scene’s own terrain, not a claimed identification; there is no LocationEntry or atlas pin for this place, the same Perez-uzzah threshing-floor treatment. Nothing about the ground itself is staged as a sign of anything: no light, glow, or camera language marks it out (ADR-013, claim-oracle-depiction).',
    claimIds: ['claim-oracle-depiction', 'claim-nathan-oracle'],
  },
  {
    id: 'ent-ark-tent',
    title: "David's tent for the ark (reused, unchanged)",
    kind: 'structure',
    position: [TENT_POS[0], 3, TENT_POS[1]],
    description:
      'The same simple woven/leather tent David pitched for the ark (ark-into-jerusalem, 2 Samuel 6:17), reused here unchanged — where David goes in and sits before the LORD (7:18a). No interior is rendered, in any mode; the tent itself is explicitly not the tabernacle at Gibeon (1 Chronicles 16:39).',
    claimIds: ['claim-ark-tent-form'],
  },
  {
    id: 'ent-ark',
    title: 'The ark of the covenant (reused, unchanged, static)',
    kind: 'structure',
    position: [TENT_POS[0], 3.4, TENT_POS[1]],
    description:
      'The same plain, rectangular gold-toned chest with visible carrying poles perez-uzzah built and ark-into-jerusalem carried into the city, reused unchanged and held static here — already settled in its place well before this chapter opens.',
    claimIds: ['claim-ark-physical-form'],
  },
  {
    id: 'ent-david',
    title: 'David',
    kind: 'person',
    position: [DAVID_HOUSE_POS[0], 3, DAVID_HOUSE_POS[1]],
    description:
      'Settled now in his own finished house, with rest from his surrounding enemies, David tells Nathan he wishes to build the LORD a house; that night the LORD answers instead by promising to build David a house — a dynasty. David goes to the tent and sits before the LORD in a long prayer of self-examination, rehearsal, and petition (7:1-3, 7:17-29).',
    claimIds: [
      'claim-nathan-oracle-house-request',
      'claim-nathan-oracle',
      'claim-david-prayer',
      'claim-davids-house-complete',
    ],
  },
  {
    id: 'ent-nathan',
    title: 'Nathan the prophet',
    kind: 'person',
    position: [NATHAN_HOUSE_POS[0], 3, NATHAN_HOUSE_POS[1]],
    description:
      'A different person from the identically named son born to David in Jerusalem (2 Samuel 5:14, card-only, no character record of its own) — never conflated with him here. Tells David to go and do all that is in his heart (7:3), an answer given before consulting the LORD; that same night receives the LORD’s word correcting the plan, and reports it to David in full the next day (7:4-17).',
    claimIds: ['claim-nathan-oracle-house-request', 'claim-nathan-oracle'],
  },
  {
    id: 'ent-david-tent-seat',
    title: 'Where David sits before the LORD',
    kind: 'feature',
    position: [DAVID_TENT_SIT_POS[0], 2, DAVID_TENT_SIT_POS[1]],
    description:
      'Just outside the tent’s own entrance — a seated king, not enthroned, not standing, and not entering an interior this project has never modeled. The text’s own choice of verb (7:18a) is preserved as a staging choice, not an interpretive claim about what being before the LORD theologically means.',
    claimIds: ['claim-david-prayer', 'claim-ark-tent-form'],
  },
];
