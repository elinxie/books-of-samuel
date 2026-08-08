import { createTerrain, type Terrain, type TerrainSpec } from '../../engine/terrain';
import { HEBRON_TERRAIN_SPEC } from '../hebron-anointing/terrain';
import { POOL_CENTER, POOL_FLAT_RADIUS, POOL_RADIUS } from './layout';

/**
 * hebron-reckoning reuses hebron-anointing's Judean-highland terrain outright
 * — same hills, town mound, valley, ridge, and eastward ramp (mandatory
 * visual continuity, docs/design/hebron-reckoning-brief.md: "the identical
 * Hebron continuity rule as the other two M5 scenes — reuse hebron-
 * anointing's palette and massing; the pool basin ... and nothing else is
 * new ground"). The one new landform is the pool of Hebron (2 Samuel 4:12,
 * `claim-hebron-pool-feature`): a shallow rock-cut basin depression east of
 * the town, well clear of the town-mound scatter, following the exact
 * `gibeon-pool` convention (the `basin` TerrainFeature, `engine/terrain.ts`,
 * plus a local `flatten` so the town mound's own gentle gradient tail
 * doesn't tilt the basin floor — the same "keep the tableau level and
 * legible" reasoning `claim-gibeon-terrain-form`'s spec used for the pool of
 * Gibeon). Placed at a distance from Tell Rumeida large enough that the
 * mound's gaussian falls to a gentle residual slope rather than a sharp
 * tilt — a rendering-legibility choice, not a claim about the real distance
 * from the town to any actual water source.
 */
export const HEBRON_RECKONING_TERRAIN_SPEC: TerrainSpec = {
  ...HEBRON_TERRAIN_SPEC,
  features: [
    ...(HEBRON_TERRAIN_SPEC.features ?? []),
    // The pool of Hebron (4:12) — modest, disclosed dimensions; not the
    // extant Birket es-Sultan pool in modern Hebron, which this project
    // does not adopt as site or form (claim-hebron-pool-feature).
    {
      kind: 'basin',
      center: POOL_CENTER,
      radius: POOL_RADIUS,
      depth: 2.2,
      flatRadius: POOL_FLAT_RADIUS,
    },
    // Keeps the pool's own bank level and legible against the town mound's
    // distant gradient tail (the same reasoning as gibeon-pool's flatten).
    { kind: 'flatten', center: POOL_CENTER, radius: 30, strength: 0.55 },
  ],
  colors: {
    ...HEBRON_TERRAIN_SPEC.colors,
    zones: [
      ...(HEBRON_TERRAIN_SPEC.colors.zones ?? []),
      // A cool, slightly darker tint around the pool rim (damp ground).
      { center: POOL_CENTER, radius: 15, color: '#8a9166', strength: 0.28 },
    ],
  },
};

export const HEBRON_RECKONING_TERRAIN: Terrain = createTerrain(HEBRON_RECKONING_TERRAIN_SPEC);
