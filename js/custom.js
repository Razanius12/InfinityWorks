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


// Update gallery loading in [js/custom.js](js/custom.js)
function generateImageHTML() {
 const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
   if (entry.isIntersecting) {
    const img = entry.target;
    img.src = img.dataset.src; // Load real image
    observer.unobserve(img);
   }
  });
 });

 const images = document.querySelectorAll('.gallery-img[data-src]');
 images.forEach(img => observer.observe(img));
}

const imageHTML = generateImageHTML();
document.getElementById('image-gallery').innerHTML = imageHTML;