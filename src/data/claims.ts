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
      'The project’s first named-character-kills-named-character death (distinct from Saul’s suicide in gilboa-battle). Per ADR-009: documentary distance, no wound/blood geometry in any mode. The text’s one specific non-graphic detail — Abner’s reversed spear grip — and the "stood still" reaction beat (2:23b) are used as the emotional pivot in place of a graphic replay. Abner is staged as reluctant, consistent with his two on-record warnings.',
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
      'The narrative states that there was a long war between the house of Saul and the house of David, and that David grew steadily stronger while the house of Saul grew steadily weaker, and lists the sons born to David at Hebron (2 Samuel 3:1–5).',
    basis: 'biblical-text',
    confidence: 'high',
    sourceIds: ['esv-bible'],
    notes:
      'Delivered as an opening context card only (b-long-war), no staged geometry — the war itself is fought at unnamed places over an unstated span of time, not a single battle this project can or should render. Cross-references the /atlas overlay (claim-divided-kingdom-atlas-overlay) as where this strengthening/weakening trend is mapped over the milestone, not restaged here. The sons born at Hebron are listed as the text lists them, with no forward commentary on what Amnon or Absalom later do — that lies far outside this scene and this milestone.',
  },
  {
    id: 'claim-abner-break',
    statement:
      'The narrative states that Ish-bosheth accused Abner of going in to Rizpah, Saul’s concubine; that Abner responded with indignation, not confession or denial, and swore to transfer the kingdom from Saul’s house to David’s "from Dan to Beersheba"; and that Ish-bosheth, fearing Abner, said nothing further (2 Samuel 3:6–11).',
    basis: 'biblical-text',
    confidence: 'high',
    sourceIds: ['esv-bible'],
    notes:
      'Narrated-not-adjudicated discipline, at its most delicate in this milestone: the text puts the accusation in Ish-bosheth’s mouth and never states whether it was true; Abner’s reply is indignation, not a denial or a confession, and this claim (and every caption/entity description touching it) must carry that ambiguity rather than resolve it. The accusation’s political meaning — that going in to a deceased or deposed king’s concubine carried a royal-claim overtone in the ancient Near East — is commonly noted by commentators, but is hedged here rather than attributed to a named citation: the project’s one checked, relevant modern commentary (mccarter-1984-ii-samuel) currently only extends to 2 Samuel 1:1–16 in its source-card summary, not chapter 3, so it is not cited for this specific point pending a researcher pass that extends that card’s coverage (or finds another citable source) for the concubine-claim political reading. Delivered as a context card only (b-break); Mahanaim is referenced, never built (standing rule from gibeon-pool’s mahanaim treatment). No staging of the accusation itself, no visualization of Rizpah — see the brief’s "Resolved design calls."',
  },
  {
    id: 'claim-abner-overture',
    statement:
      'The narrative states that Abner sent messengers to David proposing a covenant; that David made the return of his wife Michal — taken from Paltiel son of Laish — a condition; that Ish-bosheth had her taken and sent to David, with Paltiel following her weeping as far as Bahurim until Abner sent him back; and that Abner spoke with the elders of Israel and with Benjamin before coming to Hebron himself (2 Samuel 3:12–19).',
    basis: 'biblical-text',
    confidence: 'high',
    sourceIds: ['esv-bible'],
    notes:
      'Delivered entirely as context cards (b-overture, b-elders) — nothing here is staged. Michal’s transfer, Paltiel’s weeping follow to Bahurim, and the messenger exchanges all happen at sites this project cannot or should not build (unnamed places, an unlocated Bahurim) or would require inventing geometry the text does not support; staging any of it would assert a specific place/moment the text does not fix. The human weight of 3:16 ("weeping after her all the way") is carried by caption text only, never a render — Paltiel and Michal get light, referenced-only character entries (src/data/characters.ts) so the inspector can surface them, with no geometry anywhere in this scene. Abner’s consultation with the elders (3:17–19) — the north’s own consent gathered before the visit — is likewise text-only.',
  },
  {
    id: 'claim-covenant-feast',
    statement:
      'The narrative states that Abner came to David at Hebron with twenty men; that David made Abner and his men a feast; that Abner pledged to gather all Israel to David in a covenant; and that David sent Abner away, and he went in peace (2 Samuel 3:20–21).',
    basis: 'biblical-text',
    confidence: 'high',
    sourceIds: ['esv-bible'],
    notes:
      'The scene’s staged center (b-arrival, b-feast, b-pledge, b-peace). 3:21–23 repeats the peace formula three times ("he went in peace" / "he had gone in peace" / "he has gone in peace") as the narrative hammers home that Abner left under safe-conduct before recounting what Joab did next; this scene owns and stages only the first occurrence (3:21b), held straight — a settled, public, peaceable dismissal, with no dread staging or foreboding framing anticipating hebron-gate. The observer who has walked gibeon-pool should recognize Abner as the same man who killed Asahel there, received at David’s own table anyway: statecraft over vendetta is this claim’s (and this scene’s) whole subject. Joab does not appear anywhere in this claim’s staging — the text is explicit he was away (3:22), and his return belongs to hebron-gate alone.',
  },
  {
    id: 'claim-feast-form',
    statement:
      'The feast (3:20b) is staged as a modest, open-air prepared meal in a courtyard space consistent with hebron-anointing’s existing town rendering — low mats, shared vessels, two facing groups — not a banquet hall, throne room, or palace.',
    basis: 'design-placeholder',
    confidence: 'speculative',
    sourceIds: ['esv-bible'],
    notes:
      'The text says only "David made Abner and the men who were with him a feast" — no architecture, no vessel forms, no seating arrangement. Checked king-stager-2001 (the project’s primary material-culture source) for a citable discussion of Israelite feast/banquet staging or hosting-vessel forms specifically; its recorded coverage is general Israelite daily life and material culture (houses, dress, wells, food production, tools) without a dedicated discussion of feasting/hospitality material culture, so it does not support moving this claim past design-placeholder. Upgradeable to comparative-ane only if a future researcher pass finds citable meal/feasting material culture in that source (or another) worth citing for vessel forms specifically — not to be invented here. Hebron’s town-form placeholder itself (claim-hebron-town-form) stays exactly as released; this claim does not touch or upgrade it.',
  },
  {
    id: 'claim-covenant-cast-scale',
    statement:
      'Abner’s twenty men render literally, 1:1 (3:20’s exact count). Every other figure count in this scene is a disclosed design choice: David’s escort at the feast (~15–25 figures at high quality tier) and the ambient town background (~20–30 figures at high quality tier) — deliberately the smallest M5 crowd, since this is a closed political meal, not a crowd event.',
    basis: 'design-placeholder',
    confidence: 'speculative',
    sourceIds: ['esv-bible'],
    notes:
      'Parallel in form to claim-judah-assembly-scale and claim-gibeon-battle-scale: no headcount is narrated for who attended on David’s side or for Hebron’s ordinary background population at this moment, so no ratio of any asserted "true" figure applies to either group — only Abner’s twenty (a named, countable, renderable number taken directly from the text) needs no such disclosure. The contrast with hebron-anointing’s 150–200-figure civic assembly is deliberate and load-bearing: that scene staged a public founding; this one stages a closed diplomatic meal at the same place a few years later.',
  },
  {
    id: 'claim-joab-return-protest',
    statement:
      'The narrative states that Joab and the servants of David returned from a raid, bringing much spoil with them; that Joab was told Abner had come to the king, been sent away, and had gone in peace; and that Joab confronted David, protesting that Abner had come to deceive him — to observe his movements and learn all that he was doing (2 Samuel 3:22–25).',
    basis: 'biblical-text',
    confidence: 'high',
    sourceIds: ['esv-bible'],
    notes:
      'The text puts this reading in Joab’s own mouth and never adjudicates whether the suspicion was sincere or pretextual; this claim states only that the narrative gives Joab these words, not that they are the narrative’s own verdict on Abner’s visit (contrast claim-covenant-feast, which the narrative does present as straightforwardly accepted). The third repetition of "gone in peace" (3:23, after 3:21 and 3:22) is carried here, at the point the text repeats it — see claim-abner-killing’s notes for the fourth-adjacent detail, "but David did not know it" (3:26b).',
  },
  {
    id: 'claim-abner-killing',
    statement:
      'The narrative states that Joab sent messengers after Abner, who brought him back from the cistern of Sirah without David’s knowledge; that Abner returned through the gate of Hebron; that Joab took him aside into the midst of the gate to speak with him privately; and that Joab struck him there in the stomach, so that he died — "for the blood of Asahel his brother" (2 Samuel 3:26–27).',
    basis: 'biblical-text',
    confidence: 'high',
    sourceIds: ['esv-bible'],
    scholarlyViews: [
      {
        id: 'view-abner-blood-vengeance',
        label: 'Blood vengeance for Asahel',
        proponents: [
          'e.g., scholars reading the killing primarily through the text’s own stated motive at 3:27, 30',
        ],
        summary:
          'Reads the killing primarily as blood vengeance for Asahel’s death at Gibeon (2 Samuel 2:23) — the reason 3:27 itself states. Legally complicated within the narrative’s own world: Asahel died in open battle after being twice warned to turn aside, which is exactly why the narrative’s own verdict (David’s curse, 3:29) and 1 Kings 2:5’s retrospective ("avenging in peacetime blood shed in war") both treat this as murder, not lawful blood vengeance.',
        confidence: 'moderate',
        sourceIds: ['esv-bible'],
      },
      {
        id: 'view-abner-political-rival',
        label: 'Elimination of a political rival',
        proponents: [
          'e.g., scholars reading Joab’s stated protest (3:24–25) as covering a rivalry the narrative otherwise leaves implicit',
        ],
        summary:
          'Reads Abner — Saul’s former army commander, and the obvious rival for command of a newly united army under David — as a political threat to Joab’s own position, with the blood-vengeance claim serving as public cover; a widely held historical-critical reading of the passage’s political logic that the text itself never states outright.',
        confidence: 'moderate',
        sourceIds: ['esv-bible'],
      },
    ],
    notes:
      'The milestone’s most important claim — the second application of ADR-009’s named-character-killing template (first: claim-asahel-death, gibeon-pool), cross-referenced both ways: this claim’s first scholarlyView names the Asahel connection the text itself states as Joab’s motive, and claim-asahel-death (gibeon-pool) is where that earlier death — and Abner’s own staged reluctance in causing it — is recorded. Both scholarlyViews above are hedged ("e.g., scholars...", no named proponents yet) pending a researcher pass that either extends mccarter-1984-ii-samuel’s recorded coverage (currently only 2 Samuel 1) to chapter 3, or finds another citable source naming specific proponents for each reading; until then sourceIds point only to the text itself, and confidence stays moderate for both rather than asserting either reading as more established (never-fake-consensus rule). Neither view editorializes Joab into a simple villain or Abner into a simple victim — both readings, and the "obvious rival" reading’s speculative edge, stay open. "But David did not know it" (3:26b) is stated in this scene at the point the text states it (b-recall) — David’s own position never approaches the killing ground before he hears of it (docs/design/hebron-gate-brief.md, "Resolved design calls"). Staged per ADR-009: documentary distance, no wound/blood/weapon geometry in either violence mode; the drawing-aside itself (3:27a) is the one gesture shown, the strike’s method the way the reversed spear grip was Asahel’s; the strike is staged as Joab’s alone even though 3:30 names Abishai as sharing responsibility.',
  },
  {
    id: 'claim-david-disavowal',
    statement:
      'The narrative states that when David heard of Abner’s death he publicly declared himself and his kingdom innocent before the LORD of Abner’s blood forever, called down a curse on Joab’s house (a perpetual line of those with a discharge, leprosy, one who takes hold of a spindle, one who falls by the sword, and one lacking bread), and stated that Abishai and Joab were more severe than he and that the LORD would repay the evildoer (2 Samuel 3:28–30, 39).',
    basis: 'biblical-text',
    confidence: 'high',
    sourceIds: ['esv-bible'],
    notes:
      'The curse’s content is delivered unsoftened in caption text, in both violence modes — reduction abstracts depiction, never facts — but is never visualized in any form, per the brief’s placeholder policy. 3:30 (Abishai named alongside Joab) is stated here as the text’s own attribution of shared responsibility; this claim does not itself adjudicate the killing’s motive (see claim-abner-killing for that).',
  },
  {
    id: 'claim-abner-funeral',
    statement:
      'The narrative states that David commanded Joab and all the people with him to tear their clothes, put on sackcloth, and mourn before Abner; that Joab did so and David himself walked behind the bier; that Abner was buried at Hebron, with David weeping aloud at the grave and all the people weeping with him; that David sang a lament over Abner; and that the people came to urge David to eat while it was yet day, and David swore he would taste nothing until the sun went down (2 Samuel 3:31–35).',
    basis: 'biblical-text',
    confidence: 'high',
    sourceIds: ['esv-bible'],
    notes:
      'The scene’s gravitational center, per the brief: the text spends more verses on the mourning than the killing, and its most striking detail — David ordering Joab himself, the killer, to tear his clothes and mourn before the bier — is staged exactly as narrated, without caption commentary on Joab’s interior state (the text gives none). Funeral staging follows the text’s own props list and nothing more: torn clothes, sackcloth, a bier, a grave at Hebron, weeping, the lament, fasting until sundown. Abner’s body renders as a wrapped, anatomically unresolved form on the bier (buildWrappedFormGeometry, the ADR-009 funerary standard already used at Beth-shan and Jabesh-gilead), never a distinct "body" asset. Mourning-dress detail beyond sackcloth/torn clothes reuses claim-mourning-dress (ziklag-lament) where applicable. The lament’s core (3:33b–34a) and 3:38 carry this scene’s ESV excerpt spend (see the 2sam-3 passage entry’s keyExcerpts) — no invented melody, the standing ziklag-lament rule.',
  },
  {
    id: 'claim-public-response',
    statement:
      'The narrative states that everything the king did pleased all the people, and that all the people and all Israel understood that day that it had not been the king’s will to put Abner to death; and that David said to his servants, "Do you not know that a prince and a great man has fallen this day in Israel?" (2 Samuel 3:36–38).',
    basis: 'biblical-text',
    confidence: 'high',
    sourceIds: ['esv-bible'],
    scholarlyViews: [
      {
        id: 'view-apologia-reading',
        label: 'The apology of David',
        proponents: [
          'e.g., scholars following McCarter’s and others’ reading of 2 Samuel 3 as apologetic composition',
        ],
        summary:
          'Reads 3:26b, the curse, the commanded public mourning, the lament, the fast, and 3:36–37’s explicit insistence together as one of the clearest examples of what scholarship calls the apology of David — a narrative visibly concerned to clear David of a politically convenient death, shaped for that purpose rather than simply reporting it.',
        confidence: 'moderate',
        sourceIds: ['esv-bible'],
      },
      {
        id: 'view-plain-report-reading',
        label: 'Plain report',
        proponents: [
          'e.g., scholars reading 3:36–37 as a straightforward historical notice of the public reaction',
        ],
        summary:
          'Reads the passage’s insistence on David’s innocence as a plain report of events and genuine public sentiment, without treating the narrative’s emphasis itself as evidence of apologetic shaping.',
        confidence: 'moderate',
        sourceIds: ['esv-bible'],
      },
    ],
    notes:
      'Requires the mccarter-1984-ii-samuel source card’s recorded coverage (currently only 2 Samuel 1) to be extended to 2 Samuel 3 by a researcher pass before either view can carry a named citation — both stay hedged ("e.g., scholars...") until then, per the never-fake-consensus rule; this is the same citation-extension gap claim-abner-killing’s two scholarlyViews and claim-abner-break’s notes already flag. The scene stages what the text narrates (the king’s behavior, the people’s understanding, David’s own words at 3:38); the dispute about why the text narrates it so emphatically lives here, in the claim layer, not in the beat captions.',
  },
  {
    id: 'claim-hebron-gate-form',
    statement:
      'The scene renders a modest two-chamber gate passage at Hebron — a roofed corridor between the town cluster and the open gate plaza, with two small flanking chamber recesses — as the interior "the midst of the gate" (3:27) requires, explicitly not a monumental six-chamber Solomonic-type gate.',
    basis: 'design-placeholder',
    confidence: 'speculative',
    sourceIds: ['esv-bible'],
    notes:
      'No gate of any period is excavated at Tell Rumeida — the same permanent researcher-gap finding claim-hebron-town-form already records (queue #19c) extends here. A monumental six-chamber gate would be both an over-claim for the site and an anachronism risk for the 10th-century-BCE window this scene depicts (that gate typology is conventionally associated with later, larger royal building programs); the two-chamber form is the minimum interior the text’s own detail requires, not a claim about Hebron’s real gate plan. Upgradeable to comparative-ane (a generic early Iron II gate typology, not a Hebron-specific plan) only if a researcher pass extends herzog-1997’s urban-form coverage with a checkable citation for gate types in this period; not yet attempted here. A refuge-city irony note (Hebron is listed at Joshua 20:7, and commentators have long noted the irony of a blood-killing "in the midst of the gate" of such a city) is deliberately omitted from this claim and from every caption in this scene — it may only be added once a researcher pass attaches a named citation (McCarter’s extension is the natural candidate); shipping it as the project’s own editorial observation would violate the source-discipline rule.',
  },
  {
    id: 'claim-abner-tomb-form',
    statement:
      'Abner’s tomb at Hebron (3:32) is rendered as a simple rock-cut entry on the town hill’s flank — a modest, disclosed placeholder, not the medieval "Tomb of Abner" tradition and structure in modern Hebron.',
    basis: 'design-placeholder',
    confidence: 'speculative',
    sourceIds: ['esv-bible'],
    notes:
      'The text names only that Abner was buried at Hebron; it gives no tomb form, location detail, or monument. The medieval "Tomb of Abner" site and structure shown to visitors in modern Hebron is a much later devotional tradition with no claim to mark the original 10th-century-BCE burial, and is deliberately not adopted here, per the brief’s placeholder policy — the same anachronism discipline that keeps the gate passage from becoming a monumental one.',
  },
  {
    id: 'claim-gate-cast-scale',
    statement:
      'Joab’s returning raid party (3:22) renders at a disclosed design count, ≈15–25 figures at high quality tier — no narrated headcount, only "much spoil." The mourning assembly ("all the people," 3:31–32, 35–36) renders as a disclosed representative crowd, ≈60–90 figures at high quality tier — the same no-narrated-count convention as claim-judah-assembly-scale, deliberately smaller than hebron-anointing’s civic-founding assembly (a funeral, not a founding). Ambient town background renders at ≈15–25 figures at high quality tier. High-tier total across all crowds and principals: ≈100–140 figures.',
    basis: 'design-placeholder',
    confidence: 'speculative',
    sourceIds: ['esv-bible'],
    notes:
      'Parallel in form to claim-judah-assembly-scale, claim-gibeon-battle-scale, and claim-covenant-cast-scale: no headcount is narrated for any of this scene’s three crowds, so no ratio of any asserted "true" figure applies to any of them. The largest M5 scene by figure count, still at or below gilboa-battle’s band and cheaper to render (procession-pace movement for the mourning assembly, no combat choreography) — the brief’s explicit performance framing.',
  },
  {
    id: 'claim-ish-bosheth-assassination',
    statement:
      'The narrative states that when Ish-bosheth heard of Abner’s death his courage failed and all Israel was dismayed; that two of his own captains, Rechab and Baanah, sons of Rimmon the Beerothite, entered his house while he lay resting at noon, struck him fatally, beheaded him, and traveled all night by way of the Arabah to Hebron, where they presented the head to David and claimed the LORD had that day avenged him on Saul and his offspring (2 Samuel 4:1–8).',
    basis: 'biblical-text',
    confidence: 'high',
    sourceIds: ['esv-bible'],
    scholarlyViews: [
      {
        id: 'view-mt-wheat-pretext',
        label: 'MT: entry under pretext of fetching wheat',
        proponents: ['e.g., scholars following the Masoretic Text’s own reading of 4:6'],
        summary:
          'The Masoretic Text (as transmitted) has the two captains enter the house on the pretext of taking wheat — the household errand itself is their means of getting inside undetected.',
        confidence: 'moderate',
        sourceIds: ['esv-bible'],
      },
      {
        id: 'view-lxx-doorkeeper-drowsed',
        label: 'LXX: a doorkeeper who had drowsed',
        proponents: ['e.g., scholars following the Septuagint’s reading of 4:6'],
        summary:
          'The Septuagint instead reads that a woman doorkeeper, who had been cleaning wheat, grew drowsy and fell asleep, letting the two men slip past her unnoticed.',
        confidence: 'moderate',
        sourceIds: ['esv-bible'],
      },
    ],
    notes:
      'Mahanaim is narrated only, per the standing rule since gibeon-pool: a disputed, unbuilt site gets no geometry, so the noon entry, the murder in bed, the beheading, and the night flight all render as cards only, never staged. The 4:6 Hebrew text is notoriously difficult as transmitted, and the Masoretic and Septuagint traditions diverge genuinely on how the two men gained entry; both readings are surfaced above, hedged ("e.g., scholars...") pending a researcher pass that extends mccarter-1984-ii-samuel’s recorded source-card coverage (currently only 2 Samuel 1) to 2 Samuel 4 for named attribution — the same citation-extension gap already flagged on claim-abner-killing and claim-public-response. The beheading (4:7b) is stated in caption text only, at the point the text states it; no anatomy geometry of any kind is ever rendered for it, in either violence mode, per ADR-009’s absolute dismemberment bar (see claim-david-judgment for the head’s own caption-only-bundle rendering standard once it arrives at Hebron). The Mephibosheth parenthesis (4:4) is carried on its own light claim, claim-mephibosheth-parenthesis, not folded in here.',
  },
  {
    id: 'claim-mephibosheth-parenthesis',
    statement:
      'The narrative states, as an aside, that Jonathan had a son who was lame in both feet — five years old when the news of Saul and Jonathan’s deaths came from Jezreel, lamed when his nurse fled with him and he fell — and names him Mephibosheth (2 Samuel 4:4).',
    basis: 'biblical-text',
    confidence: 'high',
    sourceIds: ['esv-bible'],
    notes:
      'Carried exactly where the text places it: a parenthetical aside on what remains of Saul’s house, inserted between the report of Ish-bosheth’s dismay (4:1–3) and the murder itself (4:5–7). Delivered as a card only, with no staged figure — Mephibosheth is a light, referenced-only character entry (src/data/characters.ts). No forward pointer to his later reappearance in 2 Samuel 9 is made anywhere in this scene, per the brief’s explicit instruction; that chapter is far outside this milestone.',
  },
  {
    id: 'claim-david-judgment',
    statement:
      'The narrative states that David answered Rechab and Baanah’s claim by recalling his own execution of the messenger who once claimed to have killed Saul at Ziklag (4:10), pronounced them wicked men who had killed “a righteous man in his own house on his bed,” had his young men kill them and cut off their hands and feet, hung the bodies beside the pool at Hebron, and buried Ish-bosheth’s head in Abner’s tomb at Hebron (2 Samuel 4:9–12).',
    basis: 'biblical-text',
    confidence: 'high',
    sourceIds: ['esv-bible'],
    notes:
      'This scene’s deliberate structural twin to ziklag-lament: 4:10 is David’s own retelling of that exact episode (see claim-execution-messenger), so this claim and its captions cross-link to it rather than restate it — two men claim credit for a rival’s death expecting reward, and David executes them both, but here the killing they report is real and theirs, which David’s own words treat as far worse. ADR-009’s absolute dismemberment bar governs the hands-and-feet display unconditionally: it is stated in caption text only, in both violence modes, and renders as no geometry at all — not even a shrouded or wrapped stand-in, unlike Beth-shan’s whole-body display forms, because there is no honest non-anatomical way to represent a display of severed parts; the pool itself renders, the display does not. Ish-bosheth’s head is likewise never rendered as anatomy at any point in this scene, including at the presentation and burial beats: it is a small covered, anatomically unresolved bundle only (buildWrappedFormGeometry at its smallest scale yet, the convention already used for the Jabesh bone bundle and Abner’s bier), identifiable by caption alone, carried low and never framed as a trophy. The execution itself follows ADR-009’s named-killing template a third time, and for the first time as a judicial act rather than a personal one: documentary distance, no wound/blood/weapon geometry in either mode, and — unlike every earlier application — no gesture of any kind is invented for the strike, since the text gives no method detail to show. The dispute over why the narrative insists so emphatically on David’s innocence across every death that clears his path is already carried on hebron-gate’s claim-public-response and is not restated or re-adjudicated here.',
  },
  {
    id: 'claim-hebron-pool-feature',
    statement:
      'The pool of Hebron (2 Samuel 4:12) is rendered as a modest, shallow rock-cut basin depression with a flat, unlit water plane, on the strength of the text naming it as an existing, known landmark — modeled directly on the pool of Gibeon’s own terrain-form/no-water-shader convention (claim-gibeon-pool-form, claim-gibeon-terrain-form), not on any excavated or securely dated Hebron water installation.',
    basis: 'design-placeholder',
    confidence: 'speculative',
    sourceIds: ['esv-bible'],
    notes:
      'Mixed-provenance claim, parallel in form to claim-divided-kingdom-atlas-overlay: that the text names a pool at Hebron as an existing landmark (4:12, "hung them up beside the pool at Hebron") is high-confidence biblical text and is not itself in question here; what stays design-placeholder/speculative is this claim’s own subject, the rendered form and placement. The extant "Birket es-Sultan" pool shown to visitors in modern Hebron is deliberately not adopted here as either site or form — it is a much later installation, and treating it as corroboration for a 10th-century-BCE landmark would be exactly the anachronism-dressed-as-corroboration error the project’s discipline rules out (CLAUDE.md). No reflection/refraction water shader, matching the declined-water-shader precedent from gilboa-battle/jabesh-burial/gibeon-pool. Upgradeable only if a researcher pass finds a citable, dated treatment of Iron Age water installations at Hebron specifically — not yet attempted here.',
  },
  {
    id: 'claim-reckoning-cast-scale',
    statement:
      'David’s attendants render at a disclosed design count, ≈8–14 figures at high quality tier — the "young men" 4:12a attributes the execution to, no narrated headcount. Ambient town background renders at ≈10–20 figures at high quality tier, static. High-tier total across principals (David, Rechab, Baanah) and both crowds: ≈20–35 figures — the smallest M5 scene, conversation-scale per the ziklag-lament precedent, not a crowd event.',
    basis: 'design-placeholder',
    confidence: 'speculative',
    sourceIds: ['esv-bible'],
    notes:
      'Parallel in form to claim-covenant-cast-scale and claim-gate-cast-scale: no headcount is narrated for either group, so no ratio of any asserted "true" figure applies. Deliberately the smallest of the three M5 scenes, reflecting the brief’s framing of this as a judgment scene, not a public event.',
  },
];

export const CLAIMS_BY_ID: ReadonlyMap<string, ReconstructionClaim> = new Map(
  CLAIMS.map((c) => [c.id, c]),
);
