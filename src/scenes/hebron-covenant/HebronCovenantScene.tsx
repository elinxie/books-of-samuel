import { useEffect } from 'react';
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
import { PartyFigures } from './PartyFigures';
import { DavidsEscort } from './DavidsEscort';
import { TownAmbient } from './TownAmbient';
import { PrincipalFigures } from './PrincipalFigures';
import { HEBRON_COVENANT_ENTITIES } from './entities';
import { EntityLabel } from '../../ui/scene/EntityLabel';

const SCENE = SCENES_BY_ID.get('hebron-covenant')!;

/**
 * Hebron, a few years after hebron-anointing: Abner's overture and the
 * covenant feast (2 Samuel 3:20-21). Reuses hebron-anointing's terrain, town
 * massing, terracing, and vegetation unmodified (`../hebron-anointing/*`,
 * per the brief's "Hard continuity rule") — this file adds only the
 * northern approach/departure road (`GroundWorks.tsx`), the feast ground
 * (`FeastProps.tsx`, via `PrincipalFigures.tsx`), and the scene's three
 * covenant-scale crowds (Abner's twenty men literal, David's escort and the
 * ambient townspeople both disclosed design counts — never conflated, per
 * the brief's "Scale assumptions"). Daytime throughout, steady midday/early
 * afternoon (hour unstated in the text, disclosed design-placeholder) — no
 * dusk arc, no dread staging of the departure. See
 * docs/design/hebron-covenant-brief.md.
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

  // Disclosed design counts (claim-covenant-cast-scale), never a ratio of
  // the shared figureCount tier — this scene's crowds are small enough that
  // the standard ~1:10 narrated-army convention doesn't apply to any of
  // them. Abner's twenty men are literal, handled entirely inside
  // PartyFigures.tsx (no quality-tier scaling at all).
  const davidEscortCount = quality === 'study' ? 15 : quality === 'balanced' ? 20 : 25;
  const townAmbientCount = quality === 'study' ? 20 : quality === 'balanced' ? 25 : 30;

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
      <PartyFigures shadows={profile.shadows} />
      <DavidsEscort count={davidEscortCount} shadows={profile.shadows} />
      <TownAmbient count={townAmbientCount} shadows={profile.shadows} />
      <PrincipalFigures shadows={profile.shadows} />
      {showLabels && HEBRON_COVENANT_ENTITIES.map((e) => <EntityLabel key={e.id} entity={e} />)}
      <TimelineDriver durationSec={SCENE.durationSec} />
      <ObserverControls />
    </>
  );
}
