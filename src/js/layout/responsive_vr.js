


function init() {
    let homePanel = document.querySelector('.home__panel');
    let projectsPanel = document.querySelector('.projects__panel');
    let blogPanel = document.querySelector('.blog__panel');
    let resumePanel = document.querySelector('.resume__panel');
    let lifePanel = document.querySelector('.life__panel');

    let vrHome = document.querySelector('#vr-home');


    let panels = [homePanel, projectsPanel, blogPanel, resumePanel, lifePanel];
    let panelHTML = [vrHome];



    // nav size
    if (window.innerWidth > 700) {
        let widthValue = 2; // 2 Meters width value
        panels.forEach((panel) => {
            console.log(panel);
            if (panel) {
                panel.setAttribute("width", widthValue);
            }
        });

        panelHTML.forEach((html) => {
            if (html) {   
                html.setAttribute("class", "vr-page__scale--2");
                console.log('html changed');
            }
        });
        
        console.log("Desktop Mode");
    }


    if (window.innerWidth <= 700) {
        let widthValue = 1; // 2 Meters width value
        panels.forEach((panel) => {
            console.log(panel);
            if (panel) {
                panel.setAttribute("width", widthValue);
            }
        });

        panelHTML.forEach((html) => {
            if (html) {
                html.setAttribute("class", "vr-page__scale--1");
            }
        });
        
        console.log("Mobile Mode");
    }
}

module.exports = {
    init: init
};
