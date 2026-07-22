import * as THREE from 'three';
import type { ViolenceMode } from '../../state/store';
import {
  DAVID_LAMENT_POS,
  DAVID_PLAZA_POS,
  EXECUTIONER_INDEX,
  GATE_APPROACH_CURVE,
  LAMENT_RISE_POS,
  MESSENGER_FALL_POS,
  WITNESS_LAMENT_SLOTS,
  WITNESS_PLAZA_SLOTS,
} from './layout';

/**
 * Pure, beat-driven pose/timing choreography for ziklag-lament (ADR-007
 * convention, mirroring gilboa-battle/jabesh-burial's poses.ts). Beat times
 * match `src/data/scenes.ts`'s `ziklag-lament` entry exactly (`b-arrival`
 * through `b-lament-refrain`) — see docs/design/ziklag-lament-brief.md,
 * "Camera / observer experience" and the execution beat's ADR-009 table.
 *
 * Hard constraint carried here: nothing in this file ever reconstructs the
 * Amalekite's account of Gilboa — the messenger's walk, fall, report, and
 * death are staged only at Ziklag. No function produces a second "Gilboa"
 * geometry or camera cut.
 *
 * ADR-009 (`b-execution`): one choreography, two treatments. Standard shows
 * a brief, documentary-distance strike gesture on the executioner before the
 * messenger collapses; reduced elides the gesture entirely and cuts straight
 * from the verdict to the aftermath (the still, fallen figure) — the fact is
 * carried by the beat caption alone in both modes. Neither mode ever
 * produces wound, blood, or contact geometry.
 */

export const T_ARRIVAL = 0;
export const T_FALLS = 14;
export const T_ACCOUNT = 28;
export const T_TOKENS = 44;
export const T_GRIEF = 58;
export const T_IDENTITY = 76;
export const T_JUDGMENT = 88;
export const T_EXECUTION = 98;
export const T_MESSENGER_DEAD = 108;
export const T_SONG = 120;
export const T_LAMENT_TRANSITION = 133;
export const T_LAMENT_OPEN = 145;
export const T_LAMENT_GILBOA = 157;
export const T_LAMENT_TOGETHER = 169;
export const T_LAMENT_DAUGHTERS = 179;
export const T_LAMENT_JONATHAN = 189;
export const T_LAMENT_REFRAIN = 199;
export const DURATION_SEC = 214;

const WALK_END_T = T_FALLS - 3;
const LAMENT_MOVE_START = T_LAMENT_TRANSITION;
const LAMENT_MOVE_DUR = 10;

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

/** Duration (seconds) of an animated transition. Standard uses the full,
 * gradual duration; reduced elides the animation and cuts to the resulting
 * pose almost immediately — same convention as gilboa-battle/jabesh-burial's
 * poses.ts (ADR-009: "reduction abstracts depiction, never facts"). */
export function fallDuration(mode: ViolenceMode, standardDur: number): number {
  return mode === 'standard' ? standardDur : Math.min(1, standardDur * 0.12);
}

const tmpVec = new THREE.Vector3();
const tmpTan = new THREE.Vector3();

// ---------------------------------------------------------------------------
// The Amalekite messenger (2 Sam 1:1-16): approaches alone on foot, falls to
// the ground before David, stays through the report/tokens/grief/judgment,
// then is struck down and stays fallen — never shown corroborating his own
// account of Gilboa.

export interface MessengerPose {
  x: number;
  z: number;
  yaw: number;
  /** 0 standing .. ~0.85 bowed/kneeling before David (1:2) — a respect/
   * distress posture, not the execution collapse. */
  prostrate: number;
  /** 0 .. 1 fallen after the execution (b-execution/b-messenger-dead). */
  fallen: number;
  visible: boolean;
}

/** Yaw (radians) to face from (fromX, fromZ) toward (toX, toZ). */
function yawToward(fromX: number, fromZ: number, toX: number, toZ: number): number {
  return Math.atan2(toX - fromX, toZ - fromZ);
}

function davidFacingYaw(x: number, z: number): number {
  return yawToward(x, z, DAVID_PLAZA_POS[0], DAVID_PLAZA_POS[1]);
}

/** The messenger's pose at scene time `t`. Exported for unit tests. */
export function messengerPose(t: number, mode: ViolenceMode): MessengerPose {
  if (t < WALK_END_T) {
    const u = lerp(0.78, 1, smoothstep(t / WALK_END_T));
    GATE_APPROACH_CURVE.getPointAt(u, tmpVec);
    GATE_APPROACH_CURVE.getTangentAt(Math.max(u, 0.001), tmpTan);
    const yaw = Math.atan2(tmpTan.x, tmpTan.z);
    return { x: tmpVec.x, z: tmpVec.z, yaw, prostrate: 0, fallen: 0, visible: true };
  }

  if (t < T_FALLS) {
    GATE_APPROACH_CURVE.getPointAt(1, tmpVec);
    const b = smoothstep((t - WALK_END_T) / (T_FALLS - WALK_END_T));
    const x = lerp(tmpVec.x, MESSENGER_FALL_POS[0], b);
    const z = lerp(tmpVec.z, MESSENGER_FALL_POS[1], b);
    return { x, z, yaw: davidFacingYaw(x, z), prostrate: 0, fallen: 0, visible: true };
  }

  const [fx, fz] = MESSENGER_FALL_POS;
  const yaw = davidFacingYaw(fx, fz);

  // The execution collapse: standard has a short delay after the strike
  // gesture begins before the figure crumples; reduced cuts almost straight
  // to the fallen aftermath (brief's b-execution reduced treatment).
  const strikeLead = mode === 'standard' ? 1.5 : 0;
  const fallStart = T_EXECUTION + strikeLead;
  const fallen = smoothstep((t - fallStart) / fallDuration(mode, 6));

  const prostrateRise = smoothstep((t - T_FALLS) / fallDuration(mode, 2));
  const prostrate = Math.max(prostrateRise * 0.85, fallen * 0.85);

  return { x: fx, z: fz, yaw, prostrate, fallen, visible: true };
}

// ---------------------------------------------------------------------------
// The crown and armlet (1:10) — small presented props near the messenger,
// never new large geometry.

export interface TokensPose {
  x: number;
  z: number;
  scale: number;
  visible: boolean;
}

export function tokensPose(t: number): TokensPose {
  const scale = smoothstep((t - T_TOKENS) / 1.5);
  return {
    x: MESSENGER_FALL_POS[0] + 0.4,
    z: MESSENGER_FALL_POS[1] - 0.25,
    scale,
    visible: scale > 0.02,
  };
}

// ---------------------------------------------------------------------------
// David: stands in the plaza through the report/grief/judgment/execution,
// then moves to the lament rise for the Song of the Bow.

export interface DavidPose {
  x: number;
  z: number;
  yaw: number;
  /** 0..1 bowed/grieving posture (tearing clothes, weeping — 1:11-12),
   * peaking through the grief beat and resolving to standing composure
   * before the judgment beat, per the brief's "grief is not political
   * theater" — grief must read as real before judgment, never as pretext. */
  grieve: number;
}

export function davidPose(t: number): DavidPose {
  const grieve = smoothstep((t - T_GRIEF) / 3) * (1 - smoothstep((t - (T_JUDGMENT - 5)) / 3));

  if (t < LAMENT_MOVE_START) {
    return {
      x: DAVID_PLAZA_POS[0],
      z: DAVID_PLAZA_POS[1],
      yaw: yawToward(
        DAVID_PLAZA_POS[0],
        DAVID_PLAZA_POS[1],
        MESSENGER_FALL_POS[0],
        MESSENGER_FALL_POS[1],
      ),
      grieve,
    };
  }

  const b = smoothstep((t - LAMENT_MOVE_START) / LAMENT_MOVE_DUR);
  const x = lerp(DAVID_PLAZA_POS[0], DAVID_LAMENT_POS[0], b);
  const z = lerp(DAVID_PLAZA_POS[1], DAVID_LAMENT_POS[1], b);
  const yaw =
    b < 1
      ? yawToward(x, z, DAVID_LAMENT_POS[0], DAVID_LAMENT_POS[1])
      : yawToward(x, z, LAMENT_RISE_POS[0], LAMENT_RISE_POS[1]);
  return { x, z, yaw, grieve: 0 };
}

// ---------------------------------------------------------------------------
// The witness cluster: a small, disclosed headcount (6-10, never a scaled
// fraction of the narrated six hundred — see claim-600-men's scene-specific
// usage note). Grieves alongside David, one figure (EXECUTIONER_INDEX)
// carries out the execution, then the whole group moves to the lament rise
// and stands with backs turned slightly toward David, listening.

export interface WitnessPose {
  x: number;
  z: number;
  yaw: number;
  grieve: number;
  /** 0..1 the executioner's brief strike gesture (orientation/gesture only,
   * never contact geometry). Zero for every other figure, and zero
   * throughout in reduced mode (elided per the brief's ADR-009 table). */
  strike: number;
}

function slotAt(slots: readonly [number, number][], index: number): [number, number] {
  return slots[index % slots.length];
}

export function witnessPose(
  t: number,
  index: number,
  count: number,
  mode: ViolenceMode,
): WitnessPose {
  const plaza = slotAt(WITNESS_PLAZA_SLOTS, index);
  const lament = slotAt(WITNESS_LAMENT_SLOTS, index);
  const jitter = Math.sin(index * 12.9898) * 0.3;

  const grieve = smoothstep((t - T_GRIEF) / 3) * (1 - smoothstep((t - LAMENT_MOVE_START) / 4));

  const isExecutioner = index % count === EXECUTIONER_INDEX % count;
  let strike = 0;
  if (isExecutioner && mode === 'standard') {
    strike = smoothstep((t - T_EXECUTION) / 1.2) * (1 - smoothstep((t - (T_EXECUTION + 3)) / 1.2));
  }

  if (t < LAMENT_MOVE_START) {
    return { x: plaza[0], z: plaza[1], yaw: davidFacingYaw(plaza[0], plaza[1]), grieve, strike };
  }

  const b = smoothstep((t - LAMENT_MOVE_START) / LAMENT_MOVE_DUR);
  const x = lerp(plaza[0], lament[0], b);
  const z = lerp(plaza[1], lament[1], b);
  // At the lament rise: composed stillness, backs turned slightly toward
  // David/the wall rather than facing the camera head-on (brief: "the
  // witness cluster's backs turned slightly toward David, listening") — face
  // outward from the rise's center (roughly away from David), with a small
  // per-figure jitter so the group doesn't read as a single rigid ring.
  const awayYaw = yawToward(LAMENT_RISE_POS[0], LAMENT_RISE_POS[1], x, z) + jitter;
  const facingYaw = davidFacingYaw(plaza[0], plaza[1]);
  const yaw = lerp(facingYaw, awayYaw, b);
  return { x, z, yaw, grieve: grieve * (1 - b), strike: strike * (1 - b) };
}
