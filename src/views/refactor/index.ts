// Constants
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import THREE from "three";

const DEFAULT_CAMERA_POSITION = { x: 0, y: 20, z: 40 };
const AMBIENT_LIGHT_COLOR = 0xffffff;
const DIRECTIONAL_LIGHT_COLOR = 0xffffff;

function setupRenderer(canvas) {
  // ... 렌더러
}

function setupCamera() {
  const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.set(DEFAULT_CAMERA_POSITION.x, DEFAULT_CAMERA_POSITION.y, DEFAULT_CAMERA_POSITION.z);
  return camera;
}

function setupLights(scene) {
  const ambientLight = new THREE.AmbientLight(AMBIENT_LIGHT_COLOR, 0.5);
  const directionalLight = new THREE.DirectionalLight(DIRECTIONAL_LIGHT_COLOR, 3);
  directionalLight.position.set(100, 200, 100);
  scene.add(ambientLight, directionalLight);
}


export default function loadModel(canvas, modelUrl, icons, options) {
  const { enableDamping, minDistance, maxDistance, minPolarAngle, maxPolarAngle, minAzimuthAngle, maxAzimuthAngle } = options;

  // Renderer
  const renderer = setupRenderer(canvas);

  // Scene
  const scene = new THREE.Scene();

  // Camera
  const camera = setupCamera();

  // Lights
  setupLights(scene);

  // Controls
  const controls = new OrbitControls(camera, canvas);
  controls.enableDamping = enableDamping;
  controls.minDistance = minDistance;
  controls.maxDistance = maxDistance;
  controls.minPolarAngle = minPolarAngle;
  controls.maxPolarAngle = maxPolarAngle;
  controls.minAzimuthAngle = minAzimuthAngle;
  controls.maxAzimuthAngle = maxAzimuthAngle;
  controls.update();

}
