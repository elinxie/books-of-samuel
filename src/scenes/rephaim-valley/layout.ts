import * as THREE from 'three';
import { mulberry32 } from '../../engine/noise';

/**
 * Deterministic, scene-local layout for rephaim-valley (ADR-006 conventions).
 * 1 unit = 1 meter, positions are x/z only (height sampled from terrain.ts
 * at render time). The rim (David's high ground) runs along the west side
 * (x around -95, terrain.ts's `ridge`); the valley floor opens east of it;
 * the grove sits on the valley's eastern flank, off-center, per the brief's
 * "Visual composition".
 *
 * Two things this file deliberately does NOT do, per the brief's "Resolved
 * design calls": it does not give Baal-perazim a located, named position
 * distinct from "somewhere in the first engagement's own footprint" (no
 * LocationEntry, no atlas pin — BAAL_PERAZIM_MARKER below is a staged
 * placeholder point only, used for the naming beat's vantage), and it does
 * not model two coexisting Philistine deployments — `PHILISTINE_SPREAD_SLOTS`
 * is the one slot set both phases reuse (`b-return`'s "same ground, same
 * framing" is achieved by literally reusing the same positions, not by a
 * second, similar-looking set).
 */

export interface FigureSlot {
  x: number;
  z: number;
  /** Facing, radians (yaw around Y). */
  yaw: number;
}

function rejectionSampleEllipse(
  count: number,
  seed: number,
  center: [number, number],
  rx: number,
  rz: number,
  minSpacing: number,
  guardMul = 120,
): [number, number][] {
  const rng = mulberry32(seed);
  const slots: [number, number][] = [];
  let guard = 0;
  while (slots.length < count && guard++ < count * guardMul) {
    // Uniform-ish sampling within an ellipse via rejection on a unit disk,
    // scaled by the two radii — gives a loose, non-circular spread footprint
    // (the brief's "wide, loose deployment rather than a tight block").
    const angle = rng() * Math.PI * 2;
    const r = Math.sqrt(rng());
    const x = center[0] + Math.cos(angle) * r * rx;
    const z = center[1] + Math.sin(angle) * r * rz;
    if (slots.every(([sx, sz]) => (sx - x) ** 2 + (sz - z) ** 2 > minSpacing ** 2)) {
      slots.push([x, z]);
    }
  }
  return slots;
}

function rejectionSampleAnnulus(
  count: number,
  seed: number,
  center: [number, number],
  rMin: number,
  rMax: number,
  minSpacing: number,
  guardMul = 120,
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

export function samplePath(
  curve: THREE.CatmullRomCurve3,
  step = 7,
): { pos: THREE.Vector3; yaw: number }[] {
  const length = curve.getLength();
  const n = Math.max(1, Math.floor(length / step));
  const out: { pos: THREE.Vector3; yaw: number }[] = [];
  for (let i = 0; i <= n; i++) {
    const u = i / n;
    const pos = curve.getPointAt(u);
    const tan = curve.getTangentAt(Math.max(0.001, u));
    out.push({ pos, yaw: Math.atan2(tan.x, tan.z) });
  }
  return out;
}

// ---------------------------------------------------------------------------
// The Philistine spread (5:18, 5:22 — "came up yet again... and spread
// themselves"): one slot set, reused verbatim for both phases (the brief's
// hinge: "the same instanced population moved").

export const PHILISTINE_SPREAD_CENTER: [number, number] = [25, -15];
export const PHILISTINE_SPREAD_SLOTS: [number, number][] = rejectionSampleEllipse(
  90,
  250101,
  PHILISTINE_SPREAD_CENTER,
  65,
  35,
  4.6,
);

/** Baal-perazim's staged position (5:20b) — a disclosed placeholder point
 * within the first engagement's own footprint, not a separate located site
 * (no LocationEntry, no atlas pin; see the brief's "Resolved design calls"). */
export const BAAL_PERAZIM_MARKER: [number, number] = [32, -10];

// ---------------------------------------------------------------------------
// The grove (the bekaim of 5:23-24) — small, ordinary, on the valley's
// eastern flank, off-center from the Philistine spread.

export const GROVE_CENTER: [number, number] = [100, 30];
export const GROVE_RADIUS = 20;

// ---------------------------------------------------------------------------
// David's force: a rim gathering ground, plus the routes it walks.

export const DAVIDS_RIM_CENTER: [number, number] = [-102, -32];
/** The forward edge of the rim, where the column steps off toward the
 * valley — every route curve below starts here. */
export const RIM_EDGE: [number, number] = [-75, -6];

/** David and the small inquiry group's own standing point (5:19, 5:23) —
 * near the rim edge but deliberately set apart from the wider force's
 * gathering ground below, per the brief's "a small, still, waiting group
 * set apart from the force". */
export const DAVID_INQUIRY_POS: [number, number] = [-80, -2];

export const DAVIDS_RIM_SLOTS: [number, number][] = rejectionSampleAnnulus(
  70,
  250201,
  DAVIDS_RIM_CENTER,
  3,
  24,
  2.2,
);

/** Phase-one advance (5:20a): rim edge down into the valley, stopping short
 * of the Philistine spread — a closing line, never literal contact. */
export const ADVANCE_ROUTE_CURVE = new THREE.CatmullRomCurve3(
  [
    new THREE.Vector3(RIM_EDGE[0], 0, RIM_EDGE[1]),
    new THREE.Vector3(-45, 0, -9),
    new THREE.Vector3(-15, 0, -12),
    new THREE.Vector3(4, 0, -13),
  ],
  false,
  'catmullrom',
  0.5,
);

/** Phase-two flanking march (5:23b): from the rim, around the valley's
 * southern edge, then north up the far (eastern) flank to a point near the
 * grove — opposite the Philistine spread from the rim's own direction. The
 * scene's one strong walk affordance (`vp-flank-march`). */
export const FLANK_ROUTE_CURVE = new THREE.CatmullRomCurve3(
  [
    new THREE.Vector3(RIM_EDGE[0], 0, RIM_EDGE[1]),
    new THREE.Vector3(-60, 0, -95),
    new THREE.Vector3(10, 0, -135),
    new THREE.Vector3(80, 0, -95),
    new THREE.Vector3(112, 0, -15),
    new THREE.Vector3(102, 0, 16),
  ],
  false,
  'catmullrom',
  0.5,
);

/** The wait position near the grove (5:24) — the flanking march's end
 * point, held through the sound beat. */
export const GROVE_WAIT_POS: [number, number] = [
  FLANK_ROUTE_CURVE.getPointAt(1).x,
  FLANK_ROUTE_CURVE.getPointAt(1).z,
];

/** Phase-two engagement (5:25a): from the grove-side wait position,
 * converging on the Philistine spread from behind their position. */
export const ENGAGE_TWO_ROUTE_CURVE = new THREE.CatmullRomCurve3(
  [
    new THREE.Vector3(GROVE_WAIT_POS[0], 0, GROVE_WAIT_POS[1]),
    new THREE.Vector3(70, 0, 6),
    new THREE.Vector3(45, 0, -8),
    new THREE.Vector3(28, 0, -14),
  ],
  false,
  'catmullrom',
  0.5,
);
