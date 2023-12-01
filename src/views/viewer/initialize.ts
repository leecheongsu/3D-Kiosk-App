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

  const color1 = new THREE.Color(0x007aff);
  const color2 = new THREE.Color(0x0303e1);

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
  camera.position.z = 55;

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
    model.position.x -= 15;
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
    const distance = Math.sqrt(
      Math.pow(camera.position.x - x, 2) + Math.pow(camera.position.y - y, 2) + Math.pow(camera.position.z - z, 2),
    );
    // 아이콘 크기 조절
    circleMesh.scale.set(distance / 40, distance / 40, distance / 40);
    // 아이콘 속성 설정
    circleMesh.userData = { URL: icon.linkUrl, TYPE: 'icon', LABEL: icon.caption };
    scene.add(circleMesh);

    const planeNormal = new THREE.Vector3();

    const widthHalf = 0.5 * renderer.domElement.width;
    const heightHalf = 0.5 * renderer.domElement.height;

    circleMesh.updateMatrixWorld();
    planeNormal.setFromMatrixPosition(circleMesh.matrixWorld);
    planeNormal.project(camera);

    // make always showing label by CanvasTexture
    const canvas = document.createElement('canvas');
    //canvas 해상도 설정
    canvas.width = 2048;
    canvas.height = 1024 / 5;

    const context = canvas.getContext('2d');
    const fontSize = 16 * 10;
    const fontFace = 'Arial';
    const fontWeight = 'bold';
    const fontColor = 'white';
    const lineHeight = 1.5;
    const padding = 5 * 10;
    const text = icon.caption;
    const textWidth = context.measureText(text).width * 10 * 0.8;
    const textHeight = fontSize * lineHeight;
    const width = textWidth + padding * 2;
    const height = textHeight + padding * 2;

    // draw background border radius 10px 사각형을 캔버스의 중앙에 그린다.
    context.fillStyle = 'rgba(0,0,0,0.5)';
    context.beginPath();
    context.moveTo(canvas.width / 2, 0);
    context.lineTo(canvas.width - 10, 0);
    context.quadraticCurveTo(canvas.width, 0, canvas.width, 10);
    context.lineTo(canvas.width, canvas.height - 10);
    context.quadraticCurveTo(canvas.width, canvas.height, canvas.width - 10, canvas.height);
    context.lineTo(10, canvas.height);
    context.quadraticCurveTo(0, canvas.height, 0, canvas.height - 10);
    context.lineTo(0, 10);
    context.quadraticCurveTo(0, 0, 10, 0);
    context.closePath();
    context.fill();

    // draw text
    context.font = `${fontWeight} ${fontSize}px ${fontFace}`;
    context.fillStyle = fontColor;
    context.textBaseline = 'top';
    context.textAlign = 'center';
    context.fillText(text, canvas.width / 2, padding);

    const _texture = new THREE.CanvasTexture(canvas);
    const material = new THREE.MeshBasicMaterial({
      map: _texture,
      transparent: true,
    });
    const geometry = new THREE.PlaneGeometry(canvas.width / 256, canvas.height / 256);
    const mesh = new THREE.Mesh(geometry, material);
    // mesh.scale.set(0.8, 0.8, 0.8);
    mesh.position.set(x, y + 1.5, z - 0.1);
    mesh.userData = { TYPE: 'label' };
    scene.add(mesh);
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

  function resizeCanvas() {
    const newWidth = window.innerWidth;
    const newHeight = window.innerHeight;

    // 렌더러 크기 조정
    renderer.setSize(newWidth, newHeight);

    // 카메라 비율 조정
    camera.aspect = newWidth / newHeight;
    camera.updateProjectionMatrix();
  }

  function resetIconScales() {
    scene.children.forEach((v) => {
      if (v.userData && v.userData.TYPE === 'icon') {
        const { x, y, z } = v.position;
        const distance = Math.sqrt(
          Math.pow(camera.position.x - x, 2) + Math.pow(camera.position.y - y, 2) + Math.pow(camera.position.z - z, 2),
        );
        // 아이콘 크기 조절
        v.scale.set(distance / 40, distance / 40, distance / 40);
        // document.getElementById(v.userData.LABEL).style.visibility = 'hidden';
      }
    });
  }

  const mouseMoveListener = (e: MouseEvent) => {
    const listener = () => {
      pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.y = -(e.clientY / window.innerHeight) * 2 + 1;

      raycaster.setFromCamera(pointer, camera);
      const intersects = raycaster.intersectObjects(scene.children, true);

      if (intersects.length !== 0) {
        if (intersects[0].object.userData.TYPE === 'icon') {
          intersects[0].object.scale.set(2, 2, 2);
          const elementById = document.getElementById(intersects[0].object.userData.LABEL);
          // elementById.style.visibility = 'visible';
        } else {
          resetIconScales();
        }
      } else {
        resetIconScales();
      }
    };
    listener();
  };

  const mouseUpListener = (e: MouseEvent) => {
    pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
    pointer.y = -(e.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(pointer, camera);
    const intersects = raycaster.intersectObjects(scene.children, true);

    if (intersects.length !== 0) {
      if (intersects[0].object.userData.TYPE === 'icon') {
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
  window.addEventListener('mousemove', mouseMoveListener);
  window.addEventListener('click', mouseUpListener);
}