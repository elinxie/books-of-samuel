import { describe, expect, it } from 'vitest';
import { HEBRON_RECKONING_TERRAIN, HEBRON_RECKONING_TERRAIN_SPEC } from './terrain';
import { HEBRON_TERRAIN_SPEC } from '../hebron-anointing/terrain';
import { POOL_CENTER, TOMB_CENTER, TOWN_CENTER } from './layout';

describe('hebron-reckoning terrain', () => {
  it('extends hebron-anointing’s TerrainSpec (visual continuity, brief requirement) rather than replacing it', () => {
    expect(HEBRON_RECKONING_TERRAIN_SPEC.hills).toBe(HEBRON_TERRAIN_SPEC.hills);
    expect(HEBRON_RECKONING_TERRAIN_SPEC.colors.base).toBe(HEBRON_TERRAIN_SPEC.colors.base);
  });

  it('adds exactly one new landform beyond hebron-anointing’s own features (the pool basin)', () => {
    const baseCount = HEBRON_TERRAIN_SPEC.features?.length ?? 0;
    expect(HEBRON_RECKONING_TERRAIN_SPEC.features?.length).toBe(baseCount + 2); // flatten + basin
  });

  it('keeps the town hill above the valley south of it, same as the sibling M4/M5 scenes', () => {
    const townSummit = HEBRON_RECKONING_TERRAIN.heightAt(0, -70);
    const valleyFloor = HEBRON_RECKONING_TERRAIN.heightAt(0, 55);
    expect(townSummit).toBeGreaterThan(valleyFloor + 15);
  });

  it('the pool basin is a real depression relative to its own rim', () => {
    // Probed to the west (-x): the eastward `ramp` feature inherited from
    // hebron-anointing's own TerrainSpec (a gentle, unrelated fall toward
    // the messenger road's outward sightline) starts at x=90 and would
    // otherwise confound a rim probe east of the pool (x=80); west stays
    // clear of it.
    const floor = HEBRON_RECKONING_TERRAIN.heightAt(POOL_CENTER[0], POOL_CENTER[1]);
    const rim = HEBRON_RECKONING_TERRAIN.heightAt(POOL_CENTER[0] - 14, POOL_CENTER[1]);
    expect(rim).toBeGreaterThan(floor + 0.8);
  });

  it('the pool sits well clear of the town mound and the tomb ground', () => {
    const distFromTown = Math.hypot(
      POOL_CENTER[0] - TOWN_CENTER[0],
      POOL_CENTER[1] - TOWN_CENTER[1],
    );
    const distFromTomb = Math.hypot(
      POOL_CENTER[0] - TOMB_CENTER[0],
      POOL_CENTER[1] - TOMB_CENTER[1],
    );
    expect(distFromTown).toBeGreaterThan(60);
    expect(distFromTomb).toBeGreaterThan(60);
  });

  it('builds geometry with vertex colors and no NaNs', () => {
    const geo = HEBRON_RECKONING_TERRAIN.buildGeometry(500, 50);
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
