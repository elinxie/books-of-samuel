import { describe, expect, it } from 'vitest';
import { bandCountFor, buildContingentFigures } from './WiderContingents';
import {
  contingentFigurePose,
  DURATION_SEC,
  T_ARRIVAL,
  T_ASAHEL_PURSUIT,
  T_STANDOFF,
} from './poses';

describe('bandCountFor', () => {
  it('clamps to the brief’s 12-18 figure target when the contingent is large enough', () => {
    expect(bandCountFor(100, 0.4)).toBe(18);
    expect(bandCountFor(30, 0.4)).toBe(12);
  });

  it('never exceeds the contingent’s own total (drawn-from, not additive)', () => {
    expect(bandCountFor(8, 0.4)).toBeLessThanOrEqual(8);
  });
});

describe('buildContingentFigures', () => {
  it('produces exactly `count` figures with a valid role each', () => {
    const figures = buildContingentFigures('abner', 40, 16, 0.4, 1);
    expect(figures.length).toBe(40);
    for (const f of figures) {
      expect(['falls', 'band', 'hold']).toContain(f.role);
    }
  });

  it('assigns exactly bandCount figures to the band role, each with a slot', () => {
    const figures = buildContingentFigures('joab', 35, 15, 0.08, 2);
    const band = figures.filter((f) => f.role === 'band');
    expect(band.length).toBe(15);
    for (const f of band) expect(f.bandSlot).not.toBeNull();
  });

  it('is deterministic for a given seed', () => {
    const a = buildContingentFigures('abner', 20, 12, 0.4, 42);
    const b = buildContingentFigures('abner', 20, 12, 0.4, 42);
    expect(a.map((f) => f.bankPos)).toEqual(b.map((f) => f.bankPos));
    expect(a.map((f) => f.role)).toEqual(b.map((f) => f.role));
  });
});

describe('contingentFigurePose', () => {
  const [figure] = buildContingentFigures('abner', 5, 2, 0.5, 7);
  const bandFigure = buildContingentFigures('abner', 5, 2, 0.5, 7)[0];

  it('is invisible (spawnScale 0) before b-arrival', () => {
    expect(contingentFigurePose(0, figure, 'standard').spawnScale).toBeCloseTo(0, 5);
  });

  it('is fully visible well after b-arrival', () => {
    expect(contingentFigurePose(T_ARRIVAL + 5, figure, 'standard').spawnScale).toBeCloseTo(1, 3);
  });

  it('holds at the bank position until the battle spreads', () => {
    const pose = contingentFigurePose(T_ARRIVAL + 1, figure, 'standard');
    expect(pose.x).toBeCloseTo(figure.bankPos[0], 5);
    expect(pose.z).toBeCloseTo(figure.bankPos[1], 5);
  });

  it('a "band" figure moves on toward its hill slot only after T_ASAHEL_PURSUIT', () => {
    if (bandFigure.role !== 'band' || !bandFigure.bandSlot) return;
    const early = contingentFigurePose(T_ASAHEL_PURSUIT - 1, bandFigure, 'standard');
    const late = contingentFigurePose(T_STANDOFF, bandFigure, 'standard');
    expect(late.x).toBeCloseTo(bandFigure.bandSlot[0], 0);
    expect(
      Math.hypot(early.x - bandFigure.spreadPos[0], early.z - bandFigure.spreadPos[1]),
    ).toBeLessThan(1);
  });

  it('a "falls" figure settles fallen by the end of the scene', () => {
    const fallsFigure = { ...figure, role: 'falls' as const, bandSlot: null };
    expect(contingentFigurePose(DURATION_SEC, fallsFigure, 'standard').fallen).toBeCloseTo(1, 2);
  });
});
