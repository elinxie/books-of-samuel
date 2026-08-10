import { describe, expect, it } from 'vitest';
import { POOL_BANK_POS, POOL_CENTER, POOL_RADIUS, PRESENTATION_POS, TOMB_CENTER } from './layout';
import {
  assassinPose,
  davidReckoningPose,
  DURATION_SEC,
  EXECUTION_WALK_START,
  fallDuration,
  headBundlePose,
  T_ARRIVAL,
  T_BURIAL,
  T_CLOSE,
  T_EXECUTION,
  T_VERDICT,
} from './poses';

/**
 * Beat-invariant timing checks against the beat table in
 * src/data/scenes.ts's hebron-reckoning entry. Per ADR-009 (this scene's own
 * brief: the third application of the named-character-killing template, and
 * its first judicial one), the hardest invariants this file guards:
 *
 * - Rechab and Baanah reach the presentation point by the arrival beat, and
 *   are never fallen before the execution beat.
 * - No gesture precedes the fall at any point in either mode — this file has
 *   no strike-lean/lead-gesture analog to test the absence of, so the
 *   collapse-timing tests below stand in for that guarantee (see poses.ts's
 *   file comment).
 * - Reduced mode's collapse is dramatically faster than standard's, the same
 *   "elide the strike" convention as every prior named killing.
 * - The head bundle is never carried aloft/high (no trophy framing) and is
 *   hidden once fully buried, before the closing beat.
 */

describe('assassinPose', () => {
  it('reaches the presentation point by the arrival beat', () => {
    const pose = assassinPose(T_ARRIVAL, 'standard', 0);
    expect(pose.x).toBeCloseTo(PRESENTATION_POS[0], 1);
    expect(pose.z).toBeCloseTo(PRESENTATION_POS[1], 1);
  });

  it('is still short of the presentation point during the road walk', () => {
    const pose = assassinPose(5, 'standard', 0);
    const dist = Math.hypot(pose.x - PRESENTATION_POS[0], pose.z - PRESENTATION_POS[1]);
    expect(dist).toBeGreaterThan(50);
  });

  it('the petition posture rises after arrival and holds through the verdict', () => {
    expect(assassinPose(T_ARRIVAL - 1, 'standard', 0).presented).toBe(0);
    expect(assassinPose(T_VERDICT, 'standard', 0).presented).toBeCloseTo(1, 2);
  });

  it('is never fallen before the execution beat, in either mode', () => {
    expect(assassinPose(T_EXECUTION - 0.1, 'standard', 0).fallen).toBe(0);
    expect(assassinPose(T_EXECUTION - 0.1, 'reduced', 0).fallen).toBe(0);
  });

  it('is led from the presentation point toward the pool bank between the verdict and the execution', () => {
    const mid = assassinPose((EXECUTION_WALK_START + T_EXECUTION) / 2, 'standard', 0);
    const distFromPresentation = Math.hypot(
      mid.x - PRESENTATION_POS[0],
      mid.z - PRESENTATION_POS[1],
    );
    const distFromPool = Math.hypot(mid.x - POOL_BANK_POS[0], mid.z - POOL_BANK_POS[1]);
    expect(distFromPresentation).toBeGreaterThan(1);
    expect(distFromPool).toBeGreaterThan(1);
  });

  it('reaches the pool bank, outside the basin rim, by the execution beat', () => {
    const pose = assassinPose(T_EXECUTION, 'standard', 0);
    expect(pose.x).toBeCloseTo(POOL_BANK_POS[0], 1);
    const distFromPoolCenter = Math.hypot(pose.x - POOL_CENTER[0], pose.z - POOL_CENTER[1]);
    expect(distFromPoolCenter).toBeGreaterThan(POOL_RADIUS);
  });

  it('standard mode falls gradually after the execution beat', () => {
    const justAfter = assassinPose(T_EXECUTION + 0.3, 'standard', 0);
    expect(justAfter.fallen).toBeGreaterThan(0);
    expect(justAfter.fallen).toBeLessThan(0.9);
  });

  it('reduced mode collapses far faster than standard (no strike is ever shown in either mode)', () => {
    const reducedFallen = assassinPose(T_EXECUTION + 0.3, 'reduced', 0).fallen;
    const standardFallen = assassinPose(T_EXECUTION + 0.3, 'standard', 0).fallen;
    expect(reducedFallen).toBeGreaterThan(standardFallen);
  });

  it('is fully fallen well after the execution in both modes, and stays at the pool bank', () => {
    for (const mode of ['standard', 'reduced'] as const) {
      const pose = assassinPose(T_EXECUTION + 10, mode, 0);
      expect(pose.fallen).toBeCloseTo(1, 2);
      expect(Math.hypot(pose.x - POOL_BANK_POS[0], pose.z - POOL_BANK_POS[1])).toBeLessThan(2);
    }
  });

  it('Rechab and Baanah stay at a lateral remove from each other while held', () => {
    const rechab = assassinPose(T_ARRIVAL + 2, 'standard', -1.2);
    const baanah = assassinPose(T_ARRIVAL + 2, 'standard', 1.2);
    expect(Math.hypot(rechab.x - baanah.x, rechab.z - baanah.z)).toBeGreaterThan(1);
  });
});

describe('davidReckoningPose', () => {
  it('has no address gesture before the verdict beat', () => {
    expect(davidReckoningPose(T_VERDICT - 1).address).toBe(0);
  });

  it('the address gesture rises during the verdict beat', () => {
    expect(davidReckoningPose(T_VERDICT + 2).address).toBeGreaterThan(0.2);
  });

  it('stays at the receiving ground throughout — David does not travel to the pool or the tomb', () => {
    const early = davidReckoningPose(0);
    const late = davidReckoningPose(T_CLOSE);
    expect(early.x).toBeCloseTo(late.x, 5);
    expect(early.z).toBeCloseTo(late.z, 5);
  });
});

describe('headBundlePose (no trophy framing, funerary handling per ADR-009)', () => {
  it('is carried low (never at a raised, trophy-like height signal) during the arrival', () => {
    const pose = headBundlePose(T_ARRIVAL / 2);
    expect(pose.carried).toBe(1);
    expect(pose.visible).toBe(true);
  });

  it('is set down at the presentation point shortly after arrival', () => {
    const pose = headBundlePose(T_ARRIVAL + 4);
    expect(pose.carried).toBeCloseTo(0, 2);
  });

  it('rests through the verdict and execution beats, not carried to the pool', () => {
    const pose = headBundlePose(T_EXECUTION);
    expect(pose.carried).toBe(0);
    expect(pose.visible).toBe(true);
  });

  it('travels to the tomb of Abner during the burial beat', () => {
    const pose = headBundlePose(T_BURIAL + 10);
    expect(pose.carried).toBeGreaterThan(0.5);
  });

  it('is hidden once fully buried, at or before the closing beat', () => {
    expect(headBundlePose(T_CLOSE).visible).toBe(false);
    const buried = headBundlePose(T_CLOSE);
    expect(Math.hypot(buried.x - TOMB_CENTER[0], buried.z - TOMB_CENTER[1])).toBeLessThan(1);
  });
});

describe('fallDuration', () => {
  it('reduced mode is much shorter than standard', () => {
    expect(fallDuration('reduced', 5)).toBeLessThan(fallDuration('standard', 5) * 0.3);
  });
});

describe('scene duration', () => {
  it('holds every named beat time within the scene duration', () => {
    expect(T_CLOSE).toBeLessThan(DURATION_SEC);
  });
});
