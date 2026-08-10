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
import { DavidsSideFeast } from './DavidsSideFeast';
import { TownAmbient } from './TownAmbient';
import { PrincipalFigures } from './PrincipalFigures';
import { HEBRON_COVENANT_ENTITIES } from './entities';
import { EntityLabel } from '../../ui/scene/EntityLabel';

const SCENE = SCENES_BY_ID.get('hebron-covenant')!;

/**
 * Hebron, a few years after hebron-anointing: the same Judean-highland
 * terrain/town/terrace assets (reused, not re-invented) plus a small
 * diplomatic cast — Abner's twenty-one arriving from the north, David's
 * household presence, and an ordinary-day town background, deliberately the
 * smallest crowd of the M5 scenes (brief's "Scale assumptions"). Steady
 * midday/early-afternoon light throughout, hour unstated in the text
 * (disclosed design-placeholder) — no dusk arc, no dread staging; "he went
 * in peace" (3:21b) is staged straight, per the brief's historical intent.
 * See docs/design/hebron-covenant-brief.md.
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
          sunPosition={[380, 720, -200]}
          turbidity={2.6}
          rayleigh={2.1}
          mieCoefficient={0.005}
          mieDirectionalG={0.78}
        />
      )}
      {/* Steady midday/early-afternoon light — hour unstated in the text
          (disclosed design-placeholder). No beat-driven lighting arc: this
          is not a dusk-crossing scene, and the departure must read
          peaceable, not foreboding (brief's "Lighting"). */}
      <hemisphereLight args={['#eef0e6', '#7c8256', 0.6]} />
      <directionalLight
        position={[380, 720, -200]}
        intensity={1.55}
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
      <ambientLight intensity={0.24} />
      <CameraFar far={profile.cameraFar} />
    </>
  );
}

export function HebronCovenantScene() {
  const quality = useAppStore((s) => s.quality);
  const showLabels = useAppStore((s) => s.showLabels);
  const profile = QUALITY_PROFILES[quality];

  // David's-side feast presence and the ambient town background are both
  // disclosed design counts (claim-covenant-cast-scale), scaled off the
  // shared figureCount profile but at much smaller fractions than any prior
  // scene's crowds — deliberately the smallest M5 cast (brief: "the
  // smallest/cheapest M5 scene by design"). Abner's twenty (+Abner himself)
  // are literal, never quality-scaled (claim-covenant-feast, 3:20's own
  // count).
  const davidsSideCount = Math.max(6, Math.round(profile.figureCount * 0.3));
  const townAmbientCount = Math.max(8, Math.round(profile.figureCount * 0.38));

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
      <DavidsSideFeast count={davidsSideCount} shadows={profile.shadows} />
      <TownAmbient count={townAmbientCount} shadows={profile.shadows} />
      <PrincipalFigures shadows={profile.shadows} />
      {showLabels && HEBRON_COVENANT_ENTITIES.map((e) => <EntityLabel key={e.id} entity={e} />)}
      <TimelineDriver durationSec={SCENE.durationSec} />
      <ObserverControls />
    </>
  );
}
