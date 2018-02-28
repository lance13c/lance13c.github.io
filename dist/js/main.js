(function(){function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s}return e})()({1:[function(require,module,exports){
"use strict";

var abstracts = {

    backgroundcolor: 0xfefefe,
    accentColor: 0x5588ff,

    themeMonoColor1: 0xF6FAFB,
    themeMonoColor2: 0xC3CACD,
    themeMonoColor3: 0x97A1A4,
    themeMonoColor4: 0x717C80,
    themeMonoColor5: 0x49565A,
    themeMonoColor6: 0x1F282C
};

module.exports = abstracts;

},{}],2:[function(require,module,exports){
'use strict';

var abstracts = require('../abstracts');

var sceneEl = document.getElementById('scene');

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);

// Used in init
var clock = void 0;

// Used in initParticles
var floorGroup = void 0;

// Default Vectors
// Position based on field
var posMiddle = new THREE.Vector3(500, 0, 500);
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
            value: new THREE.TextureLoader().load("/assets/images/textures/grass_blade.png")
        },
        maxParticleCount: 10000
        // hasPerspective: false,
        // colorize: false,
        // blending: THREE.AdditiveBlending,
        // transparent: false,
        // alphaTest: 5,
        // depthWrite: 0,
        // fog: 1,
        // scale: 1
    });

    var floorEmitter = new SPE.Emitter({
        type: SPE.distributions.SPHERE,
        particleCount: 10000,
        isStatic: true,
        maxAge: {
            value: 8,
            spread: 3
        },
        position: {
            value: new THREE.Vector3(0, 0, 0)
        },
        wiggle: {
            value: 1,
            spread: 0.1
        },
        color: {
            value: new THREE.Color(abstracts.accentColor)
        },
        size: {
            value: 10
        },
        angle: {
            value: .1,
            spread: .2
        }
    });

    floorGroup.addEmitter(floorEmitter);
    scene.add(floorGroup.mesh);
}

// Floor
var floorG = new THREE.BoxGeometry(1000, 0.1, 1000);
var floorM = new THREE.MeshStandardMaterial({
    color: abstracts.themeMonoColor1,
    side: THREE.DoubleSide
});

// let floorMesh = new THREE.Mesh( floorG, floorM );
// floorMesh.translateY(-10);
// scene.add( floorMesh );


var farWallG = new THREE.BoxGeometry(10000, 10000, 0.1);
var farWallM = new THREE.MeshStandardMaterial({ color: abstracts.themeMonoColor1 });
var farWallMesh = new THREE.Mesh(farWallG, farWallM);
farWallMesh.translateZ(-500);
scene.add(farWallMesh);

var testOBJG = new THREE.BoxGeometry(1, 1, 1);
var testOBJM = new THREE.MeshStandardMaterial({ color: abstracts.accentColor });
var testOBJMesh = new THREE.Mesh(testOBJG, testOBJM);
scene.add(testOBJMesh);

// Lights
var light = new THREE.HemisphereLight(0xffffbb, 0x080820, 6);
scene.add(light);

// Camera
camera.position.z = 5;

sceneEl.appendChild(renderer.domElement);

// Updates all partical group
// Put this function inside the update method
function particleGroupUpdate(deltaTime) {
    floorGroup.tick(deltaTime);
}

window.addEventListener('resize', function () {
    var w = window.innerWidth,
        h = window.innerHeight;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h);
}, false);

function render(dt) {
    //camera.rotateY(0.01);
    //camera.rotateX(0.02);
    particleGroupUpdate(dt);
    renderer.render(scene, camera);
}

// Animate
function animate() {
    requestAnimationFrame(animate);
    render(clock.getDelta());
}

init();
initParticles();
animate();

},{"../abstracts":1}],3:[function(require,module,exports){
'use strict';

console.log('test12');

},{}],4:[function(require,module,exports){
'use strict';

require('./components/background');

require('./components/birds');

},{"./components/background":2,"./components/birds":3}]},{},[4])

//# sourceMappingURL=main.js.map
