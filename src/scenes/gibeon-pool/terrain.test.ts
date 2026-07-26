import { describe, expect, it } from 'vitest';
import { GIBEON_TERRAIN } from './terrain';

describe('Gibeon terrain', () => {
  it('depresses the pool basin below the surrounding ground (claim-gibeon-pool-form)', () => {
    const basinFloor = GIBEON_TERRAIN.heightAt(0, 0);
    const surrounding = GIBEON_TERRAIN.heightAt(60, 0);
    expect(basinFloor).toBeLessThan(surrounding - 1);
  });

  it('gives the basin a slight raised lip just beyond its rim', () => {
    const basinFloor = GIBEON_TERRAIN.heightAt(0, 0);
    const lip = GIBEON_TERRAIN.heightAt(24, 0);
    expect(lip).toBeGreaterThan(basinFloor);
  });

  it('raises the hill of Ammah well above the pursuit ground below it', () => {
    const hillSummit = GIBEON_TERRAIN.heightAt(230, 50);
    const hillBase = GIBEON_TERRAIN.heightAt(140, 28);
    expect(hillSummit).toBeGreaterThan(hillBase + 8);
  });

  it('builds geometry with vertex colors and no NaNs', () => {
    const geo = GIBEON_TERRAIN.buildGeometry(500, 50);
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
