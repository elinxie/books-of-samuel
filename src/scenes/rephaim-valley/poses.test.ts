import { describe, expect, it } from 'vitest';
import { ADVANCE_ROUTE_CURVE, FLANK_ROUTE_CURVE, GROVE_WAIT_POS } from './layout';
import {
  BREAK_DUR,
  davidPrincipalPose,
  davidsForcePose,
  DURATION_SEC,
  philistinePose,
  T_CIRCLING,
  T_ENGAGE1,
  T_ENGAGE2,
  T_HEAR,
  T_INQUIRY_2,
  T_RETURN,
  T_SOUND,
  T_SPREAD,
  type DavidForceFigureParams,
  type PhilistineFigureParams,
} from './poses';

/**
 * Beat-invariant timing checks against the beat table in
 * src/data/scenes.ts's rephaim-valley entry. The hardest invariants this
 * file guards, per the brief's non-negotiable constraints:
 * - reduced mode NEVER shows a Philistine fall, in either engagement;
 * - the Philistine population is fully gone (an emptied valley floor) by
 *   the end of each break window, in both modes;
 * - David's force is genuinely motionless through the whole `b-sound`
 *   window (the wait beat) — no drift, no idle sway.
 */

const philFig: PhilistineFigureParams = {
  slot: [30, -12],
  falls: true,
  fallDelay: 1,
  fleeDir: [1, 0],
  fleeDist: 60,
};

const nonFallingFig: PhilistineFigureParams = { ...philFig, falls: false };

describe('philistinePose', () => {
  it('is hidden before the first spread', () => {
    expect(philistinePose(T_HEAR, philFig, 'standard').visible).toBe(false);
    expect(philistinePose(T_SPREAD - 1, philFig, 'standard').visible).toBe(false);
  });

  it('is static at its slot through the hold window before each engagement', () => {
    const pose = philistinePose(T_SPREAD + 1, philFig, 'standard');
    expect(pose.visible).toBe(true);
    expect(pose.x).toBeCloseTo(philFig.slot[0], 5);
    expect(pose.z).toBeCloseTo(philFig.slot[1], 5);
    expect(pose.fallen).toBe(0);
  });

  it('standard mode shows a fall for a falls-flagged figure during the break window', () => {
    const pose = philistinePose(T_ENGAGE1 + philFig.fallDelay + 1, philFig, 'standard');
    expect(pose.fallen).toBeGreaterThan(0);
  });

  it('reduced mode never shows a fall, even for a falls-flagged figure, at either engagement', () => {
    for (const engageStart of [T_ENGAGE1, T_ENGAGE2]) {
      for (let dt = 0; dt < BREAK_DUR; dt += 1) {
        const pose = philistinePose(engageStart + dt, philFig, 'reduced');
        expect(pose.fallen).toBe(0);
      }
    }
  });

  it('the valley floor is emptied by the end of each break window, in both modes', () => {
    for (const mode of ['standard', 'reduced'] as const) {
      for (const fig of [philFig, nonFallingFig]) {
        for (const engageStart of [T_ENGAGE1, T_ENGAGE2]) {
          const pose = philistinePose(engageStart + BREAK_DUR, fig, mode);
          expect(pose.visible).toBe(false);
        }
      }
    }
  });

  it('is hidden between the two phases (never lingers as a corpse field into b-perazim/b-images)', () => {
    const pose = philistinePose(T_ENGAGE1 + BREAK_DUR + 2, philFig, 'standard');
    expect(pose.visible).toBe(false);
  });

  it('reappears at the exact same slot for the second phase — one population, repositioned, never doubled', () => {
    const first = philistinePose(T_SPREAD + 1, philFig, 'standard');
    const second = philistinePose(T_RETURN + 1, philFig, 'standard');
    expect(second.x).toBeCloseTo(first.x, 5);
    expect(second.z).toBeCloseTo(first.z, 5);
  });

  it('is fully gone after the second engagement resolves (for the pursuit/close cards)', () => {
    const pose = philistinePose(DURATION_SEC, philFig, 'standard');
    expect(pose.visible).toBe(false);
  });
});

describe('davidsForcePose', () => {
  const fig: DavidForceFigureParams = { restSlot: [-100, -20], holdOffset: [0, 0], laneOffset: 0 };

  it('holds at its rim rest slot before the first advance', () => {
    const pose = davidsForcePose(T_HEAR, fig);
    expect(pose.x).toBeCloseTo(fig.restSlot[0], 5);
    expect(pose.z).toBeCloseTo(fig.restSlot[1], 5);
  });

  it('is back at its rim rest slot by the second inquiry, after the phase-one round trip', () => {
    const pose = davidsForcePose(T_INQUIRY_2, fig);
    expect(pose.x).toBeCloseTo(fig.restSlot[0], 4);
    expect(pose.z).toBeCloseTo(fig.restSlot[1], 4);
  });

  it('is genuinely motionless throughout the b-sound wait window (no drift, no idle sway)', () => {
    const soundStart = davidsForcePose(T_SOUND, fig);
    for (let dt = 1; dt < T_ENGAGE2 - T_SOUND; dt += 2) {
      const pose = davidsForcePose(T_SOUND + dt, fig);
      expect(pose.x).toBeCloseTo(soundStart.x, 6);
      expect(pose.z).toBeCloseTo(soundStart.z, 6);
    }
  });

  it("has arrived near the grove (the flanking route's own end) by the sound beat", () => {
    const pose = davidsForcePose(T_SOUND, fig);
    expect(pose.x).toBeCloseTo(GROVE_WAIT_POS[0], 3);
    expect(pose.z).toBeCloseTo(GROVE_WAIT_POS[1], 3);
  });

  it('the flanking march (b-circling) actually rides the flank route, not the advance route', () => {
    const midCircle = davidsForcePose(T_CIRCLING + 10, fig);
    const flankPoint = FLANK_ROUTE_CURVE.getPointAt(0.3);
    const advancePoint = ADVANCE_ROUTE_CURVE.getPointAt(0.3);
    const distToFlank = Math.hypot(midCircle.x - flankPoint.x, midCircle.z - flankPoint.z);
    const distToAdvance = Math.hypot(midCircle.x - advancePoint.x, midCircle.z - advancePoint.z);
    expect(distToFlank).toBeLessThan(distToAdvance);
  });

  it("is present at the scene's own ground at the end of the duration", () => {
    const pose = davidsForcePose(DURATION_SEC, fig);
    expect(Number.isFinite(pose.x)).toBe(true);
    expect(Number.isFinite(pose.z)).toBe(true);
  });
});

describe('davidPrincipalPose', () => {
  it("has reached the advance route's own end (the closing line) well into the engagement beat", () => {
    const pose = davidPrincipalPose(T_ENGAGE1 + 20);
    const advEnd = ADVANCE_ROUTE_CURVE.getPointAt(1);
    expect(pose.x).toBeCloseTo(advEnd.x, 3);
    expect(pose.z).toBeCloseTo(advEnd.z, 3);
  });

  it('is not yet at the closing line at the very start of the engagement beat (a real walk, not a teleport)', () => {
    const advEnd = ADVANCE_ROUTE_CURVE.getPointAt(1);
    const pose = davidPrincipalPose(T_ENGAGE1);
    const dist = Math.hypot(pose.x - advEnd.x, pose.z - advEnd.z);
    expect(dist).toBeGreaterThan(20);
  });
});
