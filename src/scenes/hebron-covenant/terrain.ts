export { HEBRON_TERRAIN, HEBRON_TERRAIN_SPEC } from '../hebron-anointing/terrain';

/**
 * hebron-covenant reuses hebron-anointing's Judean-highland terrain
 * unchanged — "the same place a few years later," per
 * docs/design/hebron-covenant-brief.md's "visual continuity is mandatory"
 * instruction. No new TerrainSpec, no new terrain.test.ts: there is no new
 * terrain logic here to test, only a re-export for a stable scene-local
 * import path (`./terrain`), matching every other scene's convention.
 */
