import { describe, expect, it } from 'vitest';
import { HEBRON_TERRAIN } from '../hebron-anointing/terrain';
import { HEBRON_COVENANT_TERRAIN } from './terrain';

describe('hebron-covenant terrain (reused from hebron-anointing)', () => {
  it('is literally the same terrain object — the hard continuity rule', () => {
    expect(HEBRON_COVENANT_TERRAIN).toBe(HEBRON_TERRAIN);
  });

  it('keeps the town hill above the ground far to the north, on the new approach', () => {
    const townSummit = HEBRON_COVENANT_TERRAIN.heightAt(0, -70);
    const farNorth = HEBRON_COVENANT_TERRAIN.heightAt(-20, -320);
    expect(townSummit).toBeGreaterThan(farNorth);
  });

  it('builds geometry with vertex colors and no NaNs', () => {
    const geo = HEBRON_COVENANT_TERRAIN.buildGeometry(500, 50);
    const pos = geo.attributes.position;
    const col = geo.attributes.color;
    expect(pos.count).toBeGreaterThan(0);
    expect(col.count).toBe(pos.count);
    for (let i = 0; i < pos.count; i += 113) {
      expect(Number.isFinite(pos.getY(i))).toBe(true);
      expect(Number.isFinite(col.getX(i))).toBe(true);
    }
  });
});
