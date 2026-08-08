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

  it('defaults to the m4 phase when no phase prop is given', () => {
    render(<DividedKingdomMap locations={LOCATIONS} showShading />);
    expect(screen.getByTestId('atlas-map')).toHaveAttribute('data-atlas-phase', 'm4');
    expect(screen.queryByTestId('region-annotation-israel-writ')).not.toBeInTheDocument();
  });
});

describe('DividedKingdomMap — M5 phase (2 Sam 3-4, long-war trend + collapse)', () => {
  it('still renders both regions and never adds a hard-edged polygon border', () => {
    const { container } = render(
      <DividedKingdomMap locations={LOCATIONS} showShading phase="m5" />,
    );
    expect(screen.getByTestId('atlas-map')).toHaveAttribute('data-atlas-phase', 'm5');
    expect(screen.getByTestId('region-shading-israel-writ')).toBeInTheDocument();
    expect(screen.getByTestId('region-shading-judah')).toBeInTheDocument();
    expect(container.querySelectorAll('polygon').length).toBe(0);

    const regionShapes = container.querySelectorAll('[data-testid^="region-shading-"] ellipse');
    for (const shape of Array.from(regionShapes)) {
      expect(shape.getAttribute('stroke')).toBe('none');
      expect(shape.getAttribute('filter')).toContain('atlas-soft-blur');
    }
  });

  it('fades Ish-bosheth’s writ and annotates its collapse, while leaving Judah unchanged', () => {
    const { container } = render(
      <DividedKingdomMap locations={LOCATIONS} showShading phase="m5" />,
    );

    const israelGroup = screen.getByTestId('region-shading-israel-writ');
    expect(Number(israelGroup.getAttribute('opacity'))).toBeLessThan(1);
    expect(screen.getByTestId('region-annotation-israel-writ').textContent).toMatch(/no king/i);

    const judahGroup = screen.getByTestId('region-shading-judah');
    expect(judahGroup.getAttribute('opacity')).toBe('1');
    expect(container.querySelector('[data-testid="region-annotation-judah"]')).toBeNull();
  });

  it('keeps Hebron and Mahanaim emphasized (this milestone’s own scenes and their referenced seat)', () => {
    render(<DividedKingdomMap locations={LOCATIONS} showShading phase="m5" />);
    expect(screen.getByTestId('atlas-point-hebron')).toHaveClass('atlas-point-emphasized');
    expect(screen.getByTestId('atlas-point-mahanaim')).toHaveClass('atlas-point-emphasized');
  });
});
