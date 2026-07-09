import { describe, expect, it } from 'vitest';
import { sampleFightPoses, sampleWalkPoses } from './animation';

describe('sampleWalkPoses', () => {
  it('returns the requested bucket count', () => {
    expect(sampleWalkPoses(8).length).toBe(8);
  });

  it('legs swing in opposite phase (one forward while the other trails)', () => {
    for (const p of sampleWalkPoses(8)) {
      expect(p.legSwingL).toBeCloseTo(-p.legSwingR, 5);
    }
  });

  it('the swing amplitude stays within the walk clip convention (~0.35 rad)', () => {
    const poses = sampleWalkPoses(12);
    for (const p of poses) {
      expect(Math.abs(p.legSwingL)).toBeLessThanOrEqual(0.35 + 1e-9);
      expect(Math.abs(p.legSwingR)).toBeLessThanOrEqual(0.35 + 1e-9);
    }
  });

  it('knee bend is never negative (a knee only bends one way)', () => {
    for (const p of sampleWalkPoses(10)) {
      expect(p.kneeBendL).toBeGreaterThanOrEqual(0);
      expect(p.kneeBendR).toBeGreaterThanOrEqual(0);
    }
  });
});

describe('sampleFightPoses', () => {
  it('returns the requested bucket count', () => {
    expect(sampleFightPoses(6).length).toBe(6);
  });

  it('stays a braced stance, not a walking stride (no arm swing)', () => {
    for (const p of sampleFightPoses(6)) {
      expect(p.armSwingL).toBe(0);
      expect(p.armSwingR).toBe(0);
    }
  });

  it('knee bend varies across buckets (a weight-shift, not a static pose)', () => {
    const poses = sampleFightPoses(8);
    const kneeBends = poses.map((p) => p.kneeBendL);
    expect(Math.max(...kneeBends)).toBeGreaterThan(Math.min(...kneeBends));
  });
});
