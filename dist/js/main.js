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

//import './components/background';
//import './components/birds';

var abstracts = require('./abstracts');

var sceneEl = document.querySelector('a-scene');
var scene = sceneEl.object3D;

// Floor
var floorG = new THREE.BoxGeometry(1000, 0.001, 1000);
var floorM = new THREE.MeshStandardMaterial({
    color: abstracts.themeMonoColor1,
    side: THREE.DoubleSide

});

var floorMesh = new THREE.Mesh(floorG, floorM);
floorMesh.translateY(abstracts.particles.FLOOR_LEVEL);
floorMesh.receiveShadow = true;
scene.add(floorMesh);

var floorG2 = new THREE.BoxGeometry(10, 0.001, 10);
var floorM2 = new THREE.MeshStandardMaterial({
    color: abstracts.themeMonoColor1,
    side: THREE.DoubleSide

});

var floorMesh2 = new THREE.Mesh(floorG2, floorM2);
floorMesh2.translateZ(100);
floorMesh2.receiveShadow = true;
scene.add(floorMesh2);

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

},{"./abstracts":1}]},{},[2])

//# sourceMappingURL=main.js.map
