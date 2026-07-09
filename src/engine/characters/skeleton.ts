import * as THREE from 'three';
import { P } from './anthropometry';
import { BONE_NAMES, type BoneName } from './types';

const PARENTS: Record<BoneName, BoneName | null> = {
  hips: null,
  spine: 'hips',
  chest: 'spine',
  neck: 'chest',
  head: 'neck',
  upperArmL: 'chest',
  forearmL: 'upperArmL',
  handL: 'forearmL',
  upperArmR: 'chest',
  forearmR: 'upperArmR',
  handR: 'forearmR',
  thighL: 'hips',
  shinL: 'thighL',
  footL: 'shinL',
  thighR: 'hips',
  shinR: 'thighR',
  footR: 'shinR',
};

export function jointPositions(stature: number): Record<BoneName, THREE.Vector3> {
  const h = stature;
  return {
    hips: new THREE.Vector3(0, P.hipsY * h, 0),
    spine: new THREE.Vector3(0, P.spineY * h, 0),
    chest: new THREE.Vector3(0, P.chestY * h, 0),
    neck: new THREE.Vector3(0, P.neckY * h, 0),
    head: new THREE.Vector3(0, P.headY * h, 0),
    upperArmL: new THREE.Vector3(P.shoulderX * h, P.chestY * h, 0),
    forearmL: new THREE.Vector3(0.22 * h, 0.64 * h, 0),
    handL: new THREE.Vector3(0.25 * h, 0.48 * h, 0.02 * h),
    upperArmR: new THREE.Vector3(-P.shoulderX * h, P.chestY * h, 0),
    forearmR: new THREE.Vector3(-0.22 * h, 0.64 * h, 0),
    handR: new THREE.Vector3(-0.25 * h, 0.48 * h, 0.02 * h),
    thighL: new THREE.Vector3(P.hipJointX * h, P.hipsY * h, 0),
    shinL: new THREE.Vector3(P.hipJointX * h, P.kneeY * h, 0),
    footL: new THREE.Vector3(P.hipJointX * h, P.ankleY * h, -0.03 * h),
    thighR: new THREE.Vector3(-P.hipJointX * h, P.hipsY * h, 0),
    shinR: new THREE.Vector3(-P.hipJointX * h, P.kneeY * h, 0),
    footR: new THREE.Vector3(-P.hipJointX * h, P.ankleY * h, -0.03 * h),
  };
}

export function resetToRest(bones: Record<BoneName, THREE.Bone>, stature: number): void {
  const joints = jointPositions(stature);
  for (const name of BONE_NAMES) {
    const parent = PARENTS[name];
    bones[name].position.copy(joints[name]);
    if (parent) bones[name].position.sub(joints[parent]);
    bones[name].quaternion.identity();
  }
}
/**
 * A single-hinge limb pose: thigh/upper-arm rotate about their proximal
 * (hip/shoulder) joint, and the knee additionally bends the shin/foot about
 * the (already-rotated) knee joint. Angles are radians, rotation in the
 * sagittal plane (about the local X axis) — enough to read as a real stride
 * or a braced fight stance without needing the full bone-quaternion/
 * animation-clip pipeline (`bake.ts`'s `applyClipPose` is still a stub).
 * Additive: nothing here changes `jointPositions`'s rest-pose output.
 */
export interface CrowdLimbPose {
  legSwingL: number;
  legSwingR: number;
  kneeBendL: number;
  kneeBendR: number;
  armSwingL: number;
  armSwingR: number;
}

export const REST_LIMB_POSE: CrowdLimbPose = {
  legSwingL: 0,
  legSwingR: 0,
  kneeBendL: 0,
  kneeBendR: 0,
  armSwingL: 0,
  armSwingR: 0,
};

/** Rotates a point about `pivot` by `angle` radians in the Y/Z (sagittal) plane. */
function rotateAboutPivotX(
  point: THREE.Vector3,
  pivot: THREE.Vector3,
  angle: number,
): THREE.Vector3 {
  if (angle === 0) return point.clone();
  const local = point.clone().sub(pivot);
  const cos = Math.cos(angle);
  const sin = Math.sin(angle);
  const y = local.y * cos - local.z * sin;
  const z = local.y * sin + local.z * cos;
  return new THREE.Vector3(local.x, y, z).add(pivot);
}

/**
 * Rest joint positions with a leg/arm pose applied — a real, unit-testable
 * forward-kinematics pass (not a torso-only blend). Used to build baked
 * pose-bucket geometry for crowd walk-cycle and melee-clash choreography.
 */
export function poseJointPositions(
  stature: number,
  pose: CrowdLimbPose,
): Record<BoneName, THREE.Vector3> {
  const j = jointPositions(stature);

  const swingLeg = (side: 'L' | 'R', swing: number, kneeBend: number) => {
    const hipKey = `thigh${side}` as const;
    const kneeKey = `shin${side}` as const;
    const footKey = `foot${side}` as const;
    const hip = j[hipKey];
    const knee = rotateAboutPivotX(j[kneeKey], hip, swing);
    let foot = rotateAboutPivotX(j[footKey], hip, swing);
    foot = rotateAboutPivotX(foot, knee, kneeBend);
    j[kneeKey] = knee;
    j[footKey] = foot;
  };
  const swingArm = (side: 'L' | 'R', swing: number) => {
    const shoulderKey = `upperArm${side}` as const;
    const elbowKey = `forearm${side}` as const;
    const handKey = `hand${side}` as const;
    const shoulder = j[shoulderKey];
    j[elbowKey] = rotateAboutPivotX(j[elbowKey], shoulder, swing);
    j[handKey] = rotateAboutPivotX(j[handKey], shoulder, swing);
  };

  swingLeg('L', pose.legSwingL, pose.kneeBendL);
  swingLeg('R', pose.legSwingR, pose.kneeBendR);
  swingArm('L', pose.armSwingL);
  swingArm('R', pose.armSwingR);

  return j;
}

export function buildSkeleton(stature: number) {
  const joints = jointPositions(stature);
  const bones = {} as Record<BoneName, THREE.Bone>;
  const index = {} as Record<BoneName, number>;
  const list = BONE_NAMES.map((name, i) => {
    const bone = new THREE.Bone();
    bone.name = name;
    bones[name] = bone;
    index[name] = i;
    return bone;
  });
  for (const name of BONE_NAMES) {
    const parent = PARENTS[name];
    if (parent) bones[parent].add(bones[name]);
  }
  resetToRest(bones, stature);
  const skeleton = new THREE.Skeleton(list);
  return { skeleton, root: bones.hips, bones, index, joints };
}
