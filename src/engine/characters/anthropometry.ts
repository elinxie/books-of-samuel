import type { CharacterParams, DressSpec } from './types';

/**
 * Human proportions as fractions of stature H, per standard body-segment
 * tables (Drillis & Contini) and the ~7.5-head artistic canon. These are
 * modern anatomical constants, not archaeological claims; period-specific
 * stature defaults are documented in docs/design/character-system.md.
 */
export const P = {
  hipsY: 0.555, // pelvis root (sacrum)
  hipJointY: 0.52,
  hipJointX: 0.055,
  kneeY: 0.285,
  ankleY: 0.039,
  footLen: 0.152,
  footBack: 0.04, // heel behind the ankle
  spineY: 0.615,
  chestY: 0.72,
  neckY: 0.855,
  headY: 0.895, // skull base
  crownY: 1.0,
  chinY: 0.872,
  shoulderY: 0.833,
  shoulderX: 0.115, // glenohumeral joint
  upperArmLen: 0.186,
  forearmLen: 0.146,
  handLen: 0.106,
  headWidth: 0.104,
  headDepth: 0.124,
} as const;

/** Rest-pose A-pose angles (radians from vertical, outward). */
export const A_POSE_ARM = 0.24;
export const A_POSE_FOREARM = 0.1;

/** Default statures for southern Levant Iron Age populations (m). */
export const STATURE_DEFAULT_MALE = 1.66;
export const STATURE_DEFAULT_FEMALE = 1.54;

/** Levantine bronze skin range (vertex-color, no albedo texture). */
export const SKIN_PALETTE = ['#9c6b4a', '#8a5a3c', '#7a4e33', '#a97856', '#93634a'];

export const HAIR_PALETTE = ['#241b13', '#1c1510', '#33261a', '#2b2017'];

/** Undyed-to-earth wool for tunics (matches the scene's existing palette). */
export const TUNIC_PALETTE = [
  '#8a7a62',
  '#6f5b43',
  '#7d6a52',
  '#9c8a6c',
  '#5f5142',
  '#7a4a3a',
  '#54504a',
  '#8f8168',
];

/** Darker over-mantle (simlah) tones. */
export const CLOAK_PALETTE = ['#4f4335', '#5a4a38', '#464038', '#5e4a41', '#3f3a33'];

export const BELT_PALETTE = ['#5b4632', '#4e3c2b', '#665038'];

export const SANDAL_COLOR = '#4a3826';

/**
 * Deterministic crowd-figure parameters from a seeded RNG. Overrides let a
 * scene pin identity-bearing choices (e.g. David's cloak color).
 */
export function randomCharacterParams(
  rng: () => number,
  overrides: Partial<CharacterParams> = {},
): CharacterParams {
  const pick = <T>(arr: readonly T[]): T => arr[Math.floor(rng() * arr.length) % arr.length];
  const hasCloak = rng() < 0.5;
  const wrapped = rng() < 0.6;
  const dress: DressSpec = {
    tunicColor: pick(TUNIC_PALETTE),
    cloakColor: hasCloak ? pick(CLOAK_PALETTE) : undefined,
    beltColor: pick(BELT_PALETTE),
    headwear: wrapped ? 'wrap' : 'bare',
    headwrapColor: wrapped ? pick(TUNIC_PALETTE) : undefined,
    ...overrides.dress,
  };
  return {
    stature: STATURE_DEFAULT_MALE + (rng() * 2 - 1) * 0.06,
    build: 0.25 + rng() * 0.55,
    shoulders: 0.94 + rng() * 0.12,
    skinColor: pick(SKIN_PALETTE),
    hairColor: pick(HAIR_PALETTE),
    beard: true,
    detail: 'crowd',
    ...overrides,
    dress,
  };
}
