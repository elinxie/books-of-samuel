import { useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useAppStore } from '../../state/store';
import { mulberry32 } from '../../engine/noise';
import { FIELDS } from './layout';

/**
 * Instanced steppe scrub, rocks, and scattered trees (all placeholder-tier;
 * see asset-vegetation-scrub, asset-olive-tree, asset-rocks).
 */

const dummy = new THREE.Object3D();
const tmpColor = new THREE.Color();

function insideField(x: number, z: number): boolean {
  return FIELDS.some((f) => {
    const dx = x - f.x;
    const dz = z - f.z;
    const c = Math.cos(-f.rot);
    const s = Math.sin(-f.rot);
    const lx = dx * c - dz * s;
    const lz = dx * s + dz * c;
    return Math.abs(lx) < f.w / 2 + 3 && Math.abs(lz) < f.d / 2 + 3;
  });
}

function onPathCorridor(x: number, z: number): boolean {
  return Math.abs(x) < 11 && (z < -42 || z > 42);
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
    const rng = mulberry32(31337);
    const scatter = (count: number, rMin: number, rMax: number) => {
      const out: [number, number][] = [];
      let guard = 0;
      while (out.length < count && guard++ < count * 20) {
        const a = rng() * Math.PI * 2;
        const r = rMin + rng() * (rMax - rMin);
        const x = Math.cos(a) * r;
        const z = Math.sin(a) * r;
        if (onPathCorridor(x, z) || insideField(x, z)) continue;
        out.push([x, z]);
      }
      return out;
    };
    const orchards: [number, number][] = [
      [95, 42],
      [-118, -58],
      [58, 178],
    ];
    const trees: [number, number][] = [];
    let guard = 0;
    while (trees.length < 48 && guard++ < 600) {
      if (rng() < 0.7) {
        const [cx, cz] = orchards[Math.floor(rng() * orchards.length)];
        trees.push([cx + (rng() - 0.5) * 42, cz + (rng() - 0.5) * 42]);
      } else {
        const a = rng() * Math.PI * 2;
        const r = 75 + rng() * 330;
        const x = Math.cos(a) * r;
        const z = Math.sin(a) * r;
        if (onPathCorridor(x, z)) continue;
        trees.push([x, z]);
      }
    }
    return {
      shrubs: scatter(2000, 54, 640),
      rocks: scatter(600, 50, 620),
      trees,
      rng: mulberry32(555),
    };
  }, []);

  useEffect(() => {
    const rng = mulberry32(999);
    const shrubs = shrubRef.current;
    if (shrubs) {
      for (let i = 0; i < shrubCount; i++) {
        const [x, z] = placements.shrubs[i % placements.shrubs.length];
        const s = 0.5 + rng() * 0.8;
        dummy.position.set(x, terrain.heightAt(x, z) + s * 0.28, z);
        dummy.scale.set(s, s * 0.55, s);
        dummy.rotation.set(0, rng() * Math.PI, 0);
        dummy.updateMatrix();
        shrubs.setMatrixAt(i, dummy.matrix);
        tmpColor.setHSL(0.18 + rng() * 0.04, 0.22 + rng() * 0.1, 0.32 + rng() * 0.1);
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
        tmpColor.setHSL(0.1, 0.12 + rng() * 0.06, 0.5 + rng() * 0.12);
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
        const s = 0.8 + rng() * 0.5;
        dummy.position.set(x, y + 0.9 * s, z);
        dummy.scale.set(s, s, s);
        dummy.rotation.set(0, rng() * Math.PI, (rng() - 0.5) * 0.12);
        dummy.updateMatrix();
        trunks.setMatrixAt(i, dummy.matrix);
        dummy.position.set(x, y + (2.2 + rng() * 0.4) * s, z);
        dummy.scale.set(s * (1.5 + rng() * 0.6), s * (1.0 + rng() * 0.4), s * (1.5 + rng() * 0.6));
        dummy.updateMatrix();
        canopies.setMatrixAt(i, dummy.matrix);
        tmpColor.setHSL(0.21 + rng() * 0.03, 0.25, 0.3 + rng() * 0.08);
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
        <cylinderGeometry args={[0.14, 0.24, 1.8, 6]} />
        <meshStandardMaterial color="#5f4a34" roughness={1} />
      </instancedMesh>
      <instancedMesh ref={canopyRef} args={[undefined, undefined, treeCount]} frustumCulled={false}>
        <icosahedronGeometry args={[1, 1]} />
        <meshStandardMaterial roughness={1} />
      </instancedMesh>
    </group>
  );
}
