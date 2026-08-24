import { useMemo } from 'react';
import type { Confidence, LocationEntry } from '../data/types';
import type { AllegianceRegionConfig } from './atlasRegions';
import { ALLEGIANCE_REGIONS, M4_LOCATION_IDS, MAP_LAT_RANGE, MAP_LON_RANGE } from './atlasRegions';

const WIDTH = 640;
const HEIGHT = 560;
const PAD = 46;

const MARKER_RADIUS: Record<Confidence, number> = {
  high: 7,
  moderate: 6,
  low: 5,
  speculative: 4,
};

interface RegionGeometry {
  region: AllegianceRegionConfig;
  cx: number;
  cy: number;
  rx: number;
  ry: number;
}

function project(lat: number, lon: number): [number, number] {
  const [latMin, latMax] = MAP_LAT_RANGE;
  const [lonMin, lonMax] = MAP_LON_RANGE;
  const x = PAD + ((lon - lonMin) / (lonMax - lonMin)) * (WIDTH - 2 * PAD);
  const y = PAD + ((latMax - lat) / (latMax - latMin)) * (HEIGHT - 2 * PAD);
  return [x, y];
}

/**
 * Divided-kingdom atlas overlay (2 Samuel 2:8–11, claim-divided-kingdom-atlas-overlay).
 * A plain, honest schematic — no external basemap/tileset, no modern borders,
 * no hard-edged territory polygons. Allegiance is shown only as soft, blurred,
 * unbordered shading clustered around the text's own named locations,
 * following the queue #18 Fable resolution's binding design constraint.
 */
export function DividedKingdomMap({
  locations,
  showShading,
  regions = ALLEGIANCE_REGIONS,
  emphasizedIds = M4_LOCATION_IDS,
  ariaLabel = "Schematic map of the divided kingdom after Saul's death, 2 Samuel 2",
  capitalId,
}: {
  locations: LocationEntry[];
  showShading: boolean;
  /** Region set to render — defaults to the M4 (2 Sam 2:8–11) split. */
  regions?: AllegianceRegionConfig[];
  /** Location ids shown at full emphasis — defaults to the M4 built-scene set. */
  emphasizedIds?: string[];
  /** Overrides the SVG's accessible name — defaults to the M4 phase's label. */
  ariaLabel?: string;
  /**
   * Location id marked as the current capital (M6 only — the capital moves
   * from Hebron to Jerusalem, claim-atlas-m6-phase). Rendered as a ring
   * around that point's marker and a "(capital)" suffix on its label — no
   * extent geometry, no shading of its own. Left `undefined` for the M4/M5
   * phases (two rival, un-ringed capitals; see the page's own prose), which
   * keeps their rendering pixel-unchanged.
   */
  capitalId?: string;
}) {
  const byId = useMemo(() => new Map(locations.map((l) => [l.id, l])), [locations]);

  const regionGeometry = useMemo<RegionGeometry[]>(() => {
    const geometries: RegionGeometry[] = [];
    for (const region of regions) {
      const points = region.locationIds
        .map((id) => byId.get(id))
        .filter((l): l is LocationEntry => Boolean(l?.approxCoordinates))
        .map((l) => project(l.approxCoordinates!.lat, l.approxCoordinates!.lon));
      if (points.length === 0) continue;
      const cx = points.reduce((sum, [x]) => sum + x, 0) / points.length;
      const cy = points.reduce((sum, [, y]) => sum + y, 0) / points.length;
      const spread = Math.max(70, ...points.map(([x, y]) => Math.hypot(x - cx, y - cy) + 60));
      geometries.push({ region, cx, cy, rx: spread, ry: spread * 0.78 });
    }
    return geometries;
  }, [byId, regions]);

  return (
    <svg
      className="atlas-map"
      data-testid="atlas-map"
      viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
      role="img"
      aria-label={ariaLabel}
    >
      <defs>
        <filter id="atlas-soft-blur" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="26" />
        </filter>
        {regions.map((region) => (
          <radialGradient key={region.id} id={`atlas-gradient-${region.id}`}>
            <stop
              offset="0%"
              stopColor={`var(${region.colorVar})`}
              stopOpacity={region.headless ? '0.22' : '0.4'}
            />
            <stop offset="100%" stopColor={`var(${region.colorVar})`} stopOpacity="0" />
          </radialGradient>
        ))}
      </defs>

      <rect x={0} y={0} width={WIDTH} height={HEIGHT} className="atlas-map-bg" />

      {showShading &&
        regionGeometry.map(({ region, cx, cy, rx, ry }) => (
          <g
            key={region.id}
            data-testid={`region-shading-${region.id}`}
            className={region.headless ? 'atlas-region atlas-region-headless' : 'atlas-region'}
          >
            {/*
              No stroke/outline on either variant — the M4 no-hard-edge, no-border
              discipline carries over unchanged. The headless variant is fainter
              only (see the gradient's lower stop-opacity above) plus the caption
              text below; drawing any edge around it would read as a boundary this
              overlay does not have textual grounds to assert.
            */}
            <ellipse
              cx={cx}
              cy={cy}
              rx={rx}
              ry={ry}
              fill={`url(#atlas-gradient-${region.id})`}
              stroke="none"
              filter="url(#atlas-soft-blur)"
            />
            <text x={cx} y={cy - ry * 0.55} textAnchor="middle" className="atlas-region-label">
              {region.label}
            </text>
            {region.headless && (
              <text
                x={cx}
                y={cy - ry * 0.55 + 15}
                textAnchor="middle"
                className="atlas-region-label-sub"
                data-testid={`region-headless-note-${region.id}`}
              >
                no king (2 Samuel 4:1–12)
              </text>
            )}
          </g>
        ))}

      {locations
        .filter((l) => l.approxCoordinates)
        .map((loc) => {
          const { lat, lon, confidence } = loc.approxCoordinates!;
          const [x, y] = project(lat, lon);
          const emphasized = emphasizedIds.includes(loc.id);
          const isCapital = capitalId === loc.id;
          const r = MARKER_RADIUS[confidence];
          return (
            <g
              key={loc.id}
              className={emphasized ? 'atlas-point atlas-point-emphasized' : 'atlas-point'}
              data-testid={`atlas-point-${loc.id}`}
            >
              {isCapital && (
                /*
                  The capital marker (M6 only): a ring around the point and
                  nothing else — no fill, no extent geometry — per the
                  brief's guard that Jerusalem's marker uses only its secure
                  identification coordinates, never an asserted territory.
                */
                <circle
                  cx={x}
                  cy={y}
                  r={r + 5}
                  className="atlas-capital-ring"
                  data-testid="atlas-capital-marker"
                  fill="none"
                />
              )}
              <circle
                cx={x}
                cy={y}
                r={r}
                className={`atlas-point-dot conf-${confidence}`}
                stroke={loc.identification.disputed ? 'var(--basis-design-placeholder)' : 'none'}
                strokeDasharray={loc.identification.disputed ? '3 2' : undefined}
                strokeWidth={loc.identification.disputed ? 1.5 : 0}
              />
              <text
                x={x}
                y={y - r - 6}
                textAnchor="middle"
                className={
                  isCapital ? 'atlas-point-label atlas-point-label-capital' : 'atlas-point-label'
                }
              >
                {loc.name}
                {loc.identification.disputed ? ' *' : ''}
                {isCapital ? ' (capital)' : ''}
              </text>
            </g>
          );
        })}
    </svg>
  );
}
