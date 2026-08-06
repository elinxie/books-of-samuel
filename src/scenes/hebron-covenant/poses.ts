import { ABNER_HEAD_POS, DAVID_HEAD_POS, GATE_PLAZA_CENTER, roadPointAt } from './layout';

/**
 * Pure, beat-driven pose/timing choreography for hebron-covenant (ADR-007
 * convention, mirroring hebron-anointing/gibeon-pool's poses.ts). Beat times
 * match `src/data/scenes.ts`'s `hebron-covenant` entry exactly (`b-long-war`
 * through `b-close`) — see docs/design/hebron-covenant-brief.md, "Camera /
 * observer experience".
 *
 * Hard constraints carried here: nothing in this file ever stages Joab (the
 * text is explicit he was away, 3:22 — his return belongs to `hebron-gate`,
 * a separate scene); nothing here stages Michal, Paltiel, Rizpah, or
 * Mahanaim/Bahurim geometry — 3:1-19 is context-card material only, and the
 * first geometry any pose function here produces is Abner's party arriving
 * at `T_ARRIVAL`. `b-peace`'s departure choreography is deliberately
 * unhurried and un-ominous throughout (no acceleration, no camera-shake
 * envelope, no darkening) — the brief's "the peace must read straight"
 * constraint, load-bearing for the dramatic irony `hebron-gate` then breaks.
 */

export const T_LONG_WAR = 0;
export const T_BREAK = 18;
export const T_OVERTURE = 36;
export const T_ELDERS = 54;
export const T_ARRIVAL = 68;
export const T_FEAST = 100;
export const T_PLEDGE = 122;
export const T_PEACE = 136;
export const T_CLOSE = 160;
export const DURATION_SEC = 168;

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

// ---------------------------------------------------------------------------
// Abner's party timeline, shared in shape by the principal rig and the
// twenty men: hidden/off-road before arrival -> travel the northern road ->
// settle from the gate plaza into a feast-ground seat -> seated through the
// feast and pledge -> stand and travel the same road back out, receding
// north, once dismissed in peace.

const ROAD_TRAVEL_DUR = 26;
const SETTLE_DUR = 6;
const STAND_DUR = 3;
const DEPART_TRAVEL_DUR = 22;

export interface PartyPose {
  x: number;
  z: number;
  yaw: number;
  /** 0 standing/traveling .. 1 settled at the feast — a token seated
   * transform (lowered, slightly squashed), not a skeletal re-pose. */
  seated: number;
  visible: boolean;
}

/**
 * Shared travel/settle/depart choreography for one member of Abner's party
 * (the principal or one of the twenty), parameterized by that figure's own
 * feast-ground seat and per-figure staggers so the whole party doesn't move
 * in lockstep. Exported for unit tests.
 */
export function partyMemberPose(
  t: number,
  feastSlot: [number, number],
  arriveStagger: number,
  departStagger: number,
  laneOffset = 0,
): PartyPose {
  const arriveStart = T_ARRIVAL + arriveStagger;
  const roadEnd = arriveStart + ROAD_TRAVEL_DUR;
  const settleEnd = roadEnd + SETTLE_DUR;
  const [fx, fz] = feastSlot;

  if (t < arriveStart) {
    const p = roadPointAt(0);
    return { x: p.x, z: p.z, yaw: p.yaw, seated: 0, visible: false };
  }

  if (t < roadEnd) {
    const u = smoothstep((t - arriveStart) / ROAD_TRAVEL_DUR);
    const p = roadPointAt(u);
    return { x: p.x + laneOffset, z: p.z, yaw: p.yaw, seated: 0, visible: true };
  }

  if (t < settleEnd) {
    const p = smoothstep((t - roadEnd) / SETTLE_DUR);
    const gate = GATE_PLAZA_CENTER;
    return {
      x: lerp(gate[0] + laneOffset, fx, p),
      z: lerp(gate[1], fz, p),
      yaw: yawToward(gate[0], gate[1], fx, fz),
      seated: p,
      visible: true,
    };
  }

  const departStart = T_PEACE + departStagger;
  const facingDavid = yawToward(fx, fz, DAVID_HEAD_POS[0], DAVID_HEAD_POS[1]);
  if (t < departStart) {
    return { x: fx, z: fz, yaw: facingDavid, seated: 1, visible: true };
  }

  const standEnd = departStart + STAND_DUR;
  if (t < standEnd) {
    const p = smoothstep((t - departStart) / STAND_DUR);
    const gate = GATE_PLAZA_CENTER;
    return {
      x: lerp(fx, gate[0] + laneOffset, p),
      z: lerp(fz, gate[1], p),
      yaw: yawToward(fx, fz, gate[0], gate[1]),
      seated: 1 - p,
      visible: true,
    };
  }

  const roadBackEnd = standEnd + DEPART_TRAVEL_DUR;
  if (t < roadBackEnd) {
    const p = smoothstep((t - standEnd) / DEPART_TRAVEL_DUR);
    const u = 1 - p;
    const pt = roadPointAt(u, true);
    return { x: pt.x + laneOffset, z: pt.z, yaw: pt.yaw, seated: 0, visible: true };
  }

  const pEnd = roadPointAt(0, true);
  return { x: pEnd.x + laneOffset, z: pEnd.z, yaw: pEnd.yaw, seated: 0, visible: false };
}

export interface PartyMemberSpec {
  feastSlot: [number, number];
  arriveStagger: number;
  departStagger: number;
  laneOffset: number;
}

/** Pose for one of Abner's twenty men (crowd tier). Exported for unit tests. */
export function abnerMemberPose(t: number, spec: PartyMemberSpec): PartyPose {
  return partyMemberPose(
    t,
    spec.feastSlot,
    spec.arriveStagger,
    spec.departStagger,
    spec.laneOffset,
  );
}

/** Abner's own principal-rig pose — same choreography, ending/starting at
 * `ABNER_HEAD_POS` rather than one of the twenty's slots. Exported for unit
 * tests. */
export function abnerPrincipalPose(t: number): PartyPose {
  return partyMemberPose(t, ABNER_HEAD_POS, 0, 0, 0);
}

// ---------------------------------------------------------------------------
// Abner's pledge gesture (b-pledge, 3:21a): a brief forward lean/address
// gesture toward David, centered on T_PLEDGE — design-placeholder
// choreography for the text's bare statement that Abner "said to David ...
// I will arise and go." No penetration/weapon geometry is ever implicated;
// this is a speaking posture only.

export const PLEDGE_GESTURE_DUR = 10;

/** 0..1 bell-curve envelope for Abner's pledge gesture. Exported for unit
 * tests. */
export function pledgeGestureEnvelope(t: number): number {
  const rampUp = smoothstep((t - T_PLEDGE) / 2);
  const fadeStart = T_PLEDGE + PLEDGE_GESTURE_DUR;
  const fade = 1 - smoothstep((t - fadeStart) / 3);
  return clamp01(rampUp) * clamp01(fade);
}

// ---------------------------------------------------------------------------
// David: present at Hebron throughout (never travels — he is already home).
// Only his facing changes: toward the gate/road while Abner's party is
// inbound or outbound, toward Abner across the feast ground once they are
// seated together.

export interface DavidPose {
  x: number;
  z: number;
  yaw: number;
}

/** David's pose at scene time `t`: fixed at `DAVID_HEAD_POS`, facing the
 * gate plaza (and so the northern road beyond it) before the feast and
 * again once Abner is dismissed, facing Abner's seat across the feast
 * ground in between. Exported for unit tests. */
export function davidPose(t: number): DavidPose {
  const gateYaw = yawToward(
    DAVID_HEAD_POS[0],
    DAVID_HEAD_POS[1],
    GATE_PLAZA_CENTER[0],
    GATE_PLAZA_CENTER[1],
  );
  const abnerYaw = yawToward(
    DAVID_HEAD_POS[0],
    DAVID_HEAD_POS[1],
    ABNER_HEAD_POS[0],
    ABNER_HEAD_POS[1],
  );
  const toFeast = smoothstep((t - T_FEAST) / 4);
  const toRoad = smoothstep((t - T_PEACE) / 4);
  const yaw = lerp(lerp(gateYaw, abnerYaw, toFeast), gateYaw, toRoad);
  return { x: DAVID_HEAD_POS[0], z: DAVID_HEAD_POS[1], yaw };
}

// ---------------------------------------------------------------------------
// David's escort (`DavidEscort.tsx`): present at Hebron the whole scene, no
// travel choreography — only a standing/seated blend shared by the whole
// group, ramping in as the feast beat starts and out once Abner is
// dismissed. A cheap, single-envelope alternative to per-figure staggering,
// appropriate for a group that never actually moves position.

const ESCORT_SEAT_RAMP = 5;

/** 0..1 seated blend for David's escort: standing before/after the feast,
 * seated through the feast and pledge beats. Exported for unit tests. */
export function escortSeatedEnvelope(t: number): number {
  const seatIn = smoothstep((t - T_FEAST) / ESCORT_SEAT_RAMP);
  const standUp = smoothstep((t - T_PEACE) / ESCORT_SEAT_RAMP);
  return clamp01(seatIn - standUp);
}
