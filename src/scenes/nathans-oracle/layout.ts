import * as THREE from 'three';
import {
  CONSTRUCTION_GROUND_CENTER,
  ENCLOSURE_RADIUS,
  GATE_POSTS,
  GATE_X,
  GATE_Z,
  GIHON_CENTER,
  GIHON_RADIUS,
  STRONGHOLD_CENTER,
  TERRACE_SEGMENTS,
  WALL_RING_SEGMENTS,
} from '../jerusalem-stronghold/layout';
import { TENT_HEIGHT, TENT_POS, TENT_RADIUS } from '../ark-into-jerusalem/layout';

/**
 * Deterministic, scene-local layout for nathans-oracle (ADR-006 conventions,
 * mirroring ark-into-jerusalem's own layout.ts). 1 unit = 1 meter, positions
 * are x/z only (height sampled from terrain.ts at render time). See
 * docs/design/nathans-oracle-brief.md, "Visual composition" and "Camera /
 * observer experience".
 *
 * Everything imported above is jerusalem-stronghold's/ark-into-jerusalem's
 * own terrain/enclosure/tent geometry, reused unchanged (re-exported here so
 * the rest of this scene's files have one place to import scene-local layout
 * from) — per the brief's "reuses jerusalem-stronghold's terrain, enclosure,
 * and palette rather than building new Jerusalem geometry" and "the tent...
 * reused from ark-into-jerusalem unchanged." Only the points and the one new
 * route curve below this line are new to this scene. No new `TerrainSpec`.
 */
export {
  ENCLOSURE_RADIUS,
  GATE_POSTS,
  GATE_X,
  GATE_Z,
  GIHON_CENTER,
  GIHON_RADIUS,
  STRONGHOLD_CENTER,
  TERRACE_SEGMENTS,
  WALL_RING_SEGMENTS,
  TENT_HEIGHT,
  TENT_POS,
  TENT_RADIUS,
};

// ---------------------------------------------------------------------------
// David's house (`claim-davids-house-complete`) — the exact ground
// jerusalem-stronghold's construction site occupied (`CONSTRUCTION_GROUND_
// CENTER`, `claim-hiram-building`), now shown complete. Re-anchored at the
// same point deliberately, not relocated: this is the same structure,
// finished, not a new one.

export const HOUSE_CENTER: [number, number] = CONSTRUCTION_GROUND_CENTER;
export const HOUSE_W = 8;
export const HOUSE_D = 7;
export const HOUSE_H = 3.1;
/** Unrotated by deliberate choice, matching Household.tsx's own convention:
 * the doorway sits on the house's local -z wall face, which keeps that
 * face's outward normal pointing toward the reception ground (south, lower
 * z) below without a separate rotation-aware placement computation. */
export const HOUSE_ROT = 0;

/** The reception ground (7:1–3, 7:17) — an open courtyard/entrance space in
 * front of (south of) the house, consistent with the four-room-house
 * comparative form already used for the Kiriath-jearim and household
 * staging in M7 — never an interior the project has not modeled. */
export const HOUSE_COURT_POS: [number, number] = [
  HOUSE_CENTER[0],
  HOUSE_CENTER[1] - HOUSE_D / 2 - 3.5,
];
export const DAVID_HOUSE_POS: [number, number] = [HOUSE_COURT_POS[0] - 1.6, HOUSE_COURT_POS[1]];
export const NATHAN_HOUSE_POS: [number, number] = [HOUSE_COURT_POS[0] + 1.6, HOUSE_COURT_POS[1]];

// ---------------------------------------------------------------------------
// The night-stillness beat (7:4–17) — a quiet, unremarkable corner of the
// same enclosure, disclosed as a placeholder position within this scene's
// own terrain, not a claimed identification and with no atlas pin — the
// same treatment Perez-uzzah's threshing floor received.

export const NIGHT_CORNER_POS: [number, number] = [-15, 90];

// ---------------------------------------------------------------------------
// David's short walk from the house to the tent (`b-walk-to-tent`) — a
// distinct interior route from every other curve already built at this
// enclosure (jerusalem-stronghold's APPROACH_CURVE, its own ASCENT_CURVE,
// ark-into-jerusalem's ARRIVAL_CURVE): a short walk within an already-
// occupied city, not an approach, an ascent, or a festival arrival.

export const WALK_TO_TENT_CURVE = new THREE.CatmullRomCurve3(
  [
    new THREE.Vector3(HOUSE_COURT_POS[0], 0, HOUSE_COURT_POS[1]),
    new THREE.Vector3(6, 0, 62),
    new THREE.Vector3(-2, 0, 70),
    new THREE.Vector3(TENT_POS[0] + 2.6, 0, TENT_POS[1] - 1.6),
  ],
  false,
  'catmullrom',
  0.5,
);

/** Where David sits "before the LORD" (7:18a) — just outside/at the tent's
 * own entrance, not an interior this project has never modeled. Matches the
 * walk curve's own endpoint exactly (one source of truth). */
export const DAVID_TENT_SIT_POS: [number, number] = [TENT_POS[0] + 2.6, TENT_POS[1] - 1.6];
