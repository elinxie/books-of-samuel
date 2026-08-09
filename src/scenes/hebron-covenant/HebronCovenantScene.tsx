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
import { FeastGround } from './FeastGround';
import { AbnerEscort } from './AbnerEscort';
import { DavidsEscort } from './DavidsEscort';
import { TownAmbient } from './TownAmbient';
import { PrincipalFigures } from './PrincipalFigures';
import { HEBRON_COVENANT_ENTITIES } from './entities';
import { EntityLabel } from '../../ui/scene/EntityLabel';

const SCENE = SCENES_BY_ID.get('hebron-covenant')!;

/**
 * Hebron, a few years after hebron-anointing: the same terrain, town, and
 * gate-plaza massing (reused directly, not re-invented — see terrain.ts and
 * the imported TerraceWalls/TownAndPlaza/Vegetation components), plus this
 * scene's own additions: the northern approach/departure road, the feast
 * ground, Abner's twenty (literal 1:1), David's escort and Hebron's ambient
 * town background (both disclosed design counts), and the two principals'
 * choreography (./poses.ts) — Abner's arrival, the covenant feast, his
 * pledge, and his peaceable departure (2 Samuel 3:20-21). Deliberately the
 * smallest, cheapest M5 crowd (see docs/design/hebron-covenant-brief.md,
 * "Performance target") — a diplomatic scene, not a crowd event. Steady
 * midday/early-afternoon daylight throughout, hour unstated in the text,
 * disclosed design-placeholder — no dusk/dread staging (the brief is
 * explicit: "he went in peace" must read straight).
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
      <color attach="background" args={['#e2e4da']} />
      <fog attach="fog" args={['#e2e4da', profile.fogNear, profile.fogFar]} />
      {profile.useSkyShader && (
        <Sky
          distance={45000}
          sunPosition={[80, 760, -180]}
          turbidity={2.4}
          rayleigh={2.0}
          mieCoefficient={0.005}
          mieDirectionalG={0.78}
        />
      )}
      {/* Steady midday/early-afternoon light — the brief's "no dusk
          foreshadowing" call; hour unstated in the text, disclosed
          design-placeholder, matching hebron-anointing's daytime treatment. */}
      <hemisphereLight args={['#eef0e6', '#7c8256', 0.6]} />
      <directionalLight
        position={[80, 760, -180]}
        intensity={1.55}
        color="#fff8e6"
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

  // Abner's twenty: literal 1:1 (3:20's exact count), no quality-tier
  // scaling — see AbnerEscort.tsx. David's escort and the town's ambient
  // background: disclosed design counts (claim-covenant-cast-scale),
  // deliberately the smallest M5 crowd (~60-80 high-tier total, see the
  // brief's "Scale assumptions"/"Performance target").
  const davidsEscortCount = Math.max(10, Math.round(profile.figureCount * 0.28));
  const townAmbientCount = Math.max(10, Math.round(profile.figureCount * 0.35));

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
      <AbnerEscort shadows={profile.shadows} />
      <DavidsEscort count={davidsEscortCount} shadows={profile.shadows} />
      <TownAmbient count={townAmbientCount} shadows={profile.shadows} />
      <PrincipalFigures shadows={profile.shadows} />
      {showLabels && HEBRON_COVENANT_ENTITIES.map((e) => <EntityLabel key={e.id} entity={e} />)}
      <TimelineDriver durationSec={SCENE.durationSec} />
      <ObserverControls />
    </>
  );
}
