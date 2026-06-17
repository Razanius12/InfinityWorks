# Infinity Works - Astro Project Guide

This is a complete Astro conversion of the Infinity Works drift team website. Below is a comprehensive guide to the project structure and how to use it.

## 📁 Project Structure

```
InfinityWorks/
├── src/
│   ├── components/          # Reusable Astro components
│   │   ├── Navigation.astro     # Main navigation bar
│   │   ├── Hero.astro           # Hero section with video background
│   │   ├── About.astro          # Team about section
│   │   ├── Members.astro        # Members grid and carousel
│   │   ├── Videos.astro         # YouTube videos section
│   │   ├── Gallery.astro        # Image gallery placeholder
│   │   ├── GameAppearances.astro # Game appearances showcase
│   │   └── Footer.astro         # Site footer
│   ├── layouts/
│   │   └── Layout.astro         # Main layout wrapper
│   ├── pages/
│   │   └── index.astro          # Main homepage
│   ├── styles/
│   │   └── globals.css          # Global styles
│   ├── lib/
│   │   └── utils.ts             # Utility functions
│   └── env.d.ts                 # TypeScript definitions
├── public/                   # Static assets served as-is
│   ├── images/
│   │   ├── gallery/
│   │   │   └── other/
│   │   └── members/
│   ├── fonts/
│   ├── video/
│   ├── favicon.ico
│   ├── apple-touch-icon.png
│   └── site.webmanifest
├── astro.config.mjs         # Astro configuration
├── tsconfig.json            # TypeScript configuration
├── package.json             # Dependencies and scripts
└── .gitignore               # Git ignore file
```

## 🚀 Getting Started

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

The development server will start at `http://localhost:3000`

## 📦 Key Components

### Navigation
- Responsive navbar with smooth scrolling
- Active link highlighting based on scroll position
- Mobile toggle menu
- Social links and Discord button

### Hero Section
- Full-screen background video with overlay
- Call-to-action button
- Social media icons

### Members Section
- Desktop: 3-column responsive grid
- Mobile: Bootstrap carousel with auto-rotation
- Member cards with social links
- Smooth transitions and hover effects

### Gallery
- Image viewer with:
  - Zoom in/out functionality
  - Pan when zoomed
  - Keyboard navigation (arrows, +/-, Escape)
  - Touch support with pinch zoom
  - Mouse wheel zoom
  - Swipe navigation

### Videos
- Responsive YouTube embed grid
- 2 columns on desktop, 1 on mobile

### Game Appearances
- Showcase of team appearances in games/apps
- Links to games
- Screenshot galleries with platform links

## 🎨 Styling

### CSS Architecture

- **globals.css**: Global styles, layout, and responsive design
- **Bootstrap 5**: Utility classes and components
- **Bootstrap Icons**: Icon library via CDN
- **Google Fonts**: Outfit font family

### Color Scheme

```css
--primary-color: #273987    /* Deep blue */
--secondary-color: #ff6b6b  /* Coral red */
--text-color: #ffffff       /* White */
--dark-bg: #0a0e27          /* Dark navy */
```

### Responsive Breakpoints

- Desktop: > 768px
- Tablet: 577px - 768px
- Mobile: < 576px

## 🔧 Customization

### Adding New Pages

1. Create a new `.astro` file in `src/pages/`
2. Import the Layout component
3. Add your content

Example:
```astro
---
import Layout from '../layouts/Layout.astro';
---

<Layout title="About">
  <!-- Your content -->
</Layout>
```

### Adding New Components

1. Create a new `.astro` file in `src/components/`
2. Define component interface or props
3. Export and use in other components

Example:
```astro
---
interface Props {
  title: string;
}

const { title } = Astro.props;
---

<section>
  <h2>{title}</h2>
</section>
```

### Modifying Styles

1. Edit `src/styles/globals.css` for global changes
2. Add component-specific styles within Astro components using `<style>` tags
3. Use scoped styles for component-specific styling:

```astro
---
---

<div class="component">
  <!-- Content -->
</div>

<style>
  .component {
    background: blue;
  }
</style>
```

## 📱 Features

### Interactive Gallery
- Click any image to open the viewer
- Use keyboard arrows or buttons to navigate
- Use +/- or scroll wheel to zoom
- Drag to pan when zoomed
- Touch gestures supported
- Press Escape to close

### Responsive Design
- Mobile-first approach
- Adaptive layouts for all screen sizes
- Touch-friendly interactions on mobile

### Performance
- Optimized images with lazy loading
- CSS-in-JS for scoped styling
- Minimal JavaScript dependencies
- Static generation for fast loading

## 🌐 Deployment

### Build for Production

```bash
npm run build
```

This creates an optimized `dist/` folder ready for deployment.

### Deploy to GitHub Pages

1. Update `astro.config.mjs` with your site URL
2. Build the project
3. Deploy the `dist/` folder to GitHub Pages

### Deploy to Other Platforms

- **Netlify**: Connect your repo, uses `npm run build` automatically
- **Vercel**: Same as Netlify
- **Traditional Hosting**: Upload `dist/` folder via FTP/SFTP

## 🔗 External Resources

- [Astro Documentation](https://docs.astro.build/)
- [Bootstrap 5 Documentation](https://getbootstrap.com/docs/5.3/)
- [Bootstrap Icons](https://icons.getbootstrap.com/)

## 📝 Development Notes

### Data Structure

Members, videos, and game appearances are defined as TypeScript interfaces within their respective components for type safety and easy customization.

### JavaScript Interactivity

The project uses:
- Bootstrap's JavaScript for carousel functionality
- jQuery for smooth scrolling (can be replaced with vanilla JS)
- Custom JavaScript for advanced image viewer
- Inline scripts using `is:inline` directive for critical functionality

### Asset Management

- Images: `public/images/`
- Videos: `public/video/`
- Fonts: `public/fonts/`
- Icons: Via Bootstrap Icons CDN

## 🤝 Contributing

To extend or modify this project:

1. Create feature branches
2. Test changes locally with `npm run dev`
3. Build and verify with `npm run build`
4. Commit and push changes

## 📄 License

This project maintains the original license from the HTML version.

---

**Last Updated**: 2024
**Astro Version**: 4.1.0+
**Node Version**: 18.0.0+
