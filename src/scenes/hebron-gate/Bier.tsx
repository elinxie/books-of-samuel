import { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';
import { useFrame } from '@react-three/fiber';
import { useAppStore } from '../../state/store';
import { buildWrappedFormGeometry } from '../../engine/characters';
import { bierPose } from './poses';

/**
 * Abner's bier (`claim-abner-funeral`, `asset-bier-props` — reused from
 * jabesh-burial rather than a new record, same plank-and-pole carrying
 * frame) and his own body, rendered as the same honest wrapped-cloth
 * silhouette the project already uses at Beth-shan/Jabesh
 * (`buildWrappedFormGeometry`, ADR-009's funerary standard) — never a
 * distinct "body" asset, never anatomically resolved in any mode. Appears
 * only once the body is handled at the mourning command (3:31), is carried
 * at funeral pace to the grave, and is hidden again as soon as it is fully
 * lowered — the body is never lingered on mid-burial (see `bierPose`).
 */

const HIDDEN = new THREE.Matrix4().compose(
  new THREE.Vector3(0, -500, 0),
  new THREE.Quaternion(),
  new THREE.Vector3(0.0001, 0.0001, 0.0001),
);

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

export function Bier({ shadows }: { shadows: boolean }) {
  const formRef = useRef<THREE.Mesh>(null);
  const bierRef = useRef<THREE.Mesh>(null);
  const wrappedGeo = useMemo(() => buildWrappedFormGeometry(1), []);
  const bierGeo = useMemo(() => buildBierGeometry(), []);

  useFrame(() => {
    const form = formRef.current;
    const bier = bierRef.current;
    if (!form || !bier) return;
    const { timeSec: t, terrain } = useAppStore.getState();
    const pose = bierPose(t);

    form.visible = pose.visible;
    bier.visible = pose.visible;
    if (!pose.visible) {
      form.matrixAutoUpdate = false;
      form.matrix.copy(HIDDEN);
      return;
    }
    form.matrixAutoUpdate = true;

    const groundY = terrain.heightAt(pose.x, pose.z);
    const liftY = groundY + 0.14 + pose.carried * 0.9;

    form.position.set(pose.x, liftY, pose.z);
    form.rotation.set(0, pose.yaw, Math.PI / 2); // long axis horizontal — always lying flat
    bier.position.set(pose.x, liftY - 0.14, pose.z);
    bier.rotation.set(0, pose.yaw, 0);
  });

  return (
    <group>
      <mesh ref={formRef} geometry={wrappedGeo} castShadow={shadows}>
        <meshStandardMaterial color="#cfc4a4" roughness={0.95} />
      </mesh>
      <mesh ref={bierRef} geometry={bierGeo} castShadow={shadows}>
        <meshStandardMaterial color="#6b5738" roughness={0.9} />
      </mesh>
    </group>
  );
}
