import { useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { useAppStore } from '../../state/store';
import { tokensPose } from './poses';

/**
 * The crown and armlet the messenger presents to David (2 Sam 1:10) — see
 * claim-royal-tokens, asset-royal-tokens. Two small hand-held/presented
 * props, not new large geometry (brief: "props, not crowds, carry royal
 * weight"). Exact form is unattested and stays design-placeholder; these are
 * simple primitive torus shapes, not a modeled regalia reconstruction.
 */
export function RoyalTokens({ shadows }: { shadows: boolean }) {
  const crownRef = useRef<THREE.Mesh>(null);
  const armletRef = useRef<THREE.Mesh>(null);

  useFrame(() => {
    const { timeSec: t, terrain } = useAppStore.getState();
    const pose = tokensPose(t);
    const y = terrain.heightAt(pose.x, pose.z) + 0.42;

    const crown = crownRef.current;
    if (crown) {
      crown.visible = pose.visible;
      crown.position.set(pose.x - 0.18, y, pose.z);
      crown.scale.setScalar(Math.max(pose.scale, 0.001));
    }
    const armlet = armletRef.current;
    if (armlet) {
      armlet.visible = pose.visible;
      armlet.position.set(pose.x + 0.2, y, pose.z);
      armlet.scale.setScalar(Math.max(pose.scale, 0.001));
    }
  });

  return (
    <group>
      <mesh ref={crownRef} rotation={[Math.PI / 2, 0, 0]} castShadow={shadows}>
        <torusGeometry args={[0.11, 0.025, 8, 16]} />
        <meshStandardMaterial color="#c9a227" roughness={0.4} metalness={0.6} />
      </mesh>
      <mesh ref={armletRef} rotation={[Math.PI / 2, 0.3, 0]} castShadow={shadows}>
        <torusGeometry args={[0.07, 0.018, 8, 16]} />
        <meshStandardMaterial color="#b8860b" roughness={0.45} metalness={0.55} />
      </mesh>
    </group>
  );
}
