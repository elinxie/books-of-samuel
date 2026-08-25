import { describe, expect, it } from 'vitest';
import { REPHAIM_TERRAIN } from './terrain';
import { GROVE_CENTER, PHILISTINE_SPREAD_CENTER, RIM_EDGE } from './layout';

describe('rephaim-valley terrain', () => {
  it('the rim sits well above the open valley floor', () => {
    const rim = REPHAIM_TERRAIN.heightAt(-95, -10);
    const valleyFloor = REPHAIM_TERRAIN.heightAt(
      PHILISTINE_SPREAD_CENTER[0],
      PHILISTINE_SPREAD_CENTER[1],
    );
    expect(rim).toBeGreaterThan(valleyFloor + 10);
  });

  it("the rim edge (where David's force steps off) is lower than the rim crest but still elevated", () => {
    const crest = REPHAIM_TERRAIN.heightAt(-95, -10);
    const edge = REPHAIM_TERRAIN.heightAt(RIM_EDGE[0], RIM_EDGE[1]);
    expect(edge).toBeLessThan(crest);
    expect(edge).toBeGreaterThan(
      REPHAIM_TERRAIN.heightAt(PHILISTINE_SPREAD_CENTER[0], PHILISTINE_SPREAD_CENTER[1]),
    );
  });

  it('the grove sits on a gentle shoulder, not a landmark hill', () => {
    const grove = REPHAIM_TERRAIN.heightAt(GROVE_CENTER[0], GROVE_CENTER[1]);
    const rim = REPHAIM_TERRAIN.heightAt(-95, -10);
    expect(grove).toBeLessThan(rim);
  });

  it('builds geometry with vertex colors and no NaNs', () => {
    const geo = REPHAIM_TERRAIN.buildGeometry(500, 50);
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
