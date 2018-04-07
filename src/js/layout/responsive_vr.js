


function init() {
    let homePanel = document.querySelector('.home__panel');
    let projectsPanel = document.querySelector('.projects__panel');
    let blogPanel = document.querySelector('.blog__panel');
    let resumePanel = document.querySelector('.resume__panel');
    let lifePanel = document.querySelector('.life__panel');




    let panels = [homePanel, projectsPanel, blogPanel, resumePanel, lifePanel];




    // nav size
    if (window.innerWidth > 700) {
        let widthValue = 2; // 2 Meters width value
        panels.forEach((panel) => {
            console.log(panel);
            if (panel) {
                panel.setAttribute("width", widthValue);
            }
        });
        console.log("Desktop Mode");
    }
}

module.exports = {
    init: init
};
