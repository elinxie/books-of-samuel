import { describe, expect, it } from 'vitest';
import { APPROACH_CURVE } from './layout';
import {
  davidPrincipalPose,
  davidsForcePose,
  DAVID_INTERIOR_ANCHOR,
  DURATION_SEC,
  T_APPROACH,
  T_DWELLING,
  T_HIRAM,
  T_TAKING,
  T_TAUNT,
} from './poses';

/**
 * Beat-invariant timing checks against the beat table in
 * src/data/scenes.ts's jerusalem-stronghold entry. The hardest invariant
 * this file guards: no figure ever reverses toward the enclosure before
 * `T_TAKING` (the narrative's own gap) — the approach must read as a real,
 * unhurried journey, never an anticipated assault.
 */

const CURVE_END = APPROACH_CURVE.getPointAt(1);

describe('davidsForcePose', () => {
  const fig = { laneOffset: 0, arriveStagger: 0, destSlot: [4, 60] as [number, number] };

  it('is still walking the approach road during the approach/taunt beats', () => {
    expect(davidsForcePose(T_APPROACH, fig).settled).toBe(0);
    expect(davidsForcePose(T_TAUNT, fig).settled).toBe(0);
  });

  it('is at (or very near) the gate exactly at T_TAKING — the narrative’s own gap', () => {
    const pose = davidsForcePose(T_TAKING, fig);
    const dist = Math.hypot(pose.x - CURVE_END.x, pose.z - CURVE_END.z);
    expect(dist).toBeLessThan(1);
  });

  it('has fully redistributed to its interior slot by the dwelling beat', () => {
    const pose = davidsForcePose(T_DWELLING, fig);
    expect(pose.x).toBeCloseTo(fig.destSlot[0], 4);
    expect(pose.z).toBeCloseTo(fig.destSlot[1], 4);
    expect(pose.settled).toBeCloseTo(1, 4);
  });

  it('never reaches the interior slot before T_TAKING (no anticipated capture)', () => {
    const midTaunt = davidsForcePose((T_APPROACH + T_TAUNT) / 2, fig);
    const dist = Math.hypot(midTaunt.x - fig.destSlot[0], midTaunt.z - fig.destSlot[1]);
    expect(dist).toBeGreaterThan(5);
  });

  it('is still present (on the scene’s own ground) at the end of the scene duration', () => {
    const atEnd = davidsForcePose(DURATION_SEC, fig);
    expect(atEnd.x).toBeCloseTo(fig.destSlot[0], 3);
    expect(atEnd.z).toBeCloseTo(fig.destSlot[1], 3);
  });
});

describe('davidPrincipalPose', () => {
  it('settles at the interior anchor by the dwelling beat', () => {
    const pose = davidPrincipalPose(T_DWELLING);
    expect(pose.x).toBeCloseTo(DAVID_INTERIOR_ANCHOR[0], 3);
    expect(pose.z).toBeCloseTo(DAVID_INTERIOR_ANCHOR[1], 3);
    expect(pose.settled).toBeCloseTo(1, 4);
  });

  it('faces south (unturned) before the Hiram beat', () => {
    const pose = davidPrincipalPose(T_DWELLING);
    expect(pose.yaw).toBeCloseTo(0, 2);
  });

  it('turns to face the construction ground from the Hiram beat onward', () => {
    const before = davidPrincipalPose(T_HIRAM - 1).yaw;
    const after = davidPrincipalPose(T_HIRAM + 10).yaw;
    expect(after).not.toBeCloseTo(before, 1);
  });
});
