import * as THREE from 'three';
import { mulberry32 } from '../../engine/noise';

/**
 * Deterministic, scene-local layout for jerusalem-stronghold (ADR-006
 * conventions; a fresh generator). 1 unit = 1 meter. Coordinates match
 * terrain.ts's real-compass orientation: +x east (toward the Kidron), -x
 * west, +z north (toward the saddle/rising ground), -z south (the narrower,
 * lower tip of the ridge). See docs/design/jerusalem-stronghold-brief.md,
 * "Visual composition" and "Camera / observer experience".
 *
 * Two routes are kept deliberately distinct, per the brief's hardest
 * staging constraint: `APPROACH_CURVE` (David's men, the capture beats) and
 * `ASCENT_CURVE` (the observer's own post-capture walk from the spring up
 * the terraced eastern slope to the enclosure) never share geometry — the
 * ascent must never read as a reenactment of an assault route.
 */

// ---------------------------------------------------------------------------
// The stronghold enclosure — small, modest, at the ridge's high (north) end.

export const STRONGHOLD_CENTER: [number, number] = [0, 72];
export const ENCLOSURE_RADIUS = 26;
export const ENCLOSURE_WALL_HEIGHT = 2.6;

/** Gate gap half-angle either side of due south (radians) — the approach's
 * arrival side. A single, simple gap in the wall ring, not a chamber. */
const GATE_HALF_ANGLE = 0.26;
export const GATE_Z = STRONGHOLD_CENTER[1] - ENCLOSURE_RADIUS;
export const GATE_X = STRONGHOLD_CENTER[0];
export const GATE_POSTS: [number, number][] = [
  [STRONGHOLD_CENTER[0] - 3.2, GATE_Z + 1.4],
  [STRONGHOLD_CENTER[0] + 3.2, GATE_Z + 1.4],
];

export interface WallSegment {
  x: number;
  z: number;
  yaw: number;
  len: number;
}

const WALL_RING_SEGMENTS_PER_TURN = 56;

/** The stone circuit itself (`claim-jebusite-stronghold-form`, `asset-
 * jerusalem-stronghold-form`): a ring of short wall segments around
 * `STRONGHOLD_CENTER`, broken only at the gate gap (due south, +/-
 * GATE_HALF_ANGLE) — a modest circuit with a simple gateway, deliberately
 * not a monumental fortification. */
export const WALL_RING_SEGMENTS: WallSegment[] = (() => {
  const out: WallSegment[] = [];
  for (let i = 0; i < WALL_RING_SEGMENTS_PER_TURN; i++) {
    const theta = (i / WALL_RING_SEGMENTS_PER_TURN) * Math.PI * 2;
    // theta=0 points south (-z), matching the gate's due-south position.
    const angleFromGate = Math.atan2(Math.sin(theta), Math.cos(theta));
    if (Math.abs(angleFromGate) < GATE_HALF_ANGLE) continue;
    const x = STRONGHOLD_CENTER[0] + Math.sin(theta) * ENCLOSURE_RADIUS;
    const z = STRONGHOLD_CENTER[1] - Math.cos(theta) * ENCLOSURE_RADIUS;
    out.push({ x, z, yaw: theta, len: 2.6 });
  }
  return out;
})();

// ---------------------------------------------------------------------------
// Terracing on the eastern slope (the Millo question's own ground,
// `claim-millo-identification`) — bands of wall segments running roughly
// parallel to the ridge axis (north-south), stacked at increasing distance
// east of the crest, following the same instanced short-segment convention
// hebron-anointing's TERRACE_SEGMENTS established, adapted from concentric
// rings (appropriate to a hill-town mound) to parallel bands (appropriate to
// an elongated ridge flank).

export interface TerraceSegment {
  x: number;
  z: number;
  yaw: number;
  len: number;
}

const TERRACE_X_BANDS = [12, 20, 29, 38, 47];
const TERRACE_SEGMENTS_PER_BAND = 15;
const TERRACE_Z_RANGE: [number, number] = [-26, 66];

export const TERRACE_SEGMENTS: TerraceSegment[] = (() => {
  const rng = mulberry32(240601);
  const out: TerraceSegment[] = [];
  for (const bandX of TERRACE_X_BANDS) {
    for (let i = 0; i < TERRACE_SEGMENTS_PER_BAND; i++) {
      const t = i / (TERRACE_SEGMENTS_PER_BAND - 1);
      const z = TERRACE_Z_RANGE[0] + t * (TERRACE_Z_RANGE[1] - TERRACE_Z_RANGE[0]);
      const x = bandX + (rng() - 0.5) * 3;
      // yaw = PI/2 orients the segment's long axis along world z (parallel
      // to the ridge), matching a contour line on an elongated N-S ridge.
      out.push({ x, z: z + (rng() - 0.5) * 2, yaw: Math.PI / 2, len: 3.4 + rng() * 1.6 });
    }
  }
  return out;
})();

// ---------------------------------------------------------------------------
// The Gihon spring, at the foot of the eastern slope (`claim-gihon-spring`)
// — matches terrain.ts's basin feature center/radius exactly.

export const GIHON_CENTER: [number, number] = [48, -6];
export const GIHON_RADIUS = 8;

// ---------------------------------------------------------------------------
// The construction ground (b-hiram), inside/beside the enclosure.

export const CONSTRUCTION_GROUND_CENTER: [number, number] = [16, 66];

// ---------------------------------------------------------------------------
// The approach route (David's men, the capture beats): from open ground
// south of the ridge, up to the enclosure's gate. Deliberately distinct
// geometry from ASCENT_CURVE below.

export const APPROACH_CURVE = new THREE.CatmullRomCurve3(
  [
    new THREE.Vector3(-16, 0, -300),
    new THREE.Vector3(-10, 0, -220),
    new THREE.Vector3(4, 0, -140),
    new THREE.Vector3(-6, 0, -60),
    new THREE.Vector3(2, 0, 10),
    new THREE.Vector3(GATE_X, 0, GATE_Z),
  ],
  false,
  'catmullrom',
  0.5,
);

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
// The observer's own post-capture ascent (spring -> terraces -> enclosure),
// framed explicitly (in beat/viewpoint copy, never in figure choreography)
// as an observer's walk after the capture, not a reenactment of an assault
// route — the brief's single strongest walk-emphasis constraint. No figure
// ever walks this curve; it exists only to back the vp-gihon -> vp-terraces
// -> vp-stronghold viewpoint sequence and its captions.

export const ASCENT_CURVE = new THREE.CatmullRomCurve3(
  [
    new THREE.Vector3(GIHON_CENTER[0], 0, GIHON_CENTER[1]),
    new THREE.Vector3(40, 0, 12),
    new THREE.Vector3(27, 0, 32),
    new THREE.Vector3(12, 0, 52),
    new THREE.Vector3(2, 0, 62),
    new THREE.Vector3(STRONGHOLD_CENTER[0], 0, STRONGHOLD_CENTER[1]),
  ],
  false,
  'catmullrom',
  0.5,
);

// ---------------------------------------------------------------------------
// Rejection-sampled gathering areas (ADR-006 convention).

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

/** David's force, once redistributed inside the enclosure as an occupying
 * presence (b-dwelling onward) — a ring clear of the construction ground.
 * Kept within the ~26m enclosure radius (offset 6.3m + rMax 16m < 26m). */
export const DAVIDS_OCCUPY_SLOTS: [number, number][] = rejectionSampleAnnulus(
  70,
  240101,
  [STRONGHOLD_CENTER[0] - 6, STRONGHOLD_CENTER[1] - 2],
  3,
  16,
  1.9,
);

/** The ambient settlement presence, a separate cluster inside the enclosure
 * from David's force and the construction ground. Kept within the ~26m
 * enclosure radius (offset 15.2m + rMax 9m < 26m). */
export const AMBIENT_SETTLEMENT_SLOTS: [number, number][] = rejectionSampleAnnulus(
  40,
  240102,
  [STRONGHOLD_CENTER[0] - 14, STRONGHOLD_CENTER[1] + 6],
  2,
  9,
  1.8,
);

/** Tyrian craftsmen, clustered around the construction ground. */
export const TYRIAN_CRAFTSMEN_SLOTS: [number, number][] = rejectionSampleAnnulus(
  24,
  240103,
  CONSTRUCTION_GROUND_CENTER,
  2,
  11,
  1.7,
);

/** The Jebusite population, visible along the wall line facing the approach
 * (south/southeast arc) during b-approach/b-taunt — never inside the
 * enclosure with David's force, never enacting the taunt itself. */
export interface WallFigureSlot {
  x: number;
  z: number;
  yaw: number;
}

export function buildWallFigureSlots(count: number, seed = 240104): WallFigureSlot[] {
  const rng = mulberry32(seed);
  const out: WallFigureSlot[] = [];
  const spanHalf = Math.PI * 0.62; // an arc facing the approach, not the full ring
  for (let i = 0; i < count; i++) {
    const theta = (rng() * 2 - 1) * spanHalf;
    const r = ENCLOSURE_RADIUS + 1.4 + rng() * 1.6;
    const x = STRONGHOLD_CENTER[0] + Math.sin(theta) * r;
    const z = STRONGHOLD_CENTER[1] - Math.cos(theta) * r;
    // Facing outward/south, down toward the approaching column.
    out.push({ x, z, yaw: theta + Math.PI });
  }
  return out;
}

export const JEBUSITE_WALL_SLOTS: WallFigureSlot[] = buildWallFigureSlots(40);
