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
      'Rendered at reduced count (~1:10) for performance; the in-scene label discloses this. How literally to take army numbers in these narratives is debated, and the app does not take a position.',
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
    id: 'claim-gilboa-rout',
    statement:
      'The narrative states that the men of Israel fled before the Philistines and fell down slain on Mount Gilboa (1 Samuel 31:1).',
    basis: 'biblical-text',
    confidence: 'high',
    sourceIds: ['esv-bible'],
    notes:
      'Rendered as a rout draining down the eastern slope, read by motion and dust rather than by headcount (see claim-battle-scale); a seeded fraction of routing figures fall at distance in standard mode, per ADR-009.',
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
      'Rendered as Saul staggering/going to one knee; no wound or blood geometry in any mode. In reduced mode the hit itself is elided — he is simply down/faltering by the next beat (ADR-009).',
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
    sourceIds: ['king-stager-2001', 'yadin-1963'],
    scholarlyViews: [
      {
        id: 'view-philistine-headdress-sea-peoples-marker',
        label: 'Plumed headdress as a genuine Sea Peoples/Philistine material-culture marker',
        summary:
          'The feathered/plumed headdress is the best-attested and most widely reproduced Philistine visual signifier, drawn from the Egyptian Medinet Habu reliefs of Ramesses III (c. 1175 BCE) depicting "Sea Peoples" including the Peleset (Philistines); omitting it from a Philistine-force rendering is its own distortion of the best-known iconographic evidence.',
        confidence: 'moderate',
        sourceIds: ['yadin-1963'],
      },
      {
        id: 'view-philistine-headdress-attribution-contested',
        label: 'Ethnic/temporal application to this scene is unverified',
        summary:
          'Medinet Habu is Egyptian royal propaganda relief art, not a Philistine self-representation, and it dates to c. 1175 BCE — a century-plus before the Gilboa battle of the traditional Saul narrative and geographically set in Egypt/the Delta frontier, not the Jezreel highlands. Whether the headdress persisted as worn battlefield gear into Iron I/IIA highland warfare at Gilboa specifically is unverified in the excavated record cited here and page-level citation-checking is queued (`docs/fable-review-queue.md` item #13) before this scene ships `released`.',
        confidence: 'low',
        sourceIds: ['king-stager-2001'],
      },
    ],
    notes:
      'Round shield and straight sword are the baseline comparative-ANE/Aegean-influenced assumption for Philistine coastal-plain combatants (Yadin 1963; King & Stager 2001), not a specific excavated Gilboa-context panoply — moderate/low confidence throughout. The headdress dispute is the single most consequential material-culture call in this scene: rendering it only on the small principal cluster, behind this scholarlyViews label, is the provisional default agreed for build; it is not a resolved attribution. No "Philistine uniform" is asserted.',
  },
];

export const CLAIMS_BY_ID: ReadonlyMap<string, ReconstructionClaim> = new Map(
  CLAIMS.map((c) => [c.id, c]),
);
