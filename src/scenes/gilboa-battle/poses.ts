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
export const T_LINE_CLASH = 8;
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

/**
 * Beat-driven melee-clash choreography (`claim-line-defense`, `b-line-clash`
 * through `b-rout`): the Israelite defensive line and the facing subset of
 * Philistine infantry engage directly from `T_LINE_CLASH` until the line
 * gives way at `T_ROUT`, where `b-rout`'s "the line breaks" takes over the
 * narrative. Reads as real swordplay/spearplay — weapons swinging and
 * meeting, blocks, staggers — but every function here still produces only
 * gesture/orientation transforms, exactly like the rest of this file: no
 * wound, blood, or dismemberment geometry (ADR-009). The swing/block/
 * stagger cycle itself is identical in both violence modes — it is
 * choreography, not a depicted wound; only the post-clash fall a fraction
 * of the defender line takes at `T_ROUT` is subject to `fallDuration`,
 * matching `retinueFallPose`'s pattern.
 */
export const CLASH_CYCLE_SEC = 2.4;

export interface ClashPose {
  /** 0 not yet engaged .. 1 fully in the exchange. */
  engaged: number;
  /** -1 (wind-up/block) .. 1 (strike extension) — the repeating swing beat. */
  swing: number;
  /** 0..1 brief stagger/react blend on the opposing half of the cycle. */
  stagger: number;
}

/**
 * A -1..1 swing-beat waveform, offset per-figure by `phaseOffset` (a 0..1
 * fraction of one cycle) so the line doesn't move in lockstep. Time is
 * measured from `T_LINE_CLASH` so every figure's cycle aligns to the same
 * start regardless of its offset.
 */
function clashCycle(t: number, phaseOffset: number): number {
  return Math.sin(((t - T_LINE_CLASH) / CLASH_CYCLE_SEC + phaseOffset) * Math.PI * 2);
}

/** 0..1 blend for how "in the exchange" a figure is at time t, both edges smoothed. */
function clashEngagement(t: number): number {
  const engageIn = smoothstep((t - T_LINE_CLASH) / 2);
  const engageOut = 1 - smoothstep((t - (T_ROUT + 2)) / 3);
  return clamp01(engageIn) * clamp01(engageOut);
}

/**
 * The Israelite defender line's clash stance: idle-engaged, swinging the
 * spear, and briefly staggering against the paired Philistine's strike
 * beat. `phaseOffset` (0..1) staggers each figure's cycle so the line reads
 * as a ragged mutual exchange, not a synchronized drill.
 */
export function defenderClashPose(t: number, phaseOffset: number): ClashPose {
  const engaged = clashEngagement(t);
  const swing = engaged * clashCycle(t, phaseOffset);
  const stagger = engaged * Math.max(0, -clashCycle(t, phaseOffset + 0.2));
  return { engaged, swing, stagger };
}

/**
 * The facing subset of Philistine infantry: the same clash cycle, run a
 * half-beat out of phase with its paired defender so the strikes visually
 * interleave (one line's strike lands as the other's block/stagger) rather
 * than mirroring in lockstep.
 */
export function infantryEngagedPose(t: number, phaseOffset: number): ClashPose {
  return defenderClashPose(t, phaseOffset + 0.5);
}

/**
 * The fraction of the defender line that goes down as the position breaks
 * at `T_ROUT` — the same fall-transform convention as `retinueFallPose`/
 * `sonFallPose`: a collapse transform only, never a depicted strike.
 */
export function defenderFallPose(
  t: number,
  mode: ViolenceMode,
  falls: boolean,
  fallDelay: number,
): FallPose {
  if (!falls) return { fallen: 0 };
  const dur = fallDuration(mode, 5);
  return { fallen: smoothstep((t - T_ROUT - fallDelay) / dur) };
}
