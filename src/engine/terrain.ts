import * as THREE from 'three';
import { fbm } from './noise';

/**
 * Per-scene procedural terrain (ADR-005). A scene declares a TerrainSpec —
 * fbm hill layers, a short list of landform features, and a color ramp — and
 * `createTerrain` returns the sampler + geometry builder every consumer uses.
 * World scale: 1 unit = 1 meter. Height composition (fixed semantics):
 *
 *   height = sum(hills) * product(flatten multipliers) + sum(additive features)
 *
 * Features encode narrative geography (a tell, a wadi, a drainage trend) and
 * cost O(features) per sample — keep the list short; they are not detail noise.
 */

export interface HillsLayer {
  /** Noise frequency in 1/meters (world coordinates are multiplied by this). */
  frequency: number;
  /** Height contribution in meters at fbm's maximum (fbm returns 0..1). */
  amplitude: number;
  octaves: number;
  /** Noise-domain offset so scenes/layers don't correlate. */
  offset?: [number, number];
}

export type TerrainFeature =
  /** Radial gaussian rise — occupation mounds ("tells"), knolls. */
  | { kind: 'mound'; center: [number, number]; radius: number; height: number }
  /** Radial suppression of hill noise (strength 1 = dead flat at center). */
  | { kind: 'flatten'; center: [number, number]; radius: number; strength: number }
  /** Directional smoothstep fall: drops `drop` meters between projections start→end. */
  | { kind: 'ramp'; direction: [number, number]; start: number; end: number; drop: number }
  /** Elongated gaussian rise between two points — ridges, spurs, long hills. */
  | { kind: 'ridge'; start: [number, number]; end: [number, number]; width: number; height: number }
  /** Carved bed along a polyline — wadis, stream channels. `width` is bank to bank. */
  | { kind: 'channel'; path: [number, number][]; width: number; depth: number };

export interface ColorZone {
  center: [number, number];
  radius: number;
  color: string;
  /** Blend amount at the zone center, fading linearly to 0 at the radius. */
  strength: number;
}

export interface TerrainColors {
  /** Base soil color. */
  base: string;
  /** Vegetation tint blended in where the moisture mask exceeds its threshold. */
  scrub: string;
  /** Exposed-rock tint blended in on high ground. */
  rocky: string;
  moistureFrequency?: number;
  moistureOffset?: [number, number];
  moistureOctaves?: number;
  moistureThreshold?: number;
  moistureStrength?: number;
  /** Rocky tint ramps in between these two heights (meters). */
  rockyFromY?: number;
  rockyFullY?: number;
  rockyStrength?: number;
  zones?: ColorZone[];
}

export interface TerrainSpec {
  hills: HillsLayer[];
  features?: TerrainFeature[];
  colors: TerrainColors;
  /** Default geometry extent (meters) and resolution; overridable per build call. */
  size?: number;
  segments?: number;
}

export interface Terrain {
  readonly spec: TerrainSpec;
  heightAt(x: number, z: number): number;
  buildGeometry(size?: number, segments?: number): THREE.BufferGeometry;
}

function smoothstepRange(edge0: number, edge1: number, x: number): number {
  const t = Math.min(1, Math.max(0, (x - edge0) / (edge1 - edge0)));
  return t * t * (3 - 2 * t);
}

function smoothstep01(t: number): number {
  const c = Math.min(1, Math.max(0, t));
  return c * c * (3 - 2 * c);
}

function distanceToPolyline(x: number, z: number, path: [number, number][]): number {
  let best = Infinity;
  for (let i = 0; i < path.length - 1; i++) {
    const [ax, az] = path[i];
    const [bx, bz] = path[i + 1];
    const abx = bx - ax;
    const abz = bz - az;
    const apx = x - ax;
    const apz = z - az;
    const len2 = abx * abx + abz * abz;
    const t = len2 === 0 ? 0 : Math.min(1, Math.max(0, (apx * abx + apz * abz) / len2));
    const dx = apx - abx * t;
    const dz = apz - abz * t;
    const d2 = dx * dx + dz * dz;
    if (d2 < best) best = d2;
  }
  return Math.sqrt(best);
}

export function createTerrain(spec: TerrainSpec): Terrain {
  const features = spec.features ?? [];
  for (const f of features) {
    if (f.kind === 'ramp' && f.direction[0] === 0 && f.direction[1] === 0) {
      throw new Error('terrain ramp needs a nonzero direction');
    }
    if (f.kind === 'ridge') {
      const len = Math.hypot(f.end[0] - f.start[0], f.end[1] - f.start[1]);
      if (len === 0 || f.width <= 0) {
        throw new Error('terrain ridge needs distinct start/end points and a positive width');
      }
    }
    if (f.kind === 'channel' && (f.path.length < 2 || f.width <= 0)) {
      throw new Error('terrain channel needs a path of >= 2 points and a positive width');
    }
  }
  // Normalize ramp directions once so heightAt stays cheap.
  const ramps = features
    .filter((f) => f.kind === 'ramp')
    .map((f) => {
      const len = Math.hypot(f.direction[0], f.direction[1]);
      return { ...f, dirX: f.direction[0] / len, dirZ: f.direction[1] / len };
    });
  const flattens = features.filter((f) => f.kind === 'flatten');
  const mounds = features.filter((f) => f.kind === 'mound');
  const ridges = features.filter((f) => f.kind === 'ridge');
  const channels = features.filter((f) => f.kind === 'channel');

  function heightAt(x: number, z: number): number {
    let hills = 0;
    for (const layer of spec.hills) {
      const [ox, oz] = layer.offset ?? [0, 0];
      hills +=
        fbm(x * layer.frequency + ox, z * layer.frequency + oz, layer.octaves) * layer.amplitude;
    }
    let flattenMul = 1;
    for (const f of flattens) {
      const dx = x - f.center[0];
      const dz = z - f.center[1];
      const d2 = dx * dx + dz * dz;
      flattenMul *= 1 - f.strength * Math.exp(-d2 / (2 * f.radius * f.radius));
    }
    let h = hills * flattenMul;
    for (const f of mounds) {
      const dx = x - f.center[0];
      const dz = z - f.center[1];
      const d2 = dx * dx + dz * dz;
      h += f.height * Math.exp(-d2 / (2 * f.radius * f.radius));
    }
    for (const f of ramps) {
      h += -f.drop * smoothstepRange(f.start, f.end, x * f.dirX + z * f.dirZ);
    }
    for (const f of ridges) {
      const d = distanceToPolyline(x, z, [f.start, f.end]);
      h += f.height * Math.exp(-(d * d) / (2 * f.width * f.width));
    }
    for (const f of channels) {
      const d = distanceToPolyline(x, z, f.path);
      h -= f.depth * (1 - smoothstep01(d / (f.width / 2)));
    }
    return h;
  }

  function buildGeometry(
    size = spec.size ?? 1400,
    segments = spec.segments ?? 176,
  ): THREE.BufferGeometry {
    const geo = new THREE.PlaneGeometry(size, size, segments, segments);
    geo.rotateX(-Math.PI / 2);
    const pos = geo.attributes.position as THREE.BufferAttribute;
    const colors = new Float32Array(pos.count * 3);

    const c = spec.colors;
    const base = new THREE.Color(c.base);
    const scrub = new THREE.Color(c.scrub);
    const rocky = new THREE.Color(c.rocky);
    const zones = (c.zones ?? []).map((z) => ({ ...z, three: new THREE.Color(z.color) }));
    const moistureFreq = c.moistureFrequency ?? 0.012;
    const [mox, moz] = c.moistureOffset ?? [0, 0];
    const moistureOct = c.moistureOctaves ?? 3;
    const moistureThreshold = c.moistureThreshold ?? 0.42;
    const moistureStrength = c.moistureStrength ?? 0.9;
    const rockyFromY = c.rockyFromY ?? 8;
    const rockyFullY = c.rockyFullY ?? 22;
    const rockyStrength = c.rockyStrength ?? 0.5;
    const tmp = new THREE.Color();

    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const z = pos.getZ(i);
      const y = heightAt(x, z);
      pos.setY(i, y);

      const moisture = fbm(x * moistureFreq + mox, z * moistureFreq + moz, moistureOct);
      tmp.copy(base).lerp(scrub, Math.max(0, moisture - moistureThreshold) * moistureStrength);
      const highness = Math.min(1, Math.max(0, (y - rockyFromY) / (rockyFullY - rockyFromY)));
      tmp.lerp(rocky, highness * rockyStrength);
      for (const zone of zones) {
        const dx = x - zone.center[0];
        const dz = z - zone.center[1];
        const d = Math.sqrt(dx * dx + dz * dz);
        if (d < zone.radius) tmp.lerp(zone.three, zone.strength * (1 - d / zone.radius));
      }
      colors[i * 3] = tmp.r;
      colors[i * 3 + 1] = tmp.g;
      colors[i * 3 + 2] = tmp.b;
    }

    geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    geo.computeVertexNormals();
    return geo;
  }

  return { spec, heightAt, buildGeometry };
}
