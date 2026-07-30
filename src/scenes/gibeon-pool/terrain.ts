import { createTerrain, type Terrain, type TerrainSpec } from '../../engine/terrain';

/**
 * Gibeon terrain (M4, gibeon-pool): the project's sixth regional palette —
 * central Benjamin highlands, north of Jerusalem. Drier and more open than
 * Judean Hebron's intensively terraced slopes, rockier high ground typical
 * of the Gibeon plateau (docs/design/gibeon-pool-brief.md, "Visual
 * composition"). Deliberately not DEM-derived; a procedural composite that
 * encodes the brief's relative geography only:
 *
 *   - a shallow, flat-bottomed basin at the origin — the pool of Gibeon
 *     (2 Samuel 2:13), the one genuinely new terrain-feature kind this scene
 *     adds (`TerrainFeature`'s `basin` kind, engine/terrain.ts). Rendered
 *     without asserting Pritchard's excavated monumental dimensions — see
 *     claim-gibeon-pool-feature's dating caveat;
 *   - a broad, gently undulating plateau around it, where the two
 *     companies' banks, the champions' ground, and the spreading battlefield
 *     sit;
 *   - a modest rise east of the plateau — the hill of Ammah (2:24) — a
 *     single mound feature, not asserted at any surveyed elevation;
 *   - a shallow eastward fall beyond the hill, toward the unshown
 *     wilderness/Jordan-valley direction Abner's flight ultimately continues
 *     into (Mahanaim itself stays off-scene, per the brief's scope guard).
 *
 * See claim-gibeon-terrain-form and asset-terrain-gibeon-plateau.
 */
export const POOL_CENTER: [number, number] = [0, 0];
export const POOL_RADIUS = 13;
export const POOL_RIM_WIDTH = 7;

export const HILL_OF_AMMAH_CENTER: [number, number] = [265, -15];
export const HILL_OF_AMMAH_RADIUS = 34;
export const HILL_OF_AMMAH_HEIGHT = 16;

export const GIBEON_TERRAIN_SPEC: TerrainSpec = {
  hills: [
    { frequency: 0.0038, amplitude: 7, octaves: 4, offset: [61.4, -22.7] },
    { frequency: 0.019, amplitude: 2.2, octaves: 3, offset: [-8.1, 33.6] },
  ],
  features: [
    // Keep the pool/banks/champions ground close to flat — a held, legible
    // tableau, not a bumpy hillside (brief: "the default pool vantage
    // should read as a held, almost diplomatic tableau").
    { kind: 'flatten', center: POOL_CENTER, radius: 70, strength: 0.75 },
    // The pool of Gibeon itself: a shallow rock-cut basin (claim-gibeon-pool-feature).
    {
      kind: 'basin',
      center: POOL_CENTER,
      radius: POOL_RADIUS,
      depth: 3.2,
      rimWidth: POOL_RIM_WIDTH,
    },
    // The hill of Ammah, east of the plateau (2:24) — the Benjaminite rally
    // point, deliberately placed so the rallying band stands physically
    // above the pursuers (brief's "Focal masses" (e)).
    {
      kind: 'mound',
      center: HILL_OF_AMMAH_CENTER,
      radius: HILL_OF_AMMAH_RADIUS,
      height: HILL_OF_AMMAH_HEIGHT,
    },
    // A shallow eastward fall beyond the hill, toward the unshown
    // wilderness/Jordan-valley direction Abner's flight continues into.
    { kind: 'ramp', direction: [1, 0], start: 300, end: 520, drop: 10 },
  ],
  colors: {
    base: '#c7b58c',
    scrub: '#7c7f52',
    rocky: '#a89878',
    moistureOffset: [11.2, -30.4],
    moistureThreshold: 0.46,
    moistureStrength: 0.36,
    // Rockier and more open than Hebron's terraced slopes (brief's palette note).
    rockyFromY: 7,
    rockyFullY: 20,
    rockyStrength: 0.62,
    zones: [
      { center: POOL_CENTER, radius: 26, color: '#8f9e8a', strength: 0.4 }, // damp ground around the pool
      { center: HILL_OF_AMMAH_CENTER, radius: 44, color: '#b8a67e', strength: 0.28 }, // the hill's paler crest
    ],
  },
  size: 1700,
  segments: 210,
};

export const GIBEON_TERRAIN: Terrain = createTerrain(GIBEON_TERRAIN_SPEC);
