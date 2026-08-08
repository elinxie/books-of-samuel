/**
 * Configuration for the divided-kingdom atlas overlay (2 Samuel 2:8–11, M4's
 * fourth goal — see docs/fable-review-queue.md #18) and its Milestone 5
 * extension (2 Samuel 3–4's long-war trend and the north's collapse — see
 * docs/next-run.md and claim-divided-kingdom-collapse-overlay). This is
 * UI-layer display config, not new historical claim content: the allegiance
 * split itself is carried by claim-ish-bosheth-installed and
 * claim-judah-anointing, and its unraveling by claim-long-war,
 * claim-abner-break, and claim-ish-bosheth-assassination; this file only
 * decides which already-plotted LocationEntry ids get clustered under which
 * soft, unbordered shaded region, and how that region's shading reads once
 * the phase changes.
 */

/** The equirectangular-ish lat/lon window the map projects — covers every LocationEntry. */
export const MAP_LAT_RANGE: [number, number] = [31, 33];
export const MAP_LON_RANGE: [number, number] = [34, 36];

/**
 * Which snapshot of the divided kingdom the map is showing. 'm4' is 2 Samuel
 * 2:8–11's initial writ/Judah split (the milestone that shipped this
 * overlay); 'm5' is 2 Samuel 3–4's long war and the collapse of the
 * north's rule. Switching phases never deletes or rewrites the other
 * phase's content — both remain reachable, per the fable-review-queue #18
 * resolution's "additive, dismissible" constraint.
 */
export type AtlasPhase = 'm4' | 'm5';

export interface AllegianceRegionM5Override {
  /** Label rendered on the map in the M5 phase, in place of the base label. */
  label: string;
  /** Caption shown in the legend/notes in the M5 phase, in place of the base caption. */
  caption: string;
  /**
   * Multiplier applied to the region's base shading opacity in the M5
   * phase — the "house of Saul grew weaker and weaker" (2 Samuel 3:1) trend
   * rendered as a fading soft region, not as an invented shrinking border or
   * new territory shape.
   */
  opacity: number;
  /** Short annotation rendered under the region label on the map itself. */
  annotation: string;
}

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
   * Optional override for the M5 (2 Sam 3–4) phase. A region with no `m5`
   * entry — the house of Judah — renders identically in both phases: the
   * text describes Israel's rule collapsing, not Judah's territory
   * changing, so nothing about Judah's shading is invented for the trend.
   */
  m5?: AllegianceRegionM5Override;
}

export const ALLEGIANCE_REGIONS: AllegianceRegionConfig[] = [
  {
    id: 'israel-writ',
    label: 'Ish-bosheth’s writ',
    caption:
      'Gilead, the Ashurites, Jezreel, Ephraim, Benjamin, and all Israel — installed at Mahanaim (2 Samuel 2:9).',
    locationIds: ['mahanaim', 'mount-gilboa', 'beth-shan', 'jabesh-gilead'],
    colorVar: '--region-israel',
    m5: {
      label: 'Ish-bosheth’s writ — no king',
      caption:
        'The writ-list of 2:9 stood at the milestone’s start; by its end, Abner (the man who installed Ish-bosheth) has defected and been killed (2 Samuel 3:6–39), and Ish-bosheth himself has been assassinated by his own captains (2 Samuel 4:1–12). No new territory is shown changing hands — the text describes a collapse of rule, not a redrawn border — so the region keeps the same soft shape and fades instead.',
      opacity: 0.42,
      annotation: 'no king after 2 Sam 4:1–12',
    },
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
 * Locations emphasized in the M5 (2 Sam 3–4) phase. Every M5 scene
 * (hebron-covenant, hebron-gate, hebron-reckoning) is staged at Hebron;
 * Mahanaim is the disputed/unbuilt site every one of those scenes' cards
 * references (Abner's and Ish-bosheth's seat). Both are already in
 * M4_LOCATION_IDS — the milestone adds no newly built site to the map, only
 * a change of state at sites already plotted — so the M5 emphasis set is
 * the same list, kept as its own named export for clarity at the call site.
 */
export const M5_LOCATION_IDS = M4_LOCATION_IDS;
