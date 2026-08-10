import { Page } from '../ui/SiteChrome';
import { DividedKingdomMap } from '../ui/DividedKingdomMap';
import { LocationDisputeNote } from '../ui/LocationDisputeNote';
import { ClaimCard } from '../ui/ClaimCard';
import {
  ALLEGIANCE_REGIONS,
  ALLEGIANCE_REGIONS_M5,
  M4_LOCATION_IDS,
  M5_LOCATION_IDS,
} from '../ui/atlasRegions';
import { LOCATIONS, resolveClaims } from '../data';
import { useAppStore } from '../state/store';

const OVERLAY_CLAIM_IDS = [
  'claim-ish-bosheth-installed',
  'claim-judah-anointing',
  'claim-divided-kingdom-atlas-overlay',
  'claim-david-historical',
];

/** M5 phase (2 Samuel 3–4, claim-atlas-m5-phase) — this overlay's own M5 extension. */
const M5_OVERLAY_CLAIM_IDS = [
  'claim-long-war',
  'claim-abner-break',
  'claim-abner-killing',
  'claim-public-response',
  'claim-ish-bosheth-assassination',
  'claim-atlas-m5-phase',
];

const M4_ARIA_LABEL = "Schematic map of the divided kingdom after Saul's death, 2 Samuel 2";
const M5_ARIA_LABEL =
  "Schematic map of the long war and Ish-bosheth's fall, 2 Samuel 3-4, with the Israel-writ region shown fainter and labeled no king";

/**
 * The divided-kingdom political-geography overlay (2 Samuel 2:8–11, M4's
 * fourth goal — docs/fable-review-queue.md #18, resolved 2026-08-02), extended
 * with an M5 phase (2 Samuel 3–4, claim-atlas-m5-phase) covering the long-war
 * trend and Ish-bosheth's collapse. A schematic study map, not an in-scene
 * device: allegiance is shown only as soft, unbordered region shading keyed to
 * the text's own name-lists, never hard border lines, in either phase.
 * Optional and dismissible per ADR-011.
 */
export function AtlasPage() {
  const showShading = useAppStore((s) => s.showAllegianceShading);
  const toggleShading = useAppStore((s) => s.toggleAllegianceShading);
  const atlasPhase = useAppStore((s) => s.atlasPhase);
  const setAtlasPhase = useAppStore((s) => s.setAtlasPhase);
  const isM5 = atlasPhase === 'm5';

  const claims = resolveClaims(OVERLAY_CLAIM_IDS);
  const m5Claims = resolveClaims(M5_OVERLAY_CLAIM_IDS);
  const disputedShown = LOCATIONS.filter((l) => l.approxCoordinates && l.identification.disputed);

  const regions = isM5 ? ALLEGIANCE_REGIONS_M5 : ALLEGIANCE_REGIONS;
  const emphasizedIds = isM5 ? M5_LOCATION_IDS : M4_LOCATION_IDS;

  return (
    <Page>
      <h1>
        {isM5
          ? 'The long war and Ish-bosheth’s fall — 2 Samuel 3–4'
          : 'The divided kingdom — 2 Samuel 2:8–11'}
      </h1>
      <p className="page-lede">
        After Saul’s death, the narrative reports a political split: Abner installs Ish-bosheth as
        king “over Gilead and the Ashurites and Jezreel and Ephraim and Benjamin and all Israel” at
        Mahanaim, while “the house of Judah followed David” at Hebron (2 Samuel 2:8–10). This is a
        schematic study map, not a scene — drawing a precise border on the ground would be inventing
        certainty no Iron Age source can support. Allegiance is shown only as soft, unbordered
        shading clustered around the text’s own named places; you can turn that shading off below
        and look at the plotted places alone.
      </p>

      <div className="phase-tabs" role="tablist" aria-label="Atlas overlay phase">
        <button
          type="button"
          role="tab"
          className="phase-tab"
          aria-selected={!isM5}
          data-testid="atlas-phase-m4"
          onClick={() => setAtlasPhase('m4')}
        >
          <strong>M4 — the divided kingdom</strong>2 Samuel 2:8–11
        </button>
        <button
          type="button"
          role="tab"
          className="phase-tab"
          aria-selected={isM5}
          data-testid="atlas-phase-m5"
          onClick={() => setAtlasPhase('m5')}
        >
          <strong>M5 — the long war and Ish-bosheth’s fall</strong>2 Samuel 3–4
        </button>
      </div>

      {isM5 && (
        <>
          <h2>The long war, and a house without a king</h2>
          <p className="page-lede">
            “The war between the house of Saul and the house of David was long. And David grew
            steadily stronger, while the house of Saul grew steadily weaker” (2 Samuel 3:1). This is
            a trend the text states, not a territory it redraws — no new border or region is added
            to the map for it. What the map does add is the outcome of that trend by 2 Samuel 4:
            Abner broke with Ish-bosheth and defected to David (3:6–21), Abner was killed at
            Hebron’s gate (3:22–27), and Ish-bosheth was assassinated in his own house with no heir
            positioned to rule — Jonathan’s son Mephibosheth (4:4) was lame in both feet and a
            child, not a throne claimant. By 4:12 the house of Saul’s kingship has ended.
          </p>
          <p className="page-lede">
            This map does not make the further claim that the north is now part of David’s domain,
            absorbed into it, or annexed by it. It stops at what 3:1–4:12 says: the north’s king is
            dead and no successor is shown taking his place. Who, if anyone, held the former
            Israel-writ territory in the interval is not stated by these chapters. The all-Israel
            anointing that answers that question belongs to 2 Samuel 5 — a later passage, out of
            scope for this milestone and not depicted, shaded, or hinted at anywhere on this map.
          </p>
        </>
      )}

      <div className="toggle-row" style={{ maxWidth: 420 }}>
        <span>
          Allegiance shading
          <span className="toggle-hint">
            {isM5
              ? 'Soft regions for the house of Judah vs. the now-headless Israel-writ.'
              : 'Soft regions for Ish-bosheth’s writ vs. house of Judah.'}
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

      <DividedKingdomMap
        locations={LOCATIONS}
        showShading={showShading}
        regions={regions}
        emphasizedIds={emphasizedIds}
        ariaLabel={isM5 ? M5_ARIA_LABEL : M4_ARIA_LABEL}
      />

      <p style={{ color: 'var(--muted)', fontSize: 12.5 }}>
        Marker size follows the coordinate confidence rating in <code>src/data/locations.ts</code>{' '}
        (larger = higher confidence). A dashed ring marks a location whose site identification is
        disputed.{' '}
        {isM5 ? (
          <>
            Hebron and Mahanaim — this phase’s own scenes (hebron-covenant, hebron-gate,
            hebron-reckoning; Mahanaim narrated only) — are shown at full emphasis; Gibeon and
            Ziklag (M4’s scenes), plus Gilboa, Beth-shan, Jabesh-gilead, and Gath, are shown for
            orientation only in this phase.
          </>
        ) : (
          <>
            Hebron, Gibeon, Ziklag, and Mahanaim — this milestone’s own scenes — are shown at full
            emphasis; nearby Milestone 3 sites (Gilboa, Beth-shan, Jabesh-gilead) and Gath are shown
            for orientation only. Gibeon sits in the unshaded gap between the two regions,
            reflecting its role as the contested meeting-ground between Abner’s and Joab’s men, not
            a claim about which side held it.
          </>
        )}
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
      {isM5 && (
        <>
          <p className="page-lede">
            The M5 phase adds no new territorial assertion of its own — it recaptions the same soft
            regions to reflect what 2 Samuel 3–4 report happening to the house of Saul, cross-
            referencing the claims already built for the three M5 scenes below rather than
            re-deriving new claim text.
          </p>
          {m5Claims.map((c) => (
            <ClaimCard key={c.id} claim={c} />
          ))}
        </>
      )}

      <h2>Regions shown</h2>
      <ul>
        {regions.map((r) => (
          <li key={r.id} data-testid={`region-legend-${r.id}`}>
            <strong>{r.label}</strong> — {r.caption}
          </li>
        ))}
      </ul>
    </Page>
  );
}
