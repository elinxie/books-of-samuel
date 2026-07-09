import { describe, expect, it } from 'vitest';
import { buildCrowdLimbedGeometry } from './bodyGeometry';
import { jointPositions, poseJointPositions, REST_LIMB_POSE } from './skeleton';
import type { CharacterParams } from './types';

/**
 * `buildCrowdLimbedGeometry` is the crowd-tier limbed silhouette used to
 * bake walk-cycle / fight-stance pose-bucket geometry (see
 * `animation.ts`'s `sampleWalkPoses`/`sampleFightPoses`) — opt-in, doesn't
 * touch the existing single-capsule `buildCrowdGeometry` other scenes use.
 */

const PARAMS: CharacterParams = {
  stature: 1.7,
  build: 0.5,
  shoulders: 1,
  skinColor: '#8f5b3d',
  hairColor: '#1f1712',
  beard: false,
  detail: 'crowd',
  dress: { tunicColor: '#7a3b2e', beltColor: '#3b2416', headwear: 'bare' },
};

describe('buildCrowdLimbedGeometry', () => {
  it('produces a valid merged geometry with position/normal/color attributes', () => {
    const geo = buildCrowdLimbedGeometry(PARAMS);
    expect(geo.attributes.position.count).toBeGreaterThan(0);
    expect(geo.attributes.normal).toBeDefined();
    expect(geo.attributes.color).toBeDefined();
  });

  it('defaults to the rest-pose joints when none are given', () => {
    const rest = buildCrowdLimbedGeometry(PARAMS);
    const explicitRest = buildCrowdLimbedGeometry(PARAMS, jointPositions(PARAMS.stature));
    expect(rest.attributes.position.count).toBe(explicitRest.attributes.position.count);
    expect(Array.from(rest.attributes.position.array)).toEqual(
      Array.from(explicitRest.attributes.position.array),
    );
  });

  it('a swung-leg pose produces different vertex positions than the rest pose', () => {
    const rest = buildCrowdLimbedGeometry(PARAMS);
    const posed = buildCrowdLimbedGeometry(
      PARAMS,
      poseJointPositions(PARAMS.stature, { ...REST_LIMB_POSE, legSwingL: 0.35, kneeBendL: 0.4 }),
    );
    expect(Array.from(posed.attributes.position.array)).not.toEqual(
      Array.from(rest.attributes.position.array),
    );
  });

  it('has the same vertex count regardless of pose (same part topology)', () => {
    const rest = buildCrowdLimbedGeometry(PARAMS);
    const posed = buildCrowdLimbedGeometry(
      PARAMS,
      poseJointPositions(PARAMS.stature, { ...REST_LIMB_POSE, legSwingR: -0.3 }),
    );
    expect(posed.attributes.position.count).toBe(rest.attributes.position.count);
  });
});
