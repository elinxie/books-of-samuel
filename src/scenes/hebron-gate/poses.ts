import type { ViolenceMode } from '../../state/store';
import {
  ABISHAI_GATE_POS,
  ABISHAI_HOLD_POS,
  ASIDE_POINT,
  DAVID_GATE_POS,
  GATE_SOUTH_THRESHOLD,
  JOAB_GATE_WAIT_POS,
  JOAB_PROTEST_POS,
  processionPointAt,
  PROCESSION_END_POINT,
  raidRoadPointAt,
  RAID_GATHER_CENTER,
  RAID_ROAD_END,
  TOMB_POS,
} from './layout';

/**
 * Pure, beat-driven pose/timing choreography for hebron-gate (ADR-007
 * convention, mirroring gibeon-pool/hebron-covenant's poses.ts). Beat times
 * match `src/data/scenes.ts`'s `hebron-gate` entry exactly (`b-joab-returns`
 * through `b-close`) — see docs/design/hebron-gate-brief.md, "Camera /
 * observer experience".
 *
 * ADR-009, second application of the named-killing template
 * (`claim-abner-killing`, cross-referencing `claim-asahel-death` from
 * gibeon-pool): documentary distance, no wound/blood geometry in any mode.
 * The one specific, non-graphic, legible detail this scene stages as gesture
 * is the drawing-aside itself (`gateAsidePose`) — never a distinct "strike"
 * animation, never a weapon. Abner's collapse (`abnerFallen`) is the same
 * kind of body-orientation/collapse transform used at Gibeon and Gilboa, in
 * both violence modes; reduced mode reaches it far faster ("cut to the
 * aftermath," never a different final pose). The strike is staged as Joab's
 * alone throughout this file — Abishai's own pose function has no fall-
 * causing capability of any kind, only a position near (never at) the aside
 * point (3:30's shared culpability, stated only in the beat caption).
 */

export const T_JOAB_RETURNS = 0;
export const RAID_ARRIVE_DUR = 14;
export const T_PROTEST = 14;
const PROTEST_APPROACH_DUR = 4;
export const T_RECALL = 30;
const GATE_WAIT_APPROACH_DUR = 6;
export const T_GATE_ASIDE = 46;
export const ASIDE_WALK_DUR = 8;
export const T_ABNER_DEATH = 62;
export const FALL_STANDARD_DUR = 3.5;
/** The brief's "short held still on the gate" bridging the strike to the
 * disavowal — nothing else is scripted to move during this window, so the
 * hold reads through pacing alone (no dedicated clock-freeze needed, unlike
 * gibeon-pool's moving pursuit cast). */
export const HOLD_DUR = 6;
export const T_DAVID_HEARS = 80;
export const T_MOURNING_CMD = 98;
const DAVID_TO_BIER_WALK_DUR = 8;
export const T_PROCESSION = 114;
export const PROCESSION_DUR = 26;
export const T_BURIAL_WEEP = T_PROCESSION + PROCESSION_DUR; // 140
export const BURIAL_SETTLE_DUR = 4;
export const T_LAMENT = 160;
export const T_FAST = 180;
const DUSK_RAMP_DUR = 12;
export const T_PEOPLE_NOTE = 194;
export const T_CLOSE = 206;
export const DURATION_SEC = 220;

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
// Abner's collapse (b-abner-death, 3:27b): a body-orientation/collapse
// transform only — no wound, blood, or weapon geometry, in either mode. This
// is the *only* place "fallen" is computed; nothing else in this file (or
// any other principal's pose function) ever introduces a second notion of
// injury.

export interface AbnerRigPose {
  x: number;
  z: number;
  yaw: number;
  fallen: number;
  visible: boolean;
}

export function abnerPrincipalPose(t: number, mode: ViolenceMode): AbnerRigPose {
  if (t < T_GATE_ASIDE) {
    return {
      x: GATE_SOUTH_THRESHOLD[0],
      z: GATE_SOUTH_THRESHOLD[1],
      yaw: 0,
      fallen: 0,
      visible: false,
    };
  }
  const [sx, sz] = GATE_SOUTH_THRESHOLD;
  const [ax, az] = ASIDE_POINT;
  const walkEnd = T_GATE_ASIDE + ASIDE_WALK_DUR;
  if (t < walkEnd) {
    const p = smoothstep((t - T_GATE_ASIDE) / ASIDE_WALK_DUR);
    const pos = lerpToward(sx, sz, ax, az, p);
    return { ...pos, yaw: yawToward(pos.x, pos.z, ax, az), fallen: 0, visible: true };
  }
  const facingJoab = yawToward(ax, az, ax + 1.6, az); // turned toward Joab, aside/private stance
  if (t < T_ABNER_DEATH) {
    return { x: ax, z: az, yaw: facingJoab, fallen: 0, visible: true };
  }
  // Visible (fallen, at rest) through the strike/hold/disavowal/mourning-
  // command beats; hides the instant the bier picks the body up (b-procession)
  // — a clean hand-off to the wrapped form, never two renderings at once.
  const fallen = smoothstep((t - T_ABNER_DEATH) / fallDuration(mode, FALL_STANDARD_DUR));
  return { x: ax, z: az, yaw: facingJoab, fallen, visible: t < T_PROCESSION };
}

// ---------------------------------------------------------------------------
// Joab's drawing-aside gesture (b-gate-aside, 3:27a) — the text's one
// specific, non-graphic, legible detail, per ADR-009's template (the analog
// of Gibeon's reversed spear grip). A lean/proximity envelope only, never a
// weapon or a strike animation; identical in both violence modes (the aside
// itself is not the violent part).

export interface GateAsidePose {
  /** 0..1 — Joab leaning in close, a hand-on-the-shoulder privacy gesture. */
  asideLean: number;
}

export function gateAsidePose(t: number): GateAsidePose {
  const leanIn = smoothstep((t - T_GATE_ASIDE) / (ASIDE_WALK_DUR * 0.6));
  const leanOut = smoothstep((t - (T_ABNER_DEATH - 0.6)) / 0.6);
  return { asideLean: clamp01(leanIn - leanOut) };
}

// ---------------------------------------------------------------------------
// Joab: raid arrival -> the protest -> waits near the gate through the
// (off-scene) recall -> leads Abner aside -> strikes (staged here only as
// Abner's own collapse, above) -> holds -> becomes a mourner, following the
// procession a few paces behind David, settling near (not at) the grave.

export interface PrincipalPose {
  x: number;
  z: number;
  yaw: number;
}

const JOAB_ASIDE_STAND: [number, number] = [-2.6, ASIDE_POINT[1]];
const JOAB_MOURNER_TRAIL = 4; // seconds behind the bier along the procession
const JOAB_TOMB_SLOT: [number, number] = [TOMB_POS[0] - 8, TOMB_POS[1] + 3];

export function joabPrincipalPose(t: number): PrincipalPose {
  if (t < RAID_ARRIVE_DUR) {
    const p = raidRoadPointAt(smoothstep(t / RAID_ARRIVE_DUR));
    return { x: p.x, z: p.z, yaw: p.yaw };
  }
  const approachEnd = RAID_ARRIVE_DUR + PROTEST_APPROACH_DUR;
  if (t < approachEnd) {
    const p = smoothstep((t - RAID_ARRIVE_DUR) / PROTEST_APPROACH_DUR);
    const pos = lerpToward(
      RAID_ROAD_END.x,
      RAID_ROAD_END.z,
      JOAB_PROTEST_POS[0],
      JOAB_PROTEST_POS[1],
      p,
    );
    return { ...pos, yaw: yawToward(pos.x, pos.z, JOAB_PROTEST_POS[0], JOAB_PROTEST_POS[1]) };
  }
  if (t < T_RECALL) {
    return {
      x: JOAB_PROTEST_POS[0],
      z: JOAB_PROTEST_POS[1],
      yaw: yawToward(...JOAB_PROTEST_POS, DAVID_GATE_POS[0], DAVID_GATE_POS[1]),
    };
  }
  const waitEnd = T_RECALL + GATE_WAIT_APPROACH_DUR;
  if (t < waitEnd) {
    const p = smoothstep((t - T_RECALL) / GATE_WAIT_APPROACH_DUR);
    const pos = lerpToward(
      JOAB_PROTEST_POS[0],
      JOAB_PROTEST_POS[1],
      JOAB_GATE_WAIT_POS[0],
      JOAB_GATE_WAIT_POS[1],
      p,
    );
    return { ...pos, yaw: yawToward(pos.x, pos.z, ...GATE_SOUTH_THRESHOLD) };
  }
  if (t < T_GATE_ASIDE) {
    return {
      x: JOAB_GATE_WAIT_POS[0],
      z: JOAB_GATE_WAIT_POS[1],
      yaw: yawToward(...JOAB_GATE_WAIT_POS, ...GATE_SOUTH_THRESHOLD),
    };
  }
  const asideWalkEnd = T_GATE_ASIDE + ASIDE_WALK_DUR;
  if (t < asideWalkEnd) {
    const p = smoothstep((t - T_GATE_ASIDE) / ASIDE_WALK_DUR);
    const pos = lerpToward(
      JOAB_GATE_WAIT_POS[0],
      JOAB_GATE_WAIT_POS[1],
      JOAB_ASIDE_STAND[0],
      JOAB_ASIDE_STAND[1],
      p,
    );
    return { ...pos, yaw: yawToward(pos.x, pos.z, ...ASIDE_POINT) };
  }
  const facingAbner = yawToward(...JOAB_ASIDE_STAND, ...ASIDE_POINT);
  if (t < T_MOURNING_CMD) {
    return { x: JOAB_ASIDE_STAND[0], z: JOAB_ASIDE_STAND[1], yaw: facingAbner };
  }
  const mournerStart = T_MOURNING_CMD;
  const routeStart = T_PROCESSION + JOAB_MOURNER_TRAIL;
  if (t < routeStart) {
    const p = smoothstep((t - mournerStart) / (routeStart - mournerStart));
    const pos = lerpToward(
      JOAB_ASIDE_STAND[0],
      JOAB_ASIDE_STAND[1],
      ASIDE_POINT[0],
      ASIDE_POINT[1],
      p,
    );
    return { ...pos, yaw: 0 };
  }
  const routeEnd = T_BURIAL_WEEP + JOAB_MOURNER_TRAIL;
  if (t < routeEnd) {
    const p = processionPointAt(smoothstep((t - routeStart) / (routeEnd - routeStart)));
    return { x: p.x, z: p.z, yaw: p.yaw };
  }
  const settle = smoothstep((t - routeEnd) / 4);
  const pos = lerpToward(
    PROCESSION_END_POINT.x,
    PROCESSION_END_POINT.z,
    JOAB_TOMB_SLOT[0],
    JOAB_TOMB_SLOT[1],
    settle,
  );
  return { ...pos, yaw: yawToward(pos.x, pos.z, ...TOMB_POS) };
}

// ---------------------------------------------------------------------------
// Abishai: present near the gate (3:30's shared culpability, stated only in
// caption text), never co-located with the strike itself — his own position
// stays a few meters from `ASIDE_POINT` throughout, then holds at a
// background position for the funeral (never tracked to the graveside).

export function abishaiPrincipalPose(t: number): PrincipalPose {
  if (t < T_MOURNING_CMD) {
    return {
      x: ABISHAI_GATE_POS[0],
      z: ABISHAI_GATE_POS[1],
      yaw: yawToward(...ABISHAI_GATE_POS, ...ASIDE_POINT),
    };
  }
  const settleEnd = T_MOURNING_CMD + 6;
  if (t < settleEnd) {
    const p = smoothstep((t - T_MOURNING_CMD) / 6);
    const pos = lerpToward(
      ABISHAI_GATE_POS[0],
      ABISHAI_GATE_POS[1],
      ABISHAI_HOLD_POS[0],
      ABISHAI_HOLD_POS[1],
      p,
    );
    return { ...pos, yaw: 0 };
  }
  return { x: ABISHAI_HOLD_POS[0], z: ABISHAI_HOLD_POS[1], yaw: 0 };
}

// ---------------------------------------------------------------------------
// David: present at the plaza throughout the protest and the (unwitnessed)
// killing — "but David did not know it" (3:26b) is staged structurally here:
// his position never approaches `ASIDE_POINT` before he hears of it. Takes
// his place behind the bier (3:31) and walks the procession trailing the
// wrapped form, then holds at the graveside for the rest of the scene.

const DAVID_TOMB_SLOT: [number, number] = [TOMB_POS[0] - 4, TOMB_POS[1] + 5];
const DAVID_MOURNER_TRAIL = 2; // a few paces behind the bier itself

export function davidPrincipalPose(t: number): PrincipalPose {
  const [dx, dz] = DAVID_GATE_POS;
  if (t < T_RECALL) {
    return { x: dx, z: dz, yaw: yawToward(dx, dz, ...JOAB_PROTEST_POS) };
  }
  if (t < T_DAVID_HEARS) {
    return { x: dx, z: dz, yaw: yawToward(dx, dz, ...RAID_GATHER_CENTER) };
  }
  if (t < T_MOURNING_CMD) {
    return { x: dx, z: dz, yaw: yawToward(dx, dz, ...GATE_SOUTH_THRESHOLD) };
  }
  const walkEnd = T_MOURNING_CMD + DAVID_TO_BIER_WALK_DUR;
  if (t < walkEnd) {
    const p = smoothstep((t - T_MOURNING_CMD) / DAVID_TO_BIER_WALK_DUR);
    const pos = lerpToward(dx, dz, GATE_SOUTH_THRESHOLD[0], GATE_SOUTH_THRESHOLD[1], p);
    return { ...pos, yaw: yawToward(pos.x, pos.z, ...ASIDE_POINT) };
  }
  const routeStart = T_PROCESSION + DAVID_MOURNER_TRAIL;
  if (t < routeStart) {
    return {
      x: GATE_SOUTH_THRESHOLD[0],
      z: GATE_SOUTH_THRESHOLD[1],
      yaw: yawToward(...GATE_SOUTH_THRESHOLD, ...ASIDE_POINT),
    };
  }
  const routeEnd = T_BURIAL_WEEP + DAVID_MOURNER_TRAIL;
  if (t < routeEnd) {
    const p = processionPointAt(smoothstep((t - routeStart) / (routeEnd - routeStart)));
    return { x: p.x, z: p.z, yaw: p.yaw };
  }
  const settle = smoothstep((t - routeEnd) / 4);
  const pos = lerpToward(
    PROCESSION_END_POINT.x,
    PROCESSION_END_POINT.z,
    DAVID_TOMB_SLOT[0],
    DAVID_TOMB_SLOT[1],
    settle,
  );
  return { ...pos, yaw: yawToward(pos.x, pos.z, ...TOMB_POS) };
}

// ---------------------------------------------------------------------------
// Raid party / mourning assembly figure poses (crowd components read these
// per-figure, applying a per-figure stagger/lane offset on top).

export interface CrowdFigureConfig {
  laneOffset: number;
  arriveStagger: number;
  gatherSlot: [number, number];
  tombSlot: [number, number];
}

export interface CrowdFigurePose {
  x: number;
  z: number;
  yaw: number;
  visible: boolean;
}

/** Joab's raid party: walks in once, from t=0, and holds at its gather slot
 * for the rest of the scene — never staged leaving again. */
export function raidPartyFigurePose(t: number, fig: CrowdFigureConfig): CrowdFigurePose {
  const arriveEnd = RAID_ARRIVE_DUR + fig.arriveStagger;
  if (t < arriveEnd) {
    const p = smoothstep(t / arriveEnd);
    const pt = raidRoadPointAt(p);
    return { x: pt.x + fig.laneOffset, z: pt.z, yaw: pt.yaw, visible: true };
  }
  const settleEnd = arriveEnd + 3;
  if (t < settleEnd) {
    const p = smoothstep((t - arriveEnd) / 3);
    const pos = lerpToward(
      RAID_ROAD_END.x + fig.laneOffset,
      RAID_ROAD_END.z,
      fig.gatherSlot[0],
      fig.gatherSlot[1],
      p,
    );
    return { ...pos, yaw: yawToward(pos.x, pos.z, ...RAID_GATHER_CENTER), visible: true };
  }
  return {
    x: fig.gatherSlot[0],
    z: fig.gatherSlot[1],
    yaw: yawToward(...fig.gatherSlot, ...RAID_GATHER_CENTER),
    visible: true,
  };
}

/** The mourning assembly: present (standing) at its gather slot from the
 * start — "Hebron's own townspeople; they do not 'arrive'" (hebron-anointing
 * precedent) — then, per-figure staggered, follows the procession curve to
 * its own slot at the tomb ground, holding there for the rest of the scene. */
export function mourningFigurePose(t: number, fig: CrowdFigureConfig): CrowdFigurePose {
  const routeStart = T_PROCESSION + fig.arriveStagger;
  if (t < routeStart) {
    return { x: fig.gatherSlot[0], z: fig.gatherSlot[1], yaw: 0, visible: true };
  }
  const routeEnd = routeStart + PROCESSION_DUR * 0.85;
  if (t < routeEnd) {
    const p = smoothstep((t - routeStart) / (routeEnd - routeStart));
    const pt = processionPointAt(p);
    return { x: pt.x + fig.laneOffset, z: pt.z, yaw: pt.yaw, visible: true };
  }
  const settleEnd = routeEnd + 4;
  if (t < settleEnd) {
    const p = smoothstep((t - routeEnd) / 4);
    const pos = lerpToward(
      PROCESSION_END_POINT.x + fig.laneOffset,
      PROCESSION_END_POINT.z,
      fig.tombSlot[0],
      fig.tombSlot[1],
      p,
    );
    return { ...pos, yaw: yawToward(pos.x, pos.z, ...TOMB_POS), visible: true };
  }
  return {
    x: fig.tombSlot[0],
    z: fig.tombSlot[1],
    yaw: yawToward(...fig.tombSlot, ...TOMB_POS),
    visible: true,
  };
}

// ---------------------------------------------------------------------------
// The bier / wrapped form (b-procession, b-burial-weep): carried along the
// procession route, then lowered and settled into the tomb entry — the
// project's honest, anatomically-unresolved funerary standard
// (buildWrappedFormGeometry), never a distinct "body" asset. Hands off from
// `abnerPrincipalPose`'s own rig at the exact instant this becomes visible
// (see `abnerPrincipalPose`'s `visible: t < T_PROCESSION`), so the two are
// never rendered at once.

export interface BierPose {
  x: number;
  z: number;
  yaw: number;
  carried: number;
  sink: number;
  visible: boolean;
}

export function bierPose(t: number): BierPose {
  if (t < T_PROCESSION) {
    return { x: ASIDE_POINT[0], z: ASIDE_POINT[1], yaw: 0, carried: 0, sink: 0, visible: false };
  }
  const routeEnd = T_PROCESSION + PROCESSION_DUR;
  if (t < routeEnd) {
    const p = smoothstep((t - T_PROCESSION) / PROCESSION_DUR);
    const pt = processionPointAt(p);
    const carried = smoothstep((t - T_PROCESSION) / 3);
    return { x: pt.x, z: pt.z, yaw: pt.yaw, carried, sink: 0, visible: true };
  }
  const settleEnd = routeEnd + BURIAL_SETTLE_DUR;
  if (t < settleEnd) {
    const sink = smoothstep((t - routeEnd) / BURIAL_SETTLE_DUR);
    return {
      x: TOMB_POS[0],
      z: TOMB_POS[1],
      yaw: PROCESSION_END_POINT.yaw,
      carried: 1,
      sink,
      visible: true,
    };
  }
  return {
    x: TOMB_POS[0],
    z: TOMB_POS[1],
    yaw: PROCESSION_END_POINT.yaw,
    carried: 1,
    sink: 1,
    visible: false,
  };
}

// ---------------------------------------------------------------------------
// Lighting: 3:35's "till the sun goes down" is the one text-fixed hour this
// scene gets — the fast beat, ramping to dusk exactly as gibeon-pool's
// `duskBlend` used 2:24. Every other beat's hour stays an unstated,
// disclosed placeholder.

export function duskBlend(t: number): number {
  return smoothstep((t - T_FAST) / DUSK_RAMP_DUR);
}
