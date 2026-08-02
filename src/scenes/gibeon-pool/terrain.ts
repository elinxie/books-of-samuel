import { createTerrain, type Terrain, type TerrainSpec } from '../../engine/terrain';

/**
 * Gibeon terrain: a modest, mostly level Benjamin-highlands plateau (drier,
 * rockier, and more open than Judean Hebron's terracing — the brief's
 * "Visual composition"), with two genuinely narrative landforms:
 *
 *  - The pool basin at the origin (`claim-gibeon-pool-form`, terrain-form
 *    disclosure `claim-gibeon-terrain-form`): a shallow rock-cut depression
 *    (the new `basin` TerrainFeature kind, `engine/terrain.ts`), not asserted
 *    at Pritchard's excavated monumental dimensions — see the dating caveat
 *    on `claim-gibeon-pool-form`. `GroundWorks.tsx` lays a flat, unlit water
 *    plane over its floor; no reflection/refraction shader (declined,
 *    matching Gilboa/Jabesh's own precedent).
 *  - The hill of Ammah far to the east (`claim-ammah-standoff`... covered
 *    under `claim-abner-pursuit-halted`): a modest rise where the pursuit
 *    ends and Abner's rallying band gathers, staged so the Benjaminites
 *    stand physically above the pursuers — deliberately not "fixed" into a
 *    more conventionally heroic composition (brief).
 *
 * A gentle flatten around the pool keeps the "two councils across water"
 * tableau (2:13) legible and level; everywhere else the highland hills roll
 * normally. See `layout.ts` for the x/z coordinates every figure/prop system
 * shares with this terrain (pool banks, champions' ground, the pursuit
 * route, the hill).
 */
export const GIBEON_POOL_TERRAIN_SPEC: TerrainSpec = {
  hills: [
    { frequency: 0.004, amplitude: 7, octaves: 4, offset: [12.4, -33.1] },
    { frequency: 0.02, amplitude: 1.6, octaves: 3, offset: [-4.2, 21.8] },
  ],
  features: [
    // The pool of Gibeon (2:13) — modest, disclosed dimensions, not Pritchard's excavated form.
    { kind: 'basin', center: [0, 0], radius: 9, depth: 2.4, flatRadius: 5 },
    // Keeps the pool-bank tableau and the champions' ground level and legible.
    { kind: 'flatten', center: [0, 0], radius: 34, strength: 0.55 },
    // The hill of Ammah, far to the east along the pursuit route (layout.ts's PURSUIT_ROUTE_CURVE).
    { kind: 'mound', center: [345, -8], radius: 55, height: 17 },
  ],
  colors: {
    base: '#b7ab82',
    scrub: '#6c7a49',
    rocky: '#c6bb98',
    moistureOffset: [22.6, -9.4],
    moistureThreshold: 0.48,
    moistureStrength: 0.4,
    rockyFromY: 9,
    rockyFullY: 22,
    rockyStrength: 0.55,
    zones: [
      // A cool, slightly darker tint around the pool itself (damp ground/algae at the rim).
      { center: [0, 0], radius: 16, color: '#8a9166', strength: 0.3 },
      { center: [345, -8], radius: 60, color: '#cabd93', strength: 0.2 },
    ],
  },
  size: 1400,
  segments: 190,
};

export const GIBEON_POOL_TERRAIN: Terrain = createTerrain(GIBEON_POOL_TERRAIN_SPEC);
