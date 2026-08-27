import { useMemo } from 'react';
import * as THREE from 'three';
import { useAppStore } from '../../state/store';
import { mulberry32 } from '../../engine/noise';
import {
  buildCrowdLimbedGeometry,
  TUNIC_PALETTE,
  type CharacterParams,
} from '../../engine/characters';
import {
  ABINADAB_HOUSE_SPEC,
  KIRIATH_JEARIM_AMBIENT_SLOTS,
  KIRIATH_JEARIM_HOUSES,
  type HouseSpec,
} from './layout';

/**
 * Kiriath-jearim's own house massing (claim-kiriath-jearim-form) — a modest
 * hill cluster, comparative to the four-room/pillared house form
 * (king-stager-2001), no wall or gate asserted. The house of Abinadab
 * itself (`ABINADAB_HOUSE_SPEC`) is rendered slightly larger, distinct from
 * the ambient scatter. Ambient townspeople (~10-20 at high tier, static,
 * claim-ark-procession-cast-scale) are baked once (no per-frame cost) — this
 * is background presence, not a staged crowd with its own beats.
 */

const dummy = new THREE.Object3D();
const tmpColor = new THREE.Color();

function buildHouseMatrices(
  houses: HouseSpec[],
  terrain: ReturnType<typeof useAppStore.getState>['terrain'],
) {
  const rng = mulberry32(260606);
  const socle: THREE.Matrix4[] = [];
  const wall: THREE.Matrix4[] = [];
  const roof: THREE.Matrix4[] = [];
  const socleColor: THREE.Color[] = [];
  const wallColor: THREE.Color[] = [];
  const roofColor: THREE.Color[] = [];
  for (const h of houses) {
    const y = terrain.heightAt(h.x, h.z);

    dummy.position.set(h.x, y + 0.15, h.z);
    dummy.rotation.set(0, h.rot, 0);
    dummy.scale.set(h.w + 0.25, 0.3, h.d + 0.25);
    dummy.updateMatrix();
    socle.push(dummy.matrix.clone());
    tmpColor.setHSL(0.09, 0.06 + rng() * 0.03, 0.5 + rng() * 0.08);
    socleColor.push(tmpColor.clone());

    dummy.position.set(h.x, y + 0.3 + h.h / 2, h.z);
    dummy.rotation.set(0, h.rot, 0);
    dummy.scale.set(h.w, h.h, h.d);
    dummy.updateMatrix();
    wall.push(dummy.matrix.clone());
    tmpColor.setHSL(0.1, 0.18 + rng() * 0.06, 0.68 + rng() * 0.08);
    wallColor.push(tmpColor.clone());

    dummy.position.set(h.x, y + 0.3 + h.h + 0.1, h.z);
    dummy.rotation.set(0, h.rot, 0);
    dummy.scale.set(h.w + 0.4, 0.2, h.d + 0.4);
    dummy.updateMatrix();
    roof.push(dummy.matrix.clone());
    tmpColor.setHSL(0.09, 0.16 + rng() * 0.05, 0.6 + rng() * 0.07);
    roofColor.push(tmpColor.clone());
  }
  return { socle, wall, roof, socleColor, wallColor, roofColor };
}

const AMBIENT_PARAMS: CharacterParams = {
  stature: 1.68,
  build: 0.5,
  shoulders: 0.96,
  skinColor: '#8f5b3d',
  hairColor: '#1f1712',
  beard: true,
  detail: 'crowd',
  dress: { tunicColor: TUNIC_PALETTE[2], beltColor: '#3b2416', headwear: 'bare' },
};

export function KiriathJearimTown({
  ambientCount,
  shadows,
}: {
  ambientCount: number;
  shadows: boolean;
}) {
  const terrain = useAppStore((s) => s.terrain);
  const houses = useMemo(() => [ABINADAB_HOUSE_SPEC, ...KIRIATH_JEARIM_HOUSES], []);
  const matrices = useMemo(() => buildHouseMatrices(houses, terrain), [houses, terrain]);
  const ambientGeo = useMemo(() => buildCrowdLimbedGeometry(AMBIENT_PARAMS), []);

  const ambientMatrices = useMemo(() => {
    const rng = mulberry32(260607);
    const out: { matrix: THREE.Matrix4; color: THREE.Color }[] = [];
    for (let i = 0; i < ambientCount; i++) {
      const [x, z] = KIRIATH_JEARIM_AMBIENT_SLOTS[i % KIRIATH_JEARIM_AMBIENT_SLOTS.length];
      const y = terrain.heightAt(x, z);
      dummy.position.set(x, y, z);
      dummy.rotation.set(0, rng() * Math.PI * 2, 0);
      dummy.scale.setScalar(0.94 + rng() * 0.1);
      dummy.updateMatrix();
      tmpColor.setRGB(1, 1, 1).offsetHSL(0, 0, (rng() - 0.5) * 0.12);
      out.push({ matrix: dummy.matrix.clone(), color: tmpColor.clone() });
    }
    return out;
  }, [ambientCount, terrain]);

  return (
    <group>
      <instancedMesh
        args={[undefined, undefined, houses.length]}
        frustumCulled={false}
        castShadow={shadows}
        receiveShadow
        ref={(el) => {
          if (!el) return;
          matrices.socle.forEach((m, i) => el.setMatrixAt(i, m));
          matrices.socleColor.forEach((c, i) => el.setColorAt(i, c));
          el.instanceMatrix.needsUpdate = true;
          if (el.instanceColor) el.instanceColor.needsUpdate = true;
        }}
      >
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial vertexColors roughness={1} />
      </instancedMesh>
      <instancedMesh
        args={[undefined, undefined, houses.length]}
        frustumCulled={false}
        castShadow={shadows}
        receiveShadow
        ref={(el) => {
          if (!el) return;
          matrices.wall.forEach((m, i) => el.setMatrixAt(i, m));
          matrices.wallColor.forEach((c, i) => el.setColorAt(i, c));
          el.instanceMatrix.needsUpdate = true;
          if (el.instanceColor) el.instanceColor.needsUpdate = true;
        }}
      >
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial vertexColors roughness={0.95} />
      </instancedMesh>
      <instancedMesh
        args={[undefined, undefined, houses.length]}
        frustumCulled={false}
        castShadow={shadows}
        ref={(el) => {
          if (!el) return;
          matrices.roof.forEach((m, i) => el.setMatrixAt(i, m));
          matrices.roofColor.forEach((c, i) => el.setColorAt(i, c));
          el.instanceMatrix.needsUpdate = true;
          if (el.instanceColor) el.instanceColor.needsUpdate = true;
        }}
      >
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial vertexColors roughness={0.9} />
      </instancedMesh>

      <instancedMesh
        args={[ambientGeo, undefined, ambientMatrices.length]}
        frustumCulled={false}
        castShadow={shadows}
        ref={(el) => {
          if (!el) return;
          ambientMatrices.forEach(({ matrix }, i) => el.setMatrixAt(i, matrix));
          ambientMatrices.forEach(({ color }, i) => el.setColorAt(i, color));
          el.instanceMatrix.needsUpdate = true;
          if (el.instanceColor) el.instanceColor.needsUpdate = true;
        }}
      >
        <meshStandardMaterial vertexColors roughness={1} />
      </instancedMesh>
    </group>
  );
}
