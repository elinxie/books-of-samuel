import type * as THREE from 'three';

/** Stable bone name contract — animation clips and future glTF replacements
 * must use exactly these names (see docs/design/character-system.md). */
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

export interface DressSpec {
  /** Knee-length wool tunic (ketonet). */
  tunicColor: string;
  /** Rectangular over-mantle (simlah); omit for tunic-only figures. */
  cloakColor?: string;
  beltColor: string;
  headwear: 'wrap' | 'bare';
  headwrapColor?: string;
}

export interface CharacterParams {
  /** Standing height in meters (ground to crown). */
  stature: number;
  /** 0 = lean, 1 = heavy; scales girths, not stature. */
  build: number;
  /** Multiplier on shoulder breadth (~0.92–1.08). */
  shoulders: number;
  skinColor: string;
  hairColor: string;
  beard: boolean;
  dress: DressSpec;
  detail: DetailLevel;
}

/** A built character: skinned geometry bound to a skeleton. The seam where a
 * future Blender-authored glTF body can replace the procedural one. */
export interface CharacterRig {
  geometry: THREE.BufferGeometry;
  skeleton: THREE.Skeleton;
  /** Root bone (hips); add to the SkinnedMesh and bind. */
  root: THREE.Bone;
  bones: Record<BoneName, THREE.Bone>;
  params: CharacterParams;
}

export type ClipName = 'walk' | 'idle' | 'kneel' | 'mourn';

/** Walk clip is authored for this stride length (m per cycle); play at
 * timeScale = speed / WALK_STRIDE_M. */
export const WALK_STRIDE_M = 1.5;
