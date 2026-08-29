import type { CharacterOrGroup } from './types';

export const CHARACTERS: CharacterOrGroup[] = [
  {
    id: 'david',
    name: 'David',
    kind: 'person',
    summary:
      'Fugitive Judahite commander in Philistine service at Ziklag, soon to be king. In 1 Samuel 30 he returns to the burned town, is nearly stoned by his own men, and leads the pursuit to recover the captives. At Hebron (2 Samuel 3:20–21) he receives Abner’s overture and feasts him, statecraft over vendetta — the same Abner who killed Asahel at Gibeon. When Joab kills Abner anyway (3:26–27), David publicly disavows the act, curses Joab’s own house, and commands citywide mourning — walking behind Abner’s bier himself, lamenting, and fasting until sundown (3:28–35). Anointed king over all Israel, not Judah alone (5:1–3), he and his men take the Jebusite stronghold of Jerusalem — a city belonging to no tribe — and he makes it his own city, receiving Tyrian cedar and craftsmen to build there (5:6–12). Gathers Israel again to bring up the ark of God from Kiriath-jearim on a new cart (6:1–5); when Uzzah dies at the threshing floor of Nacon, David is both angry and afraid, asking "How can the ark of the LORD come to me?" and diverts it to the house of Obed-edom the Gittite rather than bringing it to himself (6:6–10). Three months later he brings the ark up into the city of David with gladness, sacrificing repeatedly along the way and dancing before the LORD with all his might in a linen ephod (6:12–15); his wife Michal watches from a window and despises him in her heart. After the ark is set in its tent and the people fed, David returns to bless his own household; Michal confronts him over his self-abasement before the female servants, and he answers that it was before the LORD who chose him over her father’s house (6:16, 20–22).',
    passageRefs: [
      '1 Samuel 27',
      '1 Samuel 30',
      '2 Samuel 2',
      '2 Samuel 3:20–21',
      '2 Samuel 3:28–35',
      '2 Samuel 5:1–12',
      '2 Samuel 6:1–10',
      '2 Samuel 6:12–23',
    ],
    claimIds: [
      'claim-david-historical',
      'claim-covenant-feast',
      'claim-david-disavowal',
      'claim-abner-funeral',
      'claim-all-israel-covenant',
      'claim-jerusalem-capture',
      'claim-city-of-david-naming',
      'claim-hiram-building',
      'claim-ark-procession-departure',
      'claim-uzzah-death',
      'claim-david-fear-diversion',
      'claim-ark-arrival-jerusalem',
      'claim-ark-tent-offerings',
      'claim-michal-confrontation',
      'claim-dance-depiction',
    ],
  },
  {
    id: 'davids-band',
    name: 'David’s six hundred',
    kind: 'group',
    summary:
      'The narrative gives David’s force as six hundred men, with families, based at Ziklag. Two hundred stay exhausted at the brook Besor while four hundred pursue. Later, an escort/household presence drawn from this same following attends David at the Hebron covenant feast with Abner (2 Samuel 3:20) — no count is narrated for that presence. At Jerusalem, the same following forms the approach column against the Jebusite stronghold and then the occupying presence inside it (2 Samuel 5:6–9) — again, no count is narrated.',
    passageRefs: ['1 Samuel 30:9–10', '2 Samuel 3:20', '2 Samuel 5:6–9'],
    claimIds: [
      'claim-600-men',
      'claim-dress',
      'claim-covenant-cast-scale',
      'claim-jerusalem-capture',
      'claim-stronghold-cast-scale',
    ],
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
      'Saul’s surviving son, installed by Abner as king over Israel at Mahanaim — a rival, Benjamin-based kingship set against David’s at Hebron. Not himself present at Gibeon; referenced, not depicted in action, in gibeon-pool. His courage fails at the news of Abner’s death (4:1); two of his own captains kill him defenseless in his own house at noon rest and carry his head to David (4:5–8) — the house of Saul’s last king, dead by murder rather than battle. Never staged as a figure anywhere in this project (referenced-only throughout, including in hebron-reckoning, where his death is entirely narrated).',
    passageRefs: ['2 Samuel 2:8–10', '2 Samuel 4:1–12'],
    claimIds: [
      'claim-ish-bosheth-installed',
      'claim-ish-bosheth-assassination',
      'claim-david-judgment',
    ],
  },
  {
    id: 'rechab',
    name: 'Rechab son of Rimmon',
    kind: 'person',
    summary:
      'A captain of one of Ish-bosheth’s raiding bands, a Beerothite of the people of Benjamin (2 Samuel 4:2–3). With his brother Baanah, kills Ish-bosheth in his own house at noon rest, beheads him, and carries the head to David at Hebron expecting reward for avenging him (4:5–8) — a report David treats as confession to murder, not a service. Executed at David’s command; the narrative supplies no further interior life for him beyond his acts and David’s verdict, and this project does not invent any.',
    passageRefs: ['2 Samuel 4:2–3', '2 Samuel 4:5–12'],
    claimIds: ['claim-ish-bosheth-assassination', 'claim-david-judgment'],
  },
  {
    id: 'baanah',
    name: 'Baanah son of Rimmon',
    kind: 'person',
    summary:
      'Rechab’s brother, named alongside him in every verse that mentions either of them (2 Samuel 4:2–3, 5–9, 12) — the two act as a pair throughout, and this project stages them that way, without differentiating their individual roles beyond what the text states.',
    passageRefs: ['2 Samuel 4:2–3', '2 Samuel 4:5–12'],
    claimIds: ['claim-ish-bosheth-assassination', 'claim-david-judgment'],
  },
  {
    id: 'mephibosheth',
    name: 'Mephibosheth son of Jonathan',
    kind: 'person',
    summary:
      'Jonathan’s son, five years old when the news of Saul and Jonathan’s deaths came from Jezreel; his nurse fled with him and he fell and became lame in both feet (2 Samuel 4:4) — the text’s own aside on what remains of the house of Saul, carried by caption exactly where the text places it, referenced-only, with no forward pointer to his later appearance in 2 Samuel 9.',
    passageRefs: ['2 Samuel 4:4'],
    claimIds: ['claim-ish-bosheth-assassination'],
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
      'Saul’s daughter, David’s first wife (1 Samuel 18:20–27), given by Saul to Palti son of Laish during David’s exile. David makes her return the condition of his covenant with Abner; she is taken from Paltiel and brought back to David (2 Samuel 3:13–16) — referenced-only there, the transfer carried by caption in hebron-covenant, never staged, since placing her at the Hebron feast or in Abner’s party would assert something the text doesn’t say. Her first staged appearance in the project comes in ark-into-jerusalem: she watches David dance before the ark from a window and despises him in her heart (6:16), then comes out to confront him over his self-abasement before the female servants when he returns to bless his household (6:20); he answers that it was before the LORD who chose him over her father’s house (6:21–22). The chapter closes noting she had no child to the day of her death (6:23), a bare stated fact with no cause given.',
    passageRefs: ['1 Samuel 18:20–27', '2 Samuel 3:13–16', '2 Samuel 6:16', '2 Samuel 6:20–23'],
    claimIds: ['claim-abner-overture', 'claim-michal-confrontation'],
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
  {
    id: 'jebusites',
    name: 'The Jebusites',
    kind: 'group',
    summary:
      'The inhabitants of the stronghold David takes, unnamed as individuals in the text. They tell David he will not come in, taunting that the blind and the lame would keep him out — nevertheless David takes the stronghold (2 Samuel 5:6–7). The narrative does not say what becomes of them afterward, and this project does not invent an answer; no named Jebusite is staged, and no figure is staged performing the taunt itself.',
    passageRefs: ['2 Samuel 5:6–8'],
    claimIds: [
      'claim-jerusalem-capture',
      'claim-jebusite-stronghold-form',
      'claim-stronghold-cast-scale',
    ],
  },
  {
    id: 'hiram',
    name: 'Hiram king of Tyre',
    kind: 'person',
    summary:
      'King of Tyre, who sends messengers, cedar trees, carpenters, and masons to build David a house (2 Samuel 5:11). The text says nothing about his appearing in person, and this project never stages him as a figure — only his messengers, materials, and craftsmen appear.',
    passageRefs: ['2 Samuel 5:11'],
    claimIds: ['claim-hiram-building'],
  },
  {
    id: 'tyrian-craftsmen',
    name: 'Tyrian carpenters and masons',
    kind: 'group',
    summary:
      'Unnamed craftsmen Hiram sends with cedar trees to build David’s house (2 Samuel 5:11) — rendered with the same undifferentiated dress as every other group in this project (claim-dress), distinguished only by the tools, timber, and stone they are shown handling, per the same no-invented-side-uniforms rule already applied at gibeon-pool.',
    passageRefs: ['2 Samuel 5:11'],
    claimIds: ['claim-hiram-building', 'claim-dress'],
  },
  {
    id: 'uzzah',
    name: 'Uzzah',
    kind: 'person',
    summary:
      'Son of Abinadab, in whose house on the hill at Kiriath-jearim the ark has rested. Drives the new cart alongside his brother Ahio (2 Samuel 6:3). When the oxen stumble at the threshing floor of Nacon, he puts out his hand and takes hold of the ark; the narrative states that the anger of the LORD was kindled against him and God struck him down there for his error, and he died there beside the ark of God (6:6–7). David names the place Perez-uzzah because of this (6:8). The text gives no further detail about him — no age, no prior role, no stated intention beyond steadying the ark.',
    passageRefs: ['2 Samuel 6:3–8'],
    claimIds: [
      'claim-uzzah-death',
      'claim-uzzah-death-depiction',
      'claim-ark-procession-departure',
    ],
  },
  {
    id: 'ahio',
    name: 'Ahio',
    kind: 'person',
    summary:
      'Son of Abinadab, brother of Uzzah. Drives the new cart with him and goes before the ark (2 Samuel 6:3–4). The text stages no further action for him — he is not named again at the threshing floor or afterward.',
    passageRefs: ['2 Samuel 6:3–4'],
    claimIds: ['claim-ark-procession-departure'],
  },
  {
    id: 'obed-edom',
    name: 'Obed-edom the Gittite',
    kind: 'person',
    summary:
      'The man to whose house David diverts the ark after Uzzah’s death, unwilling to bring it to himself in the city of David (2 Samuel 6:10). The ark remains in his house three months, and the LORD blesses him and his whole household (6:11) — the chapter’s own juxtaposition of danger and blessing in the same object. "The Gittite" most plausibly marks an association with Gath, though the text does not explain it further. Referenced again at the opening of the ark’s arrival in Jerusalem (2 Samuel 6:12, outside this scene’s scope).',
    passageRefs: ['2 Samuel 6:10–11'],
    claimIds: ['claim-david-fear-diversion', 'claim-obed-edom-blessing'],
  },
  {
    id: 'nathan',
    name: 'Nathan',
    kind: 'person',
    summary:
      'A prophet in David’s court. When David tells him of his wish to build a house for the ark, Nathan first tells him to go and do all that is in his heart, for the LORD is with him (2 Samuel 7:2–3) — a reasonable pastoral answer, given before Nathan has consulted the LORD. That same night the word of the LORD comes to Nathan and corrects the plan outright: not a house for the LORD from David, but a house — a dynasty — for David from the LORD, an heir, and a throne established forever (7:4–16). Nathan reports the whole oracle back to David the next day, exactly in accordance with all these words and all this vision (7:17). **This is a different person from the identically named son born to David in Jerusalem**, listed among his other sons at 2 Samuel 5:13–16 (card-only there; no character record exists for that Nathan) — the two are never conflated in any caption or record in this project.',
    passageRefs: ['2 Samuel 7:1–17'],
    claimIds: ['claim-nathan-oracle-house-request', 'claim-nathan-oracle'],
  },
];

export const CHARACTERS_BY_ID: ReadonlyMap<string, CharacterOrGroup> = new Map(
  CHARACTERS.map((c) => [c.id, c]),
);
