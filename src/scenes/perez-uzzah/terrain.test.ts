import { describe, expect, it } from 'vitest';
import { KIRIATH_JEARIM_TERRAIN } from './terrain';
import {
  ABINADAB_HOUSE_POS,
  KIRIATH_JEARIM_CENTER,
  OBED_EDOM_POS,
  THRESHING_FLOOR_POS,
} from './layout';

describe('perez-uzzah terrain', () => {
  it("Kiriath-jearim's hill sits well above the open route corridor", () => {
    const hill = KIRIATH_JEARIM_TERRAIN.heightAt(
      KIRIATH_JEARIM_CENTER[0],
      KIRIATH_JEARIM_CENTER[1],
    );
    const corridor = KIRIATH_JEARIM_TERRAIN.heightAt(
      THRESHING_FLOOR_POS[0],
      THRESHING_FLOOR_POS[1],
    );
    expect(hill).toBeGreaterThan(corridor + 8);
  });

  it("the house of Abinadab sits on the hill's own slope, not down in the corridor", () => {
    const house = KIRIATH_JEARIM_TERRAIN.heightAt(ABINADAB_HOUSE_POS[0], ABINADAB_HOUSE_POS[1]);
    const corridor = KIRIATH_JEARIM_TERRAIN.heightAt(
      THRESHING_FLOOR_POS[0],
      THRESHING_FLOOR_POS[1],
    );
    expect(house).toBeGreaterThan(corridor);
  });

  it('the threshing floor reads as flatter local ground than the hill slope', () => {
    const flatSample = (dx: number, dz: number) =>
      KIRIATH_JEARIM_TERRAIN.heightAt(THRESHING_FLOOR_POS[0] + dx, THRESHING_FLOOR_POS[1] + dz);
    // Sample on the mound's own slope (offset from its center), where the
    // gradient is steepest, not the crest (locally flat at any hilltop).
    const slopeCenter: [number, number] = [KIRIATH_JEARIM_CENTER[0] + 40, KIRIATH_JEARIM_CENTER[1]];
    const hillSample = (dx: number, dz: number) =>
      KIRIATH_JEARIM_TERRAIN.heightAt(slopeCenter[0] + dx, slopeCenter[1] + dz);
    const flatVariance =
      Math.max(flatSample(6, 0), flatSample(-6, 0), flatSample(0, 6), flatSample(0, -6)) -
      Math.min(flatSample(6, 0), flatSample(-6, 0), flatSample(0, 6), flatSample(0, -6));
    const hillVariance =
      Math.max(hillSample(6, 0), hillSample(-6, 0), hillSample(0, 6), hillSample(0, -6)) -
      Math.min(hillSample(6, 0), hillSample(-6, 0), hillSample(0, 6), hillSample(0, -6));
    expect(flatVariance).toBeLessThan(hillVariance);
  });

  it("Obed-edom's house sits on ordinary, gently distinguished ground", () => {
    const house = KIRIATH_JEARIM_TERRAIN.heightAt(OBED_EDOM_POS[0], OBED_EDOM_POS[1]);
    expect(Number.isFinite(house)).toBe(true);
  });

  it('builds geometry with vertex colors and no NaNs', () => {
    const geo = KIRIATH_JEARIM_TERRAIN.buildGeometry(500, 50);
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
