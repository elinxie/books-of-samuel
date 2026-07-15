import * as THREE from 'three';
import type { ViolenceMode } from '../../state/store';
import {
  WADI_PATH_CURVE,
  RECEPTION_BIER_SLOTS,
  PYRE_BIER_SLOTS,
  PYRE_POS,
  GRAVE_POS,
} from './layout';

/**
 * Pure, beat-driven pose/timing choreography for Jabesh-gilead (ADR-007
 * convention, mirroring beth-shan-walls/poses.ts). Beat times match
 * `src/data/scenes.ts`'s `jabesh-burial` entry exactly (`b-night-march`
 * through `b-close`) — see docs/design/jabesh-burial-brief.md, "Camera /
 * observer experience", for the standard/reduced treatment table. Most
 * beats are identical in both modes (the wrapped forms stay wrapped and the
 * covered-before-flame sequencing is unconditional, a hard constraint); only
 * `b-pyre` (reduced: no full blaze, cuts straight to an embers level) and
 * `b-bones` (reduced: the gathering/carry is elided, the bundle is simply
 * present at the grave once `b-tamarisk` begins) branch on `violenceMode`.
 *
 * No function here ever produces a burning human silhouette, charring
 * detail, or skeletal/bone geometry: the wrapped forms are hidden the
 * instant the pyre timber finishes covering them, and the post-pyre remains
 * render only as a short cloth-wrapped bundle (`buildWrappedFormGeometry` at
 * bundle scale), never anatomy.
 */

export const T_NIGHT_MARCH = 0;
export const T_RECEIVED = 24;
export const T_PYRE = 55;
export const PYRE_CARRY_DUR = 8;
/** Timber only starts stacking once every form's carry-to-pyre transit has
 * finished (the last-staggered form's carry ends at T_PYRE + 3*FORM_STAGGER
 * + PYRE_CARRY_DUR = 64.5) — with a short pause before covering begins. */
export const PYRE_COVER_START = 66;
export const PYRE_COVER_DUR = 7;
/** The moment the timber has fully covered the biers — flame may render only at or after this instant. */
export const PYRE_COVERED_AT = PYRE_COVER_START + PYRE_COVER_DUR;
export const PYRE_IGNITE_DUR = 3;
export const T_BONES = 82;
export const BONES_CARRY_DUR = 8;
export const T_TAMARISK = 104;
export const BURIAL_DUR = 7;
export const T_SEVEN_DAYS = 122;
export const SEVEN_DAYS_END = 140;
export const T_CLOSE = 142;
export const DURATION_SEC = 150;

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

// ---------------------------------------------------------------------------
// Torches carried by the retrieval column (reusing the amalekite-camp
// emissive-sprite technique, per Torches.tsx): present while a bearer is
// still on the wadi path, fading out shortly after that bearer arrives.

export const TORCH_FADE_OUT_DUR = 5;

/** 0..1 torch presence for a single bearer, given their own arrival time
 * (T_RECEIVED + their per-figure stagger). */
export function columnTorchPresence(t: number, arriveAt: number): number {
  if (t < arriveAt) return 1;
  return clamp01(1 - smoothstep((t - arriveAt) / TORCH_FADE_OUT_DUR));
}

// ---------------------------------------------------------------------------
// The four wrapped forms (`claim-jabesh-retrieval`, `claim-burning-bodies`):
// carried in on the wadi path, laid at the dawn reception, carried to the
// pyre, laid and fully covered by timber, then hidden — never shown
// burning, in any mode.

const FORM_STAGGER = 0.5;

export interface FormPose {
  x: number;
  z: number;
  yaw: number;
  /** 0 = laid flat on the ground/bier; 1 = lifted, actively being carried. */
  carried: number;
  visible: boolean;
}

/** `formIndex` (0..3) staggers each form slightly through the reception
 * and pyre-carry transitions, so the four don't move in perfect lockstep
 * (mirrors beth-shan's DISPLAY_FORM_STAGGER). Exported for unit tests. */
export function formPose(t: number, formIndex: number): FormPose {
  const delay = formIndex * FORM_STAGGER;
  const receivedAt = T_RECEIVED + delay;

  if (t < receivedAt) {
    const u = clamp01(smoothstep(t / receivedAt));
    const pos = WADI_PATH_CURVE.getPointAt(u);
    const tan = WADI_PATH_CURVE.getTangentAt(Math.max(0.001, u));
    const laneOffset = (formIndex - 1.5) * 0.9;
    return {
      x: pos.x + laneOffset,
      z: pos.z,
      yaw: Math.atan2(tan.x, tan.z),
      carried: 1,
      visible: true,
    };
  }

  const carryStart = T_PYRE + delay;
  if (t < carryStart) {
    const [sx, sz] = RECEPTION_BIER_SLOTS[formIndex];
    return { x: sx, z: sz, yaw: 0, carried: 0, visible: true };
  }

  const carryEnd = carryStart + PYRE_CARRY_DUR;
  if (t < carryEnd) {
    const p = smoothstep((t - carryStart) / PYRE_CARRY_DUR);
    const [sx, sz] = RECEPTION_BIER_SLOTS[formIndex];
    const [px, pz] = PYRE_BIER_SLOTS[formIndex];
    const yaw = Math.atan2(px - sx, pz - sz);
    return { x: lerp(sx, px, p), z: lerp(sz, pz, p), yaw, carried: 1, visible: true };
  }

  if (t < PYRE_COVERED_AT) {
    const [px, pz] = PYRE_BIER_SLOTS[formIndex];
    return { x: px, z: pz, yaw: 0, carried: 0, visible: true };
  }

  // Fully covered by pyre timber and lit: the wrapped-form geometry is
  // hidden from this instant on, in every mode — the covered-before-flame
  // sequencing above is identical regardless of violenceMode.
  return { x: 0, z: 0, yaw: 0, carried: 0, visible: false };
}

// ---------------------------------------------------------------------------
// The pyre timber and flame: covered before lit, always (a hard constraint,
// not mode-dependent). Individual logs stagger their own growth inside
// `Pyre.tsx`; this envelope is the shared reference other logic keys off.

/** 0..1 how much of the pyre timber has been stacked over the biers. */
export function pyreCoverProgress(t: number): number {
  return smoothstep((t - PYRE_COVER_START) / PYRE_COVER_DUR);
}

/** Reduced mode never shows a full blaze — it "cuts from lighting to
 * embers" (brief's b-pyre reduced treatment): intensity is capped at an
 * embers-only level throughout, rather than ramping to a full flame. */
const PYRE_REDUCED_EMBER_CAP = 0.32;

/** 0..1 flame/ember intensity. Zero until the timber is fully covering the
 * forms (`PYRE_COVERED_AT`); ramps up, holds, then fades toward embers as
 * the bones are gathered. The one large fire the project renders, emissive
 * sprites only — never a real light (see Pyre.tsx). Standard mode shows the
 * full lit blaze at documentary distance; reduced mode caps intensity at an
 * embers level throughout (no full-blaze frame is ever shown) — the caption
 * stating the burning is identical in both modes. */
export function pyreFireIntensity(t: number, mode: ViolenceMode = 'standard'): number {
  if (t < PYRE_COVERED_AT) return 0;
  const rampUp = smoothstep((t - PYRE_COVERED_AT) / PYRE_IGNITE_DUR);
  const fadeStart = T_BONES - 4;
  const fadeEnd = T_BONES + 10;
  const fade = 1 - smoothstep((t - fadeStart) / (fadeEnd - fadeStart));
  const peak = mode === 'reduced' ? PYRE_REDUCED_EMBER_CAP : 1;
  return clamp01(rampUp) * clamp01(fade) * peak;
}

// ---------------------------------------------------------------------------
// The bone bundle (31:13a) and the burial mound: gathered as a cloth-wrapped
// bundle at the pyre ground, carried to the tamarisk, lowered and buried.
// Never bone/skeletal geometry — see engine/characters/wrappedForm.ts.

const BONES_LOWER_START = T_TAMARISK;
const BONES_LOWER_END = T_TAMARISK + BURIAL_DUR;

export interface BundlePose {
  x: number;
  z: number;
  /** 0 = at rest on the ground, 1 = lifted while being carried. */
  carried: number;
  /** 0 = resting above ground, 1 = fully lowered/buried (hidden by the mound). */
  buried: number;
  visible: boolean;
}

/** Standard mode: the bones are gathered at the pyre ground and carried to
 * the tamarisk. Reduced mode elides the gathering/carry entirely (brief's
 * b-bones reduced treatment: "the gathering elided; the bundle simply
 * present at the next beat") — the bundle is not shown until `b-tamarisk`
 * begins, already resting at the grave, with no carry animation. */
export function boneBundlePose(t: number, mode: ViolenceMode = 'standard'): BundlePose {
  if (mode === 'reduced') {
    if (t < BONES_LOWER_START) return { x: 0, z: 0, carried: 0, buried: 0, visible: false };
    if (t < BONES_LOWER_END) {
      const p = smoothstep((t - BONES_LOWER_START) / BURIAL_DUR);
      return { x: GRAVE_POS[0], z: GRAVE_POS[1], carried: 0, buried: p, visible: p < 0.98 };
    }
    return { x: GRAVE_POS[0], z: GRAVE_POS[1], carried: 0, buried: 1, visible: false };
  }

  if (t < T_BONES) return { x: 0, z: 0, carried: 0, buried: 0, visible: false };

  const carryEnd = T_BONES + BONES_CARRY_DUR;
  if (t < carryEnd) {
    const p = smoothstep((t - T_BONES) / BONES_CARRY_DUR);
    return {
      x: lerp(PYRE_POS[0], GRAVE_POS[0], p),
      z: lerp(PYRE_POS[1], GRAVE_POS[1], p),
      carried: 1,
      buried: 0,
      visible: true,
    };
  }

  if (t < BONES_LOWER_START) {
    return { x: GRAVE_POS[0], z: GRAVE_POS[1], carried: 0, buried: 0, visible: true };
  }

  if (t < BONES_LOWER_END) {
    const p = smoothstep((t - BONES_LOWER_START) / BURIAL_DUR);
    return { x: GRAVE_POS[0], z: GRAVE_POS[1], carried: 0, buried: p, visible: p < 0.98 };
  }

  return { x: GRAVE_POS[0], z: GRAVE_POS[1], carried: 0, buried: 1, visible: false };
}

/** 0..1 growth of the closed burial mound over the bundle. */
export function burialMoundProgress(t: number): number {
  return smoothstep((t - BONES_LOWER_START) / BURIAL_DUR);
}

// ---------------------------------------------------------------------------
// The seven-day fast (31:13b): a compressed day-cycle shimmer — a keyframed
// lighting-rig oscillation, not a literal seven-day simulation and not new
// lights (brief: "a rig mutation, interpolated per frame"). Pure, so the
// envelope/oscillation shape is unit-testable without a renderer.

export const SEVEN_DAYS_CYCLES = 3.5;
const SHIMMER_FADE_DUR = 6;

/** 0..1 envelope: fades in at the start of the seven-day card, holds, fades
 * out before b-close so the rig settles back to a stable evening state. */
export function sevenDayShimmerEnvelope(t: number): number {
  const fadeIn = smoothstep((t - T_SEVEN_DAYS) / SHIMMER_FADE_DUR);
  const fadeOut = smoothstep((t - (SEVEN_DAYS_END - SHIMMER_FADE_DUR)) / SHIMMER_FADE_DUR);
  return clamp01(fadeIn - fadeOut);
}

/** 0..1 oscillation position standing in for compressed day/night passes
 * across the fast — several cycles across the card's window, not seven
 * literal days. Returns 0.5 (neutral) outside the window. */
export function sevenDayShimmerOscillation(t: number): number {
  if (t <= T_SEVEN_DAYS || t >= SEVEN_DAYS_END) return 0.5;
  const span = SEVEN_DAYS_END - T_SEVEN_DAYS;
  const phase = ((t - T_SEVEN_DAYS) / span) * SEVEN_DAYS_CYCLES * Math.PI * 2;
  return (Math.sin(phase) + 1) / 2;
}

// ---------------------------------------------------------------------------
// Reusable path-sampling helper for instanced worn-path geometry.

export function samplePath(
  curve: THREE.CatmullRomCurve3,
  step = 7,
): { pos: THREE.Vector3; yaw: number }[] {
  const length = curve.getLength();
  const n = Math.max(1, Math.floor(length / step));
  const out: { pos: THREE.Vector3; yaw: number }[] = [];
  for (let i = 0; i <= n; i++) {
    const u = i / n;
    const pos = curve.getPointAt(u);
    const tan = curve.getTangentAt(u);
    out.push({ pos, yaw: Math.atan2(tan.x, tan.z) });
  }
  return out;
}
