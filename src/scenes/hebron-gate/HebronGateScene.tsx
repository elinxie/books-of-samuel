import { useEffect, useRef } from 'react';
import * as THREE from 'three';
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
import { GatePassage } from './GatePassage';
import { RaidParty } from './RaidParty';
import { MourningAssembly } from './MourningAssembly';
import { TownBackground } from './TownBackground';
import { PrincipalFigures } from './PrincipalFigures';
import { Bier } from './Bier';
import { duskBlend } from './poses';
import { HEBRON_GATE_ENTITIES } from './entities';
import { EntityLabel } from '../../ui/scene/EntityLabel';

const SCENE = SCENES_BY_ID.get('hebron-gate')!;

/**
 * Hebron's own gate, some time after the covenant feast: the same
 * Judean-highland terrain, town/gate-plaza massing, terracing, and
 * vegetation as hebron-anointing/hebron-covenant (imported and reused
 * directly — the "identical Hebron continuity rule" this milestone's briefs
 * repeat) plus this scene's own additions: the gate passage structure, the
 * raid party's arrival road, the funeral procession route, the tomb ground,
 * and the killing/funeral choreography (./poses.ts).
 *
 * ADR-009's second named-killing template application: flat daylight
 * throughout the killing/disavowal beats (hour unstated, disclosed
 * placeholder — no dramatic storm-light), ramping to a warm dusk only at
 * `T_FAST` (3:35's "till the sun goes down"), exactly as gibeon-pool used
 * 2:24's sundown. `depictsDeath: true` wires the first-visit violence
 * advisory automatically (src/data/scenes.ts).
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

  // Blends the fixed daytime rig toward a warmer, lower dusk state from
  // T_FAST onward (3:35's "till the sun goes down") — the one lighting hour
  // the text states directly (`poses.ts`'s `duskBlend`). Every other beat's
  // hour stays an unstated, disclosed placeholder (a fixed rig otherwise).
  useFrame(() => {
    const light = lightRef.current;
    if (!light) return;
    const { timeSec } = useAppStore.getState();
    const blend = duskBlend(timeSec);
    light.intensity = 1.5 - blend * 0.7;
    light.color.setHSL(0.12 - blend * 0.02, 0.55 + blend * 0.22, 0.78 - blend * 0.2);
    light.position.set(420 - blend * 360, 700 - blend * 560, -260 + blend * 480);
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

  // Three crowd-scale treatments (`claim-gate-cast-scale`, never conflated):
  // the raid party (≈15-25 at high tier), the mourning assembly (≈60-90, the
  // scene's one real crowd), and ambient townsfolk (≈15-25). High-tier
  // total: 4 principals + raid party + mourning assembly + town background
  // ≈ 100-140 figures, the brief's target — the milestone's largest scene,
  // still cheaper than Gilboa (procession pace, no combat choreography).
  const raidPartyCount = Math.min(25, Math.max(15, Math.round(profile.figureCount * 0.3)));
  const mourningAssemblyCount = Math.max(30, Math.round(profile.figureCount * 1.06));
  const townBackgroundCount = Math.min(25, Math.max(12, Math.round(profile.figureCount * 0.3)));

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
      <RaidParty count={raidPartyCount} shadows={profile.shadows} />
      <MourningAssembly count={mourningAssemblyCount} shadows={profile.shadows} />
      <TownBackground count={townBackgroundCount} shadows={profile.shadows} />
      <PrincipalFigures shadows={profile.shadows} />
      <Bier shadows={profile.shadows} />
      {showLabels && HEBRON_GATE_ENTITIES.map((e) => <EntityLabel key={e.id} entity={e} />)}
      <TimelineDriver durationSec={SCENE.durationSec} />
      <ObserverControls />
    </>
  );
}
