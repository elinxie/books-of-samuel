import { describe, expect, it } from 'vitest';
import { HEBRON_TERRAIN as ANOINTING_TERRAIN } from '../hebron-anointing/terrain';
import { HEBRON_TERRAIN, HEBRON_TERRAIN_SPEC } from './terrain';

describe('hebron-gate terrain (reused from hebron-anointing)', () => {
  it('re-exports the exact same terrain instance as hebron-anointing, not a recomputed copy', () => {
    expect(HEBRON_TERRAIN).toBe(ANOINTING_TERRAIN);
  });

  it('keeps the town mound above the valley, same as hebron-anointing/hebron-covenant', () => {
    const townSummit = HEBRON_TERRAIN.heightAt(0, -70);
    const valleyFloor = HEBRON_TERRAIN.heightAt(0, 55);
    expect(townSummit).toBeGreaterThan(valleyFloor + 15);
  });

  it('is finite at the tomb ground, on the hill’s flank', () => {
    const h = HEBRON_TERRAIN.heightAt(-70, -55);
    expect(Number.isFinite(h)).toBe(true);
  });

  it('exposes the spec object (same reference) for any future scene-local composition', () => {
    expect(HEBRON_TERRAIN_SPEC.size).toBe(1500);
  });
});
