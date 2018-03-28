// Must be placed on controller elements
AFRAME.registerComponent('grab-assets', {
    schema: {},
    init: function() {
        this.controller = this.el;

        //this.el.

        this.assetWorldPos = new THREE.Vector3();
        this.currentAssetEl = undefined;              // The assets element
        this.updateAsset = false;                   // Whether to continuously update the assets being grabbed

        this.currentAssetRotation = new THREE.Vector3();

        //this.icons = document.querySelectorAll('[preview-icon]')
        
        // When the controller tigger is pressed down
        this.controller.addEventListener('triggerdown', (e) => {
            console.log('trigger down');
            // The controller can either be "free" or "colliding" as specified in the main.js file
            // Colliding refers to colliding with a preview-icon
            if (this.controller.is('colliding')) {
                try {
                    let previewIconEl = this.el.components['aabb-collider']['intersectedEls'][0];
                    let assetData = previewIconEl.components['preview-icon'].data;
                    
                    this.createAsset(assetData.obj, assetData.mtl);
                    
                    //console.log(previewIconEl);
                    //console.log(previewIconEl.components['preview-icon']);
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
            let worldPos = this.calcWorldPos(this.el.object3D.matrixWorld);
            this.currentAssetEl.setAttribute('position', `${worldPos.x} ${worldPos.y} ${worldPos.z}`);

            // Rotation
            //.applyQuaternion(this.el.object3D.getWorldQuaternion());
            this.currentAssetEl.object3D.setRotationFromQuaternion(this.el.object3D.getWorldQuaternion());//setAttribute('rotation', `${this.currentAssetRotation.x} ${this.currentAssetRotation.y} ${this.currentAssetRotation.z}`);

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

        console.log('POSITION');

        //this.calcWorldPos(this.el.object3D.matrixWorld);
        //this.currentAssetEl.setAttribute('position', `${this.assetWorldPos.x} ${this.assetWorldPos.y} ${this.assetWorldPos.z}`);
        
        this.el.sceneEl.appendChild(this.currentAssetEl);

        this.updateAsset = true;
    },

    calcWorldPos(elementMatrix) {
        return this.assetWorldPos.setFromMatrixPosition(elementMatrix);
    },


  });