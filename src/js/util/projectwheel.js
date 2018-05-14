

import data from '../../../assets/data/data.json';

class ProjectWheel {
    constructor(sceneEl, cssScene, initPos) {
        this.initPos = initPos;
        this.projects = data.projects;
        this.radius = 3;
        this.sceneEl = sceneEl;
        this.cssScene = cssScene;
        this.ZOFFSET = 1.8;
    }

    spawnRooms() {
        if (this.projects) {
            this.projects.forEach((project, index, array) => {
                this.createProjectPanel(index, array.length);
            });
        }
    }

    createProjectPanel(index, total) {

        const PANEL_DEPTH = 0.1;

        // Panel Creation
        // let el = document.createElement('a-box');
         let pos = this.calcCirclePos(index, total);         // Gets x and z positions
        // console.log(`${this.initPos.x + pos.x} ${this.initPos.y} ${this.initPos.z + pos.z}`);
         let panelFinalPos = {x: this.initPos.x + pos.x, y: this.initPos.y - 0.3, z: this.initPos.z - this.ZOFFSET + (pos.z/3)}
        // el.setAttribute('position', ` ${panelFinalPos.x} ${panelFinalPos.y} ${panelFinalPos.z}`);
        // el.setAttribute('class', 'panel panel__project');
        // el.setAttribute('material', 'shader: flat; side: double; color: #F6FAFB, blending: normal');
        // el.setAttribute('width', 1);
        // el.setAttribute('height', 2);
        // el.setAttribute('depth', PANEL_DEPTH);

        //this.sceneEl.appendChild(el);

        // HTML Object Creation
        let cssContainerEl = document.createElement('section');
        cssContainerEl.setAttribute("class", "vr-page__scale--1 project__panel__html");

        // Set HTML
        let html = this.createPanelHTML(this.projects[index]);
        console.log(this.projects[index]);
        cssContainerEl.innerHTML += html;

        // create the object3d for this element
        let cssObject = new THREE.CSS3DObject( cssContainerEl );
        //this.cssScene.blending = 'none';
        
        console.log('material');
        console.log(cssObject);
        // we reference the same position and rotation 


        //const yOffset = 0.55;
        const CSS_OBJECT_OFFSET = PANEL_DEPTH;
        cssObject.position.set(panelFinalPos.x, panelFinalPos.y, panelFinalPos.z);
        cssObject.scale.set(0.01, 0.01, 0.01);
        cssObject.rotation.set(0, 0, 0);
        // add it to the css scene
        this.cssScene.add(cssObject);
    }

    // Calculates a position within a circle to place an obj
    calcCirclePos(index, total) {
        let angle = ((Math.PI*2) / total) * index;
        console.log(`angle ${angle}`);
        let z = this.radius * Math.sin(angle);
        let x = this.radius * Math.cos(angle);
        return {x: x, z: z}
    }

    // Removes every project panel currently existing
    removeAllProjectPanels() {
        let projectPanels = document.querySelectorAll('.panel__project');
        if (projectPanels) {
            projectPanels.forEach((panel) => {
                panel.parentElement.removeChild(panel);
            })
        }
    }

    createPanelHTML(projectData) {
        let html =  `
            <section class="project__container vr-page">
                <h1>${projectData.name}</h1>
                <h3>${projectData.short_des}</h3>
                <div class="project__image__container">
                    ${(() => {
                        return `<img class="project__image" src="https://pbs.twimg.com/profile_images/378800000532546226/dbe5f0727b69487016ffd67a6689e75a_400x400.jpeg"></img>`
                        //return projectData.imageList.forEach((src) => {

                        //})
                    })()}
                </div>
            </section>
        `;

        //let imageList = `<img></img>`

        return html;
    }
}

export default ProjectWheel;


