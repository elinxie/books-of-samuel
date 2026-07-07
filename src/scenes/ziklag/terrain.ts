import { createTerrain, type Terrain, type TerrainSpec } from '../../engine/terrain';

/**
 * Ziklag frontier terrain: gentle semi-arid hills, a low tell under the
 * settlement, a flattened occupation pad, a southward fall toward the Besor
 * drainage, and ash-darkened ground inside the burned town. PLACEHOLDER — see
 * asset-terrain-negev.
 */
export const ZIKLAG_TERRAIN_SPEC: TerrainSpec = {
  hills: [
    { frequency: 0.006, amplitude: 16, octaves: 4, offset: [11.3, -7.1] },
    { frequency: 0.025, amplitude: 2.5, octaves: 3 },
  ],
  features: [
    { kind: 'flatten', center: [0, 0], radius: 78, strength: 0.82 },
    { kind: 'mound', center: [0, 0], radius: 60, height: 6.5 },
    { kind: 'ramp', direction: [0, 1], start: 60, end: 520, drop: 4.5 },
  ],
  colors: {
    base: '#c2a36b',
    scrub: '#8a8a55',
    rocky: '#a89878',
    moistureOffset: [3.7, -9.2],
    zones: [{ center: [0, 0], radius: 52, color: '#6f675c', strength: 0.55 }],
  },
};

export const ZIKLAG_TERRAIN: Terrain = createTerrain(ZIKLAG_TERRAIN_SPEC);
