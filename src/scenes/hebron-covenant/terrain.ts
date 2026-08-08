/**
 * hebron-covenant reuses hebron-anointing's Judean-highland terrain outright
 * — same mound/valley/ridge/ramp composition, same palette (mandatory visual
 * continuity, docs/design/hebron-covenant-brief.md: "this is the same place
 * a few years later. Do not re-invent Hebron."). No new regional terrain
 * system; re-exported rather than duplicated so the two scenes can never
 * silently drift apart.
 */
export { HEBRON_TERRAIN, HEBRON_TERRAIN_SPEC } from '../hebron-anointing/terrain';
