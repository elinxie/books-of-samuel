import { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';
import { useFrame } from '@react-three/fiber';
import { useAppStore } from '../../state/store';
import { buildWrappedFormGeometry } from '../../engine/characters';
import { bierPose } from './poses';

/**
 * Abner's bier (`asset-bier`, `claim-abner-funeral`): the same honest
 * wrapped-cloth silhouette used at Beth-shan's wall and Jabesh's pyre
 * (`buildWrappedFormGeometry`, full length scale) — never a distinct
 * "corpse" asset. Takes over from Abner's own fallen principal rig at the
 * mourning-command beat (3:31), is carried to the tomb, laid at its mouth,
 * and fades from view as it is interred — never a graphic burial. Reuses
 * jabesh-burial's plank-and-pole bier frame construction.
 */

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
    if (!pose.visible) return;

    const groundY = terrain.heightAt(pose.x, pose.z);
    const sink = pose.buried * 0.6;
    const liftY = groundY + 0.14 + pose.carried * 0.9 - sink;
    const scale = 1 - pose.buried * 0.35;

    form.position.set(pose.x, liftY, pose.z);
    form.rotation.set(0, pose.yaw, Math.PI / 2);
    form.scale.setScalar(scale);

    bier.position.set(pose.x, liftY - 0.14, pose.z);
    bier.rotation.set(0, pose.yaw, 0);
    bier.scale.setScalar(scale);
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
