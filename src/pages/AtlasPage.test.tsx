import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { AtlasPage } from './AtlasPage';
import { useAppStore } from '../state/store';
import { ALLEGIANCE_REGIONS_M5, ALLEGIANCE_REGIONS_M6 } from '../ui/atlasRegions';
import { LOCATIONS_BY_ID } from '../data/locations';

const initial = useAppStore.getState();

beforeEach(() => {
  useAppStore.setState(initial, true);
});

afterEach(() => {
  cleanup();
});

function renderAtlasPage() {
  return render(
    <MemoryRouter>
      <AtlasPage />
    </MemoryRouter>,
  );
}

describe('AtlasPage (divided-kingdom atlas overlay, M4 4th goal)', () => {
  it('renders the schematic map', () => {
    renderAtlasPage();
    expect(screen.getByTestId('atlas-map')).toBeInTheDocument();
    expect(screen.getByTestId('atlas-point-hebron')).toBeInTheDocument();
    expect(screen.getByTestId('atlas-point-mahanaim')).toBeInTheDocument();
  });

  it('the allegiance-shading toggle dismisses/restores the soft regions (ADR-011 "can ignore it" test)', () => {
    renderAtlasPage();
    const toggle = screen.getByTestId('atlas-toggle-shading');
    expect(toggle).toHaveAttribute('aria-pressed', 'true');
    expect(screen.getByTestId('region-shading-judah')).toBeInTheDocument();

    fireEvent.click(toggle);
    expect(toggle).toHaveAttribute('aria-pressed', 'false');
    expect(screen.queryByTestId('region-shading-judah')).not.toBeInTheDocument();
    // The points themselves stay visible — dismissing shading doesn't hide the atlas.
    expect(screen.getByTestId('atlas-point-hebron')).toBeInTheDocument();

    fireEvent.click(toggle);
    expect(toggle).toHaveAttribute('aria-pressed', 'true');
    expect(screen.getByTestId('region-shading-judah')).toBeInTheDocument();
  });

  it('surfaces Mahanaim’s disputed identification in the UI, not just in the data model', () => {
    renderAtlasPage();
    const note = screen.getByTestId('location-dispute-mahanaim');
    expect(note).toBeInTheDocument();
    expect(note.textContent).toMatch(/Disputed identification/i);
    // Both published candidate sites are named, not a single silently-chosen answer.
    expect(note.textContent).toContain('Tulul adh-Dhahab al-Gharbi');
    expect(note.textContent).toContain('Tell Hajjaj');
  });

  it('cites the cross-referenced claims (writ split, Judah anointing, schematic disclosure, kingdom-scale dispute)', () => {
    renderAtlasPage();
    const claimIds = [
      'claim-ish-bosheth-installed',
      'claim-judah-anointing',
      'claim-divided-kingdom-atlas-overlay',
      'claim-david-historical',
    ];
    for (const id of claimIds) {
      expect(document.querySelector(`[data-claim-id="${id}"]`)).toBeTruthy();
    }
  });

  it('defaults to the M4 phase, with the M5 and M6 phase tabs present but inactive', () => {
    renderAtlasPage();
    expect(screen.getByTestId('atlas-phase-m4')).toHaveAttribute('aria-selected', 'true');
    expect(screen.getByTestId('atlas-phase-m5')).toHaveAttribute('aria-selected', 'false');
    expect(screen.getByTestId('atlas-phase-m6')).toHaveAttribute('aria-selected', 'false');
    // M5-only content (long-war trend section, M5 claim cards) is not shown by default.
    expect(screen.queryByText(/house without a king/i)).not.toBeInTheDocument();
    expect(document.querySelector('[data-claim-id="claim-atlas-m5-phase"]')).toBeFalsy();
    // M6-only content (united-kingdom section, capital marker, M6 claim cards) is not shown either.
    expect(screen.queryByText(/one king, one capital/i)).not.toBeInTheDocument();
    expect(screen.queryByTestId('atlas-capital-marker')).not.toBeInTheDocument();
    expect(document.querySelector('[data-claim-id="claim-atlas-m6-phase"]')).toBeFalsy();
  });
});

describe('AtlasPage M5 phase (2 Samuel 3–4 long war + northern collapse)', () => {
  it('switches into the M5 phase and shows the long-war trend section', () => {
    renderAtlasPage();
    fireEvent.click(screen.getByTestId('atlas-phase-m5'));
    expect(screen.getByTestId('atlas-phase-m5')).toHaveAttribute('aria-selected', 'true');
    expect(screen.getByTestId('atlas-phase-m4')).toHaveAttribute('aria-selected', 'false');
    expect(screen.getByText(/house without a king/i)).toBeInTheDocument();
    // The trend statement itself (2 Samuel 3:1) is captioned, not staged as new geometry.
    expect(screen.getAllByText(/steadily stronger/i).length).toBeGreaterThan(0);
  });

  it('renders the Israel-writ region as headless/"no king", never removed or reassigned', () => {
    renderAtlasPage();
    fireEvent.click(screen.getByTestId('atlas-phase-m5'));
    expect(screen.getByTestId('region-shading-israel-writ')).toBeInTheDocument();
    expect(screen.getByTestId('region-headless-note-israel-writ')).toHaveTextContent(/no king/i);
    // Judah's region is still shown, unchanged, alongside it — no merge, no removal.
    expect(screen.getByTestId('region-shading-judah')).toBeInTheDocument();
    // Structural guard against a 4th, "unified"/merged region ever being introduced:
    // exactly the same two regions as M4, never collapsed into one.
    expect(ALLEGIANCE_REGIONS_M5.map((r) => r.id).sort()).toEqual(['israel-writ', 'judah']);
  });

  it('discloses that the all-Israel unification question (2 Samuel 5) is out of scope for this map', () => {
    renderAtlasPage();
    fireEvent.click(screen.getByTestId('atlas-phase-m5'));
    const pageText = document.body.textContent ?? '';
    expect(pageText).toMatch(/2 Samuel 5/);
    expect(pageText).toMatch(/out of scope/i);
    // No stroke/outline is added to the headless region's ellipse — the M4 no-border
    // discipline (no polygon boundary anywhere on the map) carries over unchanged.
    const headlessEllipse = document
      .querySelector('[data-testid="region-shading-israel-writ"]')
      ?.querySelector('ellipse');
    expect(headlessEllipse).toBeTruthy();
    expect(headlessEllipse?.getAttribute('stroke')).toBe('none');
  });

  it('cites the cross-referenced M5 claims (long war, Abner’s break and killing, public response, assassination, atlas M5 phase)', () => {
    renderAtlasPage();
    fireEvent.click(screen.getByTestId('atlas-phase-m5'));
    const claimIds = [
      'claim-long-war',
      'claim-abner-break',
      'claim-abner-killing',
      'claim-public-response',
      'claim-ish-bosheth-assassination',
      'claim-atlas-m5-phase',
    ];
    for (const id of claimIds) {
      expect(document.querySelector(`[data-claim-id="${id}"]`)).toBeTruthy();
    }
  });

  it('still emphasizes Hebron and surfaces Mahanaim’s disputed identification in the M5 phase', () => {
    renderAtlasPage();
    fireEvent.click(screen.getByTestId('atlas-phase-m5'));
    expect(screen.getByTestId('atlas-point-hebron')).toBeInTheDocument();
    expect(screen.getByTestId('location-dispute-mahanaim')).toBeInTheDocument();
  });
});

describe('AtlasPage M6 phase (2 Samuel 5, the united kingdom)', () => {
  it('switches into the M6 phase and shows the merge/capital-move section', () => {
    renderAtlasPage();
    fireEvent.click(screen.getByTestId('atlas-phase-m6'));
    expect(screen.getByTestId('atlas-phase-m6')).toHaveAttribute('aria-selected', 'true');
    expect(screen.getByTestId('atlas-phase-m4')).toHaveAttribute('aria-selected', 'false');
    expect(screen.getByTestId('atlas-phase-m5')).toHaveAttribute('aria-selected', 'false');
    expect(screen.getByText(/one king, one capital/i)).toBeInTheDocument();
  });

  it('merges the two prior regions into exactly one soft-shaded region, never a border', () => {
    renderAtlasPage();
    fireEvent.click(screen.getByTestId('atlas-phase-m6'));
    // Structural guard: exactly one region at M6, replacing the two-region M4/M5 split.
    expect(ALLEGIANCE_REGIONS_M6.map((r) => r.id)).toEqual(['united-kingdom']);
    expect(screen.getByTestId('region-shading-united-kingdom')).toBeInTheDocument();
    expect(screen.queryByTestId('region-shading-israel-writ')).not.toBeInTheDocument();
    expect(screen.queryByTestId('region-shading-judah')).not.toBeInTheDocument();
    // No stroke/outline on the merged region's ellipse — the M4 no-border discipline holds.
    const ellipse = document
      .querySelector('[data-testid="region-shading-united-kingdom"]')
      ?.querySelector('ellipse');
    expect(ellipse).toBeTruthy();
    expect(ellipse?.getAttribute('stroke')).toBe('none');
  });

  it('captions the merge as a change of allegiance, not a territorial extent', () => {
    renderAtlasPage();
    fireEvent.click(screen.getByTestId('atlas-phase-m6'));
    const pageText = document.body.textContent ?? '';
    expect(pageText).toMatch(/change of allegiance/i);
    expect(pageText).toMatch(/not a territorial extent/i);
    expect(pageText).not.toMatch(/kingdom's? border/i);
  });

  it('moves the capital marker from Hebron to Jerusalem, plotted at its own secure coordinates', () => {
    renderAtlasPage();
    fireEvent.click(screen.getByTestId('atlas-phase-m6'));
    const marker = screen.getByTestId('atlas-capital-marker');
    expect(marker).toBeInTheDocument();
    // The ring sits inside Jerusalem's own <g>, not Hebron's — same location the point uses.
    const jerusalemGroup = screen.getByTestId('atlas-point-jerusalem');
    expect(jerusalemGroup.contains(marker)).toBe(true);
    expect(jerusalemGroup.textContent).toMatch(/capital/i);
    // No fill on the ring — a marker, not extent geometry.
    expect(marker.getAttribute('fill')).toBe('none');
    // Jerusalem's own secure coordinates are used — no separate extent geometry invented.
    const jerusalem = LOCATIONS_BY_ID.get('jerusalem');
    expect(jerusalem?.approxCoordinates?.confidence).toBe('high');
  });

  it('cites the cross-referenced M6 claims (covenant, capture, naming, terrain form, extent dispute, atlas M6 phase)', () => {
    renderAtlasPage();
    fireEvent.click(screen.getByTestId('atlas-phase-m6'));
    const claimIds = [
      'claim-all-israel-covenant',
      'claim-jerusalem-capture',
      'claim-city-of-david-naming',
      'claim-jerusalem-terrain-form',
      'claim-jebusite-stronghold-form',
      'claim-atlas-m6-phase',
    ];
    for (const id of claimIds) {
      expect(document.querySelector(`[data-claim-id="${id}"]`)).toBeTruthy();
    }
  });

  it('discloses that neither the capture nor the Rephaim engagements are asserted to come first', () => {
    renderAtlasPage();
    fireEvent.click(screen.getByTestId('atlas-phase-m6'));
    const pageText = document.body.textContent ?? '';
    expect(pageText).toMatch(/does not assert/i);
    expect(pageText).toMatch(/topical/i);
  });

  it('shows Jerusalem and the Valley of Rephaim at full emphasis, plus Hebron and Mahanaim for orientation', () => {
    renderAtlasPage();
    fireEvent.click(screen.getByTestId('atlas-phase-m6'));
    expect(screen.getByTestId('atlas-point-jerusalem')).toHaveClass('atlas-point-emphasized');
    expect(screen.getByTestId('atlas-point-valley-of-rephaim')).toHaveClass(
      'atlas-point-emphasized',
    );
    expect(screen.getByTestId('atlas-point-hebron')).not.toHaveClass('atlas-point-emphasized');
    expect(screen.getByTestId('location-dispute-mahanaim')).toBeInTheDocument();
  });

  it('switching back to M4 restores the two-region split cleanly, with no capital ring', () => {
    renderAtlasPage();
    fireEvent.click(screen.getByTestId('atlas-phase-m6'));
    expect(screen.getByTestId('region-shading-united-kingdom')).toBeInTheDocument();

    fireEvent.click(screen.getByTestId('atlas-phase-m4'));
    expect(screen.getByTestId('atlas-phase-m4')).toHaveAttribute('aria-selected', 'true');
    expect(screen.getByTestId('region-shading-israel-writ')).toBeInTheDocument();
    expect(screen.getByTestId('region-shading-judah')).toBeInTheDocument();
    expect(screen.queryByTestId('region-shading-united-kingdom')).not.toBeInTheDocument();
    expect(screen.queryByTestId('atlas-capital-marker')).not.toBeInTheDocument();
  });
});
