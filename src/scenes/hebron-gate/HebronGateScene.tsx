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
import { Bier } from './Bier';
import { JoabRaidParty } from './JoabRaidParty';
import { MourningAssembly } from './MourningAssembly';
import { TownAmbient } from './TownAmbient';
import { PrincipalFigures } from './PrincipalFigures';
import { duskBlend } from './poses';
import { HEBRON_GATE_ENTITIES } from './entities';
import { EntityLabel } from '../../ui/scene/EntityLabel';

const SCENE = SCENES_BY_ID.get('hebron-gate')!;

/**
 * The killing of Abner at the Hebron gate and his funeral (2 Samuel
 * 3:22-39). See docs/design/hebron-gate-brief.md. The same reused Hebron
 * terrain/town/plaza as hebron-anointing and hebron-covenant, plus this
 * scene's own new structures: the gate passage (`GatePassage.tsx`) and the
 * tomb ground (`TombGround.tsx`). Gated by the standard/reduced violence
 * mode (ADR-009) throughout — `poses.ts`'s `gateStrikePose` carries the
 * documentary-distance/elided-strike discipline the same way gibeon-pool's
 * `abnerStrikePose` did for Asahel's death, the template this scene is the
 * second application of.
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

  // Flat daylight through the killing and disavowal (hour unstated,
  // disclosed placeholder — no dramatic storm-light); blends to a warmer,
  // lower dusk state across b-fast, the one text-fixed lighting cue (3:35,
  // "till the sun goes down"), then holds through the rest of the scene —
  // the same convention gibeon-pool used for 2:24's sundown.
  useFrame(() => {
    const light = lightRef.current;
    if (!light) return;
    const { timeSec } = useAppStore.getState();
    const blend = duskBlend(timeSec);
    light.intensity = 1.5 - blend * 0.65;
    light.color.setHSL(0.12 - blend * 0.02, 0.55 + blend * 0.2, 0.78 - blend * 0.16);
    light.position.set(420 - blend * 380, 700 - blend * 560, -260 + blend * 520);
  });

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
        ref={lightRef}
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

export function HebronGateScene() {
  const quality = useAppStore((s) => s.quality);
  const showLabels = useAppStore((s) => s.showLabels);
  const profile = QUALITY_PROFILES[quality];

  // Three distinct crowd-scale treatments (brief's "Scale assumptions",
  // never conflated): the raid party and ambient town at a disclosed
  // design-choice ~15-25, the mourning assembly at a disclosed
  // representative ~60-90 — the scene's one real crowd, mostly static or
  // slow-procession, budgeted like hebron-anointing's baked assembly, not
  // Gilboa's animated combat.
  const raidCount = Math.max(10, Math.min(25, Math.round(profile.figureCount * 0.3)));
  const ambientCount = Math.max(10, Math.min(25, Math.round(profile.figureCount * 0.28)));
  const mourningCount = Math.max(35, Math.min(90, Math.round(profile.figureCount * 1.05)));

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
      <Bier shadows={profile.shadows} />
      <JoabRaidParty count={raidCount} shadows={profile.shadows} />
      <MourningAssembly count={mourningCount} shadows={profile.shadows} />
      <TownAmbient count={ambientCount} shadows={profile.shadows} />
      <PrincipalFigures shadows={profile.shadows} />
      {showLabels && HEBRON_GATE_ENTITIES.map((e) => <EntityLabel key={e.id} entity={e} />)}
      <TimelineDriver durationSec={SCENE.durationSec} />
      <ObserverControls />
    </>
  );
}
