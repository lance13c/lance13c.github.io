(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

var abstracts = {

    backgroundcolor: 0xfefefe,
    accentColor: 0x5588ff,
    skyColor: 0x87CEFA,
    groudColor: 0x3CB371,
    warmColor: 0xe5a665,

    themeMonoColor1: 0xF6FAFB,
    themeMonoColor2: 0xC3CACD,
    themeMonoColor3: 0x97A1A4,
    themeMonoColor4: 0x717C80,
    themeMonoColor5: 0x49565A,
    themeMonoColor6: 0x1F282C,

    particles: {
        FLOOR_LEVEL: -10
    }
};

module.exports = abstracts;

},{}],2:[function(require,module,exports){
'use strict';

// Must be placed on controller elements
AFRAME.registerComponent('grab-assets', {
    schema: {},
    init: function init() {
        var _this = this;

        this.controller = this.el;

        //this.el.

        this.assetWorldPos = new THREE.Vector3();
        this.currentAssetEl = undefined; // The assets element
        this.updateAsset = false; // Whether to continuously update the assets being grabbed

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
        this.controller.addEventListener('triggerdown', function (e) {
            console.log('trigger down');
            // The controller can either be "free" or "colliding" as specified in the main.js file
            // Colliding refers to colliding with a preview-icon
            if (_this.controller.is('colliding')) {
                try {
                    var assetEl = _this.el.components['aabb-collider']['intersectedEls'][0];
                    var assetData = undefined;
                    if (assetEl) {
                        if (assetEl.components['preview-icon']) {
                            // Preview Icon Click
                            assetData = assetEl.components['preview-icon'].data;
                            _this.createAsset(assetData.obj, assetData.mtl);
                        } else if (assetEl.components['obj-model']) {
                            // Object Model Clicked
                            _this.updateExistingAsset(assetEl);
                        }
                    }
                    console.log('colliding');
                } catch (e) {
                    console.log(e);
                }
            }
        });

        this.controller.addEventListener('triggerup', function (e) {
            if (_this.controller.is('colliding')) {
                console.log('colliding');
            }
            _this.updateAsset = false;
            console.log('trigger up');
        });
    },
    update: function update() {},
    tick: function tick() {
        if (this.updateAsset !== false && this.currentAssetEl !== undefined) {
            //let worldPos = this.calcWorldPos(this.el.object3D.matrixWorld);
            //this.currentAssetEl.setAttribute('position', `${worldPos.x} ${worldPos.y} ${worldPos.z}`);

            this.secondaryCtrlPos.copy(this.el.object3D.getWorldPosition());
            this.deltaCtrlPos.subVectors(this.secondaryCtrlPos, this.startingCtrlPos);
            this.finalAssetPos.addVectors(this.startingAssetPos, this.deltaCtrlPos);

            this.currentAssetEl.setAttribute('position', this.finalAssetPos.x + ' ' + this.finalAssetPos.y + ' ' + this.finalAssetPos.z);

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
    remove: function remove() {},
    pause: function pause() {},
    play: function play() {},

    createAsset: function createAsset(objUrl, mtlUrl) {
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

        this.currentAssetEl.setAttribute('position', this.startingAssetPos.x + ' ' + this.startingAssetPos.y + ' ' + this.startingAssetPos.z);

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
    updateExistingAsset: function updateExistingAsset(assetEl) {

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
    calcWorldPos: function calcWorldPos(elementMatrix) {
        return this.assetWorldPos.setFromMatrixPosition(elementMatrix);
    }
});

},{}],3:[function(require,module,exports){
'use strict';

AFRAME.registerComponent('item-selector', {
    schema: {
        // size: {type: 'vec2', default: {x:0.5, y:0.2}}
        // Contain a list of objects
        // ex: {
        //      name:    // Name of object
        //      obj:     // 3D object location
        //      preview: // Preview image location
        // }
        assetList: { type: 'string', default: "[]" }
    },

    init: function init() {

        console.log(this.data.assetList);

        this.assetList = [];

        // Display rectangle
        var displayG = new THREE.BoxBufferGeometry(0.2, 0.01, 0.35);
        var displayM = new THREE.MeshBasicMaterial({
            color: 0xbbbbff,
            side: 'double'
        });
        this.displayMesh = new THREE.Mesh(displayG, displayM);

        this.el.setObject3D('mesh', this.displayMesh);
        this.el.setAttribute('position', '-0.1 0.2 0.1');
        this.el.setAttribute('rotation', '0 0 -75');

        // Preview Icon Container
        var ICON_HEIGHT = 0.05;
        var ICON_WIDTH = 0.05;
        this.ICON_OFFSET = 0.11;
        this.ICON_MULTIPLYER = 0.08;

        var previewIconContainerG = new THREE.BoxBufferGeometry(ICON_HEIGHT, 0.01, ICON_WIDTH);
        var previewIconContainerM = new THREE.MeshBasicMaterial({
            color: 0x999999,
            side: 'double'
        });
        this.previewIconContainerMesh = new THREE.Mesh(displayG, displayM);
    },
    update: function update() {

        // Setup assertList
        try {
            this.assetList = JSON.parse(this.data.assetList);
            this.updateAssetList(this.assetList);
        } catch (e) {
            throw new Error(e);
        }
    },
    tick: function tick() {},
    remove: function remove() {},
    pause: function pause() {},
    play: function play() {},

    updateAssetList: function updateAssetList(newAssetList) {
        var _this = this;

        // Remove all previous elements from the list
        // if (this.currentAssetElements.length > 0) {
        //     this.currentAssetElements.forEach((asset) => {
        //         this.el.removeObject3D(asset.name. asset.mesh);
        //     });
        // }
        console.log('hit1');
        if (newAssetList.length > 0) {
            newAssetList.forEach(function (asset, i) {
                console.log('Asset', asset);
                console.log('hit inside');
                //this.el.setObject3D('icon_' + i, this.displayMesh);
                var icon = document.createElement('a-entity');

                icon.setAttribute('preview-icon', 'name: ' + asset.name + '; obj: ' + asset.obj + '; mtl: ' + asset.mtl + '; previewImage: ' + asset.previewImage);
                icon.setAttribute('position', '0 0.01 ' + (-i * _this.ICON_MULTIPLYER + _this.ICON_OFFSET));
                _this.el.appendChild(icon);

                console.log('Element Created');
            });
        }

        //this.el.setObject3D('icon_1', this.displayMesh);
        //this.el.setAttribute('position', '-0.2 0 0.1');
    }
});

},{}],4:[function(require,module,exports){
"use strict";

AFRAME.registerComponent('preview-icon', {
    schema: {
        name: { type: "string", default: "temp" },
        previewImage: { type: "string", 'default': '' },
        obj: { type: "string", default: '' },
        mtl: { type: "string", default: '' },
        collisionObjs: { type: "array", default: [] }
    },

    init: function init() {
        var _this = this;

        var ICON_HEIGHT = 0.05;
        var ICON_WIDTH = 0.05;

        // Preview Icons
        this.assetElementsMap = [];
        var startPos = this.el.getAttribute('position');

        this.previewObj = null;

        var previewIconG = new THREE.BoxBufferGeometry(ICON_HEIGHT, 0.01, ICON_WIDTH);
        var previewIconM = new THREE.MeshBasicMaterial({
            color: 0xeeeeee,
            side: 'double'
        });

        // Adds image to icon(button) if present
        var image = this.getImage();
        if (image !== null) {
            previewIconM.map = image;
        }

        this.previewIconMesh = new THREE.Mesh(previewIconG, previewIconM);
        // Aligns Picture Icon in the correct orientation
        this.previewIconMesh.rotateY(Math.PI / 2);
        this.el.setObject3D('mesh', this.previewIconMesh);

        // Pressing Animations
        var animationDown = document.createElement('a-animation');
        animationDown.setAttribute('attribute', "position");
        animationDown.setAttribute('dur', "100");
        animationDown.setAttribute('to', startPos.x + " " + (startPos.y + -0.005) + " " + startPos.z);
        animationDown.setAttribute('begin', "down");
        this.el.appendChild(animationDown);

        var animationUp = document.createElement('a-animation');
        animationUp.setAttribute('attribute', "position");
        animationUp.setAttribute('dur', "100");
        animationUp.setAttribute('to', startPos.x + " " + startPos.y + " " + startPos.z);
        animationUp.setAttribute('begin', "up");
        this.el.appendChild(animationUp);

        this.el.flushToDOM();

        // Check if preview obj is present
        if (this.data.obj !== '' && this.data.mtl !== '') {

            // Create preview Obj
            this.previewObj = document.createElement('a-entity');
            this.previewObj.setAttribute('obj-model', {
                obj: this.data.obj,
                mtl: this.data.mtl
            });

            this.previewObj.setAttribute('scale', '0.01 0.01 0.01');
            this.previewObj.setAttribute('position', '-0.12 0 0');
            this.previewObj.setAttribute('rotation', '-90 0 90');
            // this.previewObj.setAttribute('material', 'visible: false');

            this.previewObj.flushToDOM();
        } else {
            console.warn("Data obj not found on", this.el);
        }

        //this.el.flushToDOM();
        //this.el.setAttribute('position', '-0.2 0.1 0.1');


        // Sets aframe extra's sphere collider onto icon
        //this.el.setAttribute('class', "preview-icon");
        this.el.setAttribute('aabb-collider', 'objects: [hand-controls]');
        this.el.setAttribute('class', 'collides');

        this.el.addEventListener('hitstart', function (e) {
            console.log("HIT HAS HAPPENED");
            _this.el.emit('down');
            _this.addPreviewObj();
        });

        this.el.addEventListener('hitend', function (e) {
            console.log("HIT END HAS HAPPENED");
            _this.el.emit('up');
            _this.removePreviewObj();
        });

        //previewObj.material.wireframe = true;
        console.log('ICON', this.el);
    },
    update: function update() {},
    tick: function tick() {},
    remove: function remove() {},
    pause: function pause() {},
    play: function play() {},

    getImage: function getImage() {
        var previewImage = this.data.previewImage;
        if (previewImage !== 'undefined' && previewImage !== undefined) {
            try {
                var image = THREE.ImageUtils.loadTexture(previewImage);
                return image;
            } catch (e) {
                console.error(e);
            }
        }
        return null;
    },
    addPreviewObj: function addPreviewObj() {
        if (this.previewObj) {
            this.el.appendChild(this.previewObj);
        }
    },
    removePreviewObj: function removePreviewObj() {
        var preObj = this.el.querySelector('a-entity[obj-model]');
        if (preObj) {
            this.el.removeChild(preObj);
        } else {
            console.log('No preview object to remove');
        }
    },
    previewObjVisible: function previewObjVisible() {
        var preObj = this.el.querySelector('a-entity[obj-model]');
        if (preObj) {
            preObj.setAttribute('material', 'visible: true');
        } else {
            console.log('No preview object found');
        }
    },
    hidePreviewObj: function hidePreviewObj() {
        var preObj = this.el.querySelector('a-entity[obj-model]');
        if (preObj) {
            preObj.setAttribute('material', 'visible: false');
        } else {
            console.log('No preview object found');
        }
    }
});

},{}],5:[function(require,module,exports){
'use strict';

require('./projects/vr-mechanism');

require('./components/vr-arm-item-selector');

require('./components/vr-arm-preview-icon');

require('./components/grab-assets');

//import './components/background';
//import './components/birds';

//import './components/vr-background-nav';

var abstracts = require('./abstracts');

},{"./abstracts":1,"./components/grab-assets":2,"./components/vr-arm-item-selector":3,"./components/vr-arm-preview-icon":4,"./projects/vr-mechanism":6}],6:[function(require,module,exports){
"use strict";

},{}]},{},[5])

//# sourceMappingURL=main.js.map
