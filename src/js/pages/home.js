import homeHTML from '../../../dist/js/vrViews/home.html';

function init(cssScene, elements, objects3d) {
    console.log(homeHTML);

    let cssContainerEl = document.createElement('section');
    cssContainerEl.setAttribute("id", "vr-home");
    cssContainerEl.setAttribute("class", "vr-page__scale--1");

    cssContainerEl.innerHTML += homeHTML;

    // create the object3d for this element
    var cssObject = new THREE.CSS3DObject( cssContainerEl );
    // we reference the same position and rotation 


    //const yOffset = 0.55;
    cssObject.position.set(objects3d.homePanel.position.x, 0, objects3d.homePanel.position.z);
    cssObject.scale.set(0.01, 0.01, 0.01);
    cssObject.rotation.set(0, 0, 0);
    // add it to the css scene
    cssScene.add(cssObject);
}

module.exports = {
    init: init
}

