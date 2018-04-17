(function(){function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s}return e})()({1:[function(require,module,exports){
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
                        } else if (assetEl.components['vr-eraser-toggle']) {
                            console.log("vr-eraser toggle");
                            assetEl.emit('click', { el: _this.el });
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
            var worldPos = this.calcWorldPos(this.el.object3D.matrixWorld);
            this.currentAssetEl.setAttribute('position', worldPos.x + ' ' + worldPos.y + ' ' + worldPos.z);

            this.secondaryCtrlQuanternion.copy(this.el.object3D.getWorldQuaternion());
            this.secondaryCtrlQuanternion.normalize();
            //this.startingAssetQuanternion(
            //this.deltaCtrlQuanternion.inverse();

            this.deltaCtrlQuanternion.multiplyQuaternions(this.secondaryCtrlQuanternion, this.startingCtrlQuanternion);
            this.finalAssetQuanternion.multiplyQuaternions(this.deltaCtrlQuanternion, this.startingAssetQuanternion);

            //console.log(this.currentAssetQuaternion);
            //this.currentAssetQuaternion.multiply(this.el.object3D.getWorldQuaternion());
            // Rotation
            //.applyQuaternion(this.el.object3D.getWorldQuaternion());
            this.currentAssetEl.object3D.setRotationFromQuaternion(this.finalAssetQuanternion);
            //this.currentAssetEl.object3D.setRotationFromQuaternion(this.el.object3D.getWorldQuaternion());
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
        var displayG = new THREE.BoxBufferGeometry(0.3, 0.01, 0.5);
        var displayM = new THREE.MeshBasicMaterial({
            color: 0xbbbbff,
            side: 'double'
        });
        this.displayMesh = new THREE.Mesh(displayG, displayM);

        this.el.setObject3D('mesh', this.displayMesh);
        this.el.setAttribute('position', '-0.1 0.3 0.1');
        this.el.setAttribute('rotation', '0 0 -75');

        // Add Labels
        var assetText = document.createElement('a-text');
        assetText.setAttribute('value', 'Assets');
        assetText.setAttribute('rotation', '-90 90 0');
        assetText.setAttribute('scale', '0.1 0.1 0.1');
        assetText.setAttribute('position', '-0.11 0.01 0.24');
        assetText.setAttribute('color', '#010101');

        this.el.appendChild(assetText);

        var toolsText = document.createElement('a-text');
        toolsText.setAttribute('rotation', '-90 90 0');
        toolsText.setAttribute('scale', '0.1 0.1 0.1');
        toolsText.setAttribute('position', '0.03 0.01 0.24');
        toolsText.setAttribute('color', '#010101');
        toolsText.setAttribute('value', 'Tools');
        this.el.appendChild(toolsText);

        // Add Tools
        // Adding Remover Tool
        var removerTool = document.createElement('a-entity');
        removerTool.setAttribute('vr-eraser-toggle', "");
        removerTool.setAttribute('position', "0.08 0.01 0.21");
        this.el.appendChild(removerTool);

        // Preview Icon Container
        var ICON_HEIGHT = 0.05;
        var ICON_WIDTH = 0.05;
        this.ICON_OFFSET = 0.21;
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

        // TODO: Remove all previous elements from the list
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
                icon.setAttribute('position', '-0.045 0.01 ' + (-i * _this.ICON_MULTIPLYER + _this.ICON_OFFSET));
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

AFRAME.registerComponent('vr-eraser-toggle', {
    // This is a controller tool. Must be placed on the controller element.
    schema: {},

    init: function init() {
        var _this = this;

        // Variables
        this.eraserActive = false;

        // Eraser Tool Rectangle
        var etGeo = new THREE.BoxBufferGeometry(0.025, 0.01, 0.05);
        var etMat = new THREE.MeshBasicMaterial({
            color: '#e8a5a0'
        });
        this.etMesh = new THREE.Mesh(etGeo, etMat);

        // Placeholder for the Eraser
        var pGeo = new THREE.BoxBufferGeometry(0.025, 0.001, 0.05);
        var pMat = new THREE.MeshBasicMaterial({
            color: '#C5344A',
            wireframe: true
        });
        this.pMesh = new THREE.Mesh(pGeo, pMat);

        this.el.setObject3D('et', this.etMesh);
        // Must be called 'mesh' in order for aabb colider to work
        this.el.setObject3D('mesh', this.pMesh);

        // Text
        // Todo: A tool UI component should be created that has the option of text instead of creating tool specific text and icons here.
        var eraserText = document.createElement('a-text');
        eraserText.setAttribute('value', 'Eraser');
        eraserText.setAttribute('rotation', '-90 90 0');
        eraserText.setAttribute('scale', '0.05 0.05 0.05');
        eraserText.setAttribute('position', '0.03 0 0.02');
        eraserText.setAttribute('color', '#010101');
        this.el.appendChild(eraserText);

        this.el.flushToDOM();

        // Set collider
        this.el.setAttribute('aabb-collider', 'objects: [hand-controls]');
        this.el.setAttribute('class', 'collides');
        this.el.flushToDOM();

        // Event Listeners
        this.el.addEventListener('click', function (e) {
            var targetEl = e.detail.el;
            console.log('targetEl');
            console.log(targetEl);
            if (_this.eraserActive) {
                _this.removeEraser(targetEl);
                _this.eraserActive = false;
                console.log("Remove Eraser");
            } else {
                _this.attachEraser(targetEl);
                _this.eraserActive = true;
                console.log("Add Eraser");
            }
        });
    },
    update: function update() {},
    tick: function tick() {},
    remove: function remove() {},
    pause: function pause() {},
    play: function play() {},

    attachEraser: function attachEraser(controllerEl) {
        if (controllerEl) {
            controllerEl.setAttribute('vr-eraser', "");
            this.el.removeObject3D('et');
        }
    },
    removeEraser: function removeEraser(controllerEl) {
        if (controllerEl) {
            controllerEl.removeAttribute('vr-eraser');
            this.el.setObject3D('et', this.etMesh);
        }
    }
});

},{}],6:[function(require,module,exports){
'use strict';

AFRAME.registerComponent('vr-eraser', {
    // This is a controller tool. Must be placed on the controller element.
    schema: {},

    init: function init() {
        var _this = this;

        this.controller = this.el;

        // Variables
        this.eraserHover = false;
        this.previousAssetHit = undefined; // Tracks the previous asset the eraser was in contact with


        // Set Eraser
        var eraserGeo = new THREE.CubeGeometry(0.05, 0.1, 0.02);
        var eraserMat = new THREE.MeshBasicMaterial({
            color: '#e8a5a0'
        });

        this.eraserMesh = new THREE.Mesh(eraserGeo, eraserMat);
        this.eraserMesh.translateZ(-0.1);
        this.eraserMesh.rotateX(Math.PI / 2);
        this.el.setObject3D('eraser', this.eraserMesh);
        this.el.setAttribute('aabb-collider', 'objects: .collides');

        // Deletion Detection Box
        var ddBoxGeo = new THREE.CubeGeometry(25, 25, 25);
        var ddBoxMat = new THREE.MeshBasicMaterial({
            color: '#ff0000',
            wireframe: true
        });

        this.ddBoxMesh = new THREE.Mesh(ddBoxGeo, ddBoxMat);

        this.el.flushToDOM();

        this.events = {
            hitstart: function hitstart(e) {

                var assetEl = _this.el.components['aabb-collider']['intersectedEls'][0];

                // Create a bounding box if the element is an object model
                if (assetEl) {
                    if (assetEl.components['obj-model']) {
                        // Object Model Clicked
                        //let boundingBox = new THREE.BoundingBoxHelper(assetEl.getObject3D('mesh'), 0xff0000);
                        //this.el.sceneEl.add(boundingBox);
                        assetEl.setObject3D('ddBox', _this.ddBoxMesh);
                        _this.previousAssetHit = assetEl;
                    }
                }

                console.log("Eraser HIT");
                _this.eraserHover = true;
                _this.eraserMesh.material.color.setHex(0xFF0000);
            },
            hitend: function hitend(e) {

                // Remove a bounding box if the element is an object model
                if (_this.previousAssetHit) {
                    _this.previousAssetHit.removeObject3D('ddBox');
                    _this.previousAssetHit = undefined;
                }

                console.log("Eraser END");
                _this.eraserHover = false;
                _this.eraserMesh.material.color.setHex(0xCC6666);
            },
            triggerdown: function triggerdown(e) {
                console.log('trigger down');
                // The controller can either be "free" or "colliding" as specified in the main.js file
                // Colliding refers to colliding with a preview-icon
                if (_this.controller.is('colliding')) {
                    try {
                        var assetEl = _this.el.components['aabb-collider']['intersectedEls'][0];
                        var assetData = undefined;
                        if (assetEl) {
                            if (assetEl.components['obj-model']) {
                                assetEl.parentNode.removeChild(assetEl);
                            }
                        }
                        console.log('colliding');
                    } catch (e) {
                        console.log(e);
                    }
                }
            }
        };

        this.el.addEventListener('hitstart', this.events.hitstart);
        this.el.addEventListener('hitend', this.events.hitend);
        this.el.addEventListener('triggerdown', this.events.triggerdown);
    },
    update: function update() {},
    tick: function tick() {},
    remove: function remove() {
        this.el.removeEventListener('hitstart', this.events.hitstart);
        this.el.removeEventListener('hitend', this.events.hitend);
        this.el.removeEventListener('triggerdown', this.events.triggerdown);

        this.el.removeObject3D('eraser');
    },
    pause: function pause() {},
    play: function play() {}
});

},{}],7:[function(require,module,exports){
'use strict';

require('./projects/vr-mechanism');

require('./components/vr-arm-item-selector');

require('./components/vr-arm-preview-icon');

require('./components/grab-assets');

require('./components/vr-eraser');

require('./components/vr-eraser-toggle');

//import './components/background';
//import './components/birds';

//import './components/vr-background-nav';

var abstracts = require('./abstracts');

},{"./abstracts":1,"./components/grab-assets":2,"./components/vr-arm-item-selector":3,"./components/vr-arm-preview-icon":4,"./components/vr-eraser":6,"./components/vr-eraser-toggle":5,"./projects/vr-mechanism":8}],8:[function(require,module,exports){
"use strict";

},{}]},{},[7])

//# sourceMappingURL=main.js.map
