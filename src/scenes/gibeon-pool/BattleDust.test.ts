import { describe, expect, it } from 'vitest';
import { battleDustIntensity } from './BattleDust';
import { T_ARRIVAL, T_BATTLE_SPREADS, T_CHAMPIONS, T_JOAB_HALTS } from './poses';

describe('battleDustIntensity', () => {
  it('is zero before the champions/battle beats', () => {
    expect(battleDustIntensity(T_ARRIVAL)).toBe(0);
    expect(battleDustIntensity(T_CHAMPIONS - 1)).toBe(0);
  });

  it('rises once the battle spreads', () => {
    expect(battleDustIntensity(T_BATTLE_SPREADS + 10)).toBeGreaterThan(0.3);
  });

  it('settles, but never fully vanishes, after Joab halts the pursuit', () => {
    const settled = battleDustIntensity(T_JOAB_HALTS + 30);
    expect(settled).toBeGreaterThan(0);
    expect(settled).toBeLessThan(0.5);
  });
});
