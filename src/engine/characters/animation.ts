import * as THREE from 'three';
import { type ClipName, WALK_STRIDE_M } from './types';

function track(name: string, times: number[], values: number[]): THREE.QuaternionKeyframeTrack {
  return new THREE.QuaternionKeyframeTrack(`${name}.quaternion`, times, values);
}
function q(axis: THREE.Vector3, angle: number): number[] {
  return new THREE.Quaternion().setFromAxisAngle(axis, angle).toArray();
}

export function makeClips(): Record<ClipName, THREE.AnimationClip> {
  const x = new THREE.Vector3(1, 0, 0);
  const z = new THREE.Vector3(0, 0, 1);
  const walkTimes = [0, 0.25, 0.5, 0.75, 1];
  const walkLeg = [q(x, -0.35), q(x, 0), q(x, 0.35), q(x, 0), q(x, -0.35)].flat();
  const walkArm = [q(x, 0.25), q(x, 0), q(x, -0.25), q(x, 0), q(x, 0.25)].flat();
  return {
    walk: new THREE.AnimationClip('walk', 1, [
      track('thighL', walkTimes, walkLeg),
      track('thighR', walkTimes, [...walkLeg.slice(16), ...walkLeg.slice(0, 16)]),
      track('upperArmL', walkTimes, walkArm),
      track('upperArmR', walkTimes, [...walkArm.slice(16), ...walkArm.slice(0, 16)]),
    ]),
    idle: new THREE.AnimationClip('idle', 4, [
      track('chest', [0, 2, 4], [q(z, -0.025), q(z, 0.025), q(z, -0.025)].flat()),
    ]),
    kneel: new THREE.AnimationClip('kneel', 2, [
      track('thighL', [0, 2], [q(x, 0), q(x, -1.2)].flat()),
      track('thighR', [0, 2], [q(x, 0), q(x, -1.2)].flat()),
      track('shinL', [0, 2], [q(x, 0), q(x, 1.5)].flat()),
      track('shinR', [0, 2], [q(x, 0), q(x, 1.5)].flat()),
    ]),
    mourn: new THREE.AnimationClip('mourn', 4, [
      track('neck', [0, 2, 4], [q(x, 0.35), q(x, 0.45), q(x, 0.35)].flat()),
      track('forearmR', [0, 2, 4], [q(x, -0.9), q(x, -1.1), q(x, -0.9)].flat()),
    ]),
  };
}
export { WALK_STRIDE_M };
