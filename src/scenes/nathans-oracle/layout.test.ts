import { describe, expect, it } from 'vitest';
import {
  DAVID_HOUSE_POS,
  DAVID_TENT_SIT_POS,
  ENCLOSURE_RADIUS,
  HOUSE_CENTER,
  HOUSE_COURT_POS,
  NATHAN_HOUSE_POS,
  NIGHT_CORNER_POS,
  STRONGHOLD_CENTER,
  TENT_POS,
  WALK_TO_TENT_CURVE,
} from './layout';

function distFromCenter(p: [number, number]): number {
  return Math.hypot(p[0] - STRONGHOLD_CENTER[0], p[1] - STRONGHOLD_CENTER[1]);
}

describe('nathans-oracle layout', () => {
  it('every focal point sits inside the reused enclosure', () => {
    for (const p of [HOUSE_CENTER, HOUSE_COURT_POS, NIGHT_CORNER_POS, TENT_POS]) {
      expect(distFromCenter(p)).toBeLessThan(ENCLOSURE_RADIUS);
    }
  });

  it("David and Nathan's house-ground positions are distinct but close (conversation scale)", () => {
    const d = Math.hypot(
      DAVID_HOUSE_POS[0] - NATHAN_HOUSE_POS[0],
      DAVID_HOUSE_POS[1] - NATHAN_HOUSE_POS[1],
    );
    expect(d).toBeGreaterThan(1);
    expect(d).toBeLessThan(6);
  });

  it('the night corner is clearly distinct from both the house and the tent', () => {
    const dHouse = Math.hypot(
      NIGHT_CORNER_POS[0] - HOUSE_CENTER[0],
      NIGHT_CORNER_POS[1] - HOUSE_CENTER[1],
    );
    const dTent = Math.hypot(
      NIGHT_CORNER_POS[0] - TENT_POS[0],
      NIGHT_CORNER_POS[1] - TENT_POS[1],
    );
    expect(dHouse).toBeGreaterThan(10);
    expect(dTent).toBeGreaterThan(10);
  });

  it('the walk-to-tent curve starts at the house reception ground and ends at the tent seat', () => {
    const start = WALK_TO_TENT_CURVE.getPointAt(0);
    expect(start.x).toBeCloseTo(HOUSE_COURT_POS[0], 5);
    expect(start.z).toBeCloseTo(HOUSE_COURT_POS[1], 5);
    const end = WALK_TO_TENT_CURVE.getPointAt(1);
    expect(end.x).toBeCloseTo(DAVID_TENT_SIT_POS[0], 5);
    expect(end.z).toBeCloseTo(DAVID_TENT_SIT_POS[1], 5);
  });

  it("David's tent-side seat never overlaps the tent's own footprint", () => {
    const d = Math.hypot(
      DAVID_TENT_SIT_POS[0] - TENT_POS[0],
      DAVID_TENT_SIT_POS[1] - TENT_POS[1],
    );
    expect(d).toBeGreaterThan(2);
  });
});
