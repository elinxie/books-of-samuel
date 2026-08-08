import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { useAppStore } from '../../state/store';
import { mulberry32 } from '../../engine/noise';
import { FEAST_PROP_SLOTS } from './layout';

/**
 * The feast dressing (new asset-feast-props, claim-feast-form): low woven
 * mats and a scatter of shared clay vessels laid between David's and
 * Abner's seats. 2 Samuel 3:20 narrates only that "David made Abner and the
 * men who were with him a feast" — no hall, no table furniture, no vessel
 * form; this is a disclosed, generic open-air staging, matching the brief's
 * "modest and open-air" call. Two InstancedMeshes (mat, vessel), one asset
 * family, both static — matrices/colors written once in a setup effect, not
 * `useFrame`, matching this scene's "mostly static/idle" cost mandate.
 */

const dummy = new THREE.Object3D();
const tmpColor = new THREE.Color();

export function FeastGround({ shadows }: { shadows: boolean }) {
  const terrain = useAppStore((s) => s.terrain);
  const matRef = useRef<THREE.InstancedMesh>(null);
  const vesselRef = useRef<THREE.InstancedMesh>(null);

  useEffect(() => {
    const mats = matRef.current;
    const vessels = vesselRef.current;
    const rng = mulberry32(230601);
    for (let i = 0; i < FEAST_PROP_SLOTS.length; i++) {
      const slot = FEAST_PROP_SLOTS[i];
      const y = terrain.heightAt(slot.x, slot.z);

      if (mats) {
        dummy.position.set(slot.x, y + 0.03, slot.z);
        dummy.rotation.set(0, slot.rot, 0);
        dummy.scale.set(1.8 * slot.scale, 0.06, 1.1 * slot.scale);
        dummy.updateMatrix();
        mats.setMatrixAt(i, dummy.matrix);
        tmpColor.setHSL(0.05 + rng() * 0.05, 0.35 + rng() * 0.15, 0.32 + rng() * 0.1);
        mats.setColorAt(i, tmpColor);
      }

      if (vessels) {
        const vx = slot.x + (rng() - 0.5) * 0.7;
        const vz = slot.z + (rng() - 0.5) * 0.7;
        const vy = terrain.heightAt(vx, vz);
        const s = 0.7 * slot.scale;
        dummy.position.set(vx, vy + 0.12 * s, vz);
        dummy.rotation.set(0, rng() * Math.PI, 0);
        dummy.scale.set(s, s, s);
        dummy.updateMatrix();
        vessels.setMatrixAt(i, dummy.matrix);
        tmpColor.setHSL(0.06, 0.32 + rng() * 0.1, 0.38 + rng() * 0.1); // fired clay
        vessels.setColorAt(i, tmpColor);
      }
    }
    if (mats) {
      mats.instanceMatrix.needsUpdate = true;
      if (mats.instanceColor) mats.instanceColor.needsUpdate = true;
    }
    if (vessels) {
      vessels.instanceMatrix.needsUpdate = true;
      if (vessels.instanceColor) vessels.instanceColor.needsUpdate = true;
    }
  }, [terrain]);

  return (
    <group>
      <instancedMesh
        ref={matRef}
        args={[undefined, undefined, FEAST_PROP_SLOTS.length]}
        frustumCulled={false}
        receiveShadow
      >
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial vertexColors roughness={1} />
      </instancedMesh>
      <instancedMesh
        ref={vesselRef}
        args={[undefined, undefined, FEAST_PROP_SLOTS.length]}
        frustumCulled={false}
        castShadow={shadows}
      >
        <cylinderGeometry args={[0.16, 0.22, 0.34, 8]} />
        <meshStandardMaterial vertexColors roughness={0.75} />
      </instancedMesh>
    </group>
  );
}
