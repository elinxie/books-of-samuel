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
];

export const CLAIMS_BY_ID: ReadonlyMap<string, ReconstructionClaim> = new Map(
  CLAIMS.map((c) => [c.id, c]),
);
