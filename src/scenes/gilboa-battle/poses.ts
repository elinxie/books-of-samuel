import type { ViolenceMode } from '../../state/store';

/**
 * Pure, beat-driven pose choreography for the Gilboa death sequence (M3 Step
 * 3 of 5). Beat times mirror `src/data/scenes.ts`'s `gilboa-battle` entry
 * exactly (`b-lines` through `b-silence`) — see
 * docs/design/gilboa-battle-brief.md, "Camera / observer experience", for
 * the standard/reduced treatment table this file implements.
 *
 * ADR-009: one choreography, two treatments. `reduced` never changes the
 * narrative fact or the final pose a figure settles into — it elides the
 * animated transition and cuts to the resulting pose sooner. No function
 * here ever produces wound, blood, or dismemberment geometry; "fallen" is
 * only ever a body-orientation/collapse transform (asset-figure-fallen).
 */

export const T_LINES = 0;
export const T_ROUT = 18;
export const T_SONS = 45;
export const T_ARCHERS = 72;
export const T_ARMORBEARER_REFUSES = 95;
export const T_SAUL_DEATH = 112;
export const T_ARMORBEARER_FOLLOWS = 126;
export const T_SILENCE = 140;
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

/**
 * Duration (seconds) of an animated fall/collapse transition. Standard uses
 * the full, gradual duration; reduced elides the animation and cuts to the
 * resulting pose almost immediately — the same eventual pose, reached sooner
 * (brief: "reduction abstracts depiction, never facts").
 */
export function fallDuration(mode: ViolenceMode, standardDur: number): number {
  return mode === 'standard' ? standardDur : Math.min(1, standardDur * 0.12);
}

export interface FallPose {
  /** 0 standing .. 1 fully fallen/prone. */
  fallen: number;
}

/**
 * The three sons — Jonathan, Abinadab, Malchi-shua (`b-sons`, t=45):
 * overtaken in the melee. Both modes end fallen; standard reads as a
 * gradual collapse ("the line collapsing over them"), reduced cuts to the
 * fallen state quickly — the melee closes and the beat card carries the
 * fact; the three are never shown being struck.
 */
export function sonFallPose(t: number, mode: ViolenceMode): FallPose {
  const dur = fallDuration(mode, 8);
  return { fallen: smoothstep((t - T_SONS) / dur) };
}

/**
 * One crest-retinue figure's fall at the same beat as the sons, staggered by
 * an individual delay so the line reads as collapsing in a ripple rather
 * than a single cut. Only figures flagged `falls` collapse; the remainder
 * hold their ground (this is a thin bodyguard line, not annihilated).
 */
export function retinueFallPose(
  t: number,
  mode: ViolenceMode,
  falls: boolean,
  fallDelay: number,
): FallPose {
  if (!falls) return { fallen: 0 };
  const dur = fallDuration(mode, 6);
  return { fallen: smoothstep((t - T_SONS - fallDelay) / dur) };
}

export interface SaulPose {
  /** 0 standing .. 1 on one knee/staggered (b-archers wound). */
  kneel: number;
  /** 0 kneeling .. 1 fallen/still (b-saul-death). */
  fallen: number;
  /**
   * 0..1 blend turning to face the armor-bearer — the refusal beat's
   * gesture/orientation change. Identical in both modes (brief: "the
   * emotional pivot is identical in both modes").
   */
  faceArmorBearer: number;
}

/** Saul: staggers/kneels when the archers find him, then the death sequence. */
export function saulPose(t: number, mode: ViolenceMode): SaulPose {
  const kneelDur = fallDuration(mode, 5);
  const kneel = smoothstep((t - T_ARCHERS) / kneelDur);
  const faceArmorBearer = smoothstep((t - T_ARMORBEARER_REFUSES) / 2);
  const deathDur = fallDuration(mode, 10);
  const fallen = smoothstep((t - T_SAUL_DEATH) / deathDur);
  return { kneel, fallen, faceArmorBearer };
}

export interface ArmorBearerPose {
  /**
   * 0..1 blend into a distinct recoiling stance at the refusal beat — a
   * gesture/orientation change, never a strike. Identical in both modes.
   */
  refusalTurn: number;
  /** 0 standing .. 1 fallen, after b-armorbearer-follows. */
  fallen: number;
}

/** The armor-bearer: the refusal gesture, then follows Saul in death. */
export function armorBearerPose(t: number, mode: ViolenceMode): ArmorBearerPose {
  const refusalTurn = smoothstep((t - T_ARMORBEARER_REFUSES) / 2);
  const dur = fallDuration(mode, 10);
  const fallen = smoothstep((t - T_ARMORBEARER_FOLLOWS) / dur);
  return { refusalTurn, fallen };
}
