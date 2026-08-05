import { HEBRON_TERRAIN } from '../hebron-anointing/terrain';

/**
 * hebron-covenant reuses the exact Hebron terrain built for hebron-anointing
 * — the brief's "Hard continuity rule": this is the same place, a few years
 * later. No new terrain feature is introduced. The northern approach this
 * scene stages (deliberately unshown from hebron-anointing's own
 * southern-approach default viewpoint, per that scene's terrain.ts) sits on
 * the same procedural highland noise the terrain spec always had — it is
 * revealed by this scene's own north-facing road and camera, not by any new
 * geometry. See docs/design/hebron-covenant-brief.md, "Visual composition".
 */
export const HEBRON_COVENANT_TERRAIN = HEBRON_TERRAIN;
