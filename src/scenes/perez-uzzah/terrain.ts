import { createTerrain, type Terrain, type TerrainSpec } from '../../engine/terrain';

/**
 * Perez-uzzah terrain (M7, 2 Samuel 6:1-11): a modest hill settlement
 * (Kiriath-jearim/Baale-judah) at the west end, giving onto an open route
 * corridor running east through gentle Judean highland terrain — new
 * geometry built from scratch (the hebron-anointing precedent for a
 * from-scratch terrain, per the brief's "Visual composition"), palette and
 * vegetation vocabulary carried over directly from the established
 * Judean-highland spec (hebron-anointing/jerusalem-stronghold/
 * rephaim-valley), not reinvented.
 *
 * Landform features:
 *  - a `mound` for the Kiriath-jearim hill itself, where the house of
 *    Abinadab sits and the new cart is loaded (`b-new-cart`, `vp-kiriath-
 *    jearim`);
 *  - a gentle `ramp` carrying the route corridor's overall eastward fall
 *    (the direction of travel, per the brief — no Jerusalem geometry
 *    renders anywhere in this scene, only the general direction of travel);
 *  - a `flatten` at the threshing floor of Nacon/Perez-uzzah — "an open,
 *    unremarkable flat working-ground, not a monument" (brief). This is a
 *    terrain-shape disclosure only; the site itself gets no LocationEntry
 *    and no atlas pin (Resolved design calls) — flattening the local ground
 *    is staging geometry, not a claimed identification;
 *  - a second, gentler `flatten` at Obed-edom's house diversion point,
 *    distinguishing its modest household ground from the open threshing
 *    floor without asserting a location for it either.
 *
 * No Jerusalem geometry renders anywhere in this scene, matching
 * rephaim-valley's stricter-than-required convention (the brief allows "at
 * most" an undetailed horizon ridge; this scene omits it entirely, since the
 * route's actual destination this session is Obed-edom's house, not the
 * city).
 */
export const KIRIATH_JEARIM_TERRAIN_SPEC: TerrainSpec = {
  hills: [
    { frequency: 0.0038, amplitude: 6, octaves: 4, offset: [-41.6, 22.9] },
    { frequency: 0.019, amplitude: 1.6, octaves: 3, offset: [12.4, -18.7] },
  ],
  features: [
    // Kiriath-jearim's own hill, west end of the composition.
    { kind: 'mound', center: [-190, 0], radius: 72, height: 24 },
    // The route corridor's overall eastward fall — the direction of travel,
    // not a claim about Jerusalem's actual distance or elevation.
    { kind: 'ramp', direction: [1, 0], start: -80, end: 280, drop: 18 },
    // The threshing floor of Nacon/Perez-uzzah (b-stumble/b-strike/
    // b-perez-uzzah) — open, unremarkable, deliberately not a landmark.
    { kind: 'flatten', center: [10, -15], radius: 34, strength: 0.55 },
    // Obed-edom's house diversion point — a gentler, smaller flatten, so it
    // reads as ordinary household ground rather than the threshing floor's
    // open working-ground.
    { kind: 'flatten', center: [165, 45], radius: 24, strength: 0.4 },
  ],
  colors: {
    // Carried directly from the established Judean-highland palette values
    // (hebron-anointing/jerusalem-stronghold/rephaim-valley) — the region is
    // not new here, only the landform.
    base: '#c3ae85',
    scrub: '#7c8256',
    rocky: '#ad9a72',
    moistureOffset: [-9.8, 27.3],
    moistureThreshold: 0.44,
    moistureStrength: 0.4,
    rockyFromY: 10,
    rockyFullY: 27,
    rockyStrength: 0.62,
    zones: [
      { center: [-190, 0], radius: 100, color: '#cdbe93', strength: 0.3 }, // pale hill-town ground
      { center: [10, -15], radius: 150, color: '#b8ab80', strength: 0.16 }, // open route corridor
      { center: [165, 45], radius: 70, color: '#8d9463', strength: 0.22 }, // household ground
    ],
  },
  size: 1400,
  segments: 180,
};

export const KIRIATH_JEARIM_TERRAIN: Terrain = createTerrain(KIRIATH_JEARIM_TERRAIN_SPEC);
