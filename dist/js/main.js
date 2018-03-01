(function(){function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s}return e})()({1:[function(require,module,exports){
"use strict";

var abstracts = {

    backgroundcolor: 0xfefefe,
    accentColor: 0x5588ff,
    skyColor: 0x87CEFA,
    groudColor: 0x3CB371,
    warmColor: 0xe5a665,

    themeMonoColor1: 0xF6FAFB,
    themeMonoColor2: 0xC3CACD,
    themeMonoColor3: 0x97A1A4,
    themeMonoColor4: 0x717C80,
    themeMonoColor5: 0x49565A,
    themeMonoColor6: 0x1F282C,

    particles: {
        FLOOR_LEVEL: -10
    }
};

module.exports = abstracts;

},{}],2:[function(require,module,exports){
'use strict';

var abstracts = require('../abstracts');
var Orbit = require('./orbit');
var Particles = require('./particles');

// Constents

var sceneEl = document.getElementById('scene');
var cameraRadius = 5;
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
scene.fog = new THREE.Fog(abstracts.skyColor, 90, 330);
renderer.setClearColor(abstracts.skyColor);
// Setup

var particles = new Particles(scene);

// Used in init
var clock = void 0;

// Used in initParticles
var floorGroup = void 0;

// Default Vectors
// Position based on field
var posMiddle = new THREE.Vector3(500, 0, 500);
var posShort = new THREE.Vector3(10, 0, 10);
// Rotation
// Objects
// Floor Texture

// Init
function init() {
    clock = new THREE.Clock();
}

// Floor
var floorG = new THREE.BoxGeometry(1000, 0.001, 1000);
var floorM = new THREE.MeshStandardMaterial({
    color: abstracts.themeMonoColor1,
    side: THREE.DoubleSide
});

var floorMesh = new THREE.Mesh(floorG, floorM);
//floorMesh.rotateX(1.6);
floorMesh.translateY(abstracts.particles.FLOOR_LEVEL);
scene.add(floorMesh);

// let farWallG = new THREE.BoxGeometry( 10000, 10000, 0.1);
// let farWallM = new THREE.MeshStandardMaterial( { color: abstracts.themeMonoColor1 } );
// let farWallMesh = new THREE.Mesh( farWallG, farWallM );
// farWallMesh.translateZ(-500);
// scene.add( farWallMesh );

var testOBJG = new THREE.BoxGeometry(-1, 1, 1);
var testOBJM = new THREE.MeshStandardMaterial({ color: abstracts.accentColor });
var testOBJMesh = new THREE.Mesh(testOBJG, testOBJM);
testOBJMesh.translateX(-3);
testOBJMesh.translateY(0);
testOBJMesh.translateZ(0);
scene.add(testOBJMesh);

// Lights
var light = new THREE.HemisphereLight(abstracts.themeMonoColor1, abstracts.themeMonoColor1, 1);
light.position.set(50, 50, 50);
scene.add(light);

// let pointLight = new THREE.PointLight(abstracts.warmColor, 0.5, 1000, 2);
// light.position.set( 0, 800, 0);
//scene.add( pointLight );

// Camera
camera.position.z = cameraRadius;
camera.rotateY(1);
camera.rotateX(-0.5);

// Add scene to HTML
sceneEl.appendChild(renderer.domElement);

window.addEventListener('resize', function () {
    var w = window.innerWidth,
        h = window.innerHeight;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h);
}, false);

var orbit = new Orbit(cameraRadius, camera);

function render(dt) {

    particles.groupUpdate(dt);
    renderer.render(scene, camera);
}

// Animate
function animate() {
    requestAnimationFrame(animate);
    render(clock.getDelta());
}

init();
particles.init();
animate();

},{"../abstracts":1,"./orbit":4,"./particles":5}],3:[function(require,module,exports){
'use strict';

console.log('test12');

},{}],4:[function(require,module,exports){
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// Allow the camera to orbit around

// TODO add camera init position
/*
* radius - radius to orbit
* camera - scene camera to move
* loopPos - Position to lookAt

* update - Run to continuously update the camera
*/
var Orbit = function () {
    function Orbit(radius, camera) {
        var lookPos = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : new THREE.Vector3(0, 0, 0);

        _classCallCheck(this, Orbit);

        this.radius = radius;
        this.camera = camera;
        this.z = radius;
        this.x = 0;
        this.zUp = 0;
        this.xUp = 1;
        this.lookPos = lookPos;
    }

    _createClass(Orbit, [{
        key: "update",
        value: function update() {
            this.camera.translateZ(this.zUp / 80);
            this.camera.translateX(this.xUp / 80);
            this.camera.lookAt(this.lookPos);

            if (this.zUp) {
                this.z += 0.1;
            } else {
                this.z -= 0.1;
            }

            if (this.xUp) {
                this.x += 0.1;
            } else {
                this.x -= 0.1;
            }

            if (this.x >= this.radius || this.x <= -this.radius) {
                this.xUp != this.xUp;
            }

            if (this.z >= this.radius || this.z <= -this.cameraRadius) {
                this.zUp != this.zUp;
            }
        }
    }]);

    return Orbit;
}();

module.exports = Orbit;

},{}],5:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var abstracts = require('../abstracts');
var GRASS_SIZE = 8;

// Assets
var assets = {
    grassBlade: "/assets/images/textures/grass_blade.png"

    // Takes in the scene
};function initParticles(scene) {
    initGrass(scene);
}

var Particles = function () {
    function Particles(scene) {
        _classCallCheck(this, Particles);

        this.scene = scene;
        this.groups = [];
        this.emitters = [];
    }

    _createClass(Particles, [{
        key: 'init',
        value: function init() {
            this.initGrass();
        }
    }, {
        key: 'initGrass',
        value: function initGrass() {
            // Grass
            var grassGroup = new SPE.Group({
                texture: {
                    value: new THREE.TextureLoader().load(assets.grassBlade)
                },
                //isStatic: true,
                maxParticleCount: 100000,
                hasPerspective: true,
                colorize: true,
                blending: THREE.NormalBlending,
                // transparent: false,
                // alphaTest: 5,
                depthWrite: 1,
                fog: 1
                // scale: 1
            });

            var grassEmitter = new SPE.Emitter({
                type: SPE.distributions.SPHERE,
                particleCount: 10000,
                isStatic: false,
                maxAge: {
                    value: 10,
                    spread: 3
                },
                position: {
                    value: new THREE.Vector3(-40, abstracts.particles.FLOOR_LEVEL - 1, -10),
                    radius: 1,
                    radiusScale: new THREE.Vector3(50, 0.001, 50)
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
                    value: GRASS_SIZE
                },
                angle: {
                    value: [0.2, -1, 0.2],
                    spread: 1
                }
            });

            grassGroup.addEmitter(grassEmitter);
            grassGroup.material.side = THREE.DoubleSide;

            this.emitters.push(grassEmitter);
            this.groups.push(grassGroup);
            this.scene.add(grassGroup.mesh);
        }
    }, {
        key: 'getGroups',
        value: function getGroups() {
            return this.groups;
        }

        // @param dt - delta time
        // This function should be used in a continuously updating loop.

    }, {
        key: 'groupUpdate',
        value: function groupUpdate(dt) {
            this.groups.forEach(function (group) {
                group.tick(dt);
            });
        }
    }]);

    return Particles;
}();

module.exports = Particles;

},{"../abstracts":1}],6:[function(require,module,exports){
'use strict';

require('./components/background');

require('./components/birds');

},{"./components/background":2,"./components/birds":3}]},{},[6])

//# sourceMappingURL=main.js.map
