// Allow the camera to orbit around

// TODO add camera init position
/*
* radius - radius to orbit
* camera - scene camera to move
* loopPos - Position to lookAt

* update - Run to continuously update the camera
*/
class Orbit {
    constructor(radius, camera, lookPos = new THREE.Vector3(0,0,0)) {
        this.radius = radius;
        this.camera = camera;
        this.z = radius;
        this.x = 0;
        this.zUp = 0;
        this.xUp = 1;
        this.lookPos = lookPos;
    }
    

    update() {
        this.camera.translateZ(this.zUp / 80);
        this.camera.translateX(this.xUp / 80);
        this.camera.lookAt(this.lookPos);

        if (this.zUp) {
            this.z += 0.1;
        } else {
            this.z -= 0.1;
        }

        if (this.xUp) {
            this.x += 0.1;
        } else {
            this.x -= 0.1;
        }

        if (this.x >= this.radius || this.x <= -this.radius) {
            this.xUp != this.xUp
        }

        if (this.z >= this.radius || this.z <= -this.cameraRadius) {
            this.zUp != this.zUp
        }
    }
}

module.exports = Orbit;