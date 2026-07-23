import { createTerrain, type Terrain, type TerrainSpec } from '../../engine/terrain';

/**
 * Gibeon terrain (M4, gibeon-pool): the project's sixth regional palette —
 * the central Benjamin highlands north of Jerusalem, drier and more open
 * than Judean Hebron's terracing, rockier high ground typical of the Gibeon
 * plateau (see docs/design/gibeon-pool-brief.md, "Visual composition").
 * Deliberately not DEM-derived; a procedural composite encoding the brief's
 * relative narrative geography only:
 *
 *   - a shallow pool basin near the origin (`claim-gibeon-pool-form`,
 *     `claim-gibeon-terrain-form`) — the one genuinely new terrain feature
 *     this scene introduces (`basin` kind, engine/terrain.ts);
 *   - open, gently rolling ground south of the pool where the champions'
 *     contest and the wider battle spread;
 *   - a long, mostly flat pursuit stretch further south, away from Gibeon;
 *   - a modest rise at the far south end — the hill of Ammah (2:25) — a
 *     `mound` feature, deliberately unmonumental (a "modest rise" per the
 *     brief, not a defensible height).
 *
 * No water reflection/refraction shader (declined per Gilboa/Jabesh
 * precedent) — the pool is a basin depression plus a flat, unlit/minimally
 * lit tinted plane, built in GroundWorks.tsx.
 */
export const GIBEON_POOL_CENTER: [number, number] = [0, 0];
export const GIBEON_POOL_RADIUS_X = 9;
export const GIBEON_POOL_RADIUS_Z = 20;
export const GIBEON_WATER_RADIUS_X = 7.4;
export const GIBEON_WATER_RADIUS_Z = 18;
export const GIBEON_POOL_DEPTH = 2.4;

export const AMMAH_HILL_CENTER: [number, number] = [22, 430];
export const AMMAH_HILL_RADIUS = 45;
export const AMMAH_HILL_HEIGHT = 16;

export const GIBEON_POOL_TERRAIN_SPEC: TerrainSpec = {
  hills: [
    { frequency: 0.004, amplitude: 6, octaves: 4, offset: [12.4, -33.7] },
    { frequency: 0.02, amplitude: 1.8, octaves: 3, offset: [-21.9, 6.1] },
  ],
  features: [
    {
      kind: 'basin',
      center: GIBEON_POOL_CENTER,
      radiusX: GIBEON_POOL_RADIUS_X,
      radiusZ: GIBEON_POOL_RADIUS_Z,
      depth: GIBEON_POOL_DEPTH,
    },
    // The modest rise at the hill of Ammah, far south of the pool.
    {
      kind: 'mound',
      center: AMMAH_HILL_CENTER,
      radius: AMMAH_HILL_RADIUS,
      height: AMMAH_HILL_HEIGHT,
    },
    // A very gentle overall fall away from the pool toward the pursuit
    // ground, so the "away from Gibeon" direction reads as open country,
    // not a level plaza stretching the whole scene.
    { kind: 'ramp', direction: [0, 1], start: 40, end: 480, drop: 6 },
  ],
  colors: {
    base: '#b7a878',
    scrub: '#7a7f4f',
    rocky: '#bcae88',
    moistureOffset: [9.2, -14.6],
    moistureThreshold: 0.46,
    moistureStrength: 0.4,
    // Rockier, more open highland than Hebron's terracing (brief's palette note).
    rockyFromY: 7,
    rockyFullY: 20,
    rockyStrength: 0.62,
    zones: [
      // A darker, damper ring immediately around the pool basin.
      { center: GIBEON_POOL_CENTER, radius: 34, color: '#7d7a52', strength: 0.3 },
      // The hill of Ammah reads slightly paler/rockier than the open ground.
      { center: AMMAH_HILL_CENTER, radius: 55, color: '#c7bb92', strength: 0.28 },
    ],
  },
  size: 1400,
  segments: 190,
};

export const GIBEON_POOL_TERRAIN: Terrain = createTerrain(GIBEON_POOL_TERRAIN_SPEC);
