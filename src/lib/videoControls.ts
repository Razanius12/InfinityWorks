/**
 * Video Controls TypeScript Module
 * Handles video mute/unmute functionality
 */

export function initializeVideoControls(): void {
 const video = document.querySelector('.custom-video') as HTMLVideoElement;
 if (!video) return;

 // Create mute button
 const muteButton = document.createElement('button');
 muteButton.className = 'video-mute-btn';
 muteButton.setAttribute('aria-label', 'Toggle video mute');
 muteButton.setAttribute('title', 'Mute/Unmute video');
 muteButton.innerHTML = '<span class="bi bi-volume-mute"></span>';

 // Add to video container
 const videoWrap = video.closest('.video-wrap');
 if (videoWrap) {
  videoWrap.appendChild(muteButton);
 }

 // Set initial muted state
 video.muted = true;
 updateMuteIcon();

 // Toggle mute on click
 muteButton.addEventListener('click', (e) => {
  e.stopPropagation();
  video.muted = !video.muted;
  updateMuteIcon();
 });

 function updateMuteIcon(): void {
  const icon = muteButton.querySelector('span');
  if (icon) {
   if (video.muted) {
    icon.className = 'bi bi-volume-mute';
   } else {
    icon.className = 'bi bi-volume-up';
   }
  }
 }
}

export function setupScrollNavbar(): void {
 const navbar = document.querySelector('.navbar');
 const heroSection = document.getElementById('section_1');

 if (!navbar || !heroSection) return;

 const observer = new IntersectionObserver(([entry]) => {
  if (entry.isIntersecting) {
   navbar.classList.remove('scrolled');
  } else {
   navbar.classList.add('scrolled');
  }
 }, {
  threshold: 0
 });

 observer.observe(heroSection);
}
