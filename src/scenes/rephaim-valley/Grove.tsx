import { useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useAppStore } from '../../state/store';
import { mulberry32 } from '../../engine/noise';
import { GROVE_CENTER, GROVE_RADIUS } from './layout';

/**
 * The grove (`claim-bakaim-grove`) — the bĕkāʾim of 5:23-24. A small,
 * ordinary, unremarkable stand of generic small-canopy dryland trees, on
 * the valley's flank, not in its middle. Deliberately a fixed, modest
 * count, independent of the quality profile's `treeCount` (this is a
 * specific labeled feature, not scaling ambient density) — and deliberately
 * NOT the same tree form as `Vegetation.tsx`'s scattered background trees,
 * so the grove reads as a distinct place the observer can find and stand
 * inside (`vp-grove`).
 *
 * No foliage-sway/wind system exists anywhere in this engine (canopies are
 * static instanced geometry, like every other tree in this project) — so
 * there is nothing here to "freeze" for the `b-sound` beat; the absence of
 * any animation is the whole of how this component honors
 * `claim-divine-sign-depiction`. No wind effect, light change, or
 * timed/intensified canopy motion is added anywhere, at this beat or any
 * other.
 */

const GROVE_TREE_COUNT = 26;

const dummy = new THREE.Object3D();
const tmpColor = new THREE.Color();

export function Grove({ shadows }: { shadows: boolean }) {
  const terrain = useAppStore((s) => s.terrain);
  const trunkRef = useRef<THREE.InstancedMesh>(null);
  const canopyRef = useRef<THREE.InstancedMesh>(null);

  const placements = useMemo(() => {
    const rng = mulberry32(251101);
    const out: [number, number][] = [];
    let guard = 0;
    while (out.length < GROVE_TREE_COUNT && guard++ < GROVE_TREE_COUNT * 60) {
      const angle = rng() * Math.PI * 2;
      const r = Math.sqrt(rng()) * GROVE_RADIUS;
      const x = GROVE_CENTER[0] + Math.cos(angle) * r;
      const z = GROVE_CENTER[1] + Math.sin(angle) * r;
      if (out.every(([sx, sz]) => (sx - x) ** 2 + (sz - z) ** 2 > 3.2 ** 2)) out.push([x, z]);
    }
    return out;
  }, []);

  useEffect(() => {
    const trunks = trunkRef.current;
    const canopies = canopyRef.current;
    if (!trunks || !canopies) return;
    const rng = mulberry32(251102);
    for (let i = 0; i < placements.length; i++) {
      const [x, z] = placements[i];
      const y = terrain.heightAt(x, z);
      const s = 0.65 + rng() * 0.35;
      dummy.position.set(x, y + 0.65 * s, z);
      dummy.scale.set(s * 0.85, s, s * 0.85);
      dummy.rotation.set(0, rng() * Math.PI, (rng() - 0.5) * 0.08);
      dummy.updateMatrix();
      trunks.setMatrixAt(i, dummy.matrix);

      // A small, rounded canopy — deliberately generic, no resin/balsam
      // silhouette and no mulberry (Morus) leaf-canopy shape asserted.
      dummy.position.set(x, y + (1.3 + rng() * 0.25) * s, z);
      dummy.scale.set(s * 1.5, s * 1.15, s * 1.5);
      dummy.updateMatrix();
      canopies.setMatrixAt(i, dummy.matrix);
      tmpColor.setHSL(0.24 + rng() * 0.03, 0.24, 0.34 + rng() * 0.07);
      canopies.setColorAt(i, tmpColor);
    }
    trunks.instanceMatrix.needsUpdate = true;
    canopies.instanceMatrix.needsUpdate = true;
    if (canopies.instanceColor) canopies.instanceColor.needsUpdate = true;
  }, [placements, terrain]);

  return (
    <group>
      <instancedMesh
        ref={trunkRef}
        args={[undefined, undefined, GROVE_TREE_COUNT]}
        frustumCulled={false}
        castShadow={shadows}
      >
        <cylinderGeometry args={[0.1, 0.15, 1.2, 6]} />
        <meshStandardMaterial color="#665640" roughness={1} />
      </instancedMesh>
      <instancedMesh
        ref={canopyRef}
        args={[undefined, undefined, GROVE_TREE_COUNT]}
        frustumCulled={false}
        castShadow={shadows}
      >
        <icosahedronGeometry args={[1, 1]} />
        <meshStandardMaterial roughness={1} />
      </instancedMesh>
    </group>
  );
}
