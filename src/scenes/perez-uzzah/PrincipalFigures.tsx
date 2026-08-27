import { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { useAppStore } from '../../state/store';
import { buildCharacterRig, jointPositions, type CharacterParams } from '../../engine/characters';
import { OBED_EDOM_POS } from './layout';
import { ahioPose, cartPose, davidPose, uzzahPose } from './poses';

/**
 * David, Uzzah, Ahio, and Obed-edom (`claim-ark-procession-departure`,
 * `claim-uzzah-death`, `claim-david-fear-diversion`, `claim-obed-edom-
 * blessing`) — principal-detail rigs (ADR-010), posed as rigid groups
 * driven entirely by the pure pose functions in `./poses.ts`, never
 * bone-driven skeletal animation.
 *
 * Uzzah's reach (6:6, "put out his hand and took hold of the ark") is the
 * text's own specific, non-graphic gesture — shown as a separate, static
 * "reaching arm" overlay mesh, cross-faded by visibility (the gibeon-pool
 * `reverseGrip` convention: a discrete gesture, not a continuous blend),
 * never penetration or wound geometry. His fall (6:7) is a whole-body
 * collapse transform only (the Asahel/`gibeon-pool` precedent) — **no
 * light, glow, wind, or camera language stands in for the divine strike
 * anywhere in this file** (ADR-013): nothing here reads `violenceMode` for
 * anything but which of Uzzah's own two states (reach-and-fall, or fade)
 * renders, per `uzzahPose`'s own queue #25 constraints.
 */

const DAVID_PARAMS: CharacterParams = {
  stature: 1.7,
  build: 0.55,
  shoulders: 1.02,
  skinColor: '#8f5b3d',
  hairColor: '#1f1712',
  beard: true,
  detail: 'principal',
  dress: { tunicColor: '#7a3b2e', beltColor: '#3b2416', headwear: 'bare' },
};

const UZZAH_STATURE = 1.72;
const UZZAH_PARAMS: CharacterParams = {
  stature: UZZAH_STATURE,
  build: 0.52,
  shoulders: 0.98,
  skinColor: '#a66d48',
  hairColor: '#2b1d14',
  beard: true,
  detail: 'principal',
  dress: { tunicColor: '#9d8358', beltColor: '#3b2416', headwear: 'bare' },
};

const AHIO_PARAMS: CharacterParams = {
  stature: 1.68,
  build: 0.5,
  shoulders: 0.96,
  skinColor: '#8f5b3d',
  hairColor: '#241a12',
  beard: false,
  detail: 'principal',
  dress: { tunicColor: '#c2ad82', beltColor: '#3b2416', headwear: 'bare' },
};

const OBED_EDOM_PARAMS: CharacterParams = {
  stature: 1.66,
  build: 0.56,
  shoulders: 1,
  skinColor: '#75462f',
  hairColor: '#1f1712',
  beard: true,
  detail: 'principal',
  dress: {
    tunicColor: '#b69b6d',
    beltColor: '#5a3722',
    headwear: 'wrap',
    headwrapColor: '#8a7250',
  },
};

const UZZAH_LANE_OFFSET = -2.4;

/** A static "reaching arm" overlay — shoulder to an extended hand, built in
 * figure-local space from Uzzah's own joint positions. A discrete gesture
 * prop only, cross-faded by visibility (`reachExtend`), never a wound. */
function buildReachArmGeometry(): THREE.BufferGeometry {
  const j = jointPositions(UZZAH_STATURE);
  const shoulder = j.upperArmR;
  const hand = new THREE.Vector3(shoulder.x - 0.32, shoulder.y - 0.02, shoulder.z + 0.5);
  const dir = new THREE.Vector3().subVectors(hand, shoulder);
  const len = dir.length();
  const arm = new THREE.CapsuleGeometry(0.038, Math.max(len - 0.076, 0.02), 3, 6);
  const quat = new THREE.Quaternion().setFromUnitVectors(
    new THREE.Vector3(0, 1, 0),
    dir.clone().normalize(),
  );
  arm.applyQuaternion(quat);
  const mid = new THREE.Vector3().addVectors(shoulder, hand).multiplyScalar(0.5);
  arm.translate(mid.x, mid.y, mid.z);
  return arm;
}

export function PrincipalFigures({ shadows }: { shadows: boolean }) {
  const davidGeo = useMemo(() => buildCharacterRig(DAVID_PARAMS).geometry, []);
  const uzzahGeo = useMemo(() => buildCharacterRig(UZZAH_PARAMS).geometry, []);
  const ahioGeo = useMemo(() => buildCharacterRig(AHIO_PARAMS).geometry, []);
  const obedEdomGeo = useMemo(() => buildCharacterRig(OBED_EDOM_PARAMS).geometry, []);
  const reachArmGeo = useMemo(() => buildReachArmGeometry(), []);

  const davidRef = useRef<THREE.Group>(null);
  const uzzahRef = useRef<THREE.Group>(null);
  const reachArmRef = useRef<THREE.Mesh>(null);
  const ahioRef = useRef<THREE.Group>(null);

  const terrain = useAppStore((s) => s.terrain);
  const obedEdomPos = useMemo(
    () =>
      [
        OBED_EDOM_POS[0] + 3.4,
        terrain.heightAt(OBED_EDOM_POS[0] + 3.4, OBED_EDOM_POS[1] - 2.6),
        OBED_EDOM_POS[1] - 2.6,
      ] as const,
    [terrain],
  );

  useFrame(() => {
    const { timeSec: t, terrain: currentTerrain, violenceMode } = useAppStore.getState();

    const ark = cartPose(t);

    const david = davidRef.current;
    if (david) {
      const pose = davidPose(t, [ark.x, ark.z]);
      david.position.set(pose.x, currentTerrain.heightAt(pose.x, pose.z), pose.z);
      david.rotation.set(0, pose.yaw, 0);
    }

    const uzzah = uzzahRef.current;
    if (uzzah) {
      const pose = uzzahPose(t, violenceMode, UZZAH_LANE_OFFSET);
      const settle = pose.fallen * 0.12;
      uzzah.position.set(pose.x, currentTerrain.heightAt(pose.x, pose.z) - settle, pose.z);
      uzzah.rotation.set(-pose.fallen * 1.3, pose.yaw, 0);
      const squash = 1 - pose.fallen * 0.5;
      const fadeScale = 1 - pose.fade;
      uzzah.scale.set(fadeScale, squash * fadeScale, fadeScale);
      uzzah.visible = pose.fade < 0.98;
      if (reachArmRef.current) reachArmRef.current.visible = pose.reachExtend >= 0.5;
    }

    const ahio = ahioRef.current;
    if (ahio) {
      const pose = ahioPose(t);
      ahio.position.set(pose.x, currentTerrain.heightAt(pose.x, pose.z), pose.z);
      ahio.rotation.set(0, pose.yaw, 0);
    }
  });

  return (
    <group>
      <group ref={davidRef}>
        <mesh geometry={davidGeo} castShadow={shadows}>
          <meshStandardMaterial vertexColors roughness={1} />
        </mesh>
      </group>
      <group ref={uzzahRef}>
        <mesh geometry={uzzahGeo} castShadow={shadows}>
          <meshStandardMaterial vertexColors roughness={1} />
        </mesh>
        <mesh ref={reachArmRef} geometry={reachArmGeo} castShadow={shadows}>
          <meshStandardMaterial color={UZZAH_PARAMS.skinColor} roughness={1} />
        </mesh>
      </group>
      <group ref={ahioRef}>
        <mesh geometry={ahioGeo} castShadow={shadows}>
          <meshStandardMaterial vertexColors roughness={1} />
        </mesh>
      </group>
      <group position={[obedEdomPos[0], obedEdomPos[1], obedEdomPos[2]]}>
        <mesh geometry={obedEdomGeo} castShadow={shadows}>
          <meshStandardMaterial vertexColors roughness={1} />
        </mesh>
      </group>
    </group>
  );
}
