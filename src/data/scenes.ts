import type { SceneDef } from './types';

export const SCENES: SceneDef[] = [
  {
    id: 'ziklag-aftermath',
    title: 'Ziklag, burned — the return of the six hundred',
    passageIds: ['1sam-30'],
    locationId: 'ziklag',
    periodId: 'iron-i-iia-transition',
    milestoneId: 'M1',
    status: 'released',
    synopsis:
      'A small Negev-frontier town smolders after an Amalekite raid. David and his six hundred arrive from the north, find their families gone, grieve, nearly turn on David, and finally set out south toward the brook Besor.',
    durationSec: 150,
    beats: [
      {
        id: 'b-smoke',
        timeSec: 0,
        title: 'Ziklag, burned',
        caption:
          'Amalekite raiders have struck the Negev while the town’s fighting men were away. Ziklag lies burned; its people have been carried off alive, not killed. (1 Samuel 30:1–2)',
        passageRef: '1 Samuel 30:1–2',
      },
      {
        id: 'b-return',
        timeSec: 10,
        title: 'The six hundred return',
        caption:
          'On the third day David and his men come in from the north, from the Philistine muster at Aphek, and find the town in smoke. (1 Samuel 30:1, 3)',
        passageRef: '1 Samuel 30:1–3',
      },
      {
        id: 'b-grief',
        timeSec: 55,
        title: 'Grief',
        caption:
          'The men raise their voices and weep for their wives, sons, and daughters, until there is no strength left in them to weep. (1 Samuel 30:4–5)',
        passageRef: '1 Samuel 30:4–5',
      },
      {
        id: 'b-mutiny',
        timeSec: 85,
        title: 'Bitterness turns on David',
        caption:
          'Grief hardens into anger: the men speak of stoning David, each bitter in soul for his own family. (1 Samuel 30:6)',
        passageRef: '1 Samuel 30:6',
      },
      {
        id: 'b-strengthen',
        timeSec: 105,
        title: 'David strengthens himself',
        caption: '“But David strengthened himself in the LORD his God.” (1 Samuel 30:6, ESV)',
        passageRef: '1 Samuel 30:6',
      },
      {
        id: 'b-ephod',
        timeSec: 122,
        title: 'Inquiry by the ephod',
        caption:
          'David summons Abiathar the priest, who brings the ephod. David inquires whether to pursue; the answer: pursue, overtake, rescue. (1 Samuel 30:7–8)',
        passageRef: '1 Samuel 30:7–8',
      },
      {
        id: 'b-depart',
        timeSec: 136,
        title: 'Pursuit toward the Besor',
        caption:
          'David and his six hundred set out south toward the brook Besor, on the trail of the raiders. (1 Samuel 30:9)',
        passageRef: '1 Samuel 30:9',
      },
    ],
    viewpoints: [
      {
        id: 'vp-overlook',
        label: 'Overlook (elevated)',
        position: [120, 26, -160],
        lookAt: [0, 6, 0],
      },
      { id: 'vp-gate', label: 'North gate approach', position: [6, 0, -95], lookAt: [0, 4, -40] },
      { id: 'vp-plaza', label: 'Settlement center', position: [-14, 0, 14], lookAt: [2, 2, -6] },
      {
        id: 'vp-south-road',
        label: 'Southern road (toward Besor)',
        position: [-8, 2, 130],
        lookAt: [0, 6, 20],
      },
    ],
    claimIds: [
      'claim-ziklag-raided',
      'claim-ziklag-location',
      'claim-ziklag-scale',
      'claim-oval-plan',
      'claim-mudbrick',
      'claim-four-room',
      'claim-600-men',
      'claim-david-historical',
      'claim-negev-terrain',
      'claim-besor',
      'claim-agriculture',
      'claim-dress',
      'claim-wall-gate',
      'claim-well',
      'claim-time-of-day',
      'claim-smoke-duration',
    ],
    assetIds: [
      'asset-terrain-negev',
      'asset-house-block',
      'asset-perimeter-wall',
      'asset-gate-simple',
      'asset-figure-procedural',
      'asset-david-marker',
      'asset-smoke-particles',
      'asset-vegetation-scrub',
      'asset-olive-tree',
      'asset-rocks',
      'asset-well',
      'asset-threshing-floor',
      'asset-field-plots',
    ],
  },
  {
    id: 'besor-crossing',
    title: 'The brook Besor — two hundred stay behind',
    passageIds: ['1sam-30'],
    locationId: 'brook-besor',
    periodId: 'iron-i-iia-transition',
    milestoneId: 'M2',
    status: 'released',
    synopsis:
      'The pursuit reaches the great wadi of the western Negev. Two hundred men too exhausted to cross stay with the baggage; four hundred press on. Nearby, an abandoned Egyptian slave is found and revived — and days later, back at the same ford, David rules that all share the spoil alike.',
    durationSec: 150,
    beats: [
      {
        id: 'b-arrive',
        timeSec: 0,
        title: 'The wadi',
        caption:
          'The pursuit from Ziklag reaches the brook Besor, the great wadi of the western Negev. Three days of marching lie behind the six hundred; the far bank lies ahead. (1 Samuel 30:9)',
        passageRef: '1 Samuel 30:9',
      },
      {
        id: 'b-stay',
        timeSec: 22,
        title: 'Two hundred stay',
        caption:
          'Two hundred men can go no farther. They remain with the baggage on the near bank — spent, not unwilling. (1 Samuel 30:9–10)',
        passageRef: '1 Samuel 30:9–10',
      },
      {
        id: 'b-cross',
        timeSec: 40,
        title: 'Four hundred cross',
        caption: 'David and four hundred men ford the wadi and press on south. (1 Samuel 30:10)',
        passageRef: '1 Samuel 30:10',
      },
      {
        id: 'b-egyptian-found',
        timeSec: 58,
        title: 'A man in the open country',
        caption:
          'Out on the open ground they come upon an Egyptian — a slave abandoned by his Amalekite master three days earlier, when he fell sick. (1 Samuel 30:11, 13)',
        passageRef: '1 Samuel 30:11–13',
      },
      {
        id: 'b-revival',
        timeSec: 74,
        title: 'Bread, water, figs, raisins',
        caption:
          'They give him bread and water, dried figs pressed into a cake, and two bunches of raisins. After three days without food or drink, strength returns to him. (1 Samuel 30:11–12)',
        passageRef: '1 Samuel 30:11–12',
      },
      {
        id: 'b-oath',
        timeSec: 92,
        title: 'The oath and the intelligence',
        caption:
          'The Egyptian tells of the raid, and asks an oath: that David will neither kill him nor return him to his master. Then he agrees to lead them down to the raiders. (1 Samuel 30:13–15)',
        passageRef: '1 Samuel 30:13–15',
      },
      {
        id: 'b-depart-south',
        timeSec: 108,
        title: 'South, guided',
        caption:
          'Guided by the Egyptian, the four hundred move south toward the Amalekite camp. (1 Samuel 30:15–16)',
        passageRef: '1 Samuel 30:15–16',
      },
      {
        id: 'b-return',
        timeSec: 122,
        title: 'Days later — the return',
        caption:
          'Time passes: the battle is fought far to the south (see the Amalekite camp scene). Days later the column returns north to the Besor, driving flocks and herds, and the two hundred come out to meet them. (1 Samuel 30:20–21)',
        passageRef: '1 Samuel 30:20–21',
      },
      {
        id: 'b-spoil-ruling',
        timeSec: 136,
        title: 'Share and share alike',
        caption:
          'Some of the fighters would deny the two hundred any spoil beyond their families. David refuses: those who stayed by the baggage share alike with those who went to battle. The narrative marks it as a statute in Israel from that day forward. (1 Samuel 30:22–25)',
        passageRef: '1 Samuel 30:22–25',
      },
    ],
    viewpoints: [
      {
        id: 'vp-north-bluff',
        label: 'North bluff (overlook)',
        position: [40, 24, -120],
        lookAt: [0, 0, 0],
      },
      { id: 'vp-ford', label: 'The ford', position: [0, 1, -8], lookAt: [10, 0, 40] },
      {
        id: 'vp-laager',
        label: 'Baggage camp (north bank)',
        position: [-45, 4, -60],
        lookAt: [0, 0, -20],
      },
      {
        id: 'vp-south-field',
        label: 'Open country (south bank)',
        position: [55, 3, 70],
        lookAt: [25, 0, 45],
      },
    ],
    claimIds: [
      'claim-besor',
      'claim-besor-channel-form',
      'claim-negev-terrain',
      'claim-600-men',
      'claim-two-hundred-stay',
      'claim-egyptian-servant',
      'claim-spoil-statute',
      'claim-pack-donkeys',
      'claim-david-historical',
      'claim-dress',
    ],
    assetIds: [
      'asset-terrain-besor',
      'asset-water-pool',
      'asset-pack-donkeys',
      'asset-figure-procedural',
      'asset-david-marker',
      'asset-vegetation-scrub',
      'asset-olive-tree',
      'asset-rocks',
    ],
  },
  {
    id: 'amalekite-camp',
    title: 'The Amalekite camp — recovery',
    passageIds: ['1sam-30'],
    locationId: 'brook-besor',
    periodId: 'iron-i-iia-transition',
    milestoneId: 'M2',
    status: 'released',
    synopsis:
      'The raiders’ camp spread over the land, eating, drinking, and dancing over the spoil. David’s attack from twilight to evening; the recovery of every captive; four hundred young raiders escape on camels.',
    durationSec: 170,
    beats: [
      {
        id: 'b-approach',
        timeSec: 0,
        title: 'Dusk approach',
        caption:
          'Led down by the Egyptian, David’s four hundred reach a rise north of the camp as the light fails. (1 Samuel 30:16)',
        passageRef: '1 Samuel 30:16',
      },
      {
        id: 'b-sprawl',
        timeSec: 20,
        title: 'Spread over all the land',
        caption:
          'The raiders lie scattered in loose clusters around their fires — eating, drinking, and dancing over the great spoil taken from Philistine and Judahite country. No ranks, no ramparts: a raider camp, not an army. (1 Samuel 30:16)',
        passageRef: '1 Samuel 30:16',
      },
      {
        id: 'b-strike',
        timeSec: 55,
        title: 'The strike at twilight',
        caption:
          'David attacks in the twilight. Alarm runs through the fires; the clusters scatter into the dark. The onset is shown here; the fighting itself ran far longer. (1 Samuel 30:17)',
        passageRef: '1 Samuel 30:17',
      },
      {
        id: 'b-compression',
        timeSec: 80,
        title: 'A day of fighting, compressed',
        caption:
          'Time compresses: the fighting runs from dusk to the following evening — roughly a full day, not shown blow by blow. (1 Samuel 30:17)',
        passageRef: '1 Samuel 30:17',
      },
      {
        id: 'b-camel-flight',
        timeSec: 100,
        title: 'Four hundred flee on camels',
        caption:
          'Of the raiders, only four hundred young men escape — mounted on camels. Whether camels were in wide use this early is disputed; the label on these mounts carries that dispute. (1 Samuel 30:17)',
        passageRef: '1 Samuel 30:17',
      },
      {
        id: 'b-recovery',
        timeSec: 122,
        title: 'Nothing lacking',
        caption:
          'David recovers all that the Amalekites had taken — wives, sons, daughters, spoil; nothing is lacking, small or great. The captives of Ziklag walk free. (1 Samuel 30:18–19)',
        passageRef: '1 Samuel 30:18–19',
      },
      {
        id: 'b-drive-north',
        timeSec: 145,
        title: 'Flocks and herds, north',
        caption:
          'The flocks and herds are driven ahead of the column as it turns north toward the Besor, named "David’s spoil" — the very spoil David will soon rule is shared alike by everyone, not kept apart. (1 Samuel 30:20)',
        passageRef: '1 Samuel 30:20',
      },
    ],
    viewpoints: [
      {
        id: 'vp-scout-rise',
        label: 'Scout’s rise (north, dusk)',
        position: [0, 18, -140],
        lookAt: [0, 0, 0],
      },
      {
        id: 'vp-feast-cluster',
        label: 'Among the fires',
        position: [-20, 2, 10],
        lookAt: [10, 1, 30],
      },
      {
        id: 'vp-captives',
        label: 'The captives',
        position: [45, 2, 55],
        lookAt: [30, 1, 40],
      },
      {
        id: 'vp-east-edge',
        label: 'Eastern edge (camel flight)',
        position: [110, 6, -20],
        lookAt: [60, 2, 10],
      },
    ],
    claimIds: [
      'claim-amalekite-raiders',
      'claim-camp-sprawl',
      'claim-strike-timing',
      'claim-full-recovery',
      'claim-livestock-spoil',
      'claim-camel-depiction',
      'claim-camp-shelters',
      'claim-camp-scale',
      'claim-negev-terrain',
      'claim-david-historical',
      'claim-dress',
      'claim-egyptian-servant',
    ],
    assetIds: [
      'asset-terrain-camp-basin',
      'asset-camp-shelter-placeholder',
      'asset-camp-props',
      'asset-camp-fire',
      'asset-livestock-placeholder',
      'asset-camel-placeholder',
      'asset-figure-procedural',
      'asset-david-marker',
      'asset-vegetation-scrub',
      'asset-rocks',
    ],
  },
  {
    id: 'gilboa-battle',
    title: 'Mount Gilboa — the death of Saul',
    passageIds: ['1sam-31'],
    locationId: 'mount-gilboa',
    periodId: 'iron-i-iia-transition',
    milestoneId: 'M3',
    // 2026-07-19 Fable sign-off: released. Queue #13 (headdress) resolved —
    // corroborated Philistine marker, principal-tier only, behind the
    // claim-philistine-kit scholarlyViews dispute; see fable-review-queue.md.
    // Real-hardware perf check remains open as a non-blocking rider (next-run).
    status: 'released',
    synopsis:
      'The battle on the ridge above the Jezreel Valley: Israel’s rout, the deaths of Jonathan, Abinadab, and Malchi-shua, and Saul’s end. To be rendered honestly but without sensationalism, with a reduced-intensity mode.',
    depictsDeath: true,
    durationSec: 150,
    beats: [
      {
        id: 'b-lines',
        timeSec: 0,
        title: 'Arrayed on the ridge',
        caption:
          'Israel is drawn up on the high ground of Gilboa; the Philistines press up from the plain below, near Shunem, and close on the line. (1 Samuel 28:4; 31:1)',
        passageRef: '1 Samuel 28:4; 31:1',
      },
      {
        id: 'b-line-clash',
        timeSec: 8,
        title: 'The lines meet',
        caption:
          'Israel’s line and the Philistine press engage directly on the ridge. The narrative moves straight from arrayed lines to flight without describing the clash itself; a rout presupposes one. Shown as scripted, non-interactive swordplay at a documentary distance — no wound or blood is depicted in either mode. (1 Samuel 31:1)',
        passageRef: '1 Samuel 31:1',
      },
      {
        id: 'b-rout',
        timeSec: 18,
        title: 'The line breaks',
        caption:
          'The men of Israel flee before the Philistines and fall on the slopes of Gilboa. The defeat continues to read in the drift downhill and the dust as well as the clash just fought. (1 Samuel 31:1)',
        passageRef: '1 Samuel 31:1',
      },
      {
        id: 'b-sons',
        timeSec: 45,
        title: 'The king’s sons overtaken',
        caption:
          'The Philistines overtake Saul’s sons. Jonathan, Abinadab, and Malchi-shua are killed. The deaths are shown at the distance of the melee, without spectacle. (1 Samuel 31:2)',
        passageRef: '1 Samuel 31:2',
      },
      {
        id: 'b-archers',
        timeSec: 72,
        title: 'The archers find Saul',
        caption:
          'The battle presses hard against Saul; the archers find him, and he is badly wounded. (1 Samuel 31:3)',
        passageRef: '1 Samuel 31:3',
      },
      {
        id: 'b-armorbearer-refuses',
        timeSec: 95,
        title: 'The armor-bearer will not',
        caption:
          'Saul asks his armor-bearer to draw his sword and run him through, so that the enemy will not. But the armor-bearer will not do it, for he feared greatly. (1 Samuel 31:4)',
        passageRef: '1 Samuel 31:4',
      },
      {
        id: 'b-saul-death',
        timeSec: 112,
        title: 'Saul falls on his sword',
        caption:
          'So Saul takes his own sword and falls on it. The act is understood — held at a documentary distance and never shown in detail; in reduced mode it is elided entirely, the fact carried by these words alone. (1 Samuel 31:4)',
        passageRef: '1 Samuel 31:4',
      },
      {
        id: 'b-armorbearer-follows',
        timeSec: 126,
        title: 'His armor-bearer follows',
        caption:
          'When the armor-bearer sees that Saul is dead, he too falls on his own sword and dies with him. (1 Samuel 31:5)',
        passageRef: '1 Samuel 31:5',
      },
      {
        id: 'b-silence',
        timeSec: 140,
        title: 'The ridge falls silent',
        caption:
          'Saul, his three sons, his armor-bearer, and his men die that day together. The ridge goes quiet at dusk. On the next day the Philistines will come to strip the slain — but that belongs to Beth-shan, and is not shown here. (1 Samuel 31:6)',
        passageRef: '1 Samuel 31:6',
      },
    ],
    viewpoints: [
      {
        id: 'vp-facing-spur',
        label: 'Facing spur (overlook)',
        position: [0, 24, -150],
        lookAt: [0, 8, 0],
      },
      { id: 'vp-crest-line', label: 'The crest line', position: [-10, 3, 0], lookAt: [10, 2, -40] },
      {
        id: 'vp-archers',
        label: 'Behind the archers',
        position: [30, 4, -55],
        lookAt: [0, 6, -5],
      },
      {
        id: 'vp-death-knoll',
        label: 'The death knoll',
        position: [12, 5, 12],
        lookAt: [0, 2, 2],
      },
      {
        id: 'vp-eastern-draw',
        label: 'The eastern draw (rout)',
        position: [40, 6, 20],
        lookAt: [70, 0, 30],
      },
    ],
    claimIds: [
      'claim-gilboa-topography',
      'claim-gilboa-terrain-form',
      'claim-battle-scale',
      'claim-gilboa-rout',
      'claim-sons-killed',
      'claim-saul-wounded-archers',
      'claim-armor-bearer-refusal',
      'claim-saul-death',
      'claim-israelite-muster-kit',
      'claim-philistine-kit',
    ],
    assetIds: [
      'asset-terrain-gilboa-ridge',
      'asset-figure-fallen',
      'asset-military-kit-israelite',
      'asset-military-kit-philistine',
      'asset-dust-motion',
      'asset-arrow-volley',
    ],
  },
  {
    id: 'beth-shan-walls',
    title: 'Beth-shan — the display on the wall',
    passageIds: ['1sam-31'],
    locationId: 'beth-shan',
    periodId: 'iron-i-iia-transition',
    milestoneId: 'M3',
    // 2026-07-19 Fable sign-off: released (queue #16 resolved 2026-07-16 per
    // the queue-#4 disclosed-hedge precedent).
    status: 'released',
    synopsis:
      'The Philistine aftermath: armor in the temple of Ashtaroth, bodies fastened to the wall of Beth-shan beneath the old Egyptian-garrison tell. To be rendered honestly but without sensationalism, with a reduced-intensity mode.',
    depictsDeath: true,
    durationSec: 150,
    beats: [
      {
        id: 'b-next-day',
        timeSec: 0,
        title: 'The next day, on Gilboa',
        caption:
          'The next day, the Philistines find Saul and his sons among the slain on Gilboa, strip them, and cut off Saul’s head — stated here, not shown; that happened at Gilboa, not here. Their column starts back toward Beth-shan, visible far off on the valley road below the tell. (1 Samuel 31:8–9)',
        passageRef: '1 Samuel 31:8–9',
      },
      {
        id: 'b-procession',
        timeSec: 20,
        title: 'The escort reaches the gate',
        caption:
          'The escort arrives at Beth-shan’s gate bearing Saul’s armor. Townspeople gather in the plaza below the wall to see what has come up from the battle. No head is carried in the procession. (1 Samuel 31:9–10)',
        passageRef: '1 Samuel 31:9–10',
      },
      {
        id: 'b-messengers',
        timeSec: 40,
        title: 'Messengers depart',
        caption:
          'Messengers set out through Philistine country bearing the armor and the news, bound for the temple of Ashtaroth — its location unstated in the text and not built here. (1 Samuel 31:9–10a)',
        passageRef: '1 Samuel 31:9–10a',
      },
      {
        id: 'b-display',
        timeSec: 55,
        title: 'The bodies are fastened to the wall',
        caption:
          'Four wrapped forms are raised and fastened to the wall face above the gate — seen at plaza distance, undetailed, never closer. In reduced mode the wall stays bare; the fact is carried by this caption alone. (1 Samuel 31:10b)',
        passageRef: '1 Samuel 31:10',
      },
      {
        id: 'b-wall-watch',
        timeSec: 75,
        title: 'Daylight under the display',
        caption:
          'Daylight passes over the town under the display. Life in the lanes and the plaza continues, uneasily, beneath it. (1 Samuel 31:10)',
        passageRef: '1 Samuel 31:10',
      },
      {
        id: 'b-news-east',
        timeSec: 95,
        title: 'The news crosses the Jordan',
        caption:
          'At dusk, across the Jordan, Jabesh-gilead hears what was done to Saul. The valley opens east toward Gilead — the direction the news travels tonight, and the direction the retrieval party will come from. (1 Samuel 31:11)',
        passageRef: '1 Samuel 31:11',
      },
      {
        id: 'b-retrieval',
        timeSec: 115,
        title: 'The men of Jabesh, by night',
        caption:
          'By night, the men of Jabesh reach the wall by torchlight. Quietly, without incident, they take the forms down and bear them away as wrapped biers. No guard fight is narrated, and none is staged. (1 Samuel 31:12a)',
        passageRef: '1 Samuel 31:12a',
      },
      {
        id: 'b-empty-wall',
        timeSec: 140,
        title: 'The wall, empty',
        caption:
          'In the grey before dawn, the wall stands empty in both senses. The column is already on its way toward Jabesh — not shown here. (1 Samuel 31:12a)',
        passageRef: '1 Samuel 31:12a',
      },
    ],
    viewpoints: [
      {
        id: 'vp-valley-road',
        label: 'The valley road',
        position: [-220, 0, 4],
        lookAt: [-60, 8, 0],
      },
      {
        id: 'vp-gate-plaza',
        label: 'The gate plaza',
        position: [-96, 0, 6],
        lookAt: [-66, 6, 0],
      },
      {
        id: 'vp-wall-walk',
        label: 'The wall walk',
        position: [-50, 3.4, -20],
        lookAt: [-60, 4, 10],
      },
      {
        id: 'vp-east-brow',
        label: 'The eastern brow',
        position: [130, 0, -15],
        lookAt: [320, 4, -15],
      },
      {
        id: 'vp-night-ground',
        label: 'The night ground',
        position: [-78, 0, -30],
        lookAt: [-70, 10, -20],
      },
    ],
    claimIds: [
      'claim-beth-shan-identification',
      'claim-beth-shan-town-form',
      'claim-egyptian-monuments',
      'claim-beth-shan-wall',
      'claim-body-display',
      'claim-armor-ashtaroth',
      'claim-jabesh-retrieval',
      'claim-beth-shan-control',
      'claim-philistine-kit',
      'claim-dress',
      'claim-chronology',
    ],
    assetIds: [
      'asset-terrain-beth-shan-tell',
      'asset-tell-town-blocks',
      'asset-beth-shan-wall',
      'asset-display-forms',
      'asset-egyptian-monuments',
      'asset-bier-props',
      'asset-torch-sprites',
      'asset-figure-procedural',
      'asset-military-kit-philistine',
      'asset-vegetation-scrub',
      'asset-rocks',
    ],
  },
  {
    id: 'jabesh-burial',
    title: 'Jabesh-gilead — the night retrieval and burial',
    passageIds: ['1sam-31'],
    locationId: 'jabesh-gilead',
    periodId: 'iron-i-iia-transition',
    milestoneId: 'M3',
    // 2026-07-19 Fable sign-off: released (queue #17 resolved 2026-07-16 per
    // the queue-#4 disclosed-hedge precedent).
    status: 'released',
    synopsis:
      'The valiant men of Jabesh walk through the night, take the bodies from the wall, burn them at Jabesh, bury the bones under the tamarisk, and fast seven days. The quietest scene in the project so far — the kingdom’s first act answered by its last kindness.',
    depictsDeath: true,
    durationSec: 150,
    beats: [
      {
        id: 'b-night-march',
        timeSec: 0,
        title: 'The column comes home, by night',
        caption:
          'Word reached Jabesh at dusk, across the Jordan (rendered at Beth-shan’s wall, not here). By night, the valiant men climb the wadi path from the valley below, bearing four wrapped forms by torchlight. (1 Samuel 31:11–12a)',
        passageRef: '1 Samuel 31:11–12a',
      },
      {
        id: 'b-received',
        timeSec: 24,
        title: 'The town receives them',
        caption:
          'In the grey light before sunrise, the town comes out to receive them at the village edge. No feast, no procession — quiet grief poses, restrained. (1 Samuel 31:12)',
        passageRef: '1 Samuel 31:12',
      },
      {
        id: 'b-pyre',
        timeSec: 55,
        title: 'The burning',
        caption:
          'The four forms are laid on a timber platform and fully covered before any flame is lit, in every mode. Burning the dead departs from normal Israelite practice — 1 Chronicles 10:12 omits it — and the reason has long been debated. (1 Samuel 31:12b)',
        passageRef: '1 Samuel 31:12b',
      },
      {
        id: 'b-bones',
        timeSec: 82,
        title: 'The bones are gathered',
        caption:
          'The bones are gathered as a single cloth-wrapped bundle, handled with care, and carried toward the tamarisk. No remains are shown directly, in any mode. (1 Samuel 31:13a)',
        passageRef: '1 Samuel 31:13a',
      },
      {
        id: 'b-tamarisk',
        timeSec: 104,
        title: 'Burial under the tamarisk',
        caption:
          'The bundle is lowered beneath the tamarisk and the mound is closed. 1 Chronicles 10:12 names the oak instead — a genuine textual variant, left open rather than resolved. (1 Samuel 31:13a)',
        passageRef: '1 Samuel 31:13a',
      },
      {
        id: 'b-seven-days',
        timeSec: 122,
        title: 'Seven days',
        caption:
          'The village keeps a seven-day fast. The days pass here as a compressed shimmer of light and dark, not shown one by one — a time-compression card, not a literal seven-day simulation. (1 Samuel 31:13b)',
        passageRef: '1 Samuel 31:13b',
      },
      {
        id: 'b-close',
        timeSec: 142,
        title: 'Still evening',
        caption:
          'Evening settles and holds. Word of what happened here will reach David at Ziklag (2 Samuel 1), and he will later bless Jabesh by name for this kindness (2 Samuel 2:5–7) — not depicted in this scene.',
        passageRef: '2 Samuel 2:5–7',
      },
    ],
    viewpoints: [
      {
        id: 'vp-village-edge',
        label: 'The village edge, by night',
        position: [-15, 0, 9],
        lookAt: [-350, 15, 40],
      },
      {
        id: 'vp-wadi-path',
        label: 'The wadi path',
        position: [-150, 0, -20],
        lookAt: [-22, 10, 6],
      },
      {
        id: 'vp-pyre-ground',
        label: 'The pyre ground',
        position: [95, 0, 60],
        lookAt: [65, 8, 40],
      },
      {
        id: 'vp-tamarisk',
        label: 'The tamarisk',
        position: [115, 0, -15],
        lookAt: [100, 10, -35],
      },
      {
        id: 'vp-west-terrace',
        label: 'The west terrace',
        position: [30, 0, 25],
        lookAt: [-420, 10, 50],
      },
    ],
    claimIds: [
      'claim-jabesh-location',
      'claim-gilead-terrain',
      'claim-jabesh-town-form',
      'claim-jabesh-retrieval',
      'claim-night-march',
      'claim-burning-bodies',
      'claim-tamarisk-burial',
      'claim-seven-day-fast',
      'claim-dress',
      'claim-chronology',
    ],
    assetIds: [
      'asset-terrain-jabesh-wadi',
      'asset-tamarisk-tree',
      'asset-pyre',
      'asset-bier-props',
      'asset-village-cluster',
      'asset-vegetation-gilead',
      'asset-figure-procedural',
      'asset-rocks',
      'asset-torch-sprites',
    ],
  },
  {
    id: 'ziklag-lament',
    title: 'Ziklag — the Amalekite’s report and the Song of the Bow',
    passageIds: ['2sam-1'],
    locationId: 'ziklag',
    periodId: 'iron-i-iia-transition',
    milestoneId: 'M4',
    // PROVISIONAL build (2026-07-22, Sonnet implementing a Sonnet
    // world-director brief — Fable was unavailable this session; see
    // docs/design/ziklag-lament-brief.md and fable-review-queue.md #18).
    // in-progress, not released, pending a real Fable pass on the brief's
    // creative calls — matches the M2/M3 build-then-review pattern.
    status: 'in-progress',
    synopsis:
      'An Amalekite messenger reaches David at Ziklag with news of the defeat and Saul and Jonathan’s deaths, claiming to have struck the fatal blow himself; David has him executed for raising a hand against the LORD’s anointed, then sings the Song of the Bow.',
    depictsDeath: true,
    durationSec: 214,
    beats: [
      {
        id: 'b-arrival',
        timeSec: 0,
        title: 'The third day',
        caption:
          'David has been back at Ziklag two days when, on the third day, a man arrives alone from the camp — clothes torn, dust on his head. The town reads the news off his body before he speaks a word. (2 Samuel 1:1–2)',
        passageRef: '2 Samuel 1:1–2',
      },
      {
        id: 'b-falls',
        timeSec: 14,
        title: 'He falls before David',
        caption: 'He comes before David and falls to the ground in homage. (2 Samuel 1:2)',
        passageRef: '2 Samuel 1:2',
      },
      {
        id: 'b-account',
        timeSec: 28,
        title: 'His account — a claim, not corroborated',
        caption:
          'He says he escaped the rout on Gilboa and found Saul there, still alive, leaning on his spear — and that at Saul’s own request he struck him down. This does not match how Saul actually died: 1 Samuel 31:4, already shown at Gilboa, has Saul fall on his own sword unaided, after his armor-bearer refused to strike him. The narrative does not resolve which account is true, and neither does this scene — his story is staged as a claim, told here at Ziklag, never as a corroborated reenactment. (2 Samuel 1:6–10)',
        passageRef: '2 Samuel 1:6–10',
      },
      {
        id: 'b-tokens',
        timeSec: 44,
        title: 'Proof produced',
        caption:
          'As proof, he produces Saul’s crown and the armlet from his arm. That royal insignia were brought is narrated plainly; their exact form is unknown — no Iron Age Israelite royal regalia has been identified to model from. (2 Samuel 1:10)',
        passageRef: '2 Samuel 1:10',
      },
      {
        id: 'b-grief',
        timeSec: 58,
        title: 'Grief, before any judgment',
        caption:
          'David and all the men with him tear their clothes, weep, and fast until evening — for Saul, for Jonathan, for the people of the LORD, and for the house of Israel. The grief comes before judgment, and it is not staged as pretext. (2 Samuel 1:11–12)',
        passageRef: '2 Samuel 1:11–12',
      },
      {
        id: 'b-identity',
        timeSec: 76,
        title: 'An Amalekite, at Ziklag',
        caption:
          'David asks the young man where he is from. He identifies himself as an Amalekite, a resident alien in Israel — the same raiding people these men buried their grief against at this very town in 1 Samuel 30, weeks before. (2 Samuel 1:13)',
        passageRef: '2 Samuel 1:13',
      },
      {
        id: 'b-judgment',
        timeSec: 88,
        title: 'Judgment turns on the confession',
        caption:
          'David turns from grief to judgment: the young man’s own words have convicted him — he claimed to have struck down the LORD’s anointed. The verdict rests on that confession itself, not on a forensic finding about what actually happened at Gilboa — the same principle that once stayed David’s hand against Saul, alive, on two earlier occasions (1 Samuel 24:6; 26:9–11). (2 Samuel 1:14–15a)',
        passageRef: '2 Samuel 1:14–15a',
      },
      {
        id: 'b-execution',
        timeSec: 98,
        title: 'The sentence carried out',
        caption:
          'David gives the word, and one of the men strikes the messenger down. Shown at documentary distance with no wound or blood depicted, in either mode; in reduced mode the strike itself is elided, and the caption alone carries the fact. (2 Samuel 1:15b)',
        passageRef: '2 Samuel 1:15b',
      },
      {
        id: 'b-messenger-dead',
        timeSec: 108,
        title: 'David’s closing words',
        caption:
          'David speaks his final judgment over the dead man: his own testimony has condemned him. The scene does not linger on the body. (2 Samuel 1:16)',
        passageRef: '2 Samuel 1:16',
      },
      {
        id: 'b-song-commissioned',
        timeSec: 120,
        title: 'The Song of the Bow, commissioned',
        caption:
          'David laments Saul and Jonathan and orders the lament taught to the sons of Judah. It is preserved, the text says, in the Book of Jashar — a lost source the Bible cites elsewhere (Joshua 10:13), evidence of a now-vanished Israelite literary tradition. (2 Samuel 1:17–18)',
        passageRef: '2 Samuel 1:17–18',
      },
      {
        id: 'b-lament-transition',
        timeSec: 133,
        title: 'A quiet rise, as the light fails',
        caption:
          'The company moves to a modest rise near the wall — a deliberately separate, quieter space, apart from the plaza’s judgment, for the lament itself. (2 Samuel 1:17)',
        passageRef: '2 Samuel 1:17',
      },
      {
        id: 'b-lament-open',
        timeSec: 145,
        title: 'The song opens',
        caption:
          'Israel’s glory lies slain on the heights. Do not tell it in Gath; do not proclaim it in the streets of Ashkelon — let the Philistines’ daughters not rejoice over this. (2 Samuel 1:19–20)',
        passageRef: '2 Samuel 1:19–20',
      },
      {
        id: 'b-lament-gilboa',
        timeSec: 157,
        title: 'A curse on the mountains of Gilboa',
        caption:
          'The song turns on the mountains themselves: let no dew or rain fall there again, no fields yield offerings — for there the shield of the mighty lay defiled, Saul’s shield, no longer anointed with oil. (2 Samuel 1:21)',
        passageRef: '2 Samuel 1:21',
      },
      {
        id: 'b-lament-together',
        timeSec: 169,
        title: 'Not divided',
        caption:
          'Of Saul and Jonathan together, the song will not let David’s rise eclipse grief for a defeated king: “In life and in death they were not divided;” swifter than eagles, stronger than lions. (2 Samuel 1:23)',
        passageRef: '2 Samuel 1:23',
      },
      {
        id: 'b-lament-daughters',
        timeSec: 179,
        title: 'Daughters of Israel, weep',
        caption:
          'The song calls the daughters of Israel to weep for Saul, who clothed them in scarlet and finery, who put ornaments of gold on their garments. (2 Samuel 1:24)',
        passageRef: '2 Samuel 1:24',
      },
      {
        id: 'b-lament-jonathan',
        timeSec: 189,
        title: 'My brother Jonathan',
        caption:
          'David turns from the nation’s grief to his own: “I am distressed for you, my brother Jonathan; you have been very pleasant to me; your love to me was extraordinary, surpassing the love of women.” (2 Samuel 1:26)',
        passageRef: '2 Samuel 1:26',
      },
      {
        id: 'b-lament-refrain',
        timeSec: 199,
        title: 'How the mighty have fallen',
        caption:
          'The song closes on its refrain, one last time: “How the mighty have fallen, and the weapons of war perished!” Two men who spent much of this story as rivals are mourned here, together, without qualification — the Song of the Bow’s own last word. (2 Samuel 1:27)',
        passageRef: '2 Samuel 1:27',
      },
    ],
    viewpoints: [
      {
        id: 'vp-plaza',
        label: 'Settlement center (default)',
        position: [-10, 3, 6],
        lookAt: [2, 2, -4],
      },
      { id: 'vp-gate', label: 'North gate approach', position: [6, 0, -95], lookAt: [0, 4, -40] },
      {
        id: 'vp-lament',
        label: 'Toward the lament rise',
        position: [30, 2, 2],
        lookAt: [52, 6, 20],
      },
    ],
    claimIds: [
      'claim-ziklag-location',
      'claim-ziklag-scale',
      'claim-oval-plan',
      'claim-mudbrick',
      'claim-four-room',
      'claim-wall-gate',
      'claim-dress',
      'claim-david-historical',
      'claim-negev-terrain',
      'claim-600-men',
      'claim-amalekite-messenger-account',
      'claim-lords-anointed-principle',
      'claim-execution-messenger',
      'claim-royal-tokens',
      'claim-mourning-dress',
      'claim-song-of-the-bow',
      'claim-lament-evening',
    ],
    assetIds: [
      'asset-terrain-negev',
      'asset-house-block',
      'asset-perimeter-wall',
      'asset-gate-simple',
      'asset-figure-procedural',
      'asset-david-marker',
      'asset-vegetation-scrub',
      'asset-olive-tree',
      'asset-rocks',
      'asset-royal-tokens',
    ],
  },
  {
    id: 'hebron-anointing',
    title: 'Hebron — Judah anoints David',
    passageIds: ['2sam-2'],
    locationId: 'hebron',
    periodId: 'iron-iia',
    milestoneId: 'M4',
    status: 'planned',
    synopsis:
      'David goes up to Hebron with his men and their households; the men of Judah anoint him king over the house of Judah. David sends word commending the men of Jabesh-gilead for burying Saul.',
    durationSec: 0,
    beats: [],
    viewpoints: [],
    claimIds: [],
    assetIds: [],
  },
  {
    id: 'gibeon-pool',
    title: 'The pool of Gibeon — Abner, Ish-bosheth, and the death of Asahel',
    passageIds: ['2sam-2'],
    locationId: 'gibeon',
    periodId: 'iron-iia',
    milestoneId: 'M4',
    status: 'planned',
    synopsis:
      'Abner has installed Ish-bosheth over the northern tribes at Mahanaim; at the pool of Gibeon a contest between twelve young men from each side turns into open war between the houses of Saul and David, and Joab’s brother Asahel is killed in the pursuit of Abner.',
    durationSec: 0,
    beats: [],
    viewpoints: [],
    claimIds: [
      'claim-ish-bosheth-installed',
      'claim-gibeon-contest',
      'claim-asahel-death',
      'claim-abner-pursuit-halted',
      'claim-gibeon-pool-form',
    ],
    assetIds: [],
  },
];

export const SCENES_BY_ID: ReadonlyMap<string, SceneDef> = new Map(SCENES.map((s) => [s.id, s]));

export const DEFAULT_SCENE_ID = 'ziklag-aftermath';
