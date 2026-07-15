import { useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useAppStore } from '../../state/store';
import { mulberry32 } from '../../engine/noise';

/**
 * Instanced ground cover for Beth-shan: valley-floor scrub/grass (denser and
 * greener than any prior scene's palette — a well-watered valley floor,
 * per the brief), surface rock on the tell's flanks, and a reed/tamarisk
 * line implying the Harod stream (a vegetation line, not a water shader,
 * per the brief's explicit instruction). All generic, reused asset families
 * (asset-vegetation-scrub, asset-rocks).
 */

const dummy = new THREE.Object3D();
const tmpColor = new THREE.Color();

/** Cover thins with elevation — lush on the valley floor, sparser climbing the tell. */
function coverFraction(y: number): number {
  const highness = Math.min(1, Math.max(0, y / 40));
  return 1 - highness * 0.65;
}

export function Vegetation({ shrubCount, rockCount }: { shrubCount: number; rockCount: number }) {
  const terrain = useAppStore((s) => s.terrain);
  const shrubRef = useRef<THREE.InstancedMesh>(null);
  const rockRef = useRef<THREE.InstancedMesh>(null);
  const reedRef = useRef<THREE.InstancedMesh>(null);
  const reedCount = 260;

  const placements = useMemo(() => {
    const rng = mulberry32(65201);
    const scatterShrubs = (count: number) => {
      const out: [number, number][] = [];
      let guard = 0;
      while (out.length < count && guard++ < count * 40) {
        const x = (rng() * 2 - 1) * 460;
        const z = (rng() * 2 - 1) * 460;
        const y = terrain.heightAt(x, z);
        if (rng() > coverFraction(y)) continue;
        out.push([x, z]);
      }
      return out;
    };
    const scatterRocks = (count: number) => {
      const out: [number, number][] = [];
      let guard = 0;
      while (out.length < count && guard++ < count * 40) {
        const x = (rng() * 2 - 1) * 460;
        const z = (rng() * 2 - 1) * 460;
        out.push([x, z]);
      }
      return out;
    };
    // A loose line implying the Harod stream, on the low ground northwest of
    // the tell — vegetation only, no water shader (brief's explicit call).
    const reeds: [number, number][] = [];
    for (let i = 0; i < reedCount; i++) {
      const t = i / reedCount;
      const bx = -260 + t * 420;
      const bz = -180 + Math.sin(t * 5.2) * 40 - 60;
      reeds.push([bx + (rng() - 0.5) * 26, bz + (rng() - 0.5) * 14]);
    }
    return { shrubs: scatterShrubs(3200), rocks: scatterRocks(650), reeds };
  }, [terrain]);

  useEffect(() => {
    const rng = mulberry32(65203);
    const shrubs = shrubRef.current;
    if (shrubs) {
      for (let i = 0; i < shrubCount; i++) {
        const [x, z] = placements.shrubs[i % placements.shrubs.length];
        const s = 0.4 + rng() * 0.75;
        dummy.position.set(x, terrain.heightAt(x, z) + s * 0.22, z);
        dummy.scale.set(s, s * 0.55, s);
        dummy.rotation.set(0, rng() * Math.PI, 0);
        dummy.updateMatrix();
        shrubs.setMatrixAt(i, dummy.matrix);
        tmpColor.setHSL(0.27 + rng() * 0.05, 0.32 + rng() * 0.1, 0.28 + rng() * 0.1);
        shrubs.setColorAt(i, tmpColor);
      }
      shrubs.instanceMatrix.needsUpdate = true;
      if (shrubs.instanceColor) shrubs.instanceColor.needsUpdate = true;
    }

    const rocks = rockRef.current;
    if (rocks) {
      for (let i = 0; i < rockCount; i++) {
        const [x, z] = placements.rocks[i % placements.rocks.length];
        const s = 0.3 + rng() * 0.95;
        dummy.position.set(x, terrain.heightAt(x, z) + s * 0.15, z);
        dummy.scale.set(s, s * 0.6, s);
        dummy.rotation.set(rng() * 0.4, rng() * Math.PI, rng() * 0.4);
        dummy.updateMatrix();
        rocks.setMatrixAt(i, dummy.matrix);
        tmpColor.setHSL(0.08, 0.05 + rng() * 0.04, 0.36 + rng() * 0.12); // basalt-grey
        rocks.setColorAt(i, tmpColor);
      }
      rocks.instanceMatrix.needsUpdate = true;
      if (rocks.instanceColor) rocks.instanceColor.needsUpdate = true;
    }

    const reeds = reedRef.current;
    if (reeds) {
      for (let i = 0; i < placements.reeds.length; i++) {
        const [x, z] = placements.reeds[i];
        const s = 0.7 + rng() * 0.6;
        dummy.position.set(x, terrain.heightAt(x, z) + s * 0.55, z);
        dummy.scale.set(0.5, s, 0.5);
        dummy.rotation.set(0, rng() * Math.PI, 0);
        dummy.updateMatrix();
        reeds.setMatrixAt(i, dummy.matrix);
        tmpColor.setHSL(0.24 + rng() * 0.04, 0.4, 0.3 + rng() * 0.08);
        reeds.setColorAt(i, tmpColor);
      }
      reeds.instanceMatrix.needsUpdate = true;
      if (reeds.instanceColor) reeds.instanceColor.needsUpdate = true;
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
      <instancedMesh ref={reedRef} args={[undefined, undefined, reedCount]} frustumCulled={false}>
        <coneGeometry args={[0.06, 1, 4]} />
        <meshStandardMaterial roughness={1} />
      </instancedMesh>
    </group>
  );
}
