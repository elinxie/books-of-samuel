import { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';
import { useAppStore } from '../../state/store';
import { Ark } from './Ark';
import { cartPose, stumbleEnvelope } from './poses';

/**
 * The new cart (6:3, "a new cart") and the pair of oxen driven by Uzzah and
 * Ahio, carrying the ark along the route corridor — `asset-ark-cart`,
 * `claim-ark-procession-departure`. The cart-vs-carrying-method question
 * (Numbers 4:15 / 1 Chronicles 15:2, 13) is disclosed as `scholarlyViews` on
 * that claim, not resolved in this geometry: the cart is simply rendered as
 * the text's own stated transport, no "wrong way" is choreographed or
 * corrected on-screen (Resolved design calls).
 *
 * The oxen stumble (6:6) is an ordinary physical event, not the divine sign
 * — `stumbleEnvelope` (poses.ts) drives a small, brief wobble here, nothing
 * more; no light/glow/wind/particle effect anywhere in this file (ADR-013).
 */

function buildCartGeometry(): THREE.BufferGeometry {
  const parts: THREE.BufferGeometry[] = [];
  const platform = new THREE.BoxGeometry(1.5, 0.12, 1.05);
  platform.translate(0, 0.62, 0);
  parts.push(platform);

  const railHeight = 0.22;
  for (const side of [-1, 1]) {
    const rail = new THREE.BoxGeometry(1.5, railHeight, 0.06);
    rail.translate(0, 0.62 + railHeight / 2 + 0.02, (side * 1.05) / 2 - side * 0.03);
    parts.push(rail);
  }

  const axle = new THREE.CylinderGeometry(0.04, 0.04, 1.3, 6);
  axle.rotateZ(Math.PI / 2);
  axle.translate(0, 0.5, 0);
  parts.push(axle);

  for (const side of [-1, 1]) {
    const wheel = new THREE.CylinderGeometry(0.42, 0.42, 0.09, 14);
    wheel.rotateX(Math.PI / 2);
    wheel.translate(0, 0.46, (side * 1.05) / 2 + side * 0.08);
    parts.push(wheel);
  }

  const merged = mergeGeometries(parts);
  merged.computeVertexNormals();
  return merged;
}

function buildOxGeometry(): THREE.BufferGeometry {
  const parts: THREE.BufferGeometry[] = [];
  const body = new THREE.CapsuleGeometry(0.32, 0.9, 3, 8);
  body.rotateZ(Math.PI / 2);
  body.translate(0, 0.85, 0);
  parts.push(body);
  const head = new THREE.BoxGeometry(0.26, 0.24, 0.22);
  head.translate(0.68, 0.92, 0);
  parts.push(head);
  const hornGeo = () => new THREE.ConeGeometry(0.04, 0.22, 5);
  for (const side of [-1, 1]) {
    const horn = hornGeo();
    horn.rotateZ(side * 0.5);
    horn.translate(0.72, 1.08, side * 0.1);
    parts.push(horn);
  }
  const legGeo = () => new THREE.CylinderGeometry(0.05, 0.06, 0.62, 5);
  const legs = [
    [0.3, 0.31, 0.15],
    [0.3, 0.31, -0.15],
    [-0.3, 0.31, 0.15],
    [-0.3, 0.31, -0.15],
  ].map(([x, y, z]) => {
    const g = legGeo();
    g.translate(x, y, z);
    return g;
  });
  parts.push(...legs);
  const merged = mergeGeometries(parts);
  merged.computeVertexNormals();
  return merged;
}

export function ArkCart({ shadows }: { shadows: boolean }) {
  const groupRef = useRef<THREE.Group>(null);
  const oxLeftRef = useRef<THREE.Mesh>(null);
  const oxRightRef = useRef<THREE.Mesh>(null);
  const cartGeo = useMemo(() => buildCartGeometry(), []);
  const oxGeo = useMemo(() => buildOxGeometry(), []);

  useFrame(() => {
    const { timeSec: t, terrain } = useAppStore.getState();
    const pose = cartPose(t);
    const wobble = stumbleEnvelope(t);
    const y = terrain.heightAt(pose.x, pose.z);

    const group = groupRef.current;
    if (group) {
      group.position.set(pose.x, y - wobble * 0.05, pose.z);
      group.rotation.set(0, pose.yaw, wobble * 0.09 * Math.sin(t * 22));
    }
    const oxL = oxLeftRef.current;
    const oxR = oxRightRef.current;
    if (oxL) {
      oxL.position.set(-1.15, -wobble * 0.06, -0.22);
      oxL.rotation.z = wobble * 0.15 * Math.sin(t * 26);
    }
    if (oxR) {
      oxR.position.set(-1.15, -wobble * 0.06, 0.22);
      oxR.rotation.z = wobble * 0.15 * Math.sin(t * 26 + 0.6);
    }
  });

  return (
    <group ref={groupRef}>
      <mesh geometry={cartGeo} castShadow={shadows} receiveShadow>
        <meshStandardMaterial color="#7a5a35" roughness={0.9} />
      </mesh>
      <group position={[0, 0.68, 0]}>
        <Ark shadows={shadows} />
      </group>
      <mesh ref={oxLeftRef} geometry={oxGeo} castShadow={shadows}>
        <meshStandardMaterial color="#5c4630" roughness={1} />
      </mesh>
      <mesh ref={oxRightRef} geometry={oxGeo} castShadow={shadows}>
        <meshStandardMaterial color="#6b5138" roughness={1} />
      </mesh>
    </group>
  );
}
