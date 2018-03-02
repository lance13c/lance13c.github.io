const abstracts = require('../abstracts'); 
const GRASS_SIZE = 8;

// Assets
let assets = {
    grassBlade: "/assets/images/textures/grass_blade.png"
}

// Takes in the scene
function initParticles(scene) {
    initGrass(scene);
}

class Particles {
    constructor(scene) {
        this.scene = scene;
        this.groups = [];
        this.emitters = [];
    }

    init() {
        this.initGrass();
    }

    initGrass() {
        // Grass
        const grassGroup = new SPE.Group({
            texture: {
                value: new THREE.TextureLoader().load(assets.grassBlade)
            },
            //isStatic: true,
            maxParticleCount: 100000,
            hasPerspective: true,
            colorize: true,
            blending: THREE.NormalBlending,
            // transparent: false,
            // alphaTest: 5,
             depthWrite: 1,
             fog: 1,
            // scale: 1
        });
    
        const grassEmitter = new SPE.Emitter({
            type: SPE.distributions.SPHERE,
            particleCount: 10000,
            isStatic: false,
            maxAge: {
                value: 10,
                spread: 3
            },
            position: {
                value: new THREE.Vector3(-40, abstracts.particles.FLOOR_LEVEL - (1), -10),
                radius: 1,
                radiusScale: new THREE.Vector3(50, 0.001, 50),
            },
            wiggle: {
                value: .0001,
                spread: .001
            },
            color: {
                value: new THREE.Color('green')
            },
            opacity: {
                value: [0, 1, 1, 1, 1, 0]
            },
            size: {
                value: GRASS_SIZE
            },
            angle: {
                value: [0.2 , -1, 0.2],
                spread: 1
            }
        });
        
        grassGroup.addEmitter(grassEmitter);
        grassGroup.material.side = THREE.DoubleSide;

        this.emitters.push(grassEmitter);
        this.groups.push(grassGroup);
        this.scene.add(grassGroup.mesh);
    }

    getGroups() {
        return this.groups;
    }

    // @param dt - delta time
    // This function should be used in a continuously updating loop.
    groupUpdate(dt) {
        this.groups.forEach((group) => {
            group.tick(dt);
        });
    }
}


module.exports = Particles;