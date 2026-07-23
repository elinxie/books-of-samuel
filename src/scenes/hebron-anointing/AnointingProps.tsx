import { useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { useAppStore } from '../../state/store';
import { ELDER_PLAZA_POS } from './layout';
import { anointingPourEnvelope } from './poses';

/**
 * The anointing horn (new asset-anointing-props, claim-anointing-rite-form):
 * a single small primitive vessel the elder tilts near David during the
 * pour gesture. 2 Samuel 2:4 narrates the fact of anointing only, not the
 * vessel; the horn shape echoes 1 Samuel 16:13's "horn of oil" at David's
 * earlier, private anointing by Samuel — the most textually grounded prop
 * choice available, not an assertion that 2:4 itself names a horn.
 */
export function AnointingProps({ shadows }: { shadows: boolean }) {
  const hornRef = useRef<THREE.Mesh>(null);

  useFrame(() => {
    const { timeSec: t, terrain } = useAppStore.getState();
    const pour = anointingPourEnvelope(t);
    const horn = hornRef.current;
    if (!horn) return;
    const x = ELDER_PLAZA_POS[0] - 1.1;
    const z = ELDER_PLAZA_POS[1] + 1.4;
    const y = terrain.heightAt(x, z) + 1.5;
    horn.visible = pour > 0.01;
    horn.position.set(x, y, z);
    // A brief downward tilt over David's head as the pour gesture plays.
    horn.rotation.set(Math.PI / 2 - pour * 0.9, 0, pour * 0.15);
  });

  return (
    <mesh ref={hornRef} castShadow={shadows}>
      <coneGeometry args={[0.09, 0.42, 10, 1, true]} />
      <meshStandardMaterial
        color="#5a4326"
        roughness={0.55}
        metalness={0.15}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}
