import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { useFrame, useThree } from '@react-three/fiber';
import { Sky } from '@react-three/drei';
import { useAppStore } from '../../state/store';
import { QUALITY_PROFILES } from '../../engine/quality';
import { ObserverControls } from '../../engine/ObserverControls';
import { SCENES_BY_ID } from '../../data/scenes';
import { GroundWorks } from './GroundWorks';
import { Vegetation } from './Vegetation';
import { TerraceWalls } from '../hebron-gate/TerraceWalls';
import { TownAndPlaza } from '../hebron-gate/TownAndPlaza';
import { GatePassage } from '../hebron-gate/GatePassage';
import { TombGround } from '../hebron-gate/TombGround';
import { PoolGround } from './PoolGround';
import { TownAmbient } from '../hebron-gate/TownAmbient';
import { AttendantGuard } from './AttendantGuard';
import { PrincipalFigures } from './PrincipalFigures';
import { HeadBundle } from './HeadBundle';
import { HEBRON_RECKONING_ENTITIES } from './entities';
import { EntityLabel } from '../../ui/scene/EntityLabel';

const SCENE = SCENES_BY_ID.get('hebron-reckoning')!;

/**
 * Ish-bosheth's assassination (narrated by card only — no Mahanaim geometry,
 * ever) and David's judgment on Rechab and Baanah at Hebron (2 Samuel 4).
 * See docs/design/hebron-reckoning-brief.md. Reuses hebron-anointing's/
 * hebron-gate's Hebron terrain, town, terracing, gate plaza, and tomb ground
 * outright (mandatory visual continuity — this scene is the M5 trilogy's
 * deliberate closing echo, "the same tomb, days apart"); the one new ground
 * is the pool of Hebron (`PoolGround.tsx`) and the Arabah-road approach
 * (`GroundWorks.tsx`).
 *
 * ADR-009's third named-killing-template application (first as a judicial
 * act) governs the execution beat throughout (`poses.ts`'s `assassinPose`/
 * `attendantPose`): documentary distance, no wound geometry in either mode,
 * no invented method gesture (the text supplies none here). The
 * hands-and-feet display (4:12a) has no rendering path at all in this file —
 * caption-only, absolutely, per the brief's hard bar. The head of
 * Ish-bosheth renders only as a small covered bundle (`HeadBundle.tsx`),
 * never as anatomy.
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
  const lightRef = useRef<THREE.DirectionalLight>(null);

  // A single fixed early-morning lighting state throughout — the arrival's
  // "first light" (a defensible inference from 4:7b's "all night," disclosed
  // as a design choice, not asserted as stated text) is the only hour this
  // chapter's staged action plausibly shares; unlike hebron-gate's dusk arc
  // (3:35's own explicit "till the sun goes down"), no beat here fixes a
  // later hour, so this scene does not invent one.
  useFrame(() => {
    const light = lightRef.current;
    if (!light) return;
    light.position.set(520, 340, -80);
  });

  return (
    <>
      <color attach="background" args={['#e6ddc4']} />
      <fog attach="fog" args={['#e6ddc4', profile.fogNear, profile.fogFar]} />
      {profile.useSkyShader && (
        <Sky
          distance={45000}
          sunPosition={[520, 340, -80]}
          turbidity={2.4}
          rayleigh={2.4}
          mieCoefficient={0.006}
          mieDirectionalG={0.8}
        />
      )}
      <hemisphereLight args={['#f2e8cf', '#8a7c56', 0.62]} />
      <directionalLight
        ref={lightRef}
        position={[520, 340, -80]}
        intensity={1.35}
        color="#ffe6b8"
        castShadow={profile.shadows}
        shadow-mapSize-width={profile.shadowMapSize}
        shadow-mapSize-height={profile.shadowMapSize}
        shadow-camera-left={-200}
        shadow-camera-right={200}
        shadow-camera-top={200}
        shadow-camera-bottom={-200}
        shadow-camera-far={900}
        shadow-bias={-0.0004}
      />
      <ambientLight intensity={0.24} />
      <CameraFar far={profile.cameraFar} />
    </>
  );
}

export function HebronReckoningScene() {
  const quality = useAppStore((s) => s.quality);
  const showLabels = useAppStore((s) => s.showLabels);
  const profile = QUALITY_PROFILES[quality];

  // Two distinct crowd-scale treatments (brief's "Scale assumptions", never
  // conflated): David's attendants ~8-14 and the ambient town ~10-20 —
  // deliberately the smallest cast of any M5 scene ("the smallest, cheapest
  // M5 scene," conversation-scale per ziklag-lament's precedent).
  const attendantCount = Math.max(8, Math.min(14, Math.round(profile.figureCount * 0.18)));
  const ambientCount = Math.max(10, Math.min(20, Math.round(profile.figureCount * 0.22)));

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
      <GatePassage shadows={profile.shadows} />
      <TombGround shadows={profile.shadows} />
      <PoolGround shadows={profile.shadows} />
      <AttendantGuard count={attendantCount} shadows={profile.shadows} />
      <TownAmbient count={ambientCount} shadows={profile.shadows} />
      <PrincipalFigures shadows={profile.shadows} />
      <HeadBundle shadows={profile.shadows} />
      {showLabels && HEBRON_RECKONING_ENTITIES.map((e) => <EntityLabel key={e.id} entity={e} />)}
      <TimelineDriver durationSec={SCENE.durationSec} />
      <ObserverControls />
    </>
  );
}
