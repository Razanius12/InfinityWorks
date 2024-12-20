// Initialize Bootstrap carousel
document.addEventListener('DOMContentLoaded', function () {
 var myCarousel = new bootstrap.Carousel(document.getElementById('membersCarousel'), {
  interval: 5000,
  wrap: true,
  touch: true
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