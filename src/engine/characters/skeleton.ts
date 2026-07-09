import * as THREE from 'three';
import { A_POSE_ARM, A_POSE_FOREARM, P } from './anthropometry';
import type { BoneName } from './types';
import { BONE_NAMES } from './types';

/**
 * Joint positions in character space (Y up, facing +Z, origin on the ground
 * between the feet) for a given stature. Exported for geometry construction
 * and tests.
 */
export function jointPositions(stature: number): Record<BoneName, THREE.Vector3> {
  const H = stature;
  const armDir = new THREE.Vector3(Math.sin(A_POSE_ARM), -Math.cos(A_POSE_ARM), 0);
  const foreDir = new THREE.Vector3(
    Math.sin(A_POSE_FOREARM),
    -Math.cos(A_POSE_FOREARM),
    0.06,
  ).normalize();

  const shoulderL = new THREE.Vector3(P.shoulderX * H, P.shoulderY * H, 0);
  const elbowL = shoulderL.clone().addScaledVector(armDir, P.upperArmLen * H);
  const wristL = elbowL.clone().addScaledVector(foreDir, P.forearmLen * H);

  const mirror = (v: THREE.Vector3) => new THREE.Vector3(-v.x, v.y, v.z);

  return {
    hips: new THREE.Vector3(0, P.hipsY * H, 0),
    spine: new THREE.Vector3(0, P.spineY * H, 0),
    chest: new THREE.Vector3(0, P.chestY * H, 0),
    neck: new THREE.Vector3(0, P.neckY * H, 0.005 * H),
    head: new THREE.Vector3(0, P.headY * H, 0.008 * H),
    upperArmL: shoulderL,
    forearmL: elbowL,
    handL: wristL,
    upperArmR: mirror(shoulderL),
    forearmR: mirror(elbowL),
    handR: mirror(wristL),
    thighL: new THREE.Vector3(P.hipJointX * H, P.hipJointY * H, 0),
    shinL: new THREE.Vector3(P.hipJointX * H * 1.05, P.kneeY * H, 0.004 * H),
    footL: new THREE.Vector3(P.hipJointX * H * 1.1, P.ankleY * H, -0.01 * H),
    thighR: new THREE.Vector3(-P.hipJointX * H, P.hipJointY * H, 0),
    shinR: new THREE.Vector3(-P.hipJointX * H * 1.05, P.kneeY * H, 0.004 * H),
    footR: new THREE.Vector3(-P.hipJointX * H * 1.1, P.ankleY * H, -0.01 * H),
  };
}

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

/** Restores rest pose (A-pose offsets, identity rotations) on all bones. */
export function resetToRest(bones: Record<BoneName, THREE.Bone>, stature: number): void {
  const joints = jointPositions(stature);
  for (const name of BONE_NAMES) {
    const bone = bones[name];
    const parent = PARENTS[name];
    bone.position.copy(joints[name]);
    if (parent) bone.position.sub(joints[parent]);
    bone.quaternion.identity();
    bone.scale.set(1, 1, 1);
  }
}

export interface BuiltSkeleton {
  skeleton: THREE.Skeleton;
  root: THREE.Bone;
  bones: Record<BoneName, THREE.Bone>;
  /** Bone index in skeleton.bones, keyed by name — used for skin indices. */
  index: Record<BoneName, number>;
  joints: Record<BoneName, THREE.Vector3>;
}

/**
 * Builds the 17-bone skeleton in rest (A-)pose. Bone order follows
 * BONE_NAMES, so skin indices are stable.
 */
export function buildSkeleton(stature: number): BuiltSkeleton {
  const joints = jointPositions(stature);
  const bones = {} as Record<BoneName, THREE.Bone>;
  const index = {} as Record<BoneName, number>;
  const list: THREE.Bone[] = [];

  BONE_NAMES.forEach((name, i) => {
    const bone = new THREE.Bone();
    bone.name = name;
    bones[name] = bone;
    index[name] = i;
    list.push(bone);
  });

  for (const name of BONE_NAMES) {
    const parent = PARENTS[name];
    const bone = bones[name];
    if (parent) {
      bones[parent].add(bone);
      bone.position.copy(joints[name]).sub(joints[parent]);
    } else {
      bone.position.copy(joints[name]);
    }
  }

  const root = bones.hips;
  root.updateMatrixWorld(true);
  const skeleton = new THREE.Skeleton(list); // computes bone inverses from rest pose

  return { skeleton, root, bones, index, joints };
}
