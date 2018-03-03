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

var homePanelEl = document.querySelector('.home__panel');
var projectsPanelEl = document.querySelector('.projects__panel');

var cameraEl = document.querySelector('.camera');

var homeEl = document.querySelector('.nav--home');
var projectsEl = document.querySelector('.nav--projects');
var blogEl = document.querySelector('.nav--blog');
var resumeEl = document.querySelector('.nav--resume');
var lifeEl = document.querySelector('.nav--life');

homeEl.addEventListener('mouseup', function (e) {
    goTo('home');
});

//homeEl.addEventListener('')

projectsEl.addEventListener('mouseup', function (e) {
    goTo('projects');
});
//projectsEl.addEventListener('mouseout', )

blogEl.addEventListener('mouseup', function (e) {
    goTo('blog');
});

console.log(homePanelEl);
console.log(projectsPanelEl);

// Emits an event on the camera element;
function goTo(route) {
    cameraEl.emit(route);
    console.log('Emit: ' + route);
}

},{"./abstracts":1}]},{},[2])

//# sourceMappingURL=main.js.map
