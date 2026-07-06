import { describe, expect, it } from 'vitest';
import {
  ASSETS,
  ASSETS_BY_ID,
  CHARACTERS,
  CLAIMS,
  CLAIMS_BY_ID,
  FEATURES,
  LOCATIONS,
  MILESTONES_BY_ID,
  PASSAGES,
  PASSAGES_BY_ID,
  PERIODS_BY_ID,
  ROUTES,
  LOCATIONS_BY_ID,
  SCENES,
  SCENES_BY_ID,
  SOURCE_CARDS_BY_ID,
} from './index';
import { ZIKLAG_ENTITIES } from '../scenes/ziklag/entities';

/**
 * Referential integrity across the data model: every visual element must trace
 * to claims, every claim to sources, and the ESV excerpt budget must hold.
 */

function uniqueIds(items: { id: string }[]): void {
  const ids = items.map((i) => i.id);
  expect(new Set(ids).size).toBe(ids.length);
}

describe('registry id uniqueness', () => {
  it('has unique ids everywhere', () => {
    uniqueIds(CLAIMS);
    uniqueIds(PASSAGES);
    uniqueIds(SCENES);
    uniqueIds(LOCATIONS);
    uniqueIds(CHARACTERS);
    uniqueIds(ROUTES);
    uniqueIds(ASSETS);
    uniqueIds(FEATURES);
    uniqueIds(ZIKLAG_ENTITIES);
  });
});

describe('claims', () => {
  it('every claim cites at least one existing source card', () => {
    for (const claim of CLAIMS) {
      expect(claim.sourceIds.length, `claim ${claim.id} has no sources`).toBeGreaterThan(0);
      for (const sid of claim.sourceIds) {
        expect(SOURCE_CARDS_BY_ID.has(sid), `claim ${claim.id} cites missing source ${sid}`).toBe(
          true,
        );
      }
    }
  });

  it('scholarly views cite existing sources', () => {
    for (const claim of CLAIMS) {
      for (const view of claim.scholarlyViews ?? []) {
        for (const sid of view.sourceIds) {
          expect(SOURCE_CARDS_BY_ID.has(sid), `view ${view.id} cites missing source ${sid}`).toBe(
            true,
          );
        }
      }
    }
  });
});

describe('scenes', () => {
  it('references resolve (passages, location, period, milestone, claims, assets)', () => {
    for (const scene of SCENES) {
      for (const pid of scene.passageIds) {
        expect(PASSAGES_BY_ID.has(pid), `scene ${scene.id} missing passage ${pid}`).toBe(true);
      }
      expect(LOCATIONS_BY_ID.has(scene.locationId), `scene ${scene.id} location`).toBe(true);
      expect(PERIODS_BY_ID.has(scene.periodId), `scene ${scene.id} period`).toBe(true);
      expect(MILESTONES_BY_ID.has(scene.milestoneId), `scene ${scene.id} milestone`).toBe(true);
      for (const cid of scene.claimIds) {
        expect(CLAIMS_BY_ID.has(cid), `scene ${scene.id} missing claim ${cid}`).toBe(true);
      }
      for (const aid of scene.assetIds) {
        expect(ASSETS_BY_ID.has(aid), `scene ${scene.id} missing asset ${aid}`).toBe(true);
      }
    }
  });

  it('released scenes are playable: duration, sorted beats, viewpoints', () => {
    for (const scene of SCENES.filter((s) => s.status === 'released')) {
      expect(scene.durationSec).toBeGreaterThan(0);
      expect(scene.beats.length).toBeGreaterThan(0);
      expect(scene.viewpoints.length).toBeGreaterThan(0);
      const times = scene.beats.map((b) => b.timeSec);
      expect([...times].sort((a, b) => a - b)).toEqual(times);
      expect(Math.max(...times)).toBeLessThanOrEqual(scene.durationSec);
      for (const beat of scene.beats) {
        expect(beat.caption.length).toBeGreaterThan(0);
        expect(beat.passageRef).toMatch(/Samuel/);
      }
    }
  });
});

describe('passages and the ESV excerpt budget', () => {
  it('passage references resolve', () => {
    for (const p of PASSAGES) {
      expect(MILESTONES_BY_ID.has(p.milestoneId), `passage ${p.id} milestone`).toBe(true);
      for (const sid of p.sceneIds) {
        expect(SCENES_BY_ID.has(sid), `passage ${p.id} missing scene ${sid}`).toBe(true);
      }
    }
  });

  it('short-excerpt policy: max 3 excerpts, each ≤ 200 chars, ≤ 500 total per passage', () => {
    for (const p of PASSAGES) {
      const excerpts = p.keyExcerpts ?? [];
      expect(excerpts.length, `${p.id} excerpt count`).toBeLessThanOrEqual(3);
      let total = 0;
      for (const e of excerpts) {
        expect(e.text.length, `${p.id} excerpt too long`).toBeLessThanOrEqual(200);
        total += e.text.length;
      }
      expect(total, `${p.id} total excerpt budget`).toBeLessThanOrEqual(500);
    }
  });
});

describe('locations, routes, characters', () => {
  it('locations resolve scenes/claims and disputed sites carry multiple views', () => {
    for (const loc of LOCATIONS) {
      for (const sid of loc.sceneIds) {
        expect(SCENES_BY_ID.has(sid), `location ${loc.id} missing scene ${sid}`).toBe(true);
      }
      for (const cid of loc.claimIds) {
        expect(CLAIMS_BY_ID.has(cid), `location ${loc.id} missing claim ${cid}`).toBe(true);
      }
      if (loc.identification.disputed) {
        expect(
          loc.identification.views.length,
          `${loc.id} is disputed but lists < 2 views`,
        ).toBeGreaterThanOrEqual(2);
      }
      for (const view of loc.identification.views) {
        for (const sid of view.sourceIds) {
          expect(SOURCE_CARDS_BY_ID.has(sid), `location view ${view.id} source ${sid}`).toBe(true);
        }
      }
    }
  });

  it('routes connect existing locations', () => {
    for (const r of ROUTES) {
      expect(LOCATIONS_BY_ID.has(r.fromLocationId), `route ${r.id} from`).toBe(true);
      expect(LOCATIONS_BY_ID.has(r.toLocationId), `route ${r.id} to`).toBe(true);
      for (const cid of r.claimIds) {
        expect(CLAIMS_BY_ID.has(cid), `route ${r.id} claim ${cid}`).toBe(true);
      }
    }
  });

  it('characters resolve claims', () => {
    for (const c of CHARACTERS) {
      expect(c.passageRefs.length).toBeGreaterThan(0);
      for (const cid of c.claimIds) {
        expect(CLAIMS_BY_ID.has(cid), `character ${c.id} claim ${cid}`).toBe(true);
      }
    }
  });
});

describe('assets and placeholder discipline', () => {
  it('every placeholder documents why, requirements, and a replacement milestone', () => {
    for (const a of ASSETS.filter((a) => a.placeholder)) {
      expect(a.whyTemporary, `${a.id} whyTemporary`).toBeTruthy();
      expect(a.historicalRequirements, `${a.id} historicalRequirements`).toBeTruthy();
      expect(a.replacementMilestoneId, `${a.id} replacementMilestoneId`).toBeTruthy();
      expect(
        MILESTONES_BY_ID.has(a.replacementMilestoneId!),
        `${a.id} milestone ${a.replacementMilestoneId}`,
      ).toBe(true);
    }
  });
});

describe('features and scene entities', () => {
  it('features reference existing milestones', () => {
    for (const f of FEATURES) {
      expect(MILESTONES_BY_ID.has(f.milestoneId), `feature ${f.id} milestone`).toBe(true);
    }
  });

  it('Ziklag entity labels resolve to claims', () => {
    for (const e of ZIKLAG_ENTITIES) {
      for (const cid of e.claimIds) {
        expect(CLAIMS_BY_ID.has(cid), `entity ${e.id} claim ${cid}`).toBe(true);
      }
    }
  });
});
