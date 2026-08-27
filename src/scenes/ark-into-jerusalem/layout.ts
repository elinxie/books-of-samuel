import * as THREE from 'three';
import { mulberry32 } from '../../engine/noise';
import {
  AMBIENT_SETTLEMENT_SLOTS,
  CONSTRUCTION_GROUND_CENTER,
  ENCLOSURE_RADIUS,
  GATE_POSTS,
  GATE_X,
  GATE_Z,
  GIHON_CENTER,
  GIHON_RADIUS,
  STRONGHOLD_CENTER,
  WALL_RING_SEGMENTS,
} from '../jerusalem-stronghold/layout';

/**
 * Deterministic, scene-local layout for ark-into-jerusalem (ADR-006
 * conventions, mirroring perez-uzzah/jerusalem-stronghold's own layout.ts).
 * 1 unit = 1 meter, positions are x/z only (height sampled from terrain.ts
 * at render time). See docs/design/ark-into-jerusalem-brief.md, "Visual
 * composition" and "Scale assumptions".
 *
 * Everything imported above is `jerusalem-stronghold`'s own terrain/
 * enclosure geometry, reused unchanged (re-exported here so the rest of
 * this scene's files have one place to import scene-local layout from) —
 * per the brief's "reuses jerusalem-stronghold's terrain, enclosure, and
 * palette rather than building new Jerusalem geometry." Only the points and
 * pools below this line are new to this scene.
 */
export {
  AMBIENT_SETTLEMENT_SLOTS,
  CONSTRUCTION_GROUND_CENTER,
  ENCLOSURE_RADIUS,
  GATE_POSTS,
  GATE_X,
  GATE_Z,
  GIHON_CENTER,
  GIHON_RADIUS,
  STRONGHOLD_CENTER,
  WALL_RING_SEGMENTS,
};

function rejectionSampleAnnulus(
  count: number,
  seed: number,
  center: [number, number],
  rMin: number,
  rMax: number,
  minSpacing: number,
  guardMul = 140,
): [number, number][] {
  const rng = mulberry32(seed);
  const slots: [number, number][] = [];
  let guard = 0;
  while (slots.length < count && guard++ < count * guardMul) {
    const angle = rng() * Math.PI * 2;
    const r = rMin + rng() * (rMax - rMin);
    const x = center[0] + Math.cos(angle) * r;
    const z = center[1] + Math.sin(angle) * r;
    if (slots.every(([sx, sz]) => (sx - x) ** 2 + (sz - z) ** 2 > minSpacing ** 2)) {
      slots.push([x, z]);
    }
  }
  return slots;
}

// ---------------------------------------------------------------------------
// New focal points (brief, "Visual composition" (a)-(e)).

/** The tent David pitched for the ark (6:17) — near the enclosure's own
 * center, offset west of the reused Hiram construction ground so the two
 * never overlap. Explicitly not the Gibeon tabernacle (claim-ark-tent-form) —
 * see Tent.tsx. */
export const TENT_POS: [number, number] = [-8, 76];
export const TENT_RADIUS = 3.2;
export const TENT_HEIGHT = 2.6;

/** The offering ground (6:13, 6:17-19a) — a modest altar, clear of both the
 * tent and the construction ground. */
export const OFFERING_GROUND_POS: [number, number] = [-10, 60];

/** Where the crowd gathers/dances once it reaches the enclosure — central
 * enough to keep the tent and the offering ground both close by. */
export const DANCE_GATHER_CENTER: [number, number] = [-2, 70];

/** Where bread, meat, and a raisin cake reach the whole multitude (6:19b) —
 * a distinct, clearly communal spot between the dance ground and the gate,
 * kept close enough to the enclosure's own center to leave enough clear
 * radius for its own large crowd pool (see DISTRIBUTION_SLOTS below). */
export const DISTRIBUTION_CENTER: [number, number] = [6, 62];

/** Michal's household room (6:16, 6:20) — a small, modest addition to the
 * same partially-built house `jerusalem-stronghold` established
 * (`claim-hiram-building`, reused unchanged elsewhere in this scene): a
 * partially built house can still have one occupied, functional room. Placed
 * just south of the reused construction-ground props, never overlapping
 * them. Never advances the house past its established under-construction
 * state (Resolved design calls) — this is one small room, not a finished
 * wing. */
export const HOUSEHOLD_POS: [number, number] = [14, 54];
export const HOUSEHOLD_W = 4.6;
export const HOUSEHOLD_D = 3.8;
export const HOUSEHOLD_H = 2.4;
/** Unrotated by deliberate choice: the window opening sits on the room's
 * local -x wall face, and this keeps that face's outward normal pointing
 * exactly toward WINDOW_POS below (world -x from HOUSEHOLD_POS) without
 * needing a separate rotation-aware placement computation. */
export const HOUSEHOLD_ROT = 0;

/** Michal's window (6:16) — a functional opening in the household room's own
 * wall, facing generally toward the dance ground so the b-window viewpoint
 * can frame David below and Michal at the opening in a single shot. */
export const WINDOW_POS: [number, number] = [
  HOUSEHOLD_POS[0] - HOUSEHOLD_W / 2 - 0.15,
  HOUSEHOLD_POS[1],
];
export const WINDOW_HEIGHT = 1.85;

/** The confrontation ground (6:20b-22) — just outside the household room,
 * conversation-scale, modeled on hebron-reckoning's vp-receiving-ground
 * pattern: two named figures, small before each other, no crowd staged
 * inside this exact ground. */
export const CONFRONTATION_POS: [number, number] = [9.5, 49];

/** Where David pauses on his way back to bless his own household
 * (b-return-household, 6:20a), just before the confrontation itself. */
export const DAVID_RETURN_APPROACH: [number, number] = [3, 52];

// ---------------------------------------------------------------------------
// The arrival route: from off-composition, south of the ridge (the same
// real-world direction Obed-edom's house and Kiriath-jearim lie in,
// continuing perez-uzzah's own route corridor conceptually, not as shared
// literal geometry across two different scene terrains), through the
// enclosure's one gate, and in to the dance-gather ground. A different curve
// from jerusalem-stronghold's own APPROACH_CURVE (David's men, the capture
// beats) even though both end at the same real gate — this is a joyful
// arrival, not a restaging of that assault, and the two curves share no
// control points.
export const ARRIVAL_CURVE = new THREE.CatmullRomCurve3(
  [
    new THREE.Vector3(46, 0, -280),
    new THREE.Vector3(34, 0, -200),
    new THREE.Vector3(16, 0, -120),
    new THREE.Vector3(6, 0, -50),
    new THREE.Vector3(GATE_X, 0, GATE_Z - 4),
    new THREE.Vector3(GATE_X, 0, GATE_Z),
    new THREE.Vector3(
      DANCE_GATHER_CENTER[0] * 0.5,
      0,
      GATE_Z + (DANCE_GATHER_CENTER[1] - GATE_Z) * 0.6,
    ),
    new THREE.Vector3(DANCE_GATHER_CENTER[0], 0, DANCE_GATHER_CENTER[1]),
  ],
  false,
  'catmullrom',
  0.5,
);

// ---------------------------------------------------------------------------
// Crowd slot pools (rejection-sampled annuli, ADR-006 convention).

/** The procession's dance-ground gather slots — pool sized generously above
 * the high-tier target (~150-200), the same hebron-gate/perez-uzzah
 * raid-party-pool convention. */
export const DANCE_GATHER_SLOTS: [number, number][] = rejectionSampleAnnulus(
  220,
  270601,
  DANCE_GATHER_CENTER,
  3,
  19,
  1.7,
  600,
);

/** The procession's distribution-beat slots (b-distribution, 6:19b) — a
 * distinct ground from the dance-gather slots, reached by a short walk. */
export const DISTRIBUTION_SLOTS: [number, number][] = rejectionSampleAnnulus(
  220,
  270602,
  DISTRIBUTION_CENTER,
  2,
  14,
  1.3,
  1400,
);

/** The ambient Jerusalem population's own distribution-beat convergence
 * slots — a separate, smaller ring around the same distribution ground, so
 * the reused ~20-30 ambient figures (jerusalem-stronghold's own population,
 * ranks not doubled) read as recipients alongside the procession, not
 * coincident with its figures. */
export const AMBIENT_DISTRIBUTION_SLOTS: [number, number][] = rejectionSampleAnnulus(
  40,
  270603,
  DISTRIBUTION_CENTER,
  9,
  16,
  2.0,
);

/** Household-ground slots (unused for now beyond the two named figures —
 * kept for parity with every other scene's layout.ts and for a future small
 * household-attendant pass, not rendered by this build). */
export const HOUSEHOLD_SLOTS: [number, number][] = rejectionSampleAnnulus(
  8,
  270604,
  HOUSEHOLD_POS,
  2,
  8,
  1.8,
);
