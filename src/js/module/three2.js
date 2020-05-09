import * as THREE from 'three';
import * as PointerLockControls from 'three-pointer-lock-controls';

const initThree2 = () => {
/*
 * 3D FLOATING TYPO
 * Made with ThreeJS - Enjoy!
 * https://threejs.org/
 *
 * Move the cursor to zoom in/out and float around the cubed space.
 * On mobile touch + drag screen to zoom in/out and float.
 *
 * Inspired by one of the ThreeJS examples in documentation.
 *
 * #014 - #100DaysOfCode
 * By ilithya | 2019
 */

const nearDist = 0.1;
const farDist = 5000;

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  nearDist,
  farDist
);
camera.position.x = farDist * -2;
camera.position.z = 400;

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setClearColor("#F7F2EC"); // Backgrond Color - Blue
renderer.setPixelRatio(window.devicePixelRatio); // For HiDPI devices to prevent bluring output canvas
renderer.setSize(window.innerWidth, window.innerHeight);
document.querySelector("#canvas-wrapper").appendChild(renderer.domElement);




// CREATE CUBES
const cubeSize = 15;
const geometry = new THREE.BoxBufferGeometry(cubeSize, cubeSize, cubeSize); // BufferAttribute allows for more efficient passing of data to the GPU
const material = new THREE.MeshBasicMaterial( { color: '#FE5302' } ); // Maps the normal vectors to RGB colors
const group = new THREE.Group();
for (let i = 0; i < 550; i++) {
  const mesh = new THREE.Mesh(geometry, material);
  const dist = farDist / 3;
  const distDouble = dist * 2;
  const tau = 2 * Math.PI; // One turn

  mesh.position.x = Math.random() * distDouble - dist;
  mesh.position.y = Math.random() * distDouble - dist;
  mesh.position.z = Math.random() * distDouble - dist;
  mesh.rotation.x = Math.random() * tau;
  mesh.rotation.y = Math.random() * tau;
  mesh.rotation.z = Math.random() * tau;

  // Manually control when 3D transformations recalculation occurs for better performance
  mesh.matrixAutoUpdate = false;
  mesh.updateMatrix();

  group.add(mesh);
}
scene.add(group);

// CREATE TYPOGRAPHY
const loader = new THREE.FontLoader();
const textMesh = new THREE.Mesh();
const createTypo = font => {
  const word = "MANNEQUIN";
  const typoProperties = {
    font: font,
    size: 200,
    height: 10,
    curveSegments: 3,
    bevelEnabled: true,
    bevelThickness: 1,
    bevelSize: 2,
    bevelOffset: 1,
    bevelSegments: 8
  };
  const text = new THREE.TextGeometry(word, typoProperties);
  textMesh.geometry = text;
  textMesh.material = material;
  textMesh.position.x = 200 * -2;
  textMesh.position.z = 200 * -1;
  scene.add(textMesh);



};
loader.load(
  "https://threejs.org/examples/fonts/helvetikear.typeface.json",
  createTypo
);

// CREATE PART OF THE MOUSE/TOUCH OVER EFFECT
let mouseX = 0;
let mouseY = 0;
const mouseFX = {
  windowHalfX: window.innerWidth / 2,
  windowHalfY: window.innerHeight / 2,
  coordinates: function(coordX, coordY) {
    mouseX = (coordX - mouseFX.windowHalfX) * 4;
    mouseY = (coordY - mouseFX.windowHalfY) * 4;
  },
  onMouseMove: function(e) {
    mouseFX.coordinates(e.clientX, e.clientY);
  },
  onTouchMove: function(e) {
    mouseFX.coordinates(e.changedTouches[0].clientX, e.changedTouches[0].clientY);
  }
};
document.addEventListener("mousemove", mouseFX.onMouseMove, false);
document.addEventListener("touchmove", mouseFX.onTouchMove, false);

// RENDER 3D GRAPHIC
const render = () => {
  requestAnimationFrame(render);

  // Camera animation
  // Works with onMouseMove and onTouchMove functions
  camera.position.x += (mouseX - camera.position.x) * 0.04;
  camera.position.y += (mouseY * -1 - camera.position.y) * 0.04;
  camera.lookAt(scene.position); // Rotates the object to face a point in world space

  const t = Date.now() * 0.001;
  const rx = Math.sin(t * 0.7) * 0.5;
  const ry = Math.sin(t * 0.3) * 0.5;
  const rz = Math.sin(t * 0.2) * 0.5;
  group.rotation.x = rx;
  group.rotation.y = ry;
  group.rotation.z = rz;
  textMesh.rotation.x = rx;
  textMesh.rotation.y = ry;
  textMesh.rotation.z = rx; // Happy accident :)

  renderer.render(scene, camera);
};
render();

// RESIZE CANVAS
// This is buggy in some iOS...
// const resizeCanvas = () => {
//  camera.aspect = window.innerWidth / window.innerHeight;
//  camera.updateProjectionMatrix();
//  renderer.setSize(window.innerWidth, window.innerHeight);
// };
// window.addEventListener("resize", resizeCanvas, false);
}

export { initThree2 }
