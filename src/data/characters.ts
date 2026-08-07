import type { CharacterOrGroup } from './types';

export const CHARACTERS: CharacterOrGroup[] = [
  {
    id: 'david',
    name: 'David',
    kind: 'person',
    summary:
      'Fugitive Judahite commander in Philistine service at Ziklag, soon to be king. In 1 Samuel 30 he returns to the burned town, is nearly stoned by his own men, and leads the pursuit to recover the captives. At Hebron he receives Abner — the man who killed Asahel at Gibeon — at his own table anyway, making the return of his wife Michal a condition of Abner’s overture (2 Samuel 3:12–21).',
    passageRefs: ['1 Samuel 27', '1 Samuel 30', '2 Samuel 2', '2 Samuel 3:12–21'],
    claimIds: ['claim-david-historical', 'claim-covenant-feast'],
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
      'Son of Ahimelech, survivor of the Nob massacre, who carries the ephod by which David inquires of the LORD before the pursuit (1 Samuel 30:7–8) and again before the move to Hebron (2 Samuel 2:1, mechanism inferred from the identical earlier practice, not restated in the text).',
    passageRefs: ['1 Samuel 22:20–23', '1 Samuel 30:7–8', '2 Samuel 2:1'],
    claimIds: ['claim-hebron-inquiry'],
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
    summary:
      'A son of Saul, named among the three killed with him on Mount Gilboa (1 Samuel 31:2).',
    passageRefs: ['1 Samuel 31:2'],
    claimIds: ['claim-battle-scale', 'claim-gilboa-topography', 'claim-sons-killed'],
  },
  {
    id: 'malchi-shua',
    name: 'Malchi-shua',
    kind: 'person',
    summary:
      'A son of Saul, named among the three killed with him on Mount Gilboa (1 Samuel 31:2).',
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
  {
    id: 'men-of-jabesh',
    name: 'The men of Jabesh-gilead',
    kind: 'group',
    summary:
      'Unnamed in the text ("all the valiant men"). Having heard what the Philistines did to Saul at Beth-shan, they walk all night, take the bodies of Saul and his sons from the wall, and carry them home to Jabesh — repaying Saul’s earlier rescue of their town (1 Samuel 11). Later commended by David, now anointed king of Judah, for this act (2 Samuel 2:5–7) — not rendered again in hebron-anointing, which stages only David’s side of that exchange.',
    passageRefs: ['1 Samuel 31:11–12a', '1 Samuel 11', '2 Samuel 2:5–7'],
    claimIds: ['claim-jabesh-retrieval'],
  },
  {
    id: 'men-of-judah',
    name: 'The men of Judah',
    kind: 'group',
    summary:
      'Unnamed in the text — no individual elders are invented. Hebron’s own townspeople and a visible elder contingent who come and anoint David king over the house of Judah (2 Samuel 2:4), rendered as a representative civic assembly, not a literal tribal muster.',
    passageRefs: ['2 Samuel 2:4'],
    claimIds: ['claim-judah-anointing', 'claim-judah-assembly-scale', 'claim-dress'],
  },
  {
    id: 'amalekite-messenger',
    name: 'The Amalekite messenger',
    kind: 'person',
    summary:
      'Unnamed man who escapes the rout on Gilboa and reaches David at Ziklag with news of Saul’s death, claiming to have killed him himself. David has him executed for raising a hand against "the LORD’s anointed" — a judgment on the confession itself, not a forensic ruling on what actually happened at Gilboa (contrast his account with the narrator’s own, already rendered in 1 Samuel 31:3–5).',
    passageRefs: ['2 Samuel 1:1–16'],
    claimIds: [
      'claim-amalekite-messenger-account',
      'claim-execution-messenger',
      'claim-lords-anointed-principle',
    ],
  },
  {
    id: 'abner',
    name: 'Abner son of Ner',
    kind: 'person',
    summary:
      'Saul’s army commander, who installs Ish-bosheth as king over Israel at Mahanaim and leads Israel’s force to Gibeon. Proposes the champions’ contest at the pool, and kills Asahel in the pursuit that follows — staged as reluctant, per his two on-record warnings to Asahel to turn aside. Later breaks with Ish-bosheth over the Rizpah accusation (narrated, never adjudicated) and brings his twenty men to Hebron, where he is received at a covenant feast, pledges to gather all Israel to David, and departs in peace (2 Samuel 3:6–21).',
    passageRefs: ['2 Samuel 2:8–32', '2 Samuel 3:6–21'],
    claimIds: [
      'claim-ish-bosheth-installed',
      'claim-gibeon-contest',
      'claim-asahel-death',
      'claim-abner-pursuit-halted',
      'claim-gibeon-battle-scale',
      'claim-abner-break',
      'claim-abner-overture',
      'claim-covenant-feast',
    ],
  },
  {
    id: 'ish-bosheth',
    name: 'Ish-bosheth',
    kind: 'person',
    summary:
      'Saul’s surviving son, installed by Abner as king over Israel at Mahanaim — a rival, Benjamin-based kingship set against David’s at Hebron. Not himself present at Gibeon; referenced, not depicted in action, in gibeon-pool. Later accuses Abner of going in to Rizpah, Saul’s concubine — an accusation the narrative states but never adjudicates — and, fearing Abner, says nothing further; referenced only (never staged) in hebron-covenant (2 Samuel 3:6–11).',
    passageRefs: ['2 Samuel 2:8–10', '2 Samuel 3:6–11'],
    claimIds: ['claim-ish-bosheth-installed', 'claim-abner-break'],
  },
  {
    id: 'joab',
    name: 'Joab son of Zeruiah',
    kind: 'person',
    summary:
      'David’s army commander at Gibeon, brother of Abishai and Asahel. Halts the pursuit of Abner at the hill of Ammah on Abner’s appeal, sounding the trumpet to call his men back.',
    passageRefs: ['2 Samuel 2:13–32'],
    claimIds: ['claim-gibeon-contest', 'claim-abner-pursuit-halted', 'claim-gibeon-battle-scale'],
  },
  {
    id: 'abishai',
    name: 'Abishai son of Zeruiah',
    kind: 'person',
    summary:
      'Joab’s brother, Asahel’s brother, who joins Joab in the pursuit of Abner to the hill of Ammah.',
    passageRefs: ['2 Samuel 2:24'],
    claimIds: ['claim-abner-pursuit-halted'],
  },
  {
    id: 'asahel',
    name: 'Asahel son of Zeruiah',
    kind: 'person',
    summary:
      'Joab’s youngest brother, described as swift-footed. Pursues Abner despite being twice warned to turn aside, and is killed by a backward thrust of Abner’s spear — the project’s first named-character-kills-named-character death, rendered at documentary distance with no wound geometry, per ADR-009. Buried at Bethlehem, in his father’s tomb (2 Samuel 2:32).',
    passageRefs: ['2 Samuel 2:18–23', '2 Samuel 2:32'],
    claimIds: ['claim-asahel-death'],
  },
  {
    id: 'michal',
    name: 'Michal',
    kind: 'person',
    summary:
      'Saul’s daughter and David’s first wife, given to him after he brought Philistine foreskins as a bride-price, then given by Saul to another man during David’s exile. David makes her return a condition of Abner’s overture (2 Samuel 3:13–16). Light, referenced-only entry: her transfer is carried by caption text only, never staged or given geometry, in hebron-covenant.',
    passageRefs: ['2 Samuel 3:13–16'],
    claimIds: ['claim-abner-overture'],
  },
  {
    id: 'paltiel',
    name: 'Paltiel son of Laish (Palti)',
    kind: 'person',
    summary:
      'The man to whom Saul had given Michal during David’s exile. Ordered to surrender her, he follows her weeping as far as Bahurim before Abner sends him back (2 Samuel 3:15–16). Light, referenced-only entry: his grief is carried by caption text only, never staged — Bahurim is unbuilt and unneeded for this milestone.',
    passageRefs: ['2 Samuel 3:15–16'],
    claimIds: ['claim-abner-overture'],
  },
  {
    id: 'rizpah',
    name: 'Rizpah daughter of Aiah',
    kind: 'person',
    summary:
      'Saul’s concubine. Ish-bosheth accuses Abner of going in to her — an accusation the narrative states but never adjudicates, carrying royal-claim overtones common to the political meaning of taking a king’s concubine in the ancient Near East (2 Samuel 3:6–11). Light, referenced-only entry: nothing about her is staged or illustrated in hebron-covenant. She reappears later in the narrative (2 Samuel 21), far outside this milestone.',
    passageRefs: ['2 Samuel 3:6–11'],
    claimIds: ['claim-abner-break'],
  },
];

export const CHARACTERS_BY_ID: ReadonlyMap<string, CharacterOrGroup> = new Map(
  CHARACTERS.map((c) => [c.id, c]),
);
