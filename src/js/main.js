//import './components/background';
//import './components/birds';

const abstracts = require('./abstracts');

let sceneEl = document.querySelector('a-scene');
let scene = sceneEl.object3D;

let floorEl = document.createElement('a-plane');
floorEl.setAttribute('height', 100);
floorEl.setAttribute('width', 100);
floorEl.setAttribute('rotation', "-90 0 0");
floorEl.setAttribute('color', abstracts.themeMonoColor1);
floorEl.setAttribute('shadow', 'receive: true');

sceneEl.appendChild(floorEl);

// Floor
// let floorG = new THREE.BoxGeometry( 1000, 0.001, 1000 );
// let floorM = new THREE.MeshStandardMaterial( { 
//     color: abstracts.themeMonoColor1,
//     side: THREE.DoubleSide,

// });

// let floorMesh = new THREE.Mesh( floorG, floorM );
// floorMesh.translateY(abstracts.particles.FLOOR_LEVEL);
// floorMesh.receiveShadow = true;
// scene.add( floorMesh );


// let floorG2 = new THREE.BoxGeometry( 10, 0.001, 10 );
// let floorM2 = new THREE.MeshStandardMaterial( { 
//     color: abstracts.themeMonoColor1,
//     side: THREE.DoubleSide,

// });

// let floorMesh2 = new THREE.Mesh( floorG2, floorM2 );
// floorMesh2.translateZ(1);
// floorMesh2.receiveShadow = true;
// scene.add( floorMesh2 );


// // Panels
// let HomeG = new THREE.BoxGeometry( 0.1, 0.1, 0.1 );
// let HomeM = new THREE.MeshStandardMaterial( { 
//     color: abstracts.accentColor,
//     side: THREE.DoubleSide,

// });

// let HomeMesh = new THREE.Mesh( HomeG, HomeM );
//HomeMesh.position.set(0, 0, -50);
//HomeMesh.castShadow = true;

//HomeMesh.translateY(abstracts.particles.FLOOR_LEVEL);
//scene.add( HomeMesh );

console.log(sceneEl.object3D);