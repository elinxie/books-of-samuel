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
});
