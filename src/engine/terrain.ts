import * as THREE from 'three';
import { fbm } from './noise';

/**
 * Procedural stand-in terrain for the Ziklag frontier: gentle semi-arid hills,
 * a low tell under the settlement, and a fall-away toward the south where the
 * land drains toward the Besor system. PLACEHOLDER — see asset-terrain-negev.
 * World scale: 1 unit = 1 meter. Settlement center at (0, 0).
 */

const TELL_RADIUS = 60;
const FLATTEN_RADIUS = 78;

export function terrainHeight(x: number, z: number): number {
  const hills = fbm(x * 0.006 + 11.3, z * 0.006 - 7.1, 4) * 16 + fbm(x * 0.025, z * 0.025, 3) * 2.5;
  const d2 = x * x + z * z;
  // Flatten the noise under the settlement so ruins sit believably.
  const flatten = Math.exp(-d2 / (2 * FLATTEN_RADIUS * FLATTEN_RADIUS));
  // Low occupation mound ("tell") — small towns often sat on modest rises.
  const tell = 6.5 * Math.exp(-d2 / (2 * TELL_RADIUS * TELL_RADIUS));
  // Gentle southward fall toward the Besor drainage.
  const southFall = -4.5 * smoothstep(60, 520, z);
  return hills * (1 - 0.82 * flatten) + tell + southFall;
}

function smoothstep(edge0: number, edge1: number, x: number): number {
  const t = Math.min(1, Math.max(0, (x - edge0) / (edge1 - edge0)));
  return t * t * (3 - 2 * t);
}

export function buildTerrainGeometry(size = 1400, segments = 176): THREE.BufferGeometry {
  const geo = new THREE.PlaneGeometry(size, size, segments, segments);
  geo.rotateX(-Math.PI / 2);
  const pos = geo.attributes.position as THREE.BufferAttribute;
  const colors = new Float32Array(pos.count * 3);

  const loess = new THREE.Color('#c2a36b');
  const scrubTint = new THREE.Color('#8a8a55');
  const rocky = new THREE.Color('#a89878');
  const ash = new THREE.Color('#6f675c');
  const tmp = new THREE.Color();

  for (let i = 0; i < pos.count; i++) {
    const x = pos.getX(i);
    const z = pos.getZ(i);
    const y = terrainHeight(x, z);
    pos.setY(i, y);

    // Color: loess base, scrubby tint patches, rockier tones on high ground,
    // ash-darkened ground inside the burned settlement.
    const moisture = fbm(x * 0.012 + 3.7, z * 0.012 - 9.2, 3);
    tmp.copy(loess).lerp(scrubTint, Math.max(0, moisture - 0.42) * 0.9);
    const highness = Math.min(1, Math.max(0, (y - 8) / 14));
    tmp.lerp(rocky, highness * 0.5);
    const d = Math.sqrt(x * x + z * z);
    if (d < 52) tmp.lerp(ash, 0.55 * (1 - d / 52));
    colors[i * 3] = tmp.r;
    colors[i * 3 + 1] = tmp.g;
    colors[i * 3 + 2] = tmp.b;
  }

  geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
  geo.computeVertexNormals();
  return geo;
}
