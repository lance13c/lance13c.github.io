

import data from '../../../assets/data/data.json';

class ProjectWheel {
    constructor(sceneEl, cssScene, initPos) {
        this.initPos = initPos;
        this.projects = data.projects;
        this.radius = 3.2;
        this.sceneEl = sceneEl;
        this.cssScene = cssScene;
        this.ZOFFSET = 3;
        this.YOFFSET = 0.3;
        this.cssObjectList = [];
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
         let panelFinalPos = {x: this.initPos.x + pos.x, y: this.initPos.y - this.YOFFSET , z: this.initPos.z - this.ZOFFSET + (pos.z/this.ZOFFSET)}

         // console.log(`${this.initPos.x + pos.x} ${this.initPos.y} ${this.initPos.z + pos.z}`);
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
        let html = this.createPanelHTML(this.projects[index], index);
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
        cssObject.index = index;

        this.cssObjectList.push(cssObject);
        // add it to the css scene
        this.cssScene.add(cssObject);
    }

    // Calculates a position within a circle to place an obj
    calcCirclePos(index, total) {
        const OFFSET_ANGLE = (Math.PI*2) / total;
        let angle = ( OFFSET_ANGLE * index);
        console.log(`angle ${angle}`);
        angle -= OFFSET_ANGLE/2;
        
        let z = this.radius * Math.sin(angle);
        let x = this.radius * Math.cos(angle);
        return {x: x, z: z}
    }

    // Rotates the projects around
    rotateWheel(angle) {
        let initAngle = 0;
        this.cssObjectList.forEach((cssObject) => {
            let pos = this.calcCirclePos(index, total);         // Gets x and z positions
            let panelFinalPos = {x: this.initPos.x + pos.x, y: this.initPos.y - this.YOFFSET , z: this.initPos.z - this.ZOFFSET + (pos.z/this.ZOFFSET)}
   
            //cssObject.
        });
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

    createPanelHTML(projectData, index) {
        let html =  `
            <section class="project__container vr-page">
                <div class="project__header">
                    <h1 class="project__header--main">${projectData.name + index}</h1>
                    <h3 class="project__header--sub">${projectData.short_des}</h3>
                    <span class="project__icon-list"> 
                        ${(() => {
                            let iconList = '';
                            if (projectData.download_url !== "") {
                                iconList += `<a class="project__icon project__icon--download" href="#"><i class="fas fa-download" data-fa-transform="grow-10"></i></a>`;
                            }
                            if (projectData.github_url !== "") {
                                iconList += `<a class="project__icon project__icon--github" href="#"><i class="fab fa-github" data-fa-transform="grow-10"></i></a>`;
                            }

                            return iconList;
                        })()}
                    </span>
                </div>
                    <div class="project__image-container">
                    ${(() => {
                        //return `<img class="project__image" src="https://pbs.twimg.com/profile_images/378800000532546226/dbe5f0727b69487016ffd67a6689e75a_400x400.jpeg"></img>`
                        let imageList = '';
                        projectData.images.forEach((src) => {
                            imageList += `<img class="project__image b-lazy" data-src="${src}"></img>`;
                        });

                        return imageList;
                    })()}
                </div>
            </section>
        `;

        //let imageList = `<img></img>`

        return html;
    }
}

export default ProjectWheel;


