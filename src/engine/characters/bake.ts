import * as THREE from 'three';
import type { CharacterRig, ClipName } from './types';
import { makeClips } from './animation';

export interface PoseBucketSet {
  clip: ClipName;
  geometries: THREE.BufferGeometry[];
}
export function applyClipPose(_rig: CharacterRig, _clip: ClipName, _time: number): void {
  /* pose application is reserved for scene integration */
}
export function bakeCurrentPose(rig: CharacterRig): THREE.BufferGeometry {
  return rig.geometry.clone();
}
export function bakePoseGeometry(
  rig: CharacterRig,
  clip: ClipName,
  time: number,
): THREE.BufferGeometry {
  applyClipPose(rig, clip, time);
  return bakeCurrentPose(rig);
}
export function bakePoseBuckets(rig: CharacterRig): PoseBucketSet[] {
  const clips = makeClips();
  return [
    {
      clip: 'walk',
      geometries: Array.from({ length: 8 }, (_, i) =>
        bakePoseGeometry(rig, 'walk', (i / 8) * clips.walk.duration),
      ),
    },
    {
      clip: 'kneel',
      geometries: Array.from({ length: 4 }, (_, i) =>
        bakePoseGeometry(rig, 'kneel', (i / 3) * clips.kneel.duration),
      ),
    },
    {
      clip: 'idle',
      geometries: Array.from({ length: 3 }, (_, i) =>
        bakePoseGeometry(rig, 'idle', (i / 3) * clips.idle.duration),
      ),
    },
  ];
}
