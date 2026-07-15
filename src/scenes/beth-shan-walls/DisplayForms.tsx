import { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';
import { useFrame } from '@react-three/fiber';
import { useAppStore } from '../../state/store';
import { buildWrappedFormGeometry } from '../../engine/characters';
import { DISPLAY_FORM_SLOTS, RETRIEVAL_PATH_CURVE, WALL_HEIGHT } from './layout';
import { displayFormTransform, lerp } from './poses';

/**
 * The four wrapped display forms (claim-body-display, asset-display-forms)
 * and their biers (claim-jabesh-retrieval, asset-bier-props) — the
 * composition's fixed point through every beat. One wrapped-silhouette
 * shape reused for both states: fastened upright on the wall face, and
 * lying flat on the bier once taken down, since it is honestly the same
 * wrapped form throughout, never a distinct "body" vs. "bundle" asset. In
 * reduced mode nothing is ever raised on the wall — see
 * `displayFormTransform`'s reduced-mode branch (ADR-009).
 */

const dummy = new THREE.Object3D();
const tmpPos = new THREE.Vector3();
const tmpTan = new THREE.Vector3();
const HIDDEN = new THREE.Matrix4().compose(
  new THREE.Vector3(0, -500, 0),
  new THREE.Quaternion(),
  new THREE.Vector3(0.0001, 0.0001, 0.0001),
);

function buildBierGeometry(): THREE.BufferGeometry {
  const plank = new THREE.BoxGeometry(0.55, 0.05, 1.7);
  const poleL = new THREE.CylinderGeometry(0.03, 0.03, 2.3, 6);
  poleL.rotateZ(Math.PI / 2);
  poleL.translate(0, 0, 0);
  const poleFront = poleL.clone();
  poleFront.translate(0, 0, 0.7);
  const poleBack = poleL.clone();
  poleBack.translate(0, 0, -0.7);
  const merged = mergeGeometries([plank, poleFront, poleBack]);
  merged.computeVertexNormals();
  return merged;
}

export function DisplayForms({ shadows }: { shadows: boolean }) {
  const formMeshRef = useRef<THREE.InstancedMesh>(null);
  const bierMeshRef = useRef<THREE.InstancedMesh>(null);
  const wrappedGeo = useMemo(() => buildWrappedFormGeometry(1), []);
  const bierGeo = useMemo(() => buildBierGeometry(), []);

  useFrame(() => {
    const formMesh = formMeshRef.current;
    const bierMesh = bierMeshRef.current;
    if (!formMesh || !bierMesh) return;
    const { timeSec: t, terrain, violenceMode } = useAppStore.getState();

    for (let i = 0; i < DISPLAY_FORM_SLOTS.length; i++) {
      const slot = DISPLAY_FORM_SLOTS[i];
      const pose = displayFormTransform(t, violenceMode, i);

      if (!pose.visible) {
        formMesh.setMatrixAt(i, HIDDEN);
        bierMesh.setMatrixAt(i, HIDDEN);
        continue;
      }

      if (pose.horizontal < 0.5) {
        // Upright against the wall face, rising/lowering between the foot
        // and the fastened point (no rope/nail rigging detail rendered).
        const footY = terrain.heightAt(slot.x, slot.z);
        const topY = footY + WALL_HEIGHT * 0.82;
        const y = lerp(footY, topY, pose.heightFrac);
        dummy.position.set(slot.x, y, slot.z);
        dummy.rotation.set(0, slot.yaw, 0);
        dummy.scale.setScalar(1);
        dummy.updateMatrix();
        formMesh.setMatrixAt(i, dummy.matrix);
        bierMesh.setMatrixAt(i, HIDDEN);
      } else {
        // Grounded and borne away: lying flat on the bier, carried out along
        // the retrieval path (reversed — from the wall's foot back east).
        const u = 1 - pose.carryProgress * 0.94;
        RETRIEVAL_PATH_CURVE.getPointAt(Math.min(1, Math.max(0, u)), tmpPos);
        RETRIEVAL_PATH_CURVE.getTangentAt(Math.min(1, Math.max(0, u)), tmpTan);
        const yaw = Math.atan2(tmpTan.x, tmpTan.z);
        const carryHeight = terrain.heightAt(tmpPos.x, tmpPos.z) + 1.0;

        dummy.position.set(tmpPos.x, carryHeight, tmpPos.z);
        dummy.rotation.set(0, yaw, Math.PI / 2); // long axis horizontal
        dummy.scale.setScalar(1);
        dummy.updateMatrix();
        formMesh.setMatrixAt(i, dummy.matrix);

        dummy.position.set(tmpPos.x, carryHeight - 0.14, tmpPos.z);
        dummy.rotation.set(0, yaw, 0);
        dummy.scale.setScalar(1);
        dummy.updateMatrix();
        bierMesh.setMatrixAt(i, pose.bierVisible ? dummy.matrix : HIDDEN);
      }
    }

    formMesh.instanceMatrix.needsUpdate = true;
    bierMesh.instanceMatrix.needsUpdate = true;
  });

  return (
    <group>
      <instancedMesh
        ref={formMeshRef}
        args={[wrappedGeo, undefined, DISPLAY_FORM_SLOTS.length]}
        frustumCulled={false}
        castShadow={shadows}
      >
        <meshStandardMaterial color="#cfc4a4" roughness={0.95} />
      </instancedMesh>
      <instancedMesh
        ref={bierMeshRef}
        args={[bierGeo, undefined, DISPLAY_FORM_SLOTS.length]}
        frustumCulled={false}
        castShadow={shadows}
      >
        <meshStandardMaterial color="#6b5738" roughness={0.9} />
      </instancedMesh>
    </group>
  );
}
