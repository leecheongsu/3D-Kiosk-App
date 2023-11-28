import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

export default function loadModel(canvas: HTMLCanvasElement, modelUrl: string, icons: any) {
  // Canvas
  if (!canvas) {
    throw new Error('No canvas found');
  }

  const scene = new THREE.Scene();

  // Renderer
  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio > 1 ? 2 : 1);

  const color1 = new THREE.Color( 0x007aff);
  const color2 = new THREE.Color(0x0303E1);

  const gradientCanvas = document.createElement('canvas');
  gradientCanvas.width = 256;
  gradientCanvas.height = 256;

  const gradientContext = gradientCanvas.getContext('2d');
  const gradient = gradientContext.createLinearGradient(0, 0, 0, gradientCanvas.height);
  gradient.addColorStop(0, color1.getStyle());
  gradient.addColorStop(1, color2.getStyle());

  gradientContext.fillStyle = gradient;
  gradientContext.fillRect(0, 0, gradientCanvas.width, gradientCanvas.height);

  const gradientTexture = new THREE.CanvasTexture(gradientCanvas);
  scene.background = gradientTexture;

  const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.y = 20;
  camera.position.z = 40;

  // RayCaster
  const raycaster = new THREE.Raycaster();
  const pointer = new THREE.Vector2();

  //Distance, Vector3
  const plane = new THREE.Plane();
  const planeNormal = new THREE.Vector3();

  // Lights
  // 전역으로 빛 방출
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
  scene.add(ambientLight);

  // 특정방향으로 빛 방출
  const directionalLight = new THREE.DirectionalLight(0xffffff, 3);
  directionalLight.position.set(100, 200, 100);
  scene.add(directionalLight);

  // Controls
  const controls = new OrbitControls(camera, canvas);
  controls.enableDamping = true;
  // default값이 true
  // controls.enablePan = true;
  controls.minDistance = 20;
  controls.maxDistance = 150;
  controls.minPolarAngle = Math.PI / 4; // 위 아래 회전 각도의 최소값 (0은 수평)
  controls.maxPolarAngle = Math.PI / 2; // 위 아래 회전 각도의 최대값 (Math.PI는 수직)
  controls.minAzimuthAngle = -Math.PI / 5; // 좌우 회전 각도의 최소값 (-Math.PI / 5는 왼쪽으로 55도)
  controls.maxAzimuthAngle = Math.PI / 5; // 좌우 회전 각도의 최대값 (Math.PI / 5는 오른쪽으로 45도)
  controls.update();

  // Model
  let model: THREE.Object3D;
  let mixer: THREE.AnimationMixer;
  const loader = new GLTFLoader();
  loader.load(modelUrl, (gltf) => {
    model = gltf.scene;
    model.scale.set(0.3, 0.3, 0.3);
    model.position.y = -6;
    scene.add(model);
    mixer = new THREE.AnimationMixer(model);

    // 애니메이션 데이터를 로드합니다.
    const clips = gltf.animations;

    if (clips.length) {
      // 애니메이션 클립을 Mixer에 추가합니다.
      mixer.clipAction(clips[0]).play();
    }
  });

  // 아이콘 넣기
  icons.forEach((icon) => {
    const { x, y, z } = icon.position;

    // 아이콘 그리기
    let textureLoader = new THREE.TextureLoader();
    let texture = textureLoader.load(icon.imageUrl);

    let circleGeom = new THREE.CircleGeometry(icon.radius, 30);

    let circleMat = new THREE.MeshBasicMaterial({
      map: texture,
      transparent: true,
    });

    let circleMesh = new THREE.Mesh(circleGeom, circleMat);
    circleMesh.position.set(x, y, z);

    // 아이콘 속성 설정
    circleMesh.userData = { URL: icon.linkUrl, TYPE: 'icon', isHovered: false };

    scene.add(circleMesh);
  });

  // 그리기
  const clock = new THREE.Clock();

  function draw() {
    clock.getDelta();

    // Mixer 업데이트
    if (model) {
      mixer.update(0.002);
    }

    // 아이콘과 라벨을 카메라 방향으로 보기
    scene.traverse(function (object) {
      if (object.userData.TYPE == 'icon') {
        object.lookAt(camera.position);
      }
    });

    controls.update();
    renderer.render(scene, camera);
    renderer.setAnimationLoop(draw);
  }
  draw();


  // 화면 리사이즈
  /**
   *  NOTICE.  -> 카테고리에 따라 Camera 위치 조정해야할 듯
   */
  function resizeCanvas() {
    const newWidth = window.innerWidth;
    const newHeight = window.innerHeight;

    // 렌더러 크기 조정
    renderer.setSize(newWidth, newHeight);

    // 카메라 비율 조정
    camera.aspect = newWidth / newHeight;
    camera.updateProjectionMatrix();
  }

  //아이콘 클릭
  const mouseUpListener = (e: MouseEvent) => {
    pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
    pointer.y = -(e.clientY / window.innerHeight) * 2 + 1;

    // find intersections
    raycaster.setFromCamera(pointer, camera);
    const intersects = raycaster.intersectObjects(scene.children, true);

    if (intersects.length !== 0) {
      if (intersects[0].object.userData.TYPE == 'icon') {
        window.open(intersects[0].object.userData.URL, '_blank');
      } else {
      }
    } else {
    }
  };

  /**
   * NOTICE. 3D 마우스 포인터 좌표값
   */
  // const clickListener = (e: MouseEvent) => {
  //   pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
  //   pointer.y = -(e.clientY / window.innerHeight) * 2 + 1;
  //
  //   planeNormal.copy(camera.position).normalize();
  //   plane.setFromNormalAndCoplanarPoint(camera.getWorldDirection(plane.normal), scene.position);
  //
  //   raycaster.setFromCamera(pointer, camera);
  //   const data = new Vector3();
  //   raycaster.ray.intersectPlane(plane, data);
  //
  //   printLogObj(data);
  // };
  window.addEventListener('resize', resizeCanvas);
  window.addEventListener('mouseup', mouseUpListener)
}
