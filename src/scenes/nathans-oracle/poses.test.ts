import { describe, expect, it } from 'vitest';
import {
  DAVID_HOUSE_POS,
  DAVID_TENT_SIT_POS,
  NATHAN_HOUSE_POS,
  NIGHT_CORNER_POS,
} from './layout';
import {
  DURATION_SEC,
  T_ASSENT,
  T_CLOSE,
  T_NIGHT,
  T_OPEN,
  T_PRAYER,
  T_REPORT,
  T_SIT,
  T_WALK,
  T_WISH,
  davidPose,
  nathanPose,
  nightAmount,
  plateauEnvelope,
} from './poses';

/**
 * Beat-invariant timing checks against the beat table in
 * src/data/scenes.ts's nathans-oracle entry. The hardest invariant this file
 * guards, load-bearing for ADR-013/the brief's hard "Not allowed" list:
 * Nathan is never posed anywhere but an ordinary standing or settled-rest
 * position — `resting` never exceeds 1, is exactly 0 well outside the night
 * window, and the pose function itself has no field, branch, or parameter
 * that could stage a receptive/listening/upward posture.
 */

describe('beat ordering', () => {
  it('every beat time is within the scene duration, in order', () => {
    const times = [T_OPEN, T_WISH, T_ASSENT, T_NIGHT, T_REPORT, T_WALK, T_SIT, T_PRAYER, T_CLOSE];
    expect([...times].sort((a, b) => a - b)).toEqual(times);
    expect(Math.max(...times)).toBeLessThanOrEqual(DURATION_SEC);
  });
});

describe('nightAmount / plateauEnvelope', () => {
  it('is zero well before and well after the night window', () => {
    expect(nightAmount(T_OPEN)).toBe(0);
    expect(nightAmount(T_ASSENT)).toBe(0);
    expect(nightAmount(DURATION_SEC)).toBe(0);
  });

  it('reaches full darkness during the held night-word beat', () => {
    expect(nightAmount((T_NIGHT + T_REPORT) / 2)).toBeCloseTo(1, 4);
  });

  it('never exceeds the 0..1 range', () => {
    for (let t = 0; t <= DURATION_SEC; t += 1) {
      const v = nightAmount(t);
      expect(v).toBeGreaterThanOrEqual(0);
      expect(v).toBeLessThanOrEqual(1);
    }
  });

  it('plateauEnvelope holds a flat 1 across its plateau', () => {
    expect(plateauEnvelope(50, 40, 60, 2)).toBeCloseTo(1, 4);
  });
});

describe('nathanPose', () => {
  it('stands at the house, facing David, before the night beat', () => {
    const pose = nathanPose(T_WISH);
    expect(pose.x).toBeCloseTo(NATHAN_HOUSE_POS[0], 4);
    expect(pose.z).toBeCloseTo(NATHAN_HOUSE_POS[1], 4);
    expect(pose.resting).toBe(0);
  });

  it('is fully settled at the night corner during the held night-word beat', () => {
    const pose = nathanPose((T_NIGHT + T_REPORT) / 2);
    expect(pose.x).toBeCloseTo(NIGHT_CORNER_POS[0], 3);
    expect(pose.z).toBeCloseTo(NIGHT_CORNER_POS[1], 3);
    expect(pose.resting).toBeCloseTo(1, 4);
  });

  it('returns to the house well after the report beat and stays there', () => {
    for (const t of [T_REPORT + 5, T_WALK, T_SIT, T_PRAYER, T_CLOSE]) {
      const pose = nathanPose(t);
      expect(pose.x).toBeCloseTo(NATHAN_HOUSE_POS[0], 3);
      expect(pose.z).toBeCloseTo(NATHAN_HOUSE_POS[1], 3);
      expect(pose.resting).toBe(0);
    }
  });

  it('resting never leaves the 0..1 range across the whole scene', () => {
    for (let t = 0; t <= DURATION_SEC; t += 1) {
      const r = nathanPose(t).resting;
      expect(r).toBeGreaterThanOrEqual(0);
      expect(r).toBeLessThanOrEqual(1);
    }
  });
});

describe('davidPose', () => {
  it('stands at the house through the wish/assent/report beats', () => {
    for (const t of [T_OPEN, T_WISH, T_ASSENT, T_NIGHT, T_REPORT]) {
      const pose = davidPose(t);
      expect(pose.x).toBeCloseTo(DAVID_HOUSE_POS[0], 3);
      expect(pose.z).toBeCloseTo(DAVID_HOUSE_POS[1], 3);
      expect(pose.seated).toBe(0);
    }
  });

  it('is walking (not yet seated) partway through the walk-to-tent beat', () => {
    const pose = davidPose((T_WALK + T_SIT) / 2);
    expect(pose.seated).toBe(0);
    const distFromHouse = Math.hypot(
      pose.x - DAVID_HOUSE_POS[0],
      pose.z - DAVID_HOUSE_POS[1],
    );
    const distFromTent = Math.hypot(
      pose.x - DAVID_TENT_SIT_POS[0],
      pose.z - DAVID_TENT_SIT_POS[1],
    );
    expect(distFromHouse).toBeGreaterThan(1);
    expect(distFromTent).toBeGreaterThan(1);
  });

  it('is seated at the tent by the prayer beat and stays seated through the close', () => {
    for (const t of [T_PRAYER, T_CLOSE, DURATION_SEC]) {
      const pose = davidPose(t);
      expect(pose.x).toBeCloseTo(DAVID_TENT_SIT_POS[0], 3);
      expect(pose.z).toBeCloseTo(DAVID_TENT_SIT_POS[1], 3);
      expect(pose.seated).toBeCloseTo(1, 4);
    }
  });

  it('makes steady overall progress toward the tent across the walk (no large reversal)', () => {
    let lastDist = Infinity;
    for (let t = T_WALK; t <= T_SIT; t += 2) {
      const pose = davidPose(t);
      const dist = Math.hypot(
        pose.x - DAVID_TENT_SIT_POS[0],
        pose.z - DAVID_TENT_SIT_POS[1],
      );
      // A small tolerance absorbs the Catmull-Rom curve's own gentle
      // curvature near control points — this guards against a real
      // backtrack, not sub-meter local wiggle.
      expect(dist).toBeLessThanOrEqual(lastDist + 1.5);
      lastDist = dist;
    }
  });
});
