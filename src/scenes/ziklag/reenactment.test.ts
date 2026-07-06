import { describe, expect, it } from 'vitest';
import { APPROACH_CURVE, EXIT_CURVE, PLAZA_SLOTS } from './layout';
import { figurePose } from './ReturningMen';

/**
 * Timing sanity for the scripted reenactment: the column must be marching in
 * the north during the opening beats, gathered and grieving by the grief beat,
 * and departing south after the departure beat (see scenes.ts beat times).
 */

const curveLen = APPROACH_CURVE.getLength();
const exitLen = EXIT_CURVE.getLength();

const headFigure = {
  rank: 1,
  lane: 0.9,
  laneOffset: 0,
  slot: PLAZA_SLOTS[0],
  kneeler: true,
  bobPhase: 0,
};

const tailFigure = {
  rank: 30,
  lane: -0.9,
  laneOffset: 0,
  slot: PLAZA_SLOTS[5],
  kneeler: false,
  bobPhase: 0,
};

describe('figurePose timeline', () => {
  it('marches in from the north early in the scene', () => {
    const pose = figurePose(2, headFigure, curveLen, exitLen);
    expect(pose.visible).toBe(true);
    expect(pose.moving).toBe(true);
    expect(pose.z).toBeLessThan(-40); // still north of the settlement
  });

  it('is gathered on the plaza and kneeling during the grief beat window', () => {
    const pose = figurePose(75, headFigure, curveLen, exitLen);
    expect(pose.moving).toBe(false);
    const [sx, sz] = headFigure.slot;
    expect(Math.hypot(pose.x - sx, pose.z - sz)).toBeLessThan(0.5);
    expect(pose.kneel).toBeGreaterThan(0.5);
  });

  it('stragglers keep arriving during the mutiny beat', () => {
    const pose = figurePose(70, tailFigure, curveLen, exitLen);
    expect(pose.visible).toBe(true);
    // rank 30 arrives around t = (100 + 60) / 2.2 ≈ 73s
    expect(pose.moving).toBe(true);
  });

  it('stands back up before departure', () => {
    const pose = figurePose(135.5, headFigure, curveLen, exitLen);
    expect(pose.kneel).toBeLessThan(0.2);
  });

  it('departs south along the exit route after the departure beat', () => {
    const pose = figurePose(148, headFigure, curveLen, exitLen);
    expect(pose.moving).toBe(true);
    expect(pose.z).toBeGreaterThan(10); // south of the plaza
  });
});
