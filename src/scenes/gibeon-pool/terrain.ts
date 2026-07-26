import { createTerrain, type Terrain, type TerrainSpec } from '../../engine/terrain';

/**
 * Gibeon terrain (M4, gibeon-pool): the project's sixth regional palette —
 * central Benjamin highlands, drier and more open than Judean Hebron's
 * intensively terraced slopes (docs/design/gibeon-pool-brief.md, "Visual
 * composition"). Deliberately not DEM-derived; a procedural composite that
 * encodes the brief's relative topography only, plus the scene's one
 * genuinely new landform: the pool basin.
 *
 * The pool basin (2 Samuel 2:13, claim-gibeon-pool-form) is rendered as a
 * shallow depression using the existing `mound` feature kind with a
 * *negative* height — `TerrainSpec` is not extended with a dedicated
 * `basin` kind (the brief left this as the implementer's call; a negative
 * mound already produces a radial gaussian depression with no engine
 * change, and keeps this scene from touching shared terrain code other
 * scenes depend on). A second, broader, very shallow positive mound at the
 * same center gives the basin a soft raised lip rather than a bowl that
 * blends invisibly into the surrounding ground. See GroundWorks.tsx for the
 * separate flat water-plane mesh (asset-water-plane) laid over the basin
 * floor — no reflection/refraction shader, matching the Gilboa/Jabesh
 * precedent this brief explicitly declines to break.
 *
 * The hill of Ammah (2 Samuel 2:24-25) is a modest rise well east of the
 * pool, along the pursuit route — tall enough that the rallying Benjaminite
 * band reads as physically above the pursuers below it, per the brief's
 * deliberate visual irony (the losing side, by the casualty count, holds
 * the high ground).
 */
export const GIBEON_TERRAIN_SPEC: TerrainSpec = {
  hills: [
    { frequency: 0.0038, amplitude: 6.5, octaves: 4, offset: [9.1, 61.4] },
    { frequency: 0.02, amplitude: 1.8, octaves: 3, offset: [-33.6, 12.9] },
  ],
  features: [
    // The pool basin: a shallow depression (negative-height mound) plus a
    // very slight raised lip beyond it.
    { kind: 'mound', center: [0, 0], radius: 17, height: -3.2 },
    { kind: 'mound', center: [0, 0], radius: 26, height: 0.55 },
    // The hill of Ammah, well east along the pursuit route.
    { kind: 'mound', center: [230, 50], radius: 58, height: 17 },
    // A gentle, shallow drainage toward the pool from the surrounding
    // plateau — legibility only, not a claimed wadi course.
    {
      kind: 'channel',
      path: [
        [-220, -40],
        [-60, -10],
        [0, 0],
      ],
      width: 40,
      depth: 1.4,
    },
  ],
  colors: {
    base: '#c9bd93',
    scrub: '#8a8f5e',
    rocky: '#b6ab8b',
    moistureOffset: [12.4, -30.2],
    moistureThreshold: 0.47,
    moistureStrength: 0.32,
    // Drier and more exposed than Hebron's terraced palette (brief's
    // "rockier high ground typical of the Gibeon plateau").
    rockyFromY: 7,
    rockyFullY: 22,
    rockyStrength: 0.6,
    zones: [
      { center: [0, 0], radius: 34, color: '#cdbfa0', strength: 0.3 }, // pale ground around the pool
      { center: [230, 50], radius: 65, color: '#b3a37c', strength: 0.22 }, // the hill of Ammah
    ],
  },
  size: 1600,
  segments: 200,
};

export const GIBEON_TERRAIN: Terrain = createTerrain(GIBEON_TERRAIN_SPEC);
