import { useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useAppStore } from '../../state/store';
import { mulberry32 } from '../../engine/noise';
import { distanceToCamp } from './layout';

/**
 * Instanced steppe scrub and surface rock for the open basin. Scrub density
 * is keyed to distance from the camp clusters — heavily grazed bare ground
 * near the sprawl, thickening to open steppe beyond it (scene brief;
 * asset-vegetation-scrub, asset-rocks). No trees: a grazed loess basin, not
 * a wadi bank.
 */

const dummy = new THREE.Object3D();
const tmpColor = new THREE.Color();

/** Scrub survival probability: sparse near the camp, steppe density beyond. */
function grazedDensity(d: number): number {
  if (d < 18) return 0.08;
  if (d < 70) return 0.08 + ((d - 18) / 52) * 0.62;
  return 0.7;
}

export function Vegetation({ shrubCount, rockCount }: { shrubCount: number; rockCount: number }) {
  const terrain = useAppStore((s) => s.terrain);
  const shrubRef = useRef<THREE.InstancedMesh>(null);
  const rockRef = useRef<THREE.InstancedMesh>(null);

  const placements = useMemo(() => {
    const rng = mulberry32(4511);
    const scatter = (count: number, rMax: number, grazed: boolean) => {
      const out: [number, number][] = [];
      let guard = 0;
      while (out.length < count && guard++ < count * 40) {
        const x = (rng() * 2 - 1) * rMax;
        const z = (rng() * 2 - 1) * (rMax * 0.8);
        if (grazed && rng() > grazedDensity(distanceToCamp(x, z))) continue;
        out.push([x, z]);
      }
      return out;
    };
    return {
      shrubs: scatter(3000, 340, true),
      rocks: scatter(700, 320, false),
    };
  }, []);

  useEffect(() => {
    const rng = mulberry32(4513);
    const shrubs = shrubRef.current;
    if (shrubs) {
      for (let i = 0; i < shrubCount; i++) {
        const [x, z] = placements.shrubs[i % placements.shrubs.length];
        const s = 0.4 + rng() * 0.75;
        dummy.position.set(x, terrain.heightAt(x, z) + s * 0.26, z);
        dummy.scale.set(s, s * 0.55, s);
        dummy.rotation.set(0, rng() * Math.PI, 0);
        dummy.updateMatrix();
        shrubs.setMatrixAt(i, dummy.matrix);
        tmpColor.setHSL(0.15 + rng() * 0.06, 0.22 + rng() * 0.1, 0.3 + rng() * 0.1);
        shrubs.setColorAt(i, tmpColor);
      }
      shrubs.instanceMatrix.needsUpdate = true;
      if (shrubs.instanceColor) shrubs.instanceColor.needsUpdate = true;
    }

    const rocks = rockRef.current;
    if (rocks) {
      for (let i = 0; i < rockCount; i++) {
        const [x, z] = placements.rocks[i % placements.rocks.length];
        const s = 0.3 + rng() * 0.9;
        dummy.position.set(x, terrain.heightAt(x, z) + s * 0.15, z);
        dummy.scale.set(s, s * 0.6, s);
        dummy.rotation.set(rng() * 0.4, rng() * Math.PI, rng() * 0.4);
        dummy.updateMatrix();
        rocks.setMatrixAt(i, dummy.matrix);
        tmpColor.setHSL(0.09, 0.1 + rng() * 0.06, 0.5 + rng() * 0.12);
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
