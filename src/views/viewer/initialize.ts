import { secureHeapUsed } from 'crypto';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

import { CSS3DRenderer, CSS3DObject } from 'three/examples/jsm/renderers/CSS3DRenderer.js';

import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';

export default function loadModel(canvas: HTMLCanvasElement, modelUrl: string, icons: any) {
  // Canvas
  if (!canvas) {
    throw new Error('No canvas found');
  }

  console.log('icons: length' + icons.length);

  // Renderer
  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio > 1 ? 2 : 1);

  // 배경 색상
  renderer.setClearColor(0x49c6e5);

  const scene = new THREE.Scene();

  const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.y = 20;
  camera.position.z = 40;


  // RayCaster
  const raycaster = new THREE.Raycaster();
  const pointer = new THREE.Vector2();

  // Lights
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
  scene.add(ambientLight);

  const directionalLight = new THREE.DirectionalLight(0xffffff, 3);
  directionalLight.position.set(100, 200, 100);
  scene.add(directionalLight);

   // Controls
  const controls = new OrbitControls(camera, canvas);
  controls.enableDamping = true;
  controls.enablePan = true;
  controls.minDistance = 20;
  controls.maxDistance = 150;
  controls.minPolarAngle = Math.PI / 4; // 위 아래 회전 각도의 최소값 (0은 수평)
  controls.maxPolarAngle = Math.PI / 2; // 위 아래 회전 각도의 최대값 (Math.PI는 수직)
  controls.minAzimuthAngle = -Math.PI / 5; // 좌우 회전 각도의 최소값 (-Math.PI / 5는 왼쪽으로 55도)
  controls.maxAzimuthAngle = Math.PI / 5; // 좌우 회전 각도의 최대값 (Math.PI / 5는 오른쪽으로 45도)
  controls.update();

 
  // CSS2DRenderer
  const labelRenderer = new CSS3DRenderer();
  labelRenderer.setSize(window.innerWidth, window.innerHeight);
  labelRenderer.domElement.style.position = 'absolute';
  labelRenderer.domElement.style.top = '0px';
  labelRenderer.domElement.style.pointerEvents = 'none';
  document.body.appendChild(labelRenderer.domElement);
 
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
  icons.forEach(icon => {

    const textureLoader = new THREE.TextureLoader();
    const texture = textureLoader.load(icon.image_url);

    let circleGeom = new THREE.CircleGeometry(icon.radius, 32);
    circleGeom.translate(icon.x, icon.y, icon.z);
    let circleMat = new THREE.MeshBasicMaterial({
        map: texture,
    });
    let circleMesh = new THREE.Mesh(circleGeom, circleMat);
    circleMesh.updateMatrixWorld(false);

    // 링크주소 설정
    circleMesh.userData = {URL: icon.link_url};
    scene.add(circleMesh);
  });

  //  텍스트 넣기
  // const floader = new FontLoader();
  // floader.load('public/NanumGothic_Regular.json', function(font){
  //   const message = '   Three.js\nSimple text.';  
  // 	const shapes = font.generateShapes( message, 100 );
	// 	const geometry = new THREE.ShapeGeometry( shapes );

  // });



  //label 그리기
  const p = document.createElement('p');
  p.className = 'tooltip';
  p.textContent = '공업탑 로터리';
  p.style.fontSize='0.8px';
  p.style.color='white'
  const pContainer = document.createElement('div');
  pContainer.appendChild(p);
  const cPointLabel = new CSS3DObject(pContainer);
  cPointLabel.position.set(4, 2 , 3);
  scene.add(cPointLabel);

  // 테스트 텍스트 그리기
  /*
  let fontLoader = new FontLoader();
  fontLoader.load("Do Hyeon_Regular.json", (font) => {
    let geometry = new TextGeometry(
        "GIS Devloper, 김형준",
        { 
            font: font,
            size: 1,
            height: 0,
            curveSegments: 12
        }
    );
      
    geometry.translate( 0, 0, 0);
    geometry.scale(10, 10, 10);

    let material = new THREE.MeshBasicMaterial({
        color: 0xffffff, 
        wireframe: true
    });

    let text = new THREE.Mesh(geometry, material);
    text.position.z = -150;
    scene.add(text);
  });
  */

  // 그리기
  const clock = new THREE.Clock();

  function draw() {
    const delta = clock.getDelta();

    // Mixer 업데이트
    if (model) {
      mixer.update(0.002);
    }

  
    controls.update();

    labelRenderer.render(scene, camera);
    renderer.render(scene, camera);

    renderer.setAnimationLoop(draw);
  }

  draw();

  // 화면 리사이즈
  function resizeCanvas() {
    const newWidth = window.innerWidth;
    const newHeight = window.innerHeight;

    // 렌더러 크기 조정
    labelRenderer.setSize(newWidth, newHeight);
    renderer.setSize(newWidth, newHeight);

    // 카메라 비율 조정
    camera.aspect = newWidth / newHeight;
    camera.updateProjectionMatrix();
  }
  window.addEventListener('resize', resizeCanvas);

  // 화면 클릭
  function onMouseUp(event) {
    pointer.x = ( event.clientX / window.innerWidth ) * 2 - 1;
		pointer.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

  	// find intersections
		raycaster.setFromCamera( pointer, camera );
    const intersects = raycaster.intersectObjects( scene.children, false );

      if ( intersects.length > 0 ) {
        console.log('intersected!!');
        console.log(intersects[0].object.userData.URL);
        window.open(intersects[0].object.userData.URL, '_blank');

        // if ( INTERSECTED != intersects[ 0 ].object ) {

        //   if ( INTERSECTED ) INTERSECTED.material.emissive.setHex( INTERSECTED.currentHex );

        //   INTERSECTED = intersects[ 0 ].object;
        //   INTERSECTED.currentHex = INTERSECTED.material.emissive.getHex();
        //   INTERSECTED.material.emissive.setHex( 0xff0000 );

        // }

      } else {

        // if ( INTERSECTED ) INTERSECTED.material.emissive.setHex( INTERSECTED.currentHex );

        // INTERSECTED = null;

      }

        

    console.log('clicked');
  }
  window.addEventListener( 'mouseup', onMouseUp );


}
