import * as THREE from 'three';
import { type ClipName, WALK_STRIDE_M } from './types';
import type { CrowdLimbPose } from './skeleton';

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

/**
 * Sampled `CrowdLimbPose` buckets for a walk cycle — a limb-angle sibling of
 * `makeClips().walk`'s bone-quaternion track (same 0.35 rad thigh-swing / 0.25
 * rad arm-swing amplitude convention), but returning plain pose values a
 * caller bakes into static geometry via `buildCrowdLimbedGeometry` +
 * `poseJointPositions`, rather than an (unused/stub-applied) `AnimationClip`.
 * `bucketCount` static geometries, cycled through by scene-time phase, is
 * how instanced crowds get a legible walking stride without per-instance
 * skeletal skinning.
 */
export function sampleWalkPoses(bucketCount: number): CrowdLimbPose[] {
  const out: CrowdLimbPose[] = [];
  for (let i = 0; i < bucketCount; i++) {
    const phase = (i / bucketCount) * Math.PI * 2;
    const legSwingL = Math.sin(phase) * 0.35;
    const legSwingR = Math.sin(phase + Math.PI) * 0.35;
    // The lifting leg bends at the knee on the forward half of its swing;
    // the planted/trailing leg stays straight.
    const kneeBendL = Math.max(0, Math.sin(phase + Math.PI / 2)) * 0.5;
    const kneeBendR = Math.max(0, Math.sin(phase + Math.PI / 2 + Math.PI)) * 0.5;
    out.push({
      legSwingL,
      legSwingR,
      kneeBendL,
      kneeBendR,
      armSwingL: -legSwingL * 0.7,
      armSwingR: -legSwingR * 0.7,
    });
  }
  return out;
}

/**
 * Sampled `CrowdLimbPose` buckets for a braced melee stance: a weight-shift
 * between a wide planted pair of legs, not a walking stride — read as
 * "engaged and bracing/recovering," paired with `poses.ts`'s
 * `defenderClashPose`/`infantryEngagedPose` swing cycle on the body/weapon
 * transform. No arm-swing component here; the weapon-strike motion is
 * carried entirely by the existing whole-body/weapon rotation in the scene
 * component, not by this geometry's arms.
 */
export function sampleFightPoses(bucketCount: number): CrowdLimbPose[] {
  const out: CrowdLimbPose[] = [];
  for (let i = 0; i < bucketCount; i++) {
    const phase = (i / bucketCount) * Math.PI * 2;
    const brace = 0.5 + 0.5 * Math.sin(phase);
    out.push({
      legSwingL: 0.12,
      legSwingR: -0.18,
      kneeBendL: 0.25 + brace * 0.35,
      kneeBendR: 0.15 + (1 - brace) * 0.3,
      armSwingL: 0,
      armSwingR: 0,
    });
  }
  return out;
}
