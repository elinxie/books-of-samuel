import type { ViolenceMode } from '../../state/store';
import {
  arrivalRoadPointAt,
  ARRIVAL_ROAD_END,
  BAANAH_EXECUTION_POS,
  burialRoutePointAt,
  BURIAL_ROUTE_END,
  DAVID_RECEIVING_POS,
  PRESENTATION_POS,
  RECHAB_EXECUTION_POS,
} from './layout';
import { TOMB_POS } from '../hebron-gate/layout';

/**
 * Pure, beat-driven pose/timing choreography for hebron-reckoning (ADR-007
 * convention, mirroring hebron-gate/ziklag-lament's poses.ts). Beat times
 * match `src/data/scenes.ts`'s `hebron-reckoning` entry exactly
 * (`b-courage-fails` through `b-close`) — see
 * docs/design/hebron-reckoning-brief.md, "Camera / observer experience".
 *
 * ADR-009's strictest application yet, and the first judicial (not personal)
 * named-killing: Rechab and Baanah's execution is a body-orientation/
 * collapse transform only, exactly like Abner's own collapse in hebron-gate
 * — no wound, blood, or weapon geometry, in either mode. Unlike every prior
 * application of this template, no gesture of any kind is invented for the
 * strike itself (no reversed spear grip, no drawing-aside lean): the text
 * gives no method detail to show, so `fallDuration` is the only rendering
 * difference between modes, applied directly to the collapse. The
 * hands-and-feet display (4:12a) and Ish-bosheth's beheading (4:7b) are
 * never staged by any function in this file — they are caption-only facts,
 * per ADR-009's absolute dismemberment bar. `headBundlePose` is the only
 * geometry ever produced for Ish-bosheth's head, and it carries no anatomy
 * field of any kind (position/orientation/carried/sink/visible only) — see
 * `headBundlePose.test.ts`-equivalent coverage in `./poses.test.ts`.
 */

export const T_COURAGE_FAILS = 0;
export const T_MEPHIBOSHETH = 13;
export const T_MURDER_CARD = 26;
export const T_ARRIVAL = 42;
export const ARRIVE_DUR = 14;
export const T_PRESENTATION = 56;
export const T_VERDICT = 70;
export const T_EXECUTION = 92;
export const FALL_STANDARD_DUR = 3.5;
const ESCORT_START = T_EXECUTION - 12;
const ESCORT_DUR = 10;
export const T_BURIAL = 110;
export const BURIAL_ROUTE_DUR = 14;
export const BURIAL_SETTLE_DUR = 4;
export const T_CLOSE = 132;
export const DURATION_SEC = 140;

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

export function yawToward(fromX: number, fromZ: number, toX: number, toZ: number): number {
  return Math.atan2(toX - fromX, toZ - fromZ);
}

function lerpToward(
  fromX: number,
  fromZ: number,
  toX: number,
  toZ: number,
  p: number,
): { x: number; z: number } {
  return { x: lerp(fromX, toX, p), z: lerp(fromZ, toZ, p) };
}

/** Duration (seconds) of an animated fall/collapse transition — standard is
 * gradual, reduced elides it almost entirely (ADR-009: "reduced mode elides
 * the strike, never the fact or the method" — cut to the aftermath, same
 * eventual pose reached far sooner). */
export function fallDuration(mode: ViolenceMode, standardDur: number): number {
  return mode === 'standard' ? standardDur : Math.min(1, standardDur * 0.12);
}

// ---------------------------------------------------------------------------
// David: present at the receiving ground throughout — never staged walking
// to the tomb for the burial beat (unlike hebron-gate's 3:31, 4:12b never
// states David's personal presence at this burial, so none is invented).

export interface PrincipalPose {
  x: number;
  z: number;
  yaw: number;
}

export function davidPose(t: number): PrincipalPose {
  const [dx, dz] = DAVID_RECEIVING_POS;
  if (t < T_ARRIVAL) {
    return { x: dx, z: dz, yaw: yawToward(dx, dz, ...PRESENTATION_POS) };
  }
  if (t < T_EXECUTION) {
    return { x: dx, z: dz, yaw: yawToward(dx, dz, ...PRESENTATION_POS) };
  }
  return { x: dx, z: dz, yaw: yawToward(dx, dz, ...RECHAB_EXECUTION_POS) };
}

// ---------------------------------------------------------------------------
// Rechab and Baanah (b-arrival through b-execution, 4:8-12a): walk in along
// the arrival road carrying the bundle low, present it, stand through the
// verdict, are escorted to the pool ground, and collapse there at
// `T_EXECUTION` — the same body-orientation/collapse transform used for
// Abner, Asahel, and the Ziklag messenger, and nothing more.

export interface AssassinPose {
  x: number;
  z: number;
  yaw: number;
  fallen: number;
  visible: boolean;
}

function assassinPose(
  t: number,
  mode: ViolenceMode,
  laneOffset: number,
  executionPos: readonly [number, number],
): AssassinPose {
  if (t < T_ARRIVAL) {
    return { x: ARRIVAL_ROAD_END.x, z: ARRIVAL_ROAD_END.z, yaw: 0, fallen: 0, visible: false };
  }
  const arriveEnd = T_ARRIVAL + ARRIVE_DUR;
  if (t < arriveEnd) {
    const p = smoothstep((t - T_ARRIVAL) / ARRIVE_DUR);
    const pt = arrivalRoadPointAt(p);
    return { x: pt.x + laneOffset, z: pt.z, yaw: pt.yaw, fallen: 0, visible: true };
  }
  const [px, pz] = PRESENTATION_POS;
  if (t < ESCORT_START) {
    return {
      x: px + laneOffset,
      z: pz,
      yaw: yawToward(px + laneOffset, pz, ...DAVID_RECEIVING_POS),
      fallen: 0,
      visible: true,
    };
  }
  const escortEnd = ESCORT_START + ESCORT_DUR;
  if (t < escortEnd) {
    const p = smoothstep((t - ESCORT_START) / ESCORT_DUR);
    const pos = lerpToward(px + laneOffset, pz, executionPos[0], executionPos[1], p);
    return {
      ...pos,
      yaw: yawToward(pos.x, pos.z, executionPos[0], executionPos[1]),
      fallen: 0,
      visible: true,
    };
  }
  const standYaw = yawToward(executionPos[0], executionPos[1], ...DAVID_RECEIVING_POS);
  if (t < T_EXECUTION) {
    return { x: executionPos[0], z: executionPos[1], yaw: standYaw, fallen: 0, visible: true };
  }
  const fallen = smoothstep((t - T_EXECUTION) / fallDuration(mode, FALL_STANDARD_DUR));
  return { x: executionPos[0], z: executionPos[1], yaw: standYaw, fallen, visible: true };
}

export function rechabPose(t: number, mode: ViolenceMode): AssassinPose {
  return assassinPose(t, mode, -0.55, RECHAB_EXECUTION_POS);
}

export function baanahPose(t: number, mode: ViolenceMode): AssassinPose {
  return assassinPose(t, mode, 0.55, BAANAH_EXECUTION_POS);
}

// ---------------------------------------------------------------------------
// The head bundle (b-arrival through b-burial): carried in low along the
// arrival road (never brandished), held at the presentation ground through
// the verdict and execution beats, then carried to Abner's tomb and settled
// — the same wrapped-form funerary standard used at Beth-shan/Jabesh/
// hebron-gate, at the smallest scale yet. Never co-located with Rechab or
// Baanah's own execution ground — the bundle's journey to burial is
// entirely separate from the pool.

export interface HeadBundlePose {
  x: number;
  z: number;
  yaw: number;
  carried: number;
  sink: number;
  visible: boolean;
}

export function headBundlePose(t: number): HeadBundlePose {
  if (t < T_ARRIVAL) {
    return {
      x: PRESENTATION_POS[0],
      z: PRESENTATION_POS[1],
      yaw: 0,
      carried: 0,
      sink: 0,
      visible: false,
    };
  }
  const arriveEnd = T_ARRIVAL + ARRIVE_DUR;
  if (t < arriveEnd) {
    const p = smoothstep((t - T_ARRIVAL) / ARRIVE_DUR);
    const pt = arrivalRoadPointAt(p);
    const carried = smoothstep((t - T_ARRIVAL) / 3);
    return { x: pt.x, z: pt.z, yaw: pt.yaw, carried, sink: 0, visible: true };
  }
  if (t < T_BURIAL) {
    return {
      x: PRESENTATION_POS[0],
      z: PRESENTATION_POS[1],
      yaw: yawToward(...PRESENTATION_POS, ...DAVID_RECEIVING_POS),
      carried: 0.3,
      sink: 0,
      visible: true,
    };
  }
  const routeEnd = T_BURIAL + BURIAL_ROUTE_DUR;
  if (t < routeEnd) {
    const p = smoothstep((t - T_BURIAL) / BURIAL_ROUTE_DUR);
    const pt = burialRoutePointAt(p);
    return { x: pt.x, z: pt.z, yaw: pt.yaw, carried: 1, sink: 0, visible: true };
  }
  const settleEnd = routeEnd + BURIAL_SETTLE_DUR;
  if (t < settleEnd) {
    const sink = smoothstep((t - routeEnd) / BURIAL_SETTLE_DUR);
    return {
      x: TOMB_POS[0],
      z: TOMB_POS[1],
      yaw: BURIAL_ROUTE_END.yaw,
      carried: 1,
      sink,
      visible: true,
    };
  }
  return {
    x: TOMB_POS[0],
    z: TOMB_POS[1],
    yaw: BURIAL_ROUTE_END.yaw,
    carried: 1,
    sink: 1,
    visible: false,
  };
}
