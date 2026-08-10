import { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { useAppStore } from '../../state/store';
import { buildWrappedFormGeometry } from '../../engine/characters';
import { headBundlePose } from './poses';

/**
 * The head of Ish-bosheth (4:8, 4:12b — `claim-david-judgment`), rendered
 * only as a small, cloth-wrapped bundle: the same `buildWrappedFormGeometry`
 * silhouette already used at Beth-shan/Jabesh (`asset-display-forms`), at a
 * short length scale identical in device to jabesh-burial's bone bundle.
 * Identifiable by caption alone, never by geometry — no head or anatomical
 * detail is modeled, and none ever will be (ADR-009's permanent bar).
 *
 * Carried low throughout (a lower lift than a full bier — no trophy
 * framing, per the brief's "carried low... no trophy framing"): set down at
 * the presentation point once Rechab and Baanah arrive, rests there through
 * the verdict and execution (the bundle is never taken to the pool — only
 * the two men are), then makes its own journey to the tomb of Abner and is
 * hidden once fully buried, mirroring `jabesh-burial`'s "covered before
 * flame" convention extended to burial (hebron-gate's `Bier.tsx` uses the
 * identical device for Abner's own body).
 */

const BUNDLE_LENGTH_SCALE = 0.24;

const dummy = new THREE.Object3D();
const HIDDEN = new THREE.Matrix4().compose(
  new THREE.Vector3(0, -500, 0),
  new THREE.Quaternion(),
  new THREE.Vector3(0.0001, 0.0001, 0.0001),
);

export function HeadBundle({ shadows }: { shadows: boolean }) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const geometry = useMemo(() => buildWrappedFormGeometry(BUNDLE_LENGTH_SCALE), []);

  useFrame(() => {
    const mesh = meshRef.current;
    if (!mesh) return;
    const { timeSec: t, terrain } = useAppStore.getState();
    const pose = headBundlePose(t);
    if (!pose.visible) {
      mesh.setMatrixAt(0, HIDDEN);
      mesh.instanceMatrix.needsUpdate = true;
      return;
    }
    const groundY = terrain.heightAt(pose.x, pose.z);
    // A low carry height only — never raised or brandished (no trophy framing).
    const y = groundY + 0.1 + pose.carried * 0.32 - pose.buried * 0.22;
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
