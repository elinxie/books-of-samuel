import { useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useAppStore } from '../../state/store';
import { mulberry32 } from '../../engine/noise';
import { POOL_CENTER, POOL_RADIUS } from './layout';

/**
 * Instanced dry scrub and surface rock for the Gibeon plateau (scene brief;
 * asset-vegetation-scrub, asset-rocks — both reused generic placeholder
 * families). Drier and more open than Hebron's terraced palette (no new
 * regional vegetation system, per the brief), with a bare margin kept clear
 * around the pool itself so the basin/rim/water-plane read cleanly.
 */

const dummy = new THREE.Object3D();
const tmpColor = new THREE.Color();

export function Vegetation({ shrubCount, rockCount }: { shrubCount: number; rockCount: number }) {
  const terrain = useAppStore((s) => s.terrain);
  const shrubRef = useRef<THREE.InstancedMesh>(null);
  const rockRef = useRef<THREE.InstancedMesh>(null);

  const placements = useMemo(() => {
    const rng = mulberry32(220801);
    const poolClearance = POOL_RADIUS + 6;
    const scatter = (count: number) => {
      const out: [number, number][] = [];
      let guard = 0;
      while (out.length < count && guard++ < count * 40) {
        const x = (rng() * 2 - 1) * 520;
        const z = (rng() * 2 - 1) * 380;
        if (Math.hypot(x - POOL_CENTER[0], z - POOL_CENTER[1]) < poolClearance) continue;
        out.push([x, z]);
      }
      return out;
    };
    return { shrubs: scatter(2600), rocks: scatter(900) };
  }, []);

  useEffect(() => {
    const rng = mulberry32(220802);
    const shrubs = shrubRef.current;
    if (shrubs) {
      for (let i = 0; i < shrubCount; i++) {
        const [x, z] = placements.shrubs[i % placements.shrubs.length];
        const s = 0.3 + rng() * 0.6;
        dummy.position.set(x, terrain.heightAt(x, z) + s * 0.22, z);
        dummy.scale.set(s, s * 0.45, s);
        dummy.rotation.set(0, rng() * Math.PI, 0);
        dummy.updateMatrix();
        shrubs.setMatrixAt(i, dummy.matrix);
        tmpColor.setHSL(0.19 + rng() * 0.05, 0.16 + rng() * 0.06, 0.32 + rng() * 0.1);
        shrubs.setColorAt(i, tmpColor);
      }
      shrubs.instanceMatrix.needsUpdate = true;
      if (shrubs.instanceColor) shrubs.instanceColor.needsUpdate = true;
    }

    const rocks = rockRef.current;
    if (rocks) {
      for (let i = 0; i < rockCount; i++) {
        const [x, z] = placements.rocks[i % placements.rocks.length];
        const s = 0.28 + rng() * 0.9;
        dummy.position.set(x, terrain.heightAt(x, z) + s * 0.14, z);
        dummy.scale.set(s, s * 0.55, s);
        dummy.rotation.set(rng() * 0.4, rng() * Math.PI, rng() * 0.4);
        dummy.updateMatrix();
        rocks.setMatrixAt(i, dummy.matrix);
        tmpColor.setHSL(0.09, 0.05 + rng() * 0.05, 0.58 + rng() * 0.14);
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
