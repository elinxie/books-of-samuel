import { describe, expect, it } from 'vitest';
import { mulberry32 } from '../noise';
import { randomCharacterParams, STATURE_DEFAULT_MALE } from './anthropometry';
import { buildCharacterRig } from './bodyGeometry';

describe('randomCharacterParams', () => {
  it('produces identical params for the same seed', () => {
    const a = randomCharacterParams(mulberry32(11));
    const b = randomCharacterParams(mulberry32(11));
    expect(a).toEqual(b);
  });

  it('produces differing dress/build across seeds', () => {
    const seeds = [1, 2, 3, 4, 5, 6, 7, 8].map((s) => randomCharacterParams(mulberry32(s)));
    const tunicColors = new Set(seeds.map((p) => p.dress.tunicColor));
    const builds = new Set(seeds.map((p) => p.build.toFixed(6)));
    // Not every seed need differ, but across 8 seeds we expect real variety.
    expect(tunicColors.size).toBeGreaterThan(1);
    expect(builds.size).toBeGreaterThan(1);
  });

  it('keeps default-male stature within the documented 1.60-1.72 m range', () => {
    for (let seed = 0; seed < 50; seed++) {
      const params = randomCharacterParams(mulberry32(seed));
      expect(params.stature).toBeGreaterThanOrEqual(1.6);
      expect(params.stature).toBeLessThanOrEqual(1.72);
    }
  });

  it('is centered on STATURE_DEFAULT_MALE with a documented +-0.06 m spread', () => {
    for (let seed = 0; seed < 20; seed++) {
      const params = randomCharacterParams(mulberry32(seed));
      expect(Math.abs(params.stature - STATURE_DEFAULT_MALE)).toBeLessThanOrEqual(0.06 + 1e-9);
    }
  });

  it('respects a detail override', () => {
    const params = randomCharacterParams(mulberry32(3), { detail: 'principal' });
    expect(params.detail).toBe('principal');
  });

  it('respects dress overrides (identity pinning, e.g. David)', () => {
    const params = randomCharacterParams(mulberry32(3), {
      dress: { tunicColor: '#123456', beltColor: '#654321', headwear: 'bare' },
    });
    expect(params.dress.tunicColor).toBe('#123456');
    expect(params.dress.beltColor).toBe('#654321');
    expect(params.dress.headwear).toBe('bare');
  });

  it('overrides propagate through to the built rig', () => {
    const params = randomCharacterParams(mulberry32(9), {
      detail: 'principal',
      stature: 1.7,
    });
    const rig = buildCharacterRig(params);
    expect(rig.params.detail).toBe('principal');
    expect(rig.params.stature).toBe(1.7);
  });
});
