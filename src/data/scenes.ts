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
    // Approved as built at the 2026-08-02 Fable M4 review (queue #18 resolved).
    // Released at the 2026-08-02 Fable M4 release pass: queue #19a/#19b closed
    // (Gill + Keil named attributions on the messenger-account scholarlyViews,
    // per the #17 precedent; ESV wording live-checked, 1:26 corrected, excerpt
    // budget re-verified at 249/500).
    status: 'released',
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
          'He says he escaped the rout on Gilboa and found Saul there, still alive, leaning on his spear — and that at Saul’s own request he struck him down. This does not match the narrative’s own account: 1 Samuel 31:4, already shown at Gilboa, has Saul fall on his own sword unaided, after his armor-bearer refused to strike him. The narrative never reconciles the two accounts, and neither does this scene — his story is staged as a claim, told here at Ziklag, never as a corroborated reenactment. (2 Samuel 1:6–10)',
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
          'David turns from the nation’s grief to his own: “I am distressed for you, my brother Jonathan; very pleasant have you been to me; your love to me was extraordinary, surpassing the love of women.” (2 Samuel 1:26)',
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
    // Approved as built at the 2026-08-02 Fable M4 review (queue #18 resolved).
    // Released at the 2026-08-02 Fable M4 release pass: queue #19c closed as
    // "checked, permanently thin" — three citable Tell Rumeida sources confirm
    // the 11th-10th-century town-form gap rather than closing it (the queue-#13
    // permanent-evidentiary-state pattern), so claim-hebron-town-form's
    // disclosed design-placeholder stands as the honest, releasable rendering.
    status: 'released',
    synopsis:
      'David goes up to Hebron with his men and their households; the men of Judah anoint him king over the house of Judah — not yet over Israel. David sends word commending the men of Jabesh-gilead for burying Saul.',
    depictsDeath: false,
    durationSec: 170,
    beats: [
      {
        id: 'b-inquiry',
        timeSec: 0,
        title: 'David inquires of the LORD',
        caption:
          'After this, David inquires of the LORD: should he go up to one of the towns of Judah, and if so, where? The answer is Hebron. The text does not say where this inquiry happens or, here, name the method — the same ephod practice already shown at Ziklag (1 Samuel 30:7–8) is inferred, not restated. (2 Samuel 2:1)',
        passageRef: '2 Samuel 2:1',
      },
      {
        id: 'b-arrival',
        timeSec: 16,
        title: 'The column climbs the highland road',
        caption:
          'David goes up, and with him his two wives — and his men, everyone with his household. The column climbs from the south, the direction of the Negev and Ziklag, and comes into view of Hebron on its hill. (2 Samuel 2:2–3a)',
        passageRef: '2 Samuel 2:2–3a',
      },
      {
        id: 'b-settling',
        timeSec: 58,
        title: 'The towns of Hebron',
        caption:
          "They settle in the towns of Hebron — households dispersing into a satellite camp around the town, a quieter, domestic beat, while David's men gather near the gate plaza. The roughly 40–50 household figures shown are a disclosed design choice, not a headcount the text gives. (2 Samuel 2:3b)",
        passageRef: '2 Samuel 2:3b',
      },
      {
        id: 'b-anointing',
        timeSec: 98,
        title: 'Anointed king — over the house of Judah',
        caption:
          "The men of Judah come and anoint David king over the house of Judah — one tribe's elders and townspeople, in one tribal hill town, installing him over themselves alone. Not over Israel: the rest of the former kingdom is still Saul's house's to claim, and a wider anointing \"king over all Israel\" is still years and several chapters away (2 Samuel 5:3). The ~150–200 figures gathered are an explicitly labeled representative assembly, not a literal tribal muster. (2 Samuel 2:4a)",
        passageRef: '2 Samuel 2:4a',
      },
      {
        id: 'b-jabesh-message',
        timeSec: 138,
        title: 'Word sent to Jabesh-gilead',
        caption:
          'Told that the men of Jabesh-gilead buried Saul, David — now a king, of Judah — sends messengers commending them and telling them of his own new, partial kingship. Staged as correspondence: the messengers are given the message and walk the road east until they are out of frame. No burial, pyre, or wall geometry is re-rendered here — that already happened, elsewhere, in jabesh-burial. (2 Samuel 2:4b–7)',
        passageRef: '2 Samuel 2:4b–7',
      },
      {
        id: 'b-close',
        timeSec: 165,
        title: 'A partial, contested kingship',
        caption:
          "Not shown: Abner has already moved to install Saul's son Ish-bosheth over the northern tribes at Mahanaim, in direct rivalry — the war that follows at the pool of Gibeon is the next scene, not this one. (2 Samuel 2:8–32)",
        passageRef: '2 Samuel 2:8–32',
      },
    ],
    viewpoints: [
      {
        id: 'vp-approach-ridge',
        label: 'The approach ridge (default)',
        position: [6, 6, 190],
        lookAt: [0, 14, -40],
      },
      {
        id: 'vp-anointing-plaza',
        label: 'The gate plaza',
        position: [16, 2, -28],
        lookAt: [0, 3, -18],
      },
      {
        id: 'vp-household-camp',
        label: 'The household camp',
        position: [-70, 2, -35],
        lookAt: [-95, 2, -20],
      },
      {
        id: 'vp-messenger-departure',
        label: 'The road east, toward Gilead',
        position: [130, 2, -18],
        lookAt: [300, 2, -30],
      },
    ],
    claimIds: [
      'claim-hebron-identification',
      'claim-hebron-town-form',
      'claim-hebron-inquiry',
      'claim-david-move-hebron',
      'claim-judah-anointing',
      'claim-jabesh-commendation',
      'claim-anointing-rite-form',
      'claim-judah-assembly-scale',
      'claim-dress',
      'claim-chronology',
      'claim-david-historical',
      'claim-600-men',
    ],
    assetIds: [
      'asset-terrain-hebron-hills',
      'asset-hebron-town-form',
      'asset-terrace-walls',
      'asset-household-camp',
      'asset-anointing-props',
      'asset-figure-procedural',
      'asset-david-marker',
      'asset-olive-tree',
      'asset-rocks',
    ],
  },
  {
    id: 'gibeon-pool',
    // Title names the two commanders actually present at Gibeon; Ish-bosheth
    // is referenced in the context card only (2:8-10) and never staged here.
    title: 'The pool of Gibeon — Abner, Joab, and the death of Asahel',
    passageIds: ['2sam-2'],
    locationId: 'gibeon',
    periodId: 'iron-iia',
    milestoneId: 'M4',
    // Approved as built at the 2026-08-02 Fable M4 review (queue #18 resolved).
    // Released at the 2026-08-02 Fable M4 release pass: queue #19d closed
    // affirmatively — Pritchard's excavation-era dating + Tamburrini 2021 both
    // place the pool's construction at Iron I/10th century BCE (at or before
    // 2 Sam 2's setting); claim-gibeon-pool-form raised low → moderate.
    status: 'released',
    synopsis:
      'Abner has installed Ish-bosheth over the northern tribes at Mahanaim; at the pool of Gibeon a contest between twelve young men from each side turns into open war between the houses of Saul and David, and Joab’s brother Asahel is killed in the pursuit of Abner.',
    depictsDeath: true,
    durationSec: 240,
    beats: [
      {
        id: 'b-context',
        timeSec: 0,
        title: 'Two houses, two years on',
        caption:
          'Abner has made Ish-bosheth, Saul’s son, king at Mahanaim over Gilead, the Ashurites, Jezreel, Ephraim, Benjamin, and all Israel — but the house of Judah follows David. Mahanaim itself is not shown here: no confident site identification exists for it. This is civil war, not a foreign-enemy fight. (2 Samuel 2:8–10)',
        passageRef: '2 Samuel 2:8–10',
      },
      {
        id: 'b-arrival',
        timeSec: 14,
        title: 'One side of the pool, the other',
        caption:
          'Joab and Abner bring their companies to Gibeon and sit down, one on one side of the pool and the other on the other side — two councils facing each other across still water, before a blow is struck. (2 Samuel 2:13)',
        passageRef: '2 Samuel 2:13',
      },
      {
        id: 'b-proposal',
        timeSec: 34,
        title: 'A contest is proposed',
        caption:
          'Abner proposes that young men from each side fight before them; Joab agrees. Twelve are chosen from Benjamin and Ish-bosheth’s side, twelve from David’s servants. (2 Samuel 2:14–15)',
        passageRef: '2 Samuel 2:14–15',
      },
      {
        id: 'b-champions',
        timeSec: 52,
        title: 'Helkath-hazzurim',
        caption:
          'Each man seizes his opponent by the head and drives his sword into his companion’s side, and they fall down together — twelve times over. The place is named Helkath-hazzurim, the field of sword-edges, for what happens here. Shown at documentary distance: no blade-entry, no blood. (2 Samuel 2:16)',
        passageRef: '2 Samuel 2:15–16',
      },
      {
        id: 'b-battle-spreads',
        timeSec: 78,
        title: 'The battle spreads',
        caption:
          'The contest ignites a fierce battle that day, and Israel is beaten before the servants of David. Men who may have stood together against the Philistines at Gilboa two years ago are now killing each other here. Dust and motion carry the wider clash; no gore. (2 Samuel 2:17)',
        passageRef: '2 Samuel 2:17',
      },
      {
        id: 'b-asahel-pursuit',
        timeSec: 104,
        title: 'Is that you, Asahel?',
        caption:
          'Asahel, Joab’s youngest brother and swift as a gazelle, breaks off alone after Abner. Abner looks back and asks, "Is that you, Asahel?" Asahel answers that it is, and keeps coming. No violence yet — a chase, shot low and close to feel its speed. (2 Samuel 2:18–20)',
        passageRef: '2 Samuel 2:18–20',
      },
      {
        id: 'b-abner-warns',
        timeSec: 122,
        title: 'Two warnings',
        caption:
          'Abner tells Asahel to turn aside and strip a fallen man instead — twice. "How then could I hold up my face to your brother Joab?" he asks, visibly reluctant. Asahel will not turn aside. Neither man is staged as a fool or a villain; both readings stay open. (2 Samuel 2:21–22)',
        passageRef: '2 Samuel 2:21–22',
      },
      {
        id: 'b-asahel-death',
        timeSec: 138,
        title: 'The back of the spear',
        caption:
          'Abner halts and strikes Asahel with the back end of his spear — the one specific detail the text gives, shown as a gesture, not a wound. Asahel falls and dies. All who come to the place stand still — a held moment, not replayed. (2 Samuel 2:23)',
        passageRef: '2 Samuel 2:23',
      },
      {
        id: 'b-pursuit-continues',
        timeSec: 150,
        title: 'Toward the hill of Ammah',
        caption:
          'Joab and Abishai keep on after Abner as the sun goes down, until they come to the hill of Ammah. (2 Samuel 2:24)',
        passageRef: '2 Samuel 2:24',
      },
      {
        id: 'b-standoff',
        timeSec: 166,
        title: 'A stand on the hilltop',
        caption:
          'The Benjaminites rally behind Abner and take their stand on top of the hill — a standoff, not combat. By the numbers this is the losing side (2:30–31), yet it holds the higher ground; that irony is kept, not smoothed over. (2 Samuel 2:25)',
        passageRef: '2 Samuel 2:25',
      },
      {
        id: 'b-abner-plea',
        timeSec: 182,
        title: 'Shall the sword devour forever?',
        caption:
          'Abner calls down to Joab, "Shall the sword devour forever?" — asking whether Joab knows it will end bitterly, and how long before he tells his people to stop pursuing their own brothers. (2 Samuel 2:26)',
        passageRef: '2 Samuel 2:26',
      },
      {
        id: 'b-joab-halts',
        timeSec: 196,
        title: 'The trumpet sounds',
        caption:
          'Joab answers that he would have pursued past morning if Abner had not spoken — then blows the trumpet, and all his people stop and pursue Israel no more. A real act of restraint, granted by the very brother of the man just killed. (2 Samuel 2:27–28)',
        passageRef: '2 Samuel 2:27–28',
      },
      {
        id: 'b-casualty-count',
        timeSec: 210,
        title: 'The reckoning',
        caption:
          'Abner and his men march all night back toward Mahanaim, not shown here. The text’s own numbers: nineteen of David’s servants and Asahel — twenty in all — against three hundred and sixty of Benjamin and Abner’s men. Delivered as text, not as a corpse count on screen. (2 Samuel 2:29–31)',
        passageRef: '2 Samuel 2:29–31',
      },
      {
        id: 'b-close',
        timeSec: 226,
        title: 'Bethlehem, and Hebron by daybreak',
        caption:
          'Asahel is taken up and buried in his father’s tomb at Bethlehem. Joab and his men march all night and reach Hebron by daybreak — neither place shown here; both lie outside Gibeon, this scene’s setting. (2 Samuel 2:32)',
        passageRef: '2 Samuel 2:32',
      },
    ],
    viewpoints: [
      {
        id: 'vp-pool',
        label: 'The pool of Gibeon (default)',
        position: [46, 26, -8],
        lookAt: [0, 3, 6],
      },
      {
        id: 'vp-champions',
        label: "The champions' ground",
        position: [-14, 6, 0],
        lookAt: [0, 2, 0],
      },
      {
        id: 'vp-battle-spread',
        label: 'The spreading battlefield',
        position: [40, 16, -30],
        lookAt: [16, 3, 0],
      },
      {
        id: 'vp-pursuit',
        label: 'The pursuit route',
        position: [70, 4, -10],
        lookAt: [140, 3, 10],
      },
      {
        id: 'vp-ammah-hill',
        label: 'The hill of Ammah',
        position: [300, 6, 20],
        lookAt: [345, 18, -8],
      },
    ],
    claimIds: [
      'claim-ish-bosheth-installed',
      'claim-gibeon-contest',
      'claim-asahel-death',
      'claim-abner-pursuit-halted',
      'claim-gibeon-pool-form',
      'claim-gibeon-terrain-form',
      'claim-gibeon-battle-scale',
      'claim-dress',
      'claim-david-historical',
    ],
    assetIds: [
      'asset-terrain-gibeon-plateau',
      'asset-gibeon-pool-basin',
      'asset-water-plane',
      'asset-military-kit-gibeon',
      'asset-figure-fallen',
      'asset-figure-procedural',
      'asset-dust-motion',
      'asset-vegetation-scrub',
      'asset-rocks',
    ],
  },
  {
    id: 'hebron-covenant',
    title: "Hebron — Abner's covenant, and the peace",
    passageIds: ['2sam-3'],
    locationId: 'hebron',
    periodId: 'iron-iia',
    milestoneId: 'M5',
    // Built 2026-08-10 (Sonnet/threejs-engineer) per docs/design/
    // hebron-covenant-brief.md (Fable world-director pass, 2026-08-03).
    // 2026-08-10 M5 sign-off review (Opus standing in for Fable, user-directed
    // substitution): approved as built — no longer provisional. Stays
    // in-progress; `released` gates on queue #20. Specifically endorsed: the
    // threefold peace formula staged straight with no ominous framing; Abner's
    // twenty rendered literally 1:1; Michal/Paltiel/Rizpah text-only. The
    // "northern road" staged from the west (-x) is approved as a disclosed
    // legibility choice — layout.ts states it is not a compass claim, and the
    // b-arrival caption says "from the direction of Israel and Benjamin"
    // rather than naming a bearing, which is the honest phrasing.
    // 2026-08-12 Fable M5 release pass: queue #20 fully closed (feast-form
    // citation landed via king-stager-2001; 3:21a ESV wording live-verified)
    // — released per the M3/M4 cascade.
    status: 'released',
    synopsis:
      "After a long civil war, Abner breaks with Ish-bosheth and brings the north's allegiance to David. He comes to Hebron with twenty men, is received and feasted, pledges to gather all Israel to a covenant with David — and is sent away in peace, the first of three times the text says so.",
    depictsDeath: false,
    durationSec: 158,
    beats: [
      {
        id: 'b-long-war',
        timeSec: 0,
        title: 'A long war',
        caption:
          'The war between the house of Saul and the house of David is long; David grows steadily stronger, the house of Saul steadily weaker. Sons are born to David at Hebron across this span, listed as the text lists them. (2 Samuel 3:1–5)',
        passageRef: '2 Samuel 3:1–5',
      },
      {
        id: 'b-break',
        timeSec: 16,
        title: 'The break with Ish-bosheth',
        caption:
          "Ish-bosheth accuses Abner of going in to Rizpah, Saul's concubine — a charge with royal-claim overtones the narrative reports without confirming. Abner answers with indignation, not denial, and swears to transfer the kingdom from Saul's house to David, across the whole land from Dan to Beersheba. Not shown: Mahanaim, where this happens, has no confident site identification. (2 Samuel 3:6–11)",
        passageRef: '2 Samuel 3:6–11',
      },
      {
        id: 'b-overture',
        timeSec: 32,
        title: "Abner's overture",
        caption:
          "Abner sends messengers to David proposing a covenant. David's condition: Michal, Saul's daughter, must be returned to him first. She is taken from Paltiel, who follows her weeping as far as Bahurim before Abner sends him back. Text only — none of this is staged. (2 Samuel 3:12–16)",
        passageRef: '2 Samuel 3:12–16',
      },
      {
        id: 'b-elders',
        timeSec: 48,
        title: 'Word to the elders',
        caption:
          "Before coming to Hebron, Abner speaks to the elders of Israel and to Benjamin — the north's own consent gathered ahead of the visit. (2 Samuel 3:17–19)",
        passageRef: '2 Samuel 3:17–19',
      },
      {
        id: 'b-arrival',
        timeSec: 64,
        title: 'Twenty men, up the northern road',
        caption:
          "Abner comes to David at Hebron with twenty men — the text's own exact count, rendered literally. The column climbs from the direction of Israel and Benjamin, the deliberate inverse of hebron-anointing's approach from the south, and is received. (2 Samuel 3:20a)",
        passageRef: '2 Samuel 3:20a',
      },
      {
        id: 'b-feast',
        timeSec: 100,
        title: 'A feast, not a celebration',
        caption:
          'David makes Abner and his men a feast — an open-air meal on mats in a courtyard, not a banquet hall. Quiet, formal, watchful: the man seated here killed Asahel at the pool of Gibeon, and David receives him anyway. (2 Samuel 3:20b)',
        passageRef: '2 Samuel 3:20b',
      },
      {
        id: 'b-pledge',
        timeSec: 120,
        title: '"That you may reign over all that your heart desires"',
        caption:
          'Abner pledges to gather all Israel to a covenant with David, "that you may reign over all that your heart desires." (2 Samuel 3:21a, ESV)',
        passageRef: '2 Samuel 3:21a',
      },
      {
        id: 'b-peace',
        timeSec: 134,
        title: 'He went in peace',
        caption:
          'David sends Abner away, and he goes in peace — a settled, public, unhurried dismissal, held on the same road he arrived by. The narrative will repeat this formula twice more before saying what happens next. (2 Samuel 3:21b)',
        passageRef: '2 Samuel 3:21b',
      },
      {
        id: 'b-close',
        timeSec: 150,
        title: 'Not yet shown',
        caption:
          "What follows at Hebron's gate — Joab's return and what he does — belongs to the next scene, hebron-gate. Not previewed here. (2 Samuel 3:22–39)",
        passageRef: '2 Samuel 3:22–39',
      },
    ],
    viewpoints: [
      {
        id: 'vp-north-road',
        label: 'The northern road (default)',
        position: [-180, 40, 60],
        lookAt: [-30, 12, -32],
      },
      {
        id: 'vp-feast',
        label: 'The feast ground',
        position: [44, 3, -6],
        lookAt: [28, 2, -21],
      },
      {
        id: 'vp-gate-plaza',
        label: 'The gate plaza',
        position: [18, 2, -30],
        lookAt: [0, 3, -16],
      },
      {
        id: 'vp-departure',
        label: 'The peace departure',
        position: [40, 8, -10],
        lookAt: [-220, 6, -50],
      },
    ],
    claimIds: [
      'claim-hebron-identification',
      'claim-hebron-town-form',
      'claim-dress',
      'claim-david-historical',
      'claim-judah-anointing',
      'claim-long-war',
      'claim-abner-break',
      'claim-abner-overture',
      'claim-covenant-feast',
      'claim-feast-form',
      'claim-covenant-cast-scale',
    ],
    assetIds: [
      'asset-terrain-hebron-hills',
      'asset-hebron-town-form',
      'asset-terrace-walls',
      'asset-figure-procedural',
      'asset-david-marker',
      'asset-olive-tree',
      'asset-rocks',
      'asset-feast-props',
    ],
  },
  {
    id: 'hebron-gate',
    title: 'Hebron’s gate — the killing of Abner',
    passageIds: ['2sam-3'],
    locationId: 'hebron',
    periodId: 'iron-iia',
    milestoneId: 'M5',
    // Built 2026-08-10 (Sonnet/threejs-engineer) per docs/design/
    // hebron-gate-brief.md (Fable world-director pass, 2026-08-03). Second
    // scene of M5, and its load-bearing one — the second application of
    // ADR-009's named-character-killing template. 2026-08-10 M5 sign-off
    // review (Opus standing in for Fable, user-directed substitution):
    // approved as built — no longer provisional. Stays in-progress;
    // `released` gates on queue #20. Verified in code, not just captions:
    // poses.ts's `strikeLean` is zero throughout the strike window in reduced
    // mode and the fall lands earlier (poses.test.ts), no wound/blood geometry
    // exists in any component, the curse (3:29) is caption-only, and the
    // motive/apologia disputes are carried as non-adjudicating scholarlyViews.
    // Reusing `asset-bier-props` rather than minting a new `asset-bier` is
    // approved — the bier is the wrapped-form + prop convention ADR-009 already
    // ratified, and a duplicate asset id would assert a distinction that
    // doesn't exist.
    // 2026-08-12 Fable M5 release pass: queue #20 fully closed (McKenzie/
    // Halpern named on the rival-elimination view, McCarter 1980 on the
    // apologia view, herzog-1997 gate typology landed, king-stager-2001
    // mourning corroboration, 3:33b-34a + 3:38 ESV wording live-verified)
    // — released per the M3/M4 cascade.
    status: 'released',
    synopsis:
      "Joab returns from a raid and protests David's reception of Abner. He recalls Abner under a false pretext and kills him alone inside the gate passage, for the blood of Asahel his brother — a killing the narrative insists David had no part in and did not want. David publicly disavows the act, curses Joab's own house, and commands citywide mourning: Joab himself tears his clothes and mourns before Abner's bier, and David walks behind it to the grave, laments, and fasts until sundown.",
    depictsDeath: true,
    durationSec: 224,
    beats: [
      {
        id: 'b-joab-returns',
        timeSec: 0,
        title: 'From a raid, with much spoil',
        caption:
          'Joab and all his army come in from a raid, bringing much spoil. Joab is told that Abner son of Ner came to the king, was received, and has gone in peace — the third time the narrative repeats that formula. No violence yet. (2 Samuel 3:22-23)',
        passageRef: '2 Samuel 3:22-23',
      },
      {
        id: 'b-protest',
        timeSec: 16,
        title: "Joab's protest",
        caption:
          'Joab confronts David: why send Abner away, when Abner came only to deceive him — to learn his movements and his plans? His own stated reading, carried as his words; the narrative neither confirms nor denies it. (2 Samuel 3:24-25)',
        passageRef: '2 Samuel 3:24-25',
      },
      {
        id: 'b-recall',
        timeSec: 32,
        title: 'The recall',
        caption:
          'Without David’s knowledge, Joab sends messengers after Abner; they overtake him at the cistern of Sirah and bring him back — an unidentified site, never staged. But David did not know it. (2 Samuel 3:26)',
        passageRef: '2 Samuel 3:26',
      },
      {
        id: 'b-gate-aside',
        timeSec: 48,
        title: 'Into the midst of the gate',
        caption:
          'Abner returns through the gate. Joab draws him aside into the passage’s interior, as if for a private word — the drawing-aside itself is the killing’s method, staged literally, with no invented dialogue. (2 Samuel 3:27a)',
        passageRef: '2 Samuel 3:27a',
      },
      {
        id: 'b-abner-death',
        timeSec: 60,
        title: 'For the blood of Asahel',
        caption:
          'There Joab strikes him in the stomach, and he dies — for the blood of Asahel his brother, killed at the pool of Gibeon (gibeon-pool). Rendered at documentary distance in every mode, with no wound or blood geometry; reduced mode elides the strike itself, cutting straight to the aftermath. (2 Samuel 3:27b)',
        passageRef: '2 Samuel 3:27b',
      },
      {
        id: 'b-david-hears',
        timeSec: 76,
        title: 'Guiltless before the LORD',
        caption:
          "When David hears of it, he publicly declares himself and his kingdom forever guiltless before the LORD for Abner's blood, and curses Joab's own house: that it never lack one with a discharge, or leprosy, or who leans on a crutch, or falls by the sword, or lacks bread — stated plainly, in the text's own harshness, and never visualized. Abishai is named alongside Joab as sharing responsibility. (2 Samuel 3:28-30)",
        passageRef: '2 Samuel 3:28-30',
      },
      {
        id: 'b-mourning-cmd',
        timeSec: 98,
        title: 'Tear your clothes',
        caption:
          'David commands Joab and all the people with him: tear your clothes, put on sackcloth, and mourn before Abner. Joab himself tears his clothes and mourns — the killer made a public mourner at his victim’s funeral. David takes his place behind the bier. (2 Samuel 3:31)',
        passageRef: '2 Samuel 3:31',
      },
      {
        id: 'b-procession',
        timeSec: 116,
        title: 'The bier',
        caption:
          'The bier is carried to the grave at funeral pace; the mourning crowd follows. King David walks behind it, as the text itself specifies. (2 Samuel 3:31b-32a)',
        passageRef: '2 Samuel 3:31b-32a',
      },
      {
        id: 'b-burial-weep',
        timeSec: 150,
        title: 'Buried at Hebron',
        caption:
          'Abner is buried at Hebron. The king weeps aloud at the grave, and all the people weep with him. Held, unhurried — the funeral is this scene’s gravitational center, not an epilogue. (2 Samuel 3:32b)',
        passageRef: '2 Samuel 3:32b',
      },
      {
        id: 'b-lament',
        timeSec: 168,
        title: "David's lament",
        caption:
          '"Should Abner die as a fool dies? Your hands were not bound; your feet were not fettered; as one falls before the wicked you have fallen." All the people weep again over him. No invented melody. (2 Samuel 3:33-34, ESV)',
        passageRef: '2 Samuel 3:33-34',
      },
      {
        id: 'b-fast',
        timeSec: 186,
        title: 'Until the sun goes down',
        caption:
          'The people come to urge David to eat while it is still day, but he swears he will taste nothing until the sun goes down. Sundown light begins here — the one hour the narrative itself fixes. (2 Samuel 3:35)',
        passageRef: '2 Samuel 3:35',
      },
      {
        id: 'b-people-note',
        timeSec: 200,
        title: 'Not the king’s will',
        caption:
          "Everything the king does pleases all the people watching. That day, all the people and all Israel understand that it was not the king's will to put Abner to death — the narrative's own insistence, stated as it states it. (2 Samuel 3:36-37)",
        passageRef: '2 Samuel 3:36-37',
      },
      {
        id: 'b-close',
        timeSec: 212,
        title: 'A prince and a great man',
        caption:
          '"Do you not know that a prince and a great man has fallen this day in Israel?" David calls the sons of Zeruiah more severe than himself, though he is the anointed king. What follows belongs to the next scene, hebron-reckoning — not previewed here. (2 Samuel 3:38-39, ESV)',
        passageRef: '2 Samuel 3:38-39',
      },
    ],
    viewpoints: [
      {
        id: 'vp-gate-plaza',
        label: 'The gate plaza (default)',
        position: [26, 9, -2],
        lookAt: [0, 4, -30],
      },
      {
        id: 'vp-gate-shadow',
        label: 'The gate passage, at a distance',
        position: [15, 5, -28],
        lookAt: [4, 3, -43],
      },
      {
        id: 'vp-procession',
        label: 'The procession route',
        position: [-32, 10, -18],
        lookAt: [-55, 4, -38],
      },
      {
        id: 'vp-tomb',
        label: 'The tomb ground',
        position: [-70, 8, -34],
        lookAt: [-58, 4, -50],
      },
      {
        id: 'vp-kings-response',
        label: "The king's ground",
        position: [12, 6, -30],
        lookAt: [0, 3, -18],
      },
    ],
    claimIds: [
      'claim-hebron-identification',
      'claim-hebron-town-form',
      'claim-dress',
      'claim-david-historical',
      'claim-asahel-death',
      'claim-joab-return-protest',
      'claim-abner-killing',
      'claim-david-disavowal',
      'claim-abner-funeral',
      'claim-public-response',
      'claim-hebron-gate-form',
      'claim-abner-tomb-form',
      'claim-gate-cast-scale',
      'claim-mourning-dress',
    ],
    assetIds: [
      'asset-terrain-hebron-hills',
      'asset-hebron-town-form',
      'asset-terrace-walls',
      'asset-figure-procedural',
      'asset-david-marker',
      'asset-olive-tree',
      'asset-rocks',
      'asset-hebron-gate-passage',
      'asset-bier-props',
      'asset-figure-fallen',
    ],
  },
  {
    id: 'hebron-reckoning',
    title: 'The tomb of Abner, again — Rechab and Baanah',
    passageIds: ['2sam-4'],
    locationId: 'hebron',
    periodId: 'iron-iia',
    milestoneId: 'M5',
    // Built 2026-08-10 (Sonnet/threejs-engineer) per docs/design/
    // hebron-reckoning-brief.md (Fable world-director pass, 2026-08-03).
    // Third and last scene of M5, closing the milestone. ADR-009's
    // named-character-killing template's third application, and its first
    // judicial one — stricter than gibeon-pool/hebron-gate: no gesture is
    // ever invented for the execution, and the hands-and-feet display
    // (4:12a) is caption-only, absolutely, in every mode. 2026-08-10 M5
    // sign-off review (Opus standing in for Fable, user-directed
    // substitution): approved as built — no longer provisional. Stays
    // in-progress; `released` gates on queue #20. The ADR-009 dismemberment
    // bar was re-verified directly against the code at this review, not taken
    // from the build report: `AssassinPose` carries only `presented`/`fallen`,
    // with no strike/gesture field of any kind, and the only occurrences of
    // hands/feet/dismemberment anywhere in the scene folder are comments and
    // beat-caption text. The no-invented-method restraint (stricter than
    // gibeon-pool's reversed grip and hebron-gate's strike lean, because 4:12a
    // supplies no method) is ratified as the correct reading of ADR-009 for
    // any future killing the text narrates without method detail.
    // 2026-08-12 Fable M5 release pass: queue #20 fully closed (4:6 MT/LXX
    // attribution and the Hebron-pool check both closed "checked, permanently
    // thin" per the #13/#19c standard; 4:10 fragment + 4:11a ESV wording
    // live-verified) — released per the M3/M4 cascade.
    status: 'released',
    synopsis:
      "Ish-bosheth's courage fails at the news of Abner's death; two of his own captains, Rechab and Baanah, murder him defenseless in his own house at noon, behead him, and carry the head to David at Hebron expecting reward — this scene's deliberate textual twin with ziklag-lament, where a man who merely claimed to have killed Saul met the same judgment. David answers by retelling that earlier execution, pronounces the two 'wicked men' who killed 'a righteous man in his own house on his bed,' has them executed and their bodies displayed beside the pool of Hebron (narrated, never rendered), and buries Ish-bosheth's head in the tomb of Abner — the house of Saul's last king, dead by murder and buried at Hebron, closing the chapter and the milestone.",
    depictsDeath: true,
    durationSec: 162,
    beats: [
      {
        id: 'b-courage-fails',
        timeSec: 0,
        title: "Ish-bosheth's courage fails",
        caption:
          'News reaches Ish-bosheth that Abner is dead at Hebron: his courage fails, and all Israel is dismayed. Two of his own captains are introduced — Baanah and Rechab, sons of Rimmon the Beerothite, of the people of Benjamin, commanders of raiding bands under him. No violence yet; no geometry. (2 Samuel 4:1-3)',
        passageRef: '2 Samuel 4:1-3',
      },
      {
        id: 'b-mephibosheth',
        timeSec: 14,
        title: 'A lame five-year-old',
        caption:
          "The narrative's own aside on what remains of the house of Saul: Jonathan had a son, Mephibosheth, five years old when the news of Saul and Jonathan's deaths came from Jezreel. His nurse fled with him; he fell and became lame in both feet. Carried exactly where the text places it — no forward pointer to his later story. (2 Samuel 4:4)",
        passageRef: '2 Samuel 4:4',
      },
      {
        id: 'b-murder-card',
        timeSec: 28,
        title: 'At noon, in his own house',
        caption:
          'Cards only — Mahanaim is disputed and never built. At the heat of the day, as Ish-bosheth lies on his bed at noon, Rechab and Baanah enter his house: the Hebrew text, difficult at this exact point, reads them coming as if to fetch wheat; the Greek text instead describes a doorkeeper who had been cleaning wheat and grew drowsy and slept. They kill him in his bed, behead him, and flee all night by way of the Arabah. (2 Samuel 4:5-7)',
        passageRef: '2 Samuel 4:5-7',
      },
      {
        id: 'b-arrival',
        timeSec: 48,
        title: 'Up the Arabah road',
        caption:
          'The two arrive at Hebron up the Arabah road at first light, carrying a small covered bundle low — not raised, not brandished. (2 Samuel 4:8a)',
        passageRef: '2 Samuel 4:8a',
      },
      {
        id: 'b-presentation',
        timeSec: 66,
        title: 'The LORD has avenged my lord the king',
        caption:
          "Rechab and Baanah present their claim as their own words: they have brought the head of Ish-bosheth, Saul's son and David's enemy who sought his life — the LORD, they say, has avenged him this day on Saul and his offspring. Carried as their words, petitioners before David expecting reward, the bundle held low, never raised. (2 Samuel 4:8b)",
        passageRef: '2 Samuel 4:8b',
      },
      {
        id: 'b-verdict',
        timeSec: 84,
        title: 'A righteous man, in his own house, on his bed',
        caption:
          'David answers by retelling his own judgment at Ziklag (ziklag-lament) — "when one told me, \'Behold, Saul is dead,\' and thought he was bringing good news, I seized him and killed him at Ziklag" (4:10) — then asks: "How much more, when wicked men have killed a righteous man in his own house on his bed..." (4:11a, ESV) — and commands their execution. (2 Samuel 4:9-11)',
        passageRef: '2 Samuel 4:9-11',
      },
      {
        id: 'b-execution',
        timeSec: 106,
        title: 'Beside the pool of Hebron',
        caption:
          "At David's command, the young men execute Rechab and Baanah — held at documentary distance near the pool of Hebron; the text gives no method to invent, so none is shown, in either mode. Their hands and feet are cut off, and their bodies hung beside the pool — stated here exactly as the text states it; this display is never rendered as geometry, in any mode, an absolute bar under ADR-009. (2 Samuel 4:12a)",
        passageRef: '2 Samuel 4:12a',
      },
      {
        id: 'b-burial',
        timeSec: 128,
        title: 'In the tomb of Abner',
        caption:
          "The covered bundle is carried to the tomb of Abner at Hebron and buried there — the same tomb, the same ground hebron-gate's own burial used, days apart. The milestone's closing image. (2 Samuel 4:12b)",
        passageRef: '2 Samuel 4:12b',
      },
      {
        id: 'b-close',
        timeSec: 150,
        title: 'The house of Saul, ended',
        caption: 'The house of Saul’s last king is dead, and buried at Hebron. (2 Samuel 4:12)',
        passageRef: '2 Samuel 4:12',
      },
    ],
    viewpoints: [
      {
        id: 'vp-receiving-ground',
        label: "David's receiving ground (default)",
        position: [24, 10, -6],
        lookAt: [4, 3, -20],
      },
      {
        id: 'vp-arabah-road',
        label: 'The Arabah road',
        position: [170, 14, -50],
        lookAt: [110, 4, -34],
      },
      {
        id: 'vp-hebron-pool',
        label: 'The pool of Hebron, at a distance',
        position: [115, 12, -32],
        lookAt: [80, 3, -10],
      },
      {
        id: 'vp-tomb-close',
        label: 'The tomb ground',
        position: [-70, 8, -34],
        lookAt: [-58, 4, -50],
      },
    ],
    claimIds: [
      'claim-hebron-identification',
      'claim-hebron-town-form',
      'claim-dress',
      'claim-david-historical',
      'claim-ish-bosheth-assassination',
      'claim-david-judgment',
      'claim-hebron-pool-feature',
      'claim-reckoning-cast-scale',
      'claim-abner-tomb-form',
      'claim-execution-messenger',
      'claim-public-response',
    ],
    assetIds: [
      'asset-terrain-hebron-hills',
      'asset-hebron-town-form',
      'asset-terrace-walls',
      'asset-figure-procedural',
      'asset-david-marker',
      'asset-olive-tree',
      'asset-rocks',
      'asset-hebron-pool-basin',
      'asset-water-plane',
      'asset-figure-fallen',
      'asset-display-forms',
    ],
  },
  {
    id: 'jerusalem-stronghold',
    title: 'The Jebusite stronghold — Jerusalem becomes the city of David',
    passageIds: ['2sam-5'],
    locationId: 'jerusalem',
    periodId: 'iron-iia',
    milestoneId: 'M6',
    // Built 2026-08-24 (Sonnet/threejs-engineer) per docs/design/
    // jerusalem-stronghold-brief.md (Fable world-director pass, 2026-08-23).
    // Milestone 6's load-bearing and most contested scene, and the
    // project's first geometry at Jerusalem. Provisional, `in-progress`,
    // pending a Fable M6 sign-off review (fable-review-queue #21-#24).
    status: 'released',
    synopsis:
      "David, now anointed king over all Israel rather than Judah alone, takes the Jebusite stronghold of Jerusalem — a city belonging to no tribe on the seam between Judah and Benjamin. How the stronghold was taken is not narrated and is not staged; the scene holds on the ridge at the narrative's own gap. Renamed the city of David, it becomes a capital by being built: Hiram of Tyre sends cedar, carpenters, and masons, and a house goes up.",
    depictsDeath: false,
    durationSec: 178,
    beats: [
      {
        id: 'b-all-israel',
        timeSec: 0,
        title: 'All Israel comes to David',
        caption:
          'All the tribes of Israel come to David at Hebron, recall his earlier leadership, and make a covenant with him before the LORD; the elders anoint him king over Israel — lifting the house-of-Judah-only qualifier of his first anointing (2 Samuel 2:4). Not staged: the same ground already rendered twice at Hebron (hebron-anointing, hebron-covenant); see the /atlas M6 phase for the territorial change. (2 Samuel 5:1–3)',
        passageRef: '2 Samuel 5:1–3',
      },
      {
        id: 'b-regnal',
        timeSec: 14,
        title: 'Thirty years old, and two capitals',
        caption:
          "David was thirty years old when he began to reign, and reigned forty years: seven and a half years over Judah at Hebron, thirty-three years over all Israel and Judah at Jerusalem — the narrative's own figures, reported as such, with no attempt to fix them to absolute dates. (2 Samuel 5:4–5)",
        passageRef: '2 Samuel 5:4–5',
      },
      {
        id: 'b-approach',
        timeSec: 26,
        title: 'The king and his men go up',
        caption:
          "The king and his men go up to Jerusalem against the Jebusites, the land's inhabitants. The city is intact, inhabited, and clearly held by someone else — the default vantage is from outside and below, across the eastern valley, which is what makes the site's defensibility legible. (2 Samuel 5:6a)",
        passageRef: '2 Samuel 5:6a',
      },
      {
        id: 'b-taunt',
        timeSec: 54,
        title: '"The blind and the lame"',
        caption:
          'The Jebusites answer from the wall, at a distance: "You will not come in here, but the blind and the lame will ward you off" — thinking David could not enter. The saying\'s meaning is genuinely disputed (a boast about the ground, a possible ritual act, or a later etiology for the proverb 5:8c itself reports); no figure is staged performing it, on either side. (2 Samuel 5:6b, ESV)',
        passageRef: '2 Samuel 5:6b',
      },
      {
        id: 'b-taking',
        timeSec: 80,
        title: "The narrative's own gap",
        caption:
          "Nevertheless, David takes the stronghold of Zion — that is, the city of David. The text does not say how, or who went up; no assault, water shaft, or siege equipment renders, in any mode. The scene holds on the ridge, where the narrative's own camera falls silent. (2 Samuel 5:7)",
        passageRef: '2 Samuel 5:7',
      },
      {
        id: 'b-tsinnor',
        timeSec: 98,
        title: 'At the Gihon',
        caption:
          'At the spring, the foot of the eastern slope: David said whoever would strike the Jebusites should "get up the water shaft" to attack the lame and the blind. What tsinnôr names is disputed — a water shaft or conduit, a hook or grappling implement, or a meaning no longer recoverable — and the traditional identification with the excavated Warren\'s Shaft has been challenged on archaeological grounds. The project renders no mechanism, in any mode. (2 Samuel 5:8, ESV)',
        passageRef: '2 Samuel 5:8',
      },
      {
        id: 'b-dwelling',
        timeSec: 118,
        title: 'The city of David',
        caption:
          'David dwells in the stronghold, and it is called the city of David. The before/after pair closes here: the same ridge, framed from outside and below at the approach, now from inside at the dwelling — the taking itself unrendered between them. (2 Samuel 5:9a)',
        passageRef: '2 Samuel 5:9a',
      },
      {
        id: 'b-millo',
        timeSec: 132,
        title: 'From the Millo inward',
        caption:
          'David built the city all around, from the Millo inward. The word probably means something like the filling; what has been proposed — an identification with excavated terrace and stepped-stone structures on this slope, itself disputed on dating — is carried here as a named question, not a rendered answer. No element in this scene is labeled the Millo. (2 Samuel 5:9b)',
        passageRef: '2 Samuel 5:9b',
      },
      {
        id: 'b-greater',
        timeSec: 144,
        title: 'Greater and greater',
        caption:
          "David became greater and greater, for the LORD, the God of hosts, was with him — the narrative's own summary of his rise, reported as its framing, not as a measured historical trajectory (see claim-david-historical for the separate, disputed question of scale). (2 Samuel 5:10)",
        passageRef: '2 Samuel 5:10',
      },
      {
        id: 'b-hiram',
        timeSec: 152,
        title: "Hiram's cedar",
        caption:
          'Hiram king of Tyre sends messengers, cedar trees, carpenters, and masons, and they build David a house. A construction site, not a palace: timber, dressed-stone courses, and a structure still going up. Hiram himself is not staged — only his messengers, materials, and craftsmen. (2 Samuel 5:11)',
        passageRef: '2 Samuel 5:11',
      },
      {
        id: 'b-perceived',
        timeSec: 160,
        title: 'David perceived',
        caption:
          "David perceived that the LORD had established him king over Israel, and that his kingdom was exalted for the sake of his people Israel — the narrative's own statement about David's own perception. (2 Samuel 5:12)",
        passageRef: '2 Samuel 5:12',
      },
      {
        id: 'b-household',
        timeSec: 168,
        title: 'More sons, in Jerusalem',
        caption:
          'David takes more concubines and wives from Jerusalem, and more sons and daughters are born to him there — Shammua, Shobab, Nathan, Solomon, Ibhar, Elishua, Nepheg, Japhia, Elishama, Eliada, and Eliphelet, listed as the text lists them, with no forward commentary on any name. (2 Samuel 5:13–16)',
        passageRef: '2 Samuel 5:13–16',
      },
      {
        id: 'b-close',
        timeSec: 176,
        title: 'Not yet resolved',
        caption:
          "2 Samuel 5:1–16 states the covenant, the capture, the naming, the building, and the household list — nothing more. The chapter's own arrangement may be topical rather than strictly chronological: this scene does not assert that these events precede or follow the Philistine engagements of 5:17–25 (rephaim-valley). Nothing from 2 Samuel 6 onward appears here.",
        passageRef: '2 Samuel 5:1–16',
      },
    ],
    viewpoints: [
      {
        id: 'vp-kidron-east',
        label: 'Across the Kidron (default)',
        position: [140, 34, 8],
        lookAt: [0, 18, 30],
      },
      {
        id: 'vp-gihon',
        label: 'The Gihon spring',
        position: [72, 8, -14],
        lookAt: [48, 3, -6],
      },
      {
        id: 'vp-stronghold',
        label: 'Inside the enclosure',
        position: [8, 7, 58],
        lookAt: [-4, 4, 72],
      },
      {
        id: 'vp-terraces',
        label: 'The terraced slope',
        position: [48, 15, 18],
        lookAt: [18, 6, 20],
      },
      {
        id: 'vp-building-ground',
        label: "Hiram's building ground",
        position: [32, 8, 54],
        lookAt: [16, 4, 66],
      },
    ],
    claimIds: [
      'claim-hebron-identification',
      'claim-david-historical',
      'claim-dress',
      'claim-judah-anointing',
      'claim-all-israel-covenant',
      'claim-jerusalem-capture',
      'claim-tsinnor-crux',
      'claim-city-of-david-naming',
      'claim-hiram-building',
      'claim-jerusalem-household',
      'claim-jebusite-stronghold-form',
      'claim-millo-identification',
      'claim-gihon-spring',
      'claim-jerusalem-terrain-form',
      'claim-stronghold-cast-scale',
    ],
    assetIds: [
      'asset-terrain-jerusalem-ridge',
      'asset-jerusalem-stronghold-form',
      'asset-jerusalem-terrace-walls',
      'asset-gihon-spring-basin',
      'asset-water-plane',
      'asset-jerusalem-construction-ground',
      'asset-figure-procedural',
      'asset-david-marker',
      'asset-olive-tree',
      'asset-rocks',
    ],
  },
  {
    id: 'rephaim-valley',
    title: 'The Valley of Rephaim — two Philistine engagements',
    passageIds: ['2sam-5'],
    locationId: 'valley-of-rephaim',
    periodId: 'iron-iia',
    milestoneId: 'M6',
    // Built 2026-08-24 (Sonnet/threejs-engineer) per docs/design/
    // rephaim-valley-brief.md (Fable world-director pass, 2026-08-23).
    // Milestone 6's second and last scene, and the project's second battle
    // scene after gilboa-battle — deliberately a much lighter violence
    // treatment. Provisional, `in-progress`, pending a Fable M6 sign-off
    // review (fable-review-queue #21-#24, especially #24: the
    // never-visualized-sign precedent this scene establishes).
    status: 'released',
    synopsis:
      'The Philistines hear David has been anointed king over all Israel and twice come up against him in the Valley of Rephaim. The first time, David simply strikes them where they spread. The second time, the same enemy on the same ground gets a different answer: circle around, wait at the trees for a sign, then attack from behind. One scene, two phases, the same instanced Philistine population staged twice — the contrast is the whole point.',
    depictsDeath: true,
    durationSec: 210,
    beats: [
      {
        id: 'b-philistines-hear',
        timeSec: 0,
        title: 'The Philistines hear',
        caption:
          'The Philistines hear that David has been anointed king over Israel and go up to seek him; David hears of it and goes down to the stronghold — unnamed here. Which stronghold, and whether this chapter’s events precede or follow 5:1–16’s (jerusalem-stronghold), the text does not say — neither is asserted here. (2 Samuel 5:17)',
        passageRef: '2 Samuel 5:17',
      },
      {
        id: 'b-spread',
        timeSec: 14,
        title: 'The Philistines spread themselves',
        caption:
          'The Philistines come and spread themselves across the Valley of Rephaim — a wide, loose deployment, not a tight block, seen from the rim above. (2 Samuel 5:18)',
        passageRef: '2 Samuel 5:18',
      },
      {
        id: 'b-inquiry-1',
        timeSec: 30,
        title: 'David inquires',
        caption:
          'David inquires of the LORD, asking whether he should go up against the Philistines and whether the LORD will give them into his hand. The LORD answers that he should go up, for the Philistines will certainly be given into his hand. A small, still, waiting group — no ephod, lots, priest, altar, or shrine is staged; the text names no apparatus here. (2 Samuel 5:19)',
        passageRef: '2 Samuel 5:19',
      },
      {
        id: 'b-engagement-1',
        timeSec: 46,
        title: 'David strikes them',
        caption:
          'David comes to Baal-perazim and strikes the Philistines there. Read at distance as formation movement — a line closing, a deployment breaking, dust — never blow-by-blow combat. In standard mode, falls appear at silhouette distance only, with no wound or blood shown; in reduced mode the falls are elided entirely, cutting straight from the advance to the emptied valley floor. Both modes end the same way: the Philistines driven from the valley. (2 Samuel 5:20a)',
        passageRef: '2 Samuel 5:20a',
      },
      {
        id: 'b-perazim',
        timeSec: 70,
        title: 'A breaking through of water',
        caption:
          'David says that the LORD has broken through his enemies before him, like a breaking through of water — therefore the place is called Baal-perazim. The site is unlocated; its position here is an openly disclosed placeholder within the valley, not a claimed identification — there is no map pin for it. (2 Samuel 5:20b)',
        passageRef: '2 Samuel 5:20b',
      },
      {
        id: 'b-images',
        timeSec: 84,
        title: 'The abandoned images',
        caption:
          'The Philistines leave their images there. The Masoretic text has David and his men carry them away; the parallel account in 1 Chronicles 14:12 has David order them burned instead — a real divergence, surfaced here rather than resolved. No cult iconography is rendered in this scene, in either case. (2 Samuel 5:21)',
        passageRef: '2 Samuel 5:21',
      },
      {
        id: 'b-return',
        timeSec: 98,
        title: 'The Philistines come up yet again',
        caption:
          "The Philistines come up yet again and spread themselves in the Valley of Rephaim — the same ground, the same framing, the same default vantage as the first time. The repetition is deliberate: it is what makes the second answer's contrast visible. (2 Samuel 5:22)",
        passageRef: '2 Samuel 5:22',
      },
      {
        id: 'b-inquiry-2',
        timeSec: 114,
        title: 'A different answer',
        caption:
          'David inquires of the LORD again, and this time the answer is not simply to go up directly: circle around behind them and come at them opposite the balsam trees. Same restraint as the first inquiry — no apparatus, no rite, only the question and the answer. (2 Samuel 5:23)',
        passageRef: '2 Samuel 5:23',
      },
      {
        id: 'b-circling',
        timeSec: 128,
        title: 'The flanking march',
        caption:
          "David's force circles around the valley's edge, at walking pace, to a position opposite the Philistines from the trees — the scene's one strong walk affordance, and the second engagement's only genuinely new staging beat. (2 Samuel 5:23b)",
        passageRef: '2 Samuel 5:23b',
      },
      {
        id: 'b-sound',
        timeSec: 154,
        title: 'The sign in the treetops',
        caption:
          'David is told to wait for "the sound of marching in the tops of the balsam trees", then rouse himself, for the LORD will have gone out before him to strike down the Philistine army. The scene does not visualize this sign — no wind, no light, no canopy motion staged as a signal. The beat is a held wait among ordinary trees; these words carry the text\'s own claim, not an effect the observer is shown. (2 Samuel 5:24, ESV)',
        passageRef: '2 Samuel 5:24',
      },
      {
        id: 'b-engagement-2',
        timeSec: 170,
        title: 'David strikes them again',
        caption:
          'David does as the LORD commanded, and the Philistines are struck from behind their own position — the same restraint and the same distance as the first engagement. Standard mode again shows falls at silhouette distance only; reduced mode again elides them, cutting to the emptied valley floor. No triumphal staging in either mode: the beat ends on an emptied valley, not a celebration. (2 Samuel 5:25a)',
        passageRef: '2 Samuel 5:25a',
      },
      {
        id: 'b-pursuit',
        timeSec: 188,
        title: 'From Geba to Gezer',
        caption:
          'The Philistines are struck from Geba to Gezer (Masoretic text; the Septuagint and 1 Chronicles 14:16 read Gibeon in place of Geba — the released gibeon location this project has already built, without this project taking a position on which reading is right). The pursuit corridor is not staged; it is stated here as a card. (2 Samuel 5:25b)',
        passageRef: '2 Samuel 5:25b',
      },
      {
        id: 'b-close',
        timeSec: 200,
        title: 'Where the chapter ends',
        caption:
          "2 Samuel 5:17–25 states the Philistines' reaction, two engagements, a naming, and a pursuit — nothing more. As with jerusalem-stronghold's own closing card, this scene does not assert that these campaigns follow or precede the capture of Jerusalem; the chapter's arrangement may be topical. Nothing from 2 Samuel 6 onward appears here, depicted or pointed at. The milestone ends here.",
        passageRef: '2 Samuel 5:17–25',
      },
    ],
    viewpoints: [
      {
        id: 'vp-valley-rim',
        label: 'The valley rim (default)',
        position: [-70, 26, -8],
        lookAt: [60, 5, -8],
      },
      {
        id: 'vp-grove',
        label: 'Inside the grove',
        position: [94, 4, 26],
        lookAt: [25, 3, -15],
      },
      {
        id: 'vp-valley-floor',
        label: 'The valley floor (Baal-perazim)',
        position: [8, 4, -32],
        lookAt: [32, 3, -10],
      },
      {
        id: 'vp-flank-march',
        label: 'The flanking route',
        position: [30, 7, -112],
        lookAt: [80, 3, -95],
      },
    ],
    claimIds: [
      'claim-david-historical',
      'claim-dress',
      'claim-philistine-kit',
      'claim-philistine-reaction',
      'claim-rephaim-first-engagement',
      'claim-rephaim-second-engagement',
      'claim-inquiry-depiction',
      'claim-divine-sign-depiction',
      'claim-rephaim-terrain-form',
      'claim-bakaim-grove',
      'claim-rephaim-cast-scale',
    ],
    assetIds: [
      'asset-terrain-rephaim-valley',
      'asset-bakaim-grove',
      'asset-figure-procedural',
      'asset-figure-fallen',
      'asset-military-kit-israelite',
      'asset-military-kit-philistine',
      'asset-david-marker',
    ],
  },
];

export const SCENES_BY_ID: ReadonlyMap<string, SceneDef> = new Map(SCENES.map((s) => [s.id, s]));

export const DEFAULT_SCENE_ID = 'ziklag-aftermath';
