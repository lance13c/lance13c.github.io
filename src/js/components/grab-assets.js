// Must be placed on controller elements
AFRAME.registerComponent('grab-assets', {
    schema: {},
    init: function() {
        this.controller = this.el;

        //this.el.

        this.assetWorldPos = new THREE.Vector3();
        this.currentAssetEl = undefined;              // The assets element
        this.updateAsset = false;                   // Whether to continuously update the assets being grabbed

        this.startingCtrlPos = new THREE.Vector3();
        this.secondaryCtrlPos = new THREE.Vector3();
        this.deltaCtrlPos = new THREE.Vector3();
        this.startingAssetPos = new THREE.Vector3();
        this.finalAssetPos = new THREE.Vector3();

        //this.currentAssetQuaternion = new THREE.Quaternion();
        this.secondaryCtrlQuanternion = new THREE.Quaternion();
        this.startingAssetQuanternion = new THREE.Quaternion();
        this.startingCtrlQuanternion = new THREE.Quaternion();
        this.deltaCtrlQuanternion = new THREE.Quaternion();
        this.finalAssetQuanternion = new THREE.Quaternion();
        //this.icons = document.querySelectorAll('[preview-icon]')
        
        // When the controller tigger is pressed down
        this.controller.addEventListener('triggerdown', (e) => {
            console.log('trigger down');
            // The controller can either be "free" or "colliding" as specified in the main.js file
            // Colliding refers to colliding with a preview-icon
            if (this.controller.is('colliding')) {
                try {
                    let assetEl = this.el.components['aabb-collider']['intersectedEls'][0];
                    let assetData = undefined; 
                    if (assetEl) {
                        if (assetEl.components['preview-icon']) {
                            // Preview Icon Click
                            assetData = assetEl.components['preview-icon'].data;
                            this.createAsset(assetData.obj, assetData.mtl);
                        } else if (assetEl.components['obj-model']) {
                            // Object Model Clicked
                            this.updateExistingAsset(assetEl);
                        }
                    }
                    console.log('colliding');
                } catch (e) {
                    console.log(e);
                }
            }
        });

        this.controller.addEventListener('triggerup', (e) => {
            if (this.controller.is('colliding')) {
                console.log('colliding');
            }
            this.updateAsset = false;
            console.log('trigger up');
        });
    },
    update: function () {},
    tick: function () {
        if (this.updateAsset !== false && this.currentAssetEl !== undefined) {
            //let worldPos = this.calcWorldPos(this.el.object3D.matrixWorld);
            //this.currentAssetEl.setAttribute('position', `${worldPos.x} ${worldPos.y} ${worldPos.z}`);
            
            this.secondaryCtrlPos.copy(this.el.object3D.getWorldPosition());
            this.deltaCtrlPos.subVectors(this.secondaryCtrlPos, this.startingCtrlPos);
            this.finalAssetPos.addVectors(this.startingAssetPos, this.deltaCtrlPos);

            this.currentAssetEl.setAttribute('position', `${this.finalAssetPos.x} ${this.finalAssetPos.y} ${this.finalAssetPos.z}`);


            this.secondaryCtrlQuanternion.copy(this.el.object3D.getWorldQuaternion());
            this.secondaryCtrlQuanternion.normalize();

            this.deltaCtrlQuanternion.multiplyQuaternions(this.secondaryCtrlQuanternion, this.startingCtrlQuanternion);
            this.finalAssetQuanternion.multiplyQuaternions(this.deltaCtrlQuanternion, this.startingAssetQuanternion);
            
            this.currentAssetEl.object3D.setRotationFromQuaternion(this.finalAssetQuanternion);

        } else {
            //console.log('update', this.updateAsset, 'asset', this.currentAssetEl);
            //console.log('asset', this.currentAsset);
        }
    },
    remove: function () {},
    pause: function () {},
    play: function () {},

    createAsset(objUrl, mtlUrl) {
        this.currentAssetEl = document.createElement('a-entity');
        this.currentAssetEl.setAttribute('obj-model', {
            obj: objUrl,
            mtl: mtlUrl
        });

        this.currentAssetEl.setAttribute('scale', '0.01 0.01 0.01');
        this.currentAssetEl.setAttribute('class', 'collides');

        this.startingAssetPos.copy(this.el.object3D.getWorldPosition());
        this.startingCtrlPos.copy(this.startingAssetPos);
        //this.currentAssetEl.object3D.position.set(this.startingAssetPos.x, this.startingAssetPos.y, this.startingAssetPos.z);
        
        this.currentAssetEl.setAttribute('position', `${this.startingAssetPos.x} ${this.startingAssetPos.y} ${this.startingAssetPos.z}`);

        console.log('POSITION');

        //this.calcWorldPos(this.el.object3D.matrixWorld);
        //this.currentAssetEl.setAttribute('position', `${this.assetWorldPos.x} ${this.assetWorldPos.y} ${this.assetWorldPos.z}`);
        
        //this.currentAssetQuaternion.copy(this.currentAssetEl.object3D.getWorldQuaternion());
        this.startingAssetQuanternion.copy(this.currentAssetEl.object3D.getWorldQuaternion());
        this.startingAssetQuanternion.normalize();

        this.startingCtrlQuanternion.copy(this.el.object3D.getWorldQuaternion());
        this.startingCtrlQuanternion.inverse();
        //this.startingCtrlQuanternion.normalize();

        this.el.sceneEl.appendChild(this.currentAssetEl);
        this.currentAssetEl.flushToDOM();
        this.updateAsset = true;
    },

    updateExistingAsset(assetEl) {

        this.currentAssetEl = assetEl;

        this.startingAssetPos.copy(this.el.object3D.getWorldPosition());
        this.startingCtrlPos.copy(this.startingAssetPos);

        this.startingAssetQuanternion.copy(this.currentAssetEl.object3D.getWorldQuaternion());
        this.startingAssetQuanternion.normalize();

        this.startingCtrlQuanternion.copy(this.el.object3D.getWorldQuaternion());
        this.startingCtrlQuanternion.inverse();
        //this.startingCtrlQuanternion.normalize();

        //this.currentAssetEl.object3D.setRotationFromQuaternion(this.startingAssetQuanternion);
        this.updateAsset = true;
    },

    calcWorldPos(elementMatrix) {
        return this.assetWorldPos.setFromMatrixPosition(elementMatrix);
    },


  });