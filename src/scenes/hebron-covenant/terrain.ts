import { HEBRON_TERRAIN } from '../hebron-anointing/terrain';

/**
 * hebron-covenant reuses the exact same terrain as hebron-anointing — this is
 * literally the same place, a few years later (see the brief, "Visual
 * composition": "do not re-invent Hebron. Reuse the hebron-anointing terrain
 * spec and layout constants"). No new terrain feature is introduced; the town
 * mound, spring-fed valley, approach ridge, and eastward messenger-road fall
 * all carry over unchanged. This scene's own north-side approach/departure
 * road (layout.ts's NORTH_ROAD_CURVE) is a road overlay only, not a new
 * landform.
 */
export const HEBRON_COVENANT_TERRAIN = HEBRON_TERRAIN;
