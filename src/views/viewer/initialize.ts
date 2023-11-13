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
  document.body.appendChild(labelRenderer.domElement);
  labelRenderer.domElement.style.position = 'absolute';
  labelRenderer.domElement.style.top = '0px';
  labelRenderer.domElement.style.pointerEvents = 'none';

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

    // 아이콘 그리기
    let textureLoader = new THREE.TextureLoader();
    let texture = textureLoader.load(icon.image_url);

    let circleGeom = new THREE.CircleGeometry(icon.icon_radius, 15);
    circleGeom.translate(icon.x, icon.y, icon.z);
    let circleMat = new THREE.MeshBasicMaterial({
        map: texture,
    });

    let circleMesh = new THREE.Mesh(circleGeom, circleMat);
    
    // 링크주소 설정
    circleMesh.userData = {URL: icon.link_url};
    scene.add(circleMesh);


     //label 그리기
    let p = document.createElement('p');
    p.textContent = icon.label;
    let pContainer = document.createElement('div');
    pContainer.appendChild(p);
  
    p.style.fontSize= icon.text_size + 'px';
    p.style.textAlign = 'left';
    p.style.paddingLeft = '0.5px';
    p.style.paddingRight = '0.5px';
    p.style.paddingTop = '0.3px';
    p.style.paddingBottom = '0.7px';
    p.style.color = '#' + icon.text_color;

    p.style.marginLeft = '0px';
    
    // p.style.background = '#ff0000';   
    // p.style.opacity = '0.9'; 
   
    let labelObject = new CSS3DObject(p);
    labelObject.position.set(icon.x, icon.y-0.6, icon.z);


    // text 코드
    // let test_geom = new THREE.SphereGeometry(0.2, 10, 10);
    // let test_mat = new THREE.MeshBasicMaterial({
    //   color: 0x87ceeb,
    // });

    // let test_mesh = new THREE.Mesh(test_geom, test_mat);
    // test_mesh.position.set(icon.x, icon.y, icon.z);
    
    // scene.add(test_mesh);


    scene.add(labelObject);
  
  });


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

      } else {

        // if ( INTERSECTED ) INTERSECTED.material.emissive.setHex( INTERSECTED.currentHex );

        // INTERSECTED = null;

      }

        

    console.log('clicked');
  }
  window.addEventListener( 'mouseup', onMouseUp );


}
