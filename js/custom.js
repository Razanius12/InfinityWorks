const video = document.createElement('video');
video.src = 'video/infinity.mp4';
video.preload = 'auto';
document.body.appendChild(video);

(function ($) {

 "use strict";

 // MENU
 $('.navbar-collapse a').on('click', function () {
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
   <div class="col-md-3 col-12 m-2">
    <div class="artists-thumb">
      <img src="images/gallery/${i}.jpg" class="artists-image img-fluid">
     </div>
   </div>
   `;
 }
 return html;
}

const imageHTML = generateImageHTML();
document.getElementById('image-gallery').innerHTML = imageHTML;
