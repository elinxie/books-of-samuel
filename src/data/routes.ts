import type { RouteDef } from './types';

export const ROUTES: RouteDef[] = [
  {
    id: 'route-ziklag-besor',
    name: 'Ziklag to the brook Besor',
    fromLocationId: 'ziklag',
    toLocationId: 'brook-besor',
    summary:
      'The pursuit route of 1 Samuel 30:9–10, heading south/southwest across the northwestern Negev toward the Besor drainage. Its length and course depend on which Ziklag candidate is adopted.',
    approxDistanceKm: { min: 15, max: 25, confidence: 'low' },
    claimIds: ['claim-besor', 'claim-ziklag-location'],
    status: 'planned',
  },
  {
    id: 'route-besor-amalekite-camp',
    name: 'Besor to the Amalekite camp',
    fromLocationId: 'brook-besor',
    toLocationId: 'brook-besor',
    summary:
      'From the wadi to the raiders’ camp, guided by the Egyptian servant (1 Samuel 30:15–16). The camp’s location is entirely unlocated; any placement is speculative.',
    claimIds: ['claim-amalekite-raiders'],
    status: 'planned',
  },
  {
    id: 'route-jabesh-beth-shan',
    name: 'Jabesh-gilead to Beth-shan (night retrieval)',
    fromLocationId: 'jabesh-gilead',
    toLocationId: 'beth-shan',
    summary:
      'The valiant men of Jabesh walk through the night, take the bodies of Saul and his sons from the wall of Beth-shan, and return (1 Samuel 31:11–13). Roughly 15–20 km each way, crossing the Jordan.',
    approxDistanceKm: { min: 15, max: 20, confidence: 'moderate' },
    claimIds: [],
    status: 'planned',
  },
];

export const ROUTES_BY_ID: ReadonlyMap<string, RouteDef> = new Map(ROUTES.map((r) => [r.id, r]));
