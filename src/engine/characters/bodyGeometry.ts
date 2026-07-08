import * as THREE from 'three';
import { randomCharacterParams } from './anthropometry';
import { buildSkeleton } from './skeleton';
import type { CharacterParams, CharacterRig } from './types';

export function buildBodyGeometry(
  params: CharacterParams = randomCharacterParams(),
): THREE.BufferGeometry {
  const radius = params.detail === 'principal' ? 0.18 : 0.14;
  const segments = params.detail === 'principal' ? 12 : 8;
  const geometry = new THREE.CapsuleGeometry(
    radius * (0.9 + params.build * 0.25),
    params.stature - radius * 2,
    6,
    segments,
  );
  geometry.translate(0, params.stature / 2, 0);
  return geometry;
}

export function buildCharacterRig(params: CharacterParams = randomCharacterParams()): CharacterRig {
  const built = buildSkeleton(params.stature);
  return {
    geometry: buildBodyGeometry(params),
    skeleton: built.skeleton,
    root: built.root,
    bones: built.bones,
    params,
  };
}
