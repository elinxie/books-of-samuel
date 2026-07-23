import { useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useAppStore } from '../../state/store';
import { mulberry32 } from '../../engine/noise';
import { TOWN_CENTER } from './layout';

/**
 * Instanced ground cover for Hebron: the project's fifth regional palette
 * (Negev loess -> Gilboa garrigue -> Beth-shean valley green -> Gilead
 * oak/scrub -> now Judean highland) — olive groves on the terraced slopes,
 * scrub, and surface rock, rockier than Gilead's flank (brief's palette
 * note). Olive "trees" reuse the generic blob-tree geometry
 * (asset-olive-tree, already reused for Besor's wadi-bank tamarisk and
 * Jabesh-gilead's oak); rocks reuse asset-rocks.
 */

const dummy = new THREE.Object3D();
const tmpColor = new THREE.Color();

/** Olive/scrub density thins away from the town's terraced flank, toward
 * open highland scrub further out. */
function terraceDensity(d: number): number {
  if (d < 90) return 0.85;
  if (d < 220) return 0.85 - ((d - 90) / 130) * 0.45;
  return Math.max(0.16, 0.4 - (d - 220) / 700);
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
    const rng = mulberry32(220701);
    const scatter = (count: number, rMax: number) => {
      const out: [number, number][] = [];
      let guard = 0;
      while (out.length < count && guard++ < count * 40) {
        const x = (rng() * 2 - 1) * rMax;
        const z = TOWN_CENTER[1] + (rng() * 2 - 1) * (rMax * 0.85);
        const d = Math.hypot(x - TOWN_CENTER[0], z - TOWN_CENTER[1]);
        if (rng() > terraceDensity(d)) continue;
        out.push([x, z]);
      }
      return out;
    };
    const scatterRocks = (count: number, rMax: number) => {
      const out: [number, number][] = [];
      let guard = 0;
      while (out.length < count && guard++ < count * 40) {
        const x = (rng() * 2 - 1) * rMax;
        const z = TOWN_CENTER[1] + (rng() * 2 - 1) * (rMax * 0.85);
        out.push([x, z]);
      }
      return out;
    };
    return {
      shrubs: scatter(2800, 480),
      rocks: scatterRocks(700, 480),
      trees: scatter(260, 440),
    };
  }, []);

  useEffect(() => {
    const rng = mulberry32(220703);
    const shrubs = shrubRef.current;
    if (shrubs) {
      for (let i = 0; i < shrubCount; i++) {
        const [x, z] = placements.shrubs[i % placements.shrubs.length];
        const near = Math.hypot(x - TOWN_CENTER[0], z - TOWN_CENTER[1]) < 120;
        const s = (near ? 0.5 : 0.4) + rng() * 0.7;
        dummy.position.set(x, terrain.heightAt(x, z) + s * 0.26, z);
        dummy.scale.set(s, s * (near ? 0.6 : 0.48), s);
        dummy.rotation.set(0, rng() * Math.PI, 0);
        dummy.updateMatrix();
        shrubs.setMatrixAt(i, dummy.matrix);
        tmpColor.setHSL(0.23 + rng() * 0.05, 0.28 + rng() * 0.1, 0.28 + rng() * 0.1);
        shrubs.setColorAt(i, tmpColor);
      }
      shrubs.instanceMatrix.needsUpdate = true;
      if (shrubs.instanceColor) shrubs.instanceColor.needsUpdate = true;
    }

    const rocks = rockRef.current;
    if (rocks) {
      for (let i = 0; i < rockCount; i++) {
        const [x, z] = placements.rocks[i % placements.rocks.length];
        const s = 0.32 + rng() * 0.95;
        dummy.position.set(x, terrain.heightAt(x, z) + s * 0.15, z);
        dummy.scale.set(s, s * 0.6, s);
        dummy.rotation.set(rng() * 0.4, rng() * Math.PI, rng() * 0.4);
        dummy.updateMatrix();
        rocks.setMatrixAt(i, dummy.matrix);
        // Slightly warmer/paler than Gilead's rock tint (brief: rockier highland).
        tmpColor.setHSL(0.09, 0.1 + rng() * 0.05, 0.5 + rng() * 0.14);
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
        dummy.rotation.set(0, rng() * Math.PI, (rng() - 0.5) * 0.1);
        dummy.updateMatrix();
        trunks.setMatrixAt(i, dummy.matrix);
        dummy.position.set(x, y + (1.55 + rng() * 0.3) * s, z);
        dummy.scale.set(s * (2.0 + rng() * 0.6), s * (0.9 + rng() * 0.3), s * (2.0 + rng() * 0.6));
        dummy.updateMatrix();
        canopies.setMatrixAt(i, dummy.matrix);
        tmpColor.setHSL(0.22 + rng() * 0.03, 0.22, 0.36 + rng() * 0.08); // olive silver-green
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
        <cylinderGeometry args={[0.11, 0.17, 1.3, 6]} />
        <meshStandardMaterial color="#6b5a3f" roughness={1} />
      </instancedMesh>
      <instancedMesh ref={canopyRef} args={[undefined, undefined, treeCount]} frustumCulled={false}>
        <icosahedronGeometry args={[1, 1]} />
        <meshStandardMaterial roughness={1} />
      </instancedMesh>
    </group>
  );
}
