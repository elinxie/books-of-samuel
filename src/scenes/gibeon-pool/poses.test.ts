import { describe, expect, it } from 'vitest';
import { ABNER_BANK_CENTER, ASAHEL_DEATH_POS, HILL_CREST_ABNER_POS } from './layout';
import {
  abishaiPose,
  abnerPose,
  asahelPose,
  championPose,
  DURATION_SEC,
  joabPose,
  keyframeValue,
  T_ASAHEL_DEATH,
  T_ASAHEL_PURSUIT,
  T_BATTLE_SPREADS,
  T_CHAMPIONS,
  T_CONTEXT,
  T_JOAB_HALTS,
  T_PURSUIT_CONTINUES,
  T_STANDOFF,
} from './poses';

describe('keyframeValue', () => {
  it('holds the first value before the first keyframe and the last after the last', () => {
    const keys = [
      { t: 10, u: 0.2 },
      { t: 20, u: 0.8 },
    ];
    expect(keyframeValue(0, keys)).toBe(0.2);
    expect(keyframeValue(100, keys)).toBe(0.8);
  });

  it('smoothsteps between two keyframes and reaches the midpoint at the segment midpoint', () => {
    const keys = [
      { t: 0, u: 0 },
      { t: 10, u: 1 },
    ];
    expect(keyframeValue(5, keys)).toBeCloseTo(0.5, 6);
    expect(keyframeValue(1, keys)).toBeGreaterThan(0);
    expect(keyframeValue(1, keys)).toBeLessThan(0.5);
  });
});

describe('abnerPose', () => {
  it('starts at the bank, near ABNER_BANK_CENTER, before the battle spreads', () => {
    const pose = abnerPose(T_CONTEXT);
    expect(pose.x).toBeCloseTo(ABNER_BANK_CENTER[0], 0);
    expect(Math.abs(pose.z - ABNER_BANK_CENTER[1])).toBeLessThan(4.5);
  });

  it('reaches exactly the death point at T_ASAHEL_DEATH', () => {
    const pose = abnerPose(T_ASAHEL_DEATH);
    expect(pose.x).toBeCloseTo(ASAHEL_DEATH_POS[0], 4);
    expect(pose.z).toBeCloseTo(ASAHEL_DEATH_POS[1], 4);
  });

  it('the reversed-grip gesture peaks shortly after the death beat and returns to zero', () => {
    expect(abnerPose(T_ASAHEL_DEATH).reversedGrip).toBe(0);
    expect(abnerPose(T_ASAHEL_DEATH + 1).reversedGrip).toBeGreaterThan(0.5);
    expect(abnerPose(T_ASAHEL_DEATH + 20).reversedGrip).toBeCloseTo(0, 5);
  });

  it('arrives at the hill crest by T_STANDOFF and stays there', () => {
    const atStandoff = abnerPose(T_STANDOFF);
    expect(atStandoff.x).toBeCloseTo(HILL_CREST_ABNER_POS[0], 1);
    expect(atStandoff.z).toBeCloseTo(HILL_CREST_ABNER_POS[1], 1);
    const atClose = abnerPose(DURATION_SEC);
    expect(atClose.x).toBeCloseTo(HILL_CREST_ABNER_POS[0], 1);
  });

  it('the plea gesture rises only around T_ABNER_PLEA', () => {
    expect(abnerPose(T_STANDOFF).plea).toBeCloseTo(0, 5);
    expect(abnerPose(196 + 2).plea).toBeGreaterThan(0.5);
  });
});

describe('asahelPose', () => {
  it('reaches the same death point Abner reaches, at the same time', () => {
    const pose = asahelPose(T_ASAHEL_DEATH, 'standard');
    expect(pose.x).toBeCloseTo(ASAHEL_DEATH_POS[0], 4);
    expect(pose.z).toBeCloseTo(ASAHEL_DEATH_POS[1], 4);
  });

  it('is not fallen before the death beat, in either mode', () => {
    expect(asahelPose(T_ASAHEL_DEATH - 0.01, 'standard').fallen).toBeCloseTo(0, 4);
    expect(asahelPose(T_ASAHEL_DEATH - 0.01, 'reduced').fallen).toBeCloseTo(0, 4);
  });

  it('standard mode falls gradually; reduced mode cuts to fallen almost immediately', () => {
    const shortlyAfter = T_ASAHEL_DEATH + 1;
    const standard = asahelPose(shortlyAfter, 'standard').fallen;
    const reduced = asahelPose(shortlyAfter, 'reduced').fallen;
    expect(reduced).toBeGreaterThan(standard);
    expect(reduced).toBeGreaterThan(0.9);
  });

  it('stays fallen for the rest of the scene', () => {
    expect(asahelPose(DURATION_SEC, 'standard').fallen).toBeCloseTo(1, 3);
  });
});

describe('joabPose / abishaiPose', () => {
  it('passes near the death point around T_ASAHEL_DEATH (the "stood still" reaction beat)', () => {
    const pose = joabPose(T_ASAHEL_DEATH);
    expect(Math.hypot(pose.x - ASAHEL_DEATH_POS[0], pose.z - ASAHEL_DEATH_POS[1])).toBeLessThan(20);
  });

  it('the reaction-hold flag is up during the hold window and down before/after it', () => {
    expect(joabPose(T_ASAHEL_DEATH - 5).reactionHold).toBeCloseTo(0, 3);
    expect(joabPose((T_ASAHEL_DEATH + T_PURSUIT_CONTINUES) / 2).reactionHold).toBeGreaterThan(0.5);
    expect(joabPose(T_PURSUIT_CONTINUES + 5).reactionHold).toBeCloseTo(0, 1);
  });

  it('the trumpet gesture rises only around T_JOAB_HALTS', () => {
    expect(joabPose(T_STANDOFF).trumpet).toBeCloseTo(0, 5);
    expect(joabPose(T_JOAB_HALTS + 2).trumpet).toBeGreaterThan(0.5);
  });

  it('abishai stays laterally offset from Joab rather than exactly overlapping him', () => {
    const j = joabPose(T_ASAHEL_PURSUIT);
    const a = abishaiPose(T_ASAHEL_PURSUIT);
    expect(Math.hypot(j.x - a.x, j.z - a.z)).toBeGreaterThan(1);
  });
});

describe('championPose', () => {
  it('no grasp or fall before its own T_CHAMPIONS start', () => {
    const pose = championPose(T_CHAMPIONS - 5, 'standard', 0);
    expect(pose.grasp).toBeCloseTo(0, 5);
    expect(pose.fallen).toBeCloseTo(0, 5);
  });

  it('grasps fully partway through the beat, then falls', () => {
    const grasping = championPose(T_CHAMPIONS + 2, 'standard', 0);
    expect(grasping.grasp).toBeCloseTo(1, 3);
    expect(grasping.fallen).toBeLessThan(0.1);
  });

  it('reduced mode cuts from the grasp to fallen much sooner than standard', () => {
    const t = T_CHAMPIONS + 3;
    const standard = championPose(t, 'standard', 0);
    const reduced = championPose(t, 'reduced', 0);
    expect(reduced.fallen).toBeGreaterThan(standard.fallen);
  });

  it('every pair eventually settles fallen, in both modes', () => {
    expect(championPose(DURATION_SEC, 'standard', 0).fallen).toBeCloseTo(1, 3);
    expect(championPose(DURATION_SEC, 'reduced', 11).fallen).toBeCloseTo(1, 3);
  });

  it('T_BATTLE_SPREADS/T_ASAHEL_PURSUIT/T_ASAHEL_DEATH/T_JOAB_HALTS stay in the beat order the timeline uses', () => {
    expect(T_BATTLE_SPREADS).toBeLessThan(T_ASAHEL_PURSUIT);
    expect(T_ASAHEL_PURSUIT).toBeLessThan(T_ASAHEL_DEATH);
    expect(T_ASAHEL_DEATH).toBeLessThan(T_JOAB_HALTS);
  });
});
