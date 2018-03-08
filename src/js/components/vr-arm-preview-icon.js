AFRAME.registerComponent('preview-icon', {
    schema: {
        name: {type: "string", default: "temp"},
        previewImage: {type: "asset"},
        obj: {type: "string", default: ''},
        mtl: {type: "string", default: ''}
    },

    init: function () {
        const ICON_HEIGHT = 0.05;
        const ICON_WIDTH = 0.05;

        // Preview Icons
        this.assetElementsMap = [];

        let previewIconG = new THREE.BoxBufferGeometry(ICON_HEIGHT, 0.01, ICON_WIDTH);
        let previewIconM = new THREE.MeshBasicMaterial({
            color: 0x999999,
            side: 'double'
        });
        this.previewIconMesh = new THREE.Mesh(previewIconG, previewIconM);

        this.el.setObject3D('icon', this.previewIconMesh);

        // Check if preview obj is present
        if (this.data.obj !== '' && this.data.mtl !== '') {

            // Create preview Obj
            let previewObj = document.createElement('a-entity');
            previewObj.setAttribute('obj-model', {
                obj: this.data.obj,
                mtl: this.data.mtl
            });

            document.addEventListener('keypress', (e) => {
                previewObj.setAttribute('scale', '0.01 0.01 0.01');
                previewObj.setAttribute('position', '-0.12 0 0');
                previewObj.setAttribute('rotation', '-90 0 90');
                this.el.appendChild(previewObj);
                //previewObj.material.wireframe = true;
                console.log('ICON', this.el); 
            })
            
            
        } else {
            console.warn(`Data obj not found on`, this.el);
        }
        //this.el.setAttribute('position', '-0.2 0.1 0.1');
    
    },
    update: function () {},
    tick: function () {},
    remove: function () {},
    pause: function () {},
    play: function () {},
  });