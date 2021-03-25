const imageContainer = document.querySelector('#image-container')
const loader = document.querySelector('#loader')

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];
let initialLoad= true;

// Unsplash API
let count = 5;
const apiKey = 'ACKWeIeaOBf5B6WE0omjOiJyZwrFDojWvKaOeGIbijQ';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;


// Helper function
function setAttribute(element,attributes) {
    for (const key in attributes) {
        element.setAttribute(key, attribute)
    }
}

// Check if all images were loaded
function imageLoaded() {
    imagesLoaded++;
    if(imagesLoaded === totalImages){
        ready = true;
        loader.hidden = true;
        initialLoad= false;
        count = 30;
    }
}

// Create elements for links and photos
function displayPhotos(){
    totalImages = 0;
    totalImages = photoArray.length;
    photosArray.forEach((photo) => {
        // Create <a> to link unsplash 
        const item = document.createElement('a');
        setAttributes(item, {
            href:photo.links.html,
            target:'_blank'
        });
        // Create image for photo
        const img = createElement('img');
        setAttributes(img,{
            src:photo.urls.regular,
            alt:photo.alt_description,
            title:photo.alt_description,
        })
        // Event listener, check when each is finished loading
        img.addEventListener('load',imageLoaded())
        // Put image inside
        item.appendChild(img);
        itemContainer.appendChild(item);
    })
}

// Get photos from unsplash API
async function getPhotos(){
    try {
        const response = await fetch(apiUrl);
        photoArray = await response.json();
        displayPhotos();
    } catch(e){
        console.log(e);
    }
}
// Check to see if scrolling near bottom of page
window.addEventListener('scroll', () => {
   if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready === true) {
       ready === false
       
       getPhotos()
}
})

//  On Load
getPhotos()