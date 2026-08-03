import { useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useAppStore } from '../../state/store';
import { mulberry32 } from '../../engine/noise';
import { POOL_CENTER, POOL_RADIUS } from './layout';

/**
 * Instanced dry Benjamin-highlands scrub and surface rock (`asset-vegetation-
 * scrub`, `asset-rocks` — reused generic placeholder families, same
 * convention as gilboa-battle/hebron-anointing). Thinner and drier than
 * Judean Hebron's terracing, per the brief's "Visual composition" — no new
 * regional vegetation system, and cover is kept clear of the pool basin
 * itself so the water reads as open ground, not overgrown.
 */

const dummy = new THREE.Object3D();
const tmpColor = new THREE.Color();

export function Vegetation({ shrubCount, rockCount }: { shrubCount: number; rockCount: number }) {
  const terrain = useAppStore((s) => s.terrain);
  const shrubRef = useRef<THREE.InstancedMesh>(null);
  const rockRef = useRef<THREE.InstancedMesh>(null);

  const placements = useMemo(() => {
    const rng = mulberry32(52201);
    const scatter = (count: number, density: number) => {
      const out: [number, number][] = [];
      let guard = 0;
      while (out.length < count && guard++ < count * 40) {
        const x = (rng() * 2 - 1) * 460;
        const z = (rng() * 2 - 1) * 460;
        const dPool = Math.hypot(x - POOL_CENTER[0], z - POOL_CENTER[1]);
        if (dPool < POOL_RADIUS + 6) continue;
        if (rng() > density) continue;
        out.push([x, z]);
      }
      return out;
    };
    return {
      shrubs: scatter(2600, 0.42),
      rocks: scatter(650, 0.3),
    };
  }, []);

  useEffect(() => {
    const rng = mulberry32(52203);
    const shrubs = shrubRef.current;
    if (shrubs) {
      for (let i = 0; i < shrubCount; i++) {
        const [x, z] = placements.shrubs[i % placements.shrubs.length];
        const s = 0.32 + rng() * 0.65;
        dummy.position.set(x, terrain.heightAt(x, z) + s * 0.24, z);
        dummy.scale.set(s, s * 0.48, s);
        dummy.rotation.set(0, rng() * Math.PI, 0);
        dummy.updateMatrix();
        shrubs.setMatrixAt(i, dummy.matrix);
        tmpColor.setHSL(0.2 + rng() * 0.05, 0.18 + rng() * 0.08, 0.3 + rng() * 0.1);
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
        dummy.position.set(x, terrain.heightAt(x, z) + s * 0.15, z);
        dummy.scale.set(s, s * 0.6, s);
        dummy.rotation.set(rng() * 0.4, rng() * Math.PI, rng() * 0.4);
        dummy.updateMatrix();
        rocks.setMatrixAt(i, dummy.matrix);
        tmpColor.setHSL(0.11, 0.05 + rng() * 0.05, 0.58 + rng() * 0.13);
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
