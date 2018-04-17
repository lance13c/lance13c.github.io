AFRAME.registerComponent('vr-eraser-toggle', {
    // This is a controller tool. Must be placed on the controller element.
    schema: {},

    init: function () {
        // Variables
        this.buttonHover = false;

        // Sliding Toggle Circle 
        let stcGeo = new THREE.CircleBufferGeometry(0.1, 30);
        let stcMat = new THREE.MeshBasicMaterial({
            color: '#7993C7'
        });
        let stcMesh = new THREE.Mesh(ssrGeo, ssrMat);

        // Sliding Surface Rectangle
        let ssrGeo = new THREE.CubeGeometry(0.01, 0.1, 0.2);
        let ssrMat = new THREE.MeshBasicMaterial({
            color: '#444455'
        });
        let ssrMesh = new THREE.Mesh(ssrGeo, ssrMat);

        this.el.setObject3D('ssr', ssrMesh);
        this.el.setObject3D('stc', stcMesh);

        // Event Listeners
        this.el.addEventListener('hitstart', (e) => {

            let assetEl = this.el.components['aabb-collider']['intersectedEls'][0];

            // Create a bounding box if the element is an object model
            if (assetEl) {
                if (assetEl.components['hand-controls']) {
                    console.log("Hit Toggle");
                }
            }
        });

        this.el.addEventListener('hitend', (e) => {
            console.log("Moved Away from Toggle");
        });
    },
    update: function () {},
    tick: function () {},
    remove: function () {},
    pause: function () {},
    play: function () {},
  });