import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { AtlasPage } from './AtlasPage';
import { useAppStore } from '../state/store';
import { ALLEGIANCE_REGIONS_M5 } from '../ui/atlasRegions';

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

  it('defaults to the M4 phase, with the M5 phase tab present but inactive', () => {
    renderAtlasPage();
    expect(screen.getByTestId('atlas-phase-m4')).toHaveAttribute('aria-selected', 'true');
    expect(screen.getByTestId('atlas-phase-m5')).toHaveAttribute('aria-selected', 'false');
    // M5-only content (long-war trend section, M5 claim cards) is not shown by default.
    expect(screen.queryByText(/house without a king/i)).not.toBeInTheDocument();
    expect(document.querySelector('[data-claim-id="claim-atlas-m5-phase"]')).toBeFalsy();
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
