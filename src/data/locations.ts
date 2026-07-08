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
    sceneIds: ['ziklag-aftermath'],
    claimIds: ['claim-ziklag-location', 'claim-ziklag-scale', 'claim-ziklag-raided'],
    status: 'in-progress',
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
    status: 'planned',
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
    status: 'planned',
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
    status: 'planned',
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
    sceneIds: [],
    claimIds: [],
    status: 'planned',
  },
];

export const LOCATIONS_BY_ID: ReadonlyMap<string, LocationEntry> = new Map(
  LOCATIONS.map((l) => [l.id, l]),
);
