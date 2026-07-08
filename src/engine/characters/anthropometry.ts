import type { CharacterParams, DetailLevel } from './types';

export const STATURE_DEFAULT_MALE = 1.66;
export const STATURE_DEFAULT_FEMALE = 1.54;
export const SKIN_PALETTE = ['#8f5b3d', '#a66d48', '#75462f'];
export const HAIR_PALETTE = ['#1f1712', '#2b1d14'];
export const TUNIC_PALETTE = ['#b69b6d', '#9d8358', '#c2ad82'];
export const CLOAK_PALETTE = ['#6d5138', '#4d4337', '#7f6544'];
export const BELT_PALETTE = ['#3b2416', '#5a3722'];
export const P = {
  hipsY: 0.53,
  spineY: 0.68,
  chestY: 0.82,
  neckY: 0.9,
  headY: 0.98,
  shoulderX: 0.14,
  hipJointX: 0.055,
  kneeY: 0.285,
  ankleY: 0.045,
};

const pick = (values: string[], seed: number) => values[Math.abs(Math.floor(seed)) % values.length];

export function randomCharacterParams(seed = 1, detail: DetailLevel = 'crowd'): CharacterParams {
  const stature = STATURE_DEFAULT_MALE + ((seed % 7) - 3) * 0.015;
  return {
    stature,
    build: 0.35 + (seed % 5) * 0.1,
    shoulders: 0.96 + (seed % 4) * 0.025,
    skinColor: pick(SKIN_PALETTE, seed),
    hairColor: pick(HAIR_PALETTE, seed + 1),
    beard: true,
    detail,
    dress: {
      tunicColor: pick(TUNIC_PALETTE, seed + 2),
      cloakColor: seed % 2 ? pick(CLOAK_PALETTE, seed + 3) : undefined,
      beltColor: pick(BELT_PALETTE, seed),
      headwear: seed % 3 ? 'wrap' : 'bare',
      headwrapColor: '#d1c09a',
    },
  };
}
