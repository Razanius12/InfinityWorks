// Utility function to check if element is near viewport
export function isNearViewport(element: HTMLElement, offset = 100): boolean {
 const rect = element.getBoundingClientRect();
 return (
  rect.top <= window.innerHeight + offset &&
  rect.bottom >= -offset &&
  rect.left <= window.innerWidth + offset &&
  rect.right >= -offset
 );
}

// Scroll to element with offset
export function scrollToElement(element: HTMLElement, offset = 0): void {
 const elementPosition = element.getBoundingClientRect().top + window.scrollY;
 window.scrollTo({
  top: elementPosition - offset,
  behavior: 'smooth'
 });
}

// Generate gallery image paths
export function generateGalleryImages(count: number, basePath = '/images/gallery'): string[] {
 return Array.from({ length: count }, (_, i) => `${basePath}/${i + 1}.jpg`);
}

// Retry video loading with backoff
export function retryVideoLoad(
 videoElement: HTMLVideoElement,
 maxAttempts = 32,
 backoffInterval = 3000
): void {
 let attempt = 0;

 function attemptLoad(): void {
  if (attempt < maxAttempts) {
   videoElement.load();
   attempt++;
   setTimeout(attemptLoad, backoffInterval * Math.pow(2, attempt - 1));
  } else {
   console.log(`Failed to load video after ${maxAttempts} attempts.`);
  }
 }

 attemptLoad();
}
