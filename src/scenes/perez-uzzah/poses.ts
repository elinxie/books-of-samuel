import * as THREE from 'three';
import type { ViolenceMode } from '../../state/store';
import {
  ABINADAB_HOUSE_POS,
  ARK_SETTLE_POS,
  COLUMN_SETTLE_CENTER,
  ROUTE_CURVE,
  THRESHING_FLOOR_U,
} from './layout';

/**
 * Pure, beat-driven pose/timing choreography for perez-uzzah (ADR-007
 * convention, mirroring rephaim-valley/hebron-gate's poses.ts). Beat times
 * match `src/data/scenes.ts`'s `perez-uzzah` entry exactly (`b-gathering`
 * through `b-close`) — see docs/design/perez-uzzah-brief.md, "Camera /
 * observer experience" and "Resolved design calls".
 *
 * Hard constraints carried here, load-bearing per the brief (queue #25):
 * - **Uzzah's reach is his own act, shown as gesture** (`uzzahPose`'s
 *   `reachExtend`) — a pivoting forearm/hand prop, never penetration or
 *   wound geometry. **No function in this file ever produces a light, glow,
 *   wind, or camera-implying-presence value for the divine strike itself**
 *   (ADR-013) — `fallen` is a whole-body collapse transform only, driven by
 *   `T_STRIKE`, and nothing here computes or exports anything that could be
 *   read as visualizing the cause, only the reach (his own act) and the
 *   fall (the stated worldly outcome).
 * - **Reduced mode elides the reach-and-fall entirely.** `uzzahPose` in
 *   `'reduced'` mode holds `reachExtend`/`fallen` at 0 through the whole
 *   timeline and instead fades Uzzah's own visibility out shortly after the
 *   stumble — "cut from the stumbling oxen directly to a held, still
 *   aftermath frame" (brief). The oxen stumble itself (`stumbleEnvelope`) is
 *   an ordinary physical event, not the divine sign, and renders identically
 *   in both modes.
 * - **No fight-stance or melee pose buckets anywhere** — this is a
 *   procession, never a battle.
 */

export const T_GATHERING = 0;
export const T_DEPARTURE = 14;
export const T_NEW_CART = 30;
export const T_MUSIC = 46;
export const T_STUMBLE = 78;
export const T_STRIKE = 92;
export const T_PEREZ_UZZAH = 106;
export const T_DAVID_AFRAID = 120;
export const T_DIVERSION = 136;
export const T_BLESSING = 150;
export const T_CLOSE = 164;
export const DURATION_SEC = 175;

export function clamp01(t: number): number {
  return Math.min(1, Math.max(0, t));
}

export function smoothstep(t: number): number {
  const c = clamp01(t);
  return c * c * (3 - 2 * c);
}

export function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

/** Yaw (radians) to face from (fromX, fromZ) toward (toX, toZ). */
export function yawToward(fromX: number, fromZ: number, toX: number, toZ: number): number {
  return Math.atan2(toX - fromX, toZ - fromZ);
}

function facePerpendicular(tanX: number, tanZ: number, offset: number): [number, number] {
  const len = Math.hypot(tanX, tanZ) || 1;
  return [(-tanZ / len) * offset, (tanX / len) * offset];
}

// ---------------------------------------------------------------------------
// The shared route-travel device: gather -> entry walk to the route -> ride
// the curve to the threshing floor -> hold (the stumble/strike/naming/fear
// beats) -> ride the curve on to the diversion point -> settle. One function
// every rider (the column, Ahio, David, the ark cart) shares, per the
// brief's "a single shared route curve with per-figure offsets" (the
// hebron-gate/rephaim-valley procession pattern) — no per-figure independent
// pathing anywhere.

const TRAVEL1_DUR = 28;
/** Real-time point everyone resumes travel from the held threshing-floor
 * position — shared with `T_DIVERSION` so the whole procession's pace
 * change (festive -> subdued) lands at the same moment for every rider. */
const RESUME_START = T_DIVERSION;
const TRAVEL2_DUR = 26;
const SETTLE_DUR = 6;

export interface RouteTravelSpec {
  /** Rest position before this rider's own entry walk begins. */
  gather: [number, number];
  entryStart: number;
  entryDur: number;
  /** Lateral offset (meters, perpendicular to the route tangent) while
   * riding the curve — spreads the column across the corridor's width. */
  laneOffset: number;
  /** Longitudinal offset (meters, along the route tangent) — positive
   * leads ahead of the curve's own sampled point (Ahio "going before the
   * ark," 6:4b), negative trails behind it. */
  leadOffset?: number;
  settle: [number, number];
}

export interface RouteTravelPose {
  x: number;
  z: number;
  yaw: number;
  moving: boolean;
}

const tmpPos = new THREE.Vector3();
const tmpTan = new THREE.Vector3();

function curveSample(u: number, laneOffset: number, leadOffset: number): RouteTravelPose {
  const uu = clamp01(u);
  ROUTE_CURVE.getPointAt(uu, tmpPos);
  ROUTE_CURVE.getTangentAt(Math.max(0.001, Math.min(0.999, uu)), tmpTan);
  const [lx, lz] = facePerpendicular(tmpTan.x, tmpTan.z, laneOffset);
  const tanLen = Math.hypot(tmpTan.x, tmpTan.z) || 1;
  const fx = (tmpTan.x / tanLen) * leadOffset;
  const fz = (tmpTan.z / tanLen) * leadOffset;
  return {
    x: tmpPos.x + lx + fx,
    z: tmpPos.z + lz + fz,
    yaw: Math.atan2(tmpTan.x, tmpTan.z),
    moving: true,
  };
}

export function routeTravelPose(t: number, spec: RouteTravelSpec): RouteTravelPose {
  const laneOffset = spec.laneOffset;
  const leadOffset = spec.leadOffset ?? 0;
  const entryEnd = spec.entryStart + spec.entryDur;
  const travel1End = entryEnd + TRAVEL1_DUR;
  const travel2End = RESUME_START + TRAVEL2_DUR;
  const settleEnd = travel2End + SETTLE_DUR;

  if (t < spec.entryStart) {
    const start = ROUTE_CURVE.getPointAt(0);
    return {
      x: spec.gather[0],
      z: spec.gather[1],
      yaw: yawToward(spec.gather[0], spec.gather[1], start.x, start.z),
      moving: false,
    };
  }
  if (t < entryEnd) {
    const p = smoothstep((t - spec.entryStart) / spec.entryDur);
    const start = ROUTE_CURVE.getPointAt(0);
    return {
      x: lerp(spec.gather[0], start.x, p),
      z: lerp(spec.gather[1], start.z, p),
      yaw: yawToward(spec.gather[0], spec.gather[1], start.x, start.z),
      moving: true,
    };
  }
  if (t < travel1End) {
    const p = clamp01((t - entryEnd) / TRAVEL1_DUR);
    return curveSample(p * THRESHING_FLOOR_U, laneOffset, leadOffset);
  }
  if (t < RESUME_START) {
    return curveSample(THRESHING_FLOOR_U, laneOffset, leadOffset);
  }
  if (t < travel2End) {
    const p = clamp01((t - RESUME_START) / TRAVEL2_DUR);
    return curveSample(THRESHING_FLOOR_U + (1 - THRESHING_FLOOR_U) * p, laneOffset, leadOffset);
  }
  if (t < settleEnd) {
    const p = smoothstep((t - travel2End) / SETTLE_DUR);
    const end = ROUTE_CURVE.getPointAt(1);
    return {
      x: lerp(end.x, spec.settle[0], p),
      z: lerp(end.z, spec.settle[1], p),
      yaw: yawToward(end.x, end.z, spec.settle[0], spec.settle[1]),
      moving: p < 1,
    };
  }
  return {
    x: spec.settle[0],
    z: spec.settle[1],
    yaw: yawToward(
      COLUMN_SETTLE_CENTER[0],
      COLUMN_SETTLE_CENTER[1],
      spec.settle[0],
      spec.settle[1],
    ),
    moving: false,
  };
}

// ---------------------------------------------------------------------------
// The oxen stumble (6:6, "the oxen stumbled") — an ordinary physical event,
// not the divine sign; renders identically in both violence modes. A brief
// bell-curve envelope peaking at T_STUMBLE, used only for a small wobble on
// the cart/oxen transform, never a wound/strike-visual-effect device.

const STUMBLE_HALF_WIDTH = 1.1;

export function stumbleEnvelope(t: number): number {
  const d = Math.abs(t - T_STUMBLE) / STUMBLE_HALF_WIDTH;
  return d >= 1 ? 0 : 1 - smoothstep(d);
}

// ---------------------------------------------------------------------------
// Uzzah (6:6-7): walks beside the cart -> reaches toward the ark (his own
// act, the text's specific gesture) -> standard mode falls and stays;
// reduced mode elides the reach-and-fall, fading from view instead. See the
// file header's queue #25 constraints.

export interface UzzahPose {
  x: number;
  z: number;
  yaw: number;
  /** 0 resting .. 1 fully extended toward the ark — a gesture prop only. */
  reachExtend: number;
  /** 0 standing .. 1 fully fallen — a whole-body collapse transform only,
   * never wound/blood/dismemberment geometry (ADR-009). Held at 0
   * throughout in reduced mode. */
  fallen: number;
  /** 0 fully visible .. 1 fully faded — reduced mode only (the elided
   * reach-and-fall reads as Uzzah leaving the frame, not a rendered body). */
  fade: number;
}

const REACH_RAMP_DUR = 3;
const FALL_DUR = 3;
const REDUCED_FADE_START = T_STUMBLE + 1;
const REDUCED_FADE_DUR = 3;

export function uzzahPose(t: number, mode: ViolenceMode, laneOffset: number): UzzahPose {
  if (t < T_STUMBLE) {
    const start = ROUTE_CURVE.getPointAt(0);
    const end = ROUTE_CURVE.getPointAt(1);
    const p = routeTravelPose(t, {
      gather: [start.x - 3, start.z - 3],
      entryStart: T_NEW_CART,
      entryDur: T_MUSIC - T_NEW_CART,
      laneOffset,
      settle: [end.x, end.z],
    });
    return { x: p.x, z: p.z, yaw: p.yaw, reachExtend: 0, fallen: 0, fade: 0 };
  }

  // Frozen at the position he reached the threshing floor at — he does not
  // continue traveling with the procession after this point, in either mode.
  const frozen = curveSample(THRESHING_FLOOR_U, laneOffset, 0);

  if (mode === 'reduced') {
    const fade = smoothstep((t - REDUCED_FADE_START) / REDUCED_FADE_DUR);
    return { x: frozen.x, z: frozen.z, yaw: frozen.yaw, reachExtend: 0, fallen: 0, fade };
  }

  const reachExtend = smoothstep((t - T_STUMBLE) / REACH_RAMP_DUR);
  const fallen = smoothstep((t - T_STRIKE) / FALL_DUR);
  return { x: frozen.x, z: frozen.z, yaw: frozen.yaw, reachExtend, fallen, fade: 0 };
}

// ---------------------------------------------------------------------------
// Ahio (6:4b, "going before the ark"): rides the same route, always a few
// meters ahead of the cart's own sampled point.

export function ahioPose(t: number): RouteTravelPose {
  return routeTravelPose(t, {
    gather: [ROUTE_CURVE.getPointAt(0).x - 4, ROUTE_CURVE.getPointAt(0).z - 4],
    entryStart: T_NEW_CART,
    entryDur: T_MUSIC - T_NEW_CART,
    laneOffset: 2.6,
    leadOffset: 4.5,
    settle: [COLUMN_SETTLE_CENTER[0] + 6, COLUMN_SETTLE_CENTER[1] + 4],
  });
}

// ---------------------------------------------------------------------------
// David: rides the route at the column's own head, turning to face the ark
// (not the direction of travel) through the held reaction beats (6:8-9) —
// "held on David's stillness," never a scripted gesture standing in for an
// answer (brief).

export interface DavidPose {
  x: number;
  z: number;
  yaw: number;
}

// ---------------------------------------------------------------------------
// The ark/cart (6:3-4, loaded at the house of Abinadab; 6:10-11, settles at
// Obed-edom's house): rides the same route curve, centerline (no lane or
// lead offset), starting from the house on the hill rather than the wider
// column's own gathering ground.

export function cartPose(t: number): RouteTravelPose {
  return routeTravelPose(t, {
    gather: ABINADAB_HOUSE_POS,
    entryStart: T_NEW_CART,
    entryDur: T_MUSIC - T_NEW_CART,
    laneOffset: 0,
    settle: ARK_SETTLE_POS,
  });
}

export function davidPose(t: number, arkPos: [number, number]): DavidPose {
  const p = routeTravelPose(t, {
    gather: [ROUTE_CURVE.getPointAt(0).x - 6, ROUTE_CURVE.getPointAt(0).z + 5],
    entryStart: T_DEPARTURE,
    entryDur: T_MUSIC - T_DEPARTURE,
    laneOffset: -3.2,
    settle: [COLUMN_SETTLE_CENTER[0] - 4, COLUMN_SETTLE_CENTER[1] + 6],
  });
  if (t >= T_PEREZ_UZZAH && t < T_DIVERSION) {
    return { x: p.x, z: p.z, yaw: yawToward(p.x, p.z, arkPos[0], arkPos[1]) };
  }
  return p;
}
