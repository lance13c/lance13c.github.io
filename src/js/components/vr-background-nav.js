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