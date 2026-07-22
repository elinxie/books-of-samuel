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
import { HouseholdCamp } from './HouseholdCamp';
import { ApproachColumn } from './ApproachColumn';
import { HouseholdFigures } from './HouseholdFigures';
import { JudahAssembly } from './JudahAssembly';
import { PrincipalFigures } from './PrincipalFigures';
import { MessengerDeparture } from './MessengerDeparture';
import { HEBRON_ANOINTING_ENTITIES } from './entities';
import { EntityLabel } from '../../ui/scene/EntityLabel';

const SCENE = SCENES_BY_ID.get('hebron-anointing')!;

/**
 * Hebron: Judean-highland terrain + terrace walls + the town/gate-plaza
 * massing + the household camp + three distinct crowds (David's ~600 men,
 * the household column, the representative Judah assembly, never
 * conflated) + the inquiry/anointing/dispatch choreography (./poses.ts).
 * Daytime throughout — a public civic ceremony, not a dusk/night scene like
 * Ziklag's return or Jabesh's retrieval; clear late-morning light, hour
 * unstated in the text, disclosed design-placeholder (no beat-driven
 * lighting arc is needed the way the dusk-crossing M3/M4 scenes required
 * one). See docs/design/hebron-anointing-brief.md.
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
      {/* Clear late-morning light — legibility choice, hour unstated in the
          text (disclosed design-placeholder, see the brief's "Lighting"). */}
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

export function HebronAnointingScene() {
  const quality = useAppStore((s) => s.quality);
  const showLabels = useAppStore((s) => s.showLabels);
  const profile = QUALITY_PROFILES[quality];

  // Three distinct crowd-scale treatments (brief's "Scale assumptions" —
  // never conflated): David's men at the shared figureCount tier directly
  // (the same ~1:10-of-600 convention Ziklag established: ~40/60/72 across
  // study/balanced/high); the household column, a disclosed design-choice
  // fraction (~25/38/45); the representative Judah assembly, deliberately
  // the largest crowd of the three M4 scenes (~100/150/180).
  const menCount = profile.figureCount;
  const householdCount = Math.max(1, Math.round(profile.figureCount * 0.625));
  const assemblyCount = Math.max(1, Math.round(profile.figureCount * 2.5));

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
      <HouseholdCamp shadows={profile.shadows} />
      <ApproachColumn count={menCount} shadows={profile.shadows} />
      <HouseholdFigures count={householdCount} shadows={profile.shadows} />
      <JudahAssembly count={assemblyCount} shadows={profile.shadows} />
      <PrincipalFigures shadows={profile.shadows} />
      <MessengerDeparture shadows={profile.shadows} />
      {showLabels && HEBRON_ANOINTING_ENTITIES.map((e) => <EntityLabel key={e.id} entity={e} />)}
      <TimelineDriver durationSec={SCENE.durationSec} />
      <ObserverControls />
    </>
  );
}
