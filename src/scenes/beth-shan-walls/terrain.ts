import { createTerrain, type Terrain, type TerrainSpec } from '../../engine/terrain';

/**
 * Beth-shan terrain (M3): a steep, high tell above the Harod/Jordan valley
 * junction. `mound` + a `flatten`ed summit carry the tell itself
 * (claim-beth-shan-identification, claim-beth-shan-town-form); the
 * western/northern approach (the road up from Gilboa/Jezreel) is lower and
 * open, while the ground falls away east toward the Jordan valley — the
 * sightline the news crosses (1 Samuel 31:11) and the direction the
 * retrieval party comes from and leaves by. Procedural, not DEM-derived; see
 * asset-terrain-beth-shan-tell. Palette: a well-watered valley floor
 * (greener than any prior scene), basalt field stone on the flanks, pale
 * mudbrick at the summit and the gate-plaza shelf.
 */
export const BETH_SHAN_TERRAIN_SPEC: TerrainSpec = {
  hills: [
    { frequency: 0.003, amplitude: 7, octaves: 4, offset: [12.4, 88.1] },
    { frequency: 0.02, amplitude: 1.6, octaves: 3, offset: [-33.6, 5.2] },
  ],
  features: [
    // The tell itself: one steep radial rise, flattened on top for the town.
    { kind: 'mound', center: [0, 0], radius: 130, height: 46 },
    { kind: 'flatten', center: [0, 0], radius: 62, strength: 0.92 },
    // Falls away east toward the Jordan valley (the Jabesh sightline).
    { kind: 'ramp', direction: [1, 0], start: 30, end: 260, drop: 42 },
    // Lower, open western approach — the road up from Gilboa/Jezreel.
    { kind: 'ramp', direction: [-1, 0], start: 40, end: 300, drop: 30 },
  ],
  colors: {
    base: '#7c8452',
    scrub: '#4f6b3a',
    rocky: '#8d8577',
    moistureFrequency: 0.01,
    moistureOffset: [40.2, -15.7],
    moistureThreshold: 0.32,
    moistureStrength: 0.62,
    rockyFromY: 18,
    rockyFullY: 44,
    rockyStrength: 0.55,
    zones: [
      // Pale mudbrick tone under the summit town and the gate-plaza shelf.
      { center: [0, 0], radius: 70, color: '#c9bd9a', strength: 0.4 },
      { center: [-100, 0], radius: 50, color: '#b7ab8a', strength: 0.22 },
    ],
  },
  size: 1200,
  segments: 180,
};

export const BETH_SHAN_TERRAIN: Terrain = createTerrain(BETH_SHAN_TERRAIN_SPEC);
