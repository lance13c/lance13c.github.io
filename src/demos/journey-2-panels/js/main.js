//import './components/background';
//import './components/birds';

const abstracts = require('./abstracts');

let sceneEl = document.querySelector('a-scene');
let scene = sceneEl.object3D;

let homePanelEl = document.querySelector('.home__panel');
let projectsPanelEl = document.querySelector('.projects__panel');

let cameraEl = document.querySelector('.camera');


let homeEl = document.querySelector('.nav--home');
let projectsEl = document.querySelector('.nav--projects');
let blogEl = document.querySelector('.nav--blog');
let resumeEl = document.querySelector('.nav--resume');
let lifeEl = document.querySelector('.nav--life');


homeEl.addEventListener('click', (e) => {
    goTo('home');
});

projectsEl.addEventListener('click', (e) => {
    goTo('projects');
});

blogEl.addEventListener('click', (e) => {
    goTo('blog');
});

console.log(homePanelEl);
console.log(projectsPanelEl);

// Emits an event on the camera element;
function goTo(route) {
    cameraEl.emit(route);
    console.log(`Emit: ${route}`);
}