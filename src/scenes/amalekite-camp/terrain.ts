import {
  createTerrain,
  type ColorZone,
  type Terrain,
  type TerrainSpec,
} from '../../engine/terrain';
import { CAPTIVE_POS, CLUSTERS } from './layout';

/**
 * Amalekite-camp terrain (M2): a shallow open basin south of the Besor
 * drainage — low-relief loess/steppe in the same regional palette as the
 * Besor scene, no channel (the wadi is off-scene). A gentle rise to the
 * north is the scout's vantage; worn, grazed ground under the camp sprawl.
 * See asset-terrain-camp-basin, claim-camp-sprawl, claim-negev-terrain.
 */

const WORN_ZONES: ColorZone[] = (() => {
  const zones: ColorZone[] = [
    // Broad grazed halo over the whole sprawl.
    { center: [10, 45], radius: 190, color: '#c9ac78', strength: 0.22 },
  ];
  for (const c of CLUSTERS) {
    zones.push({
      center: c.center,
      radius: c.radius * 3.2,
      color: '#cfb891',
      strength: 0.45,
    });
  }
  zones.push({ center: CAPTIVE_POS, radius: 16, color: '#cdb68e', strength: 0.4 });
  return zones;
})();

export const AMALEKITE_CAMP_TERRAIN_SPEC: TerrainSpec = {
  hills: [
    { frequency: 0.004, amplitude: 9, octaves: 4, offset: [12.7, -33.1] },
    { frequency: 0.02, amplitude: 1.7, octaves: 3, offset: [5.4, 9.2] },
  ],
  features: [
    // The basin floor the camp sprawls across.
    { kind: 'flatten', center: [10, 45], radius: 170, strength: 0.72 },
    // The scout's rise north of the camp (vp-scout-rise stands on it).
    { kind: 'mound', center: [0, -165], radius: 65, height: 7 },
  ],
  colors: {
    base: '#c7ab74',
    scrub: '#7c8a52',
    rocky: '#a69471',
    moistureOffset: [40.3, 18.6],
    moistureThreshold: 0.45,
    moistureStrength: 0.6,
    zones: WORN_ZONES,
  },
};

export const AMALEKITE_CAMP_TERRAIN: Terrain = createTerrain(AMALEKITE_CAMP_TERRAIN_SPEC);
