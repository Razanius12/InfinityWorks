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
 const viewer = document.getElementById('imageViewer');
 const viewerImg = document.getElementById('expandedImg');
 const closeBtn = document.querySelector('.close-btn');
 const prevBtn = document.querySelector('.nav-btn.prev');
 const nextBtn = document.querySelector('.nav-btn.next');

 // Add zoom controls to the viewer
 const zoomControls = document.createElement('div');
 zoomControls.className = 'zoom-controls';
 zoomControls.innerHTML = `
  <button class="zoom-btn zoom-in">+</button>
  <button class="zoom-btn zoom-out">-</button>
  <button class="zoom-btn zoom-reset">↺</button>
 `;
 viewer.appendChild(zoomControls);

 const zoomInBtn = viewer.querySelector('.zoom-in');
 const zoomOutBtn = viewer.querySelector('.zoom-out');
 const zoomResetBtn = viewer.querySelector('.zoom-reset');

 let currentImageIndex = 0;
 let images = [];
 let scale = 1;
 let panning = false;
 let pointX = 0;
 let pointY = 0;
 let start = { x: 0, y: 0 };

 // Collect only gallery images, excluding specific elements
 document.querySelectorAll('body img').forEach(img => {
  // Skip images with these classes or in these containers
  const shouldSkip =
   img.classList.contains('image-viewer') ||
   img.classList.contains('navbar-brand') ||
   img.closest('.navbar') ||
   img.closest('.image-viewer');

  if (!shouldSkip) {
   images.push(img.src);
   img.addEventListener('click', function () {
    currentImageIndex = images.indexOf(this.src);
    showImage(currentImageIndex);
    viewer.style.display = 'block';
   });
  }
 });

 function showImage(index) {
  viewerImg.src = images[index];
  currentImageIndex = index;
  resetZoom();
 }

 function resetZoom() {
  scale = 1;
  pointX = 0;
  pointY = 0;
  updateImageTransform();
 }

 function updateImageTransform() {
  viewerImg.style.transform = `translate(${pointX}px, ${pointY}px) scale(${scale})`;
 }

 function nextImage() {
  if (currentImageIndex < images.length - 1) {
   currentImageIndex++;
   showImage(currentImageIndex);
  } else {
   // Bounce effect at the end
   viewerImg.style.transform = `translateX(-50px)`;
   setTimeout(() => {
    viewerImg.style.transform = `translateX(0px)`;
   }, 200);
  }
 }

 function prevImage() {
  if (currentImageIndex > 0) {
   currentImageIndex--;
   showImage(currentImageIndex);
  } else {
   // Bounce effect at the start
   viewerImg.style.transform = `translateX(50px)`;
   setTimeout(() => {
    viewerImg.style.transform = `translateX(0px)`;
   }, 200);
  }
 }

 // Touch events
 viewer.addEventListener('touchstart', e => {
  touchStartX = e.touches[0].clientX;
  touchStartY = e.touches[0].clientY;
  isDragging = true;
  viewerImg.style.transition = 'none';
 });

 viewer.addEventListener('touchmove', e => {
  if (!isDragging) return;

  const deltaX = e.touches[0].clientX - touchStartX;
  const deltaY = e.touches[0].clientY - touchStartY;

  // If vertical scrolling is greater than horizontal, don't move the image
  if (Math.abs(deltaY) > Math.abs(deltaX)) return;

  e.preventDefault();
  currentTranslateX = deltaX;
  viewerImg.style.transform = `translateX(${deltaX}px)`;
 });

 viewer.addEventListener('touchend', e => {
  touchEndX = e.changedTouches[0].clientX;
  touchEndY = e.changedTouches[0].clientY;
  isDragging = false;
  viewerImg.style.transition = 'transform 0.3s ease-out';

  handleSwipe();
 });

 // Zoom controls
 zoomInBtn.addEventListener('click', () => {
  scale = Math.min(scale * 1.5, 5); // Max zoom 5x
  updateImageTransform();
 });

 zoomOutBtn.addEventListener('click', () => {
  scale = Math.max(scale / 1.5, 1); // Min zoom 1x
  if (scale === 1) {
   pointX = 0;
   pointY = 0;
  }
  updateImageTransform();
 });

 zoomResetBtn.addEventListener('click', resetZoom);

 // Mouse wheel zoom
 viewer.addEventListener('wheel', (e) => {
  e.preventDefault();
  const delta = Math.sign(e.deltaY);
  const rect = viewerImg.getBoundingClientRect();
  const mouseX = e.clientX - rect.left;
  const mouseY = e.clientY - rect.top;

  if (delta < 0) {
   scale = Math.min(scale * 1.1, 5);
  } else {
   scale = Math.max(scale / 1.1, 1);
   if (scale === 1) {
    pointX = 0;
    pointY = 0;
   }
  }
  updateImageTransform();
 });

 // Pan functionality
 viewerImg.addEventListener('mousedown', (e) => {
  e.preventDefault();
  panning = true;
  viewerImg.classList.add('zooming');
  start = { x: e.clientX - pointX, y: e.clientY - pointY };
 });

 document.addEventListener('mousemove', (e) => {
  if (!panning) return;

  pointX = e.clientX - start.x;
  pointY = e.clientY - start.y;
  updateImageTransform();
 });

 document.addEventListener('mouseup', () => {
  panning = false;
  viewerImg.classList.remove('zooming');
 });

 // Touch events for mobile
 let lastDistance = 0;

 viewer.addEventListener('touchstart', (e) => {
  if (e.touches.length === 2) {
   e.preventDefault();
   const touch1 = e.touches[0];
   const touch2 = e.touches[1];
   lastDistance = Math.hypot(
    touch2.clientX - touch1.clientX,
    touch2.clientY - touch1.clientY
   );
  }
 });

 viewer.addEventListener('touchmove', (e) => {
  if (e.touches.length === 2) {
   e.preventDefault();
   const touch1 = e.touches[0];
   const touch2 = e.touches[1];
   const distance = Math.hypot(
    touch2.clientX - touch1.clientX,
    touch2.clientY - touch1.clientY
   );

   const delta = distance - lastDistance;
   if (Math.abs(delta) > 1) {
    scale = Math.min(Math.max(scale * (1 + delta / 100), 1), 5);
    updateImageTransform();
   }
   lastDistance = distance;
  }
 });

 // Add click event listener to the viewer container
 viewer.addEventListener('click', function (e) {
  // Check if the click is outside the image
  if (e.target === viewer || e.target === closeBtn) {
   viewer.style.display = 'none';
   document.body.style.overflow = '';
  }
 });

 // Prevent image click from closing the viewer
 viewerImg.addEventListener('click', function (e) {
  e.stopPropagation();
 });

 // Prevent navigation buttons from closing the viewer
 prevBtn.addEventListener('click', function (e) {
  e.stopPropagation();
 });

 nextBtn.addEventListener('click', function (e) {
  e.stopPropagation();
 });

 function handleSwipe() {
  const swipeDistance = touchEndX - touchStartX;
  const minSwipeDistance = 50;

  if (Math.abs(swipeDistance) > minSwipeDistance) {
   if (swipeDistance > 0 && currentImageIndex > 0) {
    prevImage();
   } else if (swipeDistance < 0 && currentImageIndex < images.length - 1) {
    nextImage();
   } else {
    // Reset position if at the end of the gallery
    viewerImg.style.transform = `translateX(0px)`;
   }
  } else {
   // Reset position if swipe wasn't long enough
   viewerImg.style.transform = `translateX(0px)`;
  }
 }

 // Button controls
 nextBtn.addEventListener('click', nextImage);
 prevBtn.addEventListener('click', prevImage);
 closeBtn.addEventListener('click', () => {
  viewer.style.display = 'none';
  viewerImg.style.transform = `translateX(0px)`;
 });

 // Keyboard navigation
 document.addEventListener('keydown', e => {
  if (viewer.style.display === 'block') {
   if (e.key === 'ArrowRight') nextImage();
   if (e.key === 'ArrowLeft') prevImage();
   if (e.key === 'Escape') {
    viewer.style.display = 'none';
    viewerImg.style.transform = `translateX(0px)`;
   }
   if (e.key === '+' || e.key === '=') {
    e.preventDefault();
    scale = Math.min(scale * 1.5, 5); // Max zoom 5x
    updateImageTransform();
   }
   if (e.key === '-' || e.key === '_') {
    e.preventDefault();
    scale = Math.max(scale / 1.5, 1); // Min zoom 1x
    if (scale === 1) {
     pointX = 0;
     pointY = 0;
    }
    updateImageTransform();
   }
  }
 });
}

// Initialize the viewer when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeImageViewer);
