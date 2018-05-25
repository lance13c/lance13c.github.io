import welcomeHTML from '../../../dist/js/vrViews/welcome.html.js';

function init(cssScene, elements, objects3d) {
    //console.log(welcomeHTML);

    let cssContainerEl = document.createElement('section');
    cssContainerEl.setAttribute("id", "vr-welcome");
    //cssContainerEl.setAttribute("class", "vr-page__scale--1");

    cssContainerEl.innerHTML += welcomeHTML;

    // create the object3d for this element
    var cssObject = new THREE.CSS3DObject( cssContainerEl );
    // we reference the same position and rotation 


    let welcomePos = elements.welcomePanelEl.components.position.data;

    //const yOffset = 0.55;
    cssObject.position.set(welcomePos.x, welcomePos.y, welcomePos.z);
    cssObject.scale.set(0.01, 0.01, 0.01);
    cssObject.rotation.set(0, 0, 0);
    // add it to the css scene
    cssScene.add(cssObject);
}

module.exports = {
    init: init
}

