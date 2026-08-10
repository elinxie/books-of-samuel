import type { ViolenceMode } from '../../state/store';
import {
  ARABAH_ROAD_CURVE,
  BUNDLE_PROCESSION_CURVE,
  BUNDLE_REST_POS,
  DAVID_PLAZA_POS,
  EXECUTION_ROUTE_CURVE,
  POOL_BANK_POS,
  PRESENTATION_POS,
  TOMB_CENTER,
} from './layout';

/**
 * Pure, beat-driven pose/timing choreography for hebron-reckoning (ADR-007
 * convention, mirroring hebron-gate/gibeon-pool/ziklag-lament's poses.ts).
 * Beat times match `src/data/scenes.ts`'s `hebron-reckoning` entry exactly
 * (`b-courage-fails` through `b-close`) — see
 * docs/design/hebron-reckoning-brief.md, "Camera / observer experience".
 *
 * This is ADR-009's named-character-killing template's third application,
 * and its first judicial one. It is deliberately stricter than gibeon-pool's
 * reversed-spear-grip and hebron-gate's strike lean: 4:12a gives no method
 * detail for the execution itself, so **no gesture of any kind is invented**
 * for it — no `leadGesture`, no `strikeLean` analog anywhere in this file.
 * Rechab and Baanah are walked to the pool bank and, at `T_EXECUTION`, simply
 * fall — the same `fallDuration` collapse-transform device every prior
 * named killing in this project uses, with nothing added on top of it.
 * Reduced mode's "cut from the command to the aftermath card" (brief) is
 * realized the same way hebron-gate's file comment already documents: a
 * near-instant `fallDuration` reaching the same eventual pose sooner, never
 * a literal camera-cut mechanism.
 *
 * The hands-and-feet display (4:12a) and Ish-bosheth's murder/beheading
 * (4:5-7, implicitly at Mahanaim) are absolute ADR-009/scope bars: no
 * function in this file ever produces geometry for either. Rechab and
 * Baanah simply stay fallen at the pool bank for the remainder of the scene
 * (an ordinary collapse pose, the same device used everywhere else in the
 * project) — nothing further is ever staged for their bodies.
 */

export const T_COURAGE_FAILS = 0;
export const T_MEPHIBOSHETH = 14;
export const T_MURDER_CARD = 28;
export const T_ARRIVAL = 48;
export const T_PRESENTATION = 66;
export const T_VERDICT = 84;
export const T_EXECUTION = 106;
export const T_BURIAL = 128;
export const T_CLOSE = 150;
export const DURATION_SEC = 162;

/** When the two are led away from the presentation point toward the pool —
 * a beat after the verdict lands, arriving at the pool bank exactly at
 * `T_EXECUTION`. */
export const EXECUTION_WALK_START = T_VERDICT + 4;

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
 * almost immediately. Identical device to every prior named-killing scene's
 * `fallDuration`. */
export function fallDuration(mode: ViolenceMode, standardDur: number): number {
  return mode === 'standard' ? standardDur : Math.min(1, standardDur * 0.12);
}

// ---------------------------------------------------------------------------
// Rechab and Baanah (4:2-3, staged principals): arrive along the Arabah road
// carrying the bundle low -> present their claim before David -> held through
// the verdict -> walked to the pool bank -> fall, at T_EXECUTION, with no
// gesture invented for the strike itself (see file comment).

export interface AssassinPose {
  x: number;
  z: number;
  yaw: number;
  /** 0..1 the petition/bowed posture at the presentation, held through the
   * verdict — a respect/deference posture, never the execution collapse. */
  presented: number;
  /** 0..1 fallen after the execution — a collapse transform only, never
   * wound/dismemberment geometry (see file comment: no gesture precedes it). */
  fallen: number;
}

const PRESENT_RISE_DUR = 3;
const ARABAH_END = ARABAH_ROAD_CURVE.getPointAt(1);
const POOL_TRAVEL_DUR = T_EXECUTION - EXECUTION_WALK_START;

export function assassinPose(t: number, mode: ViolenceMode, lateralOffset: number): AssassinPose {
  if (t < T_ARRIVAL) {
    const u = smoothstep(t / T_ARRIVAL);
    const pos = ARABAH_ROAD_CURVE.getPointAt(u);
    const tan = ARABAH_ROAD_CURVE.getTangentAt(Math.max(0.001, u));
    const [ox, oz] = facePerpendicular(tan.x, tan.z, lateralOffset);
    return {
      x: pos.x + ox,
      z: pos.z + oz,
      yaw: Math.atan2(tan.x, tan.z),
      presented: 0,
      fallen: 0,
    };
  }

  const presented = smoothstep((t - T_ARRIVAL) / PRESENT_RISE_DUR);

  if (t < EXECUTION_WALK_START) {
    return {
      x: PRESENTATION_POS[0] + lateralOffset,
      z: PRESENTATION_POS[1],
      yaw: yawToward(
        PRESENTATION_POS[0],
        PRESENTATION_POS[1],
        DAVID_PLAZA_POS[0],
        DAVID_PLAZA_POS[1],
      ),
      presented,
      fallen: 0,
    };
  }

  if (t < T_EXECUTION) {
    const p = smoothstep((t - EXECUTION_WALK_START) / POOL_TRAVEL_DUR);
    const pos = EXECUTION_ROUTE_CURVE.getPointAt(p);
    const tan = EXECUTION_ROUTE_CURVE.getTangentAt(Math.max(0.001, p));
    const [ox, oz] = facePerpendicular(tan.x, tan.z, lateralOffset * 0.5);
    return {
      x: pos.x + ox,
      z: pos.z + oz,
      yaw: Math.atan2(tan.x, tan.z),
      presented: 1,
      fallen: 0,
    };
  }

  const fallen = smoothstep((t - T_EXECUTION) / fallDuration(mode, 5));
  return {
    x: POOL_BANK_POS[0] + lateralOffset * 0.5,
    z: POOL_BANK_POS[1],
    yaw: yawToward(POOL_BANK_POS[0], POOL_BANK_POS[1], ARABAH_END.x, ARABAH_END.z),
    presented: 1,
    fallen,
  };
}

// ---------------------------------------------------------------------------
// David: present at Hebron's receiving ground throughout (the same
// household-presence point hebron-anointing/hebron-covenant/hebron-gate
// use — not "arriving"). Receives the presentation, delivers the verdict
// in place, then holds through the execution/burial.

export interface DavidReckoningPose {
  x: number;
  z: number;
  yaw: number;
  /** 0..1 bell-curve envelope for the verdict address (4:9-11) — an
   * orientation/posture cue only, the same device as hebron-gate's
   * `protest`. */
  address: number;
}

const ADDRESS_DUR = 8;

export function davidReckoningPose(t: number): DavidReckoningPose {
  const rise = smoothstep((t - T_VERDICT) / 2);
  const fall = 1 - smoothstep((t - (T_VERDICT + ADDRESS_DUR)) / 2);
  const address = t < T_VERDICT ? 0 : clamp01(rise - (1 - fall));
  return {
    x: DAVID_PLAZA_POS[0],
    z: DAVID_PLAZA_POS[1],
    yaw: yawToward(
      DAVID_PLAZA_POS[0],
      DAVID_PLAZA_POS[1],
      PRESENTATION_POS[0],
      PRESENTATION_POS[1],
    ),
    address,
  };
}

// ---------------------------------------------------------------------------
// The head bundle (4:8, 4:12b — `buildWrappedFormGeometry` at a short length
// scale, the same device as jabesh-burial's bone bundle): carried low by the
// two during the arrival, set down at the presentation point, rests through
// the verdict/execution, then makes its own journey to the tomb of Abner —
// the same tomb `hebron-gate` built. Never carried aloft or brandished (no
// trophy framing, per the brief).

export interface BundlePose {
  x: number;
  z: number;
  /** 0 set down .. 1 carried (a low lift only — see the render layer). */
  carried: number;
  /** 0..1 lowered into the grave, ADR-009's funerary "covered before flame"
   * convention extended to burial (same device as hebron-gate's bierPose /
   * jabesh-burial's boneBundlePose). */
  buried: number;
  visible: boolean;
}

const BUNDLE_SETDOWN_DUR = 3;
const BUNDLE_PICKUP_DUR = 3;
const BUNDLE_TRAVEL_DUR = 15;
const BUNDLE_LOWER_DUR = 4;

export function headBundlePose(t: number): BundlePose {
  if (t < T_ARRIVAL) {
    const u = smoothstep(t / T_ARRIVAL);
    const pos = ARABAH_ROAD_CURVE.getPointAt(u);
    return { x: pos.x, z: pos.z, carried: 1, buried: 0, visible: true };
  }

  const setDownEnd = T_ARRIVAL + BUNDLE_SETDOWN_DUR;
  if (t < setDownEnd) {
    const p = smoothstep((t - T_ARRIVAL) / BUNDLE_SETDOWN_DUR);
    return {
      x: lerp(ARABAH_END.x, BUNDLE_REST_POS[0], p),
      z: lerp(ARABAH_END.z, BUNDLE_REST_POS[1], p),
      carried: 1 - p,
      buried: 0,
      visible: true,
    };
  }

  if (t < T_BURIAL) {
    return { x: BUNDLE_REST_POS[0], z: BUNDLE_REST_POS[1], carried: 0, buried: 0, visible: true };
  }

  const pickupEnd = T_BURIAL + BUNDLE_PICKUP_DUR;
  if (t < pickupEnd) {
    const p = smoothstep((t - T_BURIAL) / BUNDLE_PICKUP_DUR);
    return { x: BUNDLE_REST_POS[0], z: BUNDLE_REST_POS[1], carried: p, buried: 0, visible: true };
  }

  const travelEnd = pickupEnd + BUNDLE_TRAVEL_DUR;
  if (t < travelEnd) {
    const p = clamp01((t - pickupEnd) / BUNDLE_TRAVEL_DUR);
    const pos = BUNDLE_PROCESSION_CURVE.getPointAt(p);
    return { x: pos.x, z: pos.z, carried: 1, buried: 0, visible: true };
  }

  const lowerEnd = travelEnd + BUNDLE_LOWER_DUR;
  if (t < lowerEnd) {
    const p = smoothstep((t - travelEnd) / BUNDLE_LOWER_DUR);
    return { x: TOMB_CENTER[0], z: TOMB_CENTER[1], carried: 1 - p, buried: p, visible: p < 0.98 };
  }

  return { x: TOMB_CENTER[0], z: TOMB_CENTER[1], carried: 0, buried: 1, visible: false };
}

// ---------------------------------------------------------------------------
// Lighting: no verse in this chapter fixes an hour directly the way 3:35's
// sundown or 2:24's sundown do elsewhere; the brief instead offers a
// defensible inference — the two "went...all night" (4:7b) and are shown
// arriving "at first light" as a disclosed design choice, not an asserted
// textual fact. `morningBlend` ramps the lighting rig from a low-angle, warm
// dawn state at the scene's start toward ordinary daylight by the
// presentation beat, then holds flat daylight for the remainder — no
// dramatic storm-light for the judgment or the execution, matching
// hebron-gate's own "flat daylight throughout" precedent.

export function morningBlend(t: number): number {
  return 1 - smoothstep(t / T_PRESENTATION);
}
