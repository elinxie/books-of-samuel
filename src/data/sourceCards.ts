import { z } from 'zod';
import type { SourceCard } from './types';

/**
 * Runtime schema for source cards. Canonical records are JSON files in
 * /sources/source-cards/, loaded eagerly at build time via import.meta.glob.
 * Tests validate every card against this schema.
 */
export const sourceCardSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  url: z.string().url().optional(),
  author: z.string().optional(),
  publisher: z.string().optional(),
  datePublished: z.string().optional(),
  dateAccessed: z.string().min(4),
  sourceType: z.enum([
    'biblical-text',
    'archaeology',
    'historical-geography',
    'material-culture',
    'scholarly-article',
    'documentation',
    'reference',
    'other',
  ]),
  copyrightStatus: z.enum(['public-domain', 'licensed', 'copyrighted-limited-use', 'unknown']),
  allowedUseNotes: z.string().min(1),
  summary: z.string().min(1),
  relevantPassages: z.array(z.string()),
  extractedClaims: z.array(z.string()),
  confidenceNotes: z.string(),
});

const modules = import.meta.glob('/sources/source-cards/*.json', {
  eager: true,
  import: 'default',
}) as Record<string, unknown>;

export const SOURCE_CARDS: SourceCard[] = Object.values(modules)
  .map((raw) => sourceCardSchema.parse(raw) as SourceCard)
  .sort((a, b) => a.id.localeCompare(b.id));

export const SOURCE_CARDS_BY_ID: ReadonlyMap<string, SourceCard> = new Map(
  SOURCE_CARDS.map((s) => [s.id, s]),
);
