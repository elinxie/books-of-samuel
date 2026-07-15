import { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';
import { useFrame } from '@react-three/fiber';
import { useAppStore } from '../../state/store';
import { buildWrappedFormGeometry } from '../../engine/characters';
import { formPose } from './poses';

/**
 * The four wrapped forms (claim-jabesh-retrieval, claim-burning-bodies) and
 * their biers (asset-bier-props, shared with Beth-shan) across the night
 * march, the dawn reception, and the carry to the pyre. The same honest
 * wrapped-cloth silhouette used at Beth-shan's wall (buildWrappedFormGeometry
 * at full length scale) — never a distinct "body" asset — always rendered
 * lying flat (borne on a bier), since nothing here is ever raised upright.
 * This component stops rendering each form the instant the pyre timber has
 * fully covered it (`formPose`'s `visible` flag) — the covered-before-flame
 * sequencing is identical in both violence modes, a hard constraint from the
 * brief, not something this component branches on.
 */

const dummy = new THREE.Object3D();
const HIDDEN = new THREE.Matrix4().compose(
  new THREE.Vector3(0, -500, 0),
  new THREE.Quaternion(),
  new THREE.Vector3(0.0001, 0.0001, 0.0001),
);
const FORM_COUNT = 4;

function buildBierGeometry(): THREE.BufferGeometry {
  const plank = new THREE.BoxGeometry(0.55, 0.05, 1.7);
  const poleTemplate = new THREE.CylinderGeometry(0.03, 0.03, 2.3, 6);
  poleTemplate.rotateZ(Math.PI / 2);
  const poleFront = poleTemplate.clone();
  poleFront.translate(0, 0, 0.7);
  const poleBack = poleTemplate.clone();
  poleBack.translate(0, 0, -0.7);
  const merged = mergeGeometries([plank, poleFront, poleBack]);
  merged.computeVertexNormals();
  return merged;
}

export function Biers({ shadows }: { shadows: boolean }) {
  const formMeshRef = useRef<THREE.InstancedMesh>(null);
  const bierMeshRef = useRef<THREE.InstancedMesh>(null);
  const wrappedGeo = useMemo(() => buildWrappedFormGeometry(1), []);
  const bierGeo = useMemo(() => buildBierGeometry(), []);

  useFrame(() => {
    const formMesh = formMeshRef.current;
    const bierMesh = bierMeshRef.current;
    if (!formMesh || !bierMesh) return;
    const { timeSec: t, terrain } = useAppStore.getState();

    for (let i = 0; i < FORM_COUNT; i++) {
      const pose = formPose(t, i);
      if (!pose.visible) {
        formMesh.setMatrixAt(i, HIDDEN);
        bierMesh.setMatrixAt(i, HIDDEN);
        continue;
      }
      const groundY = terrain.heightAt(pose.x, pose.z);
      const liftY = groundY + 0.14 + pose.carried * 0.9;

      dummy.position.set(pose.x, liftY, pose.z);
      dummy.rotation.set(0, pose.yaw, Math.PI / 2); // long axis horizontal — always lying flat
      dummy.scale.setScalar(1);
      dummy.updateMatrix();
      formMesh.setMatrixAt(i, dummy.matrix);

      dummy.position.set(pose.x, liftY - 0.14, pose.z);
      dummy.rotation.set(0, pose.yaw, 0);
      dummy.scale.setScalar(1);
      dummy.updateMatrix();
      bierMesh.setMatrixAt(i, dummy.matrix);
    }
    formMesh.instanceMatrix.needsUpdate = true;
    bierMesh.instanceMatrix.needsUpdate = true;
  });

  return (
    <group>
      <instancedMesh
        ref={formMeshRef}
        args={[wrappedGeo, undefined, FORM_COUNT]}
        frustumCulled={false}
        castShadow={shadows}
      >
        <meshStandardMaterial color="#cfc4a4" roughness={0.95} />
      </instancedMesh>
      <instancedMesh
        ref={bierMeshRef}
        args={[bierGeo, undefined, FORM_COUNT]}
        frustumCulled={false}
        castShadow={shadows}
      >
        <meshStandardMaterial color="#6b5738" roughness={0.9} />
      </instancedMesh>
    </group>
  );
}
