import { useMemo } from 'react';
import * as THREE from 'three';
import { useAppStore } from '../../state/store';
import { mulberry32 } from '../../engine/noise';
import {
  buildCrowdLimbedGeometry,
  TUNIC_PALETTE,
  type CharacterParams,
} from '../../engine/characters';
import { OBED_EDOM_HOUSE_SPEC, OBED_EDOM_HOUSEHOLD_SLOTS } from './layout';

/**
 * Obed-edom's own modest household structure and household (~5-10 at high
 * tier, static, claim-ark-procession-cast-scale) at the diversion point
 * (b-diversion, b-blessing-obed-edom, 6:10-11). No LocationEntry, no atlas
 * pin — the house's position is a disclosed placeholder within this scene's
 * own terrain (see layout.ts).
 */

const dummy = new THREE.Object3D();
const tmpColor = new THREE.Color();

const HOUSEHOLD_PARAMS: CharacterParams = {
  stature: 1.66,
  build: 0.5,
  shoulders: 0.94,
  skinColor: '#8f5b3d',
  hairColor: '#241a12',
  beard: true,
  detail: 'crowd',
  dress: { tunicColor: TUNIC_PALETTE[0], beltColor: '#3b2416', headwear: 'bare' },
};

export function ObedEdomHouse({
  householdCount,
  shadows,
}: {
  householdCount: number;
  shadows: boolean;
}) {
  const terrain = useAppStore((s) => s.terrain);
  const h = OBED_EDOM_HOUSE_SPEC;
  const y = terrain.heightAt(h.x, h.z);
  const householdGeo = useMemo(() => buildCrowdLimbedGeometry(HOUSEHOLD_PARAMS), []);

  const householdMatrices = useMemo(() => {
    const rng = mulberry32(260608);
    const out: { matrix: THREE.Matrix4; color: THREE.Color }[] = [];
    for (let i = 0; i < householdCount; i++) {
      const [x, z] = OBED_EDOM_HOUSEHOLD_SLOTS[i % OBED_EDOM_HOUSEHOLD_SLOTS.length];
      const yy = terrain.heightAt(x, z);
      dummy.position.set(x, yy, z);
      dummy.rotation.set(0, rng() * Math.PI * 2, 0);
      dummy.scale.setScalar(0.92 + rng() * 0.12);
      dummy.updateMatrix();
      tmpColor.setRGB(1, 1, 1).offsetHSL(0, 0, (rng() - 0.5) * 0.12);
      out.push({ matrix: dummy.matrix.clone(), color: tmpColor.clone() });
    }
    return out;
  }, [householdCount, terrain]);

  return (
    <group>
      <mesh
        position={[h.x, y + 0.15, h.z]}
        rotation={[0, h.rot, 0]}
        receiveShadow
        castShadow={shadows}
      >
        <boxGeometry args={[h.w + 0.25, 0.3, h.d + 0.25]} />
        <meshStandardMaterial color="#c7b48c" roughness={1} />
      </mesh>
      <mesh
        position={[h.x, y + 0.3 + h.h / 2, h.z]}
        rotation={[0, h.rot, 0]}
        receiveShadow
        castShadow={shadows}
      >
        <boxGeometry args={[h.w, h.h, h.d]} />
        <meshStandardMaterial color="#d8c9a3" roughness={0.95} />
      </mesh>
      <mesh
        position={[h.x, y + 0.3 + h.h + 0.1, h.z]}
        rotation={[0, h.rot, 0]}
        castShadow={shadows}
      >
        <boxGeometry args={[h.w + 0.4, 0.2, h.d + 0.4]} />
        <meshStandardMaterial color="#bfa878" roughness={0.9} />
      </mesh>

      <instancedMesh
        args={[householdGeo, undefined, householdMatrices.length]}
        frustumCulled={false}
        castShadow={shadows}
        ref={(el) => {
          if (!el) return;
          householdMatrices.forEach(({ matrix }, i) => el.setMatrixAt(i, matrix));
          householdMatrices.forEach(({ color }, i) => el.setColorAt(i, color));
          el.instanceMatrix.needsUpdate = true;
          if (el.instanceColor) el.instanceColor.needsUpdate = true;
        }}
      >
        <meshStandardMaterial vertexColors roughness={1} />
      </instancedMesh>
    </group>
  );
}
