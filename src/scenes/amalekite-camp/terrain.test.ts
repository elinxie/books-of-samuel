import { describe, expect, it } from 'vitest';
import { AMALEKITE_CAMP_TERRAIN } from './terrain';

describe('Amalekite-camp terrain', () => {
  it('raises the scout’s rise above the basin floor', () => {
    const rise = AMALEKITE_CAMP_TERRAIN.heightAt(0, -165);
    const basin = AMALEKITE_CAMP_TERRAIN.heightAt(10, 45);
    expect(rise).toBeGreaterThan(basin + 4);
  });

  it('builds geometry with vertex colors and no NaNs', () => {
    const geo = AMALEKITE_CAMP_TERRAIN.buildGeometry(400, 40);
    const pos = geo.attributes.position;
    const col = geo.attributes.color;
    expect(pos.count).toBeGreaterThan(0);
    expect(col.count).toBe(pos.count);
    for (let i = 0; i < pos.count; i += 97) {
      expect(Number.isFinite(pos.getY(i))).toBe(true);
      expect(Number.isFinite(col.getX(i))).toBe(true);
    }
  });
});
