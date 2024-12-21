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