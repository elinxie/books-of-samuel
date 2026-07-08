import { describe, expect, it } from 'vitest';
import { NORTH_CURVE, REUNION_POS, SOUTH_CURVE } from './layout';
import { crowdFigurePose, type CrowdFigureState } from './Crossing';
import { davidPose, egyptianPose } from './PrincipalFigures';

/**
 * Timing sanity for the crowd and named-figure pose functions, checked
 * against the beat times in scenes.ts's besor-crossing entry. Targeted, not
 * exhaustive — see docs/next-run.md's user priority note on test depth.
 */

const northLen = NORTH_CURVE.getLength();
const southLen = SOUTH_CURVE.getLength();

const stayFigure: CrowdFigureState = {
  rank: 5,
  group: 'stay',
  lane: 0.9,
  slot: [-30, -32],
  clusterJitter: [0, 0],
  reunionJitter: [2, -1],
  bobPhase: 0,
};

const crossFigure: CrowdFigureState = {
  rank: 3,
  group: 'cross',
  lane: -0.9,
  slot: [0, 0],
  clusterJitter: [4, 3],
  reunionJitter: [-2, 1],
  bobPhase: 0,
};

describe('crowdFigurePose timeline', () => {
  it('the two hundred settle and rest on the north bank well before the return', () => {
    const pose = crowdFigurePose(60, stayFigure, northLen, southLen);
    expect(pose.moving).toBe(false);
    expect(pose.kneel).toBeGreaterThan(0.5);
    const [sx, sz] = stayFigure.slot;
    expect(Math.hypot(pose.x - sx, pose.z - sz)).toBeLessThan(0.5);
  });

  it('the four hundred are waiting near the south field during the Egyptian beats', () => {
    const pose = crowdFigurePose(70, crossFigure, northLen, southLen);
    expect(pose.visible).toBe(true);
    expect(pose.moving).toBe(false);
    expect(pose.z).toBeGreaterThan(20); // south of the ford
  });

  it('the four hundred are visibly departing south after the depart-south beat', () => {
    const pose = crowdFigurePose(115, crossFigure, northLen, southLen);
    expect(pose.visible).toBe(true);
    expect(pose.moving).toBe(true);
  });

  it('both groups reunite near the ford after the spoil-ruling beat settles', () => {
    const stay = crowdFigurePose(145, stayFigure, northLen, southLen);
    const cross = crowdFigurePose(145, crossFigure, northLen, southLen);
    expect(Math.hypot(stay.x - REUNION_POS[0], stay.z - REUNION_POS[1])).toBeLessThan(15);
    expect(Math.hypot(cross.x - REUNION_POS[0], cross.z - REUNION_POS[1])).toBeLessThan(15);
  });
});

describe('named-figure pose timeline', () => {
  it('David has crossed the ford and is near the Egyptian by the discovery beat', () => {
    const pose = davidPose(58);
    expect(pose.visible).toBe(true);
  });

  it('the Egyptian is invisible before he is found', () => {
    expect(egyptianPose(30).visible).toBe(false);
  });

  it('the Egyptian is reclined when first found, and standing again by the depart-south beat', () => {
    const found = egyptianPose(59);
    expect(found.visible).toBe(true);
    expect(found.recline).toBeGreaterThan(0.8);
    const departing = egyptianPose(109);
    expect(departing.recline).toBeLessThan(0.2);
  });

  it('David is present at the reunion after the return beat', () => {
    const pose = davidPose(136);
    expect(pose.visible).toBe(true);
    expect(Math.hypot(pose.x - REUNION_POS[0], pose.z - REUNION_POS[1])).toBeLessThan(20);
  });
});
