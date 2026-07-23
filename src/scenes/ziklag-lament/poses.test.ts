import { describe, expect, it } from 'vitest';
import { DAVID_LAMENT_POS, DAVID_PLAZA_POS, EXECUTIONER_INDEX, MESSENGER_FALL_POS } from './layout';
import {
  davidPose,
  messengerPose,
  T_ARRIVAL,
  T_EXECUTION,
  T_FALLS,
  T_GRIEF,
  T_JUDGMENT,
  T_LAMENT_TRANSITION,
  T_MESSENGER_DEAD,
  tokensPose,
  T_TOKENS,
  witnessPose,
} from './poses';

/**
 * Beat-invariant timing checks against the beat table in
 * src/data/scenes.ts's ziklag-lament entry. The hardest invariant this file
 * guards: the messenger is never shown corroborating his own account of
 * Gilboa — these pose functions only ever place him on the walk-in/plaza
 * path at Ziklag, never a second "Gilboa" position.
 */

describe('messengerPose', () => {
  it('is walking in from the gate road early in the scene', () => {
    const pose = messengerPose(T_ARRIVAL + 2, 'standard');
    expect(pose.visible).toBe(true);
    expect(pose.prostrate).toBe(0);
    expect(pose.fallen).toBe(0);
  });

  it('has fallen to the ground before David by the falls beat', () => {
    const pose = messengerPose(T_FALLS + 2, 'standard');
    expect(pose.prostrate).toBeGreaterThan(0.5);
    expect(pose.fallen).toBe(0);
  });

  it('stays at the fall position (never a Gilboa position) through the report/tokens/grief beats', () => {
    for (const t of [T_FALLS + 4, T_TOKENS, T_GRIEF]) {
      const pose = messengerPose(t, 'standard');
      expect(pose.x).toBeCloseTo(MESSENGER_FALL_POS[0], 5);
      expect(pose.z).toBeCloseTo(MESSENGER_FALL_POS[1], 5);
    }
  });

  it('is not yet fallen (dead) before the execution beat', () => {
    expect(messengerPose(T_JUDGMENT, 'standard').fallen).toBe(0);
    expect(messengerPose(T_JUDGMENT, 'reduced').fallen).toBe(0);
  });

  it('is fallen by the messenger-dead beat in both modes', () => {
    expect(messengerPose(T_MESSENGER_DEAD, 'standard').fallen).toBeGreaterThan(0.9);
    expect(messengerPose(T_MESSENGER_DEAD, 'reduced').fallen).toBeGreaterThan(0.9);
  });

  it('reduced mode reaches the fallen aftermath faster than standard mode (elided strike)', () => {
    const soonAfter = T_EXECUTION + 1.6;
    const standard = messengerPose(soonAfter, 'standard').fallen;
    const reduced = messengerPose(soonAfter, 'reduced').fallen;
    expect(reduced).toBeGreaterThan(standard);
  });
});

describe('tokensPose', () => {
  it('is not visible before the tokens beat', () => {
    expect(tokensPose(T_TOKENS - 1).visible).toBe(false);
  });

  it('is presented shortly after the tokens beat', () => {
    const pose = tokensPose(T_TOKENS + 2);
    expect(pose.visible).toBe(true);
    expect(pose.scale).toBeGreaterThan(0.5);
  });
});

describe('davidPose', () => {
  it('stands in the plaza through the judgment/execution beats', () => {
    for (const t of [T_GRIEF, T_JUDGMENT, T_EXECUTION]) {
      const pose = davidPose(t);
      expect(pose.x).toBeCloseTo(DAVID_PLAZA_POS[0], 5);
      expect(pose.z).toBeCloseTo(DAVID_PLAZA_POS[1], 5);
    }
  });

  it('grieves (bowed posture) during the grief beat, then resolves before judgment', () => {
    expect(davidPose(T_GRIEF + 3).grieve).toBeGreaterThan(0.5);
    expect(davidPose(T_JUDGMENT).grieve).toBeLessThan(0.1);
  });

  it('has moved to the lament rise well after the transition beat', () => {
    const pose = davidPose(T_LAMENT_TRANSITION + 10);
    expect(pose.x).toBeCloseTo(DAVID_LAMENT_POS[0], 5);
    expect(pose.z).toBeCloseTo(DAVID_LAMENT_POS[1], 5);
  });
});

describe('witnessPose', () => {
  const count = 8;

  it('only the executioner shows a strike gesture, and only in standard mode', () => {
    const t = T_EXECUTION + 0.8;
    const executioner = witnessPose(t, EXECUTIONER_INDEX, count, 'standard');
    expect(executioner.strike).toBeGreaterThan(0);
    for (let i = 1; i < count; i++) {
      expect(witnessPose(t, i, count, 'standard').strike).toBe(0);
    }
  });

  it('reduced mode never shows the strike gesture (elided per ADR-009)', () => {
    const t = T_EXECUTION + 0.8;
    for (let i = 0; i < count; i++) {
      expect(witnessPose(t, i, count, 'reduced').strike).toBe(0);
    }
  });

  it('grieves during the grief beat', () => {
    expect(witnessPose(T_GRIEF + 3, 1, count, 'standard').grieve).toBeGreaterThan(0.5);
  });

  it('moves from the plaza to the lament rise after the transition beat', () => {
    const before = witnessPose(T_LAMENT_TRANSITION - 1, 2, count, 'standard');
    const after = witnessPose(T_LAMENT_TRANSITION + 10, 2, count, 'standard');
    expect(Math.hypot(after.x - before.x, after.z - before.z)).toBeGreaterThan(10);
  });
});
