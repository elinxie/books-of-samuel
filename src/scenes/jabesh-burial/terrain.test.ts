import { describe, expect, it } from 'vitest';
import { JABESH_TERRAIN } from './terrain';
import { CHANNEL_PATH, VILLAGE_CENTER } from './layout';

describe('Jabesh-gilead terrain', () => {
  it('keeps the village terrace well above the low western Jordan-valley approach', () => {
    const village = JABESH_TERRAIN.heightAt(VILLAGE_CENTER[0], VILLAGE_CENTER[1]);
    const farWest = JABESH_TERRAIN.heightAt(-430, 55);
    expect(village).toBeGreaterThan(farWest + 30);
  });

  it('carves the wadi bed below the surrounding bank', () => {
    const [cx, cz] = CHANNEL_PATH[3]; // a mid-path point
    const bed = JABESH_TERRAIN.heightAt(cx, cz);
    const bank = JABESH_TERRAIN.heightAt(cx, cz - 90); // well off the channel
    expect(bed).toBeLessThan(bank);
  });

  it('builds geometry with vertex colors and no NaNs', () => {
    const geo = JABESH_TERRAIN.buildGeometry(500, 50);
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
