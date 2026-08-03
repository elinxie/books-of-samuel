import { describe, expect, it } from 'vitest';
import { battleDustIntensity } from './BattleDust';
import { T_BATTLE_SPREADS, T_STANDOFF } from './poses';

/**
 * Beat-invariant checks for the battle-spread dust envelope against
 * scenes.ts's gibeon-pool beat times (b-battle-spreads 78 / b-standoff 166).
 * Mirrors gilboa-battle/RoutDust.test.ts's pattern.
 */

describe('battleDustIntensity', () => {
  it('is zero before the battle spreads', () => {
    expect(battleDustIntensity(0)).toBe(0);
    expect(battleDustIntensity(T_BATTLE_SPREADS)).toBe(0);
  });

  it('rises to full density shortly after the battle spreads', () => {
    const mid = battleDustIntensity(T_BATTLE_SPREADS + 5);
    expect(mid).toBeGreaterThan(0);
    expect(mid).toBeLessThan(1);
    expect(battleDustIntensity(T_BATTLE_SPREADS + 10)).toBeCloseTo(1, 5);
  });

  it('fades out again by the standoff, as the action moves to the hill', () => {
    expect(battleDustIntensity(T_STANDOFF)).toBeCloseTo(0, 5);
    expect(battleDustIntensity(T_STANDOFF + 20)).toBeCloseTo(0, 5);
  });

  it('stays within [0, 1] across the full timeline', () => {
    for (let t = 0; t <= T_STANDOFF + 40; t += 5) {
      const v = battleDustIntensity(t);
      expect(v).toBeGreaterThanOrEqual(0);
      expect(v).toBeLessThanOrEqual(1);
    }
  });
});
