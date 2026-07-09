import { useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useAppStore } from '../../state/store';
import { mulberry32 } from '../../engine/noise';
import { GILBOA_TERRAIN_SPEC } from './terrain';

/**
 * Instanced dry limestone garrigue/scrub and surface rock for the Gilboa
 * ridge (scene brief; asset-vegetation-scrub, asset-rocks — both reused,
 * generic placeholder families already used elsewhere in the project). Cover
 * thins with elevation toward bare rock on the crest, mirroring the terrain's
 * own rockyFromY/rockyFullY color ramp (claim-gilboa-terrain-form) so the
 * vegetation and the ground read the same story. Distinct dry-limestone
 * palette from the Negev loess scrub of the M1/M2 scenes — no trees (a
 * battlefield ridge, not a wadi bank or orchard).
 */

const dummy = new THREE.Object3D();
const tmpColor = new THREE.Color();

const ROCKY_FROM_Y = GILBOA_TERRAIN_SPEC.colors.rockyFromY ?? 14;
const ROCKY_FULL_Y = GILBOA_TERRAIN_SPEC.colors.rockyFullY ?? 36;

/** 1 = full low-ground cover, 0 = bare crest rock — mirrors the terrain's own ramp. */
export function coverFraction(y: number): number {
  const highness = Math.min(1, Math.max(0, (y - ROCKY_FROM_Y) / (ROCKY_FULL_Y - ROCKY_FROM_Y)));
  return 1 - highness;
}

/** Scrub survival probability: thick on the lower slopes, sparse on the crest. */
export function scrubDensity(y: number): number {
  return 0.12 + coverFraction(y) * 0.68;
}

/** Rock survival probability: more exposed stone as cover thins with elevation. */
export function rockDensity(y: number): number {
  return 0.2 + (1 - coverFraction(y)) * 0.55;
}

export function Vegetation({ shrubCount, rockCount }: { shrubCount: number; rockCount: number }) {
  const terrain = useAppStore((s) => s.terrain);
  const shrubRef = useRef<THREE.InstancedMesh>(null);
  const rockRef = useRef<THREE.InstancedMesh>(null);

  const placements = useMemo(() => {
    const rng = mulberry32(73301);
    const scatter = (count: number, densityFn: (y: number) => number) => {
      const out: [number, number][] = [];
      let guard = 0;
      while (out.length < count && guard++ < count * 40) {
        const x = (rng() * 2 - 1) * 480;
        // Biased toward the ridge/northern-approach/eastern-draw span the
        // observer actually walks, not the far edges of the heightfield.
        const z = -60 + (rng() * 2 - 1) * 340;
        const y = terrain.heightAt(x, z);
        if (rng() > densityFn(y)) continue;
        out.push([x, z]);
      }
      return out;
    };
    return {
      shrubs: scatter(3000, scrubDensity),
      rocks: scatter(700, rockDensity),
    };
  }, [terrain]);

  useEffect(() => {
    const rng = mulberry32(73303);
    const shrubs = shrubRef.current;
    if (shrubs) {
      for (let i = 0; i < shrubCount; i++) {
        const [x, z] = placements.shrubs[i % placements.shrubs.length];
        const s = 0.35 + rng() * 0.7;
        dummy.position.set(x, terrain.heightAt(x, z) + s * 0.24, z);
        dummy.scale.set(s, s * 0.5, s);
        dummy.rotation.set(0, rng() * Math.PI, 0);
        dummy.updateMatrix();
        shrubs.setMatrixAt(i, dummy.matrix);
        tmpColor.setHSL(0.21 + rng() * 0.05, 0.2 + rng() * 0.08, 0.28 + rng() * 0.1);
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
        tmpColor.setHSL(0.1, 0.06 + rng() * 0.05, 0.55 + rng() * 0.14);
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
