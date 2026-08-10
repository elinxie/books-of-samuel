import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { useAppStore } from '../../state/store';
import { mulberry32 } from '../../engine/noise';
import { ABNER_PARTY_SLOTS, DAVIDS_SIDE_SLOTS, FEAST_VESSEL_SLOTS } from './layout';

/**
 * The feast dressing (new `asset-feast-props`, `claim-feast-form`): woven
 * mats at every seating slot plus a handful of shared low vessels — "David
 * made Abner and the men who were with him a feast" (2 Samuel 3:20) names
 * only the fact of a meal, not its physical form, so this is a disclosed
 * design placeholder, not a modeled reconstruction of any specific
 * excavated or comparative feasting assemblage. A single small instanced
 * prop family, laid throughout the scene (the ground is dressed before
 * anyone arrives and stays dressed after they leave — a prepared meal, not
 * a per-beat effect).
 */

const dummy = new THREE.Object3D();
const tmpColor = new THREE.Color();

const ALL_SEATS: [number, number][] = [...ABNER_PARTY_SLOTS, ...DAVIDS_SIDE_SLOTS];

export function FeastGround({ shadows }: { shadows: boolean }) {
  const terrain = useAppStore((s) => s.terrain);
  const matRef = useRef<THREE.InstancedMesh>(null);
  const vesselRef = useRef<THREE.InstancedMesh>(null);

  useEffect(() => {
    const mats = matRef.current;
    if (mats) {
      const rng = mulberry32(230910);
      for (let i = 0; i < ALL_SEATS.length; i++) {
        const [x, z] = ALL_SEATS[i];
        const y = terrain.heightAt(x, z);
        dummy.position.set(x, y + 0.02, z);
        dummy.rotation.set(0, rng() * Math.PI, 0);
        dummy.scale.set(1.1 + rng() * 0.2, 1, 0.75 + rng() * 0.15);
        dummy.updateMatrix();
        mats.setMatrixAt(i, dummy.matrix);
        tmpColor.setHSL(0.09 + rng() * 0.03, 0.22 + rng() * 0.08, 0.42 + rng() * 0.1);
        mats.setColorAt(i, tmpColor);
      }
      mats.instanceMatrix.needsUpdate = true;
      if (mats.instanceColor) mats.instanceColor.needsUpdate = true;
    }

    const vessels = vesselRef.current;
    if (vessels) {
      const rng = mulberry32(230911);
      for (let i = 0; i < FEAST_VESSEL_SLOTS.length; i++) {
        const [x, z] = FEAST_VESSEL_SLOTS[i];
        const y = terrain.heightAt(x, z);
        const s = 0.18 + rng() * 0.08;
        dummy.position.set(x, y + s * 0.5, z);
        dummy.rotation.set(0, rng() * Math.PI, 0);
        dummy.scale.set(s, s * 0.7, s);
        dummy.updateMatrix();
        vessels.setMatrixAt(i, dummy.matrix);
        tmpColor.setHSL(0.08, 0.2, 0.32 + rng() * 0.1);
        vessels.setColorAt(i, tmpColor);
      }
      vessels.instanceMatrix.needsUpdate = true;
      if (vessels.instanceColor) vessels.instanceColor.needsUpdate = true;
    }
  }, [terrain]);

  return (
    <group>
      <instancedMesh
        ref={matRef}
        args={[undefined, undefined, ALL_SEATS.length]}
        frustumCulled={false}
        receiveShadow
      >
        <boxGeometry args={[1, 0.04, 1]} />
        <meshStandardMaterial vertexColors roughness={1} />
      </instancedMesh>
      <instancedMesh
        ref={vesselRef}
        args={[undefined, undefined, FEAST_VESSEL_SLOTS.length]}
        frustumCulled={false}
        castShadow={shadows}
      >
        <cylinderGeometry args={[0.5, 0.4, 1, 8]} />
        <meshStandardMaterial vertexColors roughness={0.7} />
      </instancedMesh>
    </group>
  );
}
