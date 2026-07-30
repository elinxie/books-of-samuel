import * as THREE from 'three';
import { mulberry32 } from '../../engine/noise';
import { HILL_OF_AMMAH_CENTER, POOL_RADIUS } from './terrain';

/**
 * Deterministic, scene-local layout for gibeon-pool (ADR-006 conventions,
 * mirroring hebron-anointing/gilboa-battle's layout.ts). 1 unit = 1 meter.
 * -z is the bank Abner's Israel/Benjamin company occupies (2:13's "one side
 * of the pool"); +z is the bank Joab's Judah company occupies (2:13's "the
 * other side") — the two-councils-across-water tableau the brief asks be
 * composed first (`vp-pool`). +x is the direction Abner's flight, Asahel's
 * pursuit, and the hill of Ammah all lie in — the same direction the
 * narrative's own flight ultimately continues in, toward Mahanaim
 * (Transjordan, off-scene, referenced only). Positions are x/z only — height
 * is sampled from terrain.ts at render time, never baked in here.
 */

export interface FigureSlot {
  x: number;
  z: number;
  /** Facing, radians (yaw around Y). */
  yaw: number;
}

/** Yaw (radians) to face from (fromX, fromZ) toward (toX, toZ). */
export function yawToward(fromX: number, fromZ: number, toX: number, toZ: number): number {
  return Math.atan2(toX - fromX, toZ - fromZ);
}

// ---------------------------------------------------------------------------
// Focal centers (brief, "Visual composition", focal masses 1-5).

/** Abner's Israel/Benjamin bank — the north side of the pool. */
export const ABNER_BANK_CENTER: [number, number] = [0, -32];
/** Joab's Judah bank — the south side of the pool. */
export const JOAB_BANK_CENTER: [number, number] = [0, 32];

/** Where the wider clash first spreads to, once the contest ignites (2:17). */
export const ABNER_SPREAD_CENTER: [number, number] = [70, -25];
export const JOAB_SPREAD_CENTER: [number, number] = [40, 18];

/** Where Joab/Abishai's pursuit finally halts, at the hill's foot, looking
 * up at the rallying Benjaminite band (brief: "the hill of Ammah vantage
 * looks up at the rallying band from the pursuers' side"). */
export const HILL_BASE_POS: [number, number] = [232, -10];
/** Where Abner stands once he reaches the hill crest, addressing Joab below. */
export const HILL_CREST_ABNER_POS: [number, number] = [265, -2];

// ---------------------------------------------------------------------------
// The champions' ground (2:14-16): twelve-vs-twelve, fixed literal count, at
// the pool's edge — close enough to hold both the pool and the contest in
// one frame from the default viewpoint (brief, "Focal masses" (b)).

export const CHAMPION_PAIR_COUNT = 12;
const CHAMPIONS_X_HALF_SPAN = 33;
export const CHAMPIONS_Z_BENJAMIN = -(POOL_RADIUS + 4);
export const CHAMPIONS_Z_JUDAH = POOL_RADIUS + 4;

export interface ChampionPairSlot {
  x: number;
  benjaminZ: number;
  judahZ: number;
}

/** One slot per pair, evenly spread along the pool's edge with a small
 * seeded jitter so the line doesn't read as ruler-straight. */
export const CHAMPION_PAIR_SLOTS: ChampionPairSlot[] = (() => {
  const rng = mulberry32(230101);
  const out: ChampionPairSlot[] = [];
  for (let i = 0; i < CHAMPION_PAIR_COUNT; i++) {
    const frac = CHAMPION_PAIR_COUNT > 1 ? i / (CHAMPION_PAIR_COUNT - 1) - 0.5 : 0;
    const x = frac * CHAMPIONS_X_HALF_SPAN * 2 + (rng() - 0.5) * 2.2;
    out.push({
      x,
      benjaminZ: CHAMPIONS_Z_BENJAMIN + (rng() - 0.5) * 1.6,
      judahZ: CHAMPIONS_Z_JUDAH + (rng() - 0.5) * 1.6,
    });
  }
  return out;
})();

// ---------------------------------------------------------------------------
// Principal flight paths: Abner's retreat (bank -> spread -> the point where
// he kills Asahel -> the hill crest), Asahel's pursuit (bank -> spread ->
// exactly the same death point), and Joab/Abishai's pursuit (bank -> spread
// -> a brief pause at the same death point (2:23b's "stood still") -> the
// hill's foot). Asahel's and Joab's curves are built to terminate/pass
// through the identical `ASAHEL_DEATH_POS` world point Abner's own curve
// reaches at u=0.5, so the three principals' paths genuinely converge rather
// than merely occupying nearby but separate points.

export const ABNER_FLIGHT_CURVE = new THREE.CatmullRomCurve3(
  [
    new THREE.Vector3(0, 0, -28),
    new THREE.Vector3(50, 0, -27),
    new THREE.Vector3(100, 0, -32),
    new THREE.Vector3(160, 0, -34),
    new THREE.Vector3(215, 0, -26),
    new THREE.Vector3(HILL_CREST_ABNER_POS[0], 0, HILL_CREST_ABNER_POS[1]),
  ],
  false,
  'catmullrom',
  0.5,
);

/** The exact point, along Abner's flight curve, where he halts and kills
 * Asahel (2:23) — open ground away from Gibeon, distinct from the pool
 * ground and the champions' ground (brief, "Focal masses" (d)). */
const deathPoint = ABNER_FLIGHT_CURVE.getPointAt(0.5);
export const ASAHEL_DEATH_POS: [number, number] = [deathPoint.x, deathPoint.z];

export const ASAHEL_FLIGHT_CURVE = new THREE.CatmullRomCurve3(
  [
    new THREE.Vector3(0, 0, 30),
    new THREE.Vector3(45, 0, 18),
    new THREE.Vector3(90, 0, -2),
    new THREE.Vector3(ASAHEL_DEATH_POS[0], 0, ASAHEL_DEATH_POS[1]),
  ],
  false,
  'catmullrom',
  0.5,
);

export const JOAB_FLIGHT_CURVE = new THREE.CatmullRomCurve3(
  [
    new THREE.Vector3(0, 0, 28),
    new THREE.Vector3(40, 0, 20),
    new THREE.Vector3(80, 0, 5),
    new THREE.Vector3(ASAHEL_DEATH_POS[0], 0, ASAHEL_DEATH_POS[1]),
    new THREE.Vector3(HILL_BASE_POS[0], 0, HILL_BASE_POS[1]),
  ],
  false,
  'catmullrom',
  0.5,
);
/** Parametric `u` on `JOAB_FLIGHT_CURVE` at which the curve passes the death
 * point (the 4th of 5 control points) — a design-choice approximation, not
 * an exact arc-length solve (allowed placeholder: "exact figure positions"). */
export const JOAB_U_AT_DEATH_POINT = 0.6;

const tmpPos = new THREE.Vector3();
const tmpTan = new THREE.Vector3();

/** Position + facing yaw at parametric `u` along a travel curve. */
export function curvePose(curve: THREE.CatmullRomCurve3, u: number): FigureSlot {
  const clamped = Math.min(1, Math.max(0, u));
  curve.getPointAt(clamped, tmpPos);
  curve.getTangentAt(Math.max(0.001, clamped), tmpTan);
  return { x: tmpPos.x, z: tmpPos.z, yaw: Math.atan2(tmpTan.x, tmpTan.z) };
}

/** A position offset laterally (perpendicular to travel) from a curve sample
 * — used to keep Abishai a step beside Joab rather than exactly on top of
 * him, without needing a fully independent curve. */
export function curvePoseOffset(
  curve: THREE.CatmullRomCurve3,
  u: number,
  lateral: number,
): FigureSlot {
  const base = curvePose(curve, u);
  const nx = Math.cos(base.yaw) * lateral;
  const nz = -Math.sin(base.yaw) * lateral;
  return { x: base.x + nx, z: base.z + nz, yaw: base.yaw };
}

// ---------------------------------------------------------------------------
// Crowd gathering slots (rejection-sampled, ADR-006 convention).

function rejectionSampleAnnulus(
  count: number,
  seed: number,
  center: [number, number],
  rMin: number,
  rMax: number,
  minSpacing: number,
  guardMul = 80,
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

/** Abner's Israel/Benjamin company, gathered at the north bank (brief:
 * ~35-45 figures at high quality tier — claim-gibeon-battle-scale). */
export const ABNER_BANK_SLOTS: [number, number][] = rejectionSampleAnnulus(
  48,
  230201,
  ABNER_BANK_CENTER,
  3,
  26,
  2.0,
);

/** Joab's Judah company, gathered at the south bank (brief: ~30-40 figures
 * at high quality tier). */
export const JOAB_BANK_SLOTS: [number, number][] = rejectionSampleAnnulus(
  42,
  230202,
  JOAB_BANK_CENTER,
  3,
  24,
  2.0,
);

/** Where a falling/holding Abner-side figure settles once the wider battle
 * spreads (b-battle-spreads, 2:17). */
export const ABNER_SPREAD_SLOTS: [number, number][] = rejectionSampleAnnulus(
  48,
  230301,
  ABNER_SPREAD_CENTER,
  4,
  34,
  2.2,
);

/** Where a holding/falling Joab-side figure settles once the wider battle
 * spreads. */
export const JOAB_SPREAD_SLOTS: [number, number][] = rejectionSampleAnnulus(
  42,
  230302,
  JOAB_SPREAD_CENTER,
  4,
  30,
  2.2,
);

/** The rallying Benjaminite band atop the hill of Ammah (2:25) — a subset
 * drawn from Abner's own contingent, not additive (brief: ~12-18 figures). */
export const HILL_CREST_SLOTS: [number, number][] = rejectionSampleAnnulus(
  20,
  230401,
  HILL_OF_AMMAH_CENTER,
  4,
  20,
  2.2,
);

/** Joab's pursuing cluster gathered at the hill's foot, facing up at the
 * rallying band — likewise a subset drawn from Joab's own contingent. */
export const HILL_BASE_SLOTS: [number, number][] = rejectionSampleAnnulus(
  18,
  230402,
  HILL_BASE_POS,
  3,
  16,
  2.0,
);
