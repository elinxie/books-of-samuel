import { useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Sky } from '@react-three/drei';
import { useAppStore } from '../../state/store';
import { QUALITY_PROFILES } from '../../engine/quality';
import { ObserverControls } from '../../engine/ObserverControls';
import { SCENES_BY_ID } from '../../data/scenes';
import { GroundWorks } from '../jerusalem-stronghold/GroundWorks';
import { Vegetation } from '../jerusalem-stronghold/Vegetation';
import { TerraceWalls } from '../jerusalem-stronghold/TerraceWalls';
import { Stronghold } from '../jerusalem-stronghold/Stronghold';
import { ConstructionGround } from '../jerusalem-stronghold/ConstructionGround';
import { Tent } from './Tent';
import { OfferingGround } from './OfferingGround';
import { Household } from './Household';
import { ProcessionColumn } from './ProcessionColumn';
import { JerusalemOnlookers } from './JerusalemOnlookers';
import { PrincipalFigures } from './PrincipalFigures';
import { ARK_INTO_JERUSALEM_ENTITIES } from './entities';
import { EntityLabel } from '../../ui/scene/EntityLabel';

const SCENE = SCENES_BY_ID.get('ark-into-jerusalem')!;

/**
 * The ark brought up with gladness, David's dance, and Michal's contempt (2
 * Samuel 6:12-23). See docs/design/ark-into-jerusalem-brief.md. Second and
 * last scene of Milestone 7, picking up exactly where `perez-uzzah` leaves
 * off (the ark resting at Obed-edom's house) and reusing
 * `jerusalem-stronghold`'s terrain, enclosure, palette, and unfinished-house
 * asset **completely unchanged** — the same ground, the same object, the
 * opposite outcome from `perez-uzzah`.
 *
 * `depictsDeath: false` — no death, fighting, or handling of the dead is
 * staged anywhere, so ADR-009's advisory does not fire. No royal/military
 * triumphal visual grammar anywhere (no crowns, no raised standards, no
 * conquest-parade framing) — a communal religious festival, not a victory
 * procession. The sacrifice beat elides slaughter in every mode (no wound,
 * blood, or carcass geometry). David's dance stages fully and vigorously,
 * fully clothed throughout, in every mode, at every camera distance — no
 * exposure is ever modeled or suggested by framing (see PrincipalFigures.tsx
 * and exposure.test.ts). The tent (6:17) is explicitly not the tabernacle at
 * Gibeon (1 Chronicles 16:39). No 2 Samuel 7+ content anywhere, including in
 * the closing card. Steady daytime light throughout, matching
 * `jerusalem-stronghold`'s own lighting convention exactly (disclosed
 * design-placeholder, hour unstated) — no new lights, fire, or particle
 * systems anywhere in this scene.
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
      <color attach="background" args={['#dde4de']} />
      <fog attach="fog" args={['#dde4de', profile.fogNear, profile.fogFar]} />
      {profile.useSkyShader && (
        <Sky
          distance={45000}
          sunPosition={[500, 640, -380]}
          turbidity={2.6}
          rayleigh={2.1}
          mieCoefficient={0.005}
          mieDirectionalG={0.78}
        />
      )}
      {/* Steady midday/early-afternoon light, matching jerusalem-stronghold's
          own convention exactly (disclosed design-placeholder, hour unstated)
          — no beat-driven lighting arc, no dawn/golden-hour framing at any
          beat. */}
      <hemisphereLight args={['#eef0e6', '#7c8256', 0.6]} />
      <directionalLight
        position={[500, 640, -380]}
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

export function ArkIntoJerusalemScene() {
  const quality = useAppStore((s) => s.quality);
  const showLabels = useAppStore((s) => s.showLabels);
  const profile = QUALITY_PROFILES[quality];

  // Disclosed design counts (claim-ark-into-jerusalem-cast-scale, cross-
  // referencing perez-uzzah's own claim-ark-procession-cast-scale for the
  // reused procession): the same ~150-200-figure procession, reused and
  // repositioned rather than doubled, plus the same ~20-30-figure Jerusalem
  // ambient population jerusalem-stronghold established, reused as active
  // onlookers/recipients. High-tier total lands close to perez-uzzah's own
  // measured ~207, well under gilboa-battle's measured ~330 ceiling.
  const columnCount = Math.max(60, Math.round(profile.figureCount * 2.5));
  const onlookerCount = Math.max(8, Math.round(profile.figureCount * 0.35));

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
      <Stronghold shadows={profile.shadows} />
      <ConstructionGround shadows={profile.shadows} />
      <Household shadows={profile.shadows} />
      <Tent shadows={profile.shadows} />
      <OfferingGround shadows={profile.shadows} />
      <ProcessionColumn count={columnCount} shadows={profile.shadows} />
      <JerusalemOnlookers count={onlookerCount} shadows={profile.shadows} />
      <PrincipalFigures shadows={profile.shadows} />
      {showLabels && ARK_INTO_JERUSALEM_ENTITIES.map((e) => <EntityLabel key={e.id} entity={e} />)}
      <TimelineDriver durationSec={SCENE.durationSec} />
      <ObserverControls />
    </>
  );
}
