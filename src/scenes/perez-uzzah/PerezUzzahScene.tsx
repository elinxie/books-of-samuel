import { useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Sky } from '@react-three/drei';
import { useAppStore } from '../../state/store';
import { QUALITY_PROFILES } from '../../engine/quality';
import { ObserverControls } from '../../engine/ObserverControls';
import { SCENES_BY_ID } from '../../data/scenes';
import { GroundWorks } from './GroundWorks';
import { Vegetation } from './Vegetation';
import { KiriathJearimTown } from './KiriathJearimTown';
import { ObedEdomHouse } from './ObedEdomHouse';
import { ArkCart } from './ArkCart';
import { ProcessionColumn } from './ProcessionColumn';
import { PrincipalFigures } from './PrincipalFigures';
import { PEREZ_UZZAH_ENTITIES } from './entities';
import { EntityLabel } from '../../ui/scene/EntityLabel';

const SCENE = SCENES_BY_ID.get('perez-uzzah')!;

/**
 * The new cart and the death of Uzzah (2 Samuel 6:1-11). See
 * docs/design/perez-uzzah-brief.md. The project's first-ever staging of the
 * ark of the covenant as a physical object, and the first worked-through
 * case of ADR-013 composing with ADR-009 (queue #25): Uzzah's death is
 * depictable, the divine strike the text says caused it is not.
 *
 * `depictsDeath: true`; ADR-009's advisory fires on first visit. No new
 * lights, fire, or particle systems anywhere — the existing ADR-010
 * procedural rig, unchanged. No 2 Samuel 6:12+ content (the dance, Michal,
 * the arrival in Jerusalem) and no 2 Samuel 7+ content anywhere, per the
 * brief's scope guard.
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
      <color attach="background" args={['#dde3d8']} />
      <fog attach="fog" args={['#dde3d8', profile.fogNear, profile.fogFar]} />
      {profile.useSkyShader && (
        <Sky
          distance={45000}
          sunPosition={[600, 620, 400]}
          turbidity={2.8}
          rayleigh={2.2}
          mieCoefficient={0.005}
          mieDirectionalG={0.78}
        />
      )}
      {/* Flat daylight throughout, hour unstated in the text (disclosed
          design-placeholder, brief's "Lighting") — the same restraint
          rephaim-valley used for its own held wait beat: no beat-driven
          lighting arc anywhere in this scene. */}
      <hemisphereLight args={['#eef0e6', '#7c8256', 0.62]} />
      <directionalLight
        position={[600, 620, 400]}
        intensity={1.5}
        color="#fff8e4"
        castShadow={profile.shadows}
        shadow-mapSize-width={profile.shadowMapSize}
        shadow-mapSize-height={profile.shadowMapSize}
        shadow-camera-left={-260}
        shadow-camera-right={260}
        shadow-camera-top={260}
        shadow-camera-bottom={-260}
        shadow-camera-far={1000}
        shadow-bias={-0.0004}
      />
      <ambientLight intensity={0.26} />
      <CameraFar far={profile.cameraFar} />
    </>
  );
}

export function PerezUzzahScene() {
  const quality = useAppStore((s) => s.quality);
  const showLabels = useAppStore((s) => s.showLabels);
  const profile = QUALITY_PROFILES[quality];

  // Disclosed design counts (claim-ark-procession-cast-scale): marching
  // column ~150-200 at high tier, ~10-15 dedicated musician figures drawn
  // from that total (not additional), ambient Kiriath-jearim ~10-20,
  // Obed-edom's household ~5-10 — high-tier total ≈180-235, at or below
  // gilboa-battle's measured high-tier instance count (~330) while that
  // scene's real-hardware performance check stays open.
  const columnCount = Math.max(60, Math.round(profile.figureCount * 2.5));
  const musicianCount = Math.min(columnCount, Math.max(6, Math.round(profile.figureCount * 0.18)));
  const ambientCount = Math.max(8, Math.round(profile.figureCount * 0.22));
  const householdCount = Math.max(4, Math.round(profile.figureCount * 0.1));

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
      <KiriathJearimTown ambientCount={ambientCount} shadows={profile.shadows} />
      <ObedEdomHouse householdCount={householdCount} shadows={profile.shadows} />
      <ArkCart shadows={profile.shadows} />
      <ProcessionColumn
        count={columnCount}
        musicianCount={musicianCount}
        shadows={profile.shadows}
      />
      <PrincipalFigures shadows={profile.shadows} />
      {showLabels && PEREZ_UZZAH_ENTITIES.map((e) => <EntityLabel key={e.id} entity={e} />)}
      <TimelineDriver durationSec={SCENE.durationSec} />
      <ObserverControls />
    </>
  );
}
