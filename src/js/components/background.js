const abstracts = require('../abstracts');
const Orbit = require('./orbit');
const Particles = require('./particles');

// Constents

const sceneEl = document.getElementById('scene');
const cameraRadius = 5;
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
//scene.fog = new THREE.Fog( abstracts.skyColor, 90, 330 );
renderer.setClearColor( abstracts.themeMonoColor1 );


// Setup

let particles = new Particles(scene);

// Used in init
let clock;

// Used in initParticles
let floorGroup;

// Default Vectors
// Position based on field
let posMiddle = new THREE.Vector3(500, 0, 500);
let posShort = new THREE.Vector3(10, 0, 10);
// Rotation
// Objects
// Floor Texture

// Init
function init() {
    clock = new THREE.Clock();
}




// Floor
let floorG = new THREE.BoxGeometry( 1000, 0.001, 1000 );
let floorM = new THREE.MeshStandardMaterial( { 
    color: abstracts.themeMonoColor1,
    side: THREE.DoubleSide
});

// let floorMesh = new THREE.Mesh( floorG, floorM );
// //floorMesh.rotateX(1.6);
// floorMesh.translateY(abstracts.particles.FLOOR_LEVEL);
// scene.add( floorMesh );


// let farWallG = new THREE.BoxGeometry( 10000, 10000, 0.1);
// let farWallM = new THREE.MeshStandardMaterial( { color: abstracts.themeMonoColor1 } );
// let farWallMesh = new THREE.Mesh( farWallG, farWallM );
// farWallMesh.translateZ(-500);
// scene.add( farWallMesh );

let testOBJG = new THREE.BoxGeometry( -1, 1, 1);
let testOBJM = new THREE.MeshStandardMaterial( { color: abstracts.accentColor } );
let testOBJMesh = new THREE.Mesh( testOBJG, testOBJM );
testOBJMesh.translateX(-3);
testOBJMesh.translateY(0);
testOBJMesh.translateZ(0);
scene.add( testOBJMesh );





// Lights
let light = new THREE.DirectionalLight( abstracts.themeMonoColor1, 1 );
light.position.set( 50, 50, 50 );
scene.add( light );

// let pointLight = new THREE.PointLight(abstracts.warmColor, 0.5, 1000, 2);
// light.position.set( 0, 800, 0);
//scene.add( pointLight );

// Camera
camera.position.z = cameraRadius;
//camera.rotateY(1);
//camera.rotateX(-0.5);

// Add scene to HTML
sceneEl.appendChild( renderer.domElement );

window.addEventListener( 'resize', function() {
    let w = window.innerWidth,
        h = window.innerHeight;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize( w, h );
}, false );


let orbit = new Orbit(cameraRadius, camera);

function render(dt) {
    
    //particles.groupUpdate(dt);
    renderer.render( scene, camera );
}

// Animate
function animate() {
    requestAnimationFrame( animate );
    render(clock.getDelta());
}



init();
//particles.init();
animate();