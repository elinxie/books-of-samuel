import { describe, expect, it } from 'vitest';
import * as THREE from 'three';
import { makeClips } from './animation';
import { applyClipPose } from './bake';
import { buildCharacterRig } from './bodyGeometry';
import { randomCharacterParams } from './anthropometry';
import { mulberry32 } from '../noise';
import { BONE_NAMES } from './types';

const STATURE = 1.66;

describe('makeClips durations', () => {
  const clips = makeClips(STATURE);

  it('walk is a 1 s loop', () => {
    expect(clips.walk.duration).toBe(1);
  });
  it('idle is a 4 s loop', () => {
    expect(clips.idle.duration).toBe(4);
  });
  it('kneel is a 2 s one-shot', () => {
    expect(clips.kneel.duration).toBe(2);
  });
  it('mourn is a 4 s loop', () => {
    expect(clips.mourn.duration).toBe(4);
  });
});

describe('makeClips track name contract', () => {
  const clips = makeClips(STATURE);
  const boneNameSet = new Set<string>(BONE_NAMES);

  for (const clipName of ['walk', 'idle', 'kneel', 'mourn'] as const) {
    it(`every track in '${clipName}' targets a valid bone and property`, () => {
      const clip = clips[clipName];
      expect(clip.tracks.length).toBeGreaterThan(0);
      for (const track of clip.tracks) {
        const dot = track.name.lastIndexOf('.');
        expect(dot).toBeGreaterThan(0);
        const boneName = track.name.slice(0, dot);
        const prop = track.name.slice(dot + 1);
        expect(boneNameSet.has(boneName)).toBe(true);
        expect(['quaternion', 'position']).toContain(prop);
      }
    });
  }
});

describe('kneel clip clamping', () => {
  it('applyClipPose at t > duration equals t = duration', () => {
    const params = randomCharacterParams(mulberry32(5), { detail: 'crowd' });
    const rig = buildCharacterRig(params);
    const clips = makeClips(rig.params.stature);

    applyClipPose(rig, clips.kneel, clips.kneel.duration);
    rig.root.updateMatrixWorld(true);
    const atDuration = rig.bones.head.getWorldPosition(new THREE.Vector3());

    applyClipPose(rig, clips.kneel, clips.kneel.duration + 50);
    rig.root.updateMatrixWorld(true);
    const beyond = rig.bones.head.getWorldPosition(new THREE.Vector3());

    expect(beyond.x).toBeCloseTo(atDuration.x, 6);
    expect(beyond.y).toBeCloseTo(atDuration.y, 6);
    expect(beyond.z).toBeCloseTo(atDuration.z, 6);
  });

  it('applyClipPose at negative t clamps to t = 0', () => {
    const params = randomCharacterParams(mulberry32(5), { detail: 'crowd' });
    const rig = buildCharacterRig(params);
    const clips = makeClips(rig.params.stature);

    applyClipPose(rig, clips.kneel, 0);
    rig.root.updateMatrixWorld(true);
    const atZero = rig.bones.head.getWorldPosition(new THREE.Vector3());

    applyClipPose(rig, clips.kneel, -10);
    rig.root.updateMatrixWorld(true);
    const belowZero = rig.bones.head.getWorldPosition(new THREE.Vector3());

    expect(belowZero.x).toBeCloseTo(atZero.x, 6);
    expect(belowZero.y).toBeCloseTo(atZero.y, 6);
    expect(belowZero.z).toBeCloseTo(atZero.z, 6);
  });
});

describe('walk clip left/right mirror symmetry', () => {
  it('thigh rotation angles mirror between L and R at half-cycle offset', () => {
    const params = randomCharacterParams(mulberry32(5), { detail: 'crowd' });
    const rig = buildCharacterRig(params);
    const clips = makeClips(rig.params.stature);

    function thighAngles(t: number): { l: number; r: number } {
      applyClipPose(rig, clips.walk, t);
      const l = new THREE.Euler().setFromQuaternion(rig.bones.thighL.quaternion, 'XYZ').x;
      const r = new THREE.Euler().setFromQuaternion(rig.bones.thighR.quaternion, 'XYZ').x;
      return { l, r };
    }

    const at0 = thighAngles(0);
    const at05 = thighAngles(0.5);

    // At t=0 the left leg leads; at t=0.5 the phases swap, so left-at-0 should
    // approximately equal right-at-0.5, and vice versa.
    expect(at0.l).toBeCloseTo(at05.r, 3);
    expect(at0.r).toBeCloseTo(at05.l, 3);
  });
});
