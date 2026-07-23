import { describe, expect, it } from 'vitest';
import { ZIKLAG_TERRAIN } from '../ziklag/terrain';
import { ZIKLAG_LAMENT_TERRAIN } from './terrain';

/**
 * Documents the deliberate reuse decision (brief: "no new terrain feature"
 * — this is literally the same town three narrative days later): the two
 * scenes must share the exact same terrain object/geometry, not a
 * lookalike copy that could silently drift.
 */
describe('ziklag-lament terrain reuse', () => {
  it('is the same terrain object as ziklag-aftermath, not a recomputed copy', () => {
    expect(ZIKLAG_LAMENT_TERRAIN).toBe(ZIKLAG_TERRAIN);
  });

  it('samples the same heights as the ziklag-aftermath terrain', () => {
    for (const [x, z] of [
      [0, 0],
      [24, -16],
      [-34, -28],
      [52, 20],
    ]) {
      expect(ZIKLAG_LAMENT_TERRAIN.heightAt(x, z)).toBe(ZIKLAG_TERRAIN.heightAt(x, z));
    }
  });
});
