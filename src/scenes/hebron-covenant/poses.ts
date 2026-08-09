import {
  ABNER_FEAST_POS,
  ARRIVAL_MEET_POS,
  DAVID_FEAST_POS,
  DAVID_REST_POS,
  NORTH_ROAD_CURVE,
} from './layout';

/**
 * Pure, beat-driven pose/timing choreography for hebron-covenant (ADR-007
 * convention, mirroring hebron-anointing/gibeon-pool's poses.ts). Beat times
 * match `src/data/scenes.ts`'s `hebron-covenant` entry exactly (`b-long-war`
 * through `b-close`) — see docs/design/hebron-covenant-brief.md, "Camera /
 * observer experience".
 *
 * Hard constraints carried here: nothing in this file ever stages Rizpah,
 * Michal, Paltiel, Mahanaim, Bahurim, or Joab geometry (3:1-19 and 3:22+ are
 * card-only, per the brief's scope guard) — every function below only ever
 * produces positions for the arrival/feast/departure beats (3:20-21) at
 * Hebron itself. The departure (`covenantDeparturePhase`) is deliberately
 * unhurried and never applies a "dread" transform (no speed-up, no darkening,
 * no camera-shake channel) — "he went in peace" must read straight.
 */

export const T_LONG_WAR = 0;
export const T_BREAK = 16;
export const T_OVERTURE = 32;
export const T_ELDERS = 48;
export const T_ARRIVAL = 64;
export const T_FEAST = 90;
export const T_PLEDGE = 112;
export const T_PEACE = 128;
export const T_CLOSE = 150;
export const DURATION_SEC = 160;

/** Abner arrives at the gate a little ahead of his twenty — the same
 * "leadership reads by staging only" convention as hebron-anointing's
 * `DAVID_ARRIVE`. */
export const ABNER_ARRIVE = T_ARRIVAL - 4;
/** David is already standing at the meeting point when Abner arrives —
 * received, not surprised. */
export const DAVID_MEET_START = ABNER_ARRIVE - 8;

export const RECEIVE_HOLD_END = T_ARRIVAL + 6;
export const WALK_TO_GATE_DUR = 8;
export const REVERSE_TRAVEL_DUR = 22;

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

export interface Pose2D {
  x: number;
  z: number;
  yaw: number;
}

// ---------------------------------------------------------------------------
// Abner's twenty (3:20's exact, literal count — claim-covenant-feast): climb
// the northern road, are received at the gate, walk to the feast ground and
// are seated, then retrace the same road home once dismissed ("he went in
// peace", 3:21b). Every figure shares the same phase boundaries; per-figure
// `laneOffset` only varies lateral position on the road, never timing, so the
// twenty always read as one escorted party, not a straggling column.

export interface EscortFigure {
  laneOffset: number;
  lineupSlot: [number, number];
  seatSlot: [number, number];
}

/** Position/orientation for one of Abner's twenty at scene time `t`. Exported
 * for unit tests. */
export function abnerEscortPose(t: number, fig: EscortFigure): Pose2D {
  const curveEnd = NORTH_ROAD_CURVE.getPointAt(1);
  const curveStart = NORTH_ROAD_CURVE.getPointAt(0);

  // Phase 1: travel the northern road inbound, 0 -> T_ARRIVAL.
  if (t < T_ARRIVAL) {
    const u = clamp01(smoothstep(t / T_ARRIVAL));
    const pos = NORTH_ROAD_CURVE.getPointAt(u);
    const tan = NORTH_ROAD_CURVE.getTangentAt(Math.max(0.001, u));
    return { x: pos.x + fig.laneOffset, z: pos.z, yaw: Math.atan2(tan.x, tan.z) };
  }

  // Phase 2: settle into the gate lineup, T_ARRIVAL -> RECEIVE_HOLD_END.
  if (t < RECEIVE_HOLD_END) {
    const p = smoothstep((t - T_ARRIVAL) / (RECEIVE_HOLD_END - T_ARRIVAL));
    const x = lerp(curveEnd.x + fig.laneOffset, fig.lineupSlot[0], p);
    const z = lerp(curveEnd.z, fig.lineupSlot[1], p);
    return { x, z, yaw: yawToward(x, z, fig.seatSlot[0], fig.seatSlot[1]) };
  }

  // Phase 3: walk from the gate lineup to the feast seat, -> T_FEAST.
  if (t < T_FEAST) {
    const p = smoothstep((t - RECEIVE_HOLD_END) / (T_FEAST - RECEIVE_HOLD_END));
    const x = lerp(fig.lineupSlot[0], fig.seatSlot[0], p);
    const z = lerp(fig.lineupSlot[1], fig.seatSlot[1], p);
    return { x, z, yaw: yawToward(x, z, ABNER_FEAST_POS[0], ABNER_FEAST_POS[1]) };
  }

  // Phase 4: at the feast, T_FEAST -> T_PEACE ("he made... a feast", 3:20b).
  if (t < T_PEACE) {
    return {
      x: fig.seatSlot[0],
      z: fig.seatSlot[1],
      yaw: yawToward(fig.seatSlot[0], fig.seatSlot[1], ABNER_FEAST_POS[0], ABNER_FEAST_POS[1]),
    };
  }

  const gateReturnEnd = T_PEACE + WALK_TO_GATE_DUR;
  // Phase 5: walk back from the feast seat to the gate, T_PEACE -> gateReturnEnd.
  if (t < gateReturnEnd) {
    const p = smoothstep((t - T_PEACE) / WALK_TO_GATE_DUR);
    const x = lerp(fig.seatSlot[0], fig.lineupSlot[0], p);
    const z = lerp(fig.seatSlot[1], fig.lineupSlot[1], p);
    return { x, z, yaw: yawToward(x, z, curveEnd.x + fig.laneOffset, curveEnd.z) };
  }

  const reverseEnd = gateReturnEnd + REVERSE_TRAVEL_DUR;
  // Phase 6: retrace the northern road outbound — "he went in peace" (3:21b),
  // held at a steady, unhurried pace, never sped up or darkened.
  if (t < reverseEnd) {
    const p = clamp01(smoothstep((t - gateReturnEnd) / REVERSE_TRAVEL_DUR));
    const u = 1 - p;
    const pos = NORTH_ROAD_CURVE.getPointAt(u);
    const tan = NORTH_ROAD_CURVE.getTangentAt(Math.max(0.001, u));
    return { x: pos.x + fig.laneOffset, z: pos.z, yaw: Math.atan2(-tan.x, -tan.z) };
  }

  // Phase 7: gone, held at the far end of the road (out of the composition's
  // usual framing) for the remainder of the scene.
  return { x: curveStart.x + fig.laneOffset, z: curveStart.z, yaw: 0 };
}

// ---------------------------------------------------------------------------
// Abner (principal, claim-covenant-feast): the same phase structure as his
// twenty, but arriving slightly ahead and pledging at the feast (3:21a).

export interface AbnerPose extends Pose2D {
  /** 0..1 the pledge gesture (a lean-forward, speaking posture) — see
   * `abnerPledgeEnvelope`. */
  pledge: number;
}

export function abnerCovenantPose(t: number): AbnerPose {
  const curveEnd = NORTH_ROAD_CURVE.getPointAt(1);
  const curveStart = NORTH_ROAD_CURVE.getPointAt(0);
  const pledge = abnerPledgeEnvelope(t);

  if (t < ABNER_ARRIVE) {
    const u = clamp01(smoothstep(t / ABNER_ARRIVE));
    const pos = NORTH_ROAD_CURVE.getPointAt(u);
    const tan = NORTH_ROAD_CURVE.getTangentAt(Math.max(0.001, u));
    return { x: pos.x, z: pos.z, yaw: Math.atan2(tan.x, tan.z), pledge };
  }

  if (t < RECEIVE_HOLD_END) {
    const p = smoothstep((t - ABNER_ARRIVE) / (RECEIVE_HOLD_END - ABNER_ARRIVE));
    const x = lerp(curveEnd.x, ARRIVAL_MEET_POS[0], p);
    const z = lerp(curveEnd.z, ARRIVAL_MEET_POS[1], p);
    return { x, z, yaw: yawToward(x, z, DAVID_REST_POS[0], DAVID_REST_POS[1]), pledge };
  }

  if (t < T_FEAST) {
    const p = smoothstep((t - RECEIVE_HOLD_END) / (T_FEAST - RECEIVE_HOLD_END));
    const x = lerp(ARRIVAL_MEET_POS[0], ABNER_FEAST_POS[0], p);
    const z = lerp(ARRIVAL_MEET_POS[1], ABNER_FEAST_POS[1], p);
    return { x, z, yaw: yawToward(x, z, DAVID_FEAST_POS[0], DAVID_FEAST_POS[1]), pledge };
  }

  if (t < T_PEACE) {
    return {
      x: ABNER_FEAST_POS[0],
      z: ABNER_FEAST_POS[1],
      yaw: yawToward(
        ABNER_FEAST_POS[0],
        ABNER_FEAST_POS[1],
        DAVID_FEAST_POS[0],
        DAVID_FEAST_POS[1],
      ),
      pledge,
    };
  }

  const gateReturnEnd = T_PEACE + WALK_TO_GATE_DUR;
  if (t < gateReturnEnd) {
    const p = smoothstep((t - T_PEACE) / WALK_TO_GATE_DUR);
    const x = lerp(ABNER_FEAST_POS[0], ARRIVAL_MEET_POS[0], p);
    const z = lerp(ABNER_FEAST_POS[1], ARRIVAL_MEET_POS[1], p);
    return { x, z, yaw: yawToward(x, z, curveEnd.x, curveEnd.z), pledge };
  }

  const reverseEnd = gateReturnEnd + REVERSE_TRAVEL_DUR;
  if (t < reverseEnd) {
    const p = clamp01(smoothstep((t - gateReturnEnd) / REVERSE_TRAVEL_DUR));
    const u = 1 - p;
    const pos = NORTH_ROAD_CURVE.getPointAt(u);
    const tan = NORTH_ROAD_CURVE.getTangentAt(Math.max(0.001, u));
    return { x: pos.x, z: pos.z, yaw: Math.atan2(-tan.x, -tan.z), pledge };
  }

  return { x: curveStart.x, z: curveStart.z, yaw: 0, pledge };
}

/** 0..1 bell-curve envelope for Abner's pledge gesture (3:21a, "I will arise
 * and go and will gather all Israel to my lord the king..."), centered a
 * little before `T_PLEDGE` and fading by `T_PEACE`. A design-placeholder
 * speaking posture, not a specific attested gesture. Exported for unit
 * tests. */
export function abnerPledgeEnvelope(t: number): number {
  const rampUp = smoothstep((t - (T_PLEDGE - 3)) / 2.5);
  const fade = 1 - smoothstep((t - (T_PLEDGE + 6)) / 4);
  return clamp01(rampUp) * clamp01(fade);
}

// ---------------------------------------------------------------------------
// David (principal): already resident at Hebron (hebron-anointing) — walks
// out to receive Abner, hosts the feast, and escorts him back to the gate,
// then holds, watching the north road, through the departure.

export function davidCovenantPose(t: number): Pose2D {
  if (t < DAVID_MEET_START) {
    return { x: DAVID_REST_POS[0], z: DAVID_REST_POS[1], yaw: 0 };
  }

  if (t < ABNER_ARRIVE) {
    const p = smoothstep((t - DAVID_MEET_START) / (ABNER_ARRIVE - DAVID_MEET_START));
    const x = lerp(DAVID_REST_POS[0], ARRIVAL_MEET_POS[0], p);
    const z = lerp(DAVID_REST_POS[1], ARRIVAL_MEET_POS[1], p);
    return { x, z, yaw: yawToward(x, z, ARRIVAL_MEET_POS[0] + 4, ARRIVAL_MEET_POS[1]) };
  }

  if (t < RECEIVE_HOLD_END) {
    return {
      x: ARRIVAL_MEET_POS[0],
      z: ARRIVAL_MEET_POS[1],
      yaw: yawToward(
        ARRIVAL_MEET_POS[0],
        ARRIVAL_MEET_POS[1],
        DAVID_REST_POS[0],
        DAVID_REST_POS[1],
      ),
    };
  }

  if (t < T_FEAST) {
    const p = smoothstep((t - RECEIVE_HOLD_END) / (T_FEAST - RECEIVE_HOLD_END));
    const x = lerp(ARRIVAL_MEET_POS[0], DAVID_FEAST_POS[0], p);
    const z = lerp(ARRIVAL_MEET_POS[1], DAVID_FEAST_POS[1], p);
    return { x, z, yaw: yawToward(x, z, ABNER_FEAST_POS[0], ABNER_FEAST_POS[1]) };
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

  const gateReturnEnd = T_PEACE + WALK_TO_GATE_DUR;
  if (t < gateReturnEnd) {
    const p = smoothstep((t - T_PEACE) / WALK_TO_GATE_DUR);
    const x = lerp(DAVID_FEAST_POS[0], ARRIVAL_MEET_POS[0], p);
    const z = lerp(DAVID_FEAST_POS[1], ARRIVAL_MEET_POS[1], p);
    return { x, z, yaw: yawToward(x, z, ARRIVAL_MEET_POS[0], ARRIVAL_MEET_POS[1]) };
  }

  // Holds at the gate, watching the north road — "he went in peace" (3:21b),
  // read straight: David stays, still, unhurried, through the close.
  const curveStart = NORTH_ROAD_CURVE.getPointAt(0);
  return {
    x: ARRIVAL_MEET_POS[0],
    z: ARRIVAL_MEET_POS[1],
    yaw: yawToward(ARRIVAL_MEET_POS[0], ARRIVAL_MEET_POS[1], curveStart.x, curveStart.z),
  };
}
