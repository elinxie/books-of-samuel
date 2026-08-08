import { Page } from '../ui/SiteChrome';
import { DividedKingdomMap } from '../ui/DividedKingdomMap';
import { LocationDisputeNote } from '../ui/LocationDisputeNote';
import { ClaimCard } from '../ui/ClaimCard';
import { ALLEGIANCE_REGIONS } from '../ui/atlasRegions';
import type { AtlasPhase } from '../ui/atlasRegions';
import { LOCATIONS, resolveClaims } from '../data';
import { useAppStore } from '../state/store';

const OVERLAY_CLAIM_IDS = [
  'claim-ish-bosheth-installed',
  'claim-judah-anointing',
  'claim-divided-kingdom-atlas-overlay',
  'claim-david-historical',
];

/** Cited only once the M5 ("2 Sam 3–4") phase is selected. */
const M5_OVERLAY_CLAIM_IDS = [
  'claim-long-war',
  'claim-abner-break',
  'claim-ish-bosheth-assassination',
  'claim-divided-kingdom-collapse-overlay',
];

const ATLAS_PHASES: [AtlasPhase, string, string][] = [
  ['m4', '2 Sam 2', 'The initial writ/Judah split (2:8–11), as this overlay first shipped.'],
  [
    'm5',
    '2 Sam 3–4',
    'The long war’s trend (3:1) and the north’s collapse — Abner’s defection and death, Ish-bosheth’s assassination.',
  ],
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
  const atlasPhase = useAppStore((s) => s.atlasPhase);
  const setAtlasPhase = useAppStore((s) => s.setAtlasPhase);
  const isM5 = atlasPhase === 'm5';
  const claims = resolveClaims(
    isM5 ? [...OVERLAY_CLAIM_IDS, ...M5_OVERLAY_CLAIM_IDS] : OVERLAY_CLAIM_IDS,
  );
  const disputedShown = LOCATIONS.filter((l) => l.approxCoordinates && l.identification.disputed);

  return (
    <Page>
      <h1>The divided kingdom — 2 Samuel 2:8–4:12</h1>
      <p className="page-lede">
        After Saul’s death, the narrative reports a political split: Abner installs Ish-bosheth as
        king “over Gilead and the Ashurites and Jezreel and Ephraim and Benjamin and all Israel” at
        Mahanaim, while “the house of Judah followed David” at Hebron (2 Samuel 2:8–10). This is a
        schematic study map, not a scene — drawing a precise border on the ground would be inventing
        certainty no Iron Age source can support. Allegiance is shown only as soft, unbordered
        shading clustered around the text’s own named places; you can turn that shading off below
        and look at the plotted places alone. A second phase, below, carries the same map forward
        through 2 Samuel 3–4, where that split starts to come apart.
      </p>

      <div className="radio-row" role="tablist" aria-label="Atlas phase" style={{ maxWidth: 520 }}>
        {ATLAS_PHASES.map(([phase, label, desc]) => (
          <label key={phase}>
            <input
              type="radio"
              name="atlasPhase"
              role="tab"
              aria-selected={atlasPhase === phase}
              checked={atlasPhase === phase}
              data-testid={`atlas-phase-${phase}`}
              onChange={() => setAtlasPhase(phase)}
            />
            <span>
              {label}
              <span className="radio-desc">{desc}</span>
            </span>
          </label>
        ))}
      </div>

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

      <DividedKingdomMap locations={LOCATIONS} showShading={showShading} phase={atlasPhase} />

      {isM5 ? (
        <p style={{ color: 'var(--muted)', fontSize: 12.5 }}>
          This phase carries the same two regions forward, unchanged in shape or extent.
          Ish-bosheth’s writ is shown faded and annotated “no king after 2 Sam 4:1–12”: by the end
          of this span Abner — the man who installed him — has defected to David and been killed (2
          Samuel 3:6–39), and Ish-bosheth himself has been assassinated by his own captains (2
          Samuel 4:1–12). The house of Judah’s region is left exactly as in the 2 Sam 2 phase; the
          text says David “grew stronger and stronger” (3:1) but never describes Judah’s own
          territory expanding, so nothing is added there that the text doesn’t support. Hebron and
          Mahanaim — this milestone’s own scenes and their referenced seat — are shown at full
          emphasis, the same set as the 2 Sam 2 phase.
        </p>
      ) : (
        <p style={{ color: 'var(--muted)', fontSize: 12.5 }}>
          Marker size follows the coordinate confidence rating in <code>src/data/locations.ts</code>{' '}
          (larger = higher confidence). A dashed ring marks a location whose site identification is
          disputed. Hebron, Gibeon, Ziklag, and Mahanaim — this milestone’s own scenes — are shown
          at full emphasis; nearby Milestone 3 sites (Gilboa, Beth-shan, Jabesh-gilead) and Gath are
          shown for orientation only. Gibeon sits in the unshaded gap between the two regions,
          reflecting its role as the contested meeting-ground between Abner’s and Joab’s men, not a
          claim about which side held it.
        </p>
      )}

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
        {isM5 ? (
          <>
            The long-war trend and the collapse of Ish-bosheth’s rule are stated plainly by the text
            at high confidence. What is schematic, and carries this page’s own lower confidence, is
            the map’s visual rendering of that trend: fading the same region rather than redrawing
            it, and the annotation text used to summarize it. This phase does not assert that any
            territory changed hands — the text describes a rule collapsing, not a border moving.
          </>
        ) : (
          <>
            The writ-list split itself is stated plainly by the text at high confidence. What is
            schematic, and carries this page’s own lower confidence, is the map’s visual rendering:
            region shapes, boundary softness, and the projection used to place points. The kingdom’s
            actual territorial scale on the ground is a separate, disputed historical question this
            overlay does not resolve.
          </>
        )}
      </p>
      {claims.map((c) => (
        <ClaimCard key={c.id} claim={c} />
      ))}

      <h2>Regions shown</h2>
      <ul>
        {ALLEGIANCE_REGIONS.map((r) => {
          const display = isM5 && r.m5 ? r.m5 : r;
          return (
            <li key={r.id}>
              <strong>{display.label}</strong> — {display.caption}
            </li>
          );
        })}
      </ul>
    </Page>
  );
}
