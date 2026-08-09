import { describe, expect, it } from 'vitest';
import { HEBRON_TERRAIN } from '../hebron-anointing/terrain';
import { HEBRON_COVENANT_TERRAIN } from './terrain';

/**
 * Documents the deliberate reuse decision (brief: "do not re-invent Hebron —
 * reuse the hebron-anointing terrain spec"): the two scenes must share the
 * exact same terrain object/geometry, not a lookalike copy that could
 * silently drift, mirroring ziklag-lament's terrain-reuse test.
 */
describe('hebron-covenant terrain reuse', () => {
  it('is the same terrain object as hebron-anointing, not a recomputed copy', () => {
    expect(HEBRON_COVENANT_TERRAIN).toBe(HEBRON_TERRAIN);
  });

  it('samples the same heights as the hebron-anointing terrain along the northern road', () => {
    for (const [x, z] of [
      [0, -70],
      [-90, -260],
      [-30, -6],
      [4, -16],
    ]) {
      expect(HEBRON_COVENANT_TERRAIN.heightAt(x, z)).toBe(HEBRON_TERRAIN.heightAt(x, z));
    }
  });
});
