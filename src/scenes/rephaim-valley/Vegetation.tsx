import { useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useAppStore } from '../../state/store';
import { mulberry32 } from '../../engine/noise';
import { DAVIDS_RIM_CENTER } from './layout';

/**
 * Ambient ground cover for the Valley of Rephaim — the same Judean-highland
 * vegetation vocabulary hebron-anointing/jerusalem-stronghold established
 * (scrub, surface rock, scattered olive-form trees), recentered on the
 * rim/valley composition here. The labeled grove itself (`Grove.tsx`) is a
 * separate, denser cluster on the valley's eastern flank — this component
 * is background scatter only, thinner over the open valley floor than on
 * the rim.
 */

const dummy = new THREE.Object3D();
const tmpColor = new THREE.Color();

function rimDensity(x: number): number {
  // Denser near the rim (x around -95..-60), thinning out over the open
  // valley floor further east — "a broad, open valley floor" reads better
  // without rim-density scrub scattered across it.
  const d = x - DAVIDS_RIM_CENTER[0];
  if (d < 60) return 0.75;
  if (d < 160) return 0.75 - ((d - 60) / 100) * 0.5;
  return 0.22;
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
    const rng = mulberry32(251001);
    const scatter = (count: number) => {
      const out: [number, number][] = [];
      let guard = 0;
      while (out.length < count && guard++ < count * 40) {
        const x = -180 + rng() * 480;
        const z = -260 + rng() * 480;
        if (rng() > rimDensity(x)) continue;
        out.push([x, z]);
      }
      return out;
    };
    const scatterRocks = (count: number) => {
      const out: [number, number][] = [];
      for (let i = 0; i < count; i++) {
        out.push([-180 + rng() * 480, -260 + rng() * 480]);
      }
      return out;
    };
    return {
      shrubs: scatter(2400),
      rocks: scatterRocks(600),
      trees: scatter(180),
    };
  }, []);

  useEffect(() => {
    const rng = mulberry32(251003);
    const shrubs = shrubRef.current;
    if (shrubs) {
      for (let i = 0; i < shrubCount; i++) {
        const [x, z] = placements.shrubs[i % placements.shrubs.length];
        const near = x - DAVIDS_RIM_CENTER[0] < 60;
        const s = (near ? 0.5 : 0.38) + rng() * 0.65;
        dummy.position.set(x, terrain.heightAt(x, z) + s * 0.26, z);
        dummy.scale.set(s, s * (near ? 0.6 : 0.45), s);
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
        const s = 0.3 + rng() * 0.9;
        dummy.position.set(x, terrain.heightAt(x, z) + s * 0.15, z);
        dummy.scale.set(s, s * 0.6, s);
        dummy.rotation.set(rng() * 0.4, rng() * Math.PI, rng() * 0.4);
        dummy.updateMatrix();
        rocks.setMatrixAt(i, dummy.matrix);
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
        const s = 0.5 + rng() * 0.4;
        dummy.position.set(x, y + 0.75 * s, z);
        dummy.scale.set(s, s, s);
        dummy.rotation.set(0, rng() * Math.PI, (rng() - 0.5) * 0.1);
        dummy.updateMatrix();
        trunks.setMatrixAt(i, dummy.matrix);
        dummy.position.set(x, y + (1.55 + rng() * 0.3) * s, z);
        dummy.scale.set(s * (1.9 + rng() * 0.6), s * (0.9 + rng() * 0.3), s * (1.9 + rng() * 0.6));
        dummy.updateMatrix();
        canopies.setMatrixAt(i, dummy.matrix);
        tmpColor.setHSL(0.22 + rng() * 0.03, 0.22, 0.36 + rng() * 0.08);
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
