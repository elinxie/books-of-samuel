import type { SceneEntityDef } from '../types';
import { CAPTIVE_POS, DAVID_STAGE, EGYPTIAN_WAIT, PEN_CENTERS, STAGE_CENTER } from './layout';

export const AMALEKITE_CAMP_ENTITIES: SceneEntityDef[] = [
  {
    id: 'ent-camp-sprawl',
    title: 'The camp, spread abroad',
    kind: 'settlement',
    position: [0, 5, 20],
    description:
      'Loose clusters around fires over several hundred meters — a raider economy celebrating its spoil, not an army in ranks. No ramparts, no command tent; at dusk the observer reads the camp’s size by its fires, exactly as a scout would. Cluster count and headcount are disclosed design choices; the text gives neither.',
    claimIds: ['claim-camp-sprawl', 'claim-amalekite-raiders', 'claim-camp-scale'],
  },
  {
    id: 'ent-feast-cluster',
    title: 'Eating, drinking, and dancing',
    kind: 'group',
    position: [5, 3, 25],
    description:
      'A feast cluster before the strike: the great spoil of Philistine and Judahite country is being celebrated over fires. The narrative’s picture of pre-strike normalcy is the scene’s baseline (1 Samuel 30:16).',
    claimIds: ['claim-camp-sprawl', 'claim-amalekite-raiders'],
  },
  {
    id: 'ent-shelters',
    title: 'Ridge-awnings and windbreaks (illustrative)',
    kind: 'structure',
    position: [-40, 3, 30],
    description:
      'Deliberately not the classic black goat-hair tent, which is not securely attested this early. Nomadic raider camps leave almost no excavated signature, so these shelter forms are suggestive placeholders — the honesty of this scene depends on saying so.',
    claimIds: ['claim-camp-shelters'],
  },
  {
    id: 'ent-captives',
    title: 'The captives of Ziklag',
    kind: 'group',
    position: [CAPTIVE_POS[0], 3.5, CAPTIVE_POS[1]],
    description:
      'The women, sons, and daughters carried off alive from Ziklag, held as a group among the sprawl. Their recovery — "nothing was missing, small or great" — is the point of the whole pursuit and the resolution of the Ziklag scene’s grief (1 Samuel 30:18–19).',
    claimIds: ['claim-full-recovery', 'claim-ziklag-raided', 'claim-camp-scale'],
  },
  {
    id: 'ent-livestock',
    title: 'Flocks and herds (spoil)',
    kind: 'feature',
    position: [PEN_CENTERS[2].x, 3, PEN_CENTERS[2].z],
    description:
      'Mixed sheep/goat flocks and some cattle, penned near the clusters — the livestock spoil later driven north ahead of the column and named "David’s spoil" (1 Samuel 30:20). Density is illustrative.',
    claimIds: ['claim-livestock-spoil'],
  },
  {
    id: 'ent-camel-flight',
    title: 'The four hundred on camels (rendered ~1:10)',
    kind: 'group',
    position: [95, 5, 10],
    description:
      'The only raiders who escape: four hundred young men who flee on camels from the eastern edge of the sprawl (1 Samuel 30:17). Whether domestic camels were in wide use in the southern Levant this early is disputed — this label carries that dispute. Minimal early tack; no ambient herds anywhere in the scene.',
    claimIds: ['claim-camel-depiction', 'claim-amalekite-raiders'],
  },
  {
    id: 'ent-scout-rise',
    title: 'The scout’s rise',
    kind: 'feature',
    position: [0, 6, -110],
    description:
      'The low rise north of the basin where the Egyptian brings David’s four hundred down at dusk. The specific landform is illustrative — the text locates the camp only "south" of the Besor pursuit line.',
    claimIds: ['claim-strike-timing', 'claim-negev-terrain'],
  },
  {
    id: 'ent-strike',
    title: 'The strike at twilight (onset only)',
    kind: 'feature',
    position: [STAGE_CENTER[0], 4, STAGE_CENTER[1] + 25],
    description:
      'David attacks beginning at twilight, with the fighting continuing into the following evening (1 Samuel 30:17). The scene shows the onset — alarm, scatter, figures crumpling at distance in failing light — and compresses the day of fighting behind an explicit beat card. No blow-by-blow choreography or gore is rendered in any mode.',
    claimIds: ['claim-strike-timing'],
  },
  {
    id: 'ent-david',
    title: 'David (narrative figure)',
    kind: 'person',
    position: [DAVID_STAGE[0], 3, DAVID_STAGE[1]],
    description:
      'Leads the four hundred down from the rise, through the strike, and north again with everything the Amalekites took. A principal-detail procedural rig continuing his Ziklag and Besor markers; label-based, not a portrait.',
    claimIds: ['claim-david-historical', 'claim-dress'],
  },
  {
    id: 'ent-egyptian-guide',
    title: 'The Egyptian guide',
    kind: 'person',
    position: [EGYPTIAN_WAIT[0], 3, EGYPTIAN_WAIT[1]],
    description:
      'The abandoned slave revived at the Besor, keeping his bargain: he brings the force down to the camp (1 Samuel 30:15–16). The text does not put him in the fight — he waits at the staging line, and after the time-compression card his narrative role is over.',
    claimIds: ['claim-egyptian-servant', 'claim-dress'],
  },
  {
    id: 'ent-drive-north',
    title: 'North: back toward the Besor',
    kind: 'route',
    position: [-6, 5, -100],
    description:
      'The way home. On the next evening the recovered captives walk north with the column, the flocks and herds driven ahead (1 Samuel 30:18–20) — toward the two hundred waiting at the brook Besor.',
    claimIds: ['claim-full-recovery', 'claim-livestock-spoil'],
  },
];
