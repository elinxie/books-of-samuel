import { ZIKLAG_TERRAIN } from '../ziklag/terrain';

/**
 * ziklag-lament reuses the exact same terrain as ziklag-aftermath — this is
 * literally the same town, three narrative days later (see the brief,
 * "Resolved design calls"). No new terrain feature is introduced; the
 * ash-darkened scorch zones already baked into ZIKLAG_TERRAIN_SPEC (see
 * ziklag/terrain.ts) are left as-is, since scorched ground doesn't vanish in
 * three days — only the active smoke plumes (SmokeColumns.tsx) are dropped
 * for this scene's "recovering" state.
 */
export const ZIKLAG_LAMENT_TERRAIN = ZIKLAG_TERRAIN;
