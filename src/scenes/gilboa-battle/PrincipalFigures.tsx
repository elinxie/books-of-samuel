import { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { useAppStore } from '../../state/store';
import { buildCharacterRig, type CharacterParams } from '../../engine/characters';
import { armorBearerPose, lerp, saulPose, sonFallPose } from './poses';
import { buildShieldGeometry, buildSpearGeometry } from './kitMeshes';

/**
 * Named-figure crest group (M3 Step 3): Saul, Jonathan, Abinadab, Malchi-
 * shua, and the armor-bearer, held together as the composition's still
 * center at the ridge crest (`terrain.ts` origin) per the brief's "Focal
 * masses" (a). Principal-detail rigs per ADR-010 (asset-david-marker
 * pattern extended to `asset-saul-marker`), posed as rigid groups whose
 * position stays fixed at the crest — pose changes are body-orientation/
 * collapse transforms (rotation + non-uniform scale) driven by the pure
 * pose functions in `./poses.ts` (asset-figure-fallen), never a new mesh
 * and never wound geometry. See docs/design/gilboa-battle-brief.md, "Camera
 * / observer experience".
 *
 * M3 Step 4 adds military-kit attachment meshes (spear + oval shield) on
 * all five named figures — "marginally more kit as principals" per the
 * brief's "Dress review" (`claim-israelite-muster-kit`). Kit instances are
 * written from the SAME group matrix the body pose uses each frame, so a
 * spear in a kneeling Saul's hand follows his kneel rather than floating in
 * the standing position. No Israelite sword — the brief specifies straight
 * swords for Philistines only.
 */

/** Fixed crest-cluster offsets (x, z) from the ridge crest at the origin. */
const SAUL_POS: [number, number] = [0, 0];
const JONATHAN_POS: [number, number] = [-2.4, 1.8];
const ABINADAB_POS: [number, number] = [2.6, 1.3];
const MALCHI_SHUA_POS: [number, number] = [1.1, -2.4];
const ARMOR_BEARER_POS: [number, number] = [-1.6, -1.9];

const SAUL_PARAMS: CharacterParams = {
  stature: 1.74,
  build: 0.6,
  shoulders: 1.05,
  skinColor: '#8f5b3d',
  hairColor: '#1f1712',
  beard: true,
  detail: 'principal',
  dress: {
    tunicColor: '#5a3b52',
    cloakColor: '#3f2a3a',
    beltColor: '#3b2416',
    headwear: 'wrap',
    headwrapColor: '#cbb98c',
  },
};

const JONATHAN_PARAMS: CharacterParams = {
  stature: 1.7,
  build: 0.5,
  shoulders: 0.98,
  skinColor: '#a66d48',
  hairColor: '#2b1d14',
  beard: true,
  detail: 'principal',
  dress: { tunicColor: '#7a3b2e', beltColor: '#3b2416', headwear: 'bare' },
};

const ABINADAB_PARAMS: CharacterParams = {
  stature: 1.68,
  build: 0.48,
  shoulders: 0.96,
  skinColor: '#8f5b3d',
  hairColor: '#1f1712',
  beard: true,
  detail: 'principal',
  dress: { tunicColor: '#6d5138', beltColor: '#5a3722', headwear: 'bare' },
};

const MALCHI_SHUA_PARAMS: CharacterParams = {
  stature: 1.66,
  build: 0.45,
  shoulders: 0.94,
  skinColor: '#75462f',
  hairColor: '#2b1d14',
  beard: true,
  detail: 'principal',
  dress: { tunicColor: '#9d8358', beltColor: '#3b2416', headwear: 'bare' },
};

const ARMOR_BEARER_PARAMS: CharacterParams = {
  stature: 1.65,
  build: 0.55,
  shoulders: 1.0,
  skinColor: '#a66d48',
  hairColor: '#1f1712',
  beard: true,
  detail: 'principal',
  dress: { tunicColor: '#b69b6d', beltColor: '#5a3722', headwear: 'wrap', headwrapColor: '#d1c09a' },
};

function useRigGeometry(params: CharacterParams): THREE.BufferGeometry {
  return useMemo(() => buildCharacterRig(params).geometry, [params]);
}

/** A single representative stature for the shared principal-kit geometry
 * (an InstancedMesh needs one geometry for all five instances; the ~4cm
 * spread across the five actual statures is negligible at this fidelity). */
const PRINCIPAL_KIT_STATURE = 1.7;
const PRINCIPAL_COUNT = 5;

export function PrincipalFigures({ shadows }: { shadows: boolean }) {
  const saulGeo = useRigGeometry(SAUL_PARAMS);
  const jonathanGeo = useRigGeometry(JONATHAN_PARAMS);
  const abinadabGeo = useRigGeometry(ABINADAB_PARAMS);
  const malchiShuaGeo = useRigGeometry(MALCHI_SHUA_PARAMS);
  const armorBearerGeo = useRigGeometry(ARMOR_BEARER_PARAMS);
  const spearGeo = useMemo(() => buildSpearGeometry(PRINCIPAL_KIT_STATURE, 'handR'), []);
  const shieldGeo = useMemo(
    () => buildShieldGeometry(PRINCIPAL_KIT_STATURE, 'oval', 'handL'),
    [],
  );

  const saulRef = useRef<THREE.Group>(null);
  const jonathanRef = useRef<THREE.Group>(null);
  const abinadabRef = useRef<THREE.Group>(null);
  const malchiShuaRef = useRef<THREE.Group>(null);
  const armorBearerRef = useRef<THREE.Group>(null);
  const spearMeshRef = useRef<THREE.InstancedMesh>(null);
  const shieldMeshRef = useRef<THREE.InstancedMesh>(null);

  // Facing toward Saul, the group's visual center — fixed baseline yaw for
  // each figure (positions never move; only the pose transform changes).
  const jonathanBaseYaw = Math.atan2(
    SAUL_POS[0] - JONATHAN_POS[0],
    SAUL_POS[1] - JONATHAN_POS[1],
  );
  const abinadabBaseYaw = Math.atan2(
    SAUL_POS[0] - ABINADAB_POS[0],
    SAUL_POS[1] - ABINADAB_POS[1],
  );
  const malchiShuaBaseYaw = Math.atan2(
    SAUL_POS[0] - MALCHI_SHUA_POS[0],
    SAUL_POS[1] - MALCHI_SHUA_POS[1],
  );
  const armorBearerBaseYaw = Math.atan2(
    SAUL_POS[0] - ARMOR_BEARER_POS[0],
    SAUL_POS[1] - ARMOR_BEARER_POS[1],
  );
  // The refusal beat's orientation change: Saul turns to face the armor-
  // bearer; the armor-bearer turns into a distinct recoiling stance rather
  // than his baseline (already-facing-Saul) pose. Both are gesture/
  // orientation changes only, never a strike.
  const saulToArmorBearerYaw = Math.atan2(
    ARMOR_BEARER_POS[0] - SAUL_POS[0],
    ARMOR_BEARER_POS[1] - SAUL_POS[1],
  );
  const armorBearerRefusalYawOffset = -0.9;

  useFrame(() => {
    const { timeSec: t, terrain, violenceMode } = useAppStore.getState();
    const spearMesh = spearMeshRef.current;
    const shieldMesh = shieldMeshRef.current;

    /**
     * Applies a fixed x/z position plus a fallen/kneel collapse transform,
     * then writes the SAME resulting matrix into the spear/shield kit
     * instances at `kitIndex` — the kit rides on top of the body pose
     * (kneel/fallen) rather than tracking it independently.
     */
    const apply = (
      ref: React.RefObject<THREE.Group | null>,
      kitIndex: number,
      [x, z]: [number, number],
      yaw: number,
      fallen: number,
      kneel = 0,
    ) => {
      const g = ref.current;
      if (!g) return;
      const settle = fallen * 0.12; // sinks slightly into the ground as it settles
      g.position.set(x, terrain.heightAt(x, z) - settle, z);
      g.rotation.set(kneel * 0.35 - fallen * 1.35, yaw, 0);
      const squash = 1 - kneel * 0.15 - fallen * 0.55;
      g.scale.set(1, squash, 1);
      g.updateMatrix();
      spearMesh?.setMatrixAt(kitIndex, g.matrix);
      shieldMesh?.setMatrixAt(kitIndex, g.matrix);
    };

    const saul = saulPose(t, violenceMode);
    const armorBearer = armorBearerPose(t, violenceMode);
    const jonathan = sonFallPose(t, violenceMode);
    const abinadab = sonFallPose(t, violenceMode);
    const malchiShua = sonFallPose(t, violenceMode);

    apply(
      saulRef,
      0,
      SAUL_POS,
      lerp(0, saulToArmorBearerYaw, saul.faceArmorBearer),
      saul.fallen,
      saul.kneel,
    );
    apply(jonathanRef, 1, JONATHAN_POS, jonathanBaseYaw, jonathan.fallen);
    apply(abinadabRef, 2, ABINADAB_POS, abinadabBaseYaw, abinadab.fallen);
    apply(malchiShuaRef, 3, MALCHI_SHUA_POS, malchiShuaBaseYaw, malchiShua.fallen);
    apply(
      armorBearerRef,
      4,
      ARMOR_BEARER_POS,
      armorBearerBaseYaw + armorBearerRefusalYawOffset * armorBearer.refusalTurn,
      armorBearer.fallen,
    );

    if (spearMesh) spearMesh.instanceMatrix.needsUpdate = true;
    if (shieldMesh) shieldMesh.instanceMatrix.needsUpdate = true;
  });

  return (
    <group>
      <group ref={saulRef}>
        <mesh geometry={saulGeo} castShadow={shadows}>
          <meshStandardMaterial vertexColors roughness={1} />
        </mesh>
      </group>
      <group ref={jonathanRef}>
        <mesh geometry={jonathanGeo} castShadow={shadows}>
          <meshStandardMaterial vertexColors roughness={1} />
        </mesh>
      </group>
      <group ref={abinadabRef}>
        <mesh geometry={abinadabGeo} castShadow={shadows}>
          <meshStandardMaterial vertexColors roughness={1} />
        </mesh>
      </group>
      <group ref={malchiShuaRef}>
        <mesh geometry={malchiShuaGeo} castShadow={shadows}>
          <meshStandardMaterial vertexColors roughness={1} />
        </mesh>
      </group>
      <group ref={armorBearerRef}>
        <mesh geometry={armorBearerGeo} castShadow={shadows}>
          <meshStandardMaterial vertexColors roughness={1} />
        </mesh>
      </group>
      <instancedMesh
        ref={spearMeshRef}
        args={[spearGeo, undefined, PRINCIPAL_COUNT]}
        frustumCulled={false}
        castShadow={shadows}
      >
        <meshStandardMaterial color="#7a5a35" roughness={0.9} />
      </instancedMesh>
      <instancedMesh
        ref={shieldMeshRef}
        args={[shieldGeo, undefined, PRINCIPAL_COUNT]}
        frustumCulled={false}
        castShadow={shadows}
      >
        <meshStandardMaterial color="#8a6a3f" roughness={0.85} />
      </instancedMesh>
    </group>
  );
}
