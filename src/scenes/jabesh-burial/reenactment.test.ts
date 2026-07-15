import { describe, expect, it } from 'vitest';
import { buildColumnFigures, columnFigurePose } from './RetrievalColumn';
import { buildVillagerFigures, villagerPose } from './Villagers';
import { T_NIGHT_MARCH, T_PYRE, T_RECEIVED, T_TAMARISK } from './poses';

/**
 * Choreography checks for the retrieval column and the townspeople
 * (ADR-007 pure-pose-function pattern, mirroring beth-shan-walls's
 * reenactment.test.ts). Both pose functions sample the scene's own
 * CatmullRom curve / slot pools (layout.ts), so these run in a plain
 * node/vitest environment without a renderer.
 */

describe('columnFigurePose (men of Jabesh)', () => {
  const figures = buildColumnFigures(11);
  const fig = figures[0];

  it('is visible on the wadi path at the very start of the scene', () => {
    const pose = columnFigurePose(T_NIGHT_MARCH, fig);
    expect(pose.visible).toBe(true);
    expect(pose.x).toBeLessThan(-300); // far down the path, near its western start
  });

  it('has arrived and settled at its arrival slot by b-received', () => {
    const pose = columnFigurePose(T_RECEIVED + fig.arrivalStagger + 0.01, fig);
    expect(pose.x).toBeCloseTo(fig.arrivalSlot[0], 0);
    expect(pose.z).toBeCloseTo(fig.arrivalSlot[1], 0);
  });

  it('stays settled at its arrival slot for the rest of the scene', () => {
    const atPyre = columnFigurePose(T_PYRE, fig);
    const atTamarisk = columnFigurePose(T_TAMARISK, fig);
    expect(atPyre.x).toBeCloseTo(fig.arrivalSlot[0], 0);
    expect(atTamarisk.x).toBeCloseTo(fig.arrivalSlot[0], 0);
  });

  it('figure rosters are deterministic for a given seed', () => {
    expect(buildColumnFigures(11, 100).map((f) => f.arrivalSlot)).toEqual(
      buildColumnFigures(11, 100).map((f) => f.arrivalSlot),
    );
  });

  it('a subset carries torches (per-figure, for Torches.tsx to key off)', () => {
    expect(figures.some((f) => f.hasTorch)).toBe(true);
    expect(figures.some((f) => !f.hasTorch)).toBe(true);
  });
});

describe('villagerPose (the people of Jabesh)', () => {
  const figures = buildVillagerFigures(36);
  const fig = figures[0];

  it('is not present before the town comes out at b-received', () => {
    expect(villagerPose(T_NIGHT_MARCH, fig).visible).toBe(false);
  });

  it('is gathered in the village yard shortly after b-received', () => {
    const pose = villagerPose(T_RECEIVED + 6, fig);
    expect(pose.visible).toBe(true);
    expect(pose.x).toBeCloseTo(fig.villageSlot[0], 0);
  });

  it('has moved to the pyre-ground gathering by well after b-pyre', () => {
    const pose = villagerPose(T_PYRE + 10, fig);
    expect(pose.x).toBeCloseTo(fig.pyreSlot[0], 0);
  });

  it('has moved to the tamarisk gathering by well after b-tamarisk', () => {
    const pose = villagerPose(T_TAMARISK + 10, fig);
    expect(pose.x).toBeCloseTo(fig.tamariskSlot[0], 0);
  });

  it('figure rosters are deterministic for a given seed', () => {
    expect(buildVillagerFigures(36, 200).map((f) => f.villageSlot)).toEqual(
      buildVillagerFigures(36, 200).map((f) => f.villageSlot),
    );
  });
});
