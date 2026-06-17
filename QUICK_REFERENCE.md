# Quick Reference - Common Tasks

## 🚀 Get Started (First Time)

```bash
npm install
npm run dev
```

Then visit `http://localhost:3000`

## 📝 Edit Content

### Update Member Information
**File:** `src/components/Members.astro`

```typescript
const members: Member[] = [
  {
    id: 'unique-id',
    name: 'Member Name',
    title: 'Role (Leader, Co-Leader, Member)',
    quote: 'Inspirational quote',
    image: '/images/members/image.jpg',
    social: [
      {
        platform: 'instagram',
        icon: 'bi-instagram',
        url: 'https://instagram.com/username'
      }
    ]
  }
];
```

### Add YouTube Videos
**File:** `src/components/Videos.astro`

```typescript
const videos: Video[] = [
  {
    id: 'video-1',
    embedId: 'VIDEO_ID'  // From YouTube URL: youtube.com/watch?v=VIDEO_ID
  }
];
```

### Update Social Links
**File:** `src/components/Footer.astro` and others

```html
<a href="https://your-social-url" class="social-icon-link" target="_blank">
  <span class="bi-platform"></span>
</a>
```

Available icons: `bi-instagram`, `bi-youtube`, `bi-github`, `bi-discord`, `bi-twitter`, `bi-twitch`

### Change Branding Colors
**File:** `src/styles/globals.css`

```css
:root {
  --primary-color: #273987;      /* Main color */
  --secondary-color: #ff6b6b;    /* Accent color */
  --text-color: #ffffff;         /* Text color */
  --dark-bg: #0a0e27;            /* Background */
}
```

## 📄 Create New Pages

### Simple Page
```bash
# Create src/pages/new-page.astro
```

```astro
---
import Layout from '../layouts/Layout.astro';
---

<Layout title="Page Title">
  <h1>Welcome to New Page</h1>
  <p>Your content here</p>
</Layout>
```

Auto-available at `/new-page`

## 🎨 Styling

### Global Styles
Edit `src/styles/globals.css`

### Component-Specific Styles
Add `<style>` tag in component:

```astro
<div class="my-element">
  Content
</div>

<style>
  .my-element {
    background: blue;
    padding: 1rem;
  }
</style>
```

## 🖼️ Images

### Using Images
```html
<img src="/images/gallery/image.jpg" alt="Description" />
```

**Note:** Must start with `/` and be in `public/` folder

### Image Folders
- Members: `/images/members/`
- Gallery: `/images/gallery/`
- Other: `/images/gallery/other/`

## 🔗 Links

### Internal Links
```html
<a href="/">Home</a>
<a href="/about">About</a>
```

### External Links
```html
<a href="https://example.com" target="_blank">External</a>
```

### Scroll to Section
```html
<a href="#section_2" class="click-scroll">Scroll to Section 2</a>
```

## 🚀 Build & Deploy

### Build for Production
```bash
npm run build
```

Creates `dist/` folder with optimized site

### Test Production Build
```bash
npm run preview
```

### Deploy to Netlify
1. Push to GitHub
2. Go to [netlify.com](https://netlify.com)
3. Connect repo
4. Auto-configures or set:
   - Build: `npm run build`
   - Publish: `dist`

### Deploy to Vercel
Same as Netlify

## 🐛 Debug

### Check Console
Open browser DevTools → Console for errors

### Check Built Files
```bash
npm run build
ls -la dist/  # or dir dist on Windows
```

### Clear Cache
```bash
rm -rf .astro dist
npm run dev
```

## 📦 Dependencies

### Add a Package
```bash
npm install package-name
```

### Remove a Package
```bash
npm uninstall package-name
```

### Update All Packages
```bash
npm update
```

## 🎯 Component Usage

### Use Existing Component
```astro
---
import Button from '../components/Button.astro';
import SocialLinks from '../components/SocialLinks.astro';
---

<Button href="/contact" label="Contact Us" />

<SocialLinks
  links={[
    { platform: 'discord', icon: 'bi-discord', url: 'https://discord.gg/...' }
  ]}
/>
```

### Create Reusable Component
```astro
---
// src/components/Card.astro
interface Props {
  title: string;
  description: string;
}
const { title, description } = Astro.props;
---

<div class="card">
  <h3>{title}</h3>
  <p>{description}</p>
</div>

<style>
  .card {
    background: rgba(255, 255, 255, 0.05);
    padding: 2rem;
    border-radius: 8px;
  }
</style>
```

## 🔄 Layout

### Using Layout
All pages use the main Layout:

```astro
---
import Layout from '../layouts/Layout.astro';
---

<Layout title="Your Page Title">
  <!-- Content here -->
</Layout>
```

### What Layout Provides
- HTML structure
- Meta tags
- CSS loading
- Scripts
- Favicon
- Footer

## 💾 Saving & Hot Reload

Astro has hot module replacement (HMR) - changes appear instantly!

Just save your file and the browser updates automatically.

## 📊 File Sizes

Keep optimal sizes:
- Images: < 500KB each
- CSS: Stays small with Astro's scoping
- JS: Minimal - mostly CSS & Bootstrap

## ⚙️ Environment Variables

### Add Variables
Create `.env.local`:
```
PUBLIC_API_KEY=your_key
API_SECRET=your_secret
```

### Use in Code
```astro
---
const apiKey = import.meta.env.PUBLIC_API_KEY;
const secret = import.meta.env.API_SECRET;
---
```

**Note:** `PUBLIC_` prefix makes it available in browser

## 🔐 Security

- Don't commit `.env` files
- Use `.env.local` for local development
- Private env vars don't leak to browser
- Keep secrets in `.env` (not uploaded)

## 📱 Responsive Testing

### Preview Responsive
1. Open DevTools (F12)
2. Click device toolbar icon
3. Select device
4. Test interactions

### Test Breakpoints
- Mobile: < 576px
- Tablet: 577px - 768px
- Desktop: > 768px

## 🎓 Learning

- **Astro:** https://docs.astro.build/
- **Bootstrap:** https://getbootstrap.com/docs/5.3/
- **Web Dev:** https://developer.mozilla.org/

## 🆘 Common Issues

| Issue | Solution |
|-------|----------|
| Port in use | `npm run dev -- --port 3001` |
| Images missing | Check paths start with `/` |
| Styles not work | Clear cache, verify CSS |
| Build fails | `rm -rf .astro dist && npm run build` |
| Page not found | Check file in `src/pages/` |

## 📞 Quick Help

- **Start:** `npm run dev`
- **Build:** `npm run build`
- **Preview:** `npm run preview`
- **Docs:** See ASTRO_GUIDE.md
- **Examples:** See EXAMPLES.md
- **Setup:** See SETUP.md

---

**For detailed guides, see:**
- START_HERE.md - Overview
- ASTRO_GUIDE.md - Comprehensive guide
- EXAMPLES.md - Code samples
