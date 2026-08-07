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
import { Attendants } from './Attendants';
import { AmbientTown } from './AmbientTown';
import { PrincipalFigures } from './PrincipalFigures';
import { HeadBundle } from './HeadBundle';
import { HEBRON_RECKONING_ENTITIES } from './entities';
import { EntityLabel } from '../../ui/scene/EntityLabel';

const SCENE = SCENES_BY_ID.get('hebron-reckoning')!;

/**
 * Hebron, days after the killing at the gate: the same Judean-highland
 * terrain, town/gate-plaza massing, terracing, and vegetation as
 * hebron-anointing/hebron-covenant/hebron-gate (imported and reused directly
 * — the "identical Hebron continuity rule" this milestone's briefs repeat)
 * plus this scene's own additions: the arrival road from the Arabah
 * direction, the pool of Hebron, and the receiving-ground/execution/tomb
 * choreography (./poses.ts).
 *
 * ADR-009's third named-killing template application and its first as a
 * judicial (not personal) act, and the project's first trigger of ADR-009's
 * absolute dismemberment bar: no severed-anatomy geometry, no shrouded
 * shapes standing in for the hands-and-feet display, in any mode. A fixed,
 * soft early-morning light rig runs throughout (the brief's disclosed,
 * text-adjacent inference from 4:7b's overnight march, not an asserted
 * text detail — unlike hebron-gate's text-fixed sundown, no beat in this
 * chapter fixes an hour, so no ramp is staged). `depictsDeath: true` wires
 * the first-visit violence advisory automatically (src/data/scenes.ts).
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
      <color attach="background" args={['#e7e0cd']} />
      <fog attach="fog" args={['#e7e0cd', profile.fogNear, profile.fogFar]} />
      {profile.useSkyShader && (
        <Sky
          distance={45000}
          sunPosition={[520, 420, -180]}
          turbidity={2.4}
          rayleigh={2.4}
          mieCoefficient={0.006}
          mieDirectionalG={0.8}
        />
      )}
      <hemisphereLight args={['#f2ead2', '#7c8256', 0.62]} />
      <directionalLight
        position={[520, 420, -180]}
        intensity={1.35}
        color="#ffe9c4"
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

  // Two crowd-scale treatments (`claim-reckoning-cast-scale`, never
  // conflated): David's attendants (≈8-14 at high tier, "the young men") and
  // the ambient town (≈10-20 at high tier, static). High-tier total: 3
  // principals + attendants + ambient town ≈ 21-37 figures — the smallest M5
  // scene, conversation-scale per ziklag-lament's precedent.
  const attendantCount = Math.min(14, Math.max(8, Math.round(profile.figureCount * 0.16)));
  const ambientTownCount = Math.min(20, Math.max(10, Math.round(profile.figureCount * 0.22)));

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
      <Attendants count={attendantCount} shadows={profile.shadows} />
      <AmbientTown count={ambientTownCount} shadows={profile.shadows} />
      <PrincipalFigures shadows={profile.shadows} />
      <HeadBundle shadows={profile.shadows} />
      {showLabels && HEBRON_RECKONING_ENTITIES.map((e) => <EntityLabel key={e.id} entity={e} />)}
      <TimelineDriver durationSec={SCENE.durationSec} />
      <ObserverControls />
    </>
  );
}
