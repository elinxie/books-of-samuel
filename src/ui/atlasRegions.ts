/**
 * Configuration for the divided-kingdom atlas overlay (2 Samuel 2:8–11, M4's
 * fourth goal — see docs/fable-review-queue.md #18). This is UI-layer display
 * config, not new historical claim content: the allegiance split itself is
 * carried by claim-ish-bosheth-installed and claim-judah-anointing; this file
 * only decides which already-plotted LocationEntry ids get clustered under
 * which soft, unbordered shaded region, per claim-divided-kingdom-atlas-overlay.
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
