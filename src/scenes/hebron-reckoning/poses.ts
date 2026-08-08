import * as THREE from 'three';
import type { ViolenceMode } from '../../state/store';
import {
  ARABAH_ROAD_CURVE,
  BAANAH_STAND_POS,
  DAVID_PLAZA_POS,
  EXECUTION_GROUND,
  PRESENTATION_POS,
  RECHAB_STAND_POS,
  TOMB_ENTRANCE_INSET,
} from './layout';

/**
 * Pure, beat-driven pose/timing choreography for hebron-reckoning (ADR-007
 * convention, mirroring hebron-gate's/ziklag-lament's poses.ts). Beat times
 * match `src/data/scenes.ts`'s `hebron-reckoning` entry exactly
 * (`b-courage-fails` through `b-close`) — see
 * docs/design/hebron-reckoning-brief.md, "Camera / observer experience", for
 * the standard/reduced treatment table this file implements.
 *
 * ADR-009's third named-killing-template application, and its first as a
 * judicial act: documentary distance, no wound/blood/dismemberment geometry
 * in either mode, and the text supplies no method detail to invent a strike
 * gesture from at all (unlike Asahel's reversed grip or the gate-aside at
 * Hebron's own gate) — so, per the brief, none is invented: no attendant
 * ever leans, thrusts, or mimes a striking motion, in either mode
 * (`attendantPose`). The strike itself is elided/silhouette-distant even in
 * standard mode — only Rechab's and Baanah's own collapse plays, at
 * documentary distance, timed after a brief unrendered pause rather than any
 * visible gesture. Reduced mode elides the whole command-to-strike sequence,
 * cutting straight to the aftermath, and never moves the escorts to the pool
 * ground at all.
 *
 * The head of Ish-bosheth never renders as anatomy anywhere in this file:
 * `bundlePose` only ever moves/hides a small covered bundle
 * (`buildWrappedFormGeometry` at a short `lengthScale`, see `HeadBundle.tsx`)
 * — no function here produces a head, limb, or wound shape. The
 * hands-and-feet display (4:12a) has no pose function at all: Rechab and
 * Baanah simply fade from view once their execution's aftermath has held
 * briefly, rather than lingering at the pool in any posture that could read
 * as the display — the display is caption-only, per the brief's absolute bar.
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

/** A bell-shaped 0..1 envelope: ramps up into `center`, holds, fades out —
 * used for every address/presentation gesture in this scene rather than a
 * bespoke curve per beat (hebron-gate's `gestureBell` convention). */
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

/** Duration (seconds) of an animated fall/collapse transition — standard is
 * gradual, reduced elides it, reaching the same eventual pose almost at once
 * (the same convention every prior ADR-009 scene's poses.ts uses). */
export function fallDuration(mode: ViolenceMode, standardDur: number): number {
  return mode === 'standard' ? standardDur : Math.min(1, standardDur * 0.12);
}

// ---------------------------------------------------------------------------
// Beat timeline (must match scenes.ts's hebron-reckoning entry).

export const T_COURAGE_FAILS = 0;
export const T_MEPHIBOSHETH = 14;
export const T_MURDER_CARD = 28;
export const T_ARRIVAL = 44;
export const T_PRESENTATION = 62;
export const T_VERDICT = 78;
export const T_EXECUTION = 102;
export const T_BURIAL = 118;
export const T_CLOSE = 132;
export const DURATION_SEC = 142;

const ARRIVAL_TRAVEL_DUR = T_PRESENTATION - T_ARRIVAL; // 18s
const ESCORT_TRAVEL_DUR = 5;
const STRIKE_WINDUP_DUR = 1.0;
const STRIKE_DUR = 0.4;
const FALL_DUR_BASE = 2.5;
const FALLEN_HOLD_BEFORE_FADE = 2;
const FADE_DUR = 1.5;
const BUNDLE_LOWER_DUR = 2;
const BUNDLE_CARRY_DUR = 9;
const BUNDLE_BURY_DUR = 5;

const tmpVec = new THREE.Vector3();
const tmpTan = new THREE.Vector3();

// ---------------------------------------------------------------------------
// Rechab and Baanah (principals, 4:2-12): off-scene through the cards-only
// beats (the murder itself is narrated, never staged — no Mahanaim
// geometry); re-enter the scene already on the Arabah road at first light
// (4:8a), present themselves and the bundle low before David, stay through
// the verdict, are escorted to the pool ground, and are struck down at
// documentary distance — then fade from view once the aftermath has held,
// never lingering in a posture that could read as the hands-and-feet
// display (caption-only, per the brief's absolute ADR-009 bar).

export interface AssassinPose {
  x: number;
  z: number;
  yaw: number;
  /** 0 standing .. ~0.6 bowed, presenting the bundle low (4:8b). */
  present: number;
  /** 0..1 fallen after the execution strike. */
  fallen: number;
  visible: boolean;
}

export interface AssassinSpec {
  /** Lateral offset (meters) from the shared Arabah-road travel line. */
  laneOffset: number;
  standPos: readonly [number, number];
  /** Offset (meters) from `EXECUTION_GROUND` at the pool. */
  executionOffset: readonly [number, number];
}

function roadPoint(u: number): { x: number; z: number; yaw: number } {
  const uc = Math.min(1, Math.max(0, u));
  ARABAH_ROAD_CURVE.getPointAt(uc, tmpVec);
  ARABAH_ROAD_CURVE.getTangentAt(Math.max(0.001, uc), tmpTan);
  return { x: tmpVec.x, z: tmpVec.z, yaw: Math.atan2(tmpTan.x, tmpTan.z) };
}

export function assassinPose(t: number, mode: ViolenceMode, spec: AssassinSpec): AssassinPose {
  if (t < T_ARRIVAL) {
    return { x: 0, z: 0, yaw: 0, present: 0, fallen: 0, visible: false };
  }

  if (t < T_PRESENTATION) {
    const u = smoothstep((t - T_ARRIVAL) / ARRIVAL_TRAVEL_DUR);
    const p = roadPoint(u);
    // Settle onto the stand position over the last stretch of the walk.
    const settleU = smoothstep((u - 0.85) / 0.15);
    const x = lerp(p.x + spec.laneOffset, spec.standPos[0], settleU);
    const z = lerp(p.z, spec.standPos[1], settleU);
    return {
      x,
      z,
      yaw: settleU > 0.5 ? yawToward(x, z, DAVID_PLAZA_POS[0], DAVID_PLAZA_POS[1]) : p.yaw,
      present: 0,
      fallen: 0,
      visible: true,
    };
  }

  const present = gestureBell(t, T_PRESENTATION + 3, 1.5, T_VERDICT - T_PRESENTATION - 3, 1.5);

  if (t < T_EXECUTION) {
    return {
      x: spec.standPos[0],
      z: spec.standPos[1],
      yaw: yawToward(spec.standPos[0], spec.standPos[1], DAVID_PLAZA_POS[0], DAVID_PLAZA_POS[1]),
      present: Math.max(present, 0.15),
      fallen: 0,
      visible: true,
    };
  }

  const destX = EXECUTION_GROUND[0] + spec.executionOffset[0];
  const destZ = EXECUTION_GROUND[1] + spec.executionOffset[1];

  // Reduced mode cuts from the command straight to the aftermath (brief's
  // b-execution table): no travel to the pool ground is ever animated —
  // Rechab and Baanah simply appear there, already fallen, at T_EXECUTION.
  if (mode === 'reduced') {
    const fallen = smoothstep((t - T_EXECUTION) / fallDuration(mode, FALL_DUR_BASE));
    const fadeStart = T_EXECUTION + fallDuration(mode, FALL_DUR_BASE) + FALLEN_HOLD_BEFORE_FADE;
    const fadeAmount = smoothstep((t - fadeStart) / FADE_DUR);
    return {
      x: destX,
      z: destZ,
      yaw: yawToward(destX, destZ, DAVID_PLAZA_POS[0], DAVID_PLAZA_POS[1]),
      present: 0,
      fallen,
      visible: fadeAmount < 0.98,
    };
  }

  const escortEnd = T_EXECUTION + ESCORT_TRAVEL_DUR;
  if (t < escortEnd) {
    const p = smoothstep((t - T_EXECUTION) / ESCORT_TRAVEL_DUR);
    const x = lerp(spec.standPos[0], destX, p);
    const z = lerp(spec.standPos[1], destZ, p);
    return { x, z, yaw: yawToward(x, z, destX, destZ), present: 0, fallen: 0, visible: true };
  }

  const strikeAt = escortEnd + STRIKE_WINDUP_DUR + STRIKE_DUR;
  const fallStart = strikeAt;
  const fallen = smoothstep((t - fallStart) / fallDuration(mode, FALL_DUR_BASE));
  const fadeStart = fallStart + fallDuration(mode, FALL_DUR_BASE) + FALLEN_HOLD_BEFORE_FADE;
  const fadeAmount = smoothstep((t - fadeStart) / FADE_DUR);
  const visible = fadeAmount < 0.98;

  return {
    x: destX,
    z: destZ,
    yaw: yawToward(destX, destZ, DAVID_PLAZA_POS[0], DAVID_PLAZA_POS[1]),
    present: 0,
    fallen,
    visible,
  };
}

export const RECHAB_SPEC: AssassinSpec = {
  laneOffset: -1.4,
  standPos: RECHAB_STAND_POS,
  executionOffset: [-1.6, 0],
};

export const BAANAH_SPEC: AssassinSpec = {
  laneOffset: 1.4,
  standPos: BAANAH_STAND_POS,
  executionOffset: [1.6, 0],
};

// ---------------------------------------------------------------------------
// The covered bundle (4:8b, 4:12b): a small wrapped, anatomically unresolved
// form (`buildWrappedFormGeometry`, short `lengthScale`) — identifiable only
// by caption, never by geometry. Carried low on the Arabah road, lowered
// (not brandished) at the presentation, left resting through the verdict and
// execution, then carried to Abner's tomb and interred — the same ADR-009
// funerary fade `bierPose`/`boneBundlePose` used, at bundle scale.

export interface BundlePose {
  x: number;
  z: number;
  yaw: number;
  /** 0 resting/lowered .. 1 carried at hand height. */
  carried: number;
  /** 0 resting at the tomb mouth .. 1 fully interred (hidden). */
  buried: number;
  visible: boolean;
}

export function bundlePose(t: number): BundlePose {
  if (t < T_ARRIVAL) {
    return { x: 0, z: 0, yaw: 0, carried: 0, buried: 0, visible: false };
  }

  if (t < T_PRESENTATION) {
    const u = smoothstep((t - T_ARRIVAL) / ARRIVAL_TRAVEL_DUR);
    const p = roadPoint(u);
    const settleU = smoothstep((u - 0.85) / 0.15);
    const x = lerp(p.x, PRESENTATION_POS[0], settleU);
    const z = lerp(p.z, PRESENTATION_POS[1], settleU);
    return { x, z, yaw: p.yaw, carried: 1, buried: 0, visible: true };
  }

  const loweredEnd = T_PRESENTATION + BUNDLE_LOWER_DUR;
  if (t < loweredEnd) {
    const p = smoothstep((t - T_PRESENTATION) / BUNDLE_LOWER_DUR);
    return {
      x: PRESENTATION_POS[0],
      z: PRESENTATION_POS[1],
      yaw: 0,
      carried: 1 - p,
      buried: 0,
      visible: true,
    };
  }

  if (t < T_BURIAL) {
    return {
      x: PRESENTATION_POS[0],
      z: PRESENTATION_POS[1],
      yaw: 0,
      carried: 0,
      buried: 0,
      visible: true,
    };
  }

  const carryEnd = T_BURIAL + BUNDLE_CARRY_DUR;
  if (t < carryEnd) {
    const p = smoothstep((t - T_BURIAL) / BUNDLE_CARRY_DUR);
    const x = lerp(PRESENTATION_POS[0], TOMB_ENTRANCE_INSET[0], p);
    const z = lerp(PRESENTATION_POS[1], TOMB_ENTRANCE_INSET[1], p);
    return {
      x,
      z,
      yaw: yawToward(x, z, TOMB_ENTRANCE_INSET[0], TOMB_ENTRANCE_INSET[1]),
      carried: 1,
      buried: 0,
      visible: true,
    };
  }

  const buryEnd = carryEnd + BUNDLE_BURY_DUR;
  if (t < buryEnd) {
    const p = smoothstep((t - carryEnd) / BUNDLE_BURY_DUR);
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
// David (principal): present at the receiving ground throughout — never
// travels. Receives the presentation, delivers the Ziklag retelling and the
// "righteous man" verdict (4:9-11, this scene's ESV spend), commands the
// execution (4:12a), and holds at the close. Not narrated as attending the
// burial itself (unlike Abner's funeral, 3:31-32); this scene never moves
// him from the plaza.

export interface DavidPose {
  x: number;
  z: number;
  yaw: number;
  address: number;
}

export function davidPose(t: number): DavidPose {
  const address =
    gestureBell(t, T_VERDICT + 11, 2, 16, 3) + gestureBell(t, T_EXECUTION + 1, 1, 2, 1.5) * 0.6;
  const facingPresentation = t < T_EXECUTION + ESCORT_TRAVEL_DUR;
  const yaw = facingPresentation
    ? yawToward(DAVID_PLAZA_POS[0], DAVID_PLAZA_POS[1], PRESENTATION_POS[0], PRESENTATION_POS[1])
    : yawToward(DAVID_PLAZA_POS[0], DAVID_PLAZA_POS[1], EXECUTION_GROUND[0], EXECUTION_GROUND[1]);
  return { x: DAVID_PLAZA_POS[0], z: DAVID_PLAZA_POS[1], yaw, address: clamp01(address) };
}

// ---------------------------------------------------------------------------
// David's attendants/guard (4:12a, "the young men"): a disclosed
// design-choice headcount (`claim-reckoning-cast-scale`). Static bystanders
// at the receiving ground throughout except for two designated escorts, who
// walk the condemned to the pool ground and stand by while the collapse
// (`assassinPose`'s own `fallen`) plays out at documentary distance.
// Deliberately stricter than every prior ADR-009 named-killing scene: the
// text gives no method detail at all for this strike (unlike Abner's
// gate-aside or Asahel's reversed spear grip), so — per the brief — this
// file invents no equivalent gesture. No attendant ever leans, thrusts, or
// otherwise mimes a striking motion, in either violence mode; the escorts'
// only animated behavior is walking there and standing.

export const ATTENDANT_ESCORT_INDICES = [0, 1] as const;

export interface AttendantPose {
  x: number;
  z: number;
  yaw: number;
}

export function attendantPose(
  t: number,
  index: number,
  slot: readonly [number, number],
  mode: ViolenceMode,
): AttendantPose {
  const isEscort = ATTENDANT_ESCORT_INDICES.includes(index as 0 | 1);
  if (!isEscort || t < T_EXECUTION) {
    return { x: slot[0], z: slot[1], yaw: 0 };
  }

  // Reduced mode never moves the escorts to the pool ground at all — the
  // beat cuts straight from the command to the aftermath card, so nothing
  // here is shown traveling or standing there either.
  if (mode === 'reduced') {
    return { x: slot[0], z: slot[1], yaw: 0 };
  }

  const escortEnd = T_EXECUTION + ESCORT_TRAVEL_DUR;
  const side = index === ATTENDANT_ESCORT_INDICES[0] ? -1 : 1;
  const destX = EXECUTION_GROUND[0] + side * 2.6;
  const destZ = EXECUTION_GROUND[1] - 1.6;
  if (t < escortEnd) {
    const p = smoothstep((t - T_EXECUTION) / ESCORT_TRAVEL_DUR);
    const x = lerp(slot[0], destX, p);
    const z = lerp(slot[1], destZ, p);
    return { x, z, yaw: yawToward(x, z, EXECUTION_GROUND[0], EXECUTION_GROUND[1]) };
  }

  return {
    x: destX,
    z: destZ,
    yaw: yawToward(destX, destZ, EXECUTION_GROUND[0], EXECUTION_GROUND[1]),
  };
}
