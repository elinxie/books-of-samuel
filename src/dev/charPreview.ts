import * as THREE from 'three';
import { buildCharacterRig, randomCharacterParams } from '../engine/characters';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 50);
camera.position.set(0, 1.2, 4);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.append(renderer.domElement);

for (let i = 0; i < 5; i += 1) {
  const rig = buildCharacterRig(randomCharacterParams(i, i === 0 ? 'principal' : 'crowd'));
  const material = new THREE.MeshStandardMaterial({
    color: rig.params.dress.tunicColor,
    roughness: 0.8,
  });
  const mesh = new THREE.Mesh(rig.geometry, material);
  mesh.position.x = (i - 2) * 0.55;
  scene.add(mesh);
}
scene.add(new THREE.HemisphereLight(0xffffff, 0x6d5138, 2));
renderer.setAnimationLoop(() => renderer.render(scene, camera));
