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
        var displayG = new THREE.BoxBufferGeometry(0.2, 0.01, 0.3);
        var displayM = new THREE.MeshBasicMaterial({
            color: 0xbbbbff,
            side: 'double'
        });
        this.displayMesh = new THREE.Mesh(displayG, displayM);

        this.el.setObject3D('display', this.displayMesh);
        this.el.setAttribute('position', '-0.2 0 0.1');

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

},{}],3:[function(require,module,exports){
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

        var previewIconG = new THREE.BoxBufferGeometry(ICON_HEIGHT, 0.01, ICON_WIDTH);
        var previewIconM = new THREE.MeshBasicMaterial({
            color: 0xeeeeee,
            side: 'double'
        });

        var image = this.getImage();
        if (image !== null) {
            previewIconM.map = image;
        }

        this.previewIconMesh = new THREE.Mesh(previewIconG, previewIconM);
        // Aligns Picture Icon in the correct orientation
        this.previewIconMesh.rotateY(Math.PI / 2);
        this.el.setObject3D('icon', this.previewIconMesh);

        // Check if preview obj is present
        if (this.data.obj !== '' && this.data.mtl !== '') {

            // Create preview Obj
            var previewObj = document.createElement('a-entity');
            previewObj.setAttribute('obj-model', {
                obj: this.data.obj,
                mtl: this.data.mtl
            });

            document.addEventListener('keypress', function (e) {
                previewObj.setAttribute('scale', '0.01 0.01 0.01');
                previewObj.setAttribute('position', '-0.12 0 0');
                previewObj.setAttribute('rotation', '-90 0 90');
                _this.el.appendChild(previewObj);
                //previewObj.material.wireframe = true;
                console.log('ICON', _this.el);
            });
        } else {
            console.warn("Data obj not found on", this.el);
        }
        //this.el.setAttribute('position', '-0.2 0.1 0.1');


        // Sets aframe extra's sphere collider onto icon
        this.el.setAttribute('class', "preview-icon");
        this.el.setAttribute('aabb-collider', 'objects: .sphere-controller');

        this.el.addEventListener('hitstart', function (e) {
            console.log("HIT HAS HAPPENED");
        });

        this.el.addEventListener('hitend', function (e) {
            console.log("HIT END HAS HAPPENED");
        });
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
    }
});

},{}],4:[function(require,module,exports){
'use strict';

require('./projects/vr-mechanism');

require('./components/vr-arm-item-selector');

require('./components/vr-arm-preview-icon');

var abstracts = require('./abstracts'); //import './components/background';
//import './components/birds';

//import './components/vr-background-nav';

},{"./abstracts":1,"./components/vr-arm-item-selector":2,"./components/vr-arm-preview-icon":3,"./projects/vr-mechanism":5}],5:[function(require,module,exports){
"use strict";

},{}]},{},[4])

//# sourceMappingURL=main.js.map
