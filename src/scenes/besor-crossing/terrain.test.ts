import { describe, expect, it } from 'vitest';
import { BESOR_TERRAIN } from './terrain';
import { CHANNEL_PATH } from './layout';

describe('Besor-crossing terrain', () => {
  it('carves the wadi bed below the surrounding bank', () => {
    const [cx, cz] = CHANNEL_PATH[3]; // a mid-path point, near the ford
    const bed = BESOR_TERRAIN.heightAt(cx, cz);
    const bank = BESOR_TERRAIN.heightAt(cx, cz - 90); // well off the channel
    expect(bed).toBeLessThan(bank);
  });

  it('builds geometry with vertex colors and no NaNs', () => {
    const geo = BESOR_TERRAIN.buildGeometry(400, 40);
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
