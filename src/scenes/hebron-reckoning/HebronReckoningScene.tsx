import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { useFrame, useThree } from '@react-three/fiber';
import { Sky } from '@react-three/drei';
import { useAppStore } from '../../state/store';
import { QUALITY_PROFILES } from '../../engine/quality';
import { ObserverControls } from '../../engine/ObserverControls';
import { SCENES_BY_ID } from '../../data/scenes';
import { GroundWorks } from './GroundWorks';
import { Vegetation } from '../hebron-anointing/Vegetation';
import { TerraceWalls } from '../hebron-anointing/TerraceWalls';
import { TownAndPlaza } from '../hebron-anointing/TownAndPlaza';
import { TownAmbient } from '../hebron-gate/TownAmbient';
import { TombGround } from '../hebron-gate/TombGround';
import { Attendants } from './Attendants';
import { PrincipalFigures } from './PrincipalFigures';
import { HeadBundle } from './HeadBundle';
import { morningBlend } from './poses';
import { HEBRON_RECKONING_ENTITIES } from './entities';
import { EntityLabel } from '../../ui/scene/EntityLabel';

const SCENE = SCENES_BY_ID.get('hebron-reckoning')!;

/**
 * Ish-bosheth's assassination (narrated only) and David's judgment on
 * Rechab and Baanah, days after hebron-gate (2 Samuel 4). See
 * docs/design/hebron-reckoning-brief.md. Third and last M5 scene, closing
 * the milestone at the tomb of Abner — the same ground `hebron-gate` built,
 * days apart, the milestone's closing image.
 *
 * This is ADR-009's named-character-killing template's third application,
 * and its first judicial one — stricter than the two prior applications
 * (see poses.ts's file comment): no gesture is ever invented for the
 * execution itself, and the hands-and-feet display (4:12a) renders in no
 * mode, as caption text only — not even a shrouded/wrapped-form stand-in.
 *
 * Terrain/town/terrace/ambient-town assets are all reused directly from
 * hebron-anointing/hebron-gate (continuity, not a re-invented Hebron); the
 * tomb ground is the literal same ground hebron-gate built (`TombGround`,
 * imported directly). The one new structure is the pool of Hebron
 * (`GroundWorks.tsx`, `asset-hebron-pool-basin`), modeled on gibeon-pool's
 * own basin conventions. `morningBlend` carries the scene's one disclosed
 * lighting choice (first-light arrival, per the brief).
 */

function TimelineDriver({ durationSec }: { durationSec: number }) {
  useFrame((_, dt) => {
    const s = useAppStore.getState();
    if (s.playing) s.advanceTime(Math.min(dt, 0.1), durationSec);
  });
  return null;
}

function CameraFar({ far }: { far: number }) {
  const camera = useThree((s) => s.camera);
  useEffect(() => {
    camera.far = far;
    camera.updateProjectionMatrix();
  }, [camera, far]);
  return null;
}

function SceneEnvironment() {
  const quality = useAppStore((s) => s.quality);
  const profile = QUALITY_PROFILES[quality];
  const lightRef = useRef<THREE.DirectionalLight>(null);

  useFrame(() => {
    const light = lightRef.current;
    if (!light) return;
    const { timeSec } = useAppStore.getState();
    const blend = morningBlend(timeSec);
    light.intensity = 1.4 + blend * 0.25;
    light.color.setHSL(0.1 + blend * 0.03, 0.55 + blend * 0.15, 0.72 - blend * 0.1);
    light.position.set(420 - blend * 250, 640 - blend * 380, 260 + blend * 200);
  });

  return (
    <>
      <color attach="background" args={['#dfe3dc']} />
      <fog attach="fog" args={['#dfe3dc', profile.fogNear, profile.fogFar]} />
      {profile.useSkyShader && (
        <Sky
          distance={45000}
          sunPosition={[420, 640, 260]}
          turbidity={2.6}
          rayleigh={2.1}
          mieCoefficient={0.005}
          mieDirectionalG={0.78}
        />
      )}
      <hemisphereLight args={['#eef0e6', '#7c8256', 0.6]} />
      <directionalLight
        ref={lightRef}
        position={[420, 640, 260]}
        intensity={1.4}
        color="#fff8e4"
        castShadow={profile.shadows}
        shadow-mapSize-width={profile.shadowMapSize}
        shadow-mapSize-height={profile.shadowMapSize}
        shadow-camera-left={-180}
        shadow-camera-right={180}
        shadow-camera-top={180}
        shadow-camera-bottom={-180}
        shadow-camera-far={900}
        shadow-bias={-0.0004}
      />
      <ambientLight intensity={0.26} />
      <CameraFar far={profile.cameraFar} />
    </>
  );
}

export function HebronReckoningScene() {
  const quality = useAppStore((s) => s.quality);
  const showLabels = useAppStore((s) => s.showLabels);
  const profile = QUALITY_PROFILES[quality];

  // Disclosed design counts (claim-reckoning-cast-scale): attendants ~8-14,
  // ambient town ~10-20 at high tier — with the three named principals
  // (David, Rechab, Baanah), a high-tier total of roughly 20-35 figures, by
  // far the smallest cast of any M5 scene (the brief's "Scale assumptions").
  const attendantCount = Math.max(8, Math.min(14, Math.round(profile.figureCount * 0.17)));
  const townAmbientCount = Math.max(10, Math.min(20, Math.round(profile.figureCount * 0.26)));

  return (
    <>
      <SceneEnvironment />
      <GroundWorks />
      <Vegetation
        key={`veg-${quality}`}
        shrubCount={profile.vegetationCount}
        rockCount={profile.rockCount}
        treeCount={profile.treeCount}
      />
      <TerraceWalls shadows={profile.shadows} />
      <TownAndPlaza shadows={profile.shadows} />
      <TombGround shadows={profile.shadows} />
      <Attendants count={attendantCount} shadows={profile.shadows} />
      <TownAmbient count={townAmbientCount} shadows={profile.shadows} />
      <PrincipalFigures shadows={profile.shadows} />
      <HeadBundle shadows={profile.shadows} />
      {showLabels && HEBRON_RECKONING_ENTITIES.map((e) => <EntityLabel key={e.id} entity={e} />)}
      <TimelineDriver durationSec={SCENE.durationSec} />
      <ObserverControls />
    </>
  );
}
