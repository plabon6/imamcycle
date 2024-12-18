export function initializeCarousel({
    slidesSelector = '.slides',
    dotsContainerSelector = '.dots',
    slideDuration = 5000,
  } = {}) {
    const slides = document.querySelector(slidesSelector);
    const dotsContainer = document.querySelector(dotsContainerSelector);
    const totalSlides = document.querySelectorAll(`${slidesSelector} .slide`).length;
    let currentIndex = 0;
    let autoSlideInterval;
  
    // Create pagination dots dynamically
    function createDots() {
      for (let i = 0; i < totalSlides; i++) {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        dot.dataset.index = i;
  
        const innerCircle = document.createElement('div');
        innerCircle.classList.add('inner-circle');
        dot.appendChild(innerCircle);
  
        const progressSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        progressSvg.setAttribute("viewBox", "0 0 36 36");
        progressSvg.classList.add("circular-progress");
  
        const progressPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
        progressPath.setAttribute(
          "d",
          "M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
        );
        progressPath.classList.add("circle");
        progressSvg.appendChild(progressPath);
  
        dot.appendChild(progressSvg);
        dotsContainer.appendChild(dot);
      }
    }
    createDots();
  
    const dots = document.querySelectorAll('.dot');
  
    // Update carousel view and dots
    function updateCarousel(index) {
      slides.style.transform = `translateX(-${index * 100}%)`;
      dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
      });
    }
  
    // Navigate to the next slide
    function nextSlide() {
      currentIndex = (currentIndex + 1) % totalSlides;
      updateCarousel(currentIndex);
    }
  
    // Pause the carousel
    function pauseCarousel() {
      clearInterval(autoSlideInterval);
      autoSlideInterval = null;
    }
  
    // Restart the carousel
    function startCarousel() {
      if (!autoSlideInterval) {
        autoSlideInterval = setInterval(nextSlide, slideDuration);
      }
    }
  
    // Handle dot navigation
    dots.forEach((dot) => {
      dot.addEventListener('click', () => {
        pauseCarousel();
        currentIndex = parseInt(dot.getAttribute('data-index'));
        updateCarousel(currentIndex);
        startCarousel();
      });
    });
  
    // Drag functionality
    let startX = 0;
    let isDragging = false;
  
    function handleDragStart(e) {
      pauseCarousel();
      startX = e.type === 'mousedown' ? e.clientX : e.touches[0].clientX;
      isDragging = true;
    }
  
    function handleDragEnd(e) {
      if (!isDragging) return;
      isDragging = false;
  
      const endX = e.type === 'mouseup' ? e.clientX : e.changedTouches[0].clientX;
      const diffX = endX - startX;
  
      // Threshold for determining slide change
      if (Math.abs(diffX) > 50) {
        if (diffX > 0) {
          currentIndex = currentIndex === 0 ? totalSlides - 1 : currentIndex - 1; // Drag right
        } else {
          currentIndex = (currentIndex + 1) % totalSlides; // Drag left
        }
      }
  
      updateCarousel(currentIndex);
      startCarousel();
    }
  
    // Attach event listeners for drag/swipe
    slides.addEventListener('mousedown', handleDragStart);
    slides.addEventListener('touchstart', handleDragStart);
  
    slides.addEventListener('mouseup', handleDragEnd);
    slides.addEventListener('touchend', handleDragEnd);
  
    slides.addEventListener('mouseleave', handleDragEnd); // In case the mouse leaves the carousel area
  
    // Initialize the carousel
    updateCarousel(currentIndex);
    startCarousel();
  }
  