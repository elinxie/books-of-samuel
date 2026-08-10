import type { ViolenceMode } from '../../state/store';
import {
  ABNER_RETURN_GATE_U,
  ASIDE_POINT,
  DAVID_GRAVE_POS,
  DAVID_PLAZA_POS,
  GATE_PASSAGE_OUTER_Z,
  GATE_WAIT_POS,
  GRAVE_POS,
  JOAB_GRAVE_POS,
  JOAB_PLAZA_POS,
  NORTH_ROAD_CURVE,
  PROCESSION_ROUTE_CURVE,
  RAID_ROAD_CURVE,
  TOMB_ENTRY_POS,
} from './layout';

/**
 * Pure, beat-driven pose/timing choreography for hebron-gate (ADR-007
 * convention, mirroring gibeon-pool/ziklag-lament/hebron-covenant's
 * poses.ts). Beat times match `src/data/scenes.ts`'s `hebron-gate` entry
 * exactly (`b-joab-returns` through `b-close`) — see
 * docs/design/hebron-gate-brief.md, "Camera / observer experience".
 *
 * This is the milestone's load-bearing ADR-009 scene, the second application
 * of the named-character-killing template `gibeon-pool` set for Asahel's
 * death. The mechanism is deliberately the same one, not reinvented:
 *
 * - `fallDuration` (standard = full gradual collapse, reduced = a near-
 *   instant collapse) is the exact device `gibeon-pool`/`ziklag-lament` use
 *   for every collapse transform in this project.
 * - The strike itself is never a modeled weapon gesture. Per the brief, the
 *   text's one specific, non-graphic detail shown as gesture here is the
 *   drawing-aside itself (`leadGesturePose`), the analog of gibeon-pool's
 *   reversed spear grip. Joab's own body carries only a small, orientation-
 *   only "strikeLean" at the moment of the strike (`joabStrikeLean`) —
 *   zeroed out in reduced mode exactly as ziklag-lament's executioner
 *   `WitnessPose.strike` is (no weapon geometry is added anywhere in this
 *   scene; ADR-009 bans penetration/wound detail in every mode).
 * - Reduced mode's "cut from the aside to the aftermath" (brief) is realized
 *   by combining the near-instant `fallDuration` with the zeroed strike
 *   lean: the observer sees the aside, then Abner already fallen, with no
 *   intervening strike motion rendered in either case — never a literal
 *   camera-cut mechanism (this codebase's pose functions don't have one),
 *   but the visual result matches the brief's description.
 * - No bystander "stood still" beat is invented here (the brief: "the text
 *   supplies no bystander freeze here — the reaction the text gives is
 *   David's"). The held-reaction bridge is realized simply as an unscored
 *   gap between `T_ABNER_DEATH` and `T_DAVID_HEARS` during which every
 *   crowd figure is already static by construction (the raid party and the
 *   mourning-gather assembly are both stationary crowds at this point in
 *   the timeline) — no extra clock-freezing mechanism is needed.
 */

export const T_JOAB_RETURNS = 0;
export const T_PROTEST = 16;
export const T_RECALL = 32;
export const T_GATE_ASIDE = 48;
export const T_ABNER_DEATH = 60;
export const T_DAVID_HEARS = 76;
export const T_MOURNING_CMD = 98;
export const T_PROCESSION = 116;
export const T_BURIAL_WEEP = 150;
export const T_LAMENT = 168;
export const T_FAST = 186;
export const T_PEOPLE_NOTE = 200;
export const T_CLOSE = 212;
export const DURATION_SEC = 224;

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

/** Duration (seconds) of an animated fall/collapse transition — standard is
 * gradual, reduced elides the animation and cuts to the resulting pose
 * almost immediately (same eventual pose, reached sooner). Identical device
 * to gibeon-pool's/ziklag-lament's `fallDuration`. */
export function fallDuration(mode: ViolenceMode, standardDur: number): number {
  return mode === 'standard' ? standardDur : Math.min(1, standardDur * 0.12);
}

// ---------------------------------------------------------------------------
// Joab's raid party (3:22): arrives along the raid road, settles at its
// eastern gathering ground, and stays there for the rest of the scene — a
// returning military party, not a household, so no "seated" transform.

export interface RaidFigureParams {
  arriveStagger: number;
  laneOffset: number;
  destSlot: [number, number];
}

export interface RaidPose {
  x: number;
  z: number;
  yaw: number;
}

const RAID_ARRIVE_DUR = 13;
const RAID_SETTLE_DUR = 3;
const RAID_CURVE_END = RAID_ROAD_CURVE.getPointAt(1);

export function raidFigurePose(t: number, fig: RaidFigureParams): RaidPose {
  const arriveAt = fig.arriveStagger;
  if (t < arriveAt + RAID_ARRIVE_DUR) {
    const u = clamp01((t - arriveAt) / RAID_ARRIVE_DUR);
    const eased = smoothstep(u);
    const pos = RAID_ROAD_CURVE.getPointAt(eased);
    const tan = RAID_ROAD_CURVE.getTangentAt(Math.max(0.001, eased));
    const [ox, oz] = facePerpendicular(tan.x, tan.z, fig.laneOffset);
    return { x: pos.x + ox, z: pos.z + oz, yaw: Math.atan2(tan.x, tan.z) };
  }
  const settleT = t - (arriveAt + RAID_ARRIVE_DUR);
  const p = smoothstep(settleT / RAID_SETTLE_DUR);
  const [dx, dz] = fig.destSlot;
  return {
    x: lerp(RAID_CURVE_END.x, dx, p),
    z: lerp(RAID_CURVE_END.z, dz, p),
    yaw: yawToward(RAID_CURVE_END.x, RAID_CURVE_END.z, dx, dz),
  };
}

// ---------------------------------------------------------------------------
// The mourning assembly ("all the people," 3:31-32, 35-36): present from the
// scene's start near the plaza (Hebron's own townspeople, doubling as the
// figures who read as "noticing, motionless" through the held-reaction gap),
// then processes to the tomb ground once the funeral begins.

export interface MournerFigureParams {
  gather: [number, number];
  gatherYaw: number;
  tomb: [number, number];
  tombYaw: number;
  stagger: number;
  laneOffset: number;
}

export interface MournerPose {
  x: number;
  z: number;
  yaw: number;
  moving: boolean;
}

const MOURN_ENTRY_DUR = 4;
const MOURN_TRAVEL_DUR = 22;
const MOURN_SETTLE_DUR = 4;
const PROCESSION_ROUTE_START = PROCESSION_ROUTE_CURVE.getPointAt(0);
const PROCESSION_ROUTE_END = PROCESSION_ROUTE_CURVE.getPointAt(1);

export function mournerFigurePose(t: number, fig: MournerFigureParams): MournerPose {
  const startAt = T_PROCESSION + fig.stagger;
  if (t < startAt) {
    return { x: fig.gather[0], z: fig.gather[1], yaw: fig.gatherYaw, moving: false };
  }

  const entryEnd = startAt + MOURN_ENTRY_DUR;
  if (t < entryEnd) {
    const p = smoothstep((t - startAt) / MOURN_ENTRY_DUR);
    return {
      x: lerp(fig.gather[0], PROCESSION_ROUTE_START.x, p),
      z: lerp(fig.gather[1], PROCESSION_ROUTE_START.z, p),
      yaw: yawToward(
        fig.gather[0],
        fig.gather[1],
        PROCESSION_ROUTE_START.x,
        PROCESSION_ROUTE_START.z,
      ),
      moving: true,
    };
  }

  const travelEnd = entryEnd + MOURN_TRAVEL_DUR;
  if (t < travelEnd) {
    const p = clamp01((t - entryEnd) / MOURN_TRAVEL_DUR);
    const pos = PROCESSION_ROUTE_CURVE.getPointAt(p);
    const tan = PROCESSION_ROUTE_CURVE.getTangentAt(Math.max(0.001, p));
    const [ox, oz] = facePerpendicular(tan.x, tan.z, fig.laneOffset);
    return { x: pos.x + ox, z: pos.z + oz, yaw: Math.atan2(tan.x, tan.z), moving: true };
  }

  const settleEnd = travelEnd + MOURN_SETTLE_DUR;
  if (t < settleEnd) {
    const p = smoothstep((t - travelEnd) / MOURN_SETTLE_DUR);
    return {
      x: lerp(PROCESSION_ROUTE_END.x, fig.tomb[0], p),
      z: lerp(PROCESSION_ROUTE_END.z, fig.tomb[1], p),
      yaw: yawToward(PROCESSION_ROUTE_END.x, PROCESSION_ROUTE_END.z, fig.tomb[0], fig.tomb[1]),
      moving: p < 1,
    };
  }

  return { x: fig.tomb[0], z: fig.tomb[1], yaw: fig.tombYaw, moving: false };
}

// ---------------------------------------------------------------------------
// Joab (named principal, strikes Abner alone per 3:27b): raid road -> plaza
// protest -> waits near the gate -> draws Abner aside -> the strike/held
// reaction -> tears his own clothes and leads the mourning procession ->
// stands at the graveside.

const JOAB_LEAD_OFFSET = -0.7;
const LEAD_GESTURE_DUR = 5;

export interface JoabPose {
  x: number;
  z: number;
  yaw: number;
  /** 0..1 bell-curve envelope for the protest gesture (3:24-25). */
  protest: number;
  /** 0..1 the drawing-aside gesture itself (3:27a) — the text's one
   * specific, non-graphic detail shown as gesture (brief's ADR-009 note). */
  leadGesture: number;
  /** 0..1 a brief, orientation-only body lean at the moment of the strike —
   * never a weapon gesture, zero throughout in reduced mode. */
  strikeLean: number;
  /** 0..1 the mourning posture (torn clothes, sackcloth, 3:31) — a discrete
   * dress-swap crossfade in the render layer, not literal cloth animation. */
  mourning: number;
}

const PROTEST_DUR = 6;

export function joabPose(t: number, mode: ViolenceMode): JoabPose {
  // Phase 1: raid road arrival to the plaza.
  const plazaArriveEnd = 15;
  if (t < plazaArriveEnd) {
    const u = smoothstep(t / plazaArriveEnd);
    const pos = RAID_ROAD_CURVE.getPointAt(u);
    const tan = RAID_ROAD_CURVE.getTangentAt(Math.max(0.001, u));
    return {
      x: pos.x,
      z: pos.z,
      yaw: Math.atan2(tan.x, tan.z),
      protest: 0,
      leadGesture: 0,
      strikeLean: 0,
      mourning: 0,
    };
  }

  const protestRise = smoothstep((t - T_PROTEST) / 1.5);
  const protestFall = 1 - smoothstep((t - (T_PROTEST + PROTEST_DUR)) / 1.5);
  const protest = clamp01(protestRise - (1 - protestFall));

  // Phase 2: hold at the plaza (facing David) through the protest and the
  // (narrated-only) recall, then walk to wait near the gate.
  const gateWalkStart = T_RECALL + 4;
  const gateWalkEnd = T_GATE_ASIDE - 2;
  if (t < gateWalkStart) {
    return {
      x: JOAB_PLAZA_POS[0],
      z: JOAB_PLAZA_POS[1],
      yaw: yawToward(JOAB_PLAZA_POS[0], JOAB_PLAZA_POS[1], DAVID_PLAZA_POS[0], DAVID_PLAZA_POS[1]),
      protest,
      leadGesture: 0,
      strikeLean: 0,
      mourning: 0,
    };
  }
  if (t < gateWalkEnd) {
    const p = smoothstep((t - gateWalkStart) / (gateWalkEnd - gateWalkStart));
    const x = lerp(JOAB_PLAZA_POS[0], GATE_WAIT_POS[0], p);
    const z = lerp(JOAB_PLAZA_POS[1], GATE_WAIT_POS[1], p);
    return {
      x,
      z,
      yaw: yawToward(JOAB_PLAZA_POS[0], JOAB_PLAZA_POS[1], GATE_WAIT_POS[0], GATE_WAIT_POS[1]),
      protest: 0,
      leadGesture: 0,
      strikeLean: 0,
      mourning: 0,
    };
  }

  // Phase 3: waits at the gate for Abner's return.
  const leadEnd = T_GATE_ASIDE + LEAD_GESTURE_DUR;
  if (t < T_GATE_ASIDE) {
    return {
      x: GATE_WAIT_POS[0],
      z: GATE_WAIT_POS[1],
      yaw: yawToward(GATE_WAIT_POS[0], GATE_WAIT_POS[1], ASIDE_POINT[0], ASIDE_POINT[1]),
      protest: 0,
      leadGesture: 0,
      strikeLean: 0,
      mourning: 0,
    };
  }

  // Phase 4: draws Abner aside into the passage's interior (3:27a).
  if (t < leadEnd) {
    const p = smoothstep((t - T_GATE_ASIDE) / LEAD_GESTURE_DUR);
    return {
      x: lerp(GATE_WAIT_POS[0], ASIDE_POINT[0] + JOAB_LEAD_OFFSET, p),
      z: lerp(GATE_WAIT_POS[1], ASIDE_POINT[1], p),
      yaw: yawToward(GATE_WAIT_POS[0], GATE_WAIT_POS[1], ASIDE_POINT[0], ASIDE_POINT[1]),
      protest: 0,
      leadGesture: p,
      strikeLean: 0,
      mourning: 0,
    };
  }

  // Phase 5: held at the aside point through the strike and the held
  // reaction, mourning transform rising from T_MOURNING_CMD.
  const strikeLean =
    mode === 'standard'
      ? smoothstep((t - (T_ABNER_DEATH - 0.6)) / 0.8) *
        (1 - smoothstep((t - (T_ABNER_DEATH + 1.4)) / 1))
      : 0;
  const mourning = smoothstep((t - T_MOURNING_CMD) / 4);

  if (t < T_PROCESSION) {
    return {
      x: ASIDE_POINT[0] + JOAB_LEAD_OFFSET,
      z: ASIDE_POINT[1],
      yaw: yawToward(ASIDE_POINT[0], ASIDE_POINT[1], GATE_WAIT_POS[0], GATE_WAIT_POS[1]),
      protest: 0,
      leadGesture: 1,
      strikeLean,
      mourning,
    };
  }

  // Phase 6: leads the mourning procession (3:31), then holds at the grave.
  const graveArrive = T_BURIAL_WEEP - 2;
  if (t < graveArrive) {
    const p = clamp01((t - T_PROCESSION) / (graveArrive - T_PROCESSION));
    const pos = PROCESSION_ROUTE_CURVE.getPointAt(smoothstep(p));
    const tan = PROCESSION_ROUTE_CURVE.getTangentAt(Math.max(0.001, smoothstep(p)));
    return {
      x: pos.x,
      z: pos.z,
      yaw: Math.atan2(tan.x, tan.z),
      protest: 0,
      leadGesture: 0,
      strikeLean: 0,
      mourning: 1,
    };
  }

  return {
    x: JOAB_GRAVE_POS[0],
    z: JOAB_GRAVE_POS[1],
    yaw: yawToward(JOAB_GRAVE_POS[0], JOAB_GRAVE_POS[1], TOMB_ENTRY_POS[0], TOMB_ENTRY_POS[1]),
    protest: 0,
    leadGesture: 0,
    strikeLean: 0,
    mourning: 1,
  };
}

// ---------------------------------------------------------------------------
// David: present at Hebron throughout (the same household presence
// hebron-anointing/hebron-covenant already established — not "arriving").
// Watches the plaza, receives Joab's protest, delivers the disavowal and
// curse in place, then commands the mourning and follows the bier
// (3:31b's own blocking: David walks *behind* it) to the graveside.

export interface DavidGatePose {
  x: number;
  z: number;
  yaw: number;
  /** 0..1 grieving/bowed posture — the funeral beats only, same device as
   * ziklag-lament's `grieve`. */
  grieve: number;
}

const DAVID_LAG = 3;

export function davidGatePose(t: number): DavidGatePose {
  if (t < T_PROCESSION) {
    return {
      x: DAVID_PLAZA_POS[0],
      z: DAVID_PLAZA_POS[1],
      yaw: yawToward(DAVID_PLAZA_POS[0], DAVID_PLAZA_POS[1], JOAB_PLAZA_POS[0], JOAB_PLAZA_POS[1]),
      grieve: 0,
    };
  }

  // Follows the bier at a fixed time lag so he always trails it, matching
  // "King David followed the bier" (3:31b) exactly.
  const travelStart = T_PROCESSION + DAVID_LAG;
  const graveArrive = T_BURIAL_WEEP + DAVID_LAG - 1;
  if (t < travelStart) {
    return {
      x: DAVID_PLAZA_POS[0],
      z: DAVID_PLAZA_POS[1],
      yaw: yawToward(
        DAVID_PLAZA_POS[0],
        DAVID_PLAZA_POS[1],
        PROCESSION_ROUTE_START.x,
        PROCESSION_ROUTE_START.z,
      ),
      grieve: 0,
    };
  }
  if (t < graveArrive) {
    const p = clamp01((t - travelStart) / (graveArrive - travelStart));
    const pos = PROCESSION_ROUTE_CURVE.getPointAt(smoothstep(p));
    const tan = PROCESSION_ROUTE_CURVE.getTangentAt(Math.max(0.001, smoothstep(p)));
    return { x: pos.x, z: pos.z, yaw: Math.atan2(tan.x, tan.z), grieve: 0 };
  }

  const grieve = smoothstep((t - T_BURIAL_WEEP) / 4) * (1 - smoothstep((t - (T_FAST - 4)) / 4));
  return {
    x: DAVID_GRAVE_POS[0],
    z: DAVID_GRAVE_POS[1],
    yaw: yawToward(DAVID_GRAVE_POS[0], DAVID_GRAVE_POS[1], TOMB_ENTRY_POS[0], TOMB_ENTRY_POS[1]),
    grieve,
  };
}

// ---------------------------------------------------------------------------
// Abner: hidden until his silent re-entry through the gate (3:26's recall is
// narrated only — "the cistern of Sirah narrated only, never staged," brief).
// Held at the aside point through the strike; the fallen figure remains as
// the discovered body through the disavowal, then is handed off to the bier
// (AbnerBier below) once the mourning command begins.

export interface AbnerGatePose {
  x: number;
  z: number;
  yaw: number;
  fallen: number;
  visible: boolean;
}

const RETURN_LEAD = 7;
const GATE_REENTRY_START: [number, number] = [0, GATE_PASSAGE_OUTER_Z + 8];
const ABNER_ASIDE_OFFSET = 0.9;

export function abnerGatePose(t: number, mode: ViolenceMode): AbnerGatePose {
  const returnStart = T_GATE_ASIDE - RETURN_LEAD;
  const visible = t >= returnStart && t < T_MOURNING_CMD;
  if (!visible) {
    return { x: ASIDE_POINT[0], z: ASIDE_POINT[1], yaw: 0, fallen: 0, visible: false };
  }

  // A single, deliberately short glimpse of the last stretch of the road
  // he departed on in peace (hebron-covenant's NORTH_ROAD_CURVE, reused) —
  // the rest of his journey (the recall itself) is never staged.
  if (t < T_GATE_ASIDE) {
    const p = smoothstep((t - returnStart) / RETURN_LEAD);
    const roadPt = NORTH_ROAD_CURVE.getPointAt(ABNER_RETURN_GATE_U);
    const x = lerp(roadPt.x, GATE_REENTRY_START[0], p);
    const z = lerp(roadPt.z, GATE_REENTRY_START[1], p);
    const yaw = yawToward(roadPt.x, roadPt.z, GATE_REENTRY_START[0], GATE_REENTRY_START[1]);
    return { x, z, yaw, fallen: 0, visible: true };
  }

  const leadEnd = T_GATE_ASIDE + LEAD_GESTURE_DUR;
  if (t < leadEnd) {
    const p = smoothstep((t - T_GATE_ASIDE) / LEAD_GESTURE_DUR);
    return {
      x: lerp(GATE_REENTRY_START[0], ASIDE_POINT[0] + ABNER_ASIDE_OFFSET, p),
      z: lerp(GATE_REENTRY_START[1], ASIDE_POINT[1], p),
      yaw: yawToward(GATE_REENTRY_START[0], GATE_REENTRY_START[1], ASIDE_POINT[0], ASIDE_POINT[1]),
      fallen: 0,
      visible: true,
    };
  }

  const fallStart = T_ABNER_DEATH;
  const fallen = smoothstep((t - fallStart) / fallDuration(mode, 5));
  return {
    x: ASIDE_POINT[0] + ABNER_ASIDE_OFFSET,
    z: ASIDE_POINT[1],
    yaw: yawToward(ASIDE_POINT[0], ASIDE_POINT[1], GATE_WAIT_POS[0], GATE_WAIT_POS[1]) + Math.PI,
    fallen,
    visible: true,
  };
}

// ---------------------------------------------------------------------------
// Abishai: present near the gate per 3:30's shared culpability, but never
// drawn into the passage itself — the text attributes the strike to Joab
// alone, and this scene stages it that way (brief's "Resolved design calls").

export interface AbishaiGatePose {
  x: number;
  z: number;
  yaw: number;
  visible: boolean;
}

const ABISHAI_GATE_POS: [number, number] = [-3, GATE_PASSAGE_OUTER_Z + 3];

export function abishaiGatePose(t: number): AbishaiGatePose {
  const visible = t >= T_GATE_ASIDE - 2 && t < T_MOURNING_CMD;
  return {
    x: ABISHAI_GATE_POS[0],
    z: ABISHAI_GATE_POS[1],
    yaw: yawToward(ABISHAI_GATE_POS[0], ABISHAI_GATE_POS[1], ASIDE_POINT[0], ASIDE_POINT[1]),
    visible,
  };
}

// ---------------------------------------------------------------------------
// The bier (asset-bier-props, reused from jabesh-burial; wrapped form via
// engine/characters/wrappedForm.ts): appears once the body is handled at the
// mourning command, carried at funeral pace to the grave, then lowered and
// hidden once burial is complete — mirroring jabesh-burial's "covered before
// flame" convention (the body is never shown mid-burial, only borne and then
// gone).

export interface BierPose {
  x: number;
  z: number;
  yaw: number;
  /** 0 laid down .. 1 carried aloft on the bearers' shoulders. */
  carried: number;
  visible: boolean;
}

const BIER_ENTRY_DUR = 4;
const BIER_TRAVEL_DUR = 26;
const BIER_LOWER_DUR = 3;

export function bierPose(t: number): BierPose {
  if (t < T_MOURNING_CMD) {
    return { x: ASIDE_POINT[0], z: ASIDE_POINT[1], yaw: 0, carried: 0, visible: false };
  }
  if (t < T_PROCESSION) {
    return {
      x: ASIDE_POINT[0],
      z: ASIDE_POINT[1],
      yaw: yawToward(
        ASIDE_POINT[0],
        ASIDE_POINT[1],
        PROCESSION_ROUTE_START.x,
        PROCESSION_ROUTE_START.z,
      ),
      carried: smoothstep((t - T_MOURNING_CMD) / 3),
      visible: true,
    };
  }

  const entryEnd = T_PROCESSION + BIER_ENTRY_DUR;
  if (t < entryEnd) {
    const p = smoothstep((t - T_PROCESSION) / BIER_ENTRY_DUR);
    return {
      x: lerp(ASIDE_POINT[0], PROCESSION_ROUTE_START.x, p),
      z: lerp(ASIDE_POINT[1], PROCESSION_ROUTE_START.z, p),
      yaw: yawToward(
        ASIDE_POINT[0],
        ASIDE_POINT[1],
        PROCESSION_ROUTE_START.x,
        PROCESSION_ROUTE_START.z,
      ),
      carried: 1,
      visible: true,
    };
  }

  const travelEnd = entryEnd + BIER_TRAVEL_DUR;
  if (t < travelEnd) {
    const p = clamp01((t - entryEnd) / BIER_TRAVEL_DUR);
    const pos = PROCESSION_ROUTE_CURVE.getPointAt(p);
    const tan = PROCESSION_ROUTE_CURVE.getTangentAt(Math.max(0.001, p));
    return { x: pos.x, z: pos.z, yaw: Math.atan2(tan.x, tan.z), carried: 1, visible: true };
  }

  const settleEnd = T_BURIAL_WEEP;
  if (t < settleEnd) {
    const p = smoothstep((t - travelEnd) / Math.max(0.5, settleEnd - travelEnd));
    return {
      x: lerp(PROCESSION_ROUTE_END.x, GRAVE_POS[0], p),
      z: lerp(PROCESSION_ROUTE_END.z, GRAVE_POS[1], p),
      yaw: yawToward(PROCESSION_ROUTE_END.x, PROCESSION_ROUTE_END.z, GRAVE_POS[0], GRAVE_POS[1]),
      carried: 1,
      visible: true,
    };
  }

  // Lowered for burial, then interred (hidden) as soon as it is fully
  // lowered — the body is never lingered on or shown mid-burial, matching
  // the funerary-handling precedent (ADR-009's "covered before flame"
  // extended to burial). Weeping (the rest of b-burial-weep) and the lament
  // both proceed at the grave with the body already interred.
  const lowered = 1 - smoothstep((t - T_BURIAL_WEEP) / BIER_LOWER_DUR);
  const visible = t < T_BURIAL_WEEP + BIER_LOWER_DUR;
  return { x: GRAVE_POS[0], z: GRAVE_POS[1], yaw: 0, carried: Math.max(0, lowered), visible };
}

// ---------------------------------------------------------------------------
// Lighting: 3:35 states the one lighting detail this scene gets directly —
// the fast until "the sun goes down." Every other beat's hour is an
// unstated, disclosed placeholder (flat daylight, per the brief's
// "Lighting" — no dramatic storm-light for the killing or the disavowal).
// Identical device to gibeon-pool's `duskBlend`.

export function duskBlend(t: number): number {
  return smoothstep((t - T_FAST) / (T_PEOPLE_NOTE - T_FAST));
}
