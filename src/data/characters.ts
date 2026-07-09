import type { CharacterOrGroup } from './types';

export const CHARACTERS: CharacterOrGroup[] = [
  {
    id: 'david',
    name: 'David',
    kind: 'person',
    summary:
      'Fugitive Judahite commander in Philistine service at Ziklag, soon to be king. In 1 Samuel 30 he returns to the burned town, is nearly stoned by his own men, and leads the pursuit to recover the captives.',
    passageRefs: ['1 Samuel 27', '1 Samuel 30', '2 Samuel 2'],
    claimIds: ['claim-david-historical'],
  },
  {
    id: 'davids-band',
    name: 'David’s six hundred',
    kind: 'group',
    summary:
      'The narrative gives David’s force as six hundred men, with families, based at Ziklag. Two hundred stay exhausted at the brook Besor while four hundred pursue.',
    passageRefs: ['1 Samuel 30:9–10'],
    claimIds: ['claim-600-men', 'claim-dress'],
  },
  {
    id: 'abiathar',
    name: 'Abiathar the priest',
    kind: 'person',
    summary:
      'Son of Ahimelech, survivor of the Nob massacre, who carries the ephod by which David inquires of the LORD before the pursuit (1 Samuel 30:7–8).',
    passageRefs: ['1 Samuel 22:20–23', '1 Samuel 30:7–8'],
    claimIds: [],
  },
  {
    id: 'amalekites',
    name: 'Amalekites',
    kind: 'group',
    summary:
      'Raiders of the desert fringe in the narrative, striking the Negev of the Cherethites, of Judah, and of Caleb, and burning Ziklag. Archaeologically anonymous: no material culture is securely attributed to them.',
    passageRefs: ['1 Samuel 15', '1 Samuel 30'],
    claimIds: ['claim-amalekite-raiders'],
  },
  {
    id: 'philistines',
    name: 'Philistines',
    kind: 'group',
    summary:
      'Coastal-plain city-state culture (Gaza, Ashkelon, Ashdod, Ekron, Gath) of Aegean-connected origin, archaeologically well attested. Overlords of David at Ziklag and victors at Gilboa.',
    passageRefs: ['1 Samuel 27', '1 Samuel 29', '1 Samuel 31'],
    claimIds: [],
  },
  {
    id: 'saul',
    name: 'Saul',
    kind: 'person',
    summary:
      'First king of Israel in the narrative; dies with three sons on Mount Gilboa in 1 Samuel 31. The scale of his kingdom is debated in scholarship.',
    passageRefs: ['1 Samuel 31'],
    claimIds: ['claim-david-historical'],
  },
  {
    id: 'egyptian-servant',
    name: 'The Egyptian servant',
    kind: 'person',
    summary:
      'An abandoned Egyptian slave of an Amalekite, found starving in open country; after food and water he guides David to the raiders’ camp (1 Samuel 30:11–15).',
    passageRefs: ['1 Samuel 30:11–15'],
    claimIds: [],
  },
  {
    id: 'jonathan',
    name: 'Jonathan',
    kind: 'person',
    summary:
      'Saul’s eldest son, David’s covenant friend earlier in the narrative; killed with his brothers by the Philistines on Mount Gilboa (1 Samuel 31:2).',
    passageRefs: ['1 Samuel 31:2'],
    claimIds: ['claim-battle-scale', 'claim-gilboa-topography', 'claim-sons-killed'],
  },
  {
    id: 'abinadab-son-of-saul',
    name: 'Abinadab',
    kind: 'person',
    summary: 'A son of Saul, named among the three killed with him on Mount Gilboa (1 Samuel 31:2).',
    passageRefs: ['1 Samuel 31:2'],
    claimIds: ['claim-battle-scale', 'claim-gilboa-topography', 'claim-sons-killed'],
  },
  {
    id: 'malchi-shua',
    name: 'Malchi-shua',
    kind: 'person',
    summary: 'A son of Saul, named among the three killed with him on Mount Gilboa (1 Samuel 31:2).',
    passageRefs: ['1 Samuel 31:2'],
    claimIds: ['claim-battle-scale', 'claim-gilboa-topography', 'claim-sons-killed'],
  },
  {
    id: 'sauls-armor-bearer',
    name: 'Saul’s armor-bearer',
    kind: 'person',
    summary:
      'Unnamed in the narrative. Asked by the badly wounded Saul to run him through rather than let the Philistines take him; he will not, "for he feared greatly" — the death sequence’s emotional pivot — then follows Saul in death (1 Samuel 31:4–5).',
    passageRefs: ['1 Samuel 31:4–5'],
    claimIds: ['claim-battle-scale', 'claim-gilboa-topography', 'claim-armor-bearer-refusal'],
  },
  {
    id: 'people-of-ziklag',
    name: 'The people of Ziklag',
    kind: 'group',
    summary:
      'The wives, sons, and daughters of David’s band — including Ahinoam and Abigail — carried off alive by the raiders and later recovered intact (1 Samuel 30:2–3, 18–19).',
    passageRefs: ['1 Samuel 30:2–5', '1 Samuel 30:18–19'],
    claimIds: [],
  },
];

export const CHARACTERS_BY_ID: ReadonlyMap<string, CharacterOrGroup> = new Map(
  CHARACTERS.map((c) => [c.id, c]),
);
