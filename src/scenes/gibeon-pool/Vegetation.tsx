import { useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useAppStore } from '../../state/store';
import { mulberry32 } from '../../engine/noise';
import { POOL_CENTER } from './terrain';

/**
 * Instanced ground cover for Gibeon: the project's sixth regional palette —
 * central Benjamin highlands, drier and more open than Judean Hebron, with
 * rockier exposed high ground (docs/design/gibeon-pool-brief.md, "Visual
 * composition"). No new regional vegetation system beyond what
 * gilboa-battle/hebron-anointing already established — scrub and surface
 * rock only, reusing asset-vegetation-scrub/asset-rocks; no orchard trees
 * (this plateau reads open, not terraced/cultivated).
 */

const dummy = new THREE.Object3D();
const tmpColor = new THREE.Color();

/** Scrub/rock thin out near the pool itself (kept clear for the tableau and
 * the champions' ground) and thicken slightly on the open plateau beyond. */
function poolClearance(d: number): number {
  if (d < 24) return 0.12;
  if (d < 60) return 0.12 + ((d - 24) / 36) * 0.6;
  return 0.72;
}

export function Vegetation({ shrubCount, rockCount }: { shrubCount: number; rockCount: number }) {
  const terrain = useAppStore((s) => s.terrain);
  const shrubRef = useRef<THREE.InstancedMesh>(null);
  const rockRef = useRef<THREE.InstancedMesh>(null);

  const placements = useMemo(() => {
    const rng = mulberry32(230601);
    const scatter = (count: number, rMax: number) => {
      const out: [number, number][] = [];
      let guard = 0;
      while (out.length < count && guard++ < count * 40) {
        const x = POOL_CENTER[0] + (rng() * 2 - 1) * rMax;
        const z = POOL_CENTER[1] + (rng() * 2 - 1) * rMax * 0.8;
        const d = Math.hypot(x - POOL_CENTER[0], z - POOL_CENTER[1]);
        if (rng() > poolClearance(d)) continue;
        out.push([x, z]);
      }
      return out;
    };
    return {
      shrubs: scatter(3000, 500),
      rocks: scatter(800, 500),
    };
  }, []);

  useEffect(() => {
    const rng = mulberry32(230602);
    const shrubs = shrubRef.current;
    if (shrubs) {
      for (let i = 0; i < shrubCount; i++) {
        const [x, z] = placements.shrubs[i % placements.shrubs.length];
        const s = 0.35 + rng() * 0.65;
        dummy.position.set(x, terrain.heightAt(x, z) + s * 0.24, z);
        dummy.scale.set(s, s * 0.42, s);
        dummy.rotation.set(0, rng() * Math.PI, 0);
        dummy.updateMatrix();
        shrubs.setMatrixAt(i, dummy.matrix);
        tmpColor.setHSL(0.2 + rng() * 0.05, 0.24 + rng() * 0.1, 0.32 + rng() * 0.1);
        shrubs.setColorAt(i, tmpColor);
      }
      shrubs.instanceMatrix.needsUpdate = true;
      if (shrubs.instanceColor) shrubs.instanceColor.needsUpdate = true;
    }

    const rocks = rockRef.current;
    if (rocks) {
      for (let i = 0; i < rockCount; i++) {
        const [x, z] = placements.rocks[i % placements.rocks.length];
        const s = 0.3 + rng() * 1.0;
        dummy.position.set(x, terrain.heightAt(x, z) + s * 0.15, z);
        dummy.scale.set(s, s * 0.6, s);
        dummy.rotation.set(rng() * 0.4, rng() * Math.PI, rng() * 0.4);
        dummy.updateMatrix();
        rocks.setMatrixAt(i, dummy.matrix);
        tmpColor.setHSL(0.09, 0.1 + rng() * 0.05, 0.48 + rng() * 0.16);
        rocks.setColorAt(i, tmpColor);
      }
      rocks.instanceMatrix.needsUpdate = true;
      if (rocks.instanceColor) rocks.instanceColor.needsUpdate = true;
    }
  }, [shrubCount, rockCount, placements, terrain]);

  return (
    <group>
      <instancedMesh ref={shrubRef} args={[undefined, undefined, shrubCount]} frustumCulled={false}>
        <icosahedronGeometry args={[1, 0]} />
        <meshStandardMaterial roughness={1} />
      </instancedMesh>
      <instancedMesh ref={rockRef} args={[undefined, undefined, rockCount]} frustumCulled={false}>
        <dodecahedronGeometry args={[1, 0]} />
        <meshStandardMaterial roughness={1} />
      </instancedMesh>
    </group>
  );
}
