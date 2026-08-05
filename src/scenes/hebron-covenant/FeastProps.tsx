import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { useAppStore } from '../../state/store';
import { mulberry32 } from '../../engine/noise';
import { FEAST_PROP_SLOTS } from './layout';

/**
 * Feast dressing — mats and shared vessels (new asset-feast-props,
 * claim-feast-form): 2 Samuel 3:20 narrates the fact of a feast only, not
 * table furniture or vessel form, so this is a disclosed generic
 * placeholder, not a reconstruction of any excavated meal-service
 * assemblage. A single small instanced set (two InstancedMeshes: low
 * mat/board, shallow vessel), per the brief's performance target — static,
 * written once in a setup effect, never re-posed per frame.
 */

const matDummy = new THREE.Object3D();
const vesselDummy = new THREE.Object3D();
const tmpColor = new THREE.Color();

export function FeastProps({ shadows }: { shadows: boolean }) {
  const terrain = useAppStore((s) => s.terrain);
  const matRef = useRef<THREE.InstancedMesh>(null);
  const vesselRef = useRef<THREE.InstancedMesh>(null);

  useEffect(() => {
    const mat = matRef.current;
    const vessel = vesselRef.current;
    if (!mat || !vessel) return;
    const rng = mulberry32(230901);
    for (let i = 0; i < FEAST_PROP_SLOTS.length; i++) {
      const [x, z] = FEAST_PROP_SLOTS[i];
      const y = terrain.heightAt(x, z);
      const rot = rng() * Math.PI;

      matDummy.position.set(x, y + 0.03, z);
      matDummy.rotation.set(0, rot, 0);
      matDummy.scale.set(1.5 + rng() * 0.5, 0.05, 1.0 + rng() * 0.3);
      matDummy.updateMatrix();
      mat.setMatrixAt(i, matDummy.matrix);
      tmpColor.setHSL(0.1, 0.2 + rng() * 0.08, 0.42 + rng() * 0.1);
      mat.setColorAt(i, tmpColor);

      vesselDummy.position.set(x + (rng() - 0.5) * 0.6, y + 0.14, z + (rng() - 0.5) * 0.4);
      vesselDummy.rotation.set(0, rng() * Math.PI, 0);
      vesselDummy.scale.setScalar(0.85 + rng() * 0.3);
      vesselDummy.updateMatrix();
      vessel.setMatrixAt(i, vesselDummy.matrix);
      tmpColor.setHSL(0.08, 0.1, 0.55 + rng() * 0.1);
      vessel.setColorAt(i, tmpColor);
    }
    mat.instanceMatrix.needsUpdate = true;
    if (mat.instanceColor) mat.instanceColor.needsUpdate = true;
    vessel.instanceMatrix.needsUpdate = true;
    if (vessel.instanceColor) vessel.instanceColor.needsUpdate = true;
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
        <cylinderGeometry args={[0.14, 0.1, 0.16, 8]} />
        <meshStandardMaterial vertexColors roughness={0.7} />
      </instancedMesh>
    </group>
  );
}
