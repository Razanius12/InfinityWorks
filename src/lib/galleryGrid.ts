/**
 * Gallery Grid TypeScript Module
 * Generates image gallery HTML with proper grid layout
 */

export function generateGalleryGrid(imageCount: number = 23): void {
  const gallery = document.getElementById('image-gallery');
  if (!gallery) return;

  let html = '';
  for (let i = 1; i <= imageCount; i++) {
    html += `
      <div class="gallery-item">
        <img 
          loading="lazy"
          src="/images/gallery/${i}.jpg" 
          class="artists-image img-fluid"
          alt="Gallery image ${i}"
        />
      </div>
    `;
  }

  gallery.innerHTML = html;
}
