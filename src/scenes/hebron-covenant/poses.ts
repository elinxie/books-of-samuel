import {
  ABNER_FEAST_POS,
  DAVID_FEAST_POS,
  FEAST_GROUND_CENTER,
  GATE_PLAZA_CENTER,
  NORTH_ROAD_CURVE,
} from './layout';

/**
 * Pure, beat-driven pose/timing choreography for hebron-covenant (ADR-007
 * convention, mirroring hebron-anointing/gibeon-pool's poses.ts). Beat times
 * match `src/data/scenes.ts`'s `hebron-covenant` entry exactly (`b-long-war`
 * through `b-close`) — see docs/design/hebron-covenant-brief.md, "Camera /
 * observer experience".
 *
 * Hard constraints carried here: nothing in this file ever stages Michal,
 * Paltiel, Rizpah, Mahanaim, or Bahurim geometry, or any 3:1-19 event (the
 * long war, the break, the messenger overture, the elders' consultation) —
 * those beats are context cards only, with no corresponding pose function.
 * Nothing in this file stages Joab (he is explicitly away, 3:22, out of this
 * scene's scope). The departure phase (`b-peace`) never accelerates or
 * turns dread — a steady, unhurried walk back up the same road, matching
 * the brief's "hold the frame... no dread staging."
 */

export const T_LONG_WAR = 0;
export const T_BREAK = 16;
export const T_OVERTURE = 32;
export const T_ELDERS = 48;
export const T_ARRIVAL = 64;
// Walk duration (T_SETTLE - T_ARRIVAL) is sized to the actual length of
// NORTH_ROAD_CURVE (~264 units) so the column reads as a real journey, not
// a teleport — settled well before b-feast, never mid-transit at a beat
// boundary (guarded by poses.test.ts).
export const T_SETTLE = 90;
export const SETTLE_DUR = 6;
export const T_FEAST = 100;
export const T_PLEDGE = 120;
export const T_PEACE = 134;
export const T_CLOSE = 150;
export const DURATION_SEC = 158;

const DEPART_TRANSITION_DUR = 4;
const DEPART_WALK_DUR = 30;

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

const CURVE_END = NORTH_ROAD_CURVE.getPointAt(1);

// ---------------------------------------------------------------------------
// Abner's twenty (3:20a) — literal 21 figures (Abner himself posed
// separately, see abnerPrincipalPose below, but both share this same
// timeline shape): walk the north road in, settle to an individual feast
// slot, hold through the feast/pledge, then rise and walk back out the same
// road once dismissed (b-peace) — never sped up, never turned around before
// `T_PEACE`.

export interface PartyFigureParams {
  arriveStagger: number;
  departStagger: number;
  laneOffset: number;
  destSlot: [number, number];
}

export interface PartyPose {
  x: number;
  z: number;
  yaw: number;
  /** 0..1 — 1 once settled at the feast slot, ramping back to 0 as the
   * figure rises to depart. Drives the seated-posture transform in the
   * render components, not this file. */
  seated: number;
}

function facePerpendicular(tanX: number, tanZ: number, offset: number): [number, number] {
  const len = Math.hypot(tanX, tanZ) || 1;
  return [(-tanZ / len) * offset, (tanX / len) * offset];
}

/** Position/orientation for one of Abner's twenty (or Abner himself, with
 * `laneOffset` 0) at scene time `t`. Exported for unit tests. */
export function partyFigurePose(t: number, fig: PartyFigureParams): PartyPose {
  const arriveAt = T_SETTLE + fig.arriveStagger;
  const settleEnd = arriveAt + SETTLE_DUR;
  const [dx, dz] = fig.destSlot;

  if (t < arriveAt) {
    const u = clamp01(smoothstep(t / arriveAt));
    const pos = NORTH_ROAD_CURVE.getPointAt(u);
    const tan = NORTH_ROAD_CURVE.getTangentAt(Math.max(0.001, u));
    const [ox, oz] = facePerpendicular(tan.x, tan.z, fig.laneOffset);
    return { x: pos.x + ox, z: pos.z + oz, yaw: Math.atan2(tan.x, tan.z), seated: 0 };
  }

  if (t < settleEnd) {
    const p = smoothstep((t - arriveAt) / SETTLE_DUR);
    return {
      x: lerp(CURVE_END.x, dx, p),
      z: lerp(CURVE_END.z, dz, p),
      yaw: yawToward(CURVE_END.x, CURVE_END.z, dx, dz),
      seated: p,
    };
  }

  const departAt = T_PEACE + fig.departStagger;
  if (t < departAt) {
    return {
      x: dx,
      z: dz,
      yaw: yawToward(dx, dz, DAVID_FEAST_POS[0], DAVID_FEAST_POS[1]),
      seated: 1,
    };
  }

  const riseEnd = departAt + DEPART_TRANSITION_DUR;
  if (t < riseEnd) {
    const p = smoothstep((t - departAt) / DEPART_TRANSITION_DUR);
    return {
      x: lerp(dx, CURVE_END.x, p),
      z: lerp(dz, CURVE_END.z, p),
      yaw: yawToward(dx, dz, CURVE_END.x, CURVE_END.z),
      seated: 1 - p,
    };
  }

  const walkP = clamp01((t - riseEnd) / DEPART_WALK_DUR);
  const u = 1 - smoothstep(walkP);
  const pos = NORTH_ROAD_CURVE.getPointAt(u);
  const tan = NORTH_ROAD_CURVE.getTangentAt(Math.max(0.001, u));
  const [ox, oz] = facePerpendicular(tan.x, tan.z, fig.laneOffset);
  // Facing outward (away from the town, up the road) while departing.
  return { x: pos.x + ox, z: pos.z + oz, yaw: Math.atan2(-tan.x, -tan.z), seated: 0 };
}

// ---------------------------------------------------------------------------
// Abner (named principal): same shape as partyFigurePose but settles to his
// own feast position facing David, and carries the b-pledge gesture.

export interface AbnerPose {
  x: number;
  z: number;
  yaw: number;
  seated: number;
  /** 0..1 bell-curve envelope for the pledge gesture (3:21a), centered on
   * `T_PLEDGE`. */
  pledge: number;
}

const PLEDGE_DUR = 8;

export function pledgeEnvelope(t: number): number {
  const rampUp = smoothstep((t - T_PLEDGE) / 1.5);
  const fadeStart = T_PLEDGE + PLEDGE_DUR;
  const fade = 1 - smoothstep((t - fadeStart) / 2);
  return clamp01(rampUp) * clamp01(fade);
}

export function abnerPrincipalPose(t: number): AbnerPose {
  const base = partyFigurePose(t, {
    arriveStagger: 0,
    departStagger: 0,
    laneOffset: 0,
    destSlot: ABNER_FEAST_POS,
  });
  const facingDavid =
    base.seated > 0.5
      ? yawToward(base.x, base.z, DAVID_FEAST_POS[0], DAVID_FEAST_POS[1])
      : base.yaw;
  return { ...base, yaw: facingDavid, pledge: pledgeEnvelope(t) };
}

// ---------------------------------------------------------------------------
// David: present at Hebron throughout (not "arriving" — the established
// following already settled there, per hebron-anointing). Watches the north
// road until the party is received, then turns to face Abner across the
// feast ground for the feast/pledge/peace beats.

export interface DavidPose {
  x: number;
  z: number;
  yaw: number;
  /** 0..1 — David stands to receive Abner, sits with him for the shared
   * meal (b-feast/b-pledge), then stands again to send him off in peace
   * (b-peace) — the same disclosed seated-posture placeholder as the
   * crowd's `seated` field, applied to the host as well. */
  seated: number;
}

const DAVID_SIT_DUR = T_FEAST - T_SETTLE + 4;
const DAVID_RISE_DUR = 4;

export function davidPrincipalPose(t: number): DavidPose {
  const watchYaw = yawToward(
    DAVID_FEAST_POS[0],
    DAVID_FEAST_POS[1],
    GATE_PLAZA_CENTER[0],
    GATE_PLAZA_CENTER[1],
  );
  const faceAbnerYaw = yawToward(
    DAVID_FEAST_POS[0],
    DAVID_FEAST_POS[1],
    ABNER_FEAST_POS[0],
    ABNER_FEAST_POS[1],
  );
  const turn = smoothstep((t - T_SETTLE) / DAVID_SIT_DUR);
  const sitDown = smoothstep((t - T_SETTLE) / DAVID_SIT_DUR);
  const standUp = 1 - smoothstep((t - T_PEACE) / DAVID_RISE_DUR);
  const seated = Math.min(sitDown, standUp);
  return {
    x: DAVID_FEAST_POS[0],
    z: DAVID_FEAST_POS[1],
    yaw: lerp(watchYaw, faceAbnerYaw, turn),
    seated,
  };
}

// Re-exported for components that need the feast ground's own center
// (e.g. for camera framing helpers) without a second import path.
export const FEAST_CENTER = FEAST_GROUND_CENTER;
