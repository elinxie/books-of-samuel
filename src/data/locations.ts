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
    name: 'Jerusalem',
    altNames: ['Jebus', 'stronghold of Zion', 'City of David'],
    region: 'Southeastern ridge above the Kidron valley, on the Judah-Benjamin boundary',
    summary:
      'The Jebusite stronghold David takes and makes his capital (2 Samuel 5:6-9) — a narrow ridge belonging to no tribe, with its water source, the Gihon, at the foot of its eastern slope. Identified with the southeastern ridge (the City of David) south of the later Temple Mount.',
    identification: {
      // The site itself is secure; the character and extent of the
      // 10th-century settlement on it is disputed, and that dispute is
      // carried in the claim layer (claim-jebusite-stronghold-form), not
      // here, per the brief's explicit instruction.
      disputed: false,
      views: [
        {
          id: 'loc-view-jerusalem',
          label: 'The southeastern ridge (City of David)',
          summary:
            'Standard identification of the Jebusite stronghold and earliest Jerusalem with the narrow ridge south of the present Temple Mount, above the Kidron valley and the Gihon spring — one of the more securely located sites in Samuel.',
          confidence: 'high',
          sourceIds: ['rainey-notley-2006'],
        },
      ],
    },
    approxCoordinates: { lat: 31.7739, lon: 35.2358, confidence: 'high' },
    sceneIds: ['jerusalem-stronghold'],
    claimIds: [],
    status: 'in-progress',
  },
  {
    id: 'valley-of-rephaim',
    name: 'Valley of Rephaim',
    altNames: ['Emek Refaim'],
    region: 'Open plain southwest of Jerusalem, on the corridor toward the coastal plain',
    summary:
      "Where the Philistines twice deployed after David was anointed king over all Israel, and where he twice inquired of the LORD and struck them (2 Samuel 5:17-25). Identified with the broad plain/valley southwest of Jerusalem — the standard historical-geography reading, and a corridor that runs up toward the city's western approaches. Baal-perazim, the place David names after the first engagement, is not separately located (see claim-rephaim-first-engagement) and has no location entry of its own.",
    identification: {
      // Queue #22 researcher pass (2026-08-24): a genuine, recent named
      // challenge to the standard identification was found (Kleiman 2024),
      // so this now carries disputed: true with a second, low-confidence
      // view. The standard identification stays the project's default and
      // the scene's setting/coordinates are unchanged by this citation
      // upgrade alone — see claim-rephaim-terrain-form's notes.
      disputed: true,
      views: [
        {
          id: 'loc-view-rephaim',
          label: 'The plain southwest of Jerusalem',
          summary:
            "Standard identification with the open valley/plain southwest of the City of David (modern Emek Refaim), on the natural route between the coastal plain and Jerusalem's western approaches — consistent with the narrative's own logic (a force striking at the new center).",
          confidence: 'high',
          sourceIds: ['rainey-notley-2006'],
        },
        {
          id: 'loc-view-rephaim-gath-adjacent',
          label: 'A valley near Gath, farther southwest in the Shephelah',
          proponents: [
            'Sabine Kleiman (2024, Scandinavian Journal of the Old Testament 39/1: 45-59)',
            'e.g., reviving a 19th-century proposal by Claude Conder',
          ],
          summary:
            "Kleiman argues the valley the Philistines deployed in may lie much farther southwest than the traditional Jerusalem-adjacent location, closer to the Philistine city of Gath near the Elah Valley — reviving and defending Conder's older proposal placing the related site Baal-perazim near the spring 'Ain Faris, west of modern Nahalin. A newly published (2024-2025), not-yet-widely-adjudicated minority position; the traditional identification remains the field's standard reading.",
          confidence: 'low',
          sourceIds: ['kleiman-2024-valley-of-rapha'],
        },
      ],
    },
    approxCoordinates: { lat: 31.755, lon: 35.205, confidence: 'moderate' },
    sceneIds: ['rephaim-valley'],
    claimIds: [],
    status: 'in-progress',
  },
];

export const LOCATIONS_BY_ID: ReadonlyMap<string, LocationEntry> = new Map(
  LOCATIONS.map((l) => [l.id, l]),
);
