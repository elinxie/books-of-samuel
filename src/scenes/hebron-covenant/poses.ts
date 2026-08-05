import * as THREE from 'three';
import { ABNER_FEAST_POS, DAVID_FEAST_POS, NORTH_ROAD_CURVE, RECEPTION_POS } from './layout';

/**
 * Pure, beat-driven pose/timing choreography for hebron-covenant (ADR-007
 * convention, mirroring hebron-anointing/gibeon-pool's poses.ts). Beat times
 * match `src/data/scenes.ts`'s `hebron-covenant` entry exactly (`b-long-war`
 * through `b-close`) — see docs/design/hebron-covenant-brief.md, "Camera /
 * observer experience".
 *
 * Hard constraints carried here: nothing in this file ever stages Michal,
 * Paltiel, or Rizpah geometry (all three are referenced-only character
 * entries, per the brief's "Resolved design calls"); nothing stages Mahanaim
 * or Bahurim; Joab is never present (the text is explicit he was away,
 * 3:22 — that belongs to `hebron-gate`); and the departure beat (`b-peace`)
 * never accelerates, darkens, or otherwise dramatizes the party's exit — it
 * recedes at the same unhurried pace it arrived, "held straight," per the
 * brief's "Historical intent" #2. No function here ever produces content
 * from 2 Samuel 3:22 onward, let alone 2 Samuel 5 onward.
 */

export const T_LONG_WAR = 0;
export const T_BREAK = 12;
export const T_OVERTURE = 24;
export const T_ELDERS = 36;
export const T_ARRIVAL = 46;
export const ARRIVAL_TRAVEL_DUR = 30;
export const RECEPTION_SETTLE_DUR = 8;
export const T_FEAST = T_ARRIVAL + ARRIVAL_TRAVEL_DUR + RECEPTION_SETTLE_DUR; // 84
export const T_PLEDGE = 112;
export const T_PEACE = 128;
export const RETURN_TO_ROAD_DUR = 8;
export const DEPARTURE_TRAVEL_DUR = 10;
export const T_CLOSE = T_PEACE + RETURN_TO_ROAD_DUR + DEPARTURE_TRAVEL_DUR; // 146
export const DURATION_SEC = 150;

const T_TRAVEL_END = T_ARRIVAL + ARRIVAL_TRAVEL_DUR; // 76 — reception reached
const T_RETURN_END = T_PEACE + RETURN_TO_ROAD_DUR; // 136 — back on the road
/** How far back up the road the party gets by `T_CLOSE`, at roughly the
 * same pace as the arrival march — "diminishing," never required to leave
 * the frame entirely by scene end (brief: "hold the frame... watched"). */
const DEPARTURE_U_FLOOR = 1 - DEPARTURE_TRAVEL_DUR / ARRIVAL_TRAVEL_DUR;

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

/** Hoisted (jabesh-burial c5aac8f precedent): the curve's own endpoint is a
 * fixed point equal to `RECEPTION_POS` by construction — reused rather than
 * resampled from the curve every frame for every figure. */
const ROAD_END_POINT = NORTH_ROAD_CURVE.getPointAt(1);
const ROAD_MID_POINT = NORTH_ROAD_CURVE.getPointAt(0.5);
const ROAD_OUTWARD_POINT = NORTH_ROAD_CURVE.getPointAt(0.6);

/** Scratch targets for `curvePoint` (tmpVec/tmpTan pattern, ReturningMen.tsx
 * precedent) — `curvePoint` runs inside `PartyFigures`' and
 * `PrincipalFigures`' per-frame `useFrame` loops (21 calls/frame — Abner's
 * twenty men plus Abner himself — during the arrival/departure travel
 * windows), so `getPointAt`/`getTangentAt` must write into reused Vector3s
 * rather than each allocate a fresh one every call. */
const tmpPos = new THREE.Vector3();
const tmpTan = new THREE.Vector3();

function curvePoint(u: number): { x: number; z: number; yaw: number } {
  const c = clamp01(u);
  NORTH_ROAD_CURVE.getPointAt(c, tmpPos);
  NORTH_ROAD_CURVE.getTangentAt(Math.min(0.999, Math.max(0.001, c)), tmpTan);
  return { x: tmpPos.x, z: tmpPos.z, yaw: Math.atan2(tmpTan.x, tmpTan.z) };
}

// ---------------------------------------------------------------------------
// Abner's twenty men (b-arrival, b-feast, b-pledge, b-peace, 3:20-21):
// march up the northern road, settle to a feast-ground seat, hold through
// the pledge, then return to the road and recede north — the same curve
// used twice, per the brief's "Focal masses" (d).

export interface PartyMember {
  laneOffset: number;
  feastSlot: [number, number];
}

export interface PartyPose {
  x: number;
  z: number;
  yaw: number;
}

/** Position/orientation for one of Abner's twenty men at scene time `t`.
 * Exported for unit tests. */
export function partyMemberPose(t: number, fig: PartyMember): PartyPose {
  if (t < T_ARRIVAL) {
    const p = curvePoint(0);
    return { x: p.x + fig.laneOffset, z: p.z, yaw: p.yaw };
  }

  if (t < T_TRAVEL_END) {
    const u = smoothstep((t - T_ARRIVAL) / ARRIVAL_TRAVEL_DUR);
    const p = curvePoint(u);
    return { x: p.x + fig.laneOffset, z: p.z, yaw: p.yaw };
  }

  if (t < T_FEAST) {
    const s = smoothstep((t - T_TRAVEL_END) / RECEPTION_SETTLE_DUR);
    return {
      x: lerp(ROAD_END_POINT.x + fig.laneOffset, fig.feastSlot[0], s),
      z: lerp(ROAD_END_POINT.z, fig.feastSlot[1], s),
      yaw: yawToward(ROAD_END_POINT.x, ROAD_END_POINT.z, fig.feastSlot[0], fig.feastSlot[1]),
    };
  }

  if (t < T_PEACE) {
    return {
      x: fig.feastSlot[0],
      z: fig.feastSlot[1],
      yaw: yawToward(fig.feastSlot[0], fig.feastSlot[1], DAVID_FEAST_POS[0], DAVID_FEAST_POS[1]),
    };
  }

  if (t < T_RETURN_END) {
    const s = smoothstep((t - T_PEACE) / RETURN_TO_ROAD_DUR);
    return {
      x: lerp(fig.feastSlot[0], ROAD_END_POINT.x + fig.laneOffset, s),
      z: lerp(fig.feastSlot[1], ROAD_END_POINT.z, s),
      yaw: yawToward(fig.feastSlot[0], fig.feastSlot[1], ROAD_END_POINT.x, ROAD_END_POINT.z),
    };
  }

  const s = smoothstep((t - T_RETURN_END) / DEPARTURE_TRAVEL_DUR);
  const u = lerp(1, DEPARTURE_U_FLOOR, s);
  const p = curvePoint(u);
  return { x: p.x + fig.laneOffset, z: p.z, yaw: p.yaw + Math.PI };
}

/** Abner himself: the same arc as his twenty men (laneOffset 0, seated at
 * `ABNER_FEAST_POS`) — a named principal, but choreographed by the same
 * pure function, per ADR-007. Exported for unit tests. */
export function abnerPrincipalPose(t: number): PartyPose {
  return partyMemberPose(t, { laneOffset: 0, feastSlot: ABNER_FEAST_POS });
}

const PLEDGE_GESTURE_DUR = 6;

/** 0..1 bell-curve envelope for Abner's pledge gesture (a raised-hand oath,
 * b-pledge, 3:21a), centered on `T_PLEDGE` — a small, normalized gesture
 * channel (ADR-007), not a strike or any violent motion. Exported for unit
 * tests. */
export function pledgeGestureEnvelope(t: number): number {
  const rampUp = smoothstep((t - T_PLEDGE) / 1.2);
  const fadeStart = T_PLEDGE + PLEDGE_GESTURE_DUR;
  const fade = 1 - smoothstep((t - fadeStart) / 2);
  return clamp01(rampUp) * clamp01(fade);
}

// ---------------------------------------------------------------------------
// David (b-arrival through b-close): stands at the reception point to
// receive Abner, moves to the feast ground for the meal and the pledge,
// then returns to the reception point to see Abner off — holding there,
// facing the road, through the peace beat and the closing card. Exported
// for unit tests.

export interface DavidPose {
  x: number;
  z: number;
  yaw: number;
}

export function davidPose(t: number): DavidPose {
  if (t < T_FEAST) {
    return {
      x: RECEPTION_POS[0],
      z: RECEPTION_POS[1],
      yaw: yawToward(RECEPTION_POS[0], RECEPTION_POS[1], ROAD_MID_POINT.x, ROAD_MID_POINT.z),
    };
  }

  if (t < T_PEACE) {
    return {
      x: DAVID_FEAST_POS[0],
      z: DAVID_FEAST_POS[1],
      yaw: yawToward(
        DAVID_FEAST_POS[0],
        DAVID_FEAST_POS[1],
        ABNER_FEAST_POS[0],
        ABNER_FEAST_POS[1],
      ),
    };
  }

  if (t < T_RETURN_END) {
    const s = smoothstep((t - T_PEACE) / RETURN_TO_ROAD_DUR);
    return {
      x: lerp(DAVID_FEAST_POS[0], RECEPTION_POS[0], s),
      z: lerp(DAVID_FEAST_POS[1], RECEPTION_POS[1], s),
      yaw: yawToward(DAVID_FEAST_POS[0], DAVID_FEAST_POS[1], RECEPTION_POS[0], RECEPTION_POS[1]),
    };
  }

  // Watching the northern road as Abner's party recedes — the scene's final
  // image (b-peace/b-close), held straight, no dread staging.
  return {
    x: RECEPTION_POS[0],
    z: RECEPTION_POS[1],
    yaw: yawToward(RECEPTION_POS[0], RECEPTION_POS[1], ROAD_OUTWARD_POINT.x, ROAD_OUTWARD_POINT.z),
  };
}
