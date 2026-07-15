import { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { useAppStore } from '../../state/store';
import { buildWrappedFormGeometry } from '../../engine/characters';
import { boneBundlePose } from './poses';

/**
 * The bones gathered as a cloth-wrapped bundle (claim-tamarisk-burial,
 * 31:13a) — the same honest wrapped-cloth silhouette reused at a short
 * `lengthScale` (a small bundle, proportionally shorter and less tapered
 * than a body-length wrapped form), per the brief: "bones as a wrapped
 * bundle, never skeletal geometry." Handled with care, never bone/skeletal
 * geometry in any mode. Standard mode shows it appear at the pyre ground
 * once gathered and carried to the tamarisk; reduced mode elides the
 * gathering/carry (brief's b-bones reduced treatment) — the bundle is
 * simply present at the grave once the burial beat begins, with no carry
 * animation (`boneBundlePose`'s `violenceMode` branch). Hidden the moment
 * it is lowered into the grave in every mode (Tamarisk.tsx grows the mound
 * over it on the same schedule).
 */

const BUNDLE_LENGTH_SCALE = 0.3;

const dummy = new THREE.Object3D();
const HIDDEN = new THREE.Matrix4().compose(
  new THREE.Vector3(0, -500, 0),
  new THREE.Quaternion(),
  new THREE.Vector3(0.0001, 0.0001, 0.0001),
);

export function BoneBundle({ shadows }: { shadows: boolean }) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const geometry = useMemo(() => buildWrappedFormGeometry(BUNDLE_LENGTH_SCALE), []);

  useFrame(() => {
    const mesh = meshRef.current;
    if (!mesh) return;
    const { timeSec: t, terrain, violenceMode } = useAppStore.getState();
    const pose = boneBundlePose(t, violenceMode);
    if (!pose.visible) {
      mesh.setMatrixAt(0, HIDDEN);
      mesh.instanceMatrix.needsUpdate = true;
      return;
    }
    const groundY = terrain.heightAt(pose.x, pose.z);
    const y = groundY + 0.12 + pose.carried * 0.75 - pose.buried * 0.3;
    dummy.position.set(pose.x, y, pose.z);
    dummy.rotation.set(0, 0, Math.PI / 2); // long axis horizontal, lying flat
    dummy.scale.setScalar(1 - pose.buried * 0.4);
    dummy.updateMatrix();
    mesh.setMatrixAt(0, dummy.matrix);
    mesh.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh
      ref={meshRef}
      args={[geometry, undefined, 1]}
      frustumCulled={false}
      castShadow={shadows}
    >
      <meshStandardMaterial color="#c7bb9a" roughness={0.95} />
    </instancedMesh>
  );
}
