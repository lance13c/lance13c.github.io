import resumeHTML from '../../../dist/js/vrViews/resume.html.js';

function init(cssScene, elements, objects3d) {

    let cssContainerEl = document.createElement('section');
    cssContainerEl.setAttribute("id", "vr-resume");
    cssContainerEl.setAttribute("class", "vr-page__scale--1");

    cssContainerEl.innerHTML += resumeHTML;

    // create the object3d for this element
    var cssObject = new THREE.CSS3DObject( cssContainerEl );
    // we reference the same position and rotation 


    //const yOffset = 0.55;
    cssObject.position.set(objects3d.resumePanel.position.x, 0, objects3d.resumePanel.position.z);
    cssObject.scale.set(0.01, 0.01, 0.01);
    cssObject.rotation.set(0, 0, 0);
    // add it to the css scene
    cssScene.add(cssObject);
}

module.exports = {
    init: init
}

