#!/usr/bin/env node
/**
 * Builds sources/source-index.json from sources/source-cards/*.json.
 * Run after adding or editing a source card. Checked by
 * src/data/sourceCards.test.ts to keep the index from drifting.
 */
import { readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const cardsDir = join(process.cwd(), 'sources', 'source-cards');
const outPath = join(process.cwd(), 'sources', 'source-index.json');

const files = readdirSync(cardsDir)
  .filter((f) => f.endsWith('.json'))
  .sort();

const cards = files.map((file) => {
  const raw = JSON.parse(readFileSync(join(cardsDir, file), 'utf8'));
  return {
    id: raw.id,
    title: raw.title,
    sourceType: raw.sourceType,
    copyrightStatus: raw.copyrightStatus,
  };
});

const index = {
  count: cards.length,
  cards,
};

writeFileSync(outPath, JSON.stringify(index, null, 2) + '\n');
console.log(`Wrote ${cards.length} card entries to sources/source-index.json`);
