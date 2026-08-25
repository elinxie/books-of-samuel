import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import { DividedKingdomMap } from './DividedKingdomMap';
import { LOCATIONS } from '../data/locations';

afterEach(() => {
  cleanup();
});

describe('DividedKingdomMap (divided-kingdom atlas overlay, 2 Sam 2:8-11)', () => {
  it('renders every location that has approximate coordinates', () => {
    render(<DividedKingdomMap locations={LOCATIONS} showShading />);
    const withCoords = LOCATIONS.filter((l) => l.approxCoordinates);
    for (const loc of withCoords) {
      expect(screen.getByTestId(`atlas-point-${loc.id}`)).toBeInTheDocument();
    }
    // Sanity: the two must-have points from the queue #18 resolution are present.
    expect(screen.getByTestId('atlas-point-hebron')).toBeInTheDocument();
    expect(screen.getByTestId('atlas-point-mahanaim')).toBeInTheDocument();
  });

  it('renders soft, unbordered shading — never a hard-edged bordered polygon — when shading is on', () => {
    const { container } = render(<DividedKingdomMap locations={LOCATIONS} showShading />);

    expect(screen.getByTestId('region-shading-israel-writ')).toBeInTheDocument();
    expect(screen.getByTestId('region-shading-judah')).toBeInTheDocument();

    // No polygon/hard-boundary path elements at all — regions are ellipses only.
    expect(container.querySelectorAll('polygon').length).toBe(0);

    const regionShapes = container.querySelectorAll('[data-testid^="region-shading-"] ellipse');
    expect(regionShapes.length).toBeGreaterThan(0);
    for (const shape of Array.from(regionShapes)) {
      // Soft shading, not a bordered territory: no stroke, and a blur filter applied.
      expect(shape.getAttribute('stroke')).toBe('none');
      expect(shape.getAttribute('filter')).toContain('atlas-soft-blur');
    }
  });

  it('hides the shading regions but keeps the points when showShading is false', () => {
    render(<DividedKingdomMap locations={LOCATIONS} showShading={false} />);
    expect(screen.queryByTestId('region-shading-israel-writ')).not.toBeInTheDocument();
    expect(screen.queryByTestId('region-shading-judah')).not.toBeInTheDocument();
    expect(screen.getByTestId('atlas-point-hebron')).toBeInTheDocument();
    expect(screen.getByTestId('atlas-point-mahanaim')).toBeInTheDocument();
  });

  it('marks disputed-identification locations (e.g. Mahanaim) with a dashed ring, not a solid stroke', () => {
    const { container } = render(<DividedKingdomMap locations={LOCATIONS} showShading />);
    const mahanaimDot = container.querySelector(
      '[data-testid="atlas-point-mahanaim"] .atlas-point-dot',
    );
    expect(mahanaimDot).not.toBeNull();
    expect(mahanaimDot?.getAttribute('stroke-dasharray')).toBe('3 2');

    const hebronDot = container.querySelector(
      '[data-testid="atlas-point-hebron"] .atlas-point-dot',
    );
    expect(hebronDot?.getAttribute('stroke')).toBe('none');
  });

  it('renders no capital marker when capitalId is left unset (the M4/M5 default)', () => {
    render(<DividedKingdomMap locations={LOCATIONS} showShading />);
    expect(screen.queryByTestId('atlas-capital-marker')).not.toBeInTheDocument();
  });

  it('renders a fill-less ring around the given capitalId, and only that location', () => {
    const { container } = render(
      <DividedKingdomMap locations={LOCATIONS} showShading capitalId="jerusalem" />,
    );
    const marker = screen.getByTestId('atlas-capital-marker');
    expect(container.querySelector('[data-testid="atlas-point-jerusalem"]')?.contains(marker)).toBe(
      true,
    );
    expect(marker.getAttribute('fill')).toBe('none');
    // No second ring anywhere else on the map.
    expect(container.querySelectorAll('[data-testid="atlas-capital-marker"]').length).toBe(1);
    // The point's own label discloses the capital role in text, too.
    expect(
      container.querySelector('[data-testid="atlas-point-jerusalem"] .atlas-point-label')
        ?.textContent,
    ).toMatch(/\(capital\)/);
  });
});
