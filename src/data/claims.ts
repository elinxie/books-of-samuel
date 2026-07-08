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
      'The narrative states that David’s men found an Egyptian in the open country, gave him bread, water, a cake of figs, and raisins after three days without food or water, and that he was the slave of an Amalekite, abandoned three days earlier when he fell sick (1 Samuel 30:11–15).',
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
];

export const CLAIMS_BY_ID: ReadonlyMap<string, ReconstructionClaim> = new Map(
  CLAIMS.map((c) => [c.id, c]),
);
