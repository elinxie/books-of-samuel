/**
 * Temporary visual QA harness for the character system (not part of the app;
 * removed before merge or kept dev-only). Renders a lineup:
 *   0: principal, rest pose, front      1: principal w/ cloak, walk mid-stride
 *   2: crowd detail, walk contact       3: crowd, full kneel (baked)
 *   4: crowd, mourn                      5: crowd baked walk bucket (static)
 */
import * as THREE from 'three';
import { mulberry32 } from '../engine/noise';
import {
  applyClipPose,
  bakePoseGeometry,
  buildCharacterRig,
  makeClips,
  randomCharacterParams,
} from '../engine/characters';

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(1.5);
renderer.shadowMap.enabled = true;
document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();
scene.background = new THREE.Color('#cfc2a6');
const camera = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, 0.1, 100);
const QA_PRE = new URLSearchParams(window.location.search).get('qa') ?? undefined;
if (QA_PRE === 'kneel-cloak') {
  camera.position.set(0.15, 0.62, 2.3);
  camera.lookAt(0, 0.42, 0);
} else if (QA_PRE === 'walk-swing') {
  camera.position.set(0.1, 0.85, 2.6);
  camera.lookAt(0, 0.6, 0);
} else {
  camera.position.set(0.6, 1.55, 7.2);
  camera.lookAt(0, 0.95, 0);
}

scene.add(new THREE.HemisphereLight('#e8d9b8', '#6b5a44', 0.85));
const sun = new THREE.DirectionalLight('#ffd9a8', 2.2);
sun.position.set(-4, 6, 5);
sun.castShadow = true;
sun.shadow.mapSize.set(2048, 2048);
scene.add(sun);
const ground = new THREE.Mesh(
  new THREE.PlaneGeometry(30, 30),
  new THREE.MeshStandardMaterial({ color: '#b5a179', roughness: 1 }),
);
ground.rotation.x = -Math.PI / 2;
ground.receiveShadow = true;
scene.add(ground);

const material = new THREE.MeshStandardMaterial({
  vertexColors: true,
  roughness: 0.92,
  side: THREE.DoubleSide,
});

function addSkinned(
  seed: number,
  detail: 'crowd' | 'principal',
  x: number,
  opts: {
    clip?: 'walk' | 'idle' | 'kneel' | 'mourn';
    time?: number;
    yaw?: number;
    cloak?: boolean;
  },
) {
  const rng = mulberry32(seed);
  const params = randomCharacterParams(rng, { detail });
  if (opts.cloak === false) params.dress.cloakColor = undefined;
  if (opts.cloak === true && !params.dress.cloakColor) params.dress.cloakColor = '#4f4335';
  const rig = buildCharacterRig(params);
  if (opts.clip) {
    const clips = makeClips(params.stature);
    applyClipPose(rig, clips[opts.clip], opts.time ?? 0);
  }
  const mesh = new THREE.SkinnedMesh(rig.geometry, material);
  mesh.castShadow = true;
  mesh.add(rig.root);
  mesh.bind(rig.skeleton);
  mesh.position.x = x;
  mesh.rotation.y = opts.yaw ?? 0;
  scene.add(mesh);
}

function addBaked(
  seed: number,
  x: number,
  clip: 'walk' | 'kneel',
  time: number,
  yaw = 0,
  cloak?: boolean,
) {
  const rng = mulberry32(seed);
  const params = randomCharacterParams(rng, { detail: 'crowd' });
  if (cloak === false) params.dress.cloakColor = undefined;
  if (cloak === true && !params.dress.cloakColor) params.dress.cloakColor = '#4f4335';
  const rig = buildCharacterRig(params);
  const clips = makeClips(params.stature);
  const geo = bakePoseGeometry(rig, clips[clip], time);
  const mesh = new THREE.Mesh(geo, material);
  mesh.castShadow = true;
  mesh.position.x = x;
  mesh.rotation.y = yaw;
  scene.add(mesh);
}

const QA = new URLSearchParams(window.location.search).get('qa') ?? undefined;

const yawParam = new URLSearchParams(window.location.search).get('yaw');
const timeParam = new URLSearchParams(window.location.search).get('t');

if (QA === 'kneel-cloak') {
  // Full kneel + cloak, single figure — yaw param picks front/side/back.
  const yaw = yawParam ? Number(yawParam) : 0;
  addBaked(14, 0, 'kneel', 2, yaw, true);
} else if (QA === 'walk-swing') {
  // Walk swing side view at a chosen time — Task 1b verification.
  const time = timeParam ? Number(timeParam) : 0.55;
  addBaked(21, 0, 'walk', time, Math.PI / 2, false);
} else {
  addSkinned(11, 'principal', -3.4, { cloak: false });
  addSkinned(12, 'principal', -2.1, { clip: 'walk', time: 0.28, yaw: 0.7, cloak: true });
  addSkinned(13, 'crowd', -0.7, { clip: 'walk', time: 0, yaw: -0.5 });
  addBaked(14, 0.7, 'kneel', 2);
  addSkinned(15, 'crowd', 1.9, { clip: 'mourn', time: 1, yaw: 0.3 });
  addBaked(16, 3.2, 'walk', 0.55, Math.PI / 5);
  // Back-view principal for hair/cloak check.
  addSkinned(17, 'principal', 4.6, { yaw: Math.PI, cloak: true });
}

renderer.render(scene, camera);
document.title = 'char-preview-ready';
