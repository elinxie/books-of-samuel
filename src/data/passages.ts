import type { Passage } from './types';

/**
 * Passage anchors. Summaries are the project's own words. Short ESV excerpts
 * only — the excerpt budget is enforced by tests per the ESV policy in
 * /docs/source-ingestion-policy.md.
 */
export const PASSAGES: Passage[] = [
  {
    id: '1sam-30',
    book: '1 Samuel',
    chapter: 30,
    reference: '1 Samuel 30',
    translationAnchor: 'ESV',
    summary:
      'David and his six hundred return to Ziklag to find it burned by Amalekite raiders and every wife and child carried off alive. Amid grief and talk of stoning him, David strengthens himself in the LORD, inquires by the ephod through Abiathar, and pursues. Two hundred exhausted men stay at the brook Besor; an abandoned Egyptian slave guides the rest to the raiders’ camp. David recovers everyone and everything, and establishes the rule that those who guard the baggage share alike with those who fight.',
    keyExcerpts: [
      { verse: '1 Samuel 30:6', text: 'But David strengthened himself in the LORD his God.' },
      {
        verse: '1 Samuel 30:8',
        text: 'Pursue, for you shall surely overtake and shall surely rescue.',
      },
    ],
    sceneIds: ['ziklag-aftermath', 'besor-crossing', 'amalekite-camp'],
    milestoneId: 'M1',
    status: 'released',
  },
  {
    id: '1sam-31',
    book: '1 Samuel',
    chapter: 31,
    reference: '1 Samuel 31',
    translationAnchor: 'ESV',
    summary:
      'The Philistines defeat Israel on Mount Gilboa. Saul’s sons Jonathan, Abinadab, and Malchi-shua are killed; Saul, wounded by archers, falls on his own sword. The Philistines display the bodies on the wall of Beth-shan, and the men of Jabesh-gilead walk through the night to retrieve and bury them.',
    sceneIds: ['gilboa-battle', 'beth-shan-walls', 'jabesh-burial'],
    milestoneId: 'M3',
    // 2026-07-19: all three scenes released (M3 release pass).
    status: 'released',
  },
  {
    id: '2sam-1',
    book: '2 Samuel',
    chapter: 1,
    reference: '2 Samuel 1',
    translationAnchor: 'ESV',
    summary:
      'An Amalekite brings David news of Saul’s death, claiming to have delivered the final blow, and is executed for it. David laments Saul and Jonathan in the Song of the Bow.',
    // Scene id committed 2026-07-22 (Sonnet, Fable-unavailable fallback, queue
    // #18) before the scene exists in scenes.ts — mirrors the M3 pattern.
    // 2026-08-02 Fable M4 release pass: ziklag-lament → released (queue #19a/b
    // closed), so the passage releases with it.
    sceneIds: ['ziklag-lament'],
    milestoneId: 'M4',
    status: 'released',
  },
  {
    id: '2sam-2',
    book: '2 Samuel',
    chapter: 2,
    reference: '2 Samuel 2',
    translationAnchor: 'ESV',
    summary:
      'David goes up to Hebron and is anointed king over Judah; he commends Jabesh-gilead for burying Saul. Abner installs Ish-bosheth over the northern tribes, and war begins between the houses at the pool of Gibeon.',
    // 2026-08-02 Fable M4 release pass: both scenes (hebron-anointing,
    // gibeon-pool) → released with queue #19c/#19d closed, so the passage
    // releases with them. (The in-progress-per-scene-progress convention
    // adopted 2026-07-22 was confirmed at the 2026-08-02 Fable review.)
    sceneIds: ['hebron-anointing', 'gibeon-pool'],
    milestoneId: 'M4',
    status: 'released',
  },
  {
    id: '2sam-3',
    book: '2 Samuel',
    chapter: 3,
    reference: '2 Samuel 3',
    translationAnchor: 'ESV',
    summary:
      "A long war between the houses of Saul and David, David growing stronger; Abner breaks with Ish-bosheth over an accusation touching Rizpah and brings the north's allegiance to David, on the condition that Michal is returned to him. Abner comes to Hebron with twenty men, is feasted, pledges to gather all Israel to a covenant, and departs in peace — before Joab kills him at the gate, and David publicly disavows the killing.",
    // Shared between hebron-covenant (3:1-21) and hebron-gate (3:22-39) —
    // see docs/design/hebron-covenant-brief.md and
    // docs/design/hebron-gate-brief.md. ESV excerpt budget: hebron-covenant
    // used one quote (3:21a); hebron-gate spends the remaining two (the
    // 3:33b-34a lament core and 3:38), for a shared passage total of three.
    sceneIds: ['hebron-covenant', 'hebron-gate'],
    milestoneId: 'M5',
    // 2026-08-10: hebron-covenant was this passage's first scene to leave
    // `planned`; hebron-gate (built the same day) is its second — status
    // follows the scene, per the M4 in-progress convention (docs/next-run.md
    // 2026-07-22 note). 2026-08-12 Fable M5 release pass: both scenes
    // released, all three quoted spans live-verified (queue #20e) — released.
    status: 'released',
  },
  {
    id: '2sam-4',
    book: '2 Samuel',
    chapter: 4,
    reference: '2 Samuel 4',
    translationAnchor: 'ESV',
    summary:
      'Ish-bosheth’s courage fails at the news of Abner’s death. Two of his own captains, Rechab and Baanah, murder him defenseless in his own house at noon, behead him, and carry the head to David at Hebron expecting reward — the same pattern as the Amalekite messenger at Ziklag, but this time the killing is real. David answers by retelling that earlier judgment, pronounces the two "wicked men" who killed "a righteous man in his own house on his bed," has them executed and their bodies displayed beside the pool of Hebron, and buries Ish-bosheth’s head in the tomb of Abner — the house of Saul’s last king, dead by murder and buried at Hebron, ending the chapter and the milestone.',
    // Fresh passage, hebron-reckoning's own (third and last M5 scene). ESV
    // excerpt budget: one primary quote (4:11a, the verdict) spent in the
    // b-verdict beat caption; the 4:10 Ziklag-retelling fragment is the
    // budget's optional second spend, per the brief. Live-source wording
    // check not possible in this sandbox (no outbound access at build
    // time) — wording is carried as given in the brief/from memory and
    // flagged for a follow-up verification pass, per the project's standing
    // #19b lesson. That verification landed 2026-08-12 (queue #20e): both
    // quoted spans matched live ESV text verbatim, truncation points included.
    // 2026-08-12 Fable M5 release pass: hebron-reckoning released — released.
    sceneIds: ['hebron-reckoning'],
    milestoneId: 'M5',
    status: 'released',
  },
  {
    id: '2sam-5',
    book: '2 Samuel',
    chapter: 5,
    reference: '2 Samuel 5',
    translationAnchor: 'ESV',
    summary:
      'All Israel comes to David at Hebron and anoints him king over the united kingdom; the reign is divided between Hebron and Jerusalem. David and his men take the Jebusite stronghold of Jerusalem — a city belonging to no tribe — and he makes it the city of David, building from the Millo inward. Hiram of Tyre sends cedar, carpenters, and masons to build him a house; more sons are born to him there; and the chapter closes with the Philistines’ response to his kingship in the Valley of Rephaim.',
    // Shared between jerusalem-stronghold (5:1-16) and rephaim-valley
    // (5:17-25) — see docs/design/jerusalem-stronghold-brief.md and
    // docs/design/rephaim-valley-brief.md. ESV excerpt budget: this
    // passage's 3-quote handful is now fully spent — jerusalem-stronghold
    // used two (5:6b's taunt, 5:8a's tsinnôr clause); rephaim-valley (built
    // 2026-08-24) uses the third and last, 5:24's sound in the balsam
    // trees, quoted below and in that scene's b-sound beat caption. Exact
    // ESV wording could not be live-verified this session (this sandbox's
    // outbound access does not reach Bible-text sites and no WebSearch tool
    // was available in this session, unlike the jerusalem-stronghold build)
    // — entered from the build agent's own recollection of a well-known
    // verse, flagged here per the #19(b) precedent for a live-source check
    // before this passage/scene flips to `released`.
    keyExcerpts: [
      {
        verse: '2 Samuel 5:24',
        text: 'the sound of marching in the tops of the balsam trees',
      },
    ],
    sceneIds: ['jerusalem-stronghold', 'rephaim-valley'],
    milestoneId: 'M6',
    status: 'released',
  },
  {
    id: '2sam-6',
    book: '2 Samuel',
    chapter: 6,
    reference: '2 Samuel 6',
    translationAnchor: 'ESV',
    summary:
      'David again gathers all the chosen men of Israel and goes to Baale-judah (Kiriath-jearim) to bring up the ark of God on a new cart, with Uzzah and Ahio, sons of Abinadab, driving it; the procession is genuinely joyful, with songs and instruments. At the threshing floor of Nacon the oxen stumble; Uzzah reaches out and takes hold of the ark, and the LORD strikes him down there — he dies beside the ark of God. David, angry and then afraid, names the place Perez-uzzah and diverts the ark to the house of Obed-edom the Gittite rather than bringing it to Jerusalem. It remains there three months, and the LORD blesses Obed-edom’s household. David later brings the ark up into the City of David with sacrifices, dancing before it in a linen ephod; his wife Michal watches from a window and despises him in her heart. Offerings are made and food distributed to all the people; when David returns to bless his household, Michal confronts him, and the chapter ends noting she had no child to the day of her death.',
    // Shared between perez-uzzah (6:1-11) and ark-into-jerusalem (6:12-23) —
    // see docs/design/perez-uzzah-brief.md and
    // docs/design/ark-into-jerusalem-brief.md, and the M7 scope decision in
    // src/data/milestones.ts. ESV excerpt budget: this passage's 3-quote
    // handful is split explicitly — perez-uzzah spends exactly one (6:9's
    // "How can the ark of the LORD come to me?"), and ark-into-jerusalem
    // spends exactly the remaining two (6:20's rebuke, 6:21-22's reply,
    // below), closing out the passage's whole budget. All three now
    // live-verified against independent ESV sources (ESV.org/BibleHub/
    // Biblia/Bible.com) at the 2026-08-27 M7 sign-off: 6:9 and 6:20 matched
    // the entered text verbatim; 6:21-22 did not — the original entry read
    // "abased in my own eyes," corrected here to the verified "abased in
    // your eyes" (see docs/fable-review-queue.md's ark-into-jerusalem build
    // note and same-day addendum for the full account).
    keyExcerpts: [
      {
        verse: '2 Samuel 6:9',
        text: 'How can the ark of the LORD come to me?',
      },
      {
        verse: '2 Samuel 6:20',
        text: 'How the king of Israel honored himself today, uncovering himself today before the eyes of his servants’ female servants, as one of the vulgar fellows shamelessly uncovers himself!',
      },
      {
        verse: '2 Samuel 6:21–22',
        text: 'I will celebrate before the LORD... I will be abased in your eyes.',
      },
    ],
    sceneIds: ['perez-uzzah', 'ark-into-jerusalem'],
    milestoneId: 'M7',
    status: 'released',
  },
  {
    id: '2sam-7',
    book: '2 Samuel',
    chapter: 7,
    reference: '2 Samuel 7',
    translationAnchor: 'ESV',
    summary:
      'David, settled in his own house and given rest from his surrounding enemies, tells Nathan the prophet that he wishes to build the LORD a house, since he himself dwells in a house of cedar while the ark of God dwells in a tent. Nathan first tells him to go and do all that is in his heart, for the LORD is with him. That same night the word of the LORD comes to Nathan: the LORD has never asked for a house of cedar, and rather than David building the LORD a house, the LORD will build David a house — raising up his offspring, establishing his kingdom, and making his throne sure forever, disciplined as a father disciplines a son but never abandoned by steadfast love as it was withdrawn from Saul. Nathan reports the whole word to David. David goes in and sits before the LORD and prays: an opening question in self-examination, a rehearsal of what the LORD has done and promised, and a petition that the word spoken concerning his house be confirmed and made sure forever.',
    // Sole passage of M8, carried entirely by nathans-oracle — see
    // docs/design/nathans-oracle-brief.md. ESV excerpt budget: 2 of the
    // available 3-quote handful spent (7:16, 7:18b); the brief's optional
    // third excerpt (7:28-29) is deliberately not spent — see claim-david-
    // prayer's notes for why. No WebSearch/WebFetch tool was available this
    // session to check a live ESV source directly, and a direct check
    // confirmed the outbound egress policy also blocks curl to esv.org,
    // biblehub.com, biblegateway.com, and biblia.com (all proxy-level 403s).
    // Both quotes were instead cross-checked against this repo's own
    // reader/ subproject (reader/data/kjv/2-samuel.json,
    // reader/data/web/2-samuel.json — full public-domain KJV/WEB text,
    // already committed, not entered from memory for this check): KJV 7:16
    // reads "...established for ever before thee: thy throne shall be
    // established for ever," and WEB 7:16 reads "...made sure forever
    // before you. Your throne will be established forever" — both confirm
    // "before you/thee," resolving a genuine internal inconsistency in the
    // brief (whose "Timeline beats" section quotes this verse as ending
    // "...before me...," while its "Required source basis" section quotes
    // "...before you..."); this build follows the "before you" reading,
    // corroborated against real text rather than picked from memory alone.
    // WEB 7:18b ("Who am I, Lord Yahweh, and what is my house, that you
    // have brought me this far?") and KJV 7:18b likewise match this
    // passage's ESV wording closely (ESV's "thus far" for WEB's "this
    // far," the expected register difference between the two
    // translations). This is real cross-corroboration against public-domain
    // text already in this repository, not a live ESV-specific source check
    // — the exact ESV wording (as opposed to the KJV/WEB structure it
    // matches) still carries the standard non-blocking live-verification
    // caveat this project applies whenever no ESV-specific live source was
    // reachable.
    keyExcerpts: [
      {
        verse: '2 Samuel 7:16',
        text: 'And your house and your kingdom shall be made sure forever before you. Your throne shall be established forever.',
      },
      {
        verse: '2 Samuel 7:18b',
        text: 'Who am I, O Lord GOD, and what is my house, that you have brought me thus far?',
      },
    ],
    sceneIds: ['nathans-oracle'],
    milestoneId: 'M8',
    status: 'in-progress',
  },
];

export const PASSAGES_BY_ID: ReadonlyMap<string, Passage> = new Map(PASSAGES.map((p) => [p.id, p]));
