import { describe, expect, it } from 'vitest';
import { HEBRON_TERRAIN_SPEC } from '../hebron-anointing/terrain';
import { POOL_CENTER, POOL_RADIUS } from './layout';
import { HEBRON_RECKONING_TERRAIN, HEBRON_RECKONING_TERRAIN_SPEC } from './terrain';

describe('hebron-reckoning terrain (hebron-anointing hills/town + a new pool basin)', () => {
  it('keeps the town mound above the valley, same as the other Hebron scenes', () => {
    const townSummit = HEBRON_RECKONING_TERRAIN.heightAt(0, -70);
    const valleyFloor = HEBRON_RECKONING_TERRAIN.heightAt(0, 55);
    expect(townSummit).toBeGreaterThan(valleyFloor + 15);
  });

  it('reuses the same hill layers as hebron-anointing (not a recomputed noise field)', () => {
    expect(HEBRON_RECKONING_TERRAIN_SPEC.hills).toBe(HEBRON_TERRAIN_SPEC.hills);
  });

  it('the pool of Hebron sits in a basin depression below its own rim', () => {
    const floor = HEBRON_RECKONING_TERRAIN.heightAt(POOL_CENTER[0], POOL_CENTER[1]);
    const rim = HEBRON_RECKONING_TERRAIN.heightAt(POOL_CENTER[0] + POOL_RADIUS + 6, POOL_CENTER[1]);
    expect(floor).toBeLessThan(rim - 1);
  });

  it('is finite at the tomb ground and at the pool basin floor', () => {
    expect(Number.isFinite(HEBRON_RECKONING_TERRAIN.heightAt(-70, -55))).toBe(true);
    expect(Number.isFinite(HEBRON_RECKONING_TERRAIN.heightAt(POOL_CENTER[0], POOL_CENTER[1]))).toBe(
      true,
    );
  });

  it('the pool sits well clear of the town-house scatter radius (>55m from TOWN_CENTER)', () => {
    const dist = Math.hypot(POOL_CENTER[0] - 0, POOL_CENTER[1] - -70);
    expect(dist).toBeGreaterThan(55);
  });
});
