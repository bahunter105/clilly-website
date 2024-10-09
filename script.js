
// Navbar Mobile Dropdown Menu
document.getElementById('menu-icon').addEventListener('click', function() {
    document.getElementById('nav-links').classList.toggle('active');
});

// Recently Published Carousel
let currentIndex = 0;
const slides = document.querySelectorAll('.carousel-item');
const dots = document.querySelectorAll('.dot');
const totalSlides = slides.length;

// Variables for touch events
let startX = 0;
let endX = 0;

function updateSlide(index) {
    const carousel = document.querySelector('.carousel');
    carousel.style.transform = `translateX(${-index * 33.33}%)`;

    // Update active dot
    dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
    });
}

function nextSlide() {
    currentIndex = (currentIndex + 1) % totalSlides;
    updateSlide(currentIndex);
}

function prevSlide() {
    currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
    updateSlide(currentIndex);
}

function currentSlide(index) {
    currentIndex = index;
    updateSlide(currentIndex);
}

// Automatically move slides every 5 seconds
let autoSlideInterval = setInterval(nextSlide, 5000);

// Initialize first slide as active
updateSlide(currentIndex);

// Add touch event listeners for swipe functionality
const carouselContainer = document.querySelector('.carousel-container');

carouselContainer.addEventListener('touchstart', handleTouchStart, false);
carouselContainer.addEventListener('touchend', handleTouchEnd, false);

function handleTouchStart(e) {
    startX = e.touches[0].clientX; // Record the initial touch position
}

function handleTouchEnd(e) {
    endX = e.changedTouches[0].clientX; // Record the final touch position
    handleSwipe();
}

function handleSwipe() {
    const threshold = 50; // Minimum swipe distance to be considered as a swipe
    if (startX - endX > threshold) {
        // Swipe left
        nextSlide();
        resetAutoSlide(); // Reset the auto-slide timer
    } else if (endX - startX > threshold) {
        // Swipe right
        prevSlide();
        resetAutoSlide(); // Reset the auto-slide timer
    }
}

function resetAutoSlide() {
    clearInterval(autoSlideInterval); // Clear the previous timer
    autoSlideInterval = setInterval(nextSlide, 5000); // Restart the timer
}
