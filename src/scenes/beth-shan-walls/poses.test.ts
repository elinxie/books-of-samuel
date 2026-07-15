import { describe, expect, it } from 'vitest';
import {
  displayFormTransform,
  escortWithdrawProgress,
  messengerDepartProgress,
  processionArrivalProgress,
  retrievalStage,
  T_DISPLAY,
  T_EMPTY_WALL,
  T_MESSENGERS,
  T_NEWS_EAST,
  T_NEXT_DAY,
  T_PROCESSION,
  T_RETRIEVAL,
  T_WALL_WATCH,
  torchPresence,
} from './poses';

/**
 * Beat-invariant timing checks against the beat table in
 * src/data/scenes.ts's beth-shan-walls entry (b-next-day 0 / b-procession 20
 * / b-messengers 40 / b-display 55 / b-wall-watch 75 / b-news-east 95 /
 * b-retrieval 115 / b-empty-wall 140). Exercised for both violenceMode
 * values per docs/design/beth-shan-walls-brief.md's treatment table.
 */

describe('processionArrivalProgress (b-next-day to b-procession)', () => {
  it('starts at 0 and reaches the gate by b-procession', () => {
    expect(processionArrivalProgress(T_NEXT_DAY)).toBe(0);
    expect(processionArrivalProgress(T_PROCESSION)).toBeCloseTo(1, 5);
  });

  it('is monotonically non-decreasing', () => {
    let prev = -1;
    for (let t = T_NEXT_DAY; t <= T_PROCESSION; t += 1) {
      const p = processionArrivalProgress(t);
      expect(p).toBeGreaterThanOrEqual(prev);
      prev = p;
    }
  });
});

describe('messengerDepartProgress (b-messengers)', () => {
  it('has not departed before the beat', () => {
    expect(messengerDepartProgress(T_MESSENGERS - 1)).toBe(0);
  });

  it('is gone from view well before the news-east beat', () => {
    expect(messengerDepartProgress(T_NEWS_EAST - 5)).toBeCloseTo(1, 1);
  });
});

describe('escortWithdrawProgress (before the night retrieval)', () => {
  it('the escort has fully withdrawn before b-retrieval — no staged guard presence', () => {
    expect(escortWithdrawProgress(T_RETRIEVAL - 2)).toBeCloseTo(1, 1);
  });
});

describe('displayFormTransform — standard mode', () => {
  it('is not present before b-display', () => {
    const pose = displayFormTransform(T_DISPLAY - 1, 'standard', 0);
    expect(pose.visible).toBe(false);
    expect(pose.heightFrac).toBe(0);
  });

  it('is fastened at the wall top through daylight (b-wall-watch)', () => {
    const pose = displayFormTransform(T_WALL_WATCH, 'standard', 0);
    expect(pose.visible).toBe(true);
    expect(pose.heightFrac).toBeCloseTo(1, 1);
    expect(pose.horizontal).toBe(0);
  });

  it('is lowered and grounded shortly after b-retrieval', () => {
    const pose = displayFormTransform(T_RETRIEVAL + 12, 'standard', 0);
    expect(pose.heightFrac).toBeCloseTo(0, 1);
    expect(pose.horizontal).toBe(1);
  });

  it('is carried away and gone from the wall by b-empty-wall', () => {
    const pose = displayFormTransform(T_EMPTY_WALL, 'standard', 0);
    expect(pose.heightFrac).toBeCloseTo(0, 3);
  });

  it('the four forms stagger rather than moving in perfect lockstep', () => {
    const t = T_DISPLAY + 3;
    const first = displayFormTransform(t, 'standard', 0).heightFrac;
    const last = displayFormTransform(t, 'standard', 3).heightFrac;
    expect(first).not.toBeCloseTo(last, 3);
  });
});

describe('displayFormTransform — reduced mode', () => {
  it('never renders raised on the wall, at any beat', () => {
    for (const t of [T_DISPLAY, T_DISPLAY + 5, T_WALL_WATCH, T_NEWS_EAST]) {
      const pose = displayFormTransform(t, 'reduced', 0);
      expect(pose.visible).toBe(false);
    }
  });

  it('still reads as a bier carried out during the retrieval beat', () => {
    const pose = displayFormTransform(T_RETRIEVAL + 3, 'reduced', 0);
    expect(pose.bierVisible).toBe(true);
    expect(pose.horizontal).toBe(1);
  });
});

describe('retrievalStage', () => {
  it('is approaching before arriving at the wall', () => {
    expect(retrievalStage(T_NEWS_EAST + 2, 0).phase).toBe('approach');
  });

  it('works at the wall foot just after arriving', () => {
    expect(retrievalStage(T_RETRIEVAL + 2, 0).phase).toBe('work');
  });

  it('departs, then is gone well before the scene ends', () => {
    expect(retrievalStage(T_RETRIEVAL + 12, 0).phase).toBe('depart');
    expect(retrievalStage(T_EMPTY_WALL + 5, 0).phase).toBe('gone');
  });

  it('a per-figure arrival delay shifts phase timing without breaking ordering', () => {
    const delay = 3;
    expect(retrievalStage(T_RETRIEVAL, delay).phase).toBe('approach');
  });
});

describe('torchPresence', () => {
  it('is dark by day', () => {
    expect(torchPresence(T_DISPLAY)).toBe(0);
  });

  it('is present through the retrieval night', () => {
    expect(torchPresence(T_RETRIEVAL)).toBeGreaterThan(0.8);
  });

  it('fades out toward the grey pre-dawn of b-empty-wall', () => {
    expect(torchPresence(T_EMPTY_WALL)).toBeLessThan(0.3);
  });
});
