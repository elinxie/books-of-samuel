import { describe, expect, it } from 'vitest';
import { pressDustIntensity, routDustIntensity } from './RoutDust';
import { T_ARCHERS, T_LINES, T_ROUT, T_SAUL_DEATH, T_SILENCE } from './poses';

/**
 * Beat-invariant checks for the rout-dust intensity envelopes against the
 * beat times in scenes.ts's gilboa-battle entry (b-lines 0 / b-rout 18 /
 * b-archers 72 / b-saul-death 112 / b-silence 140). Mirrors the pattern in
 * poses.test.ts.
 */

describe('routDustIntensity', () => {
  it('is zero before and at b-rout', () => {
    expect(routDustIntensity(0)).toBe(0);
    expect(routDustIntensity(T_ROUT - 1)).toBe(0);
    expect(routDustIntensity(T_ROUT)).toBe(0);
  });

  it('rises after b-rout and reaches full density well before b-saul-death', () => {
    const mid = routDustIntensity(T_ROUT + 8);
    expect(mid).toBeGreaterThan(0);
    expect(mid).toBeLessThan(1);
    expect(routDustIntensity(T_ROUT + 16)).toBeCloseTo(1, 5);
    expect(routDustIntensity(T_SAUL_DEATH - 1)).toBeCloseTo(1, 5);
  });

  it('thins toward b-silence but never reaches zero', () => {
    const atDeath = routDustIntensity(T_SAUL_DEATH);
    const atSilence = routDustIntensity(T_SILENCE);
    const afterSilence = routDustIntensity(T_SILENCE + 20);
    expect(atSilence).toBeLessThan(atDeath);
    expect(atSilence).toBeCloseTo(0.35, 5);
    expect(afterSilence).toBeCloseTo(0.35, 5);
    expect(atSilence).toBeGreaterThan(0);
  });

  it('stays within [0, 1] across the full timeline', () => {
    for (let t = 0; t <= T_SILENCE + 30; t += 5) {
      const v = routDustIntensity(t);
      expect(v).toBeGreaterThanOrEqual(0);
      expect(v).toBeLessThanOrEqual(1);
    }
  });
});

describe('pressDustIntensity', () => {
  it('starts at zero at b-lines and rises through the early beats', () => {
    expect(pressDustIntensity(T_LINES)).toBe(0);
    const early = pressDustIntensity(10);
    const later = pressDustIntensity(T_ARCHERS - 5);
    expect(early).toBeGreaterThan(0);
    expect(later).toBeGreaterThan(early);
  });

  it('never exceeds the lighter cap (stays below the rout at full density)', () => {
    for (let t = 0; t <= T_SILENCE; t += 5) {
      expect(pressDustIntensity(t)).toBeLessThanOrEqual(0.55);
    }
  });

  it('eases off after b-archers toward a low ambient level by b-silence', () => {
    const atArchers = pressDustIntensity(T_ARCHERS);
    const atSilence = pressDustIntensity(T_SILENCE);
    expect(atSilence).toBeLessThan(atArchers);
    expect(atSilence).toBeCloseTo(0.15, 5);
    expect(atSilence).toBeGreaterThan(0);
  });
});
