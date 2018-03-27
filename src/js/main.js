//import './components/background';
//import './components/birds';

const THREE = AFRAME.THREE;
const ThreeCSS = require('three-css3drenderer');
THREE.CSS3DRenderer = ThreeCSS.CSS3DRenderer;
THREE.CSS3DObject = ThreeCSS.CSS3DObject;
THREE.CSS3DSprite = ThreeCSS.CSS3DSprite;
console.log(THREE.CSS3DRenderer);

const abstracts = require('./abstracts');

let sceneEl = document.querySelector('a-scene');
let scene = sceneEl.object3D;

let homePanelEl = document.querySelector('.home__panel');
let projectsPanelEl = document.querySelector('.projects__panel');

let cameraEl = document.querySelector('[camera]');
let camera = cameraEl.getObject3D('camera');


let homeEl = document.querySelector('.nav--home');
let projectsEl = document.querySelector('.nav--projects');
let blogEl = document.querySelector('.nav--blog');
let resumeEl = document.querySelector('.nav--resume');
let lifeEl = document.querySelector('.nav--life');


homeEl.addEventListener('mouseup', (e) => {
    goTo('home');
});

//homeEl.addEventListener('')

projectsEl.addEventListener('mouseup', (e) => {
    goTo('projects');
});
//projectsEl.addEventListener('mouseout', )

blogEl.addEventListener('mouseup', (e) => {
    goTo('blog');
});

console.log(homePanelEl);
console.log(projectsPanelEl);

// Emits an event on the camera element;
function goTo(route) {
    cameraEl.emit(route);
    console.log(`Emit: ${route}`);
}

var material = new AFRAME.THREE.MeshBasicMaterial({ color: 0xeeeeee, wireframe: false, visible: false});
var geometry = new AFRAME.THREE.PlaneGeometry(2, 2, 32, 32);
var planeMesh= new AFRAME.THREE.Mesh( geometry, material );
planeMesh.position.set(0, 0, 1);
// add it to the WebGL scene
scene.add(planeMesh);

let cssScene = new AFRAME.THREE.Scene();



let cssRenderer = new THREE.CSS3DRenderer();
cssRenderer.setSize( window.innerWidth, window.innerHeight );
cssRenderer.domElement.style.position = 'absolute';
cssRenderer.domElement.style.top = 0;
document.body.appendChild(cssRenderer.domElement);


//var element = document.createElement( 'img' );
//element.src = 'assets/images/projects/hero/hero0.png';

// CSS Object
var element = document.createElement('h1');
element.innerHTML = "testing";
// create the object3d for this element
var cssObject = new THREE.CSS3DObject( element );
// we reference the same position and rotation 
cssObject.position.set(0, 0, 0);
cssObject.scale.set(0.01, 0.01, 0.01);
cssObject.rotation.set(0, 0, 0);
// add it to the css scene
cssScene.add(cssObject);


console.log('Camera');
console.log(camera);

function animate() {
	requestAnimationFrame( animate );
	cssRenderer.render( cssScene, camera );
}
animate();



