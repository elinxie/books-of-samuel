import { createTerrain, type Terrain } from '../../engine/terrain';
import { HEBRON_TERRAIN_SPEC } from '../hebron-anointing/terrain';

/**
 * Hebron terrain for hebron-gate: the same place as hebron-anointing and
 * hebron-covenant — this scene reuses `HEBRON_TERRAIN_SPEC` directly rather
 * than defining a new one (brief's "identical Hebron continuity rule as
 * hebron-covenant... do not re-invent Hebron"). A fresh `Terrain` instance is
 * built from the same spec (each scene owns its own instance, matching every
 * other scene's convention) rather than importing the built terrain object
 * itself.
 */
export const HEBRON_GATE_TERRAIN: Terrain = createTerrain(HEBRON_TERRAIN_SPEC);
