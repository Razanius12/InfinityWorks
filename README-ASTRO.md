# Astro starter kit: with TypeScript
#
# 🧑‍🚀 Getting started
# - Install dependencies: `npm install`
# - Start dev server: `npm run dev`
# - Build for production: `npm run build`
# - Preview build: `npm run preview`
#
# 👀 Want to learn more? Check out https://docs.astro.build

# Read more about using `PUBLIC_` environment variables:
# https://docs.astro.build/en/guides/environment-variables/#public-environment-variables

PUBLIC_ASSET_PREFIX=

# Infinity Works - Astro Project
This is the Astro version of the Infinity Works drift team website.

## Project Structure

```
/
├── public/              # Static assets (images, fonts, videos, etc.)
├── src/
│   ├── components/      # Reusable Astro components
│   ├── layouts/         # Layout templates
│   ├── pages/           # Astro pages (auto-routes to URLs)
│   ├── styles/          # Global styles
│   └── lib/             # Utility functions
├── astro.config.mjs     # Astro configuration
├── package.json         # Project dependencies
└── tsconfig.json        # TypeScript configuration
```

## Key Features

- **Components**: Modular, reusable components for different sections
- **Layouts**: Centralized layout for consistent page structure
- **Responsive Design**: Bootstrap 5 integration for mobile-first design
- **Image Gallery**: Advanced image viewer with zoom, pan, and keyboard controls
- **Members Carousel**: Responsive carousel for desktop and mobile
- **Videos Section**: Embedded YouTube videos
- **Game Appearances**: Showcase of team appearances in games

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Build for production:
```bash
npm run build
```

## Components

- **Navigation**: Main navigation bar with smooth scrolling
- **Hero**: Hero section with background video
- **About**: Team information section
- **Members**: Responsive member grid and mobile carousel
- **Videos**: YouTube video embeds
- **Gallery**: Dynamic image gallery with viewer
- **GameAppearances**: Game/app appearances showcase
- **Footer**: Site footer with links and copyright

## Styling

The project uses:
- Bootstrap 5 CSS framework
- Custom CSS files for additional styling
- Google Fonts for typography
- Bootstrap Icons for social media and UI icons

## JavaScript Functionality

- jQuery for DOM manipulation and smooth scrolling
- Bootstrap components for carousel and navigation
- Custom image viewer with zoom, pan, and navigation
- Responsive carousel controls positioning
- Click-scroll navigation highlighting

## Deployment

This site is designed to be deployed as a static site. Use the `npm run build` command to generate the production build in the `dist/` directory.
