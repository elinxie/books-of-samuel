import { Page } from '../ui/SiteChrome';
import { DividedKingdomMap } from '../ui/DividedKingdomMap';
import { LocationDisputeNote } from '../ui/LocationDisputeNote';
import { ClaimCard } from '../ui/ClaimCard';
import { ALLEGIANCE_REGIONS } from '../ui/atlasRegions';
import { LOCATIONS, resolveClaims } from '../data';
import { useAppStore } from '../state/store';

const OVERLAY_CLAIM_IDS = [
  'claim-ish-bosheth-installed',
  'claim-judah-anointing',
  'claim-divided-kingdom-atlas-overlay',
  'claim-david-historical',
];

/**
 * The divided-kingdom political-geography overlay (2 Samuel 2:8–11, M4's
 * fourth goal — docs/fable-review-queue.md #18, resolved 2026-08-02). A
 * schematic study map, not an in-scene device: allegiance is shown only as
 * soft, unbordered region shading keyed to the text's own name-lists, never
 * hard border lines. Optional and dismissible per ADR-011.
 */
export function AtlasPage() {
  const showShading = useAppStore((s) => s.showAllegianceShading);
  const toggleShading = useAppStore((s) => s.toggleAllegianceShading);
  const claims = resolveClaims(OVERLAY_CLAIM_IDS);
  const disputedShown = LOCATIONS.filter((l) => l.approxCoordinates && l.identification.disputed);

  return (
    <Page>
      <h1>The divided kingdom — 2 Samuel 2:8–11</h1>
      <p className="page-lede">
        After Saul’s death, the narrative reports a political split: Abner installs Ish-bosheth as
        king “over Gilead and the Ashurites and Jezreel and Ephraim and Benjamin and all Israel” at
        Mahanaim, while “the house of Judah followed David” at Hebron (2 Samuel 2:8–10). This is a
        schematic study map, not a scene — drawing a precise border on the ground would be inventing
        certainty no Iron Age source can support. Allegiance is shown only as soft, unbordered
        shading clustered around the text’s own named places; you can turn that shading off below
        and look at the plotted places alone.
      </p>

      <div className="toggle-row" style={{ maxWidth: 420 }}>
        <span>
          Allegiance shading
          <span className="toggle-hint">
            Soft regions for Ish-bosheth’s writ vs. house of Judah.
          </span>
        </span>
        <button
          type="button"
          className="switch"
          role="switch"
          aria-checked={showShading}
          aria-pressed={showShading}
          aria-label="Toggle allegiance shading"
          data-testid="atlas-toggle-shading"
          onClick={toggleShading}
        />
      </div>

      <DividedKingdomMap locations={LOCATIONS} showShading={showShading} />

      <p style={{ color: 'var(--muted)', fontSize: 12.5 }}>
        Marker size follows the coordinate confidence rating in <code>src/data/locations.ts</code>{' '}
        (larger = higher confidence). A dashed ring marks a location whose site identification is
        disputed. Hebron, Gibeon, Ziklag, and Mahanaim — this milestone’s own scenes — are shown at
        full emphasis; nearby Milestone 3 sites (Gilboa, Beth-shan, Jabesh-gilead) and Gath are
        shown for orientation only. Gibeon sits in the unshaded gap between the two regions,
        reflecting its role as the contested meeting-ground between Abner’s and Joab’s men, not a
        claim about which side held it.
      </p>

      <h2>Two rival capitals, one unlocatable</h2>
      <p className="page-lede">
        Hebron’s identification with Tell Rumeida is secure. Mahanaim’s is not: no site in the
        Jabbok valley commands scholarly consensus, so it is plotted here at its own low-confidence
        coordinates, with both published candidates disclosed rather than a single answer chosen for
        convenience.
      </p>
      {disputedShown.map((loc) => (
        <LocationDisputeNote key={loc.id} location={loc} />
      ))}

      <h2>What this overlay claims — and doesn’t</h2>
      <p className="page-lede">
        The writ-list split itself is stated plainly by the text at high confidence. What is
        schematic, and carries this page’s own lower confidence, is the map’s visual rendering:
        region shapes, boundary softness, and the projection used to place points. The kingdom’s
        actual territorial scale on the ground is a separate, disputed historical question this
        overlay does not resolve.
      </p>
      {claims.map((c) => (
        <ClaimCard key={c.id} claim={c} />
      ))}

      <h2>Regions shown</h2>
      <ul>
        {ALLEGIANCE_REGIONS.map((r) => (
          <li key={r.id}>
            <strong>{r.label}</strong> — {r.caption}
          </li>
        ))}
      </ul>
    </Page>
  );
}
