import { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';
import { useFrame } from '@react-three/fiber';
import { useAppStore } from '../../state/store';
import { buildWrappedFormGeometry } from '../../engine/characters';
import { bierPose } from './poses';

/**
 * Abner's body on the bier (`claim-abner-funeral`, `asset-bier`) — the
 * project's honest, anatomically-unresolved funerary standard
 * (`buildWrappedFormGeometry`, the ADR-009 funerary convention already used
 * at Beth-shan and Jabesh-gilead), never a distinct "body" mesh, always
 * lying flat. Carried along the procession route, then lowered and settled
 * into the tomb entry — sinking out of view represents burial itself; there
 * is no attempt to model an interior or a sealed entrance. Visible only
 * from `T_PROCESSION` onward (`bierPose`'s own `visible` flag), the exact
 * instant `PrincipalFigures.tsx` hides Abner's own rig — the two are never
 * rendered at once.
 */

function buildBierGeometry(): THREE.BufferGeometry {
  const plank = new THREE.BoxGeometry(0.55, 0.05, 1.75);
  const poleTemplate = new THREE.CylinderGeometry(0.03, 0.03, 2.35, 6);
  poleTemplate.rotateZ(Math.PI / 2);
  const poleFront = poleTemplate.clone();
  poleFront.translate(0, 0, 0.72);
  const poleBack = poleTemplate.clone();
  poleBack.translate(0, 0, -0.72);
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
    if (!pose.visible) return;

    const groundY = terrain.heightAt(pose.x, pose.z);
    const carryLift = 0.14 + pose.carried * 0.9;
    const sinkDrop = pose.sink * 1.4;
    const liftY = groundY + carryLift - sinkDrop;
    const fadeScale = 1 - pose.sink * 0.85;

    form.position.set(pose.x, liftY, pose.z);
    form.rotation.set(0, pose.yaw, Math.PI / 2); // long axis horizontal, always lying flat
    form.scale.setScalar(fadeScale);

    bier.position.set(pose.x, liftY - 0.14, pose.z);
    bier.rotation.set(0, pose.yaw, 0);
    bier.scale.setScalar(fadeScale);
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
