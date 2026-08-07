export { HEBRON_TERRAIN, HEBRON_TERRAIN_SPEC } from '../hebron-anointing/terrain';

/**
 * hebron-gate reuses hebron-anointing's Judean-highland terrain unchanged —
 * the "identical Hebron continuity rule" hebron-covenant established and
 * this scene's brief repeats verbatim (docs/design/hebron-gate-brief.md,
 * "Visual composition": "reuse hebron-anointing's palette, massing, and
 * layout constants"). No new TerrainSpec, no new terrain.test.ts: there is
 * no new terrain logic here to test, only a re-export for a stable
 * scene-local import path (`./terrain`), matching every other scene's
 * convention.
 */
