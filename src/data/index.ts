export * from './types';
export { CLAIMS, CLAIMS_BY_ID } from './claims';
export { PERIODS, PERIODS_BY_ID } from './periods';
export { LOCATIONS, LOCATIONS_BY_ID } from './locations';
export { CHARACTERS, CHARACTERS_BY_ID } from './characters';
export { ROUTES, ROUTES_BY_ID } from './routes';
export { PASSAGES, PASSAGES_BY_ID } from './passages';
export { SCENES, SCENES_BY_ID, DEFAULT_SCENE_ID } from './scenes';
export { ASSETS, ASSETS_BY_ID } from './assets';
export { MILESTONES, MILESTONES_BY_ID } from './milestones';
export { FEATURES } from './features';
export { SOURCE_CARDS, SOURCE_CARDS_BY_ID, sourceCardSchema } from './sourceCards';

import { CLAIMS_BY_ID } from './claims';
import { SOURCE_CARDS_BY_ID } from './sourceCards';
import type { ReconstructionClaim, SourceCard } from './types';

export function resolveClaims(claimIds: string[]): ReconstructionClaim[] {
  return claimIds
    .map((id) => CLAIMS_BY_ID.get(id))
    .filter((c): c is ReconstructionClaim => Boolean(c));
}

export function resolveSources(sourceIds: string[]): SourceCard[] {
  return sourceIds
    .map((id) => SOURCE_CARDS_BY_ID.get(id))
    .filter((s): s is SourceCard => Boolean(s));
}
