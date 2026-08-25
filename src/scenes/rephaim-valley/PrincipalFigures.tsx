import { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { useAppStore } from '../../state/store';
import {
  buildCharacterRig,
  buildCrowdLimbedGeometry,
  TUNIC_PALETTE,
  type CharacterParams,
} from '../../engine/characters';
import { DAVID_INQUIRY_POS } from './layout';
import { davidPrincipalPose, davidsForcePose, type DavidForceFigureParams } from './poses';

/**
 * David (`david`, `claim-inquiry-depiction`) and the small, unnamed
 * inquiry group (`claim-rephaim-cast-scale`: "David + 3-4 unnamed figures")
 * — a tight cluster standing apart from the wider force at both inquiry
 * beats, no apparatus, no rite. Both ride `davidsForcePose` (./poses.ts)
 * through the same legs the wider force does, so David is always visibly
 * at the head of the column during the advance/circling beats — but with a
 * `holdOffset` of `[0, 0]` (David) or a small individual offset (the
 * companions), distinct from `DavidsForce.tsx`'s much wider rim spread.
 */

const DAVID_PARAMS: CharacterParams = {
  stature: 1.68,
  build: 0.55,
  shoulders: 1.0,
  skinColor: '#8f5b3d',
  hairColor: '#1f1712',
  beard: true,
  detail: 'principal',
  dress: { tunicColor: '#7a3b2e', beltColor: '#3b2416', headwear: 'bare' },
};

const COMPANION_PARAMS: CharacterParams = {
  stature: 1.72,
  build: 0.5,
  shoulders: 1,
  skinColor: '#8f5b3d',
  hairColor: '#1f1712',
  beard: false,
  detail: 'crowd',
  dress: { tunicColor: TUNIC_PALETTE[1], beltColor: '#3b2416', headwear: 'bare' },
};

/** Deliberately small (3-4 figures) — "a small, still, waiting group set
 * apart from the force" (brief's "Resolved design calls"), not a second
 * crowd. */
const COMPANION_OFFSETS: [number, number][] = [
  [-2.4, -1.6],
  [2.6, -1.1],
  [-1.7, 2.0],
  [2.1, 1.7],
];

function buildCompanions(): DavidForceFigureParams[] {
  return COMPANION_OFFSETS.map((holdOffset) => ({
    restSlot: DAVID_INQUIRY_POS,
    holdOffset,
    laneOffset: holdOffset[0],
  }));
}

const dummy = new THREE.Object3D();

export function PrincipalFigures({ shadows }: { shadows: boolean }) {
  const davidGeo = useMemo(() => buildCharacterRig(DAVID_PARAMS).geometry, []);
  const companionGeo = useMemo(() => buildCrowdLimbedGeometry(COMPANION_PARAMS), []);
  const davidRef = useRef<THREE.Group>(null);
  const companionMeshRef = useRef<THREE.InstancedMesh>(null);
  const companions = useMemo(() => buildCompanions(), []);

  useFrame(() => {
    const { timeSec: t, terrain } = useAppStore.getState();
    const david = davidRef.current;
    if (david) {
      const d = davidPrincipalPose(t);
      const y = terrain.heightAt(d.x, d.z);
      david.position.set(d.x, y, d.z);
      david.rotation.set(0, d.yaw, 0);
    }
    const companionMesh = companionMeshRef.current;
    if (companionMesh) {
      for (let i = 0; i < companions.length; i++) {
        const pose = davidsForcePose(t, companions[i]);
        const y = terrain.heightAt(pose.x, pose.z);
        dummy.position.set(pose.x, y, pose.z);
        dummy.rotation.set(0, pose.yaw, 0);
        dummy.scale.setScalar(1);
        dummy.updateMatrix();
        companionMesh.setMatrixAt(i, dummy.matrix);
      }
      companionMesh.instanceMatrix.needsUpdate = true;
    }
  });

  return (
    <group>
      <group ref={davidRef}>
        <mesh geometry={davidGeo} castShadow={shadows}>
          <meshStandardMaterial vertexColors roughness={1} />
        </mesh>
      </group>
      <instancedMesh
        ref={companionMeshRef}
        args={[companionGeo, undefined, companions.length]}
        frustumCulled={false}
        castShadow={shadows}
      >
        <meshStandardMaterial vertexColors roughness={1} />
      </instancedMesh>
    </group>
  );
}
