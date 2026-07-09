import { createTerrain, type Terrain, type TerrainSpec } from '../../engine/terrain';

/**
 * Gilboa terrain (M3 first slice): procedural ridge above the Jezreel plain.
 * This is deliberately not DEM-derived; it encodes the brief's relative
 * topography only — crest near the origin, lower northern approach, and an
 * eastern escape slope — pending later data-provenance review for real DEMs.
 * See claim-gilboa-terrain-form and asset-terrain-gilboa-ridge.
 */
export const GILBOA_TERRAIN_SPEC: TerrainSpec = {
  hills: [
    { frequency: 0.0035, amplitude: 13, octaves: 4, offset: [31.2, -18.4] },
    { frequency: 0.018, amplitude: 2.4, octaves: 3, offset: [-9.8, 44.6] },
  ],
  features: [
    // Ridge crest running broadly west-east; one feature, not stacked mounds.
    { kind: 'ridge', start: [-420, -12], end: [360, 18], width: 92, height: 34 },
    // Jezreel side falls away to the north (negative z), the Philistine approach.
    { kind: 'ramp', direction: [0, -1], start: -70, end: 360, drop: 30 },
    // Rout drains eastward toward the Beth-shan/Jordan side.
    { kind: 'ramp', direction: [1, 0], start: 170, end: 520, drop: 20 },
  ],
  colors: {
    base: '#b89f72',
    scrub: '#6f7d47',
    rocky: '#c3b492',
    moistureOffset: [18.7, -52.1],
    moistureThreshold: 0.5,
    moistureStrength: 0.45,
    rockyFromY: 14,
    rockyFullY: 36,
    rockyStrength: 0.72,
    zones: [
      { center: [0, 0], radius: 155, color: '#cfc3a0', strength: 0.35 },
      { center: [280, 75], radius: 220, color: '#aa936a', strength: 0.18 },
    ],
  },
  size: 1600,
  segments: 200,
};

export const GILBOA_TERRAIN: Terrain = createTerrain(GILBOA_TERRAIN_SPEC);
