import { Page } from '../ui/SiteChrome';
import { DividedKingdomMap } from '../ui/DividedKingdomMap';
import { LocationDisputeNote } from '../ui/LocationDisputeNote';
import { ClaimCard } from '../ui/ClaimCard';
import {
  ALLEGIANCE_REGIONS,
  ALLEGIANCE_REGIONS_M5,
  ALLEGIANCE_REGIONS_M6,
  M4_LOCATION_IDS,
  M5_LOCATION_IDS,
  M6_LOCATION_IDS,
  M6_CAPITAL_ID,
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

/** M6 phase (2 Samuel 5, claim-atlas-m6-phase) — this overlay's own M6 extension. */
const M6_OVERLAY_CLAIM_IDS = [
  'claim-all-israel-covenant',
  'claim-jerusalem-capture',
  'claim-city-of-david-naming',
  'claim-jerusalem-terrain-form',
  'claim-jebusite-stronghold-form',
  'claim-atlas-m6-phase',
];

const M4_ARIA_LABEL = "Schematic map of the divided kingdom after Saul's death, 2 Samuel 2";
const M5_ARIA_LABEL =
  "Schematic map of the long war and Ish-bosheth's fall, 2 Samuel 3-4, with the Israel-writ region shown fainter and labeled no king";
const M6_ARIA_LABEL =
  'Schematic map of the united kingdom, 2 Samuel 5, with the two former regions merged into one and the capital marker moved from Hebron to Jerusalem';

/**
 * The divided-kingdom political-geography overlay (2 Samuel 2:8–11, M4's
 * fourth goal — docs/fable-review-queue.md #18, resolved 2026-08-02), extended
 * with an M5 phase (2 Samuel 3–4, claim-atlas-m5-phase) covering the long-war
 * trend and Ish-bosheth's collapse, and an M6 phase (2 Samuel 5,
 * claim-atlas-m6-phase) where the two regions merge under one king and the
 * capital marker moves from Hebron to Jerusalem. A schematic study map, not
 * an in-scene device: allegiance is shown only as soft, unbordered region
 * shading keyed to the text's own name-lists, never hard border lines, in
 * any phase. Optional and dismissible per ADR-011.
 */
export function AtlasPage() {
  const showShading = useAppStore((s) => s.showAllegianceShading);
  const toggleShading = useAppStore((s) => s.toggleAllegianceShading);
  const atlasPhase = useAppStore((s) => s.atlasPhase);
  const setAtlasPhase = useAppStore((s) => s.setAtlasPhase);
  const isM5 = atlasPhase === 'm5';
  const isM6 = atlasPhase === 'm6';
  const isM4 = !isM5 && !isM6;

  const claims = resolveClaims(OVERLAY_CLAIM_IDS);
  const m5Claims = resolveClaims(M5_OVERLAY_CLAIM_IDS);
  const m6Claims = resolveClaims(M6_OVERLAY_CLAIM_IDS);
  const disputedShown = LOCATIONS.filter((l) => l.approxCoordinates && l.identification.disputed);

  const regions = isM6 ? ALLEGIANCE_REGIONS_M6 : isM5 ? ALLEGIANCE_REGIONS_M5 : ALLEGIANCE_REGIONS;
  const emphasizedIds = isM6 ? M6_LOCATION_IDS : isM5 ? M5_LOCATION_IDS : M4_LOCATION_IDS;
  const capitalId = isM6 ? M6_CAPITAL_ID : undefined;
  const ariaLabel = isM6 ? M6_ARIA_LABEL : isM5 ? M5_ARIA_LABEL : M4_ARIA_LABEL;

  return (
    <Page>
      <h1>
        {isM6
          ? 'The united kingdom — 2 Samuel 5'
          : isM5
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
          aria-selected={isM4}
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
        <button
          type="button"
          role="tab"
          className="phase-tab"
          aria-selected={isM6}
          data-testid="atlas-phase-m6"
          onClick={() => setAtlasPhase('m6')}
        >
          <strong>M6 — the united kingdom</strong>2 Samuel 5
        </button>
      </div>

      {isM6 && (
        <>
          <h2>One king, one capital</h2>
          <p className="page-lede">
            All the tribes of Israel came to David at Hebron; the elders made a covenant with him
            before the LORD and anointed him king over Israel (2 Samuel 5:1–3), lifting the “house
            of Judah only” qualifier of his first anointing (2:4). The two regions this map has
            carried since M4 and M5 — the house of Judah, and the former Israel-writ, headless since
            Ish-bosheth’s assassination — are shown here merged into one soft region under a single
            king. This is a change of allegiance the text states plainly, not a territorial extent
            this map measures: 2 Samuel 5:1–3 gives a covenant and an anointing, not a border, so no
            new region outline or boundary is drawn — only the region label and caption change.
          </p>
          <p className="page-lede">
            David then went to Jerusalem and took the Jebusite stronghold, renaming it the city of
            David (5:6–9); the capital marker on the map below moves from Hebron to Jerusalem to
            match. Jerusalem’s marker is plotted at its own secure identification coordinates — the
            site itself is one of the more securely located places in Samuel — and the ring around
            it marks only that this is now the capital, nothing more: no shading, fill, or extent
            geometry of any kind attaches to it. This map takes no position on how large or built-up
            tenth-century Jerusalem actually was; that dispute belongs to the claim layer below
            (claim-jebusite-stronghold-form), not to anything drawn here.
          </p>
          <p className="page-lede">
            The Valley of Rephaim, southwest of Jerusalem, is also plotted at full emphasis — where
            the Philistines twice engaged David after his anointing over all Israel (5:17–25). It
            sits outside the merged region’s shading, the same treatment Gibeon gets in the unshaded
            gap between M4’s two regions: contested ground, not a claimed side. This map does not
            assert that the capture of Jerusalem (5:6–16) happened before or after those engagements
            (5:17–25) — the chapter’s own arrangement may be topical rather than strictly
            chronological, and neither this map nor either scene’s closing card picks a side.
          </p>
        </>
      )}

      {isM5 && (
        <>
          <h2>The long war, and a house without a king</h2>
          <p className="page-lede">
            The narrative opens these chapters by reporting a long war between the house of Saul and
            the house of David, with David growing steadily stronger and the house of Saul steadily
            weaker (2 Samuel 3:1). This is a trend the text states, not a territory it redraws — no
            new border or region is added to the map for it. What the map does add is the outcome of
            that trend by 2 Samuel 4: Abner broke with Ish-bosheth and defected to David (3:6–21),
            Abner was killed at Hebron’s gate (3:22–27), and Ish-bosheth was assassinated in his own
            house with no heir positioned to rule — Jonathan’s son Mephibosheth (4:4) was lame in
            both feet and a child, not a throne claimant. By 4:12 the house of Saul’s kingship has
            ended.
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
            {isM6
              ? 'One soft region for the united kingdom, replacing the M4/M5 split.'
              : isM5
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
        ariaLabel={ariaLabel}
        capitalId={capitalId}
      />

      <p style={{ color: 'var(--muted)', fontSize: 12.5 }}>
        Marker size follows the coordinate confidence rating in <code>src/data/locations.ts</code>{' '}
        (larger = higher confidence). A dashed ring marks a location whose site identification is
        disputed.{' '}
        {isM6 ? (
          <>
            Jerusalem and the Valley of Rephaim — this milestone’s own scenes (jerusalem-stronghold,
            rephaim-valley) — are shown at full emphasis, with a solid ring marking Jerusalem as the
            capital; Hebron, Gibeon, Ziklag, and Mahanaim (M4/M5’s scenes), plus Gilboa, Beth-shan,
            Jabesh-gilead, and Gath, are shown for orientation only in this phase. The Valley of
            Rephaim sits outside the shaded region, the same unshaded-gap treatment M4 gives Gibeon.
          </>
        ) : isM5 ? (
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

      <h2>
        {isM6 ? 'One capital, secure; one extent, disputed' : 'Two rival capitals, one unlocatable'}
      </h2>
      <p className="page-lede">
        Hebron’s identification with Tell Rumeida is secure. Mahanaim’s is not: no site in the
        Jabbok valley commands scholarly consensus, so it is plotted here at its own low-confidence
        coordinates, with both published candidates disclosed rather than a single answer chosen for
        convenience.
      </p>
      {isM6 && (
        <p className="page-lede">
          Jerusalem’s identification with the southeastern ridge (the City of David) is itself
          secure — one of the more securely located places in Samuel, plotted at high-confidence
          coordinates. What is genuinely disputed is not the site but its extent: how large and how
          developed tenth-century Jerusalem was is a live archaeological question
          (claim-jebusite-stronghold-form, below), and this map’s capital ring takes no position on
          it — it marks a location and a political role, not a footprint.
        </p>
      )}
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
      {isM6 && (
        <>
          <p className="page-lede">
            The M6 phase merges the two prior regions and moves the capital marker; it draws no new
            border, outline, or extent geometry of any kind. It cross-references, rather than
            re-derives, the claims already built for the two M6 scenes below — the covenant and
            anointing that is the merge’s entire textual basis, the capture and naming that move the
            capital, and the terrain-form/extent-dispute claims that keep Jerusalem’s actual size
            off this map.
          </p>
          {m6Claims.map((c) => (
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
