import { useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Sky } from '@react-three/drei';
import { useAppStore } from '../../state/store';
import { QUALITY_PROFILES } from '../../engine/quality';
import { ObserverControls } from '../../engine/ObserverControls';
import { SCENES_BY_ID } from '../../data/scenes';
import { GroundWorks } from './GroundWorks';
import { Vegetation } from './Vegetation';
import { TerraceWalls } from './TerraceWalls';
import { TownAndPlaza } from './TownAndPlaza';
import { FeastGround } from './FeastGround';
import { AbnerParty } from './AbnerParty';
import { DavidEscort } from './DavidEscort';
import { TownAmbient } from './TownAmbient';
import { PrincipalFigures } from './PrincipalFigures';
import { HEBRON_COVENANT_ENTITIES } from './entities';
import { EntityLabel } from '../../ui/scene/EntityLabel';

const SCENE = SCENES_BY_ID.get('hebron-covenant')!;

/**
 * Hebron, a few years after hebron-anointing: the same Judean-highland
 * terrain/town/terrace massing reused outright (mandatory visual
 * continuity), one new set piece (the open-air feast dressing), and the
 * project's smallest M5 crowd — Abner's twenty rendered literally, David's
 * escort and the ambient town at disclosed design-choice scale, deliberately
 * far below hebron-anointing's civic assembly (a closed political meal, not
 * a public founding). Daytime throughout — steady midday/early-afternoon
 * light, hour unstated in the text, disclosed design-placeholder, no
 * dusk/dread arc: "the peace must read straight"
 * (docs/design/hebron-covenant-brief.md).
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
      {/* Steady midday/early-afternoon light — legibility choice, hour
          unstated in the text (disclosed design-placeholder); no dusk
          foreshadowing of the departure, per the brief. */}
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

  // Three distinct crowd-scale treatments (brief's "Scale assumptions" —
  // never conflated): Abner's twenty is a fixed literal count (AbnerParty.tsx
  // itself); David's escort and the ambient town are disclosed design-choice
  // headcounts, each clamped into the brief's own stated range regardless of
  // quality tier.
  const escortCount = Math.max(15, Math.min(25, Math.round(profile.figureCount * 0.3)));
  const ambientCount = Math.max(20, Math.min(30, Math.round(profile.figureCount * 0.35)));

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
      <DavidEscort count={escortCount} shadows={profile.shadows} />
      <TownAmbient count={ambientCount} shadows={profile.shadows} />
      <PrincipalFigures shadows={profile.shadows} />
      {showLabels && HEBRON_COVENANT_ENTITIES.map((e) => <EntityLabel key={e.id} entity={e} />)}
      <TimelineDriver durationSec={SCENE.durationSec} />
      <ObserverControls />
    </>
  );
}
