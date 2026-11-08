// Global variables for the slider
var currentIndex = 0;
var track = document.getElementById("track");
var totalCards = document.querySelectorAll(".testimonial-card").length;
var autoSlideTimer;

// Check screen size to know how many cards fit
function getVisibleCards() {
  if (window.innerWidth >= 1024) {
    return 3; // Desktop
  } else if (window.innerWidth >= 768) {
    return 2; // Tablet
  } else {
    return 1; // Mobile
  }
}

// Move the track
function updateSlider() {
  var visibleCards = getVisibleCards();
  
  // Keep index within boundaries
  if (currentIndex > totalCards - visibleCards) {
    currentIndex = totalCards - visibleCards;
  }
  if (currentIndex < 0) {
    currentIndex = 0;
  }

  // Shift the track by calculating the percentage
  // Since there are gaps between cards, we add a tiny margin adjustment
  var movePercentage = currentIndex * (100 / visibleCards);
  
  track.style.transform = "translateX(-" + movePercentage + "%)";
}

// Next Button Click
function slideNext() {
  var visibleCards = getVisibleCards();
  var maxIndex = totalCards - visibleCards;

  if (currentIndex < maxIndex) {
    currentIndex++;
  } else {
    currentIndex = 0; // Loop back to start
  }
  
  updateSlider();
  resetTimer();
}

// Prev Button Click
function slidePrev() {
  if (currentIndex > 0) {
    currentIndex--;
  } else {
    var visibleCards = getVisibleCards();
    currentIndex = totalCards - visibleCards; // Loop to end
  }
  
  updateSlider();
  resetTimer();
}

// Auto Slide (every 5 seconds)
function startAutoSlide() {
  autoSlideTimer = setInterval(function() {
    slideNext();
  }, 5000); 
}

// Reset timer when user clicks manually
function resetTimer() {
  clearInterval(autoSlideTimer);
  startAutoSlide();
}

// Handle window resizing
window.addEventListener("resize", function() {
  updateSlider();
});

// Start it up
startAutoSlide();
updateSlider();