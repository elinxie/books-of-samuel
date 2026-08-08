import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { AtlasPage } from './AtlasPage';
import { useAppStore } from '../state/store';

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

  it('defaults to the 2 Sam 2 (m4) phase, matching the overlay as it shipped', () => {
    renderAtlasPage();
    expect(screen.getByTestId('atlas-phase-m4')).toBeChecked();
    expect(screen.getByTestId('atlas-phase-m5')).not.toBeChecked();
    expect(screen.getByTestId('atlas-map')).toHaveAttribute('data-atlas-phase', 'm4');
    // M5-only claims are not cited until the M5 phase is selected.
    expect(
      document.querySelector('[data-claim-id="claim-divided-kingdom-collapse-overlay"]'),
    ).toBeNull();
  });

  it('switching to the 2 Sam 3–4 (m5) phase shows the collapse annotation and its claims, without deleting the m4 phase', () => {
    renderAtlasPage();
    fireEvent.click(screen.getByTestId('atlas-phase-m5'));

    expect(screen.getByTestId('atlas-phase-m5')).toBeChecked();
    expect(screen.getByTestId('atlas-map')).toHaveAttribute('data-atlas-phase', 'm5');
    expect(screen.getByTestId('region-annotation-israel-writ').textContent).toMatch(/no king/i);

    const m5ClaimIds = [
      'claim-long-war',
      'claim-abner-break',
      'claim-ish-bosheth-assassination',
      'claim-divided-kingdom-collapse-overlay',
    ];
    for (const id of m5ClaimIds) {
      expect(document.querySelector(`[data-claim-id="${id}"]`)).toBeTruthy();
    }
    // The original m4-phase claims stay cited too — additive, not a replacement.
    expect(
      document.querySelector('[data-claim-id="claim-divided-kingdom-atlas-overlay"]'),
    ).toBeTruthy();

    // Switching back restores the m4 phase exactly — nothing was deleted.
    fireEvent.click(screen.getByTestId('atlas-phase-m4'));
    expect(screen.getByTestId('atlas-map')).toHaveAttribute('data-atlas-phase', 'm4');
    expect(screen.queryByTestId('region-annotation-israel-writ')).not.toBeInTheDocument();
  });
});
