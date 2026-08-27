import { describe, expect, it } from 'vitest';
import { ARK_SETTLE_POS, ROUTE_CURVE, THRESHING_FLOOR_U } from './layout';
import {
  T_DIVERSION,
  T_PEREZ_UZZAH,
  T_STRIKE,
  T_STUMBLE,
  cartPose,
  davidPose,
  routeTravelPose,
  stumbleEnvelope,
  uzzahPose,
} from './poses';

describe('perez-uzzah routeTravelPose', () => {
  const spec = {
    gather: [-200, 20] as [number, number],
    entryStart: 40,
    entryDur: 4,
    laneOffset: 0,
    settle: [200, 60] as [number, number],
  };

  it('holds at the gather position before entryStart', () => {
    const p = routeTravelPose(0, spec);
    expect(p.x).toBeCloseTo(spec.gather[0], 5);
    expect(p.z).toBeCloseTo(spec.gather[1], 5);
    expect(p.moving).toBe(false);
  });

  it('is at (or very near) the threshing floor position through the whole hold window', () => {
    const floor = ROUTE_CURVE.getPointAt(THRESHING_FLOOR_U);
    for (const t of [T_STUMBLE, T_STRIKE, T_PEREZ_UZZAH, T_DIVERSION - 1]) {
      const p = routeTravelPose(t, spec);
      expect(Math.hypot(p.x - floor.x, p.z - floor.z)).toBeLessThan(1);
    }
  });

  it('eventually settles at the settle position and stays there', () => {
    const p1 = routeTravelPose(174, spec);
    const p2 = routeTravelPose(175, spec);
    expect(p1.x).toBeCloseTo(spec.settle[0], 3);
    expect(p1.z).toBeCloseTo(spec.settle[1], 3);
    expect(p2.x).toBeCloseTo(spec.settle[0], 3);
    expect(p2.moving).toBe(false);
  });
});

describe('stumbleEnvelope', () => {
  it('peaks at T_STUMBLE and is zero well before/after it', () => {
    expect(stumbleEnvelope(T_STUMBLE)).toBeCloseTo(1, 5);
    expect(stumbleEnvelope(T_STUMBLE - 10)).toBe(0);
    expect(stumbleEnvelope(T_STUMBLE + 10)).toBe(0);
  });
});

describe('cartPose', () => {
  it('holds at the threshing floor through the strike window and settles near Obed-edom', () => {
    const floor = ROUTE_CURVE.getPointAt(THRESHING_FLOOR_U);
    const held = cartPose(T_STRIKE);
    expect(Math.hypot(held.x - floor.x, held.z - floor.z)).toBeLessThan(1);

    const settled = cartPose(175);
    expect(settled.x).toBeCloseTo(ARK_SETTLE_POS[0], 3);
    expect(settled.z).toBeCloseTo(ARK_SETTLE_POS[1], 3);
  });
});

describe('davidPose', () => {
  it('turns to face the ark during the held reaction beats, not the route tangent', () => {
    const arkPos: [number, number] = [
      ROUTE_CURVE.getPointAt(THRESHING_FLOOR_U).x,
      ROUTE_CURVE.getPointAt(THRESHING_FLOOR_U).z,
    ];
    const before = davidPose(T_STUMBLE, arkPos);
    const during = davidPose(T_PEREZ_UZZAH, arkPos);
    // During the reaction beats David's yaw should differ from his own
    // pre-reaction (route-tangent) yaw, since he now faces the ark instead.
    expect(during.yaw).not.toBeCloseTo(before.yaw, 2);
  });
});

/**
 * uzzahPose: the reduced-mode fork this task specifically asks for a test
 * of — a field (`reachExtend`/`fallen`) stays at its rest value through the
 * strike window in reduced mode, and the fade/aftermath state (the reduced
 * -mode analog of "lands measurably earlier") is well underway by the same
 * clock-time standard mode is still holding the reach.
 */
describe('uzzahPose reduced-mode fork (queue #25)', () => {
  const laneOffset = -2;

  it('standard mode: reach ramps up after the stumble, then falls after the strike', () => {
    const atStumble = uzzahPose(T_STUMBLE, 'standard', laneOffset);
    expect(atStumble.reachExtend).toBeCloseTo(0, 1);
    expect(atStumble.fallen).toBe(0);

    const reaching = uzzahPose(T_STUMBLE + 3, 'standard', laneOffset);
    expect(reaching.reachExtend).toBeGreaterThan(0.5);
    expect(reaching.fallen).toBe(0);

    const fallen = uzzahPose(T_STRIKE + 3, 'standard', laneOffset);
    expect(fallen.fallen).toBeCloseTo(1, 1);
    expect(fallen.fade).toBe(0);
  });

  it('reduced mode: reachExtend and fallen stay at 0 through the entire strike window', () => {
    for (const t of [T_STUMBLE, T_STUMBLE + 3, T_STRIKE, T_STRIKE + 3, T_STRIKE + 10]) {
      const p = uzzahPose(t, 'reduced', laneOffset);
      expect(p.reachExtend).toBe(0);
      expect(p.fallen).toBe(0);
    }
  });

  it('reduced mode fades Uzzah out well before standard mode even begins to fall', () => {
    // At T_STRIKE (when standard mode's fall has not yet started, `fallen`
    // is still 0 there too — the fall only ramps up after T_STRIKE), reduced
    // mode's fade is already well underway — the aftermath state lands
    // measurably earlier in reduced mode than any depicted state in
    // standard mode.
    const reducedAtStrike = uzzahPose(T_STRIKE, 'reduced', laneOffset);
    expect(reducedAtStrike.fade).toBeGreaterThan(0.8);

    const standardAtStrike = uzzahPose(T_STRIKE, 'standard', laneOffset);
    expect(standardAtStrike.fallen).toBeCloseTo(0, 1);
  });

  it('reduced mode never renders a value that could be read as a fallen body', () => {
    for (let t = 0; t <= 175; t += 5) {
      expect(uzzahPose(t, 'reduced', laneOffset).fallen).toBe(0);
    }
  });
});
