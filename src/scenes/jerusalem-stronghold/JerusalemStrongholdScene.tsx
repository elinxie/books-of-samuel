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
import { Stronghold } from './Stronghold';
import { ConstructionGround } from './ConstructionGround';
import { DavidsForce } from './DavidsForce';
import { JebusiteInhabitants } from './JebusiteInhabitants';
import { AmbientSettlement } from './AmbientSettlement';
import { TyrianCraftsmen } from './TyrianCraftsmen';
import { PrincipalFigures } from './PrincipalFigures';
import { JERUSALEM_STRONGHOLD_ENTITIES } from './entities';
import { EntityLabel } from '../../ui/scene/EntityLabel';

const SCENE = SCENES_BY_ID.get('jerusalem-stronghold')!;

/**
 * The Jebusite stronghold and the founding of the City of David (2 Samuel
 * 5:6-16). See docs/design/jerusalem-stronghold-brief.md. The project's
 * first geometry at Jerusalem, and Milestone 6's load-bearing scene.
 *
 * 5:1-5 (all Israel's covenant and the anointing over the united kingdom, at
 * Hebron) and 5:13-16 (the household list) are context cards only — no
 * Hebron geometry, no household geometry, anywhere in this file (queue #21's
 * resolved design call). The capture itself (5:7) renders as the
 * narrative's own gap: David's force simply finishes its approach and
 * resettles inside the enclosure once the beat has passed — no water shaft,
 * tunnel, scaling, or siege equipment in any mode, ever (fable-review-queue
 * #23). The taunt (5:6b) is spoken/captioned, never enacted by any figure.
 * The Millo (5:9) renders as terrain form only, never labeled. Hiram is
 * referenced-only and never staged; his craftsmen build a construction site,
 * not a finished palace. `depictsDeath: false` — no death, fighting, or
 * handling of the dead is staged anywhere, so ADR-009's advisory does not
 * fire; captions still state plainly that the stronghold was taken by force.
 *
 * Steady midday/early-afternoon light throughout (disclosed
 * design-placeholder, hour unstated in the text) — no siege-drama light, no
 * dawn-assault framing, no golden-capital framing at the naming beat.
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
      {/* Steady midday/early-afternoon light — hour unstated in the text
          (disclosed design-placeholder). No beat-driven lighting arc: no
          siege-drama light, no dawn-assault framing, no golden-capital
          framing at the naming beat (brief's "Lighting"). */}
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

export function JerusalemStrongholdScene() {
  const quality = useAppStore((s) => s.quality);
  const showLabels = useAppStore((s) => s.showLabels);
  const profile = QUALITY_PROFILES[quality];

  // Disclosed design counts (claim-stronghold-cast-scale): David's force
  // ~40-60, Jebusite population ~25-40, Tyrian craftsmen ~10-15, ambient
  // settlement ~20-30 at high tier — no ratio is claimed anywhere (2 Samuel
  // 5 narrates no counts), and the high-tier total (~120) stays well below
  // gilboa-battle's measured band.
  const davidsForceCount = Math.max(16, Math.round(profile.figureCount * 0.7));
  const jebusiteCount = Math.max(10, Math.round(profile.figureCount * 0.45));
  const craftsmenCount = Math.max(6, Math.round(profile.figureCount * 0.17));
  const ambientCount = Math.max(8, Math.round(profile.figureCount * 0.35));

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
      <DavidsForce count={davidsForceCount} shadows={profile.shadows} />
      <JebusiteInhabitants count={jebusiteCount} shadows={profile.shadows} />
      <TyrianCraftsmen count={craftsmenCount} shadows={profile.shadows} />
      <AmbientSettlement count={ambientCount} shadows={profile.shadows} />
      <PrincipalFigures shadows={profile.shadows} />
      {showLabels &&
        JERUSALEM_STRONGHOLD_ENTITIES.map((e) => <EntityLabel key={e.id} entity={e} />)}
      <TimelineDriver durationSec={SCENE.durationSec} />
      <ObserverControls />
    </>
  );
}
