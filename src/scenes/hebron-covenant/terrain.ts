import { createTerrain, type Terrain } from '../../engine/terrain';
import { HEBRON_TERRAIN_SPEC } from '../hebron-anointing/terrain';

/**
 * Hebron terrain for hebron-covenant: the same place as hebron-anointing, a
 * few years later — this scene reuses `HEBRON_TERRAIN_SPEC` directly rather
 * than defining a new one (brief's "Visual continuity with hebron-anointing
 * is mandatory... do not re-invent Hebron"; ADR-006 permits sharing
 * constants across scene-local layout code). A fresh `Terrain` instance is
 * built from the same spec (each scene owns its own instance, matching every
 * other scene's convention) rather than importing the built terrain object
 * itself.
 */
export const HEBRON_COVENANT_TERRAIN: Terrain = createTerrain(HEBRON_TERRAIN_SPEC);
