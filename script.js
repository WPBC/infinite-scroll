const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');
const count = 30;
const query = 'scenic';
const apiKey = 'QeCadFnt16HeKrejp37CSudrtMwpmfwGMeqFiL-z4SQ';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&query=${query}&count=${count}`;

let photosArray = [];
let imagesLoaded = 0;
let totalImages = 0;
let ready = false;

// Check if all images were loaded
function imageLoaded() {
    imagesLoaded++;
    if (imagesLoaded === totalImages) {
        ready = true;
        loader.hidden = true;
    }
}

// Helper Function: Set Attributes
function setAttributes(element, attributes) {
    for (const key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
}

// Create elements for links & Photos, Add to DOM
function displayPhotos() {
    imagesLoaded = 0;
    totalImages = photosArray.length;

    // Run function for each object in photosArray.
    photosArray.forEach((photo) => {

        // Create <a> to link to Unsplash
        const item = document.createElement('a');
        setAttributes(item, {
            href: photo.links.html,
            target: '_blank'
        });

        // Create <img> for photo
        const img = document.createElement('img');
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description
        });

        // Event Listner, check when each image has finished loading
        img.addEventListener("load", imageLoaded);

        // Put <img> inside <a>, then insert in to imageContainer
        item.appendChild(img);
        imageContainer.appendChild(item);
    });
}

// Get photos from Unsplash API
async function getPhotos() {
    try {
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        displayPhotos();
    } catch (error) {
        console.log(error.message);
    }
}

// Check to see if scroll bar near bottom of page, then load more photos
window.addEventListener('scroll', () => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    if (clientHeight + scrollTop >= scrollHeight - 100 && ready) {
        ready = false;
        getPhotos();
    }
});

//  On Load
getPhotos();