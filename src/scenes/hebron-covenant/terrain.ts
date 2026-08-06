/**
 * hebron-covenant reuses hebron-anointing's Judean-highland terrain
 * unchanged (ADR-006: "layout code stays scene-local, but constants may be
 * imported/shared rather than diverging" — the brief for this scene goes
 * further and requires the *terrain itself*, not just its constants, to stay
 * identical: same town, a few years later. See
 * docs/design/hebron-covenant-brief.md, "Resolved design calls" ("Reuse the
 * hebron-anointing terrain spec and layout constants ... Do not re-invent
 * Hebron"). No new TerrainSpec is authored here.
 */
export { HEBRON_TERRAIN_SPEC, HEBRON_TERRAIN } from '../hebron-anointing/terrain';
