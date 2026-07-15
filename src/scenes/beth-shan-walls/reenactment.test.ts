import { describe, expect, it } from 'vitest';
import { buildEscortFigures, escortPose } from './PhilistineEscort';
import { buildRetrievalFigures, retrievalPose } from './RetrievalParty';
import { T_MESSENGERS, T_NEWS_EAST, T_NEXT_DAY, T_PROCESSION, T_RETRIEVAL } from './poses';

/**
 * Choreography checks for the Philistine escort and the men of Jabesh
 * (ADR-007 pure-pose-function pattern, mirroring ziklag/amalekite-camp's
 * reenactment.test.ts). Both pose functions sample the scene's own
 * CatmullRom curves (layout.ts), so these run in a plain node/vitest
 * environment without a renderer, same as ReturningMen.tsx's `figurePose`.
 */

describe('escortPose (Philistine detachment)', () => {
  const figures = buildEscortFigures(12);
  const messenger = figures.find((f) => f.isMessenger)!;
  const guard = figures.find((f) => !f.isMessenger)!;

  it('is far off on the valley road at b-next-day', () => {
    const pose = escortPose(T_NEXT_DAY, guard);
    expect(pose.visible).toBe(true);
    expect(pose.x).toBeLessThan(-150);
  });

  it('has arrived at the gate slot by b-procession', () => {
    const pose = escortPose(T_PROCESSION + 5, guard);
    expect(pose.x).toBeCloseTo(guard.slot[0], 0);
    expect(pose.z).toBeCloseTo(guard.slot[1], 0);
  });

  it('a messenger departs back down the valley road after b-messengers', () => {
    const atGate = escortPose(T_MESSENGERS - 1, messenger);
    const departing = escortPose(T_MESSENGERS + 10, messenger);
    expect(departing.x).toBeLessThan(atGate.x);
  });

  it('a messenger is gone from view well before the night retrieval', () => {
    expect(escortPose(T_RETRIEVAL - 5, messenger).visible).toBe(false);
  });

  it('the non-messenger escort has withdrawn before the night retrieval — no staged guard presence', () => {
    expect(escortPose(T_RETRIEVAL - 2, guard).visible).toBe(false);
  });
});

describe('retrievalPose (men of Jabesh)', () => {
  const figures = buildRetrievalFigures(9);
  const fig = figures[0];

  it('is not yet visible before the news reaches Jabesh', () => {
    expect(retrievalPose(T_NEWS_EAST - 20, fig).visible).toBe(false);
  });

  it('is approaching along the retrieval path after the news crosses at dusk', () => {
    const pose = retrievalPose(T_NEWS_EAST + 2, fig);
    expect(pose.visible).toBe(true);
  });

  it('works (kneel > 0) at the wall foot shortly after arriving', () => {
    const pose = retrievalPose(T_RETRIEVAL + fig.arrivalDelay + 3, fig);
    expect(pose.kneel).toBeGreaterThan(0);
  });

  it('departs back along the retrieval path and is eventually gone', () => {
    const departing = retrievalPose(T_RETRIEVAL + fig.arrivalDelay + 15, fig);
    expect(departing.visible).toBe(true);
    const gone = retrievalPose(T_RETRIEVAL + fig.arrivalDelay + 40, fig);
    expect(gone.visible).toBe(false);
  });

  it('figure rosters are deterministic for a given seed', () => {
    expect(buildRetrievalFigures(9, 100).map((f) => f.workSlot)).toEqual(
      buildRetrievalFigures(9, 100).map((f) => f.workSlot),
    );
  });
});
