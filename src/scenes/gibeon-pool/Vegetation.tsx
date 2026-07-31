import { useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useAppStore } from '../../state/store';
import { mulberry32 } from '../../engine/noise';
import { GIBEON_TERRAIN_SPEC } from './terrain';

/**
 * Instanced highland scrub and surface rock for the Gibeon plateau — reused,
 * generic placeholder families already used elsewhere in the project
 * (asset-vegetation-scrub, asset-rocks), no new regional vegetation system
 * (brief's "Performance target"). Density thins with elevation toward bare
 * rock on the hill of Ammah, mirroring the terrain's own color ramp.
 */

const dummy = new THREE.Object3D();
const tmpColor = new THREE.Color();

const ROCKY_FROM_Y = GIBEON_TERRAIN_SPEC.colors.rockyFromY ?? 9;
const ROCKY_FULL_Y = GIBEON_TERRAIN_SPEC.colors.rockyFullY ?? 24;

export function coverFraction(y: number): number {
  const highness = Math.min(1, Math.max(0, (y - ROCKY_FROM_Y) / (ROCKY_FULL_Y - ROCKY_FROM_Y)));
  return 1 - highness;
}

export function scrubDensity(y: number): number {
  return 0.14 + coverFraction(y) * 0.62;
}

export function rockDensity(y: number): number {
  return 0.18 + (1 - coverFraction(y)) * 0.5;
}

export function Vegetation({ shrubCount, rockCount }: { shrubCount: number; rockCount: number }) {
  const terrain = useAppStore((s) => s.terrain);
  const shrubRef = useRef<THREE.InstancedMesh>(null);
  const rockRef = useRef<THREE.InstancedMesh>(null);

  const placements = useMemo(() => {
    const rng = mulberry32(220901);
    const scatter = (count: number, densityFn: (y: number) => number) => {
      const out: [number, number][] = [];
      let guard = 0;
      while (out.length < count && guard++ < count * 40) {
        const x = -60 + rng() * 460;
        const z = -260 + rng() * 340;
        // Keep the pool basin and champions' ground itself clear.
        if (Math.hypot(x, z) < 22) continue;
        const y = terrain.heightAt(x, z);
        if (rng() > densityFn(y)) continue;
        out.push([x, z]);
      }
      return out;
    };
    return {
      shrubs: scatter(2600, scrubDensity),
      rocks: scatter(650, rockDensity),
    };
  }, [terrain]);

  useEffect(() => {
    const rng = mulberry32(220903);
    const shrubs = shrubRef.current;
    if (shrubs) {
      for (let i = 0; i < shrubCount; i++) {
        const [x, z] = placements.shrubs[i % placements.shrubs.length];
        const s = 0.32 + rng() * 0.66;
        dummy.position.set(x, terrain.heightAt(x, z) + s * 0.22, z);
        dummy.scale.set(s, s * 0.48, s);
        dummy.rotation.set(0, rng() * Math.PI, 0);
        dummy.updateMatrix();
        shrubs.setMatrixAt(i, dummy.matrix);
        tmpColor.setHSL(0.2 + rng() * 0.05, 0.2 + rng() * 0.08, 0.29 + rng() * 0.1);
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
        tmpColor.setHSL(0.09, 0.05 + rng() * 0.05, 0.56 + rng() * 0.13);
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
