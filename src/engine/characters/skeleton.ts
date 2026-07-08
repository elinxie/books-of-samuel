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
