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
      'A long war between the houses of Saul and David ends by defection, not battle. Abner, who made Ish-bosheth king, breaks with him after being accused of taking Saul’s concubine Rizpah, and opens negotiations with David — who makes the return of his wife Michal a condition. Abner brings his twenty men to Hebron; David receives him with a feast, and Abner pledges to gather all Israel to David before departing in peace. Joab, returning from a raid, protests the reception and secretly recalls Abner; drawn aside into the midst of the gate, Abner is killed — for the blood of Asahel his brother. David publicly disavows the killing, curses Joab’s house, and leads the mourning: Abner is buried at Hebron with a lament and a fast until sundown, and the people understand it was not the king’s will.',
    // '2sam-3' committed 2026-08-07 (Sonnet, threejs-engineer, per
    // hebron-covenant brief) before hebron-gate existed; hebron-gate (built in
    // the same session sequence, per its own brief) is the scene that spends
    // this passage's ESV excerpt budget — hebron-covenant deliberately spent
    // none of it (see claim-covenant-feast's notes). Exact ESV wording could
    // not be re-verified against a live source at this build time (network
    // egress to esv.org/biblegateway.com is blocked by this session's proxy
    // policy, and no WebFetch tool was available) — both excerpts below are
    // transcribed from the agent's own trained knowledge of the ESV text,
    // cross-checked internally for consistency, not from a live fetch. This
    // is a known deviation from the #19b lesson's live-source-check
    // instruction; flagged for a citation-verification pass (mirroring the
    // M3 release-gate pattern) before this scene ships `released`.
    keyExcerpts: [
      {
        verse: '2 Samuel 3:33–34',
        text: 'Should Abner die as a fool dies? Your hands were not bound; your feet were not fettered;',
      },
      {
        verse: '2 Samuel 3:38',
        text: 'Do you not know that a prince and a great man has fallen this day in Israel?',
      },
    ],
    sceneIds: ['hebron-covenant', 'hebron-gate'],
    milestoneId: 'M5',
    status: 'in-progress',
  },
];

export const PASSAGES_BY_ID: ReadonlyMap<string, Passage> = new Map(PASSAGES.map((p) => [p.id, p]));
