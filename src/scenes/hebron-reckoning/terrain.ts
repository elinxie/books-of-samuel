import { createTerrain, type Terrain, type TerrainSpec } from '../../engine/terrain';
import { HEBRON_TERRAIN_SPEC } from '../hebron-anointing/terrain';
import { POOL_CENTER, POOL_RADIUS } from './layout';

/**
 * Hebron terrain for hebron-reckoning: the same place as hebron-anointing,
 * hebron-covenant, and hebron-gate — this scene reuses `HEBRON_TERRAIN_SPEC`
 * directly as its base (brief's "identical Hebron continuity rule... reuse
 * hebron-anointing's palette and massing") and adds exactly one new landform,
 * the pool of Hebron basin (`claim-hebron-pool-feature`), modeled on
 * gibeon-pool's own basin treatment (`GIBEON_POOL_TERRAIN_SPEC`): a shallow
 * rock-cut depression (the `basin` TerrainFeature kind, `engine/terrain.ts`),
 * modest and disclosed, not any specific excavated form — and explicitly not
 * the extant Birket es-Sultan pool/site in modern Hebron, which postdates
 * this scene's Iron IIA setting by roughly two millennia. `GroundWorks.tsx`
 * lays a flat, unlit water plane over its floor; no reflection/refraction
 * shader (declined, matching Gilboa/Jabesh/gibeon-pool's own precedent).
 *
 * Placed east/south-east of the town, clear of the terrace-ring and
 * house-scatter extents and of the valley channel south of the town (see
 * layout.test.ts, terrain.test.ts) — "near the town," per the brief, not on
 * top of its other staged ground.
 */
export const HEBRON_RECKONING_TERRAIN_SPEC: TerrainSpec = {
  ...HEBRON_TERRAIN_SPEC,
  features: [
    ...(HEBRON_TERRAIN_SPEC.features ?? []),
    // Gentle, legible ground around the pool for the presentation/execution
    // sightlines (mirrors gibeon-pool's own flatten around its own basin).
    { kind: 'flatten', center: POOL_CENTER, radius: 24, strength: 0.5 },
    { kind: 'basin', center: POOL_CENTER, radius: POOL_RADIUS, depth: 2.0, flatRadius: 4.2 },
  ],
  colors: {
    ...HEBRON_TERRAIN_SPEC.colors,
    zones: [
      ...(HEBRON_TERRAIN_SPEC.colors.zones ?? []),
      // A cool, slightly darker tint around the pool itself (damp ground at the rim) — same device as gibeon-pool's own rim zone.
      { center: POOL_CENTER, radius: 18, color: '#8a9166', strength: 0.28 },
    ],
  },
};

export const HEBRON_RECKONING_TERRAIN: Terrain = createTerrain(HEBRON_RECKONING_TERRAIN_SPEC);
