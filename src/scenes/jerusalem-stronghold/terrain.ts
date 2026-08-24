import { createTerrain, type Terrain, type TerrainSpec } from '../../engine/terrain';

/**
 * Jerusalem terrain (M6, jerusalem-stronghold): the project's first geometry
 * at Jerusalem. A narrow, steep-sided southeastern ridge running roughly
 * north-south — the Kidron valley falling away to the east (+x), a shallower
 * valley to the west (-x), the ridge climbing to a saddle at its north end
 * (+z) where it continues, off-composition, toward the wider high ground
 * later tradition associates with the Temple Mount (not rendered — outside
 * this chapter's scope). This orientation is the real compass bearing of the
 * City of David ridge, not a staging convenience (contrast hebron-covenant's
 * disclosed non-compass "northern road").
 *
 * `claim-jerusalem-terrain-form` (the disclosed terrain-form claim, modeled
 * on `claim-gibeon-terrain-form`): the landform's broad shape is well
 * established by historical geography, but its exact profile is this
 * project's own approximation, not DEM-derived. Palette and vegetation
 * vocabulary are carried over directly from hebron-anointing's Judean
 * highland material language (limestone, terracing, olive) per the brief's
 * "Visual composition" — the landform is new, the region is not.
 *
 * Landform features:
 *  - a `ridge` feature is the spine itself;
 *  - two `channel` features carve the flanking valleys (Kidron deeper/more
 *    dramatic to the east, the western valley shallower);
 *  - a `flatten` feature levels the small summit at the ridge's north end
 *    where the stronghold enclosure sits (`layout.ts`'s STRONGHOLD_CENTER);
 *  - a `mound` feature suggests the ridge's rise toward the saddle and the
 *    wider high ground further north, without rendering anything at it;
 *  - a `basin` feature is the Gihon spring's outflow at the eastern foot
 *    (`claim-gihon-spring`) — the exact place the tsinnôr dispute is about.
 *
 * Terracing on the eastern slope (the ground the Millo question is about,
 * `claim-millo-identification`) renders as a separate instanced-wall
 * component (`TerraceWalls.tsx`), not a terrain-height feature — the same
 * device hebron-anointing/hebron-covenant/hebron-gate already use for
 * agricultural terracing, extended here to the specific slope 5:9 names.
 */
export const JERUSALEM_TERRAIN_SPEC: TerrainSpec = {
  hills: [
    { frequency: 0.0038, amplitude: 6, octaves: 4, offset: [31.2, -18.4] },
    { frequency: 0.019, amplitude: 1.5, octaves: 3, offset: [-9.1, 26.7] },
  ],
  features: [
    // The ridge spine itself — narrow (width 30) and, by this project's
    // standards, modest in height (32m of local relief), per the brief's
    // "small, narrow, and steep-sided" and the conservative-render policy
    // (claim-jebusite-stronghold-form).
    { kind: 'ridge', start: [0, -130], end: [0, 130], width: 30, height: 32 },
    // The Kidron valley, east of the ridge — the deeper, more dramatic drop.
    {
      kind: 'channel',
      path: [
        [62, -160],
        [58, -60],
        [55, 0],
        [58, 60],
        [64, 160],
      ],
      width: 60,
      depth: 24,
    },
    // The valley west of the ridge (the central/Tyropoeon-direction valley)
    // — a shallower carve than the Kidron, per the brief's relative
    // topography (register: a disclosed relative-depth choice, not a
    // surveyed profile).
    {
      kind: 'channel',
      path: [
        [-58, -160],
        [-54, -60],
        [-52, 0],
        [-54, 60],
        [-60, 160],
      ],
      width: 60,
      depth: 15,
    },
    // A level summit at the ridge's north/high end for the stronghold
    // enclosure (STRONGHOLD_CENTER, layout.ts).
    { kind: 'flatten', center: [0, 72], radius: 30, strength: 0.55 },
    // The saddle rising further north, toward the wider high ground the
    // ridge continues into (unrendered, off-composition) — Historical
    // intent #2's "climbing to a saddle at its north end."
    { kind: 'mound', center: [0, 150], radius: 80, height: 14 },
    // The Gihon spring's outflow, at the foot of the eastern slope
    // (`claim-gihon-spring`) — modest, disclosed dimensions, the
    // gibeon-pool basin convention.
    { kind: 'basin', center: [48, -6], radius: 8, depth: 1.6, flatRadius: 4 },
  ],
  colors: {
    // Carried directly from hebron-anointing's Judean-highland palette
    // values (claim-jerusalem-terrain-form's notes) rather than inventing a
    // new material language.
    base: '#c3ae85',
    scrub: '#7c8256',
    rocky: '#ad9a72',
    moistureOffset: [24.6, -8.3],
    moistureThreshold: 0.44,
    moistureStrength: 0.42,
    rockyFromY: 10,
    rockyFullY: 28,
    rockyStrength: 0.7,
    zones: [
      { center: [0, 72], radius: 55, color: '#cdbe93', strength: 0.3 }, // pale stronghold ground
      { center: [50, -6], radius: 30, color: '#8a9166', strength: 0.28 }, // damp ground near the spring
    ],
  },
  size: 1500,
  segments: 190,
};

export const JERUSALEM_TERRAIN: Terrain = createTerrain(JERUSALEM_TERRAIN_SPEC);
