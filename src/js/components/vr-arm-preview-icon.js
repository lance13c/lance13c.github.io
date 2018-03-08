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


        console.log('obj', this.data.obj);

        // Preview Icons
        this.assetElementsMap = [];

        let previewIconG = new THREE.BoxBufferGeometry(ICON_HEIGHT, 0.01, ICON_WIDTH);
        let previewIconM = new THREE.MeshBasicMaterial({
            color: 0x999999,
            side: 'double'
        });
        this.previewIconMesh = new THREE.Mesh(previewIconG, previewIconM);

        this.el.setObject3D('icon', this.previewIconMesh);
        //this.el.setAttribute('position', '-0.2 0.1 0.1');
    
    },
    update: function () {},
    tick: function () {},
    remove: function () {},
    pause: function () {},
    play: function () {},
  });