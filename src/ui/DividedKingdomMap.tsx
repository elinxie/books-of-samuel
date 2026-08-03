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
}: {
  locations: LocationEntry[];
  showShading: boolean;
}) {
  const byId = useMemo(() => new Map(locations.map((l) => [l.id, l])), [locations]);

  const regionGeometry = useMemo<RegionGeometry[]>(() => {
    const geometries: RegionGeometry[] = [];
    for (const region of ALLEGIANCE_REGIONS) {
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
  }, [byId]);

  return (
    <svg
      className="atlas-map"
      data-testid="atlas-map"
      viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
      role="img"
      aria-label="Schematic map of the divided kingdom after Saul's death, 2 Samuel 2"
    >
      <defs>
        <filter id="atlas-soft-blur" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="26" />
        </filter>
        {ALLEGIANCE_REGIONS.map((region) => (
          <radialGradient key={region.id} id={`atlas-gradient-${region.id}`}>
            <stop offset="0%" stopColor={`var(${region.colorVar})`} stopOpacity="0.4" />
            <stop offset="100%" stopColor={`var(${region.colorVar})`} stopOpacity="0" />
          </radialGradient>
        ))}
      </defs>

      <rect x={0} y={0} width={WIDTH} height={HEIGHT} className="atlas-map-bg" />

      {showShading &&
        regionGeometry.map(({ region, cx, cy, rx, ry }) => (
          <g key={region.id} data-testid={`region-shading-${region.id}`}>
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
          </g>
        ))}

      {locations
        .filter((l) => l.approxCoordinates)
        .map((loc) => {
          const { lat, lon, confidence } = loc.approxCoordinates!;
          const [x, y] = project(lat, lon);
          const emphasized = M4_LOCATION_IDS.includes(loc.id);
          const r = MARKER_RADIUS[confidence];
          return (
            <g
              key={loc.id}
              className={emphasized ? 'atlas-point atlas-point-emphasized' : 'atlas-point'}
              data-testid={`atlas-point-${loc.id}`}
            >
              <circle
                cx={x}
                cy={y}
                r={r}
                className={`atlas-point-dot conf-${confidence}`}
                stroke={loc.identification.disputed ? 'var(--basis-design-placeholder)' : 'none'}
                strokeDasharray={loc.identification.disputed ? '3 2' : undefined}
                strokeWidth={loc.identification.disputed ? 1.5 : 0}
              />
              <text x={x} y={y - r - 6} textAnchor="middle" className="atlas-point-label">
                {loc.name}
                {loc.identification.disputed ? ' *' : ''}
              </text>
            </g>
          );
        })}
    </svg>
  );
}
