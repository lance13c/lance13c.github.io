//import './components/background';
//import './components/birds';

import './util/nav';
//import responsiveVR from './layout/responsive_vr';

// Pages
import resumePage from "./pages/resume";
import welcomePage from "./pages/welcome";

// Projects
import ProjectWheel from './util/projectwheel';

// Image Util
import LazyLoad from './util/lazyload';

const THREE = AFRAME.THREE;
const ThreeCSS = require('three-css3drenderer');
THREE.CSS3DRenderer = ThreeCSS.CSS3DRenderer;
THREE.CSS3DObject = ThreeCSS.CSS3DObject;
THREE.CSS3DSprite = ThreeCSS.CSS3DSprite;

const abstracts = require('./abstracts');

let sceneEl = document.querySelector('a-scene');

// sceneEl.addEventListener('render-target-loaded', function () {
   
// });


sceneEl.addEventListener('loaded', function() {

    let elements = {
        resumePanelEl: document.querySelector('.resume__panel'),
        welcomePanelEl: document.querySelector('.welcome__panel'),
        projectsPanelEl: document.querySelector('.projects__panel'),
        cameraEl: document.querySelector('[camera]'),
    }

    let objects3d = {
        camera: elements.cameraEl.getObject3D('camera'),
        resumePanel: elements.resumePanelEl.getObject3D('mesh'),
        welcomePanel: elements.welcomePanelEl.getObject3D('mesh'),
        projectsPanel: elements.projectsPanelEl.getObject3D('mesh'),
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

    // CSS Objects  / Pages
    resumePage.init(cssScene, elements, objects3d);
    welcomePage.init(cssScene, elements, objects3d);

    // Init Projects
    let projectPos = elements.projectsPanelEl.components.position.data;

    let projectwheel = new ProjectWheel(sceneEl, cssScene, projectPos);
    projectwheel.spawnRooms();


    console.log('Camera');
    console.log(objects3d.camera);

    function animate() {
        requestAnimationFrame( animate );
        cssRenderer.render( cssScene, objects3d.camera );
    }
    animate();
    
    // Init lazyload
    let lazyload = new LazyLoad();
    setTimeout(() => {
        lazyload.load(document);
    }, 5000);


//     // Image Lazy Load
//     let bLazy = new Blazy({
//         breakpoints: [{
// 	    width: 420 // Max-width
//         , src: 'data-src-small'
// 	}]
//       , success: function(element) {
// 	    console.log("Sucess Image Blazy");
//         }
//    });

    // Initialize Responsive VR
    //responsiveVR.update();
});



