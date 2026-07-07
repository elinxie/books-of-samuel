import { describe, expect, it } from 'vitest';
import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { SOURCE_CARDS, sourceCardSchema } from './sourceCards';
import { CLAIMS_BY_ID } from './claims';

const CARDS_DIR = join(process.cwd(), 'sources', 'source-cards');
const INDEX_PATH = join(process.cwd(), 'sources', 'source-index.json');

describe('source cards', () => {
  it('every JSON card on disk validates against the schema', () => {
    const files = readdirSync(CARDS_DIR).filter((f) => f.endsWith('.json'));
    expect(files.length).toBeGreaterThan(0);
    for (const file of files) {
      const raw = JSON.parse(readFileSync(join(CARDS_DIR, file), 'utf8'));
      const result = sourceCardSchema.safeParse(raw);
      expect(result.success, `${file}: ${result.success ? '' : result.error.message}`).toBe(true);
    }
  });

  it('card ids are unique and match their filenames', () => {
    const ids = SOURCE_CARDS.map((c) => c.id);
    expect(new Set(ids).size).toBe(ids.length);
    const files = readdirSync(CARDS_DIR).filter((f) => f.endsWith('.json'));
    for (const file of files) {
      const raw = JSON.parse(readFileSync(join(CARDS_DIR, file), 'utf8'));
      expect(`${raw.id}.json`).toBe(file);
    }
  });

  it('extractedClaims reference existing claims', () => {
    for (const card of SOURCE_CARDS) {
      for (const claimId of card.extractedClaims) {
        expect(CLAIMS_BY_ID.has(claimId), `card ${card.id} → missing claim ${claimId}`).toBe(true);
      }
    }
  });

  it('source-index.json is in sync (run `npm run build:sources` after editing cards)', () => {
    const index = JSON.parse(readFileSync(INDEX_PATH, 'utf8')) as {
      count: number;
      cards: { id: string }[];
    };
    const indexIds = index.cards.map((c) => c.id).sort();
    const cardIds = SOURCE_CARDS.map((c) => c.id).sort();
    expect(indexIds).toEqual(cardIds);
    expect(index.count).toBe(cardIds.length);
  });
});
