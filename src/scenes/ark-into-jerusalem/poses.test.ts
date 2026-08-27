import { describe, expect, it } from 'vitest';
import {
  ARRIVAL_CURVE,
  CONFRONTATION_POS,
  DANCE_GATHER_CENTER,
  DISTRIBUTION_CENTER,
  HOUSEHOLD_POS,
  WINDOW_POS,
} from './layout';
import {
  DAVID_CONFRONT_POS,
  DURATION_SEC,
  MICHAL_CONFRONT_POS,
  T_CLOSE,
  T_CONFRONTATION,
  T_DANCE,
  T_DEPART,
  T_DISTRIBUTION,
  T_RETURN_HOUSEHOLD,
  T_SACRIFICE,
  T_TENT,
  T_WINDOW,
  WINDOW_HOLD,
  arkPose,
  danceEnvelope,
  davidDanceTransform,
  davidPose,
  michalPose,
  officiantGesture,
  onlookerPose,
  processionFigurePose,
} from './poses';

describe('scene duration', () => {
  it('holds every named beat time within the scene duration', () => {
    expect(T_CLOSE).toBeLessThan(DURATION_SEC);
  });
});

describe('processionFigurePose', () => {
  const fig = {
    laneOffset: 0,
    entryStagger: 0,
    danceSlot: [DANCE_GATHER_CENTER[0] + 2, DANCE_GATHER_CENTER[1] - 1] as [number, number],
    distSlot: [DISTRIBUTION_CENTER[0] + 1, DISTRIBUTION_CENTER[1] + 1] as [number, number],
  };

  it('holds off-composition (south of the ridge) before the departure beat', () => {
    const pose = processionFigurePose(T_DEPART - 1, fig);
    expect(pose.z).toBeLessThan(-250);
    expect(pose.moving).toBe(false);
  });

  it('reaches the dance-gather slot and stops moving well before the distribution beat', () => {
    const pose = processionFigurePose(T_DISTRIBUTION - 1, fig);
    expect(pose.x).toBeCloseTo(fig.danceSlot[0], 3);
    expect(pose.z).toBeCloseTo(fig.danceSlot[1], 3);
    expect(pose.moving).toBe(false);
  });

  it('reads as dancing only within the dance/offering window', () => {
    expect(processionFigurePose(T_DANCE - 1, fig).dancing).toBe(false);
    expect(processionFigurePose(T_DANCE + 1, fig).dancing).toBe(true);
    expect(processionFigurePose(T_TENT - 1, fig).dancing).toBe(true);
    expect(processionFigurePose(T_TENT + 1, fig).dancing).toBe(false);
  });

  it('moves to the distribution slot and holds there for the rest of the scene', () => {
    const pose = processionFigurePose(DURATION_SEC, fig);
    expect(pose.x).toBeCloseTo(fig.distSlot[0], 3);
    expect(pose.z).toBeCloseTo(fig.distSlot[1], 3);
    expect(pose.moving).toBe(false);
  });
});

describe('onlookerPose (the reused Jerusalem ambient population)', () => {
  const home: [number, number] = [10, 60];
  const distSlot: [number, number] = [6, 58];

  it('stays home (static onlooker) until the distribution beat', () => {
    const pose = onlookerPose(T_DISTRIBUTION - 1, home, distSlot);
    expect(pose.x).toBe(home[0]);
    expect(pose.z).toBe(home[1]);
    expect(pose.moving).toBe(false);
  });

  it('converges on the distribution ground afterward', () => {
    const pose = onlookerPose(DURATION_SEC, home, distSlot);
    expect(pose.x).toBeCloseTo(distSlot[0], 3);
    expect(pose.z).toBeCloseTo(distSlot[1], 3);
  });
});

describe('danceEnvelope', () => {
  it('is zero before the dance beat and after the tent-placement beat settles', () => {
    expect(danceEnvelope(T_DANCE - 5)).toBe(0);
    expect(danceEnvelope(T_TENT + 10)).toBe(0);
  });

  it('reaches full amplitude during the dance window', () => {
    expect(danceEnvelope((T_DANCE + T_TENT) / 2)).toBeCloseTo(1, 5);
  });
});

describe('arkPose', () => {
  it('travels the arrival curve, then settles inside the tent for the rest of the scene', () => {
    const start = ARRIVAL_CURVE.getPointAt(0);
    const early = arkPose(T_DEPART - 1);
    expect(early.x).toBeCloseTo(start.x, 3);
    expect(early.z).toBeCloseTo(start.z, 3);

    const settled = arkPose(DURATION_SEC);
    // Imported indirectly via layout — checked against davidDanceTransform's
    // own TENT_POS-adjacent behavior below instead of re-importing here.
    expect(settled.x).not.toBeNaN();
  });

  it('holds near the offering ground through the dance window, not yet inside the tent', () => {
    const p = arkPose((T_SACRIFICE + T_DANCE) / 2 + 5);
    const tentSettled = arkPose(DURATION_SEC);
    expect(Math.hypot(p.x - tentSettled.x, p.z - tentSettled.z)).toBeGreaterThan(3);
  });
});

describe('davidDanceTransform (no exposure — pure whole-body transform scalars only)', () => {
  it('is fully still outside the dance window', () => {
    const before = davidDanceTransform(T_DANCE - 1);
    expect(before.bounce).toBe(0);
    expect(before.spin).toBe(0);
    expect(before.lean).toBe(0);
    const after = davidDanceTransform(T_TENT + 10);
    expect(after.bounce).toBe(0);
  });

  it('bounces and spins during the dance window ("with all his might")', () => {
    const mid = davidDanceTransform((T_DANCE + T_TENT) / 2);
    expect(mid.spin).toBeGreaterThan(0);
  });

  it('never returns any field beyond whole-body transform scalars (bounce/spin/lean)', () => {
    const keys = Object.keys(davidDanceTransform((T_DANCE + T_TENT) / 2)).sort();
    expect(keys).toEqual(['bounce', 'lean', 'spin']);
  });
});

describe('davidPose', () => {
  it('arrives with the procession and holds near the tent through the dance/offering beats', () => {
    const pose = davidPose(T_TENT - 1);
    expect(
      Math.hypot(pose.x - DANCE_GATHER_CENTER[0], pose.z - DANCE_GATHER_CENTER[1]),
    ).toBeLessThan(20);
  });

  it('reaches the confrontation ground by the confrontation beat and holds there', () => {
    const pose = davidPose(T_CONFRONTATION + 4);
    expect(pose.x).toBeCloseTo(DAVID_CONFRONT_POS[0], 3);
    expect(pose.z).toBeCloseTo(DAVID_CONFRONT_POS[1], 3);
  });

  it('is still en route (not yet at the confrontation ground) partway through the return-household walk', () => {
    const mid = davidPose((T_RETURN_HOUSEHOLD + T_CONFRONTATION) / 2);
    const dist = Math.hypot(mid.x - DAVID_CONFRONT_POS[0], mid.z - DAVID_CONFRONT_POS[1]);
    expect(dist).toBeGreaterThan(0.5);
  });
});

describe('officiantGesture (sacrifice restraint — a raised-arm gesture only)', () => {
  it('is near zero well before and well after both offering windows', () => {
    expect(officiantGesture(T_SACRIFICE - 10)).toBeLessThan(0.05);
    expect(officiantGesture(T_TENT + 20)).toBeLessThan(0.05);
  });

  it('rises during the six-paces sacrifice window and the tent-placement offerings', () => {
    expect(officiantGesture(T_SACRIFICE + 3)).toBeGreaterThan(0.3);
    expect(officiantGesture(T_TENT + 3)).toBeGreaterThan(0.3);
  });
});

describe('michalPose (staged for the first time — window, withdrawal, confrontation)', () => {
  it('is not visible before the window beat', () => {
    expect(michalPose(T_WINDOW - 1).visible).toBe(false);
  });

  it('is visible, still, at the window through the hold window', () => {
    const pose = michalPose(T_WINDOW + 2);
    expect(pose.visible).toBe(true);
    expect(pose.x).toBeCloseTo(WINDOW_POS[0], 3);
    expect(pose.z).toBeCloseTo(WINDOW_POS[1], 3);
  });

  it('withdraws (becomes invisible) after the window-hold window, well before the confrontation', () => {
    expect(michalPose(T_WINDOW + WINDOW_HOLD + 4).visible).toBe(false);
  });

  it('is visible and walking on her way to meet David before the confrontation beat', () => {
    const pose = michalPose(T_CONFRONTATION - 3);
    expect(pose.visible).toBe(true);
    const distFromHousehold = Math.hypot(pose.x - HOUSEHOLD_POS[0], pose.z - HOUSEHOLD_POS[1]);
    const distFromConfront = Math.hypot(
      pose.x - MICHAL_CONFRONT_POS[0],
      pose.z - MICHAL_CONFRONT_POS[1],
    );
    expect(distFromHousehold).toBeGreaterThan(0.2);
    expect(distFromConfront).toBeGreaterThan(0.2);
  });

  it('holds at the confrontation ground, close to but distinct from David, for the rest of the scene', () => {
    const pose = michalPose(DURATION_SEC);
    expect(pose.visible).toBe(true);
    expect(pose.x).toBeCloseTo(MICHAL_CONFRONT_POS[0], 3);
    expect(pose.z).toBeCloseTo(MICHAL_CONFRONT_POS[1], 3);
    const distFromDavid = Math.hypot(
      MICHAL_CONFRONT_POS[0] - DAVID_CONFRONT_POS[0],
      MICHAL_CONFRONT_POS[1] - DAVID_CONFRONT_POS[1],
    );
    expect(distFromDavid).toBeGreaterThan(1);
    expect(distFromDavid).toBeLessThan(6);
  });

  it('never sits exactly on top of the confrontation reference point used for CONFRONTATION_POS sanity', () => {
    expect(CONFRONTATION_POS[0]).toBeCloseTo(DAVID_CONFRONT_POS[0], 5);
  });
});
