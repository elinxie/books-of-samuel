import * as THREE from 'three';
import type { ViolenceMode } from '../../state/store';
import {
  DAVID_PLAZA_POS,
  GATE_ASIDE_POCKET,
  GATE_SOUTH_MOUTH,
  JOAB_MOURNER_START,
  JOAB_PROTEST_POS,
  JOAB_RAID_GROUND_CENTER,
  JOAB_RAID_RETURN_CURVE,
  NORTH_ROAD_CURVE,
  PROCESSION_CURVE,
  TOMB_ENTRANCE_INSET,
  TOMB_POS,
} from './layout';

/**
 * Pure, beat-driven pose/timing choreography for the killing at the Hebron
 * gate and Abner's funeral (ADR-007 convention, mirroring gibeon-pool's and
 * hebron-covenant's poses.ts). Beat times match `src/data/scenes.ts`'s
 * `hebron-gate` entry exactly (`b-joab-returns` through `b-close`) — see
 * docs/design/hebron-gate-brief.md, "Camera / observer experience", for the
 * standard/reduced treatment table this file implements.
 *
 * ADR-009's second named-character-killing application: documentary
 * distance, no wound/blood/dismemberment geometry in either mode. The
 * text's own specific, non-graphic detail — the drawing-aside itself (3:27a)
 * — is shown as a gesture (`gateStrikePose`'s `asideAmount`); reduced mode
 * elides the strike (`thrust` stays 0), cutting from the aside straight to
 * the aftermath. Abner's body renders as his own fallen principal rig
 * immediately after the strike, then switches to the ADR-009 funerary
 * standard (`buildWrappedFormGeometry`, `bierPose` below) once the text's
 * own bier appears (3:31) — never a distinct "corpse" asset family.
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

export function yawToward(fromX: number, fromZ: number, toX: number, toZ: number): number {
  return Math.atan2(toX - fromX, toZ - fromZ);
}

/** Duration (seconds) of an animated fall/collapse transition — standard is
 * gradual, reduced elides it, reaching the same eventual pose almost at
 * once (gibeon-pool's `fallDuration` convention: same fact, faster cut). */
export function fallDuration(mode: ViolenceMode, standardDur: number): number {
  return mode === 'standard' ? standardDur : Math.min(1, standardDur * 0.12);
}

/** A bell-shaped 0..1 envelope: ramps up into `center`, holds, fades out —
 * used for every brief address/speech/tearing gesture in this scene rather
 * than a bespoke curve per beat. */
export function gestureBell(
  t: number,
  center: number,
  rampDur = 1.2,
  holdDur = 3,
  fadeDur = 1.5,
): number {
  const upStart = center - rampDur;
  const holdEnd = center + holdDur;
  const downEnd = holdEnd + fadeDur;
  if (t <= upStart) return 0;
  if (t < center) return smoothstep((t - upStart) / rampDur);
  if (t < holdEnd) return 1;
  if (t < downEnd) return 1 - smoothstep((t - holdEnd) / fadeDur);
  return 0;
}

// ---------------------------------------------------------------------------
// Beat timeline (must match scenes.ts's hebron-gate entry).

export const T_JOAB_RETURNS = 0;
export const T_PROTEST = 14;
export const T_RECALL = 28;
export const T_GATE_ASIDE = 42;
export const T_ABNER_DEATH = 58;
export const T_DAVID_HEARS = 76;
export const T_MOURNING_CMD = 94;
export const T_PROCESSION = 112;
export const T_BURIAL_WEEP = 134;
export const T_LAMENT = 148;
export const T_FAST = 162;
export const T_PEOPLE_NOTE = 172;
export const T_CLOSE = 182;
export const DURATION_SEC = 190;

const RAID_ARRIVE_DUR = 10;
const PROTEST_MOVE_DUR = 6;
const ABNER_ROAD_ARRIVE_AT = T_GATE_ASIDE + 6;
const ASIDE_STEP_START = ABNER_ROAD_ARRIVE_AT;
const ASIDE_STEP_DUR = 6;
const STRIKE_WINDUP_DUR = 1.6;
const STRIKE_DUR = 0.6;
const MOURN_MOVE_DUR = 4;
export const PROCESSION_TRAVEL_DUR = 18;
const JOAB_LEAD_U = 0.05;
const DAVID_LAG_U = 0.035;
const BURY_DUR = 6;

// ---------------------------------------------------------------------------
// Joab's returning raid party and the ambient mourning assembly: a shared
// curve-travel-then-settle helper (brief's "a single shared route-curve with
// per-figure offsets... is fine at this fidelity").

export interface RoutePose {
  x: number;
  z: number;
  yaw: number;
}

function travelThenSettle(
  t: number,
  curve: THREE.CatmullRomCurve3,
  startAt: number,
  travelDur: number,
  settleDur: number,
  laneOffset: number,
  destSlot: readonly [number, number],
): RoutePose {
  const travelEnd = startAt + travelDur;
  if (t <= startAt) {
    const pos = curve.getPointAt(0);
    const tan = curve.getTangentAt(0.001);
    return { x: pos.x + laneOffset, z: pos.z, yaw: Math.atan2(tan.x, tan.z) };
  }
  if (t < travelEnd) {
    const u = clamp01((t - startAt) / travelDur);
    const pos = curve.getPointAt(u);
    const tan = curve.getTangentAt(Math.max(0.001, u));
    return { x: pos.x + laneOffset, z: pos.z, yaw: Math.atan2(tan.x, tan.z) };
  }
  const end = curve.getPointAt(1);
  const settleEnd = travelEnd + settleDur;
  if (t < settleEnd) {
    const p = smoothstep((t - travelEnd) / settleDur);
    const x = lerp(end.x + laneOffset, destSlot[0], p);
    const z = lerp(end.z, destSlot[1], p);
    return { x, z, yaw: yawToward(x, z, destSlot[0], destSlot[1]) };
  }
  return {
    x: destSlot[0],
    z: destSlot[1],
    yaw: yawToward(destSlot[0], destSlot[1], end.x, end.z),
  };
}

export interface RaidPartyFigureSpec {
  laneOffset: number;
  arriveStagger: number;
  destSlot: readonly [number, number];
}

/** One of Joab's raid party at scene time `t` (3:22) — arrives once, early,
 * and simply remains (no departure leg; this scene never sends them away). */
export function raidPartyMemberPose(t: number, fig: RaidPartyFigureSpec): RoutePose {
  return travelThenSettle(
    t,
    JOAB_RAID_RETURN_CURVE,
    fig.arriveStagger,
    RAID_ARRIVE_DUR,
    3,
    fig.laneOffset,
    fig.destSlot,
  );
}

// ---------------------------------------------------------------------------
// The mourning assembly: static bystanders near the plaza (the brief's
// "figures at distance noticing" held-reaction bridge) through the killing
// and disavowal, then — from the mourning-command beat — the gathered
// mourners who follow the bier to the tomb.

export interface MournerFigureSpec {
  watchSlot: readonly [number, number];
  tombSlot: readonly [number, number];
  stagger: number;
  laneOffset: number;
}

export interface MournerPose extends RoutePose {
  mourning: number;
}

export function mournerPose(t: number, fig: MournerFigureSpec): MournerPose {
  const mourning = mourningDressBlend(t);
  const departAt = T_PROCESSION + fig.stagger;
  if (t < departAt) {
    return { x: fig.watchSlot[0], z: fig.watchSlot[1], yaw: 0, mourning };
  }
  const route = travelThenSettle(
    t,
    PROCESSION_CURVE,
    departAt,
    PROCESSION_TRAVEL_DUR,
    3,
    fig.laneOffset,
    fig.tombSlot,
  );
  return { ...route, mourning };
}

/** Hard cut (not a fade) from ordinary dress to sackcloth, at the mourning
 * command (3:31) — a geometry swap (two baked variants, visibility toggled),
 * not a blended vertex-color animation. */
export function mourningDressBlend(t: number): number {
  return t >= T_MOURNING_CMD ? 1 : 0;
}

/** Joab's (and the front mourners') brief tearing-clothes gesture (3:31),
 * centered on the mourning-command beat — a forward-lean/arm-cross gesture,
 * never invented tearing-cloth geometry. */
export function tearGestureEnvelope(t: number): number {
  return gestureBell(t, T_MOURNING_CMD + 1.5, 1, 2.5, 2);
}

// ---------------------------------------------------------------------------
// The gate aside and the strike (3:27, the killing beat): the text's one
// specific non-graphic detail — the drawing-aside itself — shown as a
// gesture; `thrust` is zero in every reduced-mode frame (elided strike).

export interface GateStrikePose {
  /** 0 apart .. 1 fully drawn into the gate's shadowed alcove. */
  asideAmount: number;
  /** 0..1 the strike-arm extension itself; always 0 in reduced mode. */
  thrust: number;
}

export function gateStrikePose(t: number, mode: ViolenceMode): GateStrikePose {
  const asideAmount = smoothstep((t - ASIDE_STEP_START) / ASIDE_STEP_DUR);
  if (mode === 'reduced') {
    return { asideAmount, thrust: 0 };
  }
  const windup = smoothstep((t - (T_ABNER_DEATH - STRIKE_WINDUP_DUR)) / STRIKE_WINDUP_DUR);
  const strike = smoothstep((t - T_ABNER_DEATH) / STRIKE_DUR);
  return { asideAmount, thrust: Math.max(windup * 0.3, strike) };
}

// ---------------------------------------------------------------------------
// Abner (principal): off-scene until he "re-enters the scene already
// returning through the gate" (brief) — the cistern-of-Sirah recall is
// narrated only, never staged. Travels the tail of Abner's own north road
// (hebron-covenant's `NORTH_ROAD_CURVE`, mandatory continuity) to the gate's
// south mouth, is drawn aside, falls, and stays fallen until the bier takes
// over the body at the mourning-command beat.

export interface PrincipalPose {
  x: number;
  z: number;
  yaw: number;
  fallen: number;
  visible: boolean;
}

const NORTH_ROAD_TAIL_U = 0.85;

export function abnerGatePose(t: number, mode: ViolenceMode): PrincipalPose {
  if (t < T_GATE_ASIDE) {
    return { x: 0, z: 0, yaw: 0, fallen: 0, visible: false };
  }
  if (t < T_GATE_ASIDE + 4) {
    const u = lerp(NORTH_ROAD_TAIL_U, 1, smoothstep((t - T_GATE_ASIDE) / 4));
    const pos = NORTH_ROAD_CURVE.getPointAt(u);
    const tan = NORTH_ROAD_CURVE.getTangentAt(Math.max(0.001, u));
    return { x: pos.x, z: pos.z, yaw: Math.atan2(tan.x, tan.z), fallen: 0, visible: true };
  }
  if (t < ABNER_ROAD_ARRIVE_AT) {
    const end = NORTH_ROAD_CURVE.getPointAt(1);
    const p = smoothstep((t - (T_GATE_ASIDE + 4)) / (ABNER_ROAD_ARRIVE_AT - (T_GATE_ASIDE + 4)));
    const x = lerp(end.x, GATE_SOUTH_MOUTH[0], p);
    const z = lerp(end.z, GATE_SOUTH_MOUTH[1], p);
    return {
      x,
      z,
      yaw: yawToward(x, z, GATE_ASIDE_POCKET[0], GATE_ASIDE_POCKET[1]),
      fallen: 0,
      visible: true,
    };
  }
  if (t < T_MOURNING_CMD) {
    const strike = gateStrikePose(t, mode);
    const x = lerp(GATE_SOUTH_MOUTH[0], GATE_ASIDE_POCKET[0], strike.asideAmount);
    const z = lerp(GATE_SOUTH_MOUTH[1], GATE_ASIDE_POCKET[1], strike.asideAmount);
    const fallen = t < T_ABNER_DEATH ? 0 : smoothstep((t - T_ABNER_DEATH) / fallDuration(mode, 5));
    return { x, z, yaw: 0, fallen, visible: true };
  }
  // The wrapped bier (bierPose, below) carries the body from here on.
  return { x: GATE_ASIDE_POCKET[0], z: GATE_ASIDE_POCKET[1], yaw: 0, fallen: 1, visible: false };
}

// ---------------------------------------------------------------------------
// Joab (principal): the raid, the protest, the aside, the strike — staged
// as his alone (3:27), Abishai present nearby but not staged striking
// anyone (3:30) — then a public mourner at his own victim's bier (3:31),
// leading the procession slightly ahead of it, never behind David.

export interface JoabPose extends PrincipalPose {
  tear: number;
}

export function joabGatePose(t: number, mode: ViolenceMode): JoabPose {
  if (t < RAID_ARRIVE_DUR) {
    const route = travelThenSettle(
      t,
      JOAB_RAID_RETURN_CURVE,
      0,
      RAID_ARRIVE_DUR,
      3,
      0,
      JOAB_RAID_GROUND_CENTER,
    );
    return { ...route, fallen: 0, visible: true, tear: 0 };
  }
  if (t < T_PROTEST) {
    return {
      x: JOAB_RAID_GROUND_CENTER[0],
      z: JOAB_RAID_GROUND_CENTER[1],
      yaw: 0,
      fallen: 0,
      visible: true,
      tear: 0,
    };
  }
  if (t < T_PROTEST + PROTEST_MOVE_DUR) {
    const p = smoothstep((t - T_PROTEST) / PROTEST_MOVE_DUR);
    const x = lerp(JOAB_RAID_GROUND_CENTER[0], JOAB_PROTEST_POS[0], p);
    const z = lerp(JOAB_RAID_GROUND_CENTER[1], JOAB_PROTEST_POS[1], p);
    return {
      x,
      z,
      yaw: yawToward(x, z, DAVID_PLAZA_POS[0], DAVID_PLAZA_POS[1]),
      fallen: 0,
      visible: true,
      tear: 0,
    };
  }
  if (t < ASIDE_STEP_START) {
    return {
      x: JOAB_PROTEST_POS[0],
      z: JOAB_PROTEST_POS[1],
      yaw: yawToward(
        JOAB_PROTEST_POS[0],
        JOAB_PROTEST_POS[1],
        DAVID_PLAZA_POS[0],
        DAVID_PLAZA_POS[1],
      ),
      fallen: 0,
      visible: true,
      tear: 0,
    };
  }
  if (t < T_MOURNING_CMD) {
    const strike = gateStrikePose(t, mode);
    const x = lerp(JOAB_PROTEST_POS[0], GATE_ASIDE_POCKET[0] + 1.1, strike.asideAmount);
    const z = lerp(JOAB_PROTEST_POS[1], GATE_ASIDE_POCKET[1] + 0.3, strike.asideAmount);
    return {
      x,
      z,
      yaw: yawToward(x, z, GATE_ASIDE_POCKET[0], GATE_ASIDE_POCKET[1]),
      fallen: 0,
      visible: true,
      tear: 0,
    };
  }
  if (t < T_MOURNING_CMD + MOURN_MOVE_DUR) {
    const p = smoothstep((t - T_MOURNING_CMD) / MOURN_MOVE_DUR);
    const x = lerp(GATE_ASIDE_POCKET[0] + 1.1, JOAB_MOURNER_START[0], p);
    const z = lerp(GATE_ASIDE_POCKET[1] + 0.3, JOAB_MOURNER_START[1], p);
    return { x, z, yaw: 0, fallen: 0, visible: true, tear: tearGestureEnvelope(t) };
  }
  if (t < T_PROCESSION) {
    return {
      x: JOAB_MOURNER_START[0],
      z: JOAB_MOURNER_START[1],
      yaw: 0,
      fallen: 0,
      visible: true,
      tear: tearGestureEnvelope(t),
    };
  }
  const departAt = T_PROCESSION;
  const travelEnd = departAt + PROCESSION_TRAVEL_DUR;
  if (t < travelEnd) {
    const uBier = clamp01((t - departAt) / PROCESSION_TRAVEL_DUR);
    const uJoab = Math.min(1, uBier + JOAB_LEAD_U);
    const pos = PROCESSION_CURVE.getPointAt(uJoab);
    const tan = PROCESSION_CURVE.getTangentAt(Math.max(0.001, uJoab));
    return { x: pos.x, z: pos.z, yaw: Math.atan2(tan.x, tan.z), fallen: 0, visible: true, tear: 0 };
  }
  const tombFront: [number, number] = [TOMB_POS[0] + 2.2, TOMB_POS[1] + 1.4];
  return {
    x: tombFront[0],
    z: tombFront[1],
    yaw: yawToward(tombFront[0], tombFront[1], TOMB_ENTRANCE_INSET[0], TOMB_ENTRANCE_INSET[1]),
    fallen: 0,
    visible: true,
    tear: 0,
  };
}

// ---------------------------------------------------------------------------
// Abishai (principal): present near the gate per 3:30's shared culpability;
// staged only as present, never striking anyone (the text attributes the
// strike to Joab alone). A background presence throughout, not staged at
// the funeral.

export function abishaiGatePose(t: number, dest: readonly [number, number]): RoutePose {
  return travelThenSettle(t, JOAB_RAID_RETURN_CURVE, 1.5, RAID_ARRIVE_DUR, 3, 1.4, dest);
}

// ---------------------------------------------------------------------------
// David (principal): present at the plaza throughout — never travels before
// the procession. Public disavowal/curse (3:28-30), the mourning command
// (3:31), the oath to fast (3:35), and the close (3:38-39) each get a brief
// address gesture; he walks directly behind the bier (3:31's own blocking)
// during the procession, then stands at the tomb for the rest of the scene.

export interface DavidPose {
  x: number;
  z: number;
  yaw: number;
  address: number;
}

export function davidGatePose(t: number): DavidPose {
  const address =
    gestureBell(t, T_DAVID_HEARS + 4, 1.5, 6, 2) +
    gestureBell(t, T_FAST + 4, 1.5, 3, 2) +
    gestureBell(t, T_CLOSE + 3, 1.5, 4, 2);

  if (t < T_PROCESSION) {
    return {
      x: DAVID_PLAZA_POS[0],
      z: DAVID_PLAZA_POS[1],
      yaw: yawToward(
        DAVID_PLAZA_POS[0],
        DAVID_PLAZA_POS[1],
        GATE_ASIDE_POCKET[0],
        GATE_ASIDE_POCKET[1],
      ),
      address: clamp01(address),
    };
  }
  const travelEnd = T_PROCESSION + PROCESSION_TRAVEL_DUR;
  if (t < travelEnd) {
    const uBier = clamp01((t - T_PROCESSION) / PROCESSION_TRAVEL_DUR);
    const uDavid = Math.max(0, uBier - DAVID_LAG_U);
    const pos = PROCESSION_CURVE.getPointAt(uDavid);
    const tan = PROCESSION_CURVE.getTangentAt(Math.max(0.001, uDavid));
    return { x: pos.x, z: pos.z, yaw: Math.atan2(tan.x, tan.z), address: clamp01(address) };
  }
  const tombDavid: [number, number] = [TOMB_POS[0] + 3.4, TOMB_POS[1] - 0.6];
  return {
    x: tombDavid[0],
    z: tombDavid[1],
    yaw: yawToward(tombDavid[0], tombDavid[1], TOMB_ENTRANCE_INSET[0], TOMB_ENTRANCE_INSET[1]),
    address: clamp01(address),
  };
}

// ---------------------------------------------------------------------------
// The bier (3:31 onward): Abner's own fallen rig (`abnerGatePose`) carries
// the body through the killing and the disavowal; from the mourning-command
// beat, the ADR-009 funerary standard takes over — a wrapped, anatomically
// unresolved form (`buildWrappedFormGeometry`), never a distinct corpse
// asset. Lies at the gate, is carried to the tomb, and is laid at its mouth
// before fading from view — never a graphic interment.

export interface BierPose {
  x: number;
  z: number;
  yaw: number;
  /** 0 = lying at rest, 1 = lifted and being carried. */
  carried: number;
  /** 0 = resting at the tomb mouth, 1 = fully interred (hidden). */
  buried: number;
  visible: boolean;
}

export function bierPose(t: number): BierPose {
  if (t < T_MOURNING_CMD) {
    return {
      x: GATE_ASIDE_POCKET[0],
      z: GATE_ASIDE_POCKET[1],
      yaw: 0,
      carried: 0,
      buried: 0,
      visible: false,
    };
  }
  if (t < T_PROCESSION) {
    return {
      x: GATE_ASIDE_POCKET[0],
      z: GATE_ASIDE_POCKET[1],
      yaw: 0,
      carried: 0,
      buried: 0,
      visible: true,
    };
  }
  const travelEnd = T_PROCESSION + PROCESSION_TRAVEL_DUR;
  if (t < travelEnd) {
    const u = clamp01((t - T_PROCESSION) / PROCESSION_TRAVEL_DUR);
    const pos = PROCESSION_CURVE.getPointAt(u);
    const tan = PROCESSION_CURVE.getTangentAt(Math.max(0.001, u));
    return {
      x: pos.x,
      z: pos.z,
      yaw: Math.atan2(tan.x, tan.z),
      carried: 1,
      buried: 0,
      visible: true,
    };
  }
  const buryStart = T_BURIAL_WEEP;
  if (t < buryStart) {
    return {
      x: TOMB_ENTRANCE_INSET[0],
      z: TOMB_ENTRANCE_INSET[1],
      yaw: 0,
      carried: 0,
      buried: 0,
      visible: true,
    };
  }
  const buryEnd = buryStart + BURY_DUR;
  if (t < buryEnd) {
    const p = smoothstep((t - buryStart) / BURY_DUR);
    return {
      x: TOMB_ENTRANCE_INSET[0],
      z: TOMB_ENTRANCE_INSET[1],
      yaw: 0,
      carried: 0,
      buried: p,
      visible: p < 0.98,
    };
  }
  return {
    x: TOMB_ENTRANCE_INSET[0],
    z: TOMB_ENTRANCE_INSET[1],
    yaw: 0,
    carried: 0,
    buried: 1,
    visible: false,
  };
}

// ---------------------------------------------------------------------------
// Sundown lighting (3:35, "till the sun goes down") — the one text-fixed
// lighting cue, exactly as gibeon-pool used 2:24's dusk and jabesh-burial
// used its own evening arc. Every other beat's hour is an unstated,
// disclosed placeholder (a fixed daytime rig).

export function duskBlend(t: number): number {
  return smoothstep((t - T_FAST) / (T_PEOPLE_NOTE - T_FAST));
}
