class LazyLoad {
    constructor() {
        // Fina
    }

    // Loads the elements within a container element
    load(containerElement) {
        let images = this.findImages(containerElement);
        
        for(let entry of images.values()) {
            try {
                let loader = entry.parentNode.querySelector('.image__loader');
                //entry.setAttribute('src', entry.getAttribute('data-src'));
                entry.addEventListener('load', () => {
                    loader.parentNode.removeChild(loader);
                });
            } catch(e) {
                console.error(e);
            }
        }
    }

    // Find all images with data-src
    // @return images
    findImages(containerElement) {
        let images = containerElement.querySelectorAll('img[data-src]');
        if (images.length <= 0) {
            console.warn('Lazyload found no images');
        }
        console.log(images);
        return images;
    }


}

export default LazyLoad;