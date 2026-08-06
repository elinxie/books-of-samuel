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
import { FeastProps } from './FeastProps';
import { AbnerParty } from './AbnerParty';
import { DavidEscort } from './DavidEscort';
import { TownBackground } from './TownBackground';
import { PrincipalFigures } from './PrincipalFigures';
import { HEBRON_COVENANT_ENTITIES } from './entities';
import { EntityLabel } from '../../ui/scene/EntityLabel';

const SCENE = SCENES_BY_ID.get('hebron-covenant')!;

/**
 * Hebron, a few years after hebron-anointing: Abner's overture and the
 * covenant feast (2 Samuel 3:1-21, staged from 3:20). Same Judean-highland
 * terrain, town massing, terracing, and gate plaza as hebron-anointing —
 * `TownAndPlaza`/`TerraceWalls`/`Vegetation` are imported and reused
 * directly, unmodified, from that scene (see `./layout.ts`'s header comment)
 * — plus the geometry genuinely new here: the northern road, the feast
 * ground, Abner's twenty-plus-one, David's escort, and a small ambient town
 * background. Only 3:20-21 renders as geometry; 3:1-19 is context-card
 * material only (`docs/design/hebron-covenant-brief.md`). No Joab presence
 * anywhere — the text states he was away (3:22); his return belongs to
 * `hebron-gate`, a separate, not-yet-built scene this scene's closing card
 * points to by name only.
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
      {/* Steady midday/early-afternoon light — hour unstated in the text,
          disclosed design-placeholder (brief's "Lighting"); no dusk
          foreshadowing of any kind toward the peace departure. */}
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

  // Abner's twenty men render literally 1:1 (AbnerParty.tsx ignores quality
  // tier by design — a small, exact, textually-stated count, not a ratio).
  // David's escort and the town background are disclosed design counts
  // (claim-covenant-cast-scale), scaled off the shared figureCount profile
  // but at smaller fractions than hebron-anointing's crowds — deliberately
  // the smallest M5 scene.
  const escortCount = Math.max(6, Math.round(profile.figureCount * 0.27));
  const backgroundCount = Math.max(6, Math.round(profile.figureCount * 0.35));

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
      <FeastProps shadows={profile.shadows} />
      <TownBackground count={backgroundCount} shadows={profile.shadows} />
      <DavidEscort count={escortCount} shadows={profile.shadows} />
      <AbnerParty shadows={profile.shadows} />
      <PrincipalFigures shadows={profile.shadows} />
      {showLabels && HEBRON_COVENANT_ENTITIES.map((e) => <EntityLabel key={e.id} entity={e} />)}
      <TimelineDriver durationSec={SCENE.durationSec} />
      <ObserverControls />
    </>
  );
}
