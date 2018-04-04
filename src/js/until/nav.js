let homeEl = document.querySelector('.nav--home');
let projectsEl = document.querySelector('.nav--projects');
let blogEl = document.querySelector('.nav--blog');
let resumeEl = document.querySelector('.nav--resume');
let lifeEl = document.querySelector('.nav--life');

let cameraEl = document.querySelector('[camera]');

const BUFFER = 20;                  // Attempt to reduce nav hicups
const ANIMATION_TIME = 800 + BUFFER;
//let curAnimationRoute = cameraEl.querySelector('a-animation[begin="home"]');/
//console.log(curAnimationRoute);

homeEl.addEventListener('mouseup', (e) => {
    goTo('home', homeEl);
});

projectsEl.addEventListener('mouseup', (e) => {
    goTo('projects', projectsEl);
});

blogEl.addEventListener('mouseup', (e) => {
    goTo('blog', blogEl);
});

// Emits an event on the camera element;
// route - string name of route to emit
// el - element that correlates to route
function goTo(route, el) {
    cameraEl.emit(route);
    setBeforePos(route, el);
    console.log(`Emit: ${route}`);
}

// Sets the animation before position to the route, after route is emitted
// route - string name of route to emit
// el - element that correlates to route
function setBeforePos(route) {
    try {
        //let pos = curAnimationRoute.getAttribute('to');
        let curAnimationRoute = cameraEl.querySelector(`a-animation[begin="${route}"]`);
        let pos = curAnimationRoute.getAttribute('to');
        console.log('currentRoute');
        console.log(curAnimationRoute);
        let animations = [...cameraEl.querySelectorAll('a-animation')];
        
        // Animation nodes must be replaced, because animation attribute from and to can not be dynamically updated.
        setTimeout(() => {
            animations.forEach((a) => {
                let aCopy = a.cloneNode();
                aCopy.setAttribute('from', pos);
                cameraEl.removeChild(a);
                cameraEl.appendChild(aCopy);
               
            });
        }, ANIMATION_TIME);
        
        console.log(animations);
    
    } catch (e) {
        console.error(e);
    }
}