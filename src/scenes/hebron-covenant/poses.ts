import {
  ABNER_PRINCIPAL_SEAT,
  ARRIVAL_GATHER_CENTER,
  DAVID_FEAST_CLUSTER_CENTER,
  DAVID_PRINCIPAL_SEAT,
  NORTH_ROAD_END,
  NORTH_ROAD_START,
  northRoadPointAt,
} from './layout';

/**
 * Pure, beat-driven pose/timing choreography for hebron-covenant (ADR-007
 * convention, mirroring hebron-anointing/gibeon-pool's poses.ts). Beat times
 * match `src/data/scenes.ts`'s `hebron-covenant` entry exactly (`b-long-war`
 * through `b-close`) — see docs/design/hebron-covenant-brief.md, "Camera /
 * observer experience".
 *
 * Hard constraints carried here: nothing in this file ever stages Michal,
 * Paltiel, Rizpah, Mahanaim, or Bahurim geometry (3:1-19 is card-only, per
 * the brief); Joab never appears (the text is explicit he was away, 3:22 —
 * `hebron-gate`'s territory); the departure (`abnerPartyFigurePose`'s final
 * phase) never reads as dread or foreboding — it is staged as a straight,
 * unhurried, watched dismissal, "and he went in peace" (3:21b).
 */

export const T_LONG_WAR = 0;
export const T_BREAK = 14;
export const T_OVERTURE = 28;
export const T_ELDERS = 42;
export const T_ARRIVAL = 54;
export const ARRIVAL_WALK_DUR = 18;
export const T_ARRIVAL_GATHERED = T_ARRIVAL + ARRIVAL_WALK_DUR; // 72
export const ARRIVAL_GATHER_DUR = 5;
export const T_FEAST = 82;
export const FEAST_SEAT_DUR = 7;
export const T_PLEDGE = 104;
export const PLEDGE_GESTURE_DUR = 7;
export const T_PEACE = 118;
export const DEPART_GATHER_DUR = 4;
export const T_DEPART_WALK = T_PEACE + DEPART_GATHER_DUR; // 122
export const DEPART_WALK_DUR = 18;
export const T_CLOSE = 146;
export const DURATION_SEC = 152;

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
// Abner's twenty men (3:20, literal 1:1) and Abner himself: the northern
// road (arrival) -> a brief reception gathering just inside the gate plaza
// -> the feast seat -> (after the pledge) back to the gathering point -> the
// northern road again, walked in reverse, holding at the far-north start
// point for the rest of the scene — "he went in peace," diminishing up the
// road, not fading out or being cut away from.

export interface CovenantFigureConfig {
  laneOffset: number;
  arriveStagger: number;
  feastSlot: [number, number];
  departStagger: number;
}

export interface CovenantFigurePose {
  x: number;
  z: number;
  yaw: number;
  visible: boolean;
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

/** Abner's men: hidden until their own (staggered) arrival start, then walk
 * the road, gather, seat at the feast, and — after the peace beat — reverse
 * the whole journey. Exported for unit tests. */
export function abnerPartyFigurePose(t: number, fig: CovenantFigureConfig): CovenantFigurePose {
  const arriveStart = T_ARRIVAL + fig.arriveStagger;
  if (t < arriveStart) {
    return {
      x: NORTH_ROAD_START.x,
      z: NORTH_ROAD_START.z,
      yaw: NORTH_ROAD_START.yaw,
      visible: false,
    };
  }

  const arriveEnd = arriveStart + ARRIVAL_WALK_DUR;
  if (t < arriveEnd) {
    const u = smoothstep((t - arriveStart) / ARRIVAL_WALK_DUR);
    const p = northRoadPointAt(u);
    return { x: p.x + fig.laneOffset, z: p.z, yaw: p.yaw, visible: true };
  }

  const [gx, gz] = [ARRIVAL_GATHER_CENTER[0] + fig.laneOffset, ARRIVAL_GATHER_CENTER[1]];
  const gatherEnd = arriveEnd + ARRIVAL_GATHER_DUR;
  if (t < gatherEnd) {
    const p = smoothstep((t - arriveEnd) / ARRIVAL_GATHER_DUR);
    const pos = lerpToward(NORTH_ROAD_END.x + fig.laneOffset, NORTH_ROAD_END.z, gx, gz, p);
    return { ...pos, yaw: yawToward(pos.x, pos.z, gx, gz), visible: true };
  }

  const [sx, sz] = fig.feastSlot;
  const facingSeated = yawToward(
    sx,
    sz,
    DAVID_FEAST_CLUSTER_CENTER[0],
    DAVID_FEAST_CLUSTER_CENTER[1],
  );
  const departStart = T_PEACE + fig.departStagger;

  if (t < departStart) {
    const seatEnd = T_FEAST + FEAST_SEAT_DUR;
    if (t < seatEnd) {
      const p = smoothstep((t - T_FEAST) / FEAST_SEAT_DUR);
      const pos = lerpToward(gx, gz, sx, sz, p);
      return {
        ...pos,
        yaw: yawToward(pos.x, pos.z, DAVID_FEAST_CLUSTER_CENTER[0], DAVID_FEAST_CLUSTER_CENTER[1]),
        visible: true,
      };
    }
    return { x: sx, z: sz, yaw: facingSeated, visible: true };
  }

  const departGatherEnd = departStart + DEPART_GATHER_DUR;
  if (t < departGatherEnd) {
    const p = smoothstep((t - departStart) / DEPART_GATHER_DUR);
    const pos = lerpToward(sx, sz, gx, gz, p);
    return {
      ...pos,
      yaw: yawToward(pos.x, pos.z, NORTH_ROAD_END.x, NORTH_ROAD_END.z),
      visible: true,
    };
  }

  const walkEnd = departGatherEnd + DEPART_WALK_DUR;
  if (t < walkEnd) {
    const u = 1 - smoothstep((t - departGatherEnd) / DEPART_WALK_DUR);
    const p = northRoadPointAt(u);
    return { x: p.x + fig.laneOffset, z: p.z, yaw: p.yaw + Math.PI, visible: true };
  }

  return {
    x: NORTH_ROAD_START.x + fig.laneOffset,
    z: NORTH_ROAD_START.z,
    yaw: NORTH_ROAD_START.yaw + Math.PI,
    visible: true,
  };
}

// ---------------------------------------------------------------------------
// Abner himself: leads the column in, seated forward of his men at the
// feast, delivers the pledge gesture, then leads the party back out.

export interface AbnerPose {
  x: number;
  z: number;
  yaw: number;
  /** 0..1 the pledge gesture envelope (b-pledge, 3:21a) — a raised-hand oath
   * posture, never a strike or aggressive gesture. */
  pledge: number;
}

const ABNER_LEAD = 4; // Abner arrives slightly ahead of his men's column

export function abnerPrincipalPose(t: number): AbnerPose {
  const arriveStart = T_ARRIVAL - ABNER_LEAD;
  const pledge = clamp01(
    smoothstep((t - T_PLEDGE) / 1.5) * (1 - smoothstep((t - (T_PLEDGE + PLEDGE_GESTURE_DUR)) / 2)),
  );

  if (t < arriveStart) {
    return { x: NORTH_ROAD_START.x, z: NORTH_ROAD_START.z, yaw: NORTH_ROAD_START.yaw, pledge: 0 };
  }

  const arriveEnd = arriveStart + ARRIVAL_WALK_DUR;
  if (t < arriveEnd) {
    const u = smoothstep((t - arriveStart) / ARRIVAL_WALK_DUR);
    const p = northRoadPointAt(u);
    return { x: p.x, z: p.z, yaw: p.yaw, pledge: 0 };
  }

  const [gx, gz] = ARRIVAL_GATHER_CENTER;
  const gatherEnd = arriveEnd + ARRIVAL_GATHER_DUR;
  if (t < gatherEnd) {
    const p = smoothstep((t - arriveEnd) / ARRIVAL_GATHER_DUR);
    const pos = lerpToward(NORTH_ROAD_END.x, NORTH_ROAD_END.z, gx, gz, p);
    return { ...pos, yaw: yawToward(pos.x, pos.z, gx, gz), pledge: 0 };
  }

  const [sx, sz] = ABNER_PRINCIPAL_SEAT;
  const facingDavid = yawToward(sx, sz, DAVID_PRINCIPAL_SEAT[0], DAVID_PRINCIPAL_SEAT[1]);
  const departStart = T_PEACE;

  if (t < departStart) {
    const seatEnd = T_FEAST + FEAST_SEAT_DUR;
    if (t < seatEnd) {
      const p = smoothstep((t - T_FEAST) / FEAST_SEAT_DUR);
      const pos = lerpToward(gx, gz, sx, sz, p);
      return {
        ...pos,
        yaw: yawToward(pos.x, pos.z, DAVID_PRINCIPAL_SEAT[0], DAVID_PRINCIPAL_SEAT[1]),
        pledge: 0,
      };
    }
    return { x: sx, z: sz, yaw: facingDavid, pledge };
  }

  const departGatherEnd = departStart + DEPART_GATHER_DUR;
  if (t < departGatherEnd) {
    const p = smoothstep((t - departStart) / DEPART_GATHER_DUR);
    const pos = lerpToward(sx, sz, gx, gz, p);
    return { ...pos, yaw: yawToward(pos.x, pos.z, NORTH_ROAD_END.x, NORTH_ROAD_END.z), pledge: 0 };
  }

  const walkEnd = departGatherEnd + DEPART_WALK_DUR;
  if (t < walkEnd) {
    const u = 1 - smoothstep((t - departGatherEnd) / DEPART_WALK_DUR);
    const p = northRoadPointAt(u);
    return { x: p.x, z: p.z, yaw: p.yaw + Math.PI, pledge: 0 };
  }

  return {
    x: NORTH_ROAD_START.x,
    z: NORTH_ROAD_START.z,
    yaw: NORTH_ROAD_START.yaw + Math.PI,
    pledge: 0,
  };
}

// ---------------------------------------------------------------------------
// David: stands at his feast seat throughout — this is his own court/table,
// prepared in advance (3:20's "David made Abner ... a feast"), so he is
// never staged traveling the road. Only his facing changes: toward the road
// while Abner's party arrives/is received, toward Abner across the mats
// during the feast/pledge, toward the road again to see the party off.

export interface DavidPose {
  x: number;
  z: number;
  yaw: number;
}

export function davidPrincipalPose(t: number): DavidPose {
  const [x, z] = DAVID_PRINCIPAL_SEAT;
  const towardRoad = yawToward(x, z, ARRIVAL_GATHER_CENTER[0], ARRIVAL_GATHER_CENTER[1]);
  const towardAbner = yawToward(x, z, ABNER_PRINCIPAL_SEAT[0], ABNER_PRINCIPAL_SEAT[1]);

  if (t < T_ARRIVAL_GATHERED + ARRIVAL_GATHER_DUR) {
    const turn = smoothstep((t - T_ARRIVAL) / 6);
    return { x, z, yaw: lerp(0, towardRoad, turn) };
  }
  if (t < T_PEACE) {
    const turn = smoothstep((t - (T_ARRIVAL_GATHERED + ARRIVAL_GATHER_DUR)) / 5);
    return { x, z, yaw: lerp(towardRoad, towardAbner, turn) };
  }
  const turn = smoothstep((t - T_PEACE) / 5);
  return { x, z, yaw: lerp(towardAbner, towardRoad, turn) };
}
