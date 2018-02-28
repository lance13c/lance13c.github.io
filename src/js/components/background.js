const abstracts = require('../abstracts');


let sceneEl = document.getElementById('scene');

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );

// Default Vectors

// Position based on field
let posMiddle = new THREE.Vector3(500, 0, 500);

// Rotation


// Objects



// Floor Texture

let floorEmitter = new SPE.Emitter({
    type: SPE.distributions.SPHERE,
    particleCount: 10000,
    isStatic: true,
    maxAge: {
        value: 8,
        spread: 3
    },
    position: {
        value: new THREE.Vector3(0,0,0),
        radius: 10
    },
    wiggle: {
        value: 1,
        spread: 0.1
    },
    color: {
        //value: new THREE.Color(abstracts.themeMonoColor4)
    },
    size: {
        value: 1
    },
    angle: {
        value: .1,
        spread: .2
    }
});

let floorGroup = new SPE.Group({
	texture: {
        value: new THREE.TextureLoader().load( "/assets/images/textures/grass_blade.png")
    },
    maxParticleCount: 10000,
    hasPerspective: false,
    colorize: false,
    blending: THREE.AdditiveBlending,
    transparent: false,
    alphaTest: 5,
    depthWrite: 0,
    fog: 1,
    scale: 1
});

floorGroup.addEmitter(floorEmitter);

scene.add(floorGroup.mesh);

// Floor
let floorG = new THREE.BoxGeometry( 1000, 0.1, 1000 );
let floorM = new THREE.MeshStandardMaterial( { 
    color: abstracts.themeMonoColor1,
    side: THREE.DoubleSide
});

// let floorMesh = new THREE.Mesh( floorG, floorM );
// floorMesh.translateY(-10);
// scene.add( floorMesh );


// let farWallG = new THREE.BoxGeometry( 10000, 10000, 0.1);
// let farWallM = new THREE.MeshStandardMaterial( { color: abstracts.themeMonoColor1 } );
// let farWallMesh = new THREE.Mesh( farWallG, farWallM );
// farWallMesh.translateZ(-500);
// scene.add( farWallMesh );

let testOBJG = new THREE.BoxGeometry( 1, 1, 1);
let testOBJM = new THREE.MeshStandardMaterial( { color: abstracts.accentColor } );
let testOBJMesh = new THREE.Mesh( testOBJG, testOBJM );
scene.add( testOBJMesh );





// Lights
let light = new THREE.HemisphereLight( 0xffffbb, 0x080820, 6 );
scene.add( light );

// Camera
camera.position.z = 5;

sceneEl.appendChild( renderer.domElement );


// Updates all partical group
// Put this function inside the update method
function particleGroupUpdate( deltaTime ) {
    floorGroup.tick( deltaTime );
}

// Animate
function animate(deltaTime) {

    if (deltaTime) {
        particleGroupUpdate(deltaTime);
    }

    //test
    //camera.rotateY(.01);
    //camera.rotateX(.01);
    //floorMesh.rotateX(.1);
	requestAnimationFrame( animate );
	renderer.render( scene, camera );
}
animate();