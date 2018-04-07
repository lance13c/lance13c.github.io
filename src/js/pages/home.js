
function init(cssScene, elements, objects3d) {
    let cssContainerEl = document.createElement('div');
    cssContainerEl.setAttribute("id", "vr-home");

    let cssHeaderEl = document.createElement('h1');
    cssHeaderEl.innerHTML = "testing";
    cssHeaderEl.setAttribute('class', "header");

    let cssTextEl = document.createElement("p");
    cssTextEl.innerHTML =`Testing html in webGL Testing html in webGL 
    Testing html in webGL Testing html in webGL
    Testing html in webGL
    Testing html in webGL
    Testing html in webGL
    Testing html in webGL
    Testing html in webGL
    Testing html in webGL
    Testing html in webGL
    
    `;

    cssContainerEl.appendChild(cssHeaderEl);
    cssContainerEl.appendChild(cssTextEl);
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

