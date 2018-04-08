//import './components/background';
//import './components/birds';

import './until/nav';
import responsiveVR from './layout/responsive_vr';
import homePage from "./pages/home";

const THREE = AFRAME.THREE;
const ThreeCSS = require('three-css3drenderer');
THREE.CSS3DRenderer = ThreeCSS.CSS3DRenderer;
THREE.CSS3DObject = ThreeCSS.CSS3DObject;
THREE.CSS3DSprite = ThreeCSS.CSS3DSprite;

const abstracts = require('./abstracts');

let sceneEl = document.querySelector('a-scene');


sceneEl.addEventListener('loaded', function() {


    let elements = {
        homePanelEl: document.querySelector('.home__panel'),
        projectsPanelEl: document.querySelector('.projects__panel'),
        cameraEl: document.querySelector('[camera]'),
    }

    let objects3d = {
        camera: elements.cameraEl.getObject3D('camera'),
        homePanel: elements.homePanelEl.getObject3D('mesh'),
    }
    

    // CSS Setup
    let cssScene = new AFRAME.THREE.Scene();
    let cssRenderer = new THREE.CSS3DRenderer();
    cssRenderer.setSize( window.innerWidth, window.innerHeight );
    cssRenderer.domElement.style.position = 'absolute';
    cssRenderer.domElement.style.top = 0;
    document.body.appendChild(cssRenderer.domElement);


    //var element = document.createElement( 'img' );
    //element.src = 'assets/images/projects/hero/hero0.png';

    // CSS Objects
    homePage.init(cssScene, elements, objects3d);


    console.log('Camera');
    console.log(objects3d.camera);

    function animate() {
        requestAnimationFrame( animate );
        cssRenderer.render( cssScene, objects3d.camera );
    }
    animate();

    // Initialize Responsive VR
    responsiveVR.init();
});



