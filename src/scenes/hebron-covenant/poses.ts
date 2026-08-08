import { ABNER_SEAT_POS, DAVID_SEAT_POS, NORTH_ROAD_CURVE } from './layout';

/**
 * Pure, beat-driven pose/timing choreography for hebron-covenant (ADR-007
 * convention, mirroring hebron-anointing/gibeon-pool's poses.ts). Beat times
 * match `src/data/scenes.ts`'s `hebron-covenant` entry exactly (`b-long-war`
 * through `b-close`) — see docs/design/hebron-covenant-brief.md, "Camera /
 * observer experience".
 *
 * Hard constraints carried here: nothing in this file ever stages Michal,
 * Paltiel, Rizpah, Mahanaim, or Bahurim geometry (all of 3:1–19 is
 * context-card-only, brief's "Resolved design calls"); the departure
 * (`T_PEACE` onward) never reads as dread or ambush staging — it is the
 * exact mirror of the arrival envelope, walked in reverse, "settled, public,
 * peaceable" per the brief's historical intent #2; and nothing here ever
 * renders Joab or any event at/after 2 Samuel 3:22.
 */

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
// Beat timeline (must match scenes.ts's hebron-covenant beat `timeSec`s).

export const T_LONG_WAR = 0;
export const T_BREAK = 15;
export const T_OVERTURE = 30;
export const T_ELDERS = 45;
export const T_ARRIVAL = 60;
export const T_FEAST = 90;
export const T_PLEDGE = 115;
export const T_PEACE = 130;
export const T_CLOSE = 145;
export const DURATION_SEC = 150;

/** How long the arrival/departure legs each take. Arrival finishes well
 * before b-feast (90); departure finishes exactly at the scene's own end. */
export const ARRIVE_DUR = 24;
export const DEPART_DUR = 20;

const CURVE_ROAD_END = NORTH_ROAD_CURVE.getPointAt(1);
const CURVE_ROAD_START = NORTH_ROAD_CURVE.getPointAt(0);

/** Fraction of the arrival/departure envelope spent literally traveling
 * `NORTH_ROAD_CURVE`; the remainder is a short fan-out from the curve's end
 * to each figure's own feast-ground slot — the same two-phase pattern
 * hebron-anointing's approach/settle used, generalized to run identically
 * forwards (arrival) and backwards (departure) from one envelope value. */
const CURVE_ROAD_FRAC = 0.82;

/**
 * 0..1 presence envelope: 0 = off-scene (still on/beyond the northern
 * horizon, not yet arrived, or already departed out of frame), 1 = settled
 * at the feast ground. Rises across the arrival beat, holds through the
 * feast/pledge beats, falls across the peace beat. `arriveStagger`/
 * `departStagger` (seconds) offset individual figures so a crowd never
 * moves in lockstep. Exported for unit tests.
 */
export function presenceEnvelope(t: number, arriveStagger = 0, departStagger = 0): number {
  const arriveAt = T_ARRIVAL + arriveStagger;
  const departAt = T_PEACE + departStagger;
  if (t < arriveAt) return 0;
  if (t < arriveAt + ARRIVE_DUR) return smoothstep((t - arriveAt) / ARRIVE_DUR);
  if (t < departAt) return 1;
  if (t < departAt + DEPART_DUR) return 1 - smoothstep((t - departAt) / DEPART_DUR);
  return 0;
}

export interface RoadPose {
  x: number;
  z: number;
  yaw: number;
}

/**
 * Maps a 0..1 presence value to a position: the road for the outer
 * `CURVE_ROAD_FRAC` of the journey, then a short fan-out to `destSlot` for
 * the final approach — used identically for arrival (p rising) and
 * departure (p falling), so the two legs of the journey read as a literal
 * mirror of each other, never a different, more hurried or furtive
 * departure choreography. Exported for unit tests.
 */
export function roadPresencePose(
  p: number,
  laneOffset: number,
  destSlot: readonly [number, number],
): RoadPose {
  const cp = clamp01(p);
  if (cp <= CURVE_ROAD_FRAC) {
    const u = clamp01(cp / CURVE_ROAD_FRAC);
    const pos = NORTH_ROAD_CURVE.getPointAt(u);
    const tan = NORTH_ROAD_CURVE.getTangentAt(Math.max(0.001, u));
    return { x: pos.x + laneOffset, z: pos.z, yaw: Math.atan2(tan.x, tan.z) };
  }
  const q = clamp01((cp - CURVE_ROAD_FRAC) / (1 - CURVE_ROAD_FRAC));
  const x = lerp(CURVE_ROAD_END.x + laneOffset, destSlot[0], q);
  const z = lerp(CURVE_ROAD_END.z, destSlot[1], q);
  return { x, z, yaw: yawToward(x, z, destSlot[0], destSlot[1]) };
}

// ---------------------------------------------------------------------------
// Abner's pledge gesture (3:21a): a brief oath/address gesture at the feast
// ground, centered on T_PLEDGE — the same bell-curve-envelope convention as
// hebron-anointing's anointingPourEnvelope.

export const PLEDGE_GESTURE_DUR = 8;

/** 0..1 bell-curve envelope for Abner's pledge gesture, centered on
 * `T_PLEDGE`. Exported for unit tests. */
export function pledgeGestureEnvelope(t: number): number {
  const rampUp = smoothstep((t - T_PLEDGE) / 1.5);
  const fadeStart = T_PLEDGE + PLEDGE_GESTURE_DUR;
  const fade = 1 - smoothstep((t - fadeStart) / 2);
  return clamp01(rampUp) * clamp01(fade);
}

// ---------------------------------------------------------------------------
// Abner (principal figure): travels the north road, sits opposite David for
// the feast/pledge beats, then walks the same road back out in peace.

export interface AbnerPose {
  x: number;
  z: number;
  yaw: number;
  visible: boolean;
  pledge: number;
}

/** Abner's pose at scene time `t`. Exported for unit tests. */
export function abnerPose(t: number): AbnerPose {
  const p = presenceEnvelope(t);
  if (p <= 0.001) {
    return {
      x: CURVE_ROAD_START.x,
      z: CURVE_ROAD_START.z,
      yaw: 0,
      visible: false,
      pledge: 0,
    };
  }
  const pose = roadPresencePose(p, 0, ABNER_SEAT_POS);
  const settled = t >= T_ARRIVAL + ARRIVE_DUR && t < T_PEACE;
  const settledYaw = yawToward(
    ABNER_SEAT_POS[0],
    ABNER_SEAT_POS[1],
    DAVID_SEAT_POS[0],
    DAVID_SEAT_POS[1],
  );
  return {
    x: pose.x,
    z: pose.z,
    yaw: settled ? settledYaw : pose.yaw,
    visible: true,
    pledge: pledgeGestureEnvelope(t),
  };
}

// ---------------------------------------------------------------------------
// David (principal figure): present at the feast ground throughout —
// already at Hebron since hebron-anointing, not traveling in this scene.
// Turns to track Abner once he is visible (arrival through departure),
// otherwise faces the road/gate — the "watched" quality the brief calls for
// on the departure beat falls straight out of this, with no extra staging.

export interface DavidPose {
  x: number;
  z: number;
  yaw: number;
}

/** David's pose at scene time `t`. Exported for unit tests. */
export function davidPose(t: number): DavidPose {
  const abner = abnerPose(t);
  const target = abner.visible
    ? ([abner.x, abner.z] as const)
    : ([CURVE_ROAD_START.x, CURVE_ROAD_START.z] as const);
  return {
    x: DAVID_SEAT_POS[0],
    z: DAVID_SEAT_POS[1],
    yaw: yawToward(DAVID_SEAT_POS[0], DAVID_SEAT_POS[1], target[0], target[1]),
  };
}

// ---------------------------------------------------------------------------
// The twenty (crowd instanced figures): same envelope as Abner, staggered
// per-figure, each fanning out to its own slot near Abner rather than to a
// single shared point.

export interface PartyFigureSpec {
  laneOffset: number;
  arriveStagger: number;
  departStagger: number;
  destSlot: readonly [number, number];
}

export interface PartyPose extends RoadPose {
  visible: boolean;
}

/** One of the twenty's pose at scene time `t`. Exported for unit tests. */
export function partyMemberPose(t: number, fig: PartyFigureSpec): PartyPose {
  const p = presenceEnvelope(t, fig.arriveStagger, fig.departStagger);
  if (p <= 0.001) {
    return {
      x: CURVE_ROAD_START.x + fig.laneOffset,
      z: CURVE_ROAD_START.z,
      yaw: 0,
      visible: false,
    };
  }
  const pose = roadPresencePose(p, fig.laneOffset, fig.destSlot);
  return { ...pose, visible: true };
}
