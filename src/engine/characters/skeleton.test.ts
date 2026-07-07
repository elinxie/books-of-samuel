import { describe, expect, it } from 'vitest';
import * as THREE from 'three';
import { BONE_NAMES } from './types';
import { buildSkeleton, jointPositions, resetToRest } from './skeleton';
import { makeClips } from './animation';
import { applyClipPose } from './bake';
import { buildCharacterRig } from './bodyGeometry';
import { randomCharacterParams } from './anthropometry';
import { mulberry32 } from '../noise';

describe('skeleton rest pose', () => {
  const stature = 1.66;

  it('places every bone world position at jointPositions() in rest pose', () => {
    const { root, bones, joints } = buildSkeleton(stature);
    root.updateMatrixWorld(true);
    for (const name of BONE_NAMES) {
      const world = bones[name].getWorldPosition(new THREE.Vector3());
      const expected = joints[name];
      expect(world.x).toBeCloseTo(expected.x, 5);
      expect(world.y).toBeCloseTo(expected.y, 5);
      expect(world.z).toBeCloseTo(expected.z, 5);
    }
  });

  it('matches jointPositions(stature) directly', () => {
    const { root, bones } = buildSkeleton(stature);
    root.updateMatrixWorld(true);
    const joints = jointPositions(stature);
    for (const name of BONE_NAMES) {
      const world = bones[name].getWorldPosition(new THREE.Vector3());
      expect(world.x).toBeCloseTo(joints[name].x, 5);
      expect(world.y).toBeCloseTo(joints[name].y, 5);
      expect(world.z).toBeCloseTo(joints[name].z, 5);
    }
  });

  it('keeps the documented parent-child hierarchy intact', () => {
    const { bones } = buildSkeleton(stature);
    const expectedParent: Record<string, string | null> = {
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
    for (const name of BONE_NAMES) {
      const bone = bones[name];
      const parentName = expectedParent[name];
      if (parentName === null) {
        // Root has no bone parent (may be attached to an Object3D scene graph
        // elsewhere, but not to another named bone).
        expect(bone.parent === null || !(bone.parent instanceof THREE.Bone)).toBe(true);
      } else {
        expect(bone.parent).toBe(bones[parentName]);
      }
    }
  });

  it('orders skeleton.bones exactly as BONE_NAMES', () => {
    const { skeleton, bones, index } = buildSkeleton(stature);
    expect(skeleton.bones).toHaveLength(BONE_NAMES.length);
    BONE_NAMES.forEach((name, i) => {
      expect(skeleton.bones[i]).toBe(bones[name]);
      expect(index[name]).toBe(i);
    });
  });

  it('resetToRest after applyClipPose restores rest world positions', () => {
    const params = randomCharacterParams(mulberry32(42), { detail: 'crowd' });
    const rig = buildCharacterRig(params);
    const joints = jointPositions(rig.params.stature);

    const clips = makeClips(rig.params.stature);
    applyClipPose(rig, clips.walk, 0.37);

    // Confirm the pose actually moved something before resetting.
    rig.root.updateMatrixWorld(true);
    const movedHead = rig.bones.head.getWorldPosition(new THREE.Vector3());
    const restHead = joints.head;
    const movedAway =
      Math.abs(movedHead.x - restHead.x) > 1e-4 ||
      Math.abs(movedHead.y - restHead.y) > 1e-4 ||
      Math.abs(movedHead.z - restHead.z) > 1e-4;
    expect(movedAway).toBe(true);

    resetToRest(rig.bones, rig.params.stature);
    rig.root.updateMatrixWorld(true);
    for (const name of BONE_NAMES) {
      const world = rig.bones[name].getWorldPosition(new THREE.Vector3());
      expect(world.x).toBeCloseTo(joints[name].x, 5);
      expect(world.y).toBeCloseTo(joints[name].y, 5);
      expect(world.z).toBeCloseTo(joints[name].z, 5);
    }
  });
});
