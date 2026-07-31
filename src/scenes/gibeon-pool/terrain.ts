import { createTerrain, type Terrain, type TerrainSpec } from '../../engine/terrain';

/**
 * Gibeon terrain (M4, gibeon-pool): the project's sixth regional palette —
 * central Benjamin highlands north of Jerusalem, drier and more open than
 * Judean Hebron's terracing, rockier high ground (see
 * docs/design/gibeon-pool-brief.md, "Visual composition"). Deliberately not
 * DEM-derived; a procedural composite that encodes the brief's relative
 * geography only:
 *
 *   - the pool basin at the origin — a shallow depression (an inverted
 *     `mound`, per the brief's own implementer's-call: "approximate with an
 *     inverted mound/a channel ring"), not Pritchard's excavated monumental
 *     dimensions (see claim-gibeon-pool-form's dating caveat);
 *   - level ground on the north bank (Abner/Israel) and south bank
 *     (Joab/Judah) where the two companies sit facing each other across the
 *     water (2:13), and a flattened clearing east of the pool for the
 *     champions' ground;
 *   - open, gently rising ground running north-east, the pursuit route away
 *     from Gibeon, toward a modest rise at its far end — the hill of Ammah
 *     (2:24) — deliberately modest, not a dramatic peak (the brief's "do not
 *     'fix' this into a more conventionally heroic composition").
 *
 * See claim-gibeon-pool-form and asset-terrain-gibeon-highlands.
 */
export const GIBEON_TERRAIN_SPEC: TerrainSpec = {
  hills: [
    { frequency: 0.004, amplitude: 10, octaves: 4, offset: [12.4, -33.7] },
    { frequency: 0.019, amplitude: 2.2, octaves: 3, offset: [-21.6, 15.3] },
  ],
  features: [
    // Keep the whole pool/banks/champions-ground composition level enough to
    // read clearly from the default elevated vantage.
    { kind: 'flatten', center: [0, 0], radius: 95, strength: 0.55 },
    // The pool basin itself: a shallow rock-cut depression (negative-height
    // "mound" — the brief's disclosed inverted-mound approximation), not
    // Pritchard's excavated monumental dimensions.
    { kind: 'mound', center: [0, 0], radius: 15, height: -3.1 },
    // A broad, low rise the pursuit route crosses on its way out of the
    // Gibeon bowl — open "wilderness of Gibeon" ground (2:24), not a sharp
    // ridge.
    { kind: 'ridge', start: [40, -70], end: [300, -175], width: 150, height: 6 },
    // The hill of Ammah: a modest rise, not a dramatic peak — the
    // rallying band holds real but modest high ground (brief: "do not 'fix'
    // this into a more conventionally heroic composition").
    { kind: 'mound', center: [360, -190], radius: 46, height: 15 },
  ],
  colors: {
    base: '#c2b48c',
    scrub: '#7c8256',
    rocky: '#ab9972',
    moistureOffset: [9.4, -27.2],
    moistureThreshold: 0.46,
    moistureStrength: 0.4,
    rockyFromY: 9,
    rockyFullY: 24,
    rockyStrength: 0.6,
    zones: [
      { center: [0, 0], radius: 60, color: '#cfc2a0', strength: 0.3 }, // pale worked ground around the pool
      { center: [360, -190], radius: 60, color: '#b8a578', strength: 0.22 }, // Ammah hill
    ],
  },
  size: 1200,
  segments: 190,
};

export const GIBEON_TERRAIN: Terrain = createTerrain(GIBEON_TERRAIN_SPEC);
