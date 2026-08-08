import type { ReconstructionClaim } from './types';

/**
 * Registry of reconstruction claims. Every labeled element in a 3D scene
 * references one or more of these ids. Keep statements honest about what is
 * narrated versus what is corroborated (see /docs/reconstruction-method.md).
 */
export const CLAIMS: ReconstructionClaim[] = [
  {
    id: 'claim-ziklag-raided',
    statement:
      'The narrative states that Amalekites raided the Negev and Ziklag, burned the town with fire, and carried its people away alive while David’s force was away (1 Samuel 30:1–2).',
    basis: 'biblical-text',
    confidence: 'high',
    sourceIds: ['esv-bible'],
    notes:
      'High confidence describes the content of the narrative. Independent archaeological corroboration of this specific raid is not available, in part because the site of Ziklag is disputed.',
  },
  {
    id: 'claim-ziklag-location',
    statement:
      'The site of biblical Ziklag is not securely identified. At least three candidate sites are defended in current scholarship.',
    basis: 'archaeology',
    confidence: 'low',
    sourceIds: ['garfinkel-ganor-2019', 'oren-tel-sera-1993', 'rainey-notley-2006'],
    scholarlyViews: [
      {
        id: 'view-ziklag-tel-sera',
        label: 'Tel Sera’ (Tell esh-Shari’a)',
        proponents: [
          'Isaac (Yitzhak) Press (1955, first proposed)',
          'Benjamin Mazar (1957)',
          'Yohanan Aharoni (1967)',
          'Eliezer D. Oren (1972–1979 excavator; 1993 site synthesis)',
          'Zachary Thomas and Chris McKinny (2022, arguing against Khirbet al-Ra’i in favor of this site)',
        ],
        summary:
          'A long-favored candidate in the western Negev on Nahal Gerar. The identification predates Oren’s 1972–1979 excavations, having first been proposed by Press (1955) and supported by Mazar (1957) and Aharoni (1967); Oren’s later work is the primary excavation report and synthesis, not the original proposal.',
        confidence: 'low',
        sourceIds: ['oren-tel-sera-1993', 'rainey-notley-2006'],
      },
      {
        id: 'view-ziklag-tel-halif',
        label: 'Tel Halif (Tell Khuweilifeh)',
        proponents: [
          'e.g., proponents cited in historical-geography surveys (attribution not yet page-verified)',
        ],
        summary:
          'A site on the Judean hill–Negev boundary near modern Lahav, defended by some historical geographers as fitting the town lists of Joshua 15 and 19.',
        confidence: 'low',
        sourceIds: ['rainey-notley-2006'],
      },
      {
        id: 'view-ziklag-khirbet-al-rai',
        label: 'Khirbet al-Ra’i',
        proponents: [
          'Yosef Garfinkel and Saar Ganor (2019 identification proposal, Strata 37: 51–59)',
          'Kyle H. Keimer (2023, defending the identification in Palestine Exploration Quarterly)',
        ],
        summary:
          'Proposed in 2019 on the basis of excavations near Lachish showing Philistine-affiliated material followed by a burnt early Iron IIA layer. Contested: Aren Maeir rejected it in press coverage (2019), and Zachary Thomas and Chris McKinny published a peer-reviewed rebuttal (Israel Exploration Journal 72/1 [2022]: 66–88) favoring Tel Sera’ instead; Keimer defended the identification in reply (2023).',
        confidence: 'low',
        sourceIds: ['garfinkel-ganor-2019'],
      },
    ],
    notes:
      'The in-app settlement is therefore a generic composite of a small early Iron Age Negev/Shephelah frontier town, not a portrait of any one candidate site. Proponent names for Tel Sera’ and Khirbet al-Ra’i were verified against secondary bibliographic sources 2026-07-07 (see source cards); the Tel Halif proponent list remains a hedged "e.g." pending its own verification pass.',
  },
  {
    id: 'claim-ziklag-scale',
    statement:
      'Ziklag is rendered as a small frontier town of roughly 1–2 hectares with on the order of a few hundred inhabitants.',
    basis: 'scholarly-reconstruction',
    confidence: 'low',
    sourceIds: ['faust-2012', 'herzog-1997', 'rainey-notley-2006'],
    notes:
      'Candidate sites differ in size, and population coefficients per built hectare are themselves debated (commonly ~100–250 persons/ha in this literature). The render should communicate "small town," not a measured plan.',
  },
  {
    id: 'claim-oval-plan',
    statement:
      'The settlement layout — dwellings ringing an open center with a perimeter belt of houses — follows a documented early Iron Age plan type ("enclosed settlements," e.g. Beersheba VII).',
    basis: 'scholarly-reconstruction',
    confidence: 'speculative',
    sourceIds: ['herzog-1997', 'faust-2012'],
    notes:
      'The plan type is archaeologically real; applying it to Ziklag specifically is a design decision and is labeled speculative in-scene.',
  },
  {
    id: 'claim-mudbrick',
    statement:
      'Houses are rendered as mudbrick on stone foundations with flat roofs of timber beams, brush, and packed mud — the standard construction of the Iron Age southern Levant.',
    basis: 'archaeology',
    confidence: 'high',
    sourceIds: ['king-stager-2001', 'mazar-1990'],
  },
  {
    id: 'claim-four-room',
    statement:
      'Pillared ("four-room") houses were widespread in Iron Age Israel and Judah; whether Ziklag — a town under Philistine control in the narrative — used this form is unknown.',
    basis: 'archaeology',
    confidence: 'moderate',
    sourceIds: ['faust-2012', 'king-stager-2001'],
    notes: 'Current placeholder massing does not yet model house interiors or pillared plans.',
  },
  {
    id: 'claim-600-men',
    statement:
      'The narrative gives David’s force as six hundred men (1 Samuel 30:9), of whom two hundred remained at the brook Besor.',
    basis: 'biblical-text',
    confidence: 'high',
    sourceIds: ['esv-bible'],
    notes:
      'Rendered at reduced count (~1:10) for performance; the in-scene label discloses this. How literally to take army numbers in these narratives is debated, and the app does not take a position. Reused in ziklag-lament for continuity of "David’s men" as a concept only, not as a headcount ratio: that scene’s witness cluster (2 Samuel 1:11–12’s "all the men who were with him") is a small, disclosed headcount (6–10 figures), the same "no ratio applies" convention jabesh-burial set for its retrieval party — the ~1:10 army-muster ratio is the wrong register for an intimate conversation scene with no narrated headcount. Reused again in hebron-anointing at the standard ~1:10 narrated ratio (the same convention as ziklag-aftermath/ziklag-lament, not a new count) for the approach-column retinue — kept visually and conceptually distinct there from that scene’s two other, differently-scaled crowds: a disclosed design-choice household column (claim-david-move-hebron) and the representative Judah assembly (claim-judah-assembly-scale), neither of which is a ratio of this six hundred.',
  },
  {
    id: 'claim-david-historical',
    statement:
      'A dynasty called the "House of David" is attested epigraphically within roughly a century and a half of David’s narrative lifetime (Tel Dan stele), supporting a historical dynasty founder; the scale of his kingdom is debated.',
    basis: 'archaeology',
    confidence: 'high',
    sourceIds: ['biran-naveh-1993', 'finkelstein-silberman-2001', 'mazar-1990'],
    scholarlyViews: [
      {
        id: 'view-david-larger-state',
        label: 'Substantial early state',
        proponents: ['e.g., Amihai Mazar (modified conventional chronology)'],
        summary:
          'Reads 10th-century remains (and sites like Khirbet Qeiyafa) as consistent with a meaningful territorial polity under David and Solomon.',
        confidence: 'moderate',
        sourceIds: ['mazar-2005-chronology'],
      },
      {
        id: 'view-david-chiefdom',
        label: 'Modest highland chiefdom',
        proponents: ['Israel Finkelstein', 'Neil Asher Silberman'],
        summary:
          'Reads the same evidence with a lower chronology: David as a real but small-scale highland chieftain, with state apparatus developing later.',
        confidence: 'moderate',
        sourceIds: ['finkelstein-silberman-2001'],
      },
    ],
  },
  {
    id: 'claim-negev-terrain',
    statement:
      'Terrain is rendered as semi-arid northern Negev / southern Shephelah country: rolling loess and chalk hills, seasonal wadis, and open scrub steppe with scattered trees.',
    basis: 'scholarly-reconstruction',
    confidence: 'high',
    sourceIds: ['rainey-notley-2006', 'borowski-1987'],
    notes:
      'Physical geography is stable at this scale, but ancient vegetation cover and land use are less certain than landforms; the current heightfield is procedural, not a real DEM.',
  },
  {
    id: 'claim-besor',
    statement:
      'The brook Besor is widely identified with Nahal Besor (Wadi Ghazzeh), the largest wadi system of the northwestern Negev, draining toward the sea south of Gaza.',
    basis: 'scholarly-reconstruction',
    confidence: 'high',
    sourceIds: ['rainey-notley-2006'],
    notes:
      'The identification is standard; the specific crossing point and route from Ziklag depend on which Ziklag candidate is adopted, and are low confidence.',
  },
  {
    id: 'claim-agriculture',
    statement:
      'Small grain plots, olive trees, and a threshing floor near the gate represent the subsistence base typical of Iron Age frontier settlements.',
    basis: 'archaeology',
    confidence: 'moderate',
    sourceIds: ['borowski-1987', 'king-stager-2001'],
    notes:
      'The presence of agriculture is well grounded; the placement of specific fields and the threshing floor at this site is illustrative.',
  },
  {
    id: 'claim-dress',
    statement:
      'Figures are dressed (at placeholder fidelity) in knee- to calf-length wool tunics and cloaks in undyed and plant-dyed tones, following Levantine depictions and textile evidence.',
    basis: 'comparative-ane',
    confidence: 'moderate',
    sourceIds: ['king-stager-2001', 'yadin-1963'],
    notes: 'Specific colors are illustrative. Current figures are abstract placeholders.',
  },
  {
    id: 'claim-amalekite-raiders',
    statement:
      'The narrative presents the Amalekites as mobile raiders of the Negev fringe who took captives and livestock rather than holding towns, and who fled on camels (1 Samuel 30:1–3, 16–17).',
    basis: 'biblical-text',
    confidence: 'high',
    sourceIds: ['esv-bible', 'sapir-hen-ben-yosef-2013'],
    scholarlyViews: [
      {
        id: 'view-camels-late',
        label: 'Camel use anachronistic for the period',
        proponents: ['Lidar Sapir-Hen', 'Erez Ben-Yosef'],
        summary:
          'Zooarchaeology of the Aravah copper districts places widespread domestic dromedary use in the southern Levant only from the late 10th century BC, later than the narrative setting.',
        confidence: 'moderate',
        sourceIds: ['sapir-hen-ben-yosef-2013'],
      },
      {
        id: 'view-camels-limited-early',
        label: 'Limited earlier camel use plausible',
        summary:
          'Others allow small-scale or fringe-desert camel use before large-scale integration, which raiding nomads could represent; direct evidence is thin.',
        confidence: 'low',
        sourceIds: ['sapir-hen-ben-yosef-2013'],
      },
    ],
    notes:
      'Depiction decision for the Milestone 2 camp scene: camels are rendered only in the narrated flight (1 Samuel 30:17), at the project’s standard reduced crowd ratio, with minimal early tack (rope halter and pad, no later frame saddle) and this dispute shown on the in-scene label. The render asserts the narrative’s mounts, not settled camel pastoralism for the period.',
  },
  {
    id: 'claim-chronology',
    statement:
      'Absolute dating of early-monarchy-period strata is disputed between "high/conventional" and "low" chronologies, shifting assignments by roughly 50–100 years.',
    basis: 'archaeology',
    confidence: 'high',
    sourceIds: ['mazar-2005-chronology', 'finkelstein-silberman-2001'],
    notes:
      'High confidence that the dispute exists and matters. Period labels in this app carry a note rather than picking a winner.',
  },
  {
    id: 'claim-wall-gate',
    statement:
      'A modest perimeter wall belt with a simple gate is rendered; the form, and even the existence, of Ziklag’s fortifications are unknown.',
    basis: 'design-placeholder',
    confidence: 'speculative',
    sourceIds: ['herzog-1997'],
    notes:
      'Informed by small fortified/enclosed settlements of the period, but not evidence for this town.',
  },
  {
    id: 'claim-well',
    statement:
      'A well/cistern is placed near the settlement; assured water storage was a general necessity of Negev-frontier settlement, though this feature is not evidenced for Ziklag itself.',
    basis: 'comparative-ane',
    confidence: 'moderate',
    sourceIds: ['borowski-1987', 'king-stager-2001'],
    notes: 'Placement and form are illustrative.',
  },
  {
    id: 'claim-time-of-day',
    statement:
      'The return is rendered in late-afternoon light for legibility; the text says David arrived "on the third day" but does not give the hour.',
    basis: 'design-placeholder',
    confidence: 'speculative',
    sourceIds: ['esv-bible'],
  },
  {
    id: 'claim-smoke-duration',
    statement:
      'Smoke is shown still rising from the ruin when David arrives. The text implies arrival after the burning; whether smoke remained visible is not stated — it is kept for orientation and mood.',
    basis: 'design-placeholder',
    confidence: 'speculative',
    sourceIds: ['esv-bible'],
  },
  {
    id: 'claim-gilboa-topography',
    statement:
      'Mount Gilboa is rendered as an identified ridge on the eastern edge of the Jezreel Valley, with the Philistine approach from the valley side and the rout draining toward the Beth-shan/Jordan side.',
    basis: 'scholarly-reconstruction',
    confidence: 'moderate',
    sourceIds: ['esv-bible', 'rainey-notley-2006'],
    notes:
      'The scene uses modern Gilboa/Jebel Faqqu’a identification and relative topography only; it does not claim a surveyed battle line or exact unit positions.',
  },
  {
    id: 'claim-gilboa-terrain-form',
    statement:
      'The Gilboa battlefield terrain is a procedural west-east ridge with a lower northern approach and eastern descent. Its broad form communicates relative topography, not DEM-derived microrelief.',
    basis: 'design-placeholder',
    confidence: 'speculative',
    sourceIds: ['esv-bible', 'rainey-notley-2006'],
    notes:
      'DEM data sourcing/licensing is deferred for Fable-tier review; this placeholder must remain disclosed until a sourced elevation-data ADR replaces it.',
  },
  {
    id: 'claim-besor-channel-form',
    statement:
      'The Besor crossing is rendered as a broad braided wadi bed — dry gravel/sand braid channels with a few standing pools — cut into rolling loess country, banks thickening from steppe scrub above to tamarisk near the bed.',
    basis: 'scholarly-reconstruction',
    confidence: 'moderate',
    sourceIds: ['rainey-notley-2006', 'borowski-1987'],
    notes:
      'Braided ephemeral-wadi morphology is the standard geomorphic description of Nahal Besor and comparable western Negev wadis; the exact bank width, cut depth, and water level shown here are illustrative, not surveyed at any one point along the wadi. Season/water level is a labeled design placeholder (the narrative states neither).',
  },
  {
    id: 'claim-two-hundred-stay',
    statement:
      'The narrative states that two hundred of David’s six hundred men were too worn out to go on and stayed behind at the brook Besor with the baggage, while four hundred pursued (1 Samuel 30:9–10).',
    basis: 'biblical-text',
    confidence: 'high',
    sourceIds: ['esv-bible'],
    notes:
      'The text frames this as physical exhaustion ("too exhausted to cross"), not reluctance — the scene stages the two hundred guarding the baggage, not shirking. See also claim-spoil-statute for the narrative’s own resolution of the question this raises.',
  },
  {
    id: 'claim-egyptian-servant',
    statement:
      'The narrative states that David’s men found an Egyptian in the open country, gave him bread, water, a pressed fig cake, and raisins after three days without food or water, and that he was the slave of an Amalekite, abandoned three days earlier when he fell sick (1 Samuel 30:11–15).',
    basis: 'biblical-text',
    confidence: 'high',
    sourceIds: ['esv-bible'],
    notes:
      'The narrative frames the abandonment as ordinary treatment of an unproductive slave by his master; this project has not sourced a specific comparative-ANE citation for slave-abandonment practice beyond what the text itself states, so that broader generalization is not asserted here. The scene stages the episode as a quiet, human-scale incident rather than melodrama, per the world-director brief.',
  },
  {
    id: 'claim-spoil-statute',
    statement:
      'The narrative states that on the return, some of David’s men wanted to deny the two hundred who stayed at the baggage any share of the recovered spoil beyond their own families; David ruled that all share alike, and this became a statute in Israel from that day (1 Samuel 30:21–25).',
    basis: 'biblical-text',
    confidence: 'high',
    sourceIds: ['esv-bible'],
    notes:
      'Rendered as narrated summary, not extended quotation, to stay within the ESV excerpt budget. This is the scene’s final beat and the narrative payoff of claim-two-hundred-stay.',
  },
  {
    id: 'claim-pack-donkeys',
    statement:
      'Baggage at the Besor crossing is shown carried by pack donkeys rather than carts or camels.',
    basis: 'comparative-ane',
    confidence: 'moderate',
    sourceIds: ['borowski-1987', 'king-stager-2001'],
    notes:
      'Donkeys are the Hebrew Bible’s default pack animal for a mobile force (e.g. 1 Samuel 25:18); wheeled transport is unevidenced for this narrative and terrain, and camels are reserved in this project to the Amalekites’ narrated flight beat (1 Samuel 30:17) per the register #6/#5 decisions, not extended to David’s own baggage train.',
  },
  {
    id: 'claim-camp-sprawl',
    statement:
      'The narrative describes the Amalekite camp as scattered widely over the open ground, feasting, drinking, and dancing over the great spoil taken from Philistine and Judahite territory (1 Samuel 30:16) — rendered as a dispersed sprawl of loose clusters around fires, with no ranks, ramparts, or command tent.',
    basis: 'biblical-text',
    confidence: 'high',
    sourceIds: ['esv-bible'],
    notes:
      'High confidence describes the narrative’s picture of a celebrating raider camp, not any archaeological plan — nomadic raider camps leave almost no excavated signature. Cluster count, spacing, and internal arrangement are illustrative (see claim-camp-scale, claim-camp-shelters).',
  },
  {
    id: 'claim-strike-timing',
    statement:
      'The narrative states that David struck the camp down beginning at twilight and continuing until the following evening (1 Samuel 30:17). The scene shows the onset at twilight and the aftermath the following evening; the roughly full day of fighting between them is compressed behind an explicit time-compression beat card, not choreographed.',
    basis: 'biblical-text',
    confidence: 'high',
    sourceIds: ['esv-bible'],
    notes:
      'Violence-rendering decision at build (per the world-director brief and previewing ADR-009): onset only — attackers close and distant figures crumple in failing light; no blow-by-blow choreography, no gore geometry in any mode. After the compression card the scene stages the recovery, not a corpse field; the day of fighting is narrated by the card, not depicted.',
  },
  {
    id: 'claim-full-recovery',
    statement:
      'The narrative states that David recovered all that the Amalekites had taken — wives, sons, daughters, and spoil, with nothing missing, small or great — and brought back all (1 Samuel 30:18–19).',
    basis: 'biblical-text',
    confidence: 'high',
    sourceIds: ['esv-bible'],
    notes:
      'The reunion of the recovered captives with the rescuers is staged as the scene’s emotional resolution — the payoff of the Ziklag scene’s grief — per the world-director brief.',
  },
  {
    id: 'claim-livestock-spoil',
    statement:
      'The narrative states that David took all the flocks and herds, which were driven ahead of the column and named "David’s spoil" (1 Samuel 30:20).',
    basis: 'biblical-text',
    confidence: 'high',
    sourceIds: ['esv-bible', 'borowski-1987'],
    notes:
      'Rendered as mixed sheep/goat flocks with some cattle, matching the paired Hebrew terms ("flocks and herds") and the ordinary animal economy of the region; counts are unstated in the text and the render’s density is illustrative, at reduced instanced count.',
  },
  {
    id: 'claim-camel-depiction',
    statement:
      'The narrative states that four hundred young men fled on camels (1 Samuel 30:17). Camels are rendered only in this narrated flight beat — no ambient herds — at the project’s standard ~1:10 crowd ratio, with minimal early tack (rope halter and simple pad, no frame saddle).',
    basis: 'biblical-text',
    confidence: 'high',
    sourceIds: ['esv-bible', 'sapir-hen-ben-yosef-2013'],
    notes:
      'High confidence describes what the narrative states, not the period question. Whether domestic camels were in wide use in the southern Levant this early is disputed; the competing views are carried on claim-amalekite-raiders, which is cited on the same in-scene label. The render asserts the narrative’s mounts, not settled camel pastoralism for the period (resolved Fable decision, uncertainty register #6).',
  },
  {
    id: 'claim-camp-shelters',
    statement:
      'Camp shelters are rendered as low ridge-awnings and brush windbreaks. The classic black goat-hair tent, familiar from later bedouin practice, is not securely attested archaeologically for this period, so no documented tent form is asserted.',
    basis: 'design-placeholder',
    confidence: 'speculative',
    sourceIds: ['esv-bible', 'king-stager-2001'],
    notes:
      'The text implies only an open, dispersed encampment (1 Samuel 30:16). Tent-dwelling pastoralists are richly attested textually and ethnographically, but nomad camps leave almost no excavated signature, and projecting the later bedouin goat-hair tent back to Iron I is exactly the anachronism trap the scene brief warns against — hence suggestive placeholder forms, labeled as such. king-stager-2001 is cited here for general Iron Age dwelling/material-culture context, not as a source specifically establishing goat-hair-tent chronology — this project’s bibliography has no source dedicated to nomadic tent archaeology yet, so the non-attestation point rests on the broader, well-known archaeological silence of ephemeral nomadic camps rather than a page-specific citation.',
  },
  {
    id: 'claim-camp-scale',
    statement:
      'The text gives no headcount for the camp; the only number is the four hundred young men who escape (1 Samuel 30:17). The camp is rendered meaningfully larger than its escapees — a nominal ~700–800 people at the project’s standard ~1:10 crowd ratio, scaled by quality tier — as a disclosed design choice, not an estimate from evidence.',
    basis: 'design-placeholder',
    confidence: 'speculative',
    sourceIds: ['esv-bible'],
    notes:
      'Nothing in the text or archaeology fixes the camp’s population; the render only needs to communicate "a camp larger than the force that escapes it." Captives are shown as a distinct grouped cluster among the sprawl.',
  },
  {
    id: 'claim-battle-scale',
    statement:
      'Gilboa is rendered as the ridge-crest engagement of 1 Samuel 31, not a national army. The render stages an order-of-magnitude combatant estimate — roughly 3,000 Israelites and a comparable-to-somewhat-larger Philistine force — as the project’s own labeled extrapolation from regional Iron Age settlement-population data, not as an assertion of a scholarly-established army size. Rendered figure groups use an increased ~1:20 narrated ratio to keep the crowd legible and performant at this larger implied scale; the rout is read by motion and dust as well as by headcount.',
    basis: 'design-placeholder',
    confidence: 'speculative',
    sourceIds: ['esv-bible', 'finkelstein-silberman-2001'],
    notes:
      "No scholar has published a combatant-count estimate for the Battle of Gilboa specifically (checked: Finkelstein & Silberman's settlement-density regional figures, Mendenhall's \"eleph as military sub-unit, not literally 'thousand'\" reading of biblical census numerals, and standard Levantine-archaeology literature — Yadin's *The Art of Warfare in Biblical Lands* is the right genre but a specific figure was not page-verified; flagged TO VERIFY in fable-review-queue if pursued further). This claim's count is the project's own labeled order-of-magnitude extrapolation, built transparently as: Finkelstein & Silberman's ~45,000 estimated highland population for the entire hill country in the 10th century BCE (settlement-density method) → roughly a third assumed to live within plausible muster range of the Jezreel/Gilboa front (~15,000) → roughly a fifth assumed to be adult males of fighting age (a standard preindustrial demographic rule of thumb, not a period-specific source) → on the order of ~3,000 Israelite combatants. The Philistine pentapolis force is staged as comparable-to-somewhat-larger given its city-state military organization, without a specific sourced figure for that step either. Every step of this chain beyond Finkelstein & Silberman's base population figure is the project's own assumption, not attributed to them or any other scholar — it exists to make the battle read as a real clash rather than a skirmish, while staying fully disclosed as extrapolated, per the project's \"label design-placeholder rather than invent\" rule (CLAUDE.md). Confidence stays speculative; this number should not be read or cited as historically established. Saul's kingdom scale is itself separately contested (see claim-david-historical); nothing here resolves that debate.",
  },
  {
    id: 'claim-line-defense',
    statement:
      'Before "the men of Israel fled before the Philistines" (1 Samuel 31:1), the two forces necessarily met and fought directly — a rout presupposes a prior engagement, even though the text moves straight from arrayed lines to flight without narrating the clash itself.',
    basis: 'design-placeholder',
    confidence: 'moderate',
    sourceIds: ['esv-bible'],
    notes:
      'User-directed addition, revising the scene brief\'s original choice to read the defeat "in the drift downhill and the dust — not in blow-by-blow fighting" (see docs/fable-review-queue.md #15). Rendered as a scripted (non-interactive) melee-clash cycle between an Israelite defensive line and the facing rank of the Philistine press — swing, block, and stagger gesture/orientation transforms only, never wound, blood, or dismemberment geometry in either violenceMode, per ADR-009. The clash choreography itself is identical in both modes; only the post-clash fall a fraction of the line takes is subject to the standard/reduced duration split. Basis relabeled 2026-07-13 (fable-review-queue #15b): this is the project\'s own textual/staging inference ("a rout presupposes a prior engagement"), not a citation to a named scholarly treatment of Iron Age Levantine melee combat — no such source has been page-verified for this specific claim, so `scholarly-reconstruction` overstated its footing; `esv-bible` alone was never adequate support for that basis label.',
  },
  {
    id: 'claim-gilboa-rout',
    statement:
      'The narrative states that the men of Israel fled before the Philistines and fell down slain on Mount Gilboa (1 Samuel 31:1).',
    basis: 'biblical-text',
    confidence: 'high',
    sourceIds: ['esv-bible'],
    notes:
      'Rendered as a rout draining down the eastern slope, read by motion and dust rather than by headcount (see claim-battle-scale); a seeded fraction of routing figures fall at distance in standard mode, per ADR-009. The line-clash beat (claim-line-defense) precedes this beat; the rout begins once that line gives way.',
  },
  {
    id: 'claim-sons-killed',
    statement:
      'The narrative names three sons of Saul — Jonathan, Abinadab, and Malchi-shua — as killed by the Philistines on Mount Gilboa (1 Samuel 31:2).',
    basis: 'biblical-text',
    confidence: 'high',
    sourceIds: ['esv-bible'],
    notes:
      'Rendered at the distance of the melee, without wound or blood geometry in any mode; the deaths are read by the line collapsing over them, not by a depicted strike (ADR-009).',
  },
  {
    id: 'claim-saul-wounded-archers',
    statement:
      'The narrative states that the battle pressed hard against Saul, the archers found him, and he was badly wounded by the archers (1 Samuel 31:3).',
    basis: 'biblical-text',
    confidence: 'high',
    sourceIds: ['esv-bible'],
    notes:
      "Rendered as Saul staggering/going to one knee; no wound or blood geometry in any mode. In reduced mode the hit itself is elided — he is simply down/faltering by the next beat (ADR-009). The volley itself is rendered as three staggered instanced-arrow waves arcing from the Philistine archer line toward the crest (`ArrowVolley.tsx`), the last landing as Saul begins to stagger — a staging/timing choice (wave count, cadence, and convergence-on-the-crest scatter) disclosed here as the project's own compression, not an attested volley tactic or cadence from any source; the arrows themselves carry no impact/wound geometry, only flight. Composite-bow use by both forces' archer elements is the existing comparative-ANE assumption already carried by `claim-israelite-muster-kit`/`claim-philistine-kit` (Yadin 1963; King & Stager 2001) — this claim does not add a new weapon-form assertion, only the volley's staging.",
  },
  {
    id: 'claim-armor-bearer-refusal',
    statement:
      'The narrative states that the badly wounded Saul asked his armor-bearer to draw his sword and run him through so the uncircumcised Philistines would not abuse him; the armor-bearer would not, for he feared greatly; Saul then took his own sword and fell on it; and when the armor-bearer saw that Saul was dead, he too fell on his own sword and died with him (1 Samuel 31:4–5).',
    basis: 'biblical-text',
    confidence: 'high',
    sourceIds: ['esv-bible'],
    notes:
      'The refusal is the death sequence’s emotional pivot and is staged identically in both violence modes (a gesture/orientation beat, no violence). Saul’s death and the armor-bearer following him are rendered at documentary distance — the act understood, never shown graphically; no blade-entry geometry, no blood, in any mode. Reduced mode elides the animated fall and cuts to the resulting still pose (ADR-009).',
  },
  {
    id: 'claim-saul-death',
    statement:
      'The narrative states that Saul, his three sons, his armor-bearer, and all his men died together that same day (1 Samuel 31:6).',
    basis: 'biblical-text',
    confidence: 'high',
    sourceIds: ['esv-bible'],
    notes:
      'Staged as the scene’s closing beat: the ridge emptied and quiet at dusk, with a forward-pointing (not depicted) card toward the next-day events at Beth-shan (1 Samuel 31:8–10, out of scope for this scene).',
  },
  {
    id: 'claim-israelite-muster-kit',
    statement:
      'Israelite combatants at Gilboa are equipped with simple, non-uniform arms over the generic tunic/cloak base — spears, oval shields, and a minority of bows — with Saul, his sons, and his armor-bearer carrying marginally more/better kit (spear and shield) than the generic retinue. No standing army, uniform equipment, or fixed unit organization is asserted.',
    basis: 'biblical-text',
    confidence: 'moderate',
    sourceIds: ['esv-bible', 'yadin-1963', 'king-stager-2001'],
    notes:
      'The archers who find Saul are named in the text (1 Samuel 31:3), so bows are load-bearing rather than decorative; spear and shield are the baseline comparative-ANE assumption for Iron I–IIA highland combatants (Yadin 1963; King & Stager 2001), not a specific excavated Israelite panoply. Kit is deliberately non-uniform per figure (see `assignRetinueKit` in the scene code) — the render does not claim a documented "Israelite uniform".',
  },
  {
    id: 'claim-philistine-kit',
    statement:
      'The Philistine force at Gilboa is rendered with a distinct kit profile — round shields and straight swords for infantry and principals, and a forward archer element carrying bows. A plumed/feathered headdress (the Medinet Habu "Sea Peoples" marker) is rendered on the small kit-differentiated principal cluster only, never on crowd/infantry/archer instances.',
    basis: 'comparative-ane',
    confidence: 'low',
    sourceIds: [
      'king-stager-2001',
      'yadin-1963',
      'yasur-landau-2012-feathered-helmets',
      'stager-mountjoy-2007-ashkelon-krater',
      'master-2021-philistines-highlands',
    ],
    scholarlyViews: [
      {
        id: 'view-philistine-headdress-sea-peoples-marker',
        label: 'Plumed headdress as a genuine Sea Peoples/Philistine material-culture marker',
        summary:
          'The feathered/plumed headdress is the best-attested and most widely reproduced Philistine visual signifier, drawn from the Egyptian Medinet Habu reliefs of Ramesses III (c. 1175 BCE) depicting "Sea Peoples" including the Peleset (Philistines). This is not solely an Egyptian artistic invention: Yasur-Landau (Talanta 44 [2012]: 27–40) joins the Egyptian relief evidence to independent Levantine/Aegean archaeological finds, including a bronze chariot linchpin from Tel Miqne-Ekron bearing the same headdress. Stager and Mountjoy (in Crawford et al., eds., Up to the Gates of Ekron, 2007) publish a painted Philistine Bichrome krater excavated at Ashkelon (Grid 38, Phase 18) depicting a warrior wearing the same headdress on locally made Philistine pottery — read by Stager as a Philistine self-portrait rather than outside caricature — placing the motif in the "ripe"/mature Bichrome phase, conventionally the later 12th–11th century BCE. Omitting the headdress from a Philistine-force rendering would understate a marker now corroborated by Philistine material culture itself, not just Egyptian propaganda art.',
        confidence: 'moderate',
        sourceIds: [
          'yadin-1963',
          'yasur-landau-2012-feathered-helmets',
          'stager-mountjoy-2007-ashkelon-krater',
        ],
      },
      {
        id: 'view-philistine-headdress-attribution-contested',
        label: 'Ethnic/temporal application to this highland scene remains an extrapolation',
        summary:
          "Even with the Ashkelon/Ekron corroboration, every directly attested example of the headdress — the Medinet Habu reliefs, the Ashkelon krater, the Ekron linchpin — comes from the coastal plain (the Nile Delta or Philistia proper), none from the highlands or Jezreel Valley, and all are representational media (temple relief, painted pottery, decorative bronze fitting), not excavated worn gear from a battle context. The latest directly dated local attestation (the Ashkelon krater's \"ripe\" Bichrome phase) runs into the 11th century BCE at the earliest end of estimates, but no artifact bearing this motif is dated to the Iron I/IIA transition itself (the traditional window for Saul's death, commonly placed c. 1010 BCE), so a chronological gap of decades between the latest directly attested example and the Gilboa narrative's traditional date is not closed by direct evidence. Separately, Master (Jerusalem Journal of Archaeology 1 [2021]: 203–220) argues, from text and settlement-pattern evidence, that Philistine raiding activity in the central highlands is plausible in exactly this late Iron I–early Iron IIA window — independent support for a Philistine force being present near Gilboa at all in this period — but that article does not extend the headdress motif itself into the highlands; it says nothing about material-culture iconography. The inference that this specific headdress was worn battlefield gear at Gilboa therefore remains a disclosed extrapolation from adjacent (coastal, slightly earlier) evidence, not a directly attested fact.",
        confidence: 'low',
        sourceIds: [
          'king-stager-2001',
          'yasur-landau-2012-feathered-helmets',
          'master-2021-philistines-highlands',
        ],
      },
    ],
    notes:
      'Round shield and straight sword are the baseline comparative-ANE/Aegean-influenced assumption for Philistine coastal-plain combatants (Yadin 1963; King & Stager 2001), not a specific excavated Gilboa-context panoply — moderate/low confidence throughout. 2026-07-16 citation-verification pass (fable-review-queue #13): could not obtain page-level citations for the headdress discussion specifically within King & Stager 2001 or Yadin 1963 (no accessible full text/preview surfaced exact pagination; see those cards\' updated `confidenceNotes`) — that narrow page-check remains outstanding. What the pass did establish, via newly added, checkable secondary literature (`yasur-landau-2012-feathered-helmets`, `stager-mountjoy-2007-ashkelon-krater`, `master-2021-philistines-highlands`): the headdress is genuinely corroborated as Philistine self-reproduced material culture (not only an Egyptian propaganda motif), extending its directly-attested range from the single c. 1175 BCE Medinet Habu moment into local Philistine coastal-plain art through roughly the 11th century BCE — but every direct attestation stays on the coastal plain and in representational media, none reaching the highlands, the Iron I/IIA transition, or excavated worn gear. Rendering it only on the small principal cluster, behind this scholarlyViews label, remains the provisional default agreed for build; the highland/Iron IIA application is now a precisely characterized, disclosed extrapolation rather than a vaguely "unverified" citation gap, but it is still not a resolved attribution. No "Philistine uniform" is asserted.',
  },
  {
    id: 'claim-beth-shan-identification',
    statement:
      'Beth-shan is securely identified with Tel Beth-Shean, at the junction of the Harod and Jordan valleys — a large, extensively excavated tell with a documented Egyptian-garrison town and Iron I occupation on the summit.',
    basis: 'archaeology',
    confidence: 'high',
    sourceIds: ['mazar-beth-shean-2006', 'rainey-notley-2006'],
    notes:
      'The project’s first securely identified, excavated urban site (Mazar’s 1989–1996 renewed excavations), which raises the honesty bar for what the scene can and cannot claim about the town’s form and fortification (see claim-beth-shan-town-form, claim-beth-shan-wall).',
  },
  {
    id: 'claim-beth-shan-town-form',
    statement:
      'The post-garrison Iron I town on the summit is rendered as a dense quarter of small conjoined mudbrick houses along narrow lanes, consistent in general character with the excavated domestic quarters, generations after the Egyptian garrison’s end.',
    basis: 'archaeology',
    confidence: 'moderate',
    sourceIds: [
      'mazar-beth-shean-2006',
      'mazar-panitz-cohen-2009-beth-shean-vol3',
      'mazar-2012-bar-saul-impaled',
    ],
    notes:
      'Confidence in the general Iron I domestic-quarter character is moderate; the specific massing, house count, and lane pattern rendered here are a disclosed design placeholder, not a reproduction of the excavated plan (asset-tell-town-blocks). Queue #16 verification pass (2026-07-16): the relevant Iron I sequence in the renewed excavations (Mazar & Panitz-Cohen, Volume III, 2009, Areas N/S) runs through the post-Egyptian levels Rowe/James originally numbered Level VI into Level V; Mazar\'s own popular synthesis (mazar-2012-bar-saul-impaled) treats the horizon immediately after "the collapse of Egyptian control" (the end of the Egyptianized Lower VI phase) through the following Canaanite phase as the one at stake for the Saul narrative. This is cited at the resolution available from secondary summaries, not a page-verified stratum-to-verse equation, and absolute dating of this horizon is itself part of the unresolved high/low Iron Age chronology debate (register #5) — no single calendar date is asserted here.',
  },
  {
    id: 'claim-egyptian-monuments',
    statement:
      'One or two weathered Egyptian monuments — in the tradition of the excavated Seti I stelae and the Ramesses III statue — are shown near the summit, curated into visibility in the later Iron Age town.',
    basis: 'archaeology',
    confidence: 'moderate',
    sourceIds: ['mazar-beth-shean-2006', 'mazar-panitz-cohen-2009-beth-shean-vol3'],
    notes:
      'Additive, not load-bearing. Queue #16 verification pass (2026-07-16): secondary scholarly summaries of the excavations (describing a "Monuments Courtyard" fronting the twin-temple complex, where the Seti I stelae, a Ramesses II stela, and the reused Ramesses III statue were found together, interpreted as the post-garrison community deliberately preserving and displaying its Egyptian-period monuments) corroborate the curated-into-Iron-I reading across more than one independent source — this is a real, repeated finding in the secondary literature, not a single interpreter\'s inference. What remains unverified by primary-copy inspection is the fine-grained sub-phase: whether the courtyard display persisted specifically into the sub-phase corresponding to the traditional Saul-narrative window, versus an earlier Iron I sub-phase (see claim-beth-shan-town-form\'s stratum notes). The historical basis for showing the monuments at all is no longer a release-blocking gap; the remaining hedge is fidelity/sub-phase precision only (see asset-egyptian-monuments).',
  },
  {
    id: 'claim-beth-shan-wall',
    statement:
      'The narrative states that the Philistines fastened the bodies to the wall of Beth-shan (1 Samuel 31:10, 12); the scene renders a modest mudbrick-on-stone perimeter along the tell brow above the gate approach.',
    basis: 'biblical-text',
    confidence: 'high',
    sourceIds: ['esv-bible', 'mazar-beth-shean-2006', 'mazar-2012-bar-saul-impaled'],
    scholarlyViews: [
      {
        id: 'view-beth-shan-wall-public-square',
        label: '2 Samuel 21:12 names a public square, not a wall',
        summary:
          'The parallel notice in 2 Samuel 21:12 places the bodies "in the public square of Beth-shan" rather than on a wall — a genuine textual variant. The scene resolves it visually rather than in text alone by staging the display on the wall face directly above the gate plaza, so both readings point at the same spot.',
        confidence: 'moderate',
        sourceIds: ['esv-bible'],
      },
    ],
    notes:
      'High confidence describes what the narrative states, not archaeological corroboration. Queue #16 verification pass (2026-07-16) corrects and strengthens this note: per Mazar\'s own published position (mazar-2012-bar-saul-impaled, "Was King Saul Impaled on the Wall of Beth Shean?", BAR 38.2 [2012]), no fortification wall of any excavated period — not Iron I specifically, but any period — has been identified at Tel Beth-Shean, and the same synthesis reports no distinctive Philistine material culture in the relevant post-garrison stratum. The gap disclosed here was, if anything, understated by the previous wording ("no substantial Iron I fortification wall is clearly attested," which could be read as leaving room for partial/ambiguous wall evidence); the corrected, more precisely sourced statement is that no fortification wall has been excavated at the site at all. The wall is rendered as narrated, disclosed as archaeologically unattested, and reads as much as the conjoined outer faces of edge buildings as a freestanding fortification — never presented as excavated-verified. (This project has not obtained primary-copy page access to the BAR article itself; the finding is corroborated across multiple independent secondary quotations of it — see mazar-2012-bar-saul-impaled\'s confidenceNotes.)',
  },
  {
    id: 'claim-body-display',
    statement:
      'The narrative states that the Philistines fastened Saul’s body to the wall (1 Samuel 31:10), and that the men of Jabesh later took "the body of Saul and the bodies of his sons" from it (31:12) — four forms, rendered as bound, wrapped, anatomically unresolved silhouettes at wall-top distance.',
    basis: 'biblical-text',
    confidence: 'high',
    sourceIds: ['esv-bible'],
    notes:
      '31:9–10 speaks of the beheading and "his body" in the singular; 31:12 gives the plural "bodies of his sons" alongside Saul’s — the scene renders four forms per 31:12 rather than silently harmonizing the progression. No head or headless geometry is rendered in either violence mode (ADR-009): distance and wrapping carry the fact stated in captions without depicting or visually contradicting the mutilation. No rope/nail rigging detail is shown; the mounting mechanism stays abstract (asset-display-forms).',
  },
  {
    id: 'claim-armor-ashtaroth',
    statement:
      'The narrative states that the Philistines put Saul’s armor in the temple of Ashtaroth and sent messengers through Philistine country to proclaim the news (1 Samuel 31:9–10); the scene carries this beat through the messengers’ departure and its caption, without locating or building a temple on-site.',
    basis: 'biblical-text',
    confidence: 'high',
    sourceIds: ['esv-bible'],
    scholarlyViews: [
      {
        id: 'view-dagon-temple-1chr10',
        label: '1 Chronicles 10:10 names a temple of Dagon for the head',
        summary:
          '1 Chronicles 10:10 gives a parallel notice — the head fastened in the temple of Dagon, rather than the armor in Ashtaroth’s temple — a textual variant the scene does not resolve by staging either temple, since 31:10 itself does not locate Ashtaroth’s temple at Beth-shan.',
        confidence: 'moderate',
        sourceIds: ['esv-bible'],
      },
      {
        id: 'view-rowe-twin-temples-beth-shan',
        label: 'Rowe’s identification of the Level V twin temples with these shrines',
        summary:
          'Alan Rowe’s 1920s-30s University of Pennsylvania excavations identified twin temples he assigned to "Level V" at Beth-shan with the temples of Ashtaroth/Dagon named in 1 Samuel 31 and 1 Chronicles 10. Queue #16 verification pass (2026-07-16): this identification remains genuinely unresolved rather than settled either way. Secondary scholarly summaries consistently frame it as "Rowe suggests" or "Rowe identified," i.e. an excavator\'s proposal rather than an established consensus reading, and Mazar\'s own renewed excavations (mazar-2012-bar-saul-impaled; mazar-panitz-cohen-2009-beth-shean-vol3) reattribute the same twin-temple complex to an earlier stratigraphic horizon (Mazar\'s "Late Level VI" / Stratum S-2) than Rowe\'s original Level V, which itself unmoors Rowe\'s chronological correlation with Saul\'s death even apart from the deity-identification question. No source found in this pass asserts the identification has been either vindicated or formally rejected by subsequent scholarship — it is accurately described as contested/unresolved, which is why this project carries it only as a scholarlyView rather than a claim.',
        confidence: 'low',
        sourceIds: [
          'mazar-beth-shean-2006',
          'mazar-2012-bar-saul-impaled',
          'mazar-panitz-cohen-2009-beth-shean-vol3',
        ],
      },
    ],
    notes:
      "The armor beat is carried by the messenger departure and its caption alone — armor borne away, destination named, no building asserted or shown on-site (omission over invention). No trophy-carry of the head is rendered in the procession. Queue #16 (2026-07-16): omitting the temple remains the right call — see view-rowe-twin-temples-beth-shan for the verification of that identification's unresolved status.",
  },
  {
    id: 'claim-jabesh-retrieval',
    statement:
      'The narrative states that Jabesh-gilead heard what the Philistines had done to Saul, and that all its valiant men walked through the night, took the body of Saul and the bodies of his sons from the wall of Beth-shan, and carried them away (1 Samuel 31:11–12a).',
    basis: 'biblical-text',
    confidence: 'high',
    sourceIds: ['esv-bible'],
    notes:
      'Shared between beth-shan-walls (the news crossing the valley and the taking-down, staged at the wall where it happened) and jabesh-burial (which opens with the column arriving home and recaps the retrieval rather than re-staging it — one event, staged once, per the scope-line adjustment in docs/design/beth-shan-walls-brief.md). The text narrates no guard fight or confrontation at the wall, and none is staged: night, quiet, ropes and biers implied, documentary distance.',
  },
  {
    id: 'claim-beth-shan-control',
    statement:
      'Who held Beth-shan when the bodies were displayed is genuinely uncertain: the narrative implies Philistine use of the city, but the excavated post-garrison material culture reads substantially Canaanite, with little classic Philistine signature.',
    basis: 'scholarly-reconstruction',
    confidence: 'low',
    sourceIds: [
      'mazar-beth-shean-2006',
      'mazar-1990',
      'finkelstein-silberman-2001',
      'mazar-2012-bar-saul-impaled',
    ],
    scholarlyViews: [
      {
        id: 'view-beth-shan-philistine-garrison',
        label: 'Philistine garrison or direct control',
        summary:
          'The narrative’s use of the city to display Saul’s body implies Philistine military reach and control at Beth-shan in this period.',
        confidence: 'low',
        sourceIds: ['finkelstein-silberman-2001'],
      },
      {
        id: 'view-beth-shan-canaanite-orbit',
        label: 'Canaanite city within a Philistine orbit',
        summary:
          'The excavated post-Egyptian-garrison town’s material culture is substantially Canaanite in character, with little classic Philistine signature, suggesting a local Canaanite city usable by or aligned with Philistine interests rather than a Philistine garrison proper.',
        confidence: 'moderate',
        sourceIds: ['mazar-beth-shean-2006', 'mazar-1990'],
      },
    ],
    notes:
      'Rendered as a local Canaanite town population with a visiting Philistine detachment/escort, not a "Philistine city" — the render follows the Canaanite-orbit reading’s population choice while carrying both views here rather than silently picking a winner. Queue #16 verification pass (2026-07-16): Mazar\'s own popular synthesis (mazar-2012-bar-saul-impaled) reports no distinctive Philistine material culture (e.g., no Philistine painted pottery) in the relevant stratum, which strengthens the Canaanite-orbit reading\'s evidentiary footing without resolving the dispute — Mazar\'s own stated conclusion is that the narrative "at best" reflects a Philistine campaign into the valley rather than sustained occupation or garrison, a middle position this project does not adopt as the sole answer.',
  },
  {
    id: 'claim-jabesh-location',
    statement:
      'The site of biblical Jabesh-gilead is not securely identified. Two candidate tells are defended in current scholarship; this scene renders a disclosed composite of the lower Wadi Yabis setting rather than either candidate’s actual plan (docs/uncertainty-register.md, register #8).',
    basis: 'scholarly-reconstruction',
    confidence: 'low',
    sourceIds: ['rainey-notley-2006'],
    scholarlyViews: [
      {
        id: 'view-jabesh-tell-el-maqlub',
        label: 'Tell el-Maqlub',
        summary:
          'Fits the Wadi Yabis name continuity and Eusebius’ ancient distance notice for Jabesh from Pella; a longer-favored candidate in historical-geography atlases.',
        confidence: 'moderate',
        sourceIds: ['rainey-notley-2006'],
      },
      {
        id: 'view-jabesh-tell-abu-al-kharaz',
        label: 'Tell Abu al-Kharaz',
        proponents: ['e.g., Peter Fischer (excavator)'],
        summary:
          'An excavated Jordan Valley-edge site with a well-published Iron Age sequence, proposed as Jabesh-gilead; attribution to specific excavation-report argumentation is not yet page-verified here.',
        confidence: 'low',
        sourceIds: ['rainey-notley-2006'],
      },
    ],
    notes:
      'Register #8’s current default is a disclosed composite: a representative lower-Wadi-Yabis setting (the wadi corridor, hill country over the Jordan valley) common to both candidates, not a portrait of either tell — the same discipline applied to Ziklag’s unresolved candidates. This scene deliberately does not adopt either site’s plan.',
  },
  {
    id: 'claim-gilead-terrain',
    statement:
      'The scene renders terraced hill-flank ground above a modest perennial wadi — the Wadi Yabis corridor form on Gilead’s western flank, rising from the Jordan valley toward the Gilead hill country.',
    basis: 'scholarly-reconstruction',
    confidence: 'moderate',
    sourceIds: ['rainey-notley-2006'],
    notes:
      'Procedural terrain (ADR-005 hills + a channel feature), not DEM-derived — see asset-terrain-jabesh-wadi. The general Gilead hill-flank form (narrower, greener wadi than the Negev/Besor forms rendered earlier in the project) is reasonably well established regionally even though the specific site is not.',
  },
  {
    id: 'claim-jabesh-town-form',
    statement:
      'The scene renders Jabesh-gilead as a small, open, unwalled hamlet cluster (roughly 8-12 structures) on a hill terrace — a settlement form distinct from both Ziklag’s enclosed ring and Beth-shan’s dense tell quarter.',
    basis: 'design-placeholder',
    confidence: 'speculative',
    sourceIds: ['rainey-notley-2006'],
    notes:
      'ADR-006 per-scene layout justification: since the site itself is unlocated (claim-jabesh-location), no plan-level excavated evidence exists to model against. An open, unwalled small hamlet is chosen as a generic, defensible Iron I Gilead settlement form rather than reusing either prior scene’s layout generator wholesale — disclosed as a placeholder, not an excavated reconstruction.',
  },
  {
    id: 'claim-night-march',
    statement:
      'The narrative states that Jabesh-gilead’s valiant men walked all night, crossed to Beth-shan, and carried the bodies home (1 Samuel 31:11-12). The scene depicts the walk and its plausibility without asserting a specific distance or duration.',
    basis: 'biblical-text',
    confidence: 'high',
    sourceIds: ['esv-bible', 'rainey-notley-2006'],
    notes:
      'No on-screen kilometer or duration figure is given, matching the Besor route’s precedent (register #2): the round trip’s real length depends on the unresolved Jabesh site question and on the Jordan crossing itself, which happens off-scene.',
  },
  {
    id: 'claim-burning-bodies',
    statement:
      'The narrative states that the men of Jabesh burned the bodies at Jabesh before burying the bones (1 Samuel 31:12b) — cremation, which is exceptional against normal Israelite burial practice. The parallel account in 1 Chronicles 10:12 omits the burning.',
    basis: 'biblical-text',
    confidence: 'high',
    sourceIds: ['esv-bible', 'king-stager-2001'],
    scholarlyViews: [
      {
        id: 'view-burning-honorable-treatment',
        label: 'Honorable treatment of mutilated, exposed bodies',
        proponents: [
          'Carl Friedrich Keil (Keil & Delitzsch commentary, ad loc. 1 Samuel 31:12-13)',
        ],
        summary:
          'Burning is read as an honorable response to bodies that were mutilated (beheaded) and had been publicly displayed for some time — a protective, dignifying act rather than a normal funerary rite. Keil reads the burning as flowing from the bodies already being mutilated/decapitated, which made an ordinary burial impossible in the usual sense.',
        confidence: 'low',
        sourceIds: ['king-stager-2001', 'keil-delitzsch-1866'],
      },
      {
        id: 'view-burning-prevent-desecration',
        label: 'Preventing further desecration',
        proponents: [
          'Carl Friedrich Keil (Keil & Delitzsch commentary, ad loc. 1 Samuel 31:12-13)',
          'John Gill (Exposition of the Old Testament, ad loc. 1 Samuel 31:12)',
        ],
        summary:
          'Burning is read as a practical measure to prevent any further mistreatment or loss of what remained of the bodies, given the circumstances of their recovery from a hostile city’s wall. Both Keil and Gill give the men of Jabesh’s fear that the Philistines might follow up their victory and reach Jabesh as a reason for the haste and the burning; Gill additionally notes the bodies may already have been too putrid (days of exposure on Beth-shan’s wall) for normal handling.',
        confidence: 'low',
        sourceIds: ['king-stager-2001', 'keil-delitzsch-1866', 'gill-exposition-1763'],
      },
      {
        id: 'view-burning-textual-emendation',
        label: 'An older interpretive tradition reading "burned" as spices, not cremation',
        proponents: [
          'Targum Jonathan (as reported by Gill and by Keil & Delitzsch)',
          'David Kimchi (Radak) and Solomon ben Melech, per Gill’s Exposition — though Gill notes both ultimately favor the plain cremation reading',
        ],
        summary:
          'An older interpretive tradition — attested in the Aramaic Targum and discussed by the medieval Jewish commentators Kimchi and Ben Melech, as reported in Gill’s Exposition — reads the verb here by analogy with the ceremonial burning of spices or a king’s bedding/goods over a body (compare 2 Chronicles 16:14’s "very great burning" for King Asa), rather than cremation of the corpse itself. This is not a modern textual-critical emendation of the Hebrew text; it is a philological/interpretive minority reading, and Keil & Delitzsch explicitly reject it, arguing the phrasing here differs from the "made a burning for him" idiom used for the spice-burning custom elsewhere. Gill reports Kimchi and Ben Melech themselves ultimately prefer the plain reading (flesh burned, bones buried) over the spice-burning alternative.',
        confidence: 'speculative',
        sourceIds: ['keil-delitzsch-1866', 'gill-exposition-1763'],
      },
    ],
    notes:
      'Citation verification (fable-review-queue #17) substantially resolved: the three scholarlyViews above are now backed by named, checkable commentators (Keil & Delitzsch’s Biblical Commentary on the Books of Samuel, 1866; John Gill’s Exposition of the Old Testament, 1748-63) discussing this exact crux at 1 Samuel 31:12-13, rather than the general burial-practice baseline (king-stager-2001) alone. Content was verified via web search cross-checking multiple independent digital reproductions of these public-domain 19th/18th-century texts, not by direct page-by-page inspection of an original print volume — exact original print pagination remains TO VERIFY (see both new source cards’ confidenceNotes), so proponents are cited by name and passage (ad loc. 1 Samuel 31:12-13) rather than by page number. king-stager-2001 still anchors normal Israelite (non-cremation) burial practice as the baseline this act departs from. The depiction stays restrained (documentary distance, covered-before-flame in every mode — no burning silhouette or charring detail, ever), but the anomaly itself is stated as fact in every mode’s captions; reduction abstracts the depiction, never the fact.',
  },
  {
    id: 'claim-tamarisk-burial',
    statement:
      'The narrative states that the men of Jabesh buried the gathered bones under the tamarisk at Jabesh (1 Samuel 31:13a).',
    basis: 'biblical-text',
    confidence: 'high',
    sourceIds: ['esv-bible'],
    notes:
      'The parallel account in 1 Chronicles 10:12 names "the oak" (terebinth) rather than "the tamarisk" — a genuine textual variant, carried as a label note rather than resolved by picking one species. The tamarisk also echoes 1 Samuel 22:6, where Saul is described sitting under a tamarisk at Gibeah — the same tree type bracketing his reign’s low point and its final scene, worth noting without over-reading as deliberate authorial symmetry. The bones render only as a cloth-wrapped bundle (buildWrappedFormGeometry at a short length scale) — never skeletal geometry, in any mode.',
  },
  {
    id: 'claim-seven-day-fast',
    statement:
      'The narrative states that Jabesh-gilead fasted seven days after the burial (1 Samuel 31:13b) — a communal mourning rite. The scene renders this as a time-compression card (a compressed day-cycle shimmer) rather than seven literal days of simulated time.',
    basis: 'biblical-text',
    confidence: 'high',
    sourceIds: ['esv-bible', 'king-stager-2001'],
    notes:
      'Seven-day mourning periods recur elsewhere in the Hebrew Bible (e.g., Genesis 50:10, Job 2:13) as a conventional span for acute communal grief; king-stager-2001 anchors the general practice of Israelite mourning ritual this fits within. The compression itself is a keyframed lighting-rig oscillation (a rig mutation, not new lights or a literal seven-day simulation) — see poses.ts’s sevenDayShimmerEnvelope/Oscillation.',
  },
  {
    id: 'claim-amalekite-messenger-account',
    statement:
      'The narrative states that an Amalekite messenger told David he found Saul leaning on his spear, still alive with the Philistines closing in, and that at Saul’s own request he killed him (2 Samuel 1:6–10).',
    basis: 'biblical-text',
    confidence: 'high',
    sourceIds: ['esv-bible', 'mccarter-1984-ii-samuel'],
    scholarlyViews: [
      {
        id: 'view-amalekite-fabrication',
        label: 'Self-serving fabrication for reward/favor',
        proponents: [
          'John Gill (Gill’s Exposition of the Old Testament, 1748–63, ad loc. 2 Samuel 1:6)',
        ],
        summary:
          'Gill reads the messenger’s account as containing invented specifics, not just an inflated role: the claim that Saul was found "leaning on his spear" contradicts 1 Samuel 31:4’s own narration that he fell on his sword, and the claim that "chariots and horsemen" pressed Saul contradicts 1 Samuel 31:3’s archers — discrepancies Gill notes directly against the earlier chapter. On this reading the messenger has an obvious motive (reward, standing with David) and an Amalekite identity a Ziklag audience has every reason to distrust; the narrated manner of Saul’s death and the killing claim itself are invented, even if Gill judges the crown and armlet themselves to be a genuine find (see view-amalekite-looter-embellishment for the related, narrower reading of that detail).',
        confidence: 'low',
        sourceIds: ['gill-exposition-1763'],
      },
      {
        id: 'view-amalekite-looter-embellishment',
        label: 'Looter’s embellishment of a genuine find',
        proponents: [
          'Carl Friedrich Keil (Keil & Delitzsch, Biblical Commentary on the Books of Samuel, 1866, ad loc. 2 Samuel 1:1–10)',
        ],
        summary:
          'Keil judges that the only certainly true element of the messenger’s account is that he came upon Saul’s body already dead on the field (consistent with 1 Samuel 31:4’s own narration) and stripped the crown and armlet from it as a battlefield looter; the claim to have delivered the death-blow at Saul’s own request is read as an invented embellishment told to secure a reward and a welcome from the incoming king, not a report of something the messenger actually did.',
        confidence: 'low',
        sourceIds: ['keil-delitzsch-1866'],
      },
    ],
    notes:
      'High confidence describes the content of the narrative — that this is what the messenger tells David — not a claim that the account is true. It contradicts 1 Samuel 31:3–5’s own narration (already rendered in gilboa-battle), where Saul, badly wounded and refused a killing blow by his armor-bearer, falls on his own sword unaided. Whether the messenger invented the story outright, opportunistically claimed credit for finding Saul already dead, or is passing on a garbled secondhand report, the text does not resolve, and this project does not resolve it either: the ziklag-lament scene stages the account as a claim only, never visually corroborated — no flashback, reenactment inset, or Gilboa-backdrop tableau, in any mode. David’s judgment on the messenger turns on the self-incriminating confession ("your own mouth has testified against you," 1:16), not a forensic determination of events on Gilboa. Citation-verification pass (2026-08-02, Sonnet, queue #19): both scholarlyViews now carry named, checkable public-domain commentator attributions (Gill’s Exposition; Keil & Delitzsch) discussing the 2 Sam 1 / 1 Sam 31 discrepancy directly, replacing the prior unnamed "e.g., commentators..." hedge, following the same pattern queue #17 used for claim-burning-bodies. A modern critical commentary (McCarter’s Anchor Bible II Samuel, 1984) is also now cited: McCarter treats the messenger’s reliability as genuinely unresolved by the text ("[w]hether David was deceived or not, we cannot tell," p. 63, per secondary citation — see mccarter-1984-ii-samuel), corroborating this project’s own narrated-not-corroborated framing rather than adopting either specific view. All three attributions are verified via secondary/web-search cross-corroboration, not primary-copy page inspection — TO VERIFY flags on exact print pagination live on the respective source cards, per the queue-#16/#17 precedent for what counts as adequately resolved short of that inspection.',
  },
  {
    id: 'claim-lords-anointed-principle',
    statement:
      'The narrative presents a recurring principle across David’s story: harm to Saul’s person as "the LORD’s anointed" is never treated as praiseworthy, regardless of the target’s own conduct. David refuses to strike the fugitive-hunting Saul himself (1 Samuel 24:6; 26:9–11) and later executes a man for merely confessing to have struck him (2 Samuel 1:14, 16).',
    basis: 'biblical-text',
    confidence: 'high',
    sourceIds: ['esv-bible'],
    notes:
      'This is the project’s own cross-referencing observation about the narrative’s internal consistency across three passages (1 Sam 24, 1 Sam 26, 2 Sam 1), not a claim drawn from a specific scholarly source. It grounds the ziklag-lament scene’s staging choice to present David’s execution of the messenger as a judgment on the self-incriminating confession, not a forensic ruling on what actually happened at Gilboa (see claim-amalekite-messenger-account, claim-execution-messenger).',
  },
  {
    id: 'claim-execution-messenger',
    statement:
      'The narrative states that David judged the Amalekite messenger by his own self-incriminating claim to have killed Saul, and had one of his young men strike him down (2 Samuel 1:14–16).',
    basis: 'biblical-text',
    confidence: 'high',
    sourceIds: ['esv-bible'],
    notes:
      'Phrased as narrated, not editorialized: the text does not independently corroborate the killing claim it condemns him for (see claim-amalekite-messenger-account) — the judgment is on the confession, not a verified act. The execution is staged at documentary distance with no wound/blood/close-framing geometry in either violence-rendering mode (ADR-009), the same discipline as gilboa-battle’s death sequence and jabesh-burial’s funerary handling.',
  },
  {
    id: 'claim-royal-tokens',
    statement:
      'The narrative states that the messenger brought Saul’s crown and armlet to David as physical tokens of the king’s death (2 Samuel 1:10).',
    basis: 'biblical-text',
    confidence: 'high',
    sourceIds: ['esv-bible'],
    notes:
      'High confidence describes the fact that royal insignia are narrated as brought to David. Their specific form and appearance are unattested — no securely identified Iron Age Israelite royal regalia exists to model from — so the rendered crown/armlet props stay design-placeholder for form/fidelity only (basis for that aspect: design-placeholder), tracked at asset-royal-tokens.',
  },
  {
    id: 'claim-mourning-dress',
    statement:
      'The narrative describes the messenger arriving with torn clothes and dust on his head (2 Samuel 1:2) and David and his men tearing their clothes, weeping, and fasting until evening in mourning for Saul, Jonathan, the people of the LORD, and the house of Israel (2 Samuel 1:11–12) — conventional ancient Near Eastern mourning gestures.',
    basis: 'biblical-text',
    confidence: 'high',
    sourceIds: ['esv-bible', 'king-stager-2001'],
    notes:
      'Torn garments and dust/ashes on the head recur across the Hebrew Bible and the wider ANE as conventional mourning gestures (comparative-ane corroboration; king-stager-2001 anchors general Israelite mourning-ritual context, the same source reused for claim-dress and claim-seven-day-fast). The "fasted until evening" detail (1:12) is folded into this claim rather than opened as a separate one; it is also the textual anchor for this scene’s dusk lighting arc (see claim-lament-evening).',
  },
  {
    id: 'claim-song-of-the-bow',
    statement:
      'The narrative states that David composed a lament for Saul and Jonathan, ordered it taught to the sons of Judah, and that it was written in the Book of Jashar (2 Samuel 1:17–27).',
    basis: 'biblical-text',
    confidence: 'high',
    sourceIds: ['esv-bible'],
    notes:
      'The Book of Jashar is a lost source the Bible cites more than once (cf. Joshua 10:13) — a genuinely interesting historiographical detail about Israel’s own now-vanished literary tradition, carried as a caption note without asserting anything about the book’s nature beyond what the text itself gives. The scene delivers the poem through text/caption at a slower pace, exactly as narrated speech is delivered elsewhere in the project; no melody, chant, or vocal performance is synthesized, since the project has no basis for asserting fidelity to how it actually sounded.',
  },
  {
    id: 'claim-lament-evening',
    statement:
      'The scene renders the grief-to-lament sequence arcing toward and through dusk, anchored to 2 Samuel 1:12’s mourning "until evening."',
    basis: 'biblical-text',
    confidence: 'moderate',
    sourceIds: ['esv-bible'],
    notes:
      'The evening anchor is textually given for the mourning beat (1:12). The lament itself (1:17–27), narrated later in the chapter, is not explicitly timed to the same evening — extending the lighting arc across the whole scene through the lament is this project’s own staging choice for legibility and mood (the same reasoning as jabesh-burial’s dusk-through-close arc), hence moderate rather than high confidence for the extension specifically. Distinct from ziklag-aftermath’s claim-time-of-day, which is an unstated speculative placeholder with no textual anchor at all.',
  },
  {
    id: 'claim-hebron-identification',
    statement:
      'Hebron is identified with Tell Rumeida, above the modern city — one of the more securely located Old Testament highland sites.',
    basis: 'scholarly-reconstruction',
    confidence: 'high',
    sourceIds: ['rainey-notley-2006'],
    notes:
      'Matches the hebron LocationEntry’s identification.views (loc-view-hebron). Site identification only — no claim here about excavated Iron IIA town form, fortification, or size at Tell Rumeida (see claim-hebron-town-form for that separate, open gap).',
  },
  {
    id: 'claim-hebron-town-form',
    statement:
      'The scene renders Hebron as a modest highland hill town on Tell Rumeida — no wall plan, gate-tower form, or building footprint is asserted as excavated, and the surrounding terraced highland setting is a generic Judean-highland composite, not a surveyed landscape.',
    basis: 'design-placeholder',
    confidence: 'speculative',
    sourceIds: [
      'rainey-notley-2006',
      'ofer-1993-hebron-neaehl',
      'eisenberg-ben-shlomo-2017-tel-hevron',
      'ussishkin-2021-cyclopean-wall-hebron',
    ],
    notes:
      'rainey-notley-2006 supports the site identification (claim-hebron-identification) but says nothing about excavated early Iron IIA town form, fortification, or size at Tell Rumeida. Researcher pass (2026-08-02, Sonnet, queue #19c): checked for citable published Tell Rumeida excavation results specifically bearing on Iron I/early Iron IIA (11th-10th century BCE) town form, the horizon 2 Samuel 2:1-7 requires. Found three genuinely relevant, checkable sources, but they converge on confirming the gap rather than closing it. Avi Ofer\'s own 1980s excavation synthesis (ofer-1993-hebron-neaehl) reads the 11th-10th century as the site\'s Iron Age demographic peak, but on regional-survey grounds, not an excavated town plan at Tell Rumeida itself. Eisenberg and Ben-Shlomo\'s 2017 final report on the 1999/2014 seasons (eisenberg-ben-shlomo-2017-tel-hevron) finds the site\'s well-dated fortification horizons cluster at Middle Bronze Age (the "cyclopean" wall) and at the later Iron II Judahite-state period (glacis/tower elements paralleled at Tell el-Ful and Tell Beit Mirsim, dated 8th-7th century BCE, plausibly a Hezekiah-era phase) — with only scattered, non-diagnostic remains attributed to the intervening 11th-10th century window, no excavated gate, wall circuit, or building footprint specific to it. Ussishkin (2021, ussishkin-2021-cyclopean-wall-hebron) goes further, disputing even the cyclopean wall\'s conventional Middle Bronze date and arguing it and its glacis were built later in the Iron Age — which, if correct, removes rather than adds an early Iron Age fortification candidate. Finding: the gap is real and now citably confirmed, not merely unchecked — this is a permanent evidentiary state for the specific 10th-century-BCE window, parallel to the beth-shan-wall precedent (queue #16) where citation strengthened a disclosed gap rather than closing it with a positive attribution. The disclosed "modest highland hill town" placeholder (basis design-placeholder, confidence speculative) is the honest rendering; no single Tell Rumeida excavation phase is adopted as "the" Davidic-era plan, following the beth-shan/jabesh pattern.',
  },
  {
    id: 'claim-hebron-inquiry',
    statement:
      'The narrative states that David inquired of the LORD before going up, asking whether and where he should go; the answer given is Hebron (2 Samuel 2:1).',
    basis: 'biblical-text',
    confidence: 'high',
    sourceIds: ['esv-bible'],
    notes:
      '2 Samuel 2:1 does not name the inquiry’s mechanism or location; the scene infers the ephod/Abiathar practice already established at 1 Samuel 30:7–8 (the identical inquiry formula, "shall I go up... where shall I go up") rather than depicting a different, unattested method, and carries no new terrain or Ziklag-geometry reuse for the vignette.',
  },
  {
    id: 'claim-david-move-hebron',
    statement:
      'The narrative states that David went up to Hebron with his two wives, and that his men and their households went up with him, and they settled in the towns of Hebron (2 Samuel 2:2–3).',
    basis: 'biblical-text',
    confidence: 'high',
    sourceIds: ['esv-bible'],
    notes:
      'The text gives no headcount for the households; the scene renders a disclosed design-choice household column/camp of roughly 40–50 figures at high quality tier (mixed adults and children), sized to read as "a following’s families," not asserted as a real headcount or a fixed multiple of claim-600-men’s six hundred. David’s two named wives (Ahinoam and Abigail) are not individually modeled as distinguished figures within the household group.',
  },
  {
    id: 'claim-judah-anointing',
    statement:
      'The narrative states plainly that the men of Judah came and anointed David king over the house of Judah (2 Samuel 2:4) — not over Israel. The rest of the former kingdom remains Saul’s house’s to claim at this point in the narrative.',
    basis: 'biblical-text',
    confidence: 'high',
    sourceIds: ['esv-bible'],
    notes:
      'The single most important claim in this scene: every caption and composition choice touching 2:4 must carry the "house of Judah" qualifier, never presenting this as David becoming king in an unqualified sense. A wider anointing "king over all Israel" follows only later, at 2 Samuel 5:3 — several chapters and, per the narrative’s own chronology, several years after this scene — and is not asserted as having happened here. See claim-david-historical for the separate, disputed scholarly question of how large a kingdom either anointing actually controlled on the ground; nothing here resolves that debate.',
  },
  {
    id: 'claim-jabesh-commendation',
    statement:
      'The narrative states that David sent messengers to the men of Jabesh-gilead commending them for burying Saul, and informing them of his own anointing (2 Samuel 2:5–7).',
    basis: 'biblical-text',
    confidence: 'high',
    sourceIds: ['esv-bible'],
    notes:
      'Cross-references claim-jabesh-retrieval (the burial itself, rendered in jabesh-burial) — this scene does not re-render that burial, pyre, wall, or bone-bundle geometry; it stages only David’s side of the exchange, a messenger dispatch carrying the message outward, never shown arriving at or being received in Jabesh-gilead.',
  },
  {
    id: 'claim-anointing-rite-form',
    statement:
      'The scene stages a physical anointing gesture (an unnamed elder figure pouring from a horn near David) as the choreography for 2:4’s bare statement that Judah "anointed David king" — the verse narrates the fact of anointing, not who poured, what vessel was used, or what the assembled elders/townspeople did.',
    basis: 'design-placeholder',
    confidence: 'speculative',
    sourceIds: ['esv-bible'],
    notes:
      'Checked king-stager-2001 (the project’s primary material-culture source) for a comparative ancient Near Eastern kingship/covenant-investiture parallel that could move this past design-placeholder; its coverage is general Israelite daily life and material culture (houses, dress, wells, food production, tools) and does not discuss anointing or investiture ritual mechanics, so it does not support a comparative-ane basis here. The horn vessel echoes 1 Samuel 16:13’s "horn of oil" at David’s earlier, private anointing by Samuel — the only physical-vessel detail the text gives for any of David’s anointings, and the most textually grounded prop choice available, not an assertion that 2:4 itself names a horn.',
  },
  {
    id: 'claim-judah-assembly-scale',
    statement:
      'The anointing assembly ("the men of Judah," 2:4) is rendered as a representative civic gathering of roughly 150–200 figures at high quality tier, standing for Hebron’s own townspeople plus a visible elder contingent — not a literal muster of the tribe of Judah, which any regional Iron Age highland population estimate the project has already cited would put at several thousand at minimum.',
    basis: 'design-placeholder',
    confidence: 'speculative',
    sourceIds: ['esv-bible', 'finkelstein-silberman-2001'],
    notes:
      'Parallel in form to claim-battle-scale and to jabesh-burial’s "no ratio applies" disclosure for its retrieval party: 2:4 names no headcount and no gathering mechanism (a levy? a self-selected assembly of local elders and townspeople? Hebron alone or its satellite towns too?) for the anointing, so the standard ~1:10 narrated-army ratio (claim-600-men) does not apply here. This is the largest crowd of the three M4 scenes, deliberately so — a public political founding is the one M4 beat that is structurally a crowd event — but the figure stays an order of magnitude below any literal tribal count, and the in-scene label says so.',
  },
  {
    id: 'claim-ish-bosheth-installed',
    statement:
      'The narrative states that Abner took Ish-bosheth, Saul’s son, and made him king over Israel at Mahanaim — Gilead, the Ashurites, Jezreel, Ephraim, Benjamin, and all Israel — while the house of Judah followed David (2 Samuel 2:8–10).',
    basis: 'biblical-text',
    confidence: 'high',
    sourceIds: ['esv-bible'],
    notes:
      'The tribal-writ split (2:9 vs. 2:10b) is the textual basis for staging gibeon-pool as civil war rather than a foreign-enemy battle. Mahanaim itself is narrated only in this scene, not built — see the mahanaim LocationEntry’s disputed, low-confidence identification.',
  },
  {
    id: 'claim-gibeon-contest',
    statement:
      'The narrative states that at the pool of Gibeon, Abner proposed a contest of twelve chosen young men from each side, who seized each other and killed one another in pairs (2 Samuel 2:12–16), after which battle broke out and Israel was routed before the servants of David.',
    basis: 'biblical-text',
    confidence: 'high',
    sourceIds: ['esv-bible'],
    notes:
      'The twenty-four champions render at literal 1:1 count per the text’s own exact number; the wider contingents behind them are a disclosed, smaller-than-Gilboa design choice (no army-size figure is given in the text for this engagement), per the gibeon-pool brief.',
  },
  {
    id: 'claim-asahel-death',
    statement:
      'The narrative states that Joab’s youngest brother Asahel pursued Abner despite being twice warned to turn aside, and that Abner killed him with a backward thrust of his spear (2 Samuel 2:18–23).',
    basis: 'biblical-text',
    confidence: 'high',
    sourceIds: ['esv-bible'],
    notes:
      'The project’s first named-character-kills-named-character death (distinct from Saul’s suicide in gilboa-battle). Per ADR-009: documentary distance, no wound/blood geometry in any mode. The text’s one specific non-graphic detail — Abner’s reversed spear grip — and the "stood still" reaction beat (2:23b) are used as the emotional pivot in place of a graphic replay. Abner is staged as reluctant, consistent with his two on-record warnings. Cross-referenced forward by claim-abner-killing (hebron-gate, 2 Sam 3:26–27): the text names "the blood of Asahel" as one of Joab’s own stated reasons for later killing Abner — the second application of the same ADR-009 named-character-killing template this claim established.',
  },
  {
    id: 'claim-abner-pursuit-halted',
    statement:
      'The narrative states that Joab and Abishai pursued Abner to the hill of Ammah, that Benjaminites rallied to Abner there, and that at Abner’s appeal Joab sounded the trumpet and called off the pursuit; the text gives Israel’s dead as 360 men to David’s 20 (2 Samuel 2:24–31).',
    basis: 'biblical-text',
    confidence: 'high',
    sourceIds: ['esv-bible'],
    notes:
      'The 360/20 casualty count is delivered as caption text only, never as a rendered corpse tally, per the gibeon-pool brief’s restraint policy.',
  },
  {
    id: 'claim-gibeon-pool-form',
    statement:
      'The pool of Gibeon (2 Samuel 2:13) is rendered as a rock-cut basin with a flat water plane, on the strength of Pritchard’s excavation of a rock-cut pool/water-tunnel system at Tell el-Jib.',
    basis: 'archaeology',
    confidence: 'moderate',
    sourceIds: ['pritchard-gibeon-1962', 'tamburrini-2021-pool-of-gibeon-3d'],
    notes:
      "Researcher pass (2026-08-02, Sonnet, queue #19d / uncertainty register #15): checked for Pritchard's own stratigraphic dating of the pool's construction and for later reassessments. Finding: multiple sources, including Pritchard's own excavation-era estimate and Tamburrini's 2021 reassessment (tamburrini-2021-pool-of-gibeon-3d), converge on the pool's original cutting/construction dating to Iron I/early Iron IIA — Pritchard placed it near the start of the Iron Age, Tamburrini's reconstruction more specifically to the 10th century BCE — i.e., at or before the early Iron IIA window 2 Samuel 2 requires, not a later Iron II expansion postdating the narrative. This resolves the specific dating worry the gibeon-pool brief flagged (construction-vs-postdating), raising confidence from low to moderate. What remains genuinely later is the pool's subsequent history, not its construction: a substantial group of artifacts recovered from the pool's fill dates to the 8th-6th centuries BCE (Tamburrini), reflecting centuries of later reuse/disuse and infill after the period this scene depicts — a separate fact from when the pool was first cut. Residual hedge: this dating rests on pottery typology and Pritchard's original stratigraphic reads (both cited only via secondary/web-search corroboration, not primary-copy excavation-report inspection — TO VERIFY on both source cards), and is not immune to the high/low chronology debate already tracked at register #5. The rendered pool stays a disclosed, undated-fidelity/dimension approximation regardless (see claim-gibeon-terrain-form); no reflection/refraction water shader, matching the declined-water-shader precedent from Gilboa/Jabesh.",
  },
  {
    id: 'claim-gibeon-terrain-form',
    statement:
      'The pool of Gibeon is rendered as a shallow, flat-floored basin depression cut into a procedural Benjamin-highlands terrain, with a flat, unlit water plane over its floor — a modest, disclosed approximation, not Pritchard’s excavated monumental dimensions and not a real-time reflection/refraction water shader.',
    basis: 'design-placeholder',
    confidence: 'speculative',
    sourceIds: ['esv-bible', 'pritchard-gibeon-1962'],
    notes:
      'Distinct from claim-gibeon-pool-form (the archaeology-basis claim that a real excavated pool/tunnel system exists at the identified site, dated construction-wise per the 2026-08-02 researcher pass): this claim covers only the rendered terrain-form and no-water-shader disclosure itself, parallel to claim-gilboa-terrain-form. No reflection/refraction shader is built, matching the declined-water-shader precedent from gilboa-battle and jabesh-burial; the basin is rendered at a modest, disclosed approximation rather than Pritchard’s excavated monumental dimensions (27m deep, 11.3m diameter) as a fidelity/scale choice, independent of the now-resolved dating question.',
  },
  {
    id: 'claim-gibeon-battle-scale',
    statement:
      'The two wider contingents behind the twelve-a-side champions (Abner’s Israel/Benjamin following and Joab’s Judah following) are rendered at a disclosed design-choice scale — roughly 35–45 and 30–40 figures at high quality tier, with a further 12–18-figure subset drawn from Abner’s contingent (not additive to it) rallying at the hill of Ammah — deliberately smaller than gilboa-battle’s already-modest crowd, since this is one contingent-level clash between two commanders’ followings at Gibeon, not a national muster.',
    basis: 'design-placeholder',
    confidence: 'speculative',
    sourceIds: ['esv-bible'],
    notes:
      'Parallel in form to claim-battle-scale and claim-judah-assembly-scale: no headcount is narrated for either side’s total force at Gibeon, so no ratio of any asserted "true" army size applies. Explicitly not derived from, or intended to visually prove, the casualty figures in claim-abner-pursuit-halted (nineteen of David’s servants plus Asahel against three hundred sixty of Benjamin/Abner’s men, 2 Samuel 2:30–31) — those numbers are carried by caption text alone, never a rendered corpse tally.',
  },
  {
    id: 'claim-divided-kingdom-atlas-overlay',
    statement:
      'The divided-kingdom map overlay (the /atlas page) renders Ish-bosheth’s Israel-writ and the house of Judah as two soft, unbordered shaded regions clustered around the text’s own named locations, and plots Mahanaim, Hebron, Gibeon, and neighboring sites at their approximate coordinates — a schematic study aid, not a scholarly reconstruction of an Iron IIA political boundary.',
    basis: 'design-placeholder',
    confidence: 'speculative',
    sourceIds: ['esv-bible'],
    notes:
      'Mixed-provenance claim, parallel in form to claim-gibeon-terrain-form and claim-battle-scale: the allegiance split itself is high-confidence biblical text, already carried by claim-ish-bosheth-installed (2:8–10, the Gilead/Ashurites/Jezreel/Ephraim/Benjamin/all-Israel writ at Mahanaim) and claim-judah-anointing (2:4, the house of Judah alone) — this claim does not re-assert that split and stays out of its way. What this claim alone covers, and what its speculative/design-placeholder rating is about, is the overlay’s own visual choices: soft-shaded, deliberately hard-edge-free region shapes (no polygon boundary is drawn, because no Iron IIA source establishes a literal line on the ground — see CLAUDE.md’s anachronism-discipline rule), the plain equirectangular-ish projection used to place points, and which locations are clustered into which region (e.g. grouping Mount Gilboa/Beth-shan/Jabesh-gilead under the "Israel-writ" region reflects their being within Jezreel/Gilead per 2:9, not a separately sourced boundary claim). Mahanaim is plotted at its own low-confidence, disputed coordinates (see the mahanaim LocationEntry’s two candidate identifications, both surfaced on the page, not just in data) rather than a firmer point standing in for it. Gibeon sits in the unshaded gap between the two soft regions on the map, which is a deliberate rendering choice reflecting its role as the contested meeting-ground of Abner’s and Joab’s men (2:12–17), not an assertion that Gibeon itself changed hands. Kingdom-scale is a separate, disputed question the overlay does not resolve — see claim-david-historical. The overlay is dismissible: a page-level toggle hides the shaded regions entirely, leaving only the plotted points, and the page itself is reached only by choosing to visit /atlas (ADR-011’s "can still ignore it" test).',
  },
  {
    id: 'claim-long-war',
    statement:
      'The narrative states there was a long war between the house of Saul and the house of David; David grew steadily stronger through it while the house of Saul grew steadily weaker, and lists six sons born to David at Hebron, one by each of six different wives (2 Samuel 3:1–5).',
    basis: 'biblical-text',
    confidence: 'high',
    sourceIds: ['esv-bible'],
    notes:
      'Card-only in hebron-covenant (docs/design/hebron-covenant-brief.md, b-long-war): no geometry is staged for this beat, and the sons are listed as the text lists them, with no forward commentary on Amnon or Absalom’s later stories — those lie far outside this milestone. The war’s trend (David strengthening, Saul’s house weakening) is the thing the M5 `/atlas` phase extension is meant to map, per the milestone’s fourth goal; this claim is the textual anchor for that overlay work, not a rendering of the war itself.',
  },
  {
    id: 'claim-abner-break',
    statement:
      'The narrative states that Ish-bosheth accused Abner of going in to Rizpah, Saul’s concubine; Abner responds with anger, not confession or denial, and swears to transfer the kingdom from Dan to Beersheba, from the house of Saul to David (2 Samuel 3:6–11). The text does not state whether the accusation was true.',
    basis: 'biblical-text',
    confidence: 'high',
    sourceIds: ['esv-bible'],
    notes:
      'Narrated-vs-corroborated discipline at its most delicate (brief’s historical intent #3): the accusation is carried exactly as Ish-bosheth’s speech, Abner’s reply is indignation rather than a plea either way, and nothing here asserts what actually happened between Abner and Rizpah. That taking a king’s concubine carried royal-claim overtones in the ancient Near East is commonly noted by commentators, but this claim does not yet attach a named citation for that reading. Researcher pass (2026-08-08, M5 citation-gap closure): specifically searched mccarter-1984-ii-samuel and keil-delitzsch-1866 for a checkable, page-specific discussion of the royal-concubine/throne-claim reading at 2 Samuel 3:7 — the general ANE reading itself is widely and consistently attested across many commentaries old and new (cross-corroborated via web search), but no specific source in this project’s bibliography could be confirmed by name as its origin or as stating it, so this stays an open gap rather than a fabricated attribution; no upgrade made. This remains a real, findable gap for a future pass with primary-copy access, not a permanently thin one (unlike claim-hebron-pool-feature) — the reading itself is well established in the field, only the specific checkable citation is missing. No geometry stages the accusation, Rizpah, or Mahanaim (card-only beat, b-break); Rizpah gets a light referenced-only character entry (`rizpah`) since she returns to the narrative at 2 Samuel 21, far outside this milestone.',
  },
  {
    id: 'claim-abner-overture',
    statement:
      'The narrative states that Abner sent messengers to David proposing a covenant; David’s condition was the return of Michal, Saul’s daughter, taken from Paltiel son of Laish and brought back to David, with Paltiel following her weeping as far as Bahurim before Abner sent him home; Abner also spoke to the elders of Israel and to Benjamin, securing their consent, before coming to Hebron himself (2 Samuel 3:12–19).',
    basis: 'biblical-text',
    confidence: 'high',
    sourceIds: ['esv-bible'],
    notes:
      'Text-only in hebron-covenant (brief’s "Resolved design calls"): staging Michal’s arrival at the Hebron feast, or in Abner’s party, would assert something the text never places there; staging Paltiel’s grief would require inventing an entire route setting for an unlocated two-verse vignette (Bahurim, unbuilt). Both are carried by caption text at the point the narrative states them, with 3:16’s "weeping after her all the way" carried as a short caption note, not a render. `michal` and `paltiel` get light referenced-only character entries so the inspector can surface them without any geometry standing in for either. The elders’ consultation (3:17–19) is likewise card-only — no council geometry, no individual elder invented.',
  },
  {
    id: 'claim-covenant-feast',
    statement:
      'The narrative states that Abner came to David at Hebron with twenty men; David made a feast for Abner and the men with him; Abner pledged to gather all Israel to David in a covenant; and Abner departed — the narrative’s first of three repetitions across 3:21–23 that "he went in peace" (2 Samuel 3:20–21).',
    basis: 'biblical-text',
    confidence: 'high',
    sourceIds: ['esv-bible'],
    notes:
      'The staged center of this scene (b-arrival through b-peace). The twenty-men count is the text’s own exact number, rendered literally — no ratio, no disclosure needed beyond "this is the stated count," the same register gibeon-pool used for its twelve-a-side champions. The threefold repetition of "he went in peace" (3:21, 3:22, 3:23) is a deliberate narrative device holding the reader on the fact of safe-conduct before revealing what Joab did (3:22 onward, hebron-gate’s territory, not staged or foreshadowed here); this scene stages only the first occurrence (3:21b) and holds the frame there, without dread staging.',
  },
  {
    id: 'claim-feast-form',
    statement:
      'The feast (3:20b) is rendered as a modest open-air meal at the same gate plaza hebron-anointing already established — mats and shared clay vessels laid out between David and Abner — not a banquet hall, table furniture, or any specific reconstructed vessel assemblage.',
    basis: 'comparative-ane',
    confidence: 'low',
    sourceIds: ['esv-bible', 'king-stager-2001'],
    notes:
      '2 Samuel 3:20 states only that "David made Abner and the men who were with him a feast" — no building, furniture, or vessel form, and Hebron itself has no site-specific feasting-context excavation. Researcher pass (2026-08-08, M5 citation-gap closure): upgraded from design-placeholder to comparative-ane on the strength of King & Stager’s "Foodways" synthesis (king-stager-2001, extended coverage), which corroborates the general Iron Age Israelite pattern of floor/mat-level communal eating from shared vessels rather than furniture-based banqueting — no distinct feast-hall architecture or table-and-chair furniture is attested for ordinary Israelite settings in this period. This supports the general form already modeled (mats, shared vessels, no banquet hall) as period-appropriate rather than arbitrary, but does not supply a specific reconstructed vessel assemblage or confirm anything Hebron-specific — this pass did not obtain page-level detail beyond the book’s own chapter-outline confirmation (see king-stager-2001’s confidenceNotes), so confidence stays low rather than moderate. No banquet-hall or palace architecture is added to Hebron’s own claim-hebron-town-form placeholder, which stays a modest highland hill town.',
  },
  {
    id: 'claim-covenant-cast-scale',
    statement:
      'Only Abner’s twenty men (3:20) is a narrated count. David’s escort/household presence at the feast (~15–25 figures at high quality tier) and the ambient town background (~20–30 figures) are disclosed design-choice headcounts, deliberately far below hebron-anointing’s 150–200-figure civic assembly — this is a closed political meal, not a public event.',
    basis: 'design-placeholder',
    confidence: 'speculative',
    sourceIds: ['esv-bible'],
    notes:
      'Parallel in form to claim-judah-assembly-scale and claim-gibeon-battle-scale: no headcount or gathering mechanism is narrated for who else was present at Hebron besides Abner’s twenty, so no ratio of claim-600-men applies. The scale contrast with hebron-anointing’s assembly (roughly an order of magnitude smaller total cast) is a deliberate compositional choice carrying the brief’s point directly — a working town on an ordinary day receiving one delegation, not a founding assembly.',
  },
  {
    id: 'claim-joab-return-protest',
    statement:
      'The narrative states that Joab and his army returned from a raid with much spoil, that Joab was told Abner had come to David and been sent away in peace, and that Joab went to David and protested — asking why David had let Abner go, and stating his own reading that Abner had come to deceive him and to learn his comings and goings (2 Samuel 3:22–25).',
    basis: 'biblical-text',
    confidence: 'high',
    sourceIds: ['esv-bible'],
    notes:
      'Joab’s protest is carried exactly as his own stated words, not adopted as the narrative’s own verdict — 3:26–27 shows what he did about it, not whether his reading of Abner’s intentions was correct. The raid itself, its target, and its scale are not narrated; the returning party is staged at a disclosed design-choice headcount (claim-gate-cast-scale), not a number the text gives.',
  },
  {
    id: 'claim-abner-killing',
    statement:
      'The narrative states that David sent messengers after Abner who brought him back from the cistern of Sirah without David’s knowledge ("but David did not know it," 3:26b); that Joab took Abner aside into the midst of the gate to speak with him privately; and that there Joab struck him in the stomach, and he died — for the blood of Asahel his brother (2 Samuel 3:26–27). Abishai is separately named as sharing responsibility for the killing (3:30), but the text attributes the strike to Joab alone.',
    basis: 'biblical-text',
    confidence: 'high',
    sourceIds: ['esv-bible'],
    scholarlyViews: [
      {
        id: 'view-abner-killing-blood-vengeance',
        label: 'Blood vengeance for Asahel, complicated by wartime killing',
        proponents: [
          'Carl Friedrich Keil (Keil & Delitzsch, Biblical Commentary on the Books of Samuel, 1866, ad loc. 2 Samuel 3:27, 30)',
        ],
        summary:
          'The text’s own stated reason (3:27, "for the blood of Asahel his brother") reads Joab’s act as kin-based blood vengeance for Asahel, whom Abner killed at Gibeon (claim-asahel-death, gibeon-pool). The narrative itself complicates this reading rather than simply endorsing it: Asahel died in open battle after two explicit warnings to turn aside, which is part of why David’s own verdict treats Joab’s act as murder rather than lawful vengeance, and why 1 Kings 2:5 later describes Joab as having "avenged in peacetime blood that had been shed in war." Keil reads the text’s own stated reason as the genuine, actual motive, consistent with his general practice of not positing a hidden political motive the narrative withholds.',
        confidence: 'moderate',
        sourceIds: ['esv-bible', 'keil-delitzsch-1866'],
      },
      {
        id: 'view-abner-killing-rival-elimination',
        label: 'Political elimination of a rival for command',
        proponents: [
          'e.g., scholars reading Abner as Joab’s obvious rival for command of a united army (named attribution not yet page-verified — see notes)',
        ],
        summary:
          'A reading the text leaves implicit rather than states: with Abner defecting to David and pledging to unite the kingdom, he was the obvious rival to Joab for command of the combined army — a political motive alongside, not necessarily instead of, the blood-vengeance one the text names outright.',
        confidence: 'low',
        sourceIds: ['esv-bible'],
      },
    ],
    notes:
      'The milestone’s most important claim. Per the brief, the app asserts as fact only what the text asserts — the recall, the aside, the strike, the stated Asahel connection, and David’s verdict as David’s verdict — and does not editorialize Joab into a simple villain or a simple avenger; Abner’s own reluctance and Asahel’s own zeal (claim-asahel-death) both stay legible rather than resolved. Cross-references claim-asahel-death (gibeon-pool, 2 Sam 2:23) both ways: that claim documents the battlefield killing this one names as Joab’s stated motive. Researcher pass (2026-08-08, M5 citation-gap closure): the blood-vengeance view now carries a named, checkable attribution (Keil & Delitzsch, ad loc. 2 Samuel 3:27, 30, per keil-delitzsch-1866’s extended coverage) in place of the prior unnamed hedge. The rival-elimination view stays hedged — this pass searched both mccarter-1984-ii-samuel and keil-delitzsch-1866 specifically for a page-checkable statement of this reading and did not find one attributable to either by name; the reading itself is widely reflected in general/tertiary reference sources (encyclopedia-style entries on Joab) but those are not named-scholar, page-citable sources this project’s discipline treats as adequate for a scholarlyViews proponent, so no attribution was added rather than fabricating one. Staged per ADR-009’s second named-character-killing application: documentary distance, no wound/blood/dismemberment geometry in either mode; the drawing-aside itself is the one specific, non-graphic detail shown as gesture; reduced mode elides the strike, cutting from the aside to the aftermath while stating the fact and the method identically in caption text.',
  },
  {
    id: 'claim-david-disavowal',
    statement:
      'The narrative states that on hearing of the killing, David publicly disavowed it — declaring his and his kingdom’s innocence before the LORD forever concerning the blood of Abner — and pronounced a curse on Joab’s house (discharge, leprosy, one who holds a spindle, one who falls by the sword, one who lacks bread), while separately naming Joab and Abishai as more severe than himself (2 Samuel 3:28–30, 39).',
    basis: 'biblical-text',
    confidence: 'high',
    sourceIds: ['esv-bible'],
    notes:
      'The curse’s content is carried in captions exactly as harsh as the text states it (reduction abstracts depiction, never facts, per ADR-009) and is never visualized in any mode. David does not remove Joab from command here or in the rest of Samuel — a restraint the text states without explaining, which this claim does not resolve or editorialize.',
  },
  {
    id: 'claim-abner-funeral',
    statement:
      'The narrative states that David ordered Joab and all the people with him to tear their clothes, put on sackcloth, and mourn before Abner; that King David himself walked behind the bier; that Abner was buried at Hebron, with the king weeping aloud at the grave and all the people weeping with him; that David lamented over Abner; and that David refused food until sundown, over the people’s urging (2 Samuel 3:31–35).',
    basis: 'biblical-text',
    confidence: 'high',
    sourceIds: ['esv-bible', 'king-stager-2001'],
    notes:
      'The scene’s gravitational center by design (per the brief’s historical intent #4: the text gives more verses to the mourning than to the killing). Its single most striking staged detail is 3:31 itself — Joab, the killer, made a public mourner at his own victim’s bier by David’s own command — staged exactly as narrated, without any caption commentary on Joab’s interior state, since the text supplies none. Abner’s body renders throughout as a wrapped, anatomically unresolved form (buildWrappedFormGeometry, the ADR-009 funerary standard also used for Beth-shan’s wall display and Jabesh’s retrieval/pyre), never a modeled corpse. See claim-abner-tomb-form for the tomb’s own disclosed placeholder form and claim-mourning-dress (reused from ziklag-lament) for the sackcloth/torn-clothes convention. Researcher pass (2026-08-08, M5 citation-gap closure): king-stager-2001 added as a general (not Hebron-specific or Abner-specific) comparative-ane anchor for the mourning-procession/burial staging, extending the same "Death ways" mourning-and-mortuary-ritual material already used for claim-mourning-dress — this does not change the claim’s biblical-text basis or high confidence, since the events themselves are narrated fact; it only adds a material-culture anchor for how the mourning is staged.',
  },
  {
    id: 'claim-public-response',
    statement:
      'The narrative states that everything the king did pleased all the people, and that all the people and all Israel understood that day that it had not been the king’s will to put Abner to death; the chapter closes with David’s own words to his servants — "a prince and a great man has fallen this day in Israel" — and his statement that the sons of Zeruiah were too severe for him to control (2 Samuel 3:36–39).',
    basis: 'biblical-text',
    confidence: 'high',
    sourceIds: ['esv-bible'],
    scholarlyViews: [
      {
        id: 'view-public-response-apologia',
        label: 'Davidic apologia — a narrative shaped to clear David',
        proponents: [
          'P. Kyle McCarter Jr. ("The Apology of David," Journal of Biblical Literature 99 [1980]: 489–504; II Samuel, Anchor Bible 9 [1984], comment on 2 Samuel 3:31–39, p. 121 per secondary citation — see mccarter-1984-ii-samuel and mccarter-1980-apology-of-david source cards)',
        ],
        summary:
          'Reads 3:26b’s "but David did not know it," the public curse, the commanded mourning, the lament, the fast, and 3:36–37’s explicit insistence together as a narrative visibly concerned to clear David of a politically convenient death — the death of the one man positioned to unite the kingdom against him — rather than as disinterested reporting. McCarter’s wider thesis (JBL 1980) reads this alongside the deaths of Saul and Ish-bosheth as one connected apologetic sequence covering the whole "History of David’s Rise."',
        confidence: 'low',
        sourceIds: ['esv-bible', 'mccarter-1984-ii-samuel', 'mccarter-1980-apology-of-david'],
      },
      {
        id: 'view-public-response-plain-report',
        label: 'Plain report of genuine public reaction',
        proponents: [
          'Carl Friedrich Keil (Keil & Delitzsch, Biblical Commentary on the Books of Samuel, 1866, ad loc. 2 Samuel 3:31–39)',
        ],
        summary:
          'Reads the same verses as a plain report: David’s visible grief, restraint toward Joab’s house, and public mourning were genuinely persuasive to observers at the time, without needing to posit a later apologetic hand shaping the account. Keil frames the section as David "declaring his abhorrence of Joab’s crime" through solemn mourning and public curse — a straightforward response to a real event. Keil’s own commentary predates the 20th-century source-critical apologetic-narrative framework McCarter later proposes and does not engage it directly; it is cited here as the checkable representative of this reading’s substance (a plain, event-level exegetical stance), not as a direct rebuttal of McCarter.',
        confidence: 'low',
        sourceIds: ['esv-bible', 'keil-delitzsch-1866'],
      },
    ],
    notes:
      'Per the never-fake-consensus rule and the brief’s historical intent #3: the app stages what the text narrates (David’s disavowal, the mourning, the lament, the fast, 3:36–37’s own statement) and keeps the dispute about why the text narrates it so emphatically at the claim layer, not resolved in captions. The apologia-vs-plain-report framing is McCarter’s own well-known scholarly label for this material. Researcher pass (2026-08-08, M5 citation-gap closure): both views now carry named, checkable attribution — McCarter (apologia, via his 1980 JBL article and the 1984 commentary’s own comment on this passage) and Keil & Delitzsch (plain report, via their 1866 commentary’s own comment on the same verses) — replacing the prior unnamed "e.g." hedge, following the same secondary/web-search-corroboration standard used at queue #19/#17 (not primary-copy page inspection; both source cards carry TO VERIFY on exact pagination). Confidence on both views stays low, matching the project’s convention that named attribution changes checkability, not the confidence rating, for a genuinely disputed reading.',
  },
  {
    id: 'claim-hebron-gate-form',
    statement:
      'The Hebron gate (3:27, "the midst of the gate") is rendered as a modest two-chamber gate passage — outer walls with one recessed alcove per side, deep enough to draw someone into its interior shadow — not a monumental six-chamber Solomonic-type gate.',
    basis: 'comparative-ane',
    confidence: 'low',
    sourceIds: ['esv-bible', 'herzog-1997'],
    notes:
      'Tell Rumeida’s 11th–10th-century town form is a permanently thin evidentiary window (see claim-hebron-town-form’s own researcher-pass finding, queue #19c) and no gate of any type is archaeologically attested there for this period — so this claim still supplies a disclosed, modest placeholder for Hebron specifically, not an assertion of excavated form at the site. "The midst of the gate" requires some interior for the aside to be staged into, so this claim supplies a form consistent with hebron-anointing’s existing gate-plaza massing. Researcher pass (2026-08-08, M5 citation-gap closure): upgraded from design-placeholder to comparative-ane on the strength of the general Iron Age Israelite gate-typology chronology (herzog-1997, extended coverage) — two-chamber gates were the prevalent Israelite gate type through the 11th and early 10th centuries BCE, with monumental six-chamber gates emerging only from the mid-10th century BCE (the type associated with Solomonic building activity at Megiddo/Hazor/Gezer). Since David’s reign at Hebron (2 Samuel 3) sits within that earlier window, a modest two-chamber form is the period-appropriate wider-Israelite type — comparative-ane corroboration for what this scene already deliberately avoided (a monumental six-chamber gate) — not site-specific archaeology for Hebron itself, which remains unexcavated for any gate of this period. Confidence stays low: the corroboration is a general regional pattern, not evidence from the site, and Herzog’s own broader body of work is noted (in the source card) as complicating strict linear gate-typology chronologies with co-existing types at different sites.',
  },
  {
    id: 'claim-abner-tomb-form',
    statement:
      'Abner’s tomb at Hebron (3:32) is rendered as a simple rock-cut entry on the hill’s flank — a modest boulder mass with a single dark inset opening, no interior modeled or implied.',
    basis: 'design-placeholder',
    confidence: 'speculative',
    sourceIds: ['esv-bible'],
    notes:
      'The text states only that Abner was buried at Hebron; no tomb form, location, or construction detail is narrated. This claim explicitly does not adopt the medieval "Tomb of Abner" tradition shown to visitors in modern Hebron as a site or form — that tradition has no claimed basis in this project’s source discipline. Iron Age water/installation evidence at Hebron more broadly was checked and confirmed genuinely thin (2026-08-08, M5 citation-gap closure — see claim-hebron-pool-feature’s own notes for what was specifically checked and found: a plausible ancient spring, but no dated Iron Age built pool/water-installation and no site-specific tomb evidence either); this placeholder is not expected to upgrade past design-placeholder without a genuinely new excavation finding.',
  },
  {
    id: 'claim-gate-cast-scale',
    statement:
      'Joab’s returning raid party (~15–25 figures at high quality tier), the mourning assembly ("all the people," ~60–90 figures, representative, mostly static or slow-procession), and the ambient town background (~15–25 figures) are disclosed design-choice headcounts — no number is narrated for any of the three.',
    basis: 'design-placeholder',
    confidence: 'speculative',
    sourceIds: ['esv-bible'],
    notes:
      'Parallel in form to claim-covenant-cast-scale, claim-judah-assembly-scale, and claim-gibeon-battle-scale: the same no-narrated-count, representative-assembly convention. The mourning assembly is deliberately smaller than hebron-anointing’s civic-founding assembly (a funeral, not a tribal founding) and is staged as the same three-crowd discipline as hebron-covenant — raid party, mourning assembly, and ambient town are never conflated with one another.',
  },
  {
    id: 'claim-ish-bosheth-assassination',
    statement:
      'The narrative states that Ish-bosheth’s courage failed at the news of Abner’s death and all Israel was dismayed; that two of his own captains, Rechab and Baanah, sons of Rimmon the Beerothite, entered his house at noon rest, struck him in his bed, beheaded him, and carried the head away all night by way of the Arabah to present to David at Hebron, claiming credit for avenging him against Saul (2 Samuel 4:1–8). The text’s own parenthesis at 4:4 — Jonathan’s surviving son, five years old, lame in both feet since his nurse fled with him at the Jezreel news — is carried as narrated fact at the point the text places it, with no forward pointer to his later reappearance.',
    basis: 'biblical-text',
    confidence: 'high',
    sourceIds: ['esv-bible'],
    scholarlyViews: [
      {
        id: 'view-ishbosheth-entry-mt',
        label: 'MT: the captains enter "as though to take wheat"',
        proponents: [
          'Carl Friedrich Keil (Keil & Delitzsch, Biblical Commentary on the Books of Samuel, 1866, ad loc. 2 Samuel 4:6)',
        ],
        summary:
          'Reads 4:6 as the Masoretic Text states it: the two captains come into the middle of the house as though to take wheat, and strike Ish-bosheth in the stomach — terse, and by wide agreement textually difficult. Keil reads the MT’s "fetching wheat" as the men’s own pretext for entry (probably wheat for their soldiers), adopting this as his preferred reading over the Septuagint’s longer account (below), which he reports but does not adopt.',
        confidence: 'low',
        sourceIds: ['esv-bible', 'keil-delitzsch-1866'],
      },
      {
        id: 'view-ishbosheth-entry-lxx',
        label: 'LXX: a drowsing doorkeeper',
        proponents: [
          'The Septuagint (LXX) textual tradition itself, described and set alongside the MT by Carl Friedrich Keil (Keil & Delitzsch, ad loc. 2 Samuel 4:6)',
        ],
        summary:
          'The Greek Septuagint instead describes a female doorkeeper sifting wheat who grows drowsy and falls asleep, letting the two captains slip past her into the house. Keil reports this longer LXX account directly (a doorkeeper who "winnowed wheat, and slumbered and slept") as the alternative reading, while himself preferring the MT’s terser wording above.',
        confidence: 'low',
        sourceIds: ['esv-bible', 'keil-delitzsch-1866'],
      },
    ],
    notes:
      'The 4:6 entry divergence is a genuine textual-criticism crux, not a harmonization problem this project resolves. Researcher pass (2026-08-08, M5 citation-gap closure): both readings now carry a named, checkable attribution — Keil & Delitzsch’s 1866 commentary was found to discuss the MT and LXX readings directly and side by side at this verse, so both views cite the same public-domain source (Keil adopts the MT reading and reports, without adopting, the LXX one; the LXX view’s proponent is framed as the textual tradition itself, as Keil describes it, since a translated ancient text has no single named "author" the way a modern commentator does). This replaces the prior unnamed "e.g." hedge; mccarter-1984-ii-samuel’s own coverage was checked but did not yield a citable page-specific statement on this specific crux (see that source card’s confidenceNotes) — the gap is closed via Keil & Delitzsch instead, not McCarter. Confidence on both views stays low per the project’s convention that named attribution changes checkability, not confidence, for a genuinely disputed textual reading. Mahanaim is a disputed, unbuilt site (standing rule since gibeon-pool): none of 4:5–8’s events are staged, ever — narrated by card only, no Mahanaim geometry, no murder staging, no anatomy at any point. Mephibosheth is referenced only here and in the mephibosheth CharacterOrGroup entry; never staged as a figure.',
  },
  {
    id: 'claim-david-judgment',
    statement:
      'The narrative states that David answered Rechab and Baanah by retelling his own execution of the Amalekite messenger at Ziklag as the standard he judges by (4:10, the text’s own cross-link to 2 Samuel 1), declared Ish-bosheth "a righteous man" wrongly killed "in his own house on his bed" (4:11), commanded the young men to execute the two, ordered their hands and feet cut off and their bodies hanged beside the pool of Hebron, and had the head of Ish-bosheth buried in Abner’s own tomb at Hebron (2 Samuel 4:9–12).',
    basis: 'biblical-text',
    confidence: 'high',
    sourceIds: ['esv-bible'],
    notes:
      'The 4:10 retelling is the text’s own explicit cross-link to ziklag-lament’s claim-execution-messenger, not this project’s editorializing (see the brief’s historical intent #1) — two men arrive claiming credit for a rival’s death, and David executes them exactly as he executed the Amalekite, except this time the killing they report is real and theirs, which his own words treat as far worse. Whether David’s repeated public condemnation of every death that clears his path (see also hebron-gate) is plain report or apologetic shaping is the same scholarly dispute already carried on hebron-gate’s claim-public-response — referenced here, not restated as a second, divergent version. The hands-and-feet display (4:12a) is stated in this claim, and in the scene’s own captions, as narrated fact only: ADR-009’s dismemberment bar is unconditional, so it is never rendered as geometry, in any mode, at any fidelity tier — no shrouded shapes stand in for it either. The head of Ish-bosheth renders only as a small covered/wrapped bundle (buildWrappedFormGeometry at a short lengthScale), identifiable by caption alone, never by geometry, at both the presentation (4:8) and the burial (4:12b).',
  },
  {
    id: 'claim-hebron-pool-feature',
    statement:
      'The pool of Hebron (2 Samuel 4:12) is rendered as a modest, shallow rock-cut basin depression with a flat, unlit water plane — the same disclosed-placeholder convention gibeon-pool’s claim-gibeon-terrain-form used for the pool of Gibeon, without that scene’s archaeological corroboration (no excavated Iron Age water installation is attested for Hebron’s pool).',
    basis: 'design-placeholder',
    confidence: 'speculative',
    sourceIds: ['esv-bible'],
    notes:
      'The text names the pool as a known landmark at high confidence (biblical-text) — that existence is not what this claim disputes, the same distinction claim-abner-tomb-form draws for Abner’s burial site. What stays speculative is form, scale, and placement, none of which the text or any excavation supplies. The extant Birket es-Sultan pool shown to visitors in modern Hebron is explicitly not adopted as this pool’s site or form — an anachronism dressed as corroboration, the same reasoning claim-abner-tomb-form applies to the medieval "Tomb of Abner" tradition. No reflection/refraction water shader, matching the declined-water-shader precedent from gilboa-battle/jabesh-burial/gibeon-pool. Researcher pass (2026-08-08, M5 citation-gap closure): checked specifically for any Iron Age water installation at Hebron/Tel Rumeida beyond Birket es-Sultan. Found: a perennial spring near the tell, historically called "En Hebra"/"Ain Judeideh," in continuous use since antiquity and plausibly the settlement’s ancient water source — but no scholarly source found identifies it by name as "the pool of Hebron" of 2 Samuel 4:12, and no excavated, dated built pool structure (rock-cut basin, cistern, or tunnel system comparable to Gibeon’s) is reported for the Iron Age at the site; the one modern excavated "pool" at Hebron with a firm date is a Second Temple-period mikveh (ritual bath, c. 200 cubic meters, excavated 2014) — many centuries too late to bear on this claim. This is the queue-#13 "permanent evidentiary state" pattern, not outstanding research: a real check was made, using both general Hebron-archaeology and pool/water-installation-specific search terms, and it confirms rather than closes the gap. This claim stays design-placeholder/speculative; a genuinely new excavation finding, not a further literature search, is what would move it.',
  },
  {
    id: 'claim-reckoning-cast-scale',
    statement:
      'David’s attendants/guard ("the young men," 4:12a — no number narrated, ~8–14 figures at high quality tier) and the ambient town background (~10–20 figures) are disclosed design-choice headcounts, deliberately the smallest cast of any Milestone 5 scene — a judgment scene, not a crowd event, the same conversation-scale convention ziklag-lament set.',
    basis: 'design-placeholder',
    confidence: 'speculative',
    sourceIds: ['esv-bible'],
    notes:
      'Parallel in form to claim-gate-cast-scale, claim-judah-assembly-scale, and claim-gibeon-battle-scale: the same no-narrated-count, representative convention. Never conflated with the scene’s three staged, named principals (David, Rechab, Baanah), who are not part of this disclosed-scale group.',
  },
  {
    id: 'claim-divided-kingdom-collapse-overlay',
    statement:
      'The divided-kingdom map overlay’s M5 phase (the /atlas page’s "2 Sam 3–4" tab) renders the same Ish-bosheth’s-writ and house-of-Judah regions as the M4 phase, but with Ish-bosheth’s writ shown fading and annotated "no king after 2 Sam 4:1–12" while the house of Judah is left unchanged — a schematic visualization of the long-war trend and the north’s collapse, not a scholarly reconstruction of territory changing hands.',
    basis: 'design-placeholder',
    confidence: 'speculative',
    sourceIds: ['esv-bible'],
    notes:
      'Mixed-provenance claim, parallel in form and purpose to claim-divided-kingdom-atlas-overlay, of which this is the M5 phase extension (docs/next-run.md, Milestone 5’s fourth/last build item): the underlying textual claims are already carried at high confidence by claim-long-war (3:1’s "house of Saul grew weaker and weaker" trend), claim-abner-break (3:6–21, Abner’s defection), and claim-ish-bosheth-assassination (4:1–12, the assassination itself) — this claim does not re-assert any of them and stays out of their way. What this claim alone covers, and what its speculative/design-placeholder rating is about, is the overlay’s own visual choice for showing change over the milestone’s span: the same soft, unbordered, hard-edge-free region shape used in the M4 phase is kept exactly as-is (no new territory shape is invented, because the text describes a collapse of rule, not a redrawn border), but its shading opacity is reduced and a short annotation is added, so the "grew weaker and weaker" trend and Ish-bosheth’s death read as a fading, no-longer-occupied region rather than a static one. The house of Judah’s region is deliberately left unmodified between phases: the text says David "grew stronger and stronger" but never describes Judah’s territory itself expanding, so nothing is added to its shading that the text does not support. Both phases remain reachable on the page at all times via a phase control — switching phases never deletes or rewrites the M4 phase’s own shipped content (fable-review-queue.md #18’s binding constraint, carried forward unchanged) — and the overlay stays dismissible via the same allegiance-shading toggle the M4 phase already has (ADR-011’s "can still ignore it" test).',
  },
];

export const CLAIMS_BY_ID: ReadonlyMap<string, ReconstructionClaim> = new Map(
  CLAIMS.map((c) => [c.id, c]),
);
