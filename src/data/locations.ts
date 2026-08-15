import type { LocationEntry } from './types';

export const LOCATIONS: LocationEntry[] = [
  {
    id: 'ziklag',
    name: 'Ziklag',
    region: 'Negev / southern Shephelah frontier',
    summary:
      'The town Achish of Gath granted to David (1 Samuel 27:6), from which David raided southward and which the Amalekites burned in 1 Samuel 30. Its site is one of the classic unsolved problems of biblical geography.',
    identification: {
      disputed: true,
      views: [
        {
          id: 'loc-view-ziklag-tel-sera',
          label: 'Tel Sera’ (Tell esh-Shari’a)',
          proponents: [
            'Isaac (Yitzhak) Press (1955, first proposed)',
            'Benjamin Mazar (1957)',
            'Yohanan Aharoni (1967)',
            'Eliezer D. Oren (1972–1979 excavator)',
          ],
          summary:
            'Western Negev site on Nahal Gerar with substantial Iron Age remains; identification predates Oren’s excavations, first proposed by Press (1955).',
          confidence: 'low',
          sourceIds: ['oren-tel-sera-1993', 'rainey-notley-2006'],
        },
        {
          id: 'loc-view-ziklag-tel-halif',
          label: 'Tel Halif (Tell Khuweilifeh)',
          proponents: [
            'e.g., proponents cited in historical-geography surveys (attribution not yet page-verified)',
          ],
          summary: 'Site at the hill–Negev boundary near Lahav, fitting Simeonite town lists.',
          confidence: 'low',
          sourceIds: ['rainey-notley-2006'],
        },
        {
          id: 'loc-view-ziklag-khirbet-al-rai',
          label: 'Khirbet al-Ra’i',
          proponents: [
            'Yosef Garfinkel and Saar Ganor (2019 proposal)',
            'Kyle H. Keimer (2023, defending it)',
          ],
          summary:
            '2019 proposal based on Philistine-affiliated then early Iron IIA occupation near Lachish; contested by Aren Maeir and by Thomas & McKinny (2022, Israel Exploration Journal), who favor Tel Sera’.',
          confidence: 'low',
          sourceIds: ['garfinkel-ganor-2019'],
        },
      ],
    },
    approxCoordinates: { lat: 31.39, lon: 34.68, confidence: 'low' },
    sceneIds: ['ziklag-aftermath', 'ziklag-lament'],
    claimIds: ['claim-ziklag-location', 'claim-ziklag-scale', 'claim-ziklag-raided'],
    // 2026-08-02 Fable M4 release pass: with ziklag-lament → released, both of
    // this location's scenes are now released, so the location follows per the
    // M2/M3 cascade convention. (It was never flipped at the M1/M2 sign-offs —
    // an oversight, not policy: the jabesh-gilead precedent shows a disputed
    // identification lives in identification.disputed/views and does not bar
    // location release; status tracks build progress.)
    status: 'released',
  },
  {
    id: 'brook-besor',
    name: 'Brook Besor',
    altNames: ['Nahal Besor', 'Wadi Ghazzeh'],
    region: 'Northwestern Negev',
    summary:
      'The wadi where two hundred of David’s exhausted men stayed with the baggage while four hundred pursued the Amalekites (1 Samuel 30:9–10, 21–25). Widely identified with Nahal Besor, the largest wadi system of the western Negev.',
    identification: {
      disputed: false,
      views: [
        {
          id: 'loc-view-besor-nahal-besor',
          label: 'Nahal Besor (Wadi Ghazzeh)',
          summary: 'Standard identification in historical-geography reference works.',
          confidence: 'high',
          sourceIds: ['rainey-notley-2006'],
        },
      ],
    },
    approxCoordinates: { lat: 31.25, lon: 34.45, confidence: 'moderate' },
    sceneIds: ['besor-crossing', 'amalekite-camp'],
    claimIds: ['claim-besor', 'claim-besor-channel-form'],
    status: 'released',
  },
  {
    id: 'gath',
    name: 'Gath (of the Philistines)',
    altNames: ['Tell es-Safi'],
    region: 'Philistia / Elah Valley mouth',
    summary:
      'Seat of Achish, David’s Philistine overlord (1 Samuel 27). Securely identified with Tell es-Safi, one of the largest Iron Age sites in the region, excavated since 1996.',
    identification: {
      disputed: false,
      views: [
        {
          id: 'loc-view-gath-safi',
          label: 'Tell es-Safi',
          proponents: ['Aren Maeir (excavator)'],
          summary: 'Identification now near-consensus after long-running excavation.',
          confidence: 'high',
          sourceIds: ['maeir-safi-2012'],
        },
      ],
    },
    approxCoordinates: { lat: 31.7, lon: 34.85, confidence: 'high' },
    sceneIds: [],
    claimIds: [],
    status: 'planned',
  },
  {
    id: 'mount-gilboa',
    name: 'Mount Gilboa',
    altNames: ['Jebel Faqqu’a'],
    region: 'Eastern Jezreel Valley rim',
    summary:
      'The ridge where Saul and his sons died in battle against the Philistines (1 Samuel 31). The identification with the modern Gilboa ridge is secure through name continuity and topography.',
    identification: {
      disputed: false,
      views: [
        {
          id: 'loc-view-gilboa',
          label: 'Modern Gilboa ridge (Jebel Faqqu’a)',
          summary: 'Name continuity and battlefield topography make this identification standard.',
          confidence: 'high',
          sourceIds: ['rainey-notley-2006'],
        },
      ],
    },
    approxCoordinates: { lat: 32.44, lon: 35.41, confidence: 'high' },
    sceneIds: ['gilboa-battle'],
    claimIds: [],
    status: 'released',
  },
  {
    id: 'beth-shan',
    name: 'Beth-shan',
    altNames: ['Beth-shean', 'Tel Beth-Shean'],
    region: 'Beth-shean Valley (Jordan–Jezreel junction)',
    summary:
      'The city on whose wall the Philistines fastened the bodies of Saul and his sons (1 Samuel 31:10–12). Securely identified; long an Egyptian garrison town before the period, extensively excavated.',
    identification: {
      disputed: false,
      views: [
        {
          id: 'loc-view-beth-shan',
          label: 'Tel Beth-Shean',
          proponents: ['Amihai Mazar (excavator, 1989–1996)'],
          summary: 'Secure identification; the Iron I town and its history are well published.',
          confidence: 'high',
          sourceIds: ['mazar-beth-shean-2006'],
        },
      ],
    },
    approxCoordinates: { lat: 32.5, lon: 35.5, confidence: 'high' },
    sceneIds: ['beth-shan-walls'],
    claimIds: [],
    status: 'released',
  },
  {
    id: 'jabesh-gilead',
    name: 'Jabesh-gilead',
    region: 'Transjordan, Wadi Yabis area',
    summary:
      'The town whose men retrieved the bodies of Saul and his sons by night and buried them (1 Samuel 31:11–13), repaying Saul’s rescue in 1 Samuel 11. The precise site is disputed.',
    identification: {
      disputed: true,
      views: [
        {
          id: 'loc-view-jabesh-maqlub',
          label: 'Tell el-Maqlub',
          summary: 'Fits the Wadi Yabis name continuity and Eusebius’ distance notice.',
          confidence: 'moderate',
          sourceIds: ['rainey-notley-2006'],
        },
        {
          id: 'loc-view-jabesh-abu-kharaz',
          label: 'Tell Abu al-Kharaz',
          proponents: ['e.g., Peter Fischer (excavator)'],
          summary: 'Excavated Jordan Valley-edge site proposed as Jabesh-gilead.',
          confidence: 'low',
          sourceIds: ['rainey-notley-2006'],
        },
      ],
    },
    approxCoordinates: { lat: 32.4, lon: 35.67, confidence: 'low' },
    sceneIds: ['jabesh-burial'],
    claimIds: [],
    status: 'released',
  },
  {
    id: 'hebron',
    name: 'Hebron',
    altNames: ['Tell Rumeida / Tel Hevron'],
    region: 'Southern Judean highlands',
    summary:
      'Where David is anointed king over Judah (2 Samuel 2). Identified with Tell Rumeida above the modern city.',
    identification: {
      disputed: false,
      views: [
        {
          id: 'loc-view-hebron',
          label: 'Tell Rumeida',
          summary: 'Standard identification of the Bronze–Iron Age city.',
          confidence: 'high',
          sourceIds: ['rainey-notley-2006'],
        },
      ],
    },
    approxCoordinates: { lat: 31.52, lon: 35.1, confidence: 'high' },
    sceneIds: ['hebron-anointing', 'hebron-covenant', 'hebron-gate', 'hebron-reckoning'],
    claimIds: [],
    // 2026-08-02 Fable M4 release pass: hebron-anointing → released (queue
    // #19c closed as "checked, permanently thin" — the Tell Rumeida town-form
    // gap is citably confirmed, the disclosed placeholder stands) — status
    // follows the scene per the M2/M3 cascade precedent. hebron-covenant,
    // hebron-gate, and hebron-reckoning (all M5, 2026-08-10) add themselves
    // to sceneIds without changing this location's own `released` status,
    // which describes the location record itself, not every scene built at
    // it.
    status: 'released',
  },
  {
    id: 'gibeon',
    name: 'Gibeon',
    altNames: ['Tell el-Jib', 'el-Jib'],
    region: 'Central Benjamin highlands, north of Jerusalem',
    summary:
      'Site of the pool where the young men of Abner and Joab fought, and of the battle in which Asahel died (2 Samuel 2:12–17). Identified with Tell el-Jib.',
    identification: {
      disputed: false,
      views: [
        {
          id: 'loc-view-gibeon',
          label: 'Tell el-Jib (el-Jib)',
          proponents: ['James B. Pritchard (excavator, 1956–1962)'],
          summary:
            'Secured largely by jar handles recovered at the site inscribed with the Hebrew triliteral gb’n ("Gibeon"); widely regarded as one of the more strongly corroborated site identifications in biblical archaeology.',
          confidence: 'high',
          sourceIds: ['pritchard-gibeon-1962', 'rainey-notley-2006'],
        },
      ],
    },
    approxCoordinates: { lat: 31.85, lon: 35.18, confidence: 'high' },
    sceneIds: ['gibeon-pool'],
    claimIds: ['claim-gibeon-pool-form'],
    // 2026-08-02 Fable M4 release pass: gibeon-pool → released (queue #19d
    // closed affirmatively — pool construction dated Iron I/10th c. BCE).
    status: 'released',
  },
  {
    id: 'mahanaim',
    name: 'Mahanaim',
    region: 'Transjordan, Gilead (Jabbok/Zarqa valley area)',
    summary:
      'Ish-bosheth’s capital east of the Jordan after Saul’s death (2 Samuel 2:8, 12), and later a refuge for David during Absalom’s revolt. No site identification commands scholarly consensus; several candidates in the Jabbok valley have been proposed and none is secure.',
    identification: {
      disputed: true,
      views: [
        {
          id: 'loc-view-mahanaim-tulul-dhahab',
          label: 'Tulul adh-Dhahab al-Gharbi (Tell ed-Dahab el-Gharbi, western mound)',
          proponents: [
            'Robert A. Coughenour (1989, iron-industry argument)',
            'Israel Finkelstein and Tallay Ornan (2024 proposal)',
          ],
          summary:
            'Proposed on two independent grounds: Coughenour (1989) argued the site fit a hypothesized regional iron-industry role; Finkelstein and Ornan (2024) point to carved ashlar blocks found there, dated to roughly the early-to-mid 8th century BCE, as remains of an Israelite-period monumental building. Neither amounts to an established consensus.',
          confidence: 'low',
          sourceIds: ['coughenour-1989-mahanaim', 'finkelstein-ornan-2024-mahanaim'],
        },
        {
          id: 'loc-view-mahanaim-tell-hajjaj',
          label: 'Tell Hajjaj',
          proponents: [
            'e.g., discussed by Robert A. Coughenour (1989) as the strongest alternative candidate',
          ],
          summary:
            'A competing Jabbok-valley candidate raised in the same literature that argues for Tulul adh-Dhahab; no excavation has confirmed it as Mahanaim.',
          confidence: 'low',
          sourceIds: ['coughenour-1989-mahanaim'],
        },
      ],
    },
    approxCoordinates: { lat: 32.19, lon: 35.69, confidence: 'low' },
    sceneIds: [],
    claimIds: [],
    status: 'planned',
  },
  {
    id: 'jerusalem',
    name: 'Jerusalem (City of David)',
    altNames: ['City of David', 'Zion', 'Jebus', 'Ir David'],
    region: 'Judean central highlands — the Ophel/Silwan ridge south of the later Temple Mount',
    summary:
      'The Jebusite stronghold the narrative presents David’s forces as capturing and making his own capital, afterward called “the City of David” (2 Samuel 5:6–10), where he is said to have built up the surrounding area “from the Millo inward” (5:9) and to have received cedar, craftsmen, and masons from Hiram of Tyre to build “a house” for him (5:11–12). Universally located on the narrow spur immediately south of the later Temple Mount, beside the Gihon Spring — a small ridge, not the much larger area later Jerusalem would come to occupy. Verse 8’s taunt about “the blind and the lame” and its reference to a tsinnor (“water shaft”/“watercourse”) is one of the most textually difficult verses in Samuel; one long-debated but unproven reading connects it to the Gihon Spring water system (see identification.views and reich-shukron-1999-warrens-shaft), though several other readings of the obscure Hebrew have been proposed and none commands consensus. What Iron Age IIA building actually stood on the ridge in David’s traditional 10th-century BCE horizon — a substantial fortified town or a modest highland hill settlement — is one of the most contested questions in biblical archaeology; see identification.views for both readings, neither of which this project adopts as settled.',
    identification: {
      disputed: true,
      views: [
        {
          id: 'loc-view-jerusalem-city-of-david-ridge',
          label: 'City of David ridge (Ophel/Silwan spur) — the site itself',
          summary:
            'The Jebusite-and-early-Davidic city is identified, without serious dispute among any of the scholars cited on this entry, with the narrow ridge running south from the later Temple Mount platform toward the Gihon Spring and the Kidron/Tyropoeon valley confluence — a small spur, on the order of a few hectares, far smaller than the area later Jerusalem would occupy. This project’s Jerusalem/City of David location sits on this ridge; the two views below concern what Iron Age IIA (10th-century BCE) construction actually existed on it, not where the site was.',
          confidence: 'high',
          sourceIds: ['rainey-notley-2006', 'mazar-2009-palace-of-david'],
        },
        {
          id: 'loc-view-jerusalem-maximalist',
          label: 'Maximalist reading: a genuine fortified town',
          proponents: ['Eilat Mazar (excavator, 2005–2007 seasons)', 'Jane M. Cahill (2003)'],
          summary:
            'Reads the Stepped Stone Structure (excavated in stages by R. A. S. Macalister in the 1920s, Kathleen Kenyon in the 1960s, and Yigal Shiloh’s Area G project of 1978–1985) together with Eilat Mazar’s “Large Stone Structure,” excavated 2005–2007 immediately above it and tentatively dated by her to the 10th–9th century BCE, as evidence of substantial monumental construction consistent with a functioning fortified town — and, on Mazar’s own cautious proposal, plausibly the remains of a royal building she suggests may be David’s palace, built with Hiram of Tyre’s materials and craftsmen per 2 Samuel 5:11.',
          confidence: 'low',
          sourceIds: ['cahill-2003-jerusalem-united-monarchy', 'mazar-2009-palace-of-david'],
        },
        {
          id: 'loc-view-jerusalem-minimalist',
          label: 'Minimalist reading: a modest highland hill settlement',
          proponents: [
            'Israel Finkelstein, Ze’ev Herzog, Lily Singer-Avitz, and David Ussishkin (2007)',
            'Margreet L. Steiner (2003)',
          ],
          summary:
            'Reads the same excavated remains skeptically: the Large Stone Structure’s walls are poorly preserved and not demonstrably one coherent building, the pottery recovered does not securely date the complex to the 10th century BCE specifically, and Kenyon’s own excavation data (re-examined by Steiner) supports at most a sparse, largely unfortified hill settlement in David’s traditional period rather than a monumental capital city.',
          confidence: 'low',
          sourceIds: [
            'finkelstein-herzog-singer-avitz-ussishkin-2007',
            'steiner-2003-kenyon-response',
            'finkelstein-silberman-2001',
          ],
        },
      ],
    },
    approxCoordinates: { lat: 31.7739, lon: 35.2354, confidence: 'high' },
    sceneIds: [],
    claimIds: [],
    status: 'planned',
  },
];

export const LOCATIONS_BY_ID: ReadonlyMap<string, LocationEntry> = new Map(
  LOCATIONS.map((l) => [l.id, l]),
);
