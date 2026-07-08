import {
  createTerrain,
  type ColorZone,
  type Terrain,
  type TerrainSpec,
} from '../../engine/terrain';
import { CHANNEL_DEPTH, CHANNEL_PATH, CHANNEL_WIDTH, POOL_SPOTS } from './layout';

/**
 * Besor-crossing terrain (M2): rolling loess/steppe cut by a broad braided
 * wadi bed (ADR-005 `channel` feature). No settlement geometry — richness is
 * terrain, vegetation, and figures. See asset-terrain-besor,
 * claim-besor-channel-form.
 */

const BED_ZONES: ColorZone[] = (() => {
  const zones: ColorZone[] = [];
  const bedRadius = CHANNEL_WIDTH * 0.4;
  for (let i = 0; i < CHANNEL_PATH.length - 1; i++) {
    const [ax, az] = CHANNEL_PATH[i];
    const [bx, bz] = CHANNEL_PATH[i + 1];
    const steps = 3;
    for (let s = 0; s <= steps; s++) {
      const t = s / steps;
      // Skip the segment's tail sample when a next segment repeats it.
      if (i < CHANNEL_PATH.length - 2 && s === steps) continue;
      zones.push({
        center: [ax + (bx - ax) * t, az + (bz - az) * t],
        radius: bedRadius,
        color: '#cdbb8c',
        strength: 0.42,
      });
    }
  }
  for (const pool of POOL_SPOTS) {
    zones.push({
      center: [pool.x, pool.z],
      radius: pool.r * 1.6,
      color: '#4a6155',
      strength: 0.32,
    });
  }
  return zones;
})();

export const BESOR_TERRAIN_SPEC: TerrainSpec = {
  hills: [
    { frequency: 0.005, amplitude: 15, octaves: 4, offset: [-40.2, 61.5] },
    { frequency: 0.022, amplitude: 2.2, octaves: 3 },
  ],
  features: [{ kind: 'channel', path: CHANNEL_PATH, width: CHANNEL_WIDTH, depth: CHANNEL_DEPTH }],
  colors: {
    base: '#c7ab74',
    scrub: '#7c8a52',
    rocky: '#a69471',
    moistureOffset: [22.4, -6.8],
    moistureThreshold: 0.4,
    moistureStrength: 0.85,
    zones: BED_ZONES,
  },
};

export const BESOR_TERRAIN: Terrain = createTerrain(BESOR_TERRAIN_SPEC);
