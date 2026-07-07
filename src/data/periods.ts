import type { HistoricalPeriod } from './types';

export const PERIODS: HistoricalPeriod[] = [
  {
    id: 'iron-i',
    label: 'Iron Age I',
    approxRange: 'c. 1200–1000 BC',
    approxStartYearBC: 1200,
    approxEndYearBC: 1000,
    summary:
      'Collapse of Late Bronze city-states; wave of small agrarian villages in the central highlands; Philistine settlement on the southern coastal plain. Village-scale society with little monumental building.',
    claimIds: ['claim-chronology'],
  },
  {
    id: 'iron-i-iia-transition',
    label: 'Iron I–IIA transition (setting of 1 Samuel 27–31)',
    approxRange: 'c. 1030–1000 BC',
    approxStartYearBC: 1030,
    approxEndYearBC: 1000,
    summary:
      'The narrative setting of Saul’s last years and David’s time at Ziklag. Politically: an emerging Israelite highland polity under pressure from Philistine city-states, with Amalekite raiding on the southern fringe. Absolute dates for the material culture of this window are disputed between high and low chronologies.',
    claimIds: ['claim-chronology', 'claim-david-historical'],
  },
  {
    id: 'iron-iia',
    label: 'Iron Age IIA',
    approxRange: 'c. 1000–925 BC (conventional)',
    approxStartYearBC: 1000,
    approxEndYearBC: 925,
    summary:
      'The early monarchy period in the conventional chronology (David and Solomon; 2 Samuel). The low chronology moves much of this material into the 9th century, which changes how "Davidic" remains are read.',
    claimIds: ['claim-chronology'],
  },
];

export const PERIODS_BY_ID: ReadonlyMap<string, HistoricalPeriod> = new Map(
  PERIODS.map((p) => [p.id, p]),
);
