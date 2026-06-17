# Development Setup Guide

## Initial Setup

After cloning this Astro project, follow these steps:

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```

The site will be available at `http://localhost:3000`

### 3. Create Environment Variables (Optional)
```bash
cp .env.example .env.local
```

## Project Structure Overview

### Core Directories

- **src/pages/**: Main pages (auto-routed to URLs)
  - `index.astro` - Homepage

- **src/components/**: Reusable components
  - Each major section is its own component
  - Components can be composed together
  - Example: Footer, Navigation, Members carousel

- **src/layouts/**: Layout templates
  - `Layout.astro` - Main wrapper for all pages
  - Handles meta tags, fonts, scripts

- **src/styles/**: Global stylesheets
  - `globals.css` - Main CSS file

- **src/lib/**: Utility functions
  - `utils.ts` - Helper functions for common tasks

- **public/**: Static assets served as-is
  - Images
  - Videos
  - Fonts
  - Favicon files

## Customizing Content

### 1. Updating Members

Edit `src/components/Members.astro` and modify the `members` array:

```typescript
const members: Member[] = [
  {
    id: 'unique-id',
    name: 'Member Name',
    title: 'Role',
    quote: 'Your quote',
    image: '/images/members/image.jpg',
    social: [
      {
        platform: 'instagram',
        icon: 'bi-instagram',
        url: 'https://instagram.com/handle'
      }
    ]
  }
  // Add more members...
];
```

### 2. Updating Videos

Edit `src/components/Videos.astro` and modify the `videos` array:

```typescript
const videos: Video[] = [
  {
    id: 'unique-id',
    embedId: 'YOUTUBE_VIDEO_ID'  // Part after v= in YouTube URL
  }
  // Add more videos...
];
```

### 3. Updating Game Appearances

Edit `src/components/GameAppearances.astro` and modify the `appearances` array with your game data.

### 4. Updating Gallery Images

The gallery in `src/components/Gallery.astro` automatically loads images from:
- `public/images/gallery/1.jpg` to `public/images/gallery/23.jpg`

To change the number of images, modify the custom.js script that generates the gallery.

## Building and Deployment

### Build for Production
```bash
npm run build
```

This creates an optimized `dist/` folder.

### Preview Build Locally
```bash
npm run preview
```

### Deploy to GitHub Pages

1. Update `astro.config.mjs` if needed
2. Build the project: `npm run build`
3. Configure GitHub Pages to use `dist/` folder
4. Push to GitHub

### Deploy to Other Platforms

**Netlify:**
- Connect your GitHub repo to Netlify
- Set build command: `npm run build`
- Set publish directory: `dist`

**Vercel:**
- Connect your GitHub repo to Vercel
- Same configuration as Netlify
- Auto-deploys on push

## Development Workflow

### Adding a New Page

1. Create `src/pages/new-page.astro`
2. Add frontmatter and content:

```astro
---
import Layout from '../layouts/Layout.astro';
---

<Layout title="New Page">
  <!-- Content -->
</Layout>
```

3. Automatically available at `/new-page`

### Adding a New Component

1. Create `src/components/NewComponent.astro`
2. Define props and content
3. Import and use in pages or other components

### Styling Best Practices

- Use global styles in `src/styles/globals.css`
- Use scoped styles in components for specific styling
- Leverage Bootstrap utility classes
- Use CSS variables for consistent colors

## Common Tasks

### Adding Social Links

Find the social icon link HTML and update:
```html
<a href="https://your-social-url" class="social-icon-link">
  <span class="bi-platform-name"></span>
</a>
```

Available icons: `bi-instagram`, `bi-youtube`, `bi-github`, `bi-discord`, `bi-twitter`

### Changing Colors

Edit CSS variables in `src/styles/globals.css`:
```css
:root {
  --primary-color: #273987;
  --secondary-color: #ff6b6b;
  --text-color: #ffffff;
  --dark-bg: #0a0e27;
}
```

### Adding a Banner Section

Create a new component:
```astro
---
// src/components/Banner.astro
---

<section class="banner-section section-padding">
  <div class="container">
    <!-- Your banner content -->
  </div>
</section>
```

Then add it to `src/pages/index.astro`:
```astro
<Layout title="Home">
  <Navigation />
  <Hero />
  <Banner />
  <!-- ... other sections ... -->
</Layout>
```

## Troubleshooting

### Port 3000 Already in Use
```bash
npm run dev -- --port 3001
```

### Build Fails
1. Clear cache: `rm -rf .astro dist`
2. Reinstall dependencies: `npm install`
3. Try building again: `npm run build`

### Images Not Loading
- Ensure images are in `public/` folder
- Use absolute paths starting with `/`
- Check file extensions match exactly

### Styles Not Applying
- Ensure CSS is imported in Layout
- Check CSS selector specificity
- Use browser dev tools to inspect styles

## Resources

- [Astro Docs](https://docs.astro.build/)
- [Bootstrap Docs](https://getbootstrap.com/)
- [Bootstrap Icons](https://icons.getbootstrap.com/)
- [MDN Web Docs](https://developer.mozilla.org/)

## Next Steps

1. Customize the content for your needs
2. Add more pages and sections
3. Optimize images for web
4. Test on different devices
5. Deploy to your hosting platform

Happy building! 🚀
