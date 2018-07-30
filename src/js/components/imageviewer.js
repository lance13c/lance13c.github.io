class ImageViewer {

    constructor() {

        // Setup HTML
        this.HTML = document.createElement('section');
        this.HTML.setAttribute("class", "image-viewer__overlay");
        this.HTML.innerHTML = this.initHTML();
        document.body.appendChild(this.HTML);
    }

    /**
     * @param projectData - All data on a specific project
     * @param imageSrc {String} - A string of the image source 
     */
    open(projectData, imageSrc) {
        
        document.body.appendChild(this.HTML);
    }

    close() {

    }

    initHTML() {
        return `
            <div class="image-viewer__container">
                <div class="image-viewer__arrow--left cs-button">
                    <i class="fas fa-arrow-left fa-3x"></i>
                </div>
                <div class="image-viewer__arrow--right cs-button">
                    <i class="fas fa-arrow-right fa-3x"></i>
                </div>
                <img src="https://upload.wikimedia.org/wikipedia/commons/3/32/House_sparrow04.jpg" class="image-viewer__image">
            </div>
        `
    }
}

export default ImageViewer;