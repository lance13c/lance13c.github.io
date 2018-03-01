const abstracts = require('../abstracts');


let sceneEl = document.getElementById('scene');

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
        maxParticleCount: 10000,
        hasPerspective: true,
        colorize: true,
        blending: THREE.NormalBlending,
        // transparent: false,
        // alphaTest: 5,
        // depthWrite: 0,
        // fog: 1,
        // scale: 1
    });
    
    let floorEmitter = new SPE.Emitter({
        type: SPE.distributions.SPHERE,
        particleCount: 100,
        isStatic: false,
        maxAge: {
            value: 8,
            spread: 3
        },
        position: {
            value: new THREE.Vector3(0,0,0),
            radius: 1,
            width: 10,
            height: 10
        },
        wiggle: {
            value: .0001,
            spread: .001
        },
        color: {
            value: new THREE.Color(abstracts.accentColor)
        },
        size: {
            value: 1
        },
        angle: {
            value: .2,
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

// let floorMesh = new THREE.Mesh( floorG, floorM );
// floorMesh.translateY(-10);
// scene.add( floorMesh );


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
let light = new THREE.HemisphereLight( 0xffffbb, 0x080820, 10 );
scene.add( light );

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
let z = cameraRadius;
let x = 0;
let zUp = 0;
let xUp = 1;

function render(dt) {
    camera.translateZ(zUp / 200);
    camera.translateX(xUp / 200);
    //camera.rotateY();
    particleGroupUpdate(dt);
    renderer.render( scene, camera );

    if (zUp) {
        z += 0.1;
    } else {
        z -= 0.1;
    }

    if (xUp) {
        x += 0.1;
    } else {
        x -= 0.1;
    }

    if (x >= cameraRadius || x <= -cameraRadius) {
        xUp != xUp
    }

    if (z >= cameraRadius || z <= -cameraRadius) {
        zUp != zUp
    }
}

// Animate
function animate() {
    requestAnimationFrame( animate );
    render(clock.getDelta());
}



init();
initParticles();
animate();