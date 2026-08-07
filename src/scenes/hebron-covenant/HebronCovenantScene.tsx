import { useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Sky } from '@react-three/drei';
import { useAppStore } from '../../state/store';
import { QUALITY_PROFILES } from '../../engine/quality';
import { ObserverControls } from '../../engine/ObserverControls';
import { SCENES_BY_ID } from '../../data/scenes';
import { TownAndPlaza } from '../hebron-anointing/TownAndPlaza';
import { TerraceWalls } from '../hebron-anointing/TerraceWalls';
import { Vegetation } from '../hebron-anointing/Vegetation';
import { GroundWorks } from './GroundWorks';
import { FeastGround } from './FeastGround';
import { AbnerParty } from './AbnerParty';
import { DavidsEscort } from './DavidsEscort';
import { TownBackground } from './TownBackground';
import { PrincipalFigures } from './PrincipalFigures';
import { HEBRON_COVENANT_ENTITIES } from './entities';
import { EntityLabel } from '../../ui/scene/EntityLabel';

const SCENE = SCENES_BY_ID.get('hebron-covenant')!;

/**
 * Hebron, some years after the anointing: the same Judean-highland terrain,
 * town/gate-plaza massing, terracing, and vegetation as hebron-anointing
 * (imported and reused directly, not re-implemented — "visual continuity is
 * mandatory," per docs/design/hebron-covenant-brief.md) plus this scene's
 * own additions: the northern road (the deliberate inverse of the
 * anointing's southern approach), the feast ground, Abner's literal twenty,
 * David's smaller feast escort, ambient townsfolk, and the
 * arrival/feast/pledge/peace choreography (./poses.ts). Daytime throughout —
 * steady midday/early-afternoon light, hour unstated in the text, disclosed
 * design-placeholder; no dusk foreshadowing (the brief: "the peace must read
 * straight").
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
  return (
    <>
      <color attach="background" args={['#dfe3dc']} />
      <fog attach="fog" args={['#dfe3dc', profile.fogNear, profile.fogFar]} />
      {profile.useSkyShader && (
        <Sky
          distance={45000}
          sunPosition={[420, 700, -260]}
          turbidity={2.6}
          rayleigh={2.1}
          mieCoefficient={0.005}
          mieDirectionalG={0.78}
        />
      )}
      <hemisphereLight args={['#eef0e6', '#7c8256', 0.58]} />
      <directionalLight
        position={[420, 700, -260]}
        intensity={1.5}
        color="#fff6e0"
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
      <ambientLight intensity={0.22} />
      <CameraFar far={profile.cameraFar} />
    </>
  );
}

export function HebronCovenantScene() {
  const quality = useAppStore((s) => s.quality);
  const showLabels = useAppStore((s) => s.showLabels);
  const profile = QUALITY_PROFILES[quality];

  // Three crowd-scale treatments, deliberately the smallest M5 cast (brief's
  // "Scale assumptions" — never conflated): Abner's twenty (literal, fixed,
  // see AbnerParty.tsx); David's feast escort, a disclosed ~15-25 design
  // count; ambient townsfolk, a disclosed ~20-30 design count. High-tier
  // total: 20 (Abner's men) + 2 principals + ~22 escort + ~26 townsfolk ≈ 70.
  const davidEscortCount = Math.max(12, Math.round(profile.figureCount * 0.3));
  const townBackgroundCount = Math.max(16, Math.round(profile.figureCount * 0.36));

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
      <FeastGround shadows={profile.shadows} />
      <AbnerParty shadows={profile.shadows} />
      <DavidsEscort count={davidEscortCount} shadows={profile.shadows} />
      <TownBackground count={townBackgroundCount} shadows={profile.shadows} />
      <PrincipalFigures shadows={profile.shadows} />
      {showLabels && HEBRON_COVENANT_ENTITIES.map((e) => <EntityLabel key={e.id} entity={e} />)}
      <TimelineDriver durationSec={SCENE.durationSec} />
      <ObserverControls />
    </>
  );
}
