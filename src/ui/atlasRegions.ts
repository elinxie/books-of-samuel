/**
 * Configuration for the divided-kingdom atlas overlay (2 Samuel 2:8–11, M4's
 * fourth goal — see docs/fable-review-queue.md #18). This is UI-layer display
 * config, not new historical claim content: the allegiance split itself is
 * carried by claim-ish-bosheth-installed and claim-judah-anointing; this file
 * only decides which already-plotted LocationEntry ids get clustered under
 * which soft, unbordered shaded region, per claim-divided-kingdom-atlas-overlay.
 *
 * M5 extension (2 Samuel 3–4, per claim-atlas-m5-phase): the same overlay gets
 * a second phase. Judah's region is reused unchanged. The Israel-writ region
 * gets a `headless` variant reflecting Ish-bosheth's assassination and the
 * house of Saul's kingship ending (4:1–12) — rendered with a fainter fill and a
 * "no king" sub-label, and with no outline of any kind added (the M4
 * no-hard-edge discipline carries over unchanged), never removed, reassigned,
 * or merged into Judah's region. This deliberately stops short of 2 Samuel 5's all-Israel
 * anointing of David, which is out of scope for this overlay entirely.
 *
 * M6 extension (2 Samuel 5, per claim-atlas-m6-phase): the two regions carried
 * since M4/M5 merge into a single soft-shaded region under one king (5:1–3's
 * covenant and anointing over all Israel), and the capital marker moves from
 * Hebron to Jerusalem. The merge is captioned as a change of allegiance under
 * one king, never as a mapped territorial extent — the same no-hard-edge
 * discipline carries over, and the capital marker itself is a ring around
 * Jerusalem's point only, with no fill/shading of its own. The separate,
 * disputed question of tenth-century Jerusalem's actual extent stays in the
 * claim layer (claim-jebusite-stronghold-form), not on this map.
 */

/** The equirectangular-ish lat/lon window the map projects — covers every LocationEntry. */
export const MAP_LAT_RANGE: [number, number] = [31, 33];
export const MAP_LON_RANGE: [number, number] = [34, 36];

export interface AllegianceRegionConfig {
  id: string;
  /** Short label rendered on the map itself. */
  label: string;
  /** Fuller caption shown in the legend/notes below the map. */
  caption: string;
  /** LocationEntry ids whose coordinates anchor this region's soft center/extent. */
  locationIds: string[];
  /** CSS custom property (defined in app.css) carrying this region's color. */
  colorVar: string;
  /**
   * M5-only variant: the region's king is gone and no heir is shown taking
   * the throne (2 Samuel 4:1–12). Rendered with a fainter fill and a "no king"
   * sub-label, with no outline added — never removed, reassigned to another region, or
   * merged/blended toward Judah's shading, since the text does not say who
   * (if anyone) holds this territory once Ish-bosheth is dead.
   */
  headless?: boolean;
}

export const ALLEGIANCE_REGIONS: AllegianceRegionConfig[] = [
  {
    id: 'israel-writ',
    label: 'Ish-bosheth’s writ',
    caption:
      'Gilead, the Ashurites, Jezreel, Ephraim, Benjamin, and all Israel — installed at Mahanaim (2 Samuel 2:9).',
    locationIds: ['mahanaim', 'mount-gilboa', 'beth-shan', 'jabesh-gilead'],
    colorVar: '--region-israel',
  },
  {
    id: 'judah',
    label: 'House of Judah',
    caption: 'Anointed David king over Judah alone, at Hebron (2 Samuel 2:4, 10b).',
    locationIds: ['hebron', 'ziklag'],
    colorVar: '--region-judah',
  },
];

/** Locations this milestone actually built scenes for — shown at full emphasis. */
export const M4_LOCATION_IDS = ['ziklag', 'hebron', 'gibeon', 'mahanaim'];

/**
 * The overlay's M5 phase (2 Samuel 3–4, claim-atlas-m5-phase): Judah's region
 * is carried over unchanged from ALLEGIANCE_REGIONS; the Israel-writ region is
 * replaced with its `headless` variant. Same location clustering as M4 — this
 * phase changes how the north's region is drawn, not which places anchor it.
 */
export const ALLEGIANCE_REGIONS_M5: AllegianceRegionConfig[] = [
  {
    id: 'israel-writ',
    label: 'Ish-bosheth’s former writ',
    caption:
      'Gilead, the Ashurites, Jezreel, Ephraim, Benjamin, and all Israel (2 Samuel 2:9): by 4:12 the house of Saul’s kingship has ended — Ish-bosheth assassinated (4:1–8), Mephibosheth (4:4) lame and a child, not a throne claimant. Shown with a fainter fill and no outline added, not removed or reassigned: the text does not say who, if anyone, holds this territory next. That question — 2 Samuel 5’s all-Israel anointing of David — is out of scope for this map.',
    locationIds: ['mahanaim', 'mount-gilboa', 'beth-shan', 'jabesh-gilead'],
    colorVar: '--region-israel',
    headless: true,
  },
  {
    id: 'judah',
    label: 'House of Judah',
    caption:
      'Unchanged from the M4 phase: the house of Judah alone, at Hebron (2 Samuel 2:4, 10b). The long war (3:1) reports David growing steadily stronger, but that is a narrated trend, not a territorial gain — this region is not redrawn or expanded to reflect it.',
    locationIds: ['hebron', 'ziklag'],
    colorVar: '--region-judah',
  },
];

/**
 * Locations this overlay's M5 phase emphasizes — the three Hebron scenes
 * (hebron-covenant, hebron-gate, hebron-reckoning) plus Mahanaim, where
 * Ish-bosheth was installed and later killed (narrated only, never built —
 * the standing rule since M4's gibeon-pool).
 */
export const M5_LOCATION_IDS = ['hebron', 'mahanaim'];

/**
 * The overlay's M6 phase (2 Samuel 5, claim-atlas-m6-phase): the two regions
 * merge into one. `locationIds` is the union of both prior regions' anchor
 * points plus Jerusalem itself — the new capital is now part of the same
 * allegiance, so it is folded into the shared soft shading, not left outside
 * it. The Valley of Rephaim (rephaim-valley's setting) is deliberately not
 * added here: it is a contested Philistine engagement site, not a place named
 * in any writ-list, and folding it into the kingdom's shaded region would
 * read as a territorial claim the text does not make — it is instead plotted
 * at full emphasis (see M6_LOCATION_IDS) sitting in the unshaded gap outside
 * the region, the same "contested ground, not a claimed side" treatment M4
 * gives Gibeon.
 */
export const ALLEGIANCE_REGIONS_M6: AllegianceRegionConfig[] = [
  {
    id: 'united-kingdom',
    label: 'One king, Israel and Judah',
    caption:
      'All the tribes of Israel came to David at Hebron; the elders made a covenant with him before the LORD and anointed him king over Israel (2 Samuel 5:1–3), lifting the “house of Judah only” qualifier of his first anointing (2:4). The two regions carried since M4/M5 are shown here as one soft, unbordered region — a change of allegiance under one king, not a mapped territorial extent: 2 Samuel 5 gives a covenant and an anointing, not a border.',
    locationIds: [
      'mahanaim',
      'mount-gilboa',
      'beth-shan',
      'jabesh-gilead',
      'hebron',
      'ziklag',
      'jerusalem',
    ],
    colorVar: '--region-united',
  },
];

/**
 * Locations this milestone's own scenes emphasize: jerusalem-stronghold
 * (the capture and the capital's founding) and rephaim-valley (the two
 * Philistine engagements). Neither scene asserts an order relative to the
 * other — see the M6 phase's own disclosure text in AtlasPage.tsx.
 */
export const M6_LOCATION_IDS = ['jerusalem', 'valley-of-rephaim'];

/**
 * The overlay's M6 phase capital marker: the capital moves from Hebron to
 * Jerusalem (2 Samuel 5:6–9). Rendered by DividedKingdomMap as a ring around
 * the point only — no extent geometry, no fill of its own, per the brief's
 * explicit guard that Jerusalem's marker uses only its secure identification
 * coordinates.
 */
export const M6_CAPITAL_ID = 'jerusalem';
