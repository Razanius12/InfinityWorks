function adjustCarouselControls() {
 const activeItem = document.querySelector('.carousel-item.active');
 if (activeItem) {
  const cardImage = activeItem.querySelector('.card-img-top.artists-card-image');
  const prevControl = document.querySelector('.carousel-control-prev');
  const nextControl = document.querySelector('.carousel-control-next');

  if (window.matchMedia('(max-width: 576px)').matches) {
   // For mobile screens
   if (cardImage) {
    const imageHeight = cardImage.offsetHeight;
    const topPosition = imageHeight - 24;
    if (prevControl) prevControl.style.top = `${topPosition}px`;
    if (nextControl) nextControl.style.top = `${topPosition}px`;
   }
  } else if (window.matchMedia('(max-width: 620px)').matches) {

   const baseTop = 265;
   const topPosition = baseTop - 24;
   const finalPosition = Math.max(topPosition, 24);

   if (prevControl) prevControl.style.top = `${finalPosition}px`;
   if (nextControl) nextControl.style.top = `${finalPosition}px`;
  } else {
   // Reset for larger screens
   if (prevControl) prevControl.style.top = '';
   if (nextControl) nextControl.style.top = '';
  }
 }
}


// Initialize carousel with the optimized control adjustment
document.addEventListener('DOMContentLoaded', function () {
 var myCarousel = new bootstrap.Carousel(document.getElementById('membersCarousel'), {
  interval: 5000,
  wrap: true,
  touch: true
 });

 adjustCarouselControls();

 const carouselElement = document.getElementById('membersCarousel');
 carouselElement.addEventListener('slid.bs.carousel', adjustCarouselControls);

 // Debounce the resize event for better performance
 let resizeTimeout;
 window.addEventListener('resize', function () {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(adjustCarouselControls, 250);
 });
});


function retryLoadVideo(video, attempt) {
 const maxAttempts = 32; // adjust to your liking
 const backoffInterval = 3000; // adjust to your liking

 // Only load when near viewport
 if (isNearViewport(video)) {
  video.load();
 } else {
  // Add intersection observer
  const observer = new IntersectionObserver((entries) => {
   if (entries[0].isIntersecting) {
    video.load();
    observer.disconnect();
   }
  });
  observer.observe(video);
 }

 if (attempt < maxAttempts) {
  setTimeout(function () {
   video.load();
   retryLoadVideo(video, attempt + 1);
  }, backoffInterval * Math.pow(2, attempt));
 } else {
  console.log("Failed to load video after " + maxAttempts + " attempts.");
 }
}

(function ($) {

 "use strict";

 // MENU
 $(document).on('click', '.navbar-collapse a', function () {
  $(".navbar-collapse").collapse('hide');
 });

 // CUSTOM LINK
 $('.smoothscroll').click(function () {
  var el = $(this).attr('href');
  var elWrapped = $(el);
  var header_height = $('.navbar').height();

  scrollToDiv(elWrapped, header_height);
  return false;

  function scrollToDiv(element, navheight) {
   var offset = element.offset();
   var offsetTop = offset.top;
   var totalScroll = offsetTop - navheight;

   $('body,html').animate({
    scrollTop: totalScroll
   }, 300);
  }
 });

})(window.jQuery);


function generateImageHTML() {
 let html = '';
 // Loop through the images and create HTML for each
 // Assuming you have 23 images named 1.jpg to 23.jpg in the images/gallery directory
 for (let i = 1; i <= 23; i++) {
  html += `
   <div class="col-lg-3 col-12 m-2">
     <img src="images/gallery/${i}.jpg" class="artists-image img-fluid">
   </div>
   `;
 }
 return html;
}
const imageHTML = generateImageHTML();
document.getElementById('image-gallery').innerHTML = imageHTML;

// Image Viewer
function initializeImageViewer() {
 const DOM = {
  viewer: document.getElementById('imageViewer'),
  image: document.getElementById('expandedImg'),
  controls: {
   close: document.querySelector('.close-btn'),
   prev: document.querySelector('.nav-btn.prev'),
   next: document.querySelector('.nav-btn.next'),
   zoom: document.createElement('div')
  }
 };

 const state = {
  currentIndex: 0,
  images: [],
  scale: 1,
  isDragging: false,
  transform: { x: 0, y: 0 },
  pointer: { x: 0, y: 0 },
  touch: {
   start: { x: 0, y: 0 },
   move: { x: 0, y: 0 },
   distance: 0
  },
  config: {
   maxZoom: 5,
   minZoom: 1,
   zoomStep: 1.5,
   swipeThreshold: 50
  }
 };

 // Initialize zoom controls
 function setupZoomControls() {
  DOM.controls.zoom.className = 'zoom-controls';
  DOM.controls.zoom.innerHTML = `
            <button class="zoom-btn zoom-in">+</button>
            <button class="zoom-btn zoom-out">-</button>
            <button class="zoom-btn zoom-reset">↺</button>
        `;
  DOM.viewer.appendChild(DOM.controls.zoom);

  DOM.controls.zoom.querySelector('.zoom-in').onclick = () => handleZoom(1);
  DOM.controls.zoom.querySelector('.zoom-out').onclick = () => handleZoom(-1);
  DOM.controls.zoom.querySelector('.zoom-reset').onclick = resetView;
 }

 function updateTransform() {
  const { x, y } = state.transform;
  DOM.image.style.transform = `translate(${x}px, ${y}px) scale(${state.scale})`;
 }

 function toggleNavigationButtons(show) {
  const display = show ? 'block' : 'none';
  DOM.controls.prev.style.display = display;
  DOM.controls.next.style.display = display;
 }

 function resetView() {
  state.scale = 1;
  state.transform = { x: 0, y: 0 };
  updateTransform();
  DOM.image.style.cursor = 'default';
  toggleNavigationButtons(true);
 }

 function handleZoom(direction, factor = state.config.zoomStep) {
  const prevScale = state.scale;
  state.scale = direction > 0
   ? Math.min(state.scale * factor, state.config.maxZoom)
   : Math.max(state.scale / factor, state.config.minZoom);

  if (prevScale !== state.scale) {
   if (state.scale === 1) {
    state.transform = { x: 0, y: 0 }; // Reset position when zoomed out
   }
   DOM.image.style.cursor = state.scale > 1 ? 'grab' : 'default';
   toggleNavigationButtons(state.scale === 1);
   updateTransform();
  }
 }

 function showImage(index) {
  if (index >= 0 && index < state.images.length) {
   DOM.image.src = state.images[index];
   state.currentIndex = index;
   resetView();
  }
 }

 function handleSwipe(deltaX) {
  if (state.scale === 1 && Math.abs(deltaX) > state.config.swipeThreshold) {
   const direction = deltaX > 0 ? -1 : 1;
   const newIndex = state.currentIndex + direction;

   if (newIndex >= 0 && newIndex < state.images.length) {
    showImage(newIndex);
   } else {
    // Bounce effect if at end of gallery
    state.transform.x = 0;
    updateTransform();
   }
  } else {
   state.transform.x = 0;
   updateTransform();
  }
 }

 function handleOutsideClick(e) {
  // Check if click is outside the image and zoom controls
  if (!DOM.image.contains(e.target) &&
   !DOM.controls.zoom.contains(e.target) &&
   !DOM.controls.prev.contains(e.target) &&
   !DOM.controls.next.contains(e.target)) {
   DOM.viewer.style.display = 'none';
   resetView();
  }
 }

 const handlers = {
  mouse: {
   down: (e) => {
    e.preventDefault();
    state.isDragging = true;
    state.pointer = { x: e.clientX, y: e.clientY };
    DOM.image.style.cursor = state.scale > 1 ? 'grabbing' : 'default';
    DOM.image.style.transition = 'none';
   },
   move: (e) => {
    if (!state.isDragging) return;

    const deltaX = e.clientX - state.pointer.x;
    const deltaY = e.clientY - state.pointer.y;

    if (state.scale > 1) {
     // Pan when zoomed in
     state.transform.x += deltaX;
     state.transform.y += deltaY;
    }

    updateTransform();
    state.pointer = { x: e.clientX, y: e.clientY };
   },
   up: () => {
    if (!state.isDragging) return;

    DOM.image.style.transition = 'transform 0.3s ease-out';

    if (state.scale === 1) {
     handleSwipe(state.transform.x);
    }

    state.isDragging = false;
    DOM.image.style.cursor = state.scale > 1 ? 'grab' : 'default';
   },
   wheel: (e) => {
    e.preventDefault();
    handleZoom(e.deltaY < 0, 1.1);
   }
  },
  touch: {
   start: (e) => {
    if (e.touches.length === 1) {
     const touch = e.touches[0];
     state.isDragging = true;
     state.pointer = { x: touch.clientX, y: touch.clientY };
     state.touch.start = { x: touch.clientX, y: touch.clientY };
     DOM.image.style.transition = 'none';
    } else if (e.touches.length === 2) {
     state.touch.distance = Math.hypot(
      e.touches[1].clientX - e.touches[0].clientX,
      e.touches[1].clientY - e.touches[0].clientY
     );
    }
   },
   move: (e) => {
    if (e.touches.length === 1 && state.isDragging) {
     const touch = e.touches[0];
     const deltaX = touch.clientX - state.pointer.x;
     const deltaY = touch.clientY - state.pointer.y;

     if (state.scale > 1) {
      state.transform.x += deltaX;
      state.transform.y += deltaY;
     } else {
      state.transform.x = touch.clientX - state.touch.start.x;
     }

     updateTransform();
     state.pointer = { x: touch.clientX, y: touch.clientY };
    } else if (e.touches.length === 2) {
     const currentDistance = Math.hypot(
      e.touches[1].clientX - e.touches[0].clientX,
      e.touches[1].clientY - e.touches[0].clientY
     );
     handleZoom(currentDistance > state.touch.distance ? 1 : -1, 1.1);
     state.touch.distance = currentDistance;
    }
   },
   end: () => {
    if (!state.isDragging) return;

    DOM.image.style.transition = 'transform 0.3s ease-out';

    if (state.scale === 1) {
     handleSwipe(state.transform.x);
    }

    state.isDragging = false;
   }
  },
  keyboard: (e) => {
   if (DOM.viewer.style.display !== 'block') return;

   const actions = {
    'ArrowRight': () => state.scale === 1 && showImage(state.currentIndex + 1),
    'ArrowLeft': () => state.scale === 1 && showImage(state.currentIndex - 1),
    'Escape': () => {
     DOM.viewer.style.display = 'none';
     resetView();
    },
    '+': () => handleZoom(1),
    '=': () => handleZoom(1),
    '-': () => handleZoom(-1),
    '_': () => handleZoom(-1)
   };

   if (actions[e.key]) {
    e.preventDefault();
    actions[e.key]();
   }
  },
  outside: {
   click: (e) => {
    if (state.isDragging) return; // Don't close if dragging
    handleOutsideClick(e);
   },
   touch: (e) => {
    if (state.isDragging) return; // Don't close if dragging
    if (e.touches.length === 1) { // Only handle single touch
     handleOutsideClick(e.touches[0]);
    }
   }
  }
 };

 DOM.viewer.addEventListener('mousedown', handlers.outside.click);
 DOM.viewer.addEventListener('touchstart', handlers.outside.touch);

 // Setup event listeners
 setupZoomControls();

 DOM.image.addEventListener('mousedown', handlers.mouse.down);
 document.addEventListener('mousemove', handlers.mouse.move);
 document.addEventListener('mouseup', handlers.mouse.up);
 DOM.viewer.addEventListener('wheel', handlers.mouse.wheel);

 DOM.viewer.addEventListener('touchstart', handlers.touch.start);
 DOM.viewer.addEventListener('touchmove', handlers.touch.move);
 DOM.viewer.addEventListener('touchend', handlers.touch.end);

 document.addEventListener('keydown', handlers.keyboard);

 DOM.controls.next.onclick = () => state.scale === 1 && showImage(state.currentIndex + 1);
 DOM.controls.prev.onclick = () => state.scale === 1 && showImage(state.currentIndex - 1);
 DOM.controls.close.onclick = () => {
  DOM.viewer.style.display = 'none';
  resetView();
 };

 // Initialize images
 document.querySelectorAll('img').forEach(img => {
  if (!img.closest('.navbar') && !img.closest('.image-viewer')) {
   state.images.push(img.src);
   img.addEventListener('click', () => {
    state.currentIndex = state.images.indexOf(img.src);
    showImage(state.currentIndex);
    DOM.viewer.style.display = 'block';
   });
  }
 });
}

document.addEventListener('DOMContentLoaded', initializeImageViewer);
