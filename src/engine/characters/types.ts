import type * as THREE from 'three';

export const BONE_NAMES = [
  'hips',
  'spine',
  'chest',
  'neck',
  'head',
  'upperArmL',
  'forearmL',
  'handL',
  'upperArmR',
  'forearmR',
  'handR',
  'thighL',
  'shinL',
  'footL',
  'thighR',
  'shinR',
  'footR',
] as const;

export type BoneName = (typeof BONE_NAMES)[number];
export type DetailLevel = 'crowd' | 'principal';
export type ClipName = 'walk' | 'idle' | 'kneel' | 'mourn';

export const WALK_STRIDE_M = 1.5;

export interface DressSpec {
  tunicColor: string;
  cloakColor?: string;
  beltColor: string;
  headwear: 'wrap' | 'bare';
  headwrapColor?: string;
}
export interface CharacterParams {
  stature: number;
  build: number;
  shoulders: number;
  skinColor: string;
  hairColor: string;
  beard: boolean;
  dress: DressSpec;
  detail: DetailLevel;
}
export interface CharacterRig {
  geometry: THREE.BufferGeometry;
  skeleton: THREE.Skeleton;
  root: THREE.Bone;
  bones: Record<BoneName, THREE.Bone>;
  params: CharacterParams;
}
