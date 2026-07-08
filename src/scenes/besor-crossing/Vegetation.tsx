import { useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useAppStore } from '../../state/store';
import { mulberry32 } from '../../engine/noise';
import { NORTH_CURVE, POOL_SPOTS, SOUTH_CURVE, distanceToChannel } from './layout';

/**
 * Instanced bank vegetation: tamarisk/scrub density keyed to distance from
 * the wadi centerline (thick near the bed, thinning to open steppe on the
 * bluffs above), plus scattered surface rock (placeholder-tier — see
 * asset-vegetation-scrub, asset-rocks).
 */

const dummy = new THREE.Object3D();
const tmpColor = new THREE.Color();

function onPathCorridor(x: number, z: number): boolean {
  const near = (curve: THREE.CatmullRomCurve3) => {
    for (let u = 0; u <= 1; u += 0.05) {
      const p = curve.getPointAt(u);
      if ((p.x - x) ** 2 + (p.z - z) ** 2 < 6 * 6) return true;
    }
    return false;
  };
  return near(NORTH_CURVE) || near(SOUTH_CURVE);
}

function inPool(x: number, z: number): boolean {
  return POOL_SPOTS.some((p) => (p.x - x) ** 2 + (p.z - z) ** 2 < (p.r + 2) ** 2);
}

/** Density falls off with distance from the channel — thick near the bed. */
function bankDensity(d: number): number {
  if (d < 25) return 0.95;
  if (d < 90) return 0.95 - ((d - 25) / 65) * 0.65;
  return Math.max(0.05, 0.3 - (d - 90) / 500);
}

export function Vegetation({
  shrubCount,
  rockCount,
  treeCount,
}: {
  shrubCount: number;
  rockCount: number;
  treeCount: number;
}) {
  const terrain = useAppStore((s) => s.terrain);
  const shrubRef = useRef<THREE.InstancedMesh>(null);
  const rockRef = useRef<THREE.InstancedMesh>(null);
  const trunkRef = useRef<THREE.InstancedMesh>(null);
  const canopyRef = useRef<THREE.InstancedMesh>(null);

  const placements = useMemo(() => {
    const rng = mulberry32(50221);
    const scatter = (count: number, rMax: number, nearBedOnly: boolean) => {
      const out: [number, number][] = [];
      let guard = 0;
      while (out.length < count && guard++ < count * 40) {
        const x = (rng() * 2 - 1) * rMax;
        const z = (rng() * 2 - 1) * (rMax * 0.75);
        if (onPathCorridor(x, z) || inPool(x, z)) continue;
        const d = distanceToChannel(x, z);
        if (nearBedOnly && d > 55) continue;
        if (rng() > bankDensity(d)) continue;
        out.push([x, z]);
      }
      return out;
    };
    return {
      shrubs: scatter(3000, 340, false),
      rocks: scatter(700, 320, false),
      trees: scatter(180, 320, true),
    };
  }, []);

  useEffect(() => {
    const rng = mulberry32(9911);
    const shrubs = shrubRef.current;
    if (shrubs) {
      for (let i = 0; i < shrubCount; i++) {
        const [x, z] = placements.shrubs[i % placements.shrubs.length];
        const near = distanceToChannel(x, z) < 55;
        const s = (near ? 0.6 : 0.45) + rng() * 0.8;
        dummy.position.set(x, terrain.heightAt(x, z) + s * 0.28, z);
        dummy.scale.set(s, s * (near ? 0.7 : 0.5), s);
        dummy.rotation.set(0, rng() * Math.PI, 0);
        dummy.updateMatrix();
        shrubs.setMatrixAt(i, dummy.matrix);
        tmpColor.setHSL(
          near ? 0.24 + rng() * 0.03 : 0.16 + rng() * 0.05,
          0.24 + rng() * 0.1,
          0.3 + rng() * 0.1,
        );
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
        tmpColor.setHSL(0.09, 0.1 + rng() * 0.06, 0.5 + rng() * 0.12);
        rocks.setColorAt(i, tmpColor);
      }
      rocks.instanceMatrix.needsUpdate = true;
      if (rocks.instanceColor) rocks.instanceColor.needsUpdate = true;
    }

    const trunks = trunkRef.current;
    const canopies = canopyRef.current;
    if (trunks && canopies) {
      for (let i = 0; i < treeCount; i++) {
        const [x, z] = placements.trees[i % placements.trees.length];
        const y = terrain.heightAt(x, z);
        const s = 0.55 + rng() * 0.4;
        dummy.position.set(x, y + 0.75 * s, z);
        dummy.scale.set(s, s, s);
        dummy.rotation.set(0, rng() * Math.PI, (rng() - 0.5) * 0.12);
        dummy.updateMatrix();
        trunks.setMatrixAt(i, dummy.matrix);
        dummy.position.set(x, y + (1.7 + rng() * 0.4) * s, z);
        dummy.scale.set(s * (1.6 + rng() * 0.6), s * (0.9 + rng() * 0.35), s * (1.6 + rng() * 0.6));
        dummy.updateMatrix();
        canopies.setMatrixAt(i, dummy.matrix);
        tmpColor.setHSL(0.28 + rng() * 0.03, 0.22, 0.28 + rng() * 0.08);
        canopies.setColorAt(i, tmpColor);
      }
      trunks.instanceMatrix.needsUpdate = true;
      canopies.instanceMatrix.needsUpdate = true;
      if (canopies.instanceColor) canopies.instanceColor.needsUpdate = true;
    }
  }, [shrubCount, rockCount, treeCount, placements, terrain]);

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
      <instancedMesh ref={trunkRef} args={[undefined, undefined, treeCount]} frustumCulled={false}>
        <cylinderGeometry args={[0.1, 0.16, 1.4, 6]} />
        <meshStandardMaterial color="#5f4a34" roughness={1} />
      </instancedMesh>
      <instancedMesh ref={canopyRef} args={[undefined, undefined, treeCount]} frustumCulled={false}>
        <icosahedronGeometry args={[1, 1]} />
        <meshStandardMaterial roughness={1} />
      </instancedMesh>
    </group>
  );
}
