import * as THREE from 'three';
import {
  ARRIVAL_CURVE,
  CONFRONTATION_POS,
  DAVID_RETURN_APPROACH,
  DISTRIBUTION_CENTER,
  HOUSEHOLD_POS,
  OFFERING_GROUND_POS,
  TENT_POS,
  WINDOW_POS,
} from './layout';

/**
 * Pure, beat-driven pose/timing choreography for ark-into-jerusalem
 * (ADR-007 convention, mirroring perez-uzzah/hebron-gate's poses.ts). Beat
 * times match `src/data/scenes.ts`'s `ark-into-jerusalem` entry exactly
 * (`b-report` through `b-close`) — see
 * docs/design/ark-into-jerusalem-brief.md, "Camera / observer experience"
 * and "Resolved design calls".
 *
 * Hard constraints carried here, load-bearing per the brief:
 * - **No exposure, ever, in any mode.** `davidDanceTransform` returns only
 *   whole-body transform scalars (bounce/spin/lean) applied to David's own
 *   rigid group in PrincipalFigures.tsx — the same fully-clothed procedural
 *   rig used everywhere else in this project (`asset-figure-procedural`/
 *   `asset-david-marker`). Nothing in this file reads or produces any
 *   clothing/exposure-related value; no such field exists anywhere in this
 *   module (see poses.test.ts's dedicated "no exposure" assertions).
 * - **Michal's accusation is never enacted.** `michalPose` only ever
 *   produces a still position at the window, a withdrawal (invisible), a
 *   walk, and a held stance at the confrontation ground — no gesture stands
 *   in for either the accusation or a response to it. The words themselves
 *   are carried entirely by the beat caption/ESV excerpts in scenes.ts.
 * - **No fight-stance or melee pose buckets anywhere** — this is a
 *   religious festival and a domestic exchange, never combat.
 * - **The sacrifice's own slaughter is never depicted.** `officiantPose`
 *   only ever produces a standing/raised-arm offering gesture near the
 *   altar — no strike, no wound, no carcass transform of any kind exists
 *   anywhere in this file.
 */

export const T_REPORT = 0;
export const T_DEPART = 10;
export const ARRIVAL_DUR = 18;
export const T_SACRIFICE = 28;
export const T_DANCE = 46;
export const T_WINDOW = 68;
export const WINDOW_HOLD = 12;
export const T_TENT = 86;
export const T_DISTRIBUTION = 102;
export const MOVE_DUR = 8;
export const T_RETURN_HOUSEHOLD = 116;
export const T_CONFRONTATION = 128;
export const T_CLOSE = 144;
export const DURATION_SEC = 152;

/** David and Michal stand a short, conversation-scale distance apart at the
 * confrontation ground (hebron-reckoning's vp-receiving-ground pattern) —
 * two named figures, never a crowd staged on this exact ground. */
export const DAVID_CONFRONT_POS: [number, number] = [CONFRONTATION_POS[0], CONFRONTATION_POS[1]];
export const MICHAL_CONFRONT_POS: [number, number] = [
  CONFRONTATION_POS[0] - 2.4,
  CONFRONTATION_POS[1] - 1.6,
];

/** David's own held spot near the tent/offering ground through the dance
 * and offering beats — between the two, so both read as his own activity. */
export const DAVID_DANCE_SPOT: [number, number] = [
  (TENT_POS[0] + OFFERING_GROUND_POS[0]) / 2,
  (TENT_POS[1] + OFFERING_GROUND_POS[1]) / 2 + 2,
];

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

const tmpPos = new THREE.Vector3();
const tmpTan = new THREE.Vector3();

function curveSample(u: number, laneOffset: number): { x: number; z: number; yaw: number } {
  const uu = clamp01(u);
  ARRIVAL_CURVE.getPointAt(uu, tmpPos);
  ARRIVAL_CURVE.getTangentAt(Math.max(0.001, Math.min(0.999, uu)), tmpTan);
  const [lx, lz] = facePerpendicular(tmpTan.x, tmpTan.z, laneOffset);
  return {
    x: tmpPos.x + lx,
    z: tmpPos.z + lz,
    yaw: Math.atan2(tmpTan.x, tmpTan.z),
  };
}

// ---------------------------------------------------------------------------
// The shared arrival-travel device: gather off-composition to the south ->
// ride ARRIVAL_CURVE through the one gate -> arrive at a dance-ground slot,
// where the crowd stays through the dance/offering beats -> ease to a
// distribution-ground slot at the distribution beat -> hold there
// (6:19b, "the people return home" is a caption fact, not a modeled exit).

export interface ProcessionFigureSpec {
  laneOffset: number;
  entryStagger: number;
  danceSlot: [number, number];
  distSlot: [number, number];
}

export interface ProcessionPose {
  x: number;
  z: number;
  yaw: number;
  moving: boolean;
  /** True while this figure should read as dancing in place (bounce/sway
   * driven by the caller from `danceEnvelope`, not by this pose itself). */
  dancing: boolean;
}

export function processionFigurePose(t: number, fig: ProcessionFigureSpec): ProcessionPose {
  const entryStart = T_DEPART + fig.entryStagger;
  const entryEnd = entryStart + ARRIVAL_DUR;
  const moveEnd = T_DISTRIBUTION + MOVE_DUR;

  if (t < entryStart) {
    const start = ARRIVAL_CURVE.getPointAt(0);
    return {
      x: start.x - 4,
      z: start.z - 4,
      yaw: 0,
      moving: false,
      dancing: false,
    };
  }
  if (t < entryEnd) {
    const p = clamp01((t - entryStart) / ARRIVAL_DUR);
    const s = curveSample(p, fig.laneOffset);
    return { x: s.x, z: s.z, yaw: s.yaw, moving: true, dancing: false };
  }
  if (t < T_DISTRIBUTION) {
    return {
      x: fig.danceSlot[0],
      z: fig.danceSlot[1],
      yaw: yawToward(fig.danceSlot[0], fig.danceSlot[1], TENT_POS[0], TENT_POS[1]),
      moving: false,
      dancing: t >= T_DANCE && t < T_TENT,
    };
  }
  if (t < moveEnd) {
    const p = smoothstep((t - T_DISTRIBUTION) / MOVE_DUR);
    return {
      x: lerp(fig.danceSlot[0], fig.distSlot[0], p),
      z: lerp(fig.danceSlot[1], fig.distSlot[1], p),
      yaw: yawToward(fig.danceSlot[0], fig.danceSlot[1], fig.distSlot[0], fig.distSlot[1]),
      moving: p < 1,
      dancing: false,
    };
  }
  return {
    x: fig.distSlot[0],
    z: fig.distSlot[1],
    yaw: yawToward(
      fig.distSlot[0],
      fig.distSlot[1],
      DISTRIBUTION_CENTER[0],
      DISTRIBUTION_CENTER[1],
    ),
    moving: false,
    dancing: false,
  };
}

// ---------------------------------------------------------------------------
// The reused-population Jerusalem ambient onlookers (jerusalem-stronghold's
// own ~20-30 figures, same design count, repositioned as active recipients
// at the distribution beat rather than static background).

export interface OnlookerPose {
  x: number;
  z: number;
  yaw: number;
  moving: boolean;
}

export function onlookerPose(
  t: number,
  home: [number, number],
  distSlot: [number, number],
): OnlookerPose {
  const moveEnd = T_DISTRIBUTION + MOVE_DUR;
  if (t < T_DISTRIBUTION) {
    return { x: home[0], z: home[1], yaw: 0, moving: false };
  }
  if (t < moveEnd) {
    const p = smoothstep((t - T_DISTRIBUTION) / MOVE_DUR);
    return {
      x: lerp(home[0], distSlot[0], p),
      z: lerp(home[1], distSlot[1], p),
      yaw: yawToward(home[0], home[1], distSlot[0], distSlot[1]),
      moving: p < 1,
    };
  }
  return { x: distSlot[0], z: distSlot[1], yaw: 0, moving: false };
}

// ---------------------------------------------------------------------------
// The dance (6:14-15): active from T_DANCE through T_TENT, ramping in/out.
// A pure envelope only — the actual leap/whirl/lean values it drives
// (`davidDanceTransform`) are whole-body rigid-group transform scalars, the
// same rigid-pose-function convention every other principal figure in this
// project uses (never bone-driven skeletal animation, never a clothing
// value of any kind).

const DANCE_RAMP = 4;

export function danceEnvelope(t: number): number {
  if (t < T_DANCE) return 0;
  if (t < T_DANCE + DANCE_RAMP) return smoothstep((t - T_DANCE) / DANCE_RAMP);
  if (t < T_TENT) return 1;
  if (t < T_TENT + DANCE_RAMP) return 1 - smoothstep((t - T_TENT) / DANCE_RAMP);
  return 0;
}

export interface DanceTransform {
  /** 0..~1, a vertical leap/bounce amount. */
  bounce: number;
  /** Accumulated whirl angle (radians), continuous, not clamped to 2*PI. */
  spin: number;
  /** A small forward/back lean amount. */
  lean: number;
}

export function davidDanceTransform(t: number): DanceTransform {
  const env = danceEnvelope(t);
  return {
    bounce: env * Math.max(0, Math.sin(t * 3.1)),
    spin: env * t * 1.4,
    lean: env * Math.sin(t * 1.7) * 0.12,
  };
}

export function davidPose(t: number): { x: number; z: number; yaw: number } {
  const entryStart = T_DEPART;
  const entryEnd = entryStart + ARRIVAL_DUR;
  if (t < entryStart) {
    const start = ARRIVAL_CURVE.getPointAt(0);
    return { x: start.x - 6, z: start.z - 2, yaw: 0 };
  }
  if (t < entryEnd) {
    const p = clamp01((t - entryStart) / ARRIVAL_DUR);
    const s = curveSample(p, -3.4);
    return { x: s.x, z: s.z, yaw: s.yaw };
  }
  if (t < T_RETURN_HOUSEHOLD) {
    return {
      x: DAVID_DANCE_SPOT[0],
      z: DAVID_DANCE_SPOT[1],
      yaw: yawToward(DAVID_DANCE_SPOT[0], DAVID_DANCE_SPOT[1], TENT_POS[0], TENT_POS[1]),
    };
  }
  if (t < T_CONFRONTATION) {
    const p = smoothstep((t - T_RETURN_HOUSEHOLD) / (T_CONFRONTATION - T_RETURN_HOUSEHOLD));
    const midX = lerp(DAVID_DANCE_SPOT[0], DAVID_RETURN_APPROACH[0], Math.min(1, p * 1.4));
    const midZ = lerp(DAVID_DANCE_SPOT[1], DAVID_RETURN_APPROACH[1], Math.min(1, p * 1.4));
    const x = lerp(midX, DAVID_CONFRONT_POS[0], p);
    const z = lerp(midZ, DAVID_CONFRONT_POS[1], p);
    return { x, z, yaw: yawToward(x, z, DAVID_CONFRONT_POS[0] + 1, DAVID_CONFRONT_POS[1]) };
  }
  return {
    x: DAVID_CONFRONT_POS[0],
    z: DAVID_CONFRONT_POS[1],
    yaw: yawToward(
      DAVID_CONFRONT_POS[0],
      DAVID_CONFRONT_POS[1],
      MICHAL_CONFRONT_POS[0],
      MICHAL_CONFRONT_POS[1],
    ),
  };
}

// ---------------------------------------------------------------------------
// The ark (6:12-17): travels the same arrival curve centerline, holds near
// the offering ground through the dance/offering beats, then is carried into
// the tent and set in its place (6:17a) — settles there for the rest of the
// scene, never inside the not-staged Gibeon tabernacle.

const ARK_SETTLE_DUR = 6;

export function arkPose(t: number): { x: number; z: number; yaw: number } {
  const entryEnd = T_DEPART + ARRIVAL_DUR;
  if (t < T_DEPART) {
    const start = ARRIVAL_CURVE.getPointAt(0);
    return { x: start.x, z: start.z, yaw: 0 };
  }
  if (t < entryEnd) {
    const p = clamp01((t - T_DEPART) / ARRIVAL_DUR);
    const s = curveSample(p, 0);
    return { x: s.x, z: s.z, yaw: s.yaw };
  }
  if (t < T_TENT) {
    return {
      x: OFFERING_GROUND_POS[0],
      z: OFFERING_GROUND_POS[1] + 4,
      yaw: yawToward(OFFERING_GROUND_POS[0], OFFERING_GROUND_POS[1] + 4, TENT_POS[0], TENT_POS[1]),
    };
  }
  if (t < T_TENT + ARK_SETTLE_DUR) {
    const p = smoothstep((t - T_TENT) / ARK_SETTLE_DUR);
    return {
      x: lerp(OFFERING_GROUND_POS[0], TENT_POS[0], p),
      z: lerp(OFFERING_GROUND_POS[1] + 4, TENT_POS[1], p),
      yaw: yawToward(OFFERING_GROUND_POS[0], OFFERING_GROUND_POS[1], TENT_POS[0], TENT_POS[1]),
    };
  }
  return { x: TENT_POS[0], z: TENT_POS[1], yaw: 0 };
}

// ---------------------------------------------------------------------------
// The offering-ground officiants (6:13, 6:17-19a): a standing/raised-arm
// gesture only, near the altar, through both sacrifice windows — never a
// strike, wound, or carcass transform.

const GESTURE_RAMP = 2;

function gestureWindow(t: number, start: number, dur: number): number {
  if (t < start) return 0;
  if (t < start + GESTURE_RAMP) return smoothstep((t - start) / GESTURE_RAMP);
  if (t < start + dur - GESTURE_RAMP) return 1;
  if (t < start + dur) return 1 - smoothstep((t - (start + dur - GESTURE_RAMP)) / GESTURE_RAMP);
  return 0;
}

export function officiantPose(offset: [number, number]): { x: number; z: number } {
  return { x: OFFERING_GROUND_POS[0] + offset[0], z: OFFERING_GROUND_POS[1] + offset[1] };
}

/** 0..1 raised-arm offering gesture amount, active during both sacrifice
 * windows (6:13's approach sacrifices, 6:17-19a's burnt/peace offerings). */
export function officiantGesture(t: number): number {
  return Math.max(
    gestureWindow(t, T_SACRIFICE, T_DANCE - T_SACRIFICE),
    gestureWindow(t, T_TENT, 10),
  );
}

// ---------------------------------------------------------------------------
// Michal (6:16, 6:20-23): invisible until the window beat -> still at the
// window through its hold window -> withdrawn (invisible; the only motion
// this scene ever invents for her beyond stillness) -> walks out to meet
// David at the confrontation ground -> holds there. Never enacts the
// accusation itself; carried entirely by caption/ESV excerpt.

const MICHAL_WALK_DUR = 10;

export interface MichalPose {
  x: number;
  z: number;
  yaw: number;
  visible: boolean;
}

export function michalPose(t: number): MichalPose {
  const windowEnd = T_WINDOW + WINDOW_HOLD;
  const walkStart = T_CONFRONTATION - MICHAL_WALK_DUR;

  if (t < T_WINDOW) {
    return { x: HOUSEHOLD_POS[0], z: HOUSEHOLD_POS[1], yaw: 0, visible: false };
  }
  if (t < windowEnd) {
    return {
      x: WINDOW_POS[0],
      z: WINDOW_POS[1],
      yaw: yawToward(WINDOW_POS[0], WINDOW_POS[1], TENT_POS[0], TENT_POS[1]),
      visible: true,
    };
  }
  if (t < walkStart) {
    return { x: HOUSEHOLD_POS[0], z: HOUSEHOLD_POS[1], yaw: 0, visible: false };
  }
  if (t < T_CONFRONTATION) {
    const p = smoothstep((t - walkStart) / MICHAL_WALK_DUR);
    const x = lerp(HOUSEHOLD_POS[0], MICHAL_CONFRONT_POS[0], p);
    const z = lerp(HOUSEHOLD_POS[1], MICHAL_CONFRONT_POS[1], p);
    return {
      x,
      z,
      yaw: yawToward(
        HOUSEHOLD_POS[0],
        HOUSEHOLD_POS[1],
        MICHAL_CONFRONT_POS[0],
        MICHAL_CONFRONT_POS[1],
      ),
      visible: true,
    };
  }
  return {
    x: MICHAL_CONFRONT_POS[0],
    z: MICHAL_CONFRONT_POS[1],
    yaw: yawToward(
      MICHAL_CONFRONT_POS[0],
      MICHAL_CONFRONT_POS[1],
      DAVID_CONFRONT_POS[0],
      DAVID_CONFRONT_POS[1],
    ),
    visible: true,
  };
}
