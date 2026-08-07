import { useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useAppStore } from '../../state/store';
import { mulberry32 } from '../../engine/noise';
import {
  buildCrowdLimbedGeometry,
  TUNIC_PALETTE,
  type CharacterParams,
} from '../../engine/characters';
import { buildAttendantSlots, DAVID_RECEIVING_POS } from './layout';

/**
 * David's attendants (`claim-reckoning-cast-scale`) — the "young men" 4:12a
 * attributes the execution to, a disclosed ≈8-14-figure design count at high
 * quality tier. Present near the receiving ground throughout, fully static
 * (baked once, same convention as hebron-gate's TownBackground.tsx): the
 * execution itself is staged as Rechab and Baanah's own collapse
 * (`PrincipalFigures.tsx`), not as a visible attendant strike — the text
 * gives no method or gesture to show, so none is invented, and this group
 * never travels to the pool.
 */

const ATTENDANT_PARAMS: CharacterParams = {
  stature: 1.71,
  build: 0.5,
  shoulders: 1.0,
  skinColor: '#8f5b3d',
  hairColor: '#1f1712',
  beard: true,
  detail: 'crowd',
  dress: { tunicColor: TUNIC_PALETTE[1], beltColor: '#3b2416', headwear: 'bare' },
};

interface AttendantFigure {
  x: number;
  z: number;
  yaw: number;
  scale: number;
  color: THREE.Color;
}

export function buildAttendantFigures(count: number, seed = 45102): AttendantFigure[] {
  const rng = mulberry32(seed);
  const slots = buildAttendantSlots(count);
  const color = new THREE.Color();
  const out: AttendantFigure[] = [];
  for (let i = 0; i < count; i++) {
    const [x, z] = slots[i % slots.length];
    color.setRGB(1, 1, 1).offsetHSL(0, 0, (rng() - 0.5) * 0.12);
    out.push({
      x,
      z,
      yaw: Math.atan2(DAVID_RECEIVING_POS[0] - x, DAVID_RECEIVING_POS[1] - z),
      scale: 0.92 + rng() * 0.14,
      color: color.clone(),
    });
  }
  return out;
}

export function Attendants({ count, shadows }: { count: number; shadows: boolean }) {
  const terrain = useAppStore((s) => s.terrain);
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const geometry = useMemo(() => buildCrowdLimbedGeometry(ATTENDANT_PARAMS), []);
  const figures = useMemo(() => buildAttendantFigures(count), [count]);

  useEffect(() => {
    const mesh = meshRef.current;
    if (!mesh) return;
    const dummy = new THREE.Object3D();
    for (let i = 0; i < figures.length; i++) {
      const fig = figures[i];
      const y = terrain.heightAt(fig.x, fig.z);
      dummy.position.set(fig.x, y, fig.z);
      dummy.rotation.set(0, fig.yaw, 0);
      dummy.scale.setScalar(fig.scale);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
      mesh.setColorAt(i, fig.color);
    }
    mesh.instanceMatrix.needsUpdate = true;
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
  }, [figures, terrain]);

  return (
    <instancedMesh
      ref={meshRef}
      args={[geometry, undefined, figures.length]}
      frustumCulled={false}
      castShadow={shadows}
    >
      <meshStandardMaterial vertexColors roughness={1} />
    </instancedMesh>
  );
}
