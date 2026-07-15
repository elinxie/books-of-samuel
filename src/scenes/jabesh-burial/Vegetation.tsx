import { useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useAppStore } from '../../state/store';
import { mulberry32 } from '../../engine/noise';
import { distanceToChannel } from './layout';

/**
 * Instanced ground cover for Jabesh-gilead: the project's fourth regional
 * palette (Negev loess -> Gilboa garrigue -> Beth-shean valley green ->
 * Gilead hills, per the brief) — oak/scrub cover on the slopes, a
 * tamarisk/oleander line thickening toward the wadi, and surface rock
 * (placeholder-tier — see asset-vegetation-gilead, asset-rocks). Oak "trees"
 * reuse the generic blob-tree geometry (asset-olive-tree, already disclosed
 * as reused for Besor's wadi-bank tamarisk; broadened again here).
 */

const dummy = new THREE.Object3D();
const tmpColor = new THREE.Color();

/** Ground scrub density falls off with distance from the wadi centerline —
 * thick along the water, thinning to open hill-flank scrub away from it. */
function bankDensity(d: number): number {
  if (d < 30) return 0.92;
  if (d < 110) return 0.92 - ((d - 30) / 80) * 0.55;
  return Math.max(0.18, 0.37 - (d - 110) / 600);
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
  const waterlineRef = useRef<THREE.InstancedMesh>(null);
  const waterlineCount = 220;

  const placements = useMemo(() => {
    const rng = mulberry32(71201);
    const scatter = (count: number, rMax: number) => {
      const out: [number, number][] = [];
      let guard = 0;
      while (out.length < count && guard++ < count * 40) {
        const x = (rng() * 2 - 1) * rMax;
        const z = (rng() * 2 - 1) * (rMax * 0.72);
        const d = distanceToChannel(x, z);
        if (rng() > bankDensity(d)) continue;
        out.push([x, z]);
      }
      return out;
    };
    const scatterRocks = (count: number, rMax: number) => {
      const out: [number, number][] = [];
      let guard = 0;
      while (out.length < count && guard++ < count * 40) {
        const x = (rng() * 2 - 1) * rMax;
        const z = (rng() * 2 - 1) * (rMax * 0.72);
        out.push([x, z]);
      }
      return out;
    };
    // A perennial-stream line implying the Wadi Yabis's water, narrower and
    // greener than the Besor braid (the brief's explicit palette note).
    const waterline: [number, number][] = [];
    for (let i = 0; i < waterlineCount; i++) {
      const t = i / waterlineCount;
      const bx = -430 + t * 700;
      const bz = -60 + Math.sin(t * 6.4) * 14 - 4;
      waterline.push([bx + (rng() - 0.5) * 16, bz + (rng() - 0.5) * 10]);
    }
    return {
      shrubs: scatter(3000, 470),
      rocks: scatterRocks(650, 470),
      trees: scatter(220, 440),
      waterline,
    };
  }, []);

  useEffect(() => {
    const rng = mulberry32(71203);
    const shrubs = shrubRef.current;
    if (shrubs) {
      for (let i = 0; i < shrubCount; i++) {
        const [x, z] = placements.shrubs[i % placements.shrubs.length];
        const near = distanceToChannel(x, z) < 60;
        const s = (near ? 0.55 : 0.4) + rng() * 0.75;
        dummy.position.set(x, terrain.heightAt(x, z) + s * 0.26, z);
        dummy.scale.set(s, s * (near ? 0.65 : 0.5), s);
        dummy.rotation.set(0, rng() * Math.PI, 0);
        dummy.updateMatrix();
        shrubs.setMatrixAt(i, dummy.matrix);
        tmpColor.setHSL(
          near ? 0.29 + rng() * 0.03 : 0.24 + rng() * 0.05,
          0.3 + rng() * 0.1,
          0.27 + rng() * 0.1,
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
        const s = 0.3 + rng() * 0.9;
        dummy.position.set(x, terrain.heightAt(x, z) + s * 0.15, z);
        dummy.scale.set(s, s * 0.6, s);
        dummy.rotation.set(rng() * 0.4, rng() * Math.PI, rng() * 0.4);
        dummy.updateMatrix();
        rocks.setMatrixAt(i, dummy.matrix);
        tmpColor.setHSL(0.1, 0.08 + rng() * 0.05, 0.44 + rng() * 0.12);
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
        const s = 0.6 + rng() * 0.45;
        dummy.position.set(x, y + 0.8 * s, z);
        dummy.scale.set(s, s, s);
        dummy.rotation.set(0, rng() * Math.PI, (rng() - 0.5) * 0.1);
        dummy.updateMatrix();
        trunks.setMatrixAt(i, dummy.matrix);
        dummy.position.set(x, y + (1.75 + rng() * 0.4) * s, z);
        dummy.scale.set(s * (1.7 + rng() * 0.6), s * (1.0 + rng() * 0.35), s * (1.7 + rng() * 0.6));
        dummy.updateMatrix();
        canopies.setMatrixAt(i, dummy.matrix);
        tmpColor.setHSL(0.3 + rng() * 0.03, 0.24, 0.26 + rng() * 0.08); // oak green
        canopies.setColorAt(i, tmpColor);
      }
      trunks.instanceMatrix.needsUpdate = true;
      canopies.instanceMatrix.needsUpdate = true;
      if (canopies.instanceColor) canopies.instanceColor.needsUpdate = true;
    }

    const waterline = waterlineRef.current;
    if (waterline) {
      for (let i = 0; i < placements.waterline.length; i++) {
        const [x, z] = placements.waterline[i];
        const s = 0.6 + rng() * 0.55;
        dummy.position.set(x, terrain.heightAt(x, z) + s * 0.5, z);
        dummy.scale.set(0.55, s, 0.55);
        dummy.rotation.set(0, rng() * Math.PI, 0);
        dummy.updateMatrix();
        waterline.setMatrixAt(i, dummy.matrix);
        tmpColor.setHSL(0.32 + rng() * 0.03, 0.38, 0.28 + rng() * 0.08); // oleander/tamarisk green
        waterline.setColorAt(i, tmpColor);
      }
      waterline.instanceMatrix.needsUpdate = true;
      if (waterline.instanceColor) waterline.instanceColor.needsUpdate = true;
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
      <instancedMesh
        ref={waterlineRef}
        args={[undefined, undefined, waterlineCount]}
        frustumCulled={false}
      >
        <coneGeometry args={[0.09, 1, 5]} />
        <meshStandardMaterial roughness={1} />
      </instancedMesh>
    </group>
  );
}
