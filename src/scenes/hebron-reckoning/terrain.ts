import { createTerrain, type Terrain, type TerrainSpec } from '../../engine/terrain';
import { HEBRON_TERRAIN_SPEC } from '../hebron-anointing/terrain';
import { POOL_CENTER, POOL_RADIUS } from './layout';

/**
 * hebron-reckoning terrain: hebron-anointing's Judean-highland spec, reused
 * unchanged (hills, the Tell Rumeida town mound, the spring-fed valley
 * channel, the approach ridge, the eastward ramp) — the "identical Hebron
 * continuity rule" all three M5 scenes share — plus exactly one new
 * landform: the pool of Hebron (4:12), a shallow rock-cut basin depression
 * near the town (`claim-hebron-pool-feature`, `asset-hebron-pool-basin`).
 * Modeled on gibeon-pool's own basin/no-water-shader convention
 * (`GIBEON_POOL_TERRAIN_SPEC`'s `basin` feature), not on any excavated or
 * securely dated Hebron water installation — the extant "Birket es-Sultan"
 * pool in modern Hebron is deliberately not adopted as site or form (much
 * later, an anachronism risk dressed as corroboration). Nothing else is new
 * ground, per the brief's "Visual composition".
 */
export const HEBRON_RECKONING_TERRAIN_SPEC: TerrainSpec = {
  ...HEBRON_TERRAIN_SPEC,
  features: [
    ...(HEBRON_TERRAIN_SPEC.features ?? []),
    // The pool of Hebron — modest, disclosed dimensions, smaller than
    // gibeon-pool's own basin (this is a placeholder landmark, not a second
    // excavated site).
    {
      kind: 'basin',
      center: POOL_CENTER,
      radius: POOL_RADIUS,
      depth: 1.8,
      flatRadius: POOL_RADIUS * 0.45,
    },
    // Keeps the presentation/execution ground level and legible near the pool.
    { kind: 'flatten', center: POOL_CENTER, radius: 26, strength: 0.5 },
  ],
  colors: {
    ...HEBRON_TERRAIN_SPEC.colors,
    zones: [
      ...(HEBRON_TERRAIN_SPEC.colors.zones ?? []),
      // A cool, slightly darker tint around the pool itself (damp ground at the rim).
      { center: POOL_CENTER, radius: 15, color: '#8a9166', strength: 0.3 },
    ],
  },
};

export const HEBRON_RECKONING_TERRAIN: Terrain = createTerrain(HEBRON_RECKONING_TERRAIN_SPEC);
