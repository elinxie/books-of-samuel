import { createTerrain, type Terrain, type TerrainSpec } from '../../engine/terrain';

/**
 * Gibeon terrain (M4, gibeon-pool): the project's sixth regional palette —
 * central Benjamin highlands, drier and more open than Judean Hebron's
 * terracing, rockier high ground typical of the Gibeon plateau north of
 * Jerusalem (see docs/design/gibeon-pool-brief.md, "Visual composition").
 * Deliberately not DEM-derived; a procedural composite encoding only the
 * brief's relative narrative geography, laid out west-to-east as a single
 * "journey" rather than one wide shot:
 *
 *   - the pool basin itself, at the origin (claim-gibeon-pool-feature) —
 *     the one genuinely new terrain feature (`basin`, engine/terrain.ts);
 *   - open ground east of the pool where the wider battle spreads and the
 *     pursuit runs, draining gently downward (a legibility choice, not a
 *     surveyed gradient);
 *   - a modest rise at the eastern end — the hill of Ammah (2 Samuel 2:24),
 *     deliberately not a dramatic peak: the brief calls for the Benjaminites
 *     physically above the pursuers without over-staging a "heroic" summit.
 *
 * See claim-gibeon-terrain-form and asset-terrain-gibeon-plateau.
 */
export const GIBEON_TERRAIN_SPEC: TerrainSpec = {
  hills: [
    { frequency: 0.0038, amplitude: 7, octaves: 4, offset: [22.6, -14.2] },
    { frequency: 0.019, amplitude: 2, octaves: 3, offset: [-11.5, 27.8] },
  ],
  features: [
    // The pool of Gibeon (2 Samuel 2:13): a modest rock-cut basin, not
    // asserted at Pritchard's excavated monumental dimensions — see
    // claim-gibeon-pool-feature's dating caveat.
    { kind: 'basin', center: [0, 0], radius: 13, depth: 3.4 },
    // Open ground draining gently east, away from the pool, toward the
    // pursuit route and the hill of Ammah.
    { kind: 'ramp', direction: [1, 0], start: 40, end: 480, drop: 14 },
    // The hill of Ammah (2:24-25): a modest rise, not a dramatic peak.
    { kind: 'mound', center: [460, 0], radius: 72, height: 24 },
  ],
  colors: {
    base: '#c8b988',
    scrub: '#77804a',
    rocky: '#b6a37a',
    moistureOffset: [8.9, -19.4],
    moistureThreshold: 0.47,
    moistureStrength: 0.38,
    // Rockier, more open highland ground than Hebron's terraced palette.
    rockyFromY: 8,
    rockyFullY: 24,
    rockyStrength: 0.62,
    zones: [
      { center: [0, 0], radius: 34, color: '#a7bfc2', strength: 0.22 }, // damp ground near the pool
      { center: [460, 0], radius: 95, color: '#c9bb92', strength: 0.2 }, // the hill of Ammah
    ],
  },
  size: 1600,
  segments: 200,
};

export const GIBEON_TERRAIN: Terrain = createTerrain(GIBEON_TERRAIN_SPEC);
