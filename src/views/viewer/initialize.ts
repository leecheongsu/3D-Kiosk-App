import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { CSS3DObject } from 'three/examples/jsm/renderers/CSS3DRenderer';

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

    planeNormal.x = (planeNormal.x * widthHalf) + widthHalf;
    planeNormal.y = -(planeNormal.y * heightHalf) + heightHalf;


    const htmlParagraphElement = document.createElement('p');
    htmlParagraphElement.style.fontSize = '16px';
    htmlParagraphElement.style.color = 'white';
    htmlParagraphElement.style.zIndex = '9999';
    htmlParagraphElement.style.fontWeight = '900';
    htmlParagraphElement.textContent = icon.caption;

    const htmlDivElement = document.createElement('div');
    htmlDivElement.id = icon.caption;
    htmlDivElement.appendChild(htmlParagraphElement);
    htmlDivElement.style.zIndex = '999';
    htmlDivElement.style.position = 'fixed';
    htmlDivElement.style.left = `${planeNormal.x}px`;
    htmlDivElement.style.top = `${planeNormal.y}px`;
    htmlDivElement.style.display = 'flex';
    htmlDivElement.style.width = 'auto';
    htmlDivElement.style.height = 'auto';
    htmlDivElement.style.background = '#094fad';
    htmlDivElement.style.visibility = 'hidden';
    htmlDivElement.style.textAlign = 'center';
    htmlDivElement.style.padding = '0px 15px';
    htmlDivElement.style.borderRadius = '10px';
    htmlDivElement.style.textAlign = 'center';

    document.body.appendChild(htmlDivElement);

    const css3DObject = new CSS3DObject(htmlDivElement);
    css3DObject.position.set(x, y, z);

    scene.add(css3DObject);
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
        document.getElementById(v.userData.LABEL).style.visibility = 'hidden';
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
          elementById.style.visibility = 'visible';
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
