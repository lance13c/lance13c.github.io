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

        // Give this html enough time to load in the DOM
        setTimeout(() => {
            let currentImage = imageSrc;

            let closeEl = document.querySelector(".image-viewer__close-button");
            //let overlayEl = document.querySelector(".image-viewer__overlay");
            let rightArrowEl = document.querySelector(".image-viewer__arrow--right");

            closeEl.addEventListener('click', this.close);
            rightArrowEl.addEventListener("click", this.nextImage.bind(this, projectData, currentImage));
            //overlayEl.addEventListener('click', this.close);
        }, 50);
    }

    close() {
        let overlay = document.querySelector('.image-viewer__overlay');
        overlay.parentElement.removeChild(overlay);
    }

    /**
     * Changes thumbnail src into the regular image source 
     */
    thumbnailToRegular(thumbnailSrc) {
        return thumbnailSrc.replace(/thumbnails\/(.*)-thumbnail\s(\([0-9]?[0-9]\))/, 'regular/$1 $2');
    }

    nextImage(projectData, currentImageSrc, callback) {
        // find number using match
        let currentImageNumber = parseInt((currentImageSrc.match(/[0-9]?[0-9]/))[0]);
        
        // Increment to next image
        currentImageNumber++;
        let nextImageSrc = this.findImage(projectData, currentImageNumber);
        if (nextImageSrc === null) {
            nextImageSrc = this.findImage(projectData, 1);
        }
        
        console.log(currentImageNumber);
        console.log(nextImageSrc);

        // Find the image element and replace the src with the new image src.
        let imageEl = document.querySelector('.image-viewer__image');
        imageEl.src = nextImageSrc;

        return nextImageSrc;
        // Search regular images for number
    }

    findPrevious(projectData, currentImage) {}

    /**
     * Finds the image with the specified number
     * @param {} number - unique image identifier within a specific project
     */
    findImage(projectData, number) {
        return projectData.images.find((imageSrc) => {
            return imageSrc.match(number) !== null;
        });
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