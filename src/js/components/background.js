const abstracts = require('../abstracts');
const Orbit = require('./orbit');

// Constents

const sceneEl = document.getElementById('scene');
const FLOOR_LEVEL = -10;
const cameraRadius = 5;
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );

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

function initParticles() {
    floorGroup = new SPE.Group({
        texture: {
            value: new THREE.TextureLoader().load( "/assets/images/textures/grass_blade.png")
        },
        maxParticleCount: 50000,
        hasPerspective: true,
        colorize: true,
        blending: THREE.NormalBlending,
        // transparent: false,
        // alphaTest: 5,
        // depthWrite: 0,
        // fog: 1,
        // scale: 1
    });
    
    let grassSize = 1;

    let floorEmitter = new SPE.Emitter({
        type: SPE.distributions.SPHERE,
        particleCount: 10000,
        isStatic: false,
        maxAge: {
            value: 10,
            spread: 3
        },
        position: {
            value: new THREE.Vector3(0, FLOOR_LEVEL - (grassSize/2), -50),
            radius: 1,
            radiusScale: new THREE.Vector3(50, 0.001, 50),
        },
        wiggle: {
            value: .0001,
            spread: .001
        },
        color: {
            value: new THREE.Color('green')
        },
        opacity: {
            value: [0, 1, 1, 1, 1, 0]
        },
        size: {
            value: grassSize
        },
        angle: {
            value: [0.2 , -1, 0.2],
            spread: .5
        }
    });
    
    
    floorGroup.addEmitter(floorEmitter);
    
    floorGroup.material.side = THREE.DoubleSide;
    scene.add(floorGroup.mesh);
}


// Floor
let floorG = new THREE.BoxGeometry( 1000, 0.1, 1000 );
let floorM = new THREE.MeshStandardMaterial( { 
    color: abstracts.themeMonoColor1,
    side: THREE.DoubleSide
});

let floorMesh = new THREE.Mesh( floorG, floorM );
floorMesh.translateY(FLOOR_LEVEL);
scene.add( floorMesh );


let farWallG = new THREE.BoxGeometry( 10000, 10000, 0.1);
let farWallM = new THREE.MeshStandardMaterial( { color: abstracts.themeMonoColor1 } );
let farWallMesh = new THREE.Mesh( farWallG, farWallM );
farWallMesh.translateZ(-500);
scene.add( farWallMesh );

let testOBJG = new THREE.BoxGeometry( -1, 1, 1);
let testOBJM = new THREE.MeshStandardMaterial( { color: abstracts.accentColor } );
let testOBJMesh = new THREE.Mesh( testOBJG, testOBJM );
testOBJMesh.translateX(-3);
testOBJMesh.translateY(0);
testOBJMesh.translateZ(0);
scene.add( testOBJMesh );





// Lights
let light = new THREE.HemisphereLight( 0x0000ff, 0x00ff00, 10 );
scene.add( light );

let pointLight = new THREE.PointLight(0x000000, 0.1, 1000);
light.position.set( 50, 50, 50 );
scene.add( pointLight );

// Camera
camera.position.z = cameraRadius;

sceneEl.appendChild( renderer.domElement );


// Updates all partical group
// Put this function inside the update method
function particleGroupUpdate( deltaTime ) {
    floorGroup.tick( deltaTime );
}

window.addEventListener( 'resize', function() {
    let w = window.innerWidth,
        h = window.innerHeight;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize( w, h );
}, false );


//let x = 0;




let orbit = new Orbit(cameraRadius, camera);

function render(dt) {
    
    //camera.rotateY();
    particleGroupUpdate(dt);
    renderer.render( scene, camera );
}

// Animate
function animate() {
    requestAnimationFrame( animate );
    render(clock.getDelta());

    //orbit.update();
}



init();
initParticles();
animate();