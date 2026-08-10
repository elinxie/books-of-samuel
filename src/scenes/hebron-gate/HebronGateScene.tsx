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
import { TerraceWalls } from './TerraceWalls';
import { TownAndPlaza } from './TownAndPlaza';
import { GatePassage } from './GatePassage';
import { TombGround } from './TombGround';
import { RaidParty } from './RaidParty';
import { MourningAssembly } from './MourningAssembly';
import { TownAmbient } from './TownAmbient';
import { PrincipalFigures } from './PrincipalFigures';
import { Bier } from './Bier';
import { duskBlend } from './poses';
import { HEBRON_GATE_ENTITIES } from './entities';
import { EntityLabel } from '../../ui/scene/EntityLabel';

const SCENE = SCENES_BY_ID.get('hebron-gate')!;

/**
 * Hebron's gate, a short time after hebron-covenant: Joab's return, the
 * killing of Abner in the passage of the gate, David's public disavowal and
 * curse, and Abner's funeral (2 Samuel 3:22-39). See
 * docs/design/hebron-gate-brief.md. This is the milestone's load-bearing
 * ADR-009 scene — the second application of the named-character-killing
 * template `gibeon-pool` set for Asahel's death (`./poses.ts`'s file
 * comment has the full mechanism mapping).
 *
 * Terrain/town/terrace/ambient-town assets are all reused directly from
 * hebron-anointing/hebron-covenant (continuity, not a re-invented Hebron);
 * the one new structure is the gate passage (`GatePassage.tsx`,
 * `asset-hebron-gate-passage`). Flat daylight throughout the killing and
 * disavowal (no dramatic storm-light, per the brief); the fast beat (3:35,
 * "until the sun goes down") is the one text-fixed lighting cue, carried by
 * `duskBlend` exactly as gibeon-pool's 2:24 sundown is.
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

  useFrame(() => {
    const light = lightRef.current;
    if (!light) return;
    const { timeSec } = useAppStore.getState();
    const blend = duskBlend(timeSec);
    light.intensity = 1.55 - blend * 0.7;
    light.color.setHSL(0.13 - blend * 0.02, 0.5 + blend * 0.2, 0.79 - blend * 0.18);
    light.position.set(380 - blend * 320, 720 - blend * 560, -200 + blend * 500);
  });

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
      <hemisphereLight args={['#eef0e6', '#7c8256', 0.6]} />
      <directionalLight
        ref={lightRef}
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

export function HebronGateScene() {
  const quality = useAppStore((s) => s.quality);
  const showLabels = useAppStore((s) => s.showLabels);
  const profile = QUALITY_PROFILES[quality];

  // Disclosed design counts (claim-gate-cast-scale): raid party ~15-25,
  // mourning assembly ~60-90, ambient town ~15-25 at high tier — the
  // largest M5 scene by figure count, per the brief's "Scale assumptions".
  const raidPartyCount = Math.max(10, Math.round(profile.figureCount * 0.3));
  const mourningCount = Math.max(24, Math.round(profile.figureCount * 1.1));
  const townAmbientCount = Math.max(8, Math.round(profile.figureCount * 0.3));

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
      <RaidParty count={raidPartyCount} shadows={profile.shadows} />
      <MourningAssembly count={mourningCount} shadows={profile.shadows} />
      <TownAmbient count={townAmbientCount} shadows={profile.shadows} />
      <PrincipalFigures shadows={profile.shadows} />
      <Bier shadows={profile.shadows} />
      {showLabels && HEBRON_GATE_ENTITIES.map((e) => <EntityLabel key={e.id} entity={e} />)}
      <TimelineDriver durationSec={SCENE.durationSec} />
      <ObserverControls />
    </>
  );
}
