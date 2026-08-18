const galleryItems = document.querySelectorAll(".gallery-item");
const filterButtons = document.querySelectorAll(".filter-btn");

const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightboxImage");

const closeBtn = document.getElementById("closeBtn");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

let visibleImages = [];
let currentIndex = 0;


// Update Visible Images

function updateVisibleImages() {
    visibleImages = Array.from(galleryItems).filter(item => {
        return item.style.display !== "none";
    });
}


// Open Lightbox

function openLightbox(index) {

    updateVisibleImages();

    currentIndex = index;

    const image = visibleImages[currentIndex].querySelector("img");

    lightboxImage.src = image.src;
    lightboxImage.alt = image.alt;

    lightbox.classList.add("show");
}


// Close Lightbox

function closeLightbox() {
    lightbox.classList.remove("show");
}


// Show Image

function showImage(index) {

    if (visibleImages.length === 0) {
        return;
    }

    if (index < 0) {
        currentIndex = visibleImages.length - 1;
    } else if (index >= visibleImages.length) {
        currentIndex = 0;
    } else {
        currentIndex = index;
    }

    const image = visibleImages[currentIndex].querySelector("img");

    lightboxImage.src = image.src;
    lightboxImage.alt = image.alt;
}

// Next Image

function nextImage() {
    showImage(currentIndex + 1);
}


// Previous Image

function previousImage() {
    showImage(currentIndex - 1);
}


// Gallery Image Click

galleryItems.forEach(item => {

    item.addEventListener("click", () => {

        updateVisibleImages();

        const index = visibleImages.indexOf(item);

        openLightbox(index);
    });

});


// Next / Previous Buttons

nextBtn.addEventListener("click", nextImage);

prevBtn.addEventListener("click", previousImage);


// Close Button

closeBtn.addEventListener("click", closeLightbox);


// Close When Clicking Outside Image

lightbox.addEventListener("click", event => {

    if (event.target === lightbox) {
        closeLightbox();
    }

});


// Category Filters

filterButtons.forEach(button => {

    button.addEventListener("click", () => {

        const selectedCategory = button.dataset.filter;

        // Active button
        filterButtons.forEach(btn => {
            btn.classList.remove("active");
        });

        button.classList.add("active");


        // Filter images
        galleryItems.forEach(item => {

            const category = item.dataset.category;

            if (
                selectedCategory === "all" ||
                category === selectedCategory
            ) {
                item.style.display = "block";
            } else {
                item.style.display = "none";
            }

        });

        updateVisibleImages();

        // Close lightbox if filter changes
        closeLightbox();
    });

});

// Keyboard Navigation

document.addEventListener("keydown", event => {

    // Escape → Close
    if (event.key === "Escape") {
        closeLightbox();
    }

    // Right Arrow → Next
    if (event.key === "ArrowRight") {
        if (lightbox.classList.contains("show")) {
            nextImage();
        }
    }

    // Left Arrow → Previous
    if (event.key === "ArrowLeft") {
        if (lightbox.classList.contains("show")) {
            previousImage();
        }
    }

});


// Initial Setup

updateVisibleImages();