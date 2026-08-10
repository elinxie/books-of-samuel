import type { CharacterOrGroup } from './types';

export const CHARACTERS: CharacterOrGroup[] = [
  {
    id: 'david',
    name: 'David',
    kind: 'person',
    summary:
      'Fugitive Judahite commander in Philistine service at Ziklag, soon to be king. In 1 Samuel 30 he returns to the burned town, is nearly stoned by his own men, and leads the pursuit to recover the captives. At Hebron (2 Samuel 3:20–21) he receives Abner’s overture and feasts him, statecraft over vendetta — the same Abner who killed Asahel at Gibeon. When Joab kills Abner anyway (3:26–27), David publicly disavows the act, curses Joab’s own house, and commands citywide mourning — walking behind Abner’s bier himself, lamenting, and fasting until sundown (3:28–35).',
    passageRefs: [
      '1 Samuel 27',
      '1 Samuel 30',
      '2 Samuel 2',
      '2 Samuel 3:20–21',
      '2 Samuel 3:28–35',
    ],
    claimIds: [
      'claim-david-historical',
      'claim-covenant-feast',
      'claim-david-disavowal',
      'claim-abner-funeral',
    ],
  },
  {
    id: 'davids-band',
    name: 'David’s six hundred',
    kind: 'group',
    summary:
      'The narrative gives David’s force as six hundred men, with families, based at Ziklag. Two hundred stay exhausted at the brook Besor while four hundred pursue. Later, an escort/household presence drawn from this same following attends David at the Hebron covenant feast with Abner (2 Samuel 3:20) — no count is narrated for that presence.',
    passageRefs: ['1 Samuel 30:9–10', '2 Samuel 3:20'],
    claimIds: ['claim-600-men', 'claim-dress', 'claim-covenant-cast-scale'],
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
      'Saul’s army commander, who installs Ish-bosheth as king over Israel at Mahanaim and leads Israel’s force to Gibeon. Proposes the champions’ contest at the pool, and kills Asahel in the pursuit that follows — staged as reluctant, per his two on-record warnings to Asahel to turn aside. Later breaks with Ish-bosheth over Rizpah and brings the north’s allegiance to David at Hebron, feasted there and dismissed "in peace" (2 Samuel 3:6–21). Recalled to Hebron under a false privacy pretext and killed by Joab alone inside the gate passage, for the blood of Asahel his brother (3:26–27) — a killing David publicly disavows, mourns, and buries him for at Hebron (3:28–35).',
    passageRefs: ['2 Samuel 2:8–32', '2 Samuel 3:6–21', '2 Samuel 3:26–35'],
    claimIds: [
      'claim-ish-bosheth-installed',
      'claim-gibeon-contest',
      'claim-asahel-death',
      'claim-abner-pursuit-halted',
      'claim-gibeon-battle-scale',
      'claim-abner-break',
      'claim-abner-overture',
      'claim-covenant-feast',
      'claim-abner-killing',
      'claim-abner-funeral',
    ],
  },
  {
    id: 'ish-bosheth',
    name: 'Ish-bosheth',
    kind: 'person',
    summary:
      'Saul’s surviving son, installed by Abner as king over Israel at Mahanaim — a rival, Benjamin-based kingship set against David’s at Hebron. Not himself present at Gibeon; referenced, not depicted in action, in gibeon-pool.',
    passageRefs: ['2 Samuel 2:8–10'],
    claimIds: ['claim-ish-bosheth-installed'],
  },
  {
    id: 'joab',
    name: 'Joab son of Zeruiah',
    kind: 'person',
    summary:
      'David’s army commander at Gibeon, brother of Abishai and Asahel. Halts the pursuit of Abner at the hill of Ammah on Abner’s appeal, sounding the trumpet to call his men back. Returns from a raid to protest David’s reception of Abner (3:22–25), recalls him under a false privacy pretext, and kills him alone inside the Hebron gate passage, for the blood of Asahel his brother (3:27) — then is himself commanded to tear his clothes and mourn before Abner’s bier (3:31), the killer made a public mourner at his victim’s funeral.',
    passageRefs: ['2 Samuel 2:13–32', '2 Samuel 3:22–31'],
    claimIds: [
      'claim-gibeon-contest',
      'claim-abner-pursuit-halted',
      'claim-gibeon-battle-scale',
      'claim-joab-return-protest',
      'claim-abner-killing',
      'claim-abner-funeral',
    ],
  },
  {
    id: 'abishai',
    name: 'Abishai son of Zeruiah',
    kind: 'person',
    summary:
      'Joab’s brother, Asahel’s brother, who joins Joab in the pursuit of Abner to the hill of Ammah. Named alongside Joab as sharing responsibility for Abner’s death at Hebron’s gate (3:30) — present near the gate, though the text attributes the strike to Joab alone.',
    passageRefs: ['2 Samuel 2:24', '2 Samuel 3:30'],
    claimIds: ['claim-abner-pursuit-halted', 'claim-abner-killing'],
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
      'Saul’s daughter, David’s first wife (1 Samuel 18:20–27), given by Saul to Palti son of Laish during David’s exile. David makes her return the condition of his covenant with Abner; she is taken from Paltiel and brought back to David (2 Samuel 3:13–16). Referenced-only: the transfer is carried by caption in hebron-covenant, never staged — placing her at the Hebron feast or in Abner’s party would assert something the text doesn’t say.',
    passageRefs: ['1 Samuel 18:20–27', '2 Samuel 3:13–16'],
    claimIds: ['claim-abner-overture'],
  },
  {
    id: 'paltiel',
    name: 'Paltiel (Palti) son of Laish',
    kind: 'person',
    summary:
      'The man to whom Saul had given Michal; follows her weeping as far as Bahurim before Abner sends him back (2 Samuel 3:15–16). Referenced-only: no geometry, no Bahurim setting, is staged anywhere in the project for him — the human weight of his grief is carried by caption alone.',
    passageRefs: ['2 Samuel 3:15–16'],
    claimIds: ['claim-abner-overture'],
  },
  {
    id: 'rizpah',
    name: 'Rizpah daughter of Aiah',
    kind: 'person',
    summary:
      'Saul’s concubine; Ish-bosheth accuses Abner of going in to her, a charge the narrative reports without adjudicating (2 Samuel 3:7). Referenced-only here: no visualization of Rizpah or the accusation is staged in hebron-covenant. She reappears later in the narrative (2 Samuel 21), far outside this milestone.',
    passageRefs: ['2 Samuel 3:7'],
    claimIds: ['claim-abner-break'],
  },
];

export const CHARACTERS_BY_ID: ReadonlyMap<string, CharacterOrGroup> = new Map(
  CHARACTERS.map((c) => [c.id, c]),
);
