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
      'A long war between the houses of Saul and David, with David steadily growing stronger. Abner, having quarreled with Ish-bosheth over Rizpah, defects, negotiates Michal’s return, and secures the north’s own consent before coming to Hebron with twenty men. David feasts him; Abner pledges to bring all Israel over to David, and departs in peace — the first of the chapter’s three repetitions of that phrase, before it tells what Joab did.',
    // First scene of this passage (hebron-covenant) leaves `planned` at this
    // build — status follows the scene-progress convention confirmed
    // 2026-07-22/2026-08-02 (M4 precedent).
    sceneIds: ['hebron-covenant', 'hebron-gate'],
    milestoneId: 'M5',
    status: 'in-progress',
  },
  {
    id: '2sam-4',
    book: '2 Samuel',
    chapter: 4,
    reference: '2 Samuel 4',
    translationAnchor: 'ESV',
    summary:
      'Ish-bosheth’s courage fails at the news of Abner’s death. Two of his own captains, Rechab and Baanah, assassinate him in his bed at noon rest, behead him, and carry the head to David at Hebron expecting reward. David answers by retelling his own execution of the Amalekite messenger at Ziklag, judges Ish-bosheth "a righteous man" wrongly killed, has the two executed, and buries the head in Abner’s tomb at Hebron — the house of Saul’s last king dead and buried at the very place David reigns, with every death that clears his path once again publicly condemned.',
    keyExcerpts: [
      {
        verse: '2 Samuel 4:10',
        text: "when one told me, 'Behold, Saul is dead,' and thought he was bringing good news, I seized him and killed him at Ziklag",
      },
      {
        verse: '2 Samuel 4:11',
        text: 'How much more, when wicked men have killed a righteous man in his own house on his bed...',
      },
    ],
    // First (and, per docs/design/hebron-reckoning-brief.md, only) scene of
    // this passage — status follows the scene-progress convention confirmed
    // 2026-07-22/2026-08-02 (M4/M5 precedent).
    sceneIds: ['hebron-reckoning'],
    milestoneId: 'M5',
    status: 'in-progress',
  },
];

export const PASSAGES_BY_ID: ReadonlyMap<string, Passage> = new Map(PASSAGES.map((p) => [p.id, p]));
