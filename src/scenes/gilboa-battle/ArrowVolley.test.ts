import { describe, expect, it } from 'vitest';
import { buildArrowRoster } from './ArrowVolley';
import {
  ARCHER_VOLLEY_FLIGHT_DURATION_SEC,
  ARCHER_VOLLEY_MAX_ARROWS_PER_WAVE,
  ARCHER_VOLLEY_WAVE_COUNT,
  archerDrawPose,
  archerVolleyWaveStart,
  arrowArcHeight,
  arrowFlightProgress,
  arrowTargetScatterRadius,
  T_ARCHERS,
} from './poses';

/**
 * Beat-invariant checks for the archer-volley beat (`b-archers`, t=72 per
 * scenes.ts) — the three staggered arrow waves and the archer draw/release
 * lean, mirroring the pattern in poses.test.ts and RoutDust.test.ts.
 */

describe('archerVolleyWaveStart', () => {
  it('produces increasing wave-start times, with the last wave landing around T_ARCHERS', () => {
    const starts = Array.from({ length: ARCHER_VOLLEY_WAVE_COUNT }, (_, w) =>
      archerVolleyWaveStart(w),
    );
    for (let i = 1; i < starts.length; i++) {
      expect(starts[i]).toBeGreaterThan(starts[i - 1]);
    }
    const lastLanding = starts[starts.length - 1] + ARCHER_VOLLEY_FLIGHT_DURATION_SEC;
    expect(lastLanding).toBeGreaterThan(T_ARCHERS - 2);
    expect(lastLanding).toBeLessThan(T_ARCHERS + 4);
  });
});

describe('arrowFlightProgress', () => {
  const waveStart = archerVolleyWaveStart(0);

  it('is null before loosing and after the flight duration elapses', () => {
    expect(arrowFlightProgress(waveStart - 1, waveStart)).toBeNull();
    expect(
      arrowFlightProgress(waveStart + ARCHER_VOLLEY_FLIGHT_DURATION_SEC + 1, waveStart),
    ).toBeNull();
  });

  it('runs 0..1 across the flight window', () => {
    expect(arrowFlightProgress(waveStart, waveStart)).toBeCloseTo(0, 5);
    expect(
      arrowFlightProgress(waveStart + ARCHER_VOLLEY_FLIGHT_DURATION_SEC - 0.001, waveStart),
    ).toBeCloseTo(1, 2);
    const mid = arrowFlightProgress(waveStart + ARCHER_VOLLEY_FLIGHT_DURATION_SEC / 2, waveStart);
    expect(mid).toBeGreaterThan(0.4);
    expect(mid).toBeLessThan(0.6);
  });
});

describe('arrowArcHeight', () => {
  it('is zero at loose and landing, peaking at the midpoint', () => {
    expect(arrowArcHeight(0, 9)).toBeCloseTo(0, 5);
    expect(arrowArcHeight(1, 9)).toBeCloseTo(0, 5);
    expect(arrowArcHeight(0.5, 9)).toBeCloseTo(9, 5);
  });
});

describe('arrowTargetScatterRadius', () => {
  it('narrows across successive waves — later waves converge tighter on the crest', () => {
    const radii = Array.from({ length: ARCHER_VOLLEY_WAVE_COUNT }, (_, w) =>
      arrowTargetScatterRadius(w),
    );
    for (let i = 1; i < radii.length; i++) {
      expect(radii[i]).toBeLessThan(radii[i - 1]);
    }
  });
});

describe('archerDrawPose', () => {
  it('rests at zero well outside any volley wave window', () => {
    expect(archerDrawPose(0).draw).toBe(0);
    expect(archerDrawPose(T_ARCHERS + 60).draw).toBe(0);
  });

  it('pulls to a full draw just before a wave looses', () => {
    const waveStart = archerVolleyWaveStart(0);
    const draw = archerDrawPose(waveStart - 0.05).draw;
    expect(draw).toBeLessThan(-0.7);
  });

  it('releases back toward rest after loosing', () => {
    const waveStart = archerVolleyWaveStart(0);
    const atLoose = archerDrawPose(waveStart).draw;
    const afterRelease = archerDrawPose(waveStart + ARCHER_VOLLEY_FLIGHT_DURATION_SEC * 0.5).draw;
    expect(atLoose).toBeLessThan(0);
    expect(afterRelease).toBeCloseTo(0, 1);
  });
});

describe('buildArrowRoster', () => {
  it('caps total arrows at wave count * max-per-wave regardless of archer count', () => {
    const roster = buildArrowRoster(100);
    expect(roster.length).toBe(ARCHER_VOLLEY_WAVE_COUNT * ARCHER_VOLLEY_MAX_ARROWS_PER_WAVE);
  });

  it('shrinks proportionally for a small archer element', () => {
    const roster = buildArrowRoster(4);
    expect(roster.length).toBe(ARCHER_VOLLEY_WAVE_COUNT * 4);
  });

  it('is deterministic for a given archer count', () => {
    const a = buildArrowRoster(16);
    const b = buildArrowRoster(16);
    expect(a).toEqual(b);
  });

  it('assigns each arrow to one of the wave start times', () => {
    const roster = buildArrowRoster(16);
    const validStarts = new Set(
      Array.from({ length: ARCHER_VOLLEY_WAVE_COUNT }, (_, w) => archerVolleyWaveStart(w)),
    );
    for (const arrow of roster) {
      expect(validStarts.has(arrow.waveStart)).toBe(true);
    }
  });

  it('never produces a positive count with zero archers', () => {
    const roster = buildArrowRoster(0);
    expect(roster.length).toBe(ARCHER_VOLLEY_WAVE_COUNT * 1);
  });
});
