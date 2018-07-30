class ImageViewer {

    constructor() {

        // Setup HTML
        this.HTML = document.createElement('section');
        this.HTML.setAttribute("class", "image-viewer__overlay");
    }

    /**
     * @param projectData - All data on a specific project
     * @param imageSrc {String} - A string of the thumbnail image source 
     */
    open(projectData, imageSrc) {

        this.HTML.innerHTML = this.initHTML(imageSrc);
        document.body.appendChild(this.HTML);
    }

    close() {

    }

    /**
     * Changes thumbnail src into the regular image source 
     */
    thumbnailToRegular(thumbnailSrc) {
        return thumbnailSrc.replace(/thumbnails\/(.*)-thumbnail\s(\([0-9]?[0-9]\))/, 'regular/$1 $2');
    }

    /**
     * Initalizes the HTML
     * @param {String} imageSrc - The source location of the image
     */
    initHTML(imageSrc) {

        // Changes the thubnail image src to the regular image src
        // The regular image source is higher in quality
        imageSrc = this.thumbnailToRegular(imageSrc);

        return `
            <div class="image-viewer__container">
                <div class="image-viewer__close-button cs-button">
                    <i class="far fa-times-circle fa-5x"></i>
                </div>
                <div class="image-viewer__arrow--left cs-button">
                    <i class="fas fa-arrow-left fa-3x"></i>
                </div>
                <div class="image-viewer__arrow--right cs-button">
                    <i class="fas fa-arrow-right fa-3x"></i>
                </div>
                <img src="${imageSrc}" class="image-viewer__image">
            </div>
        `
    }
}

export default ImageViewer;