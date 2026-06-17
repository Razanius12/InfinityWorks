# 🚀 Infinity Works - Astro Project

Welcome! This is a modern, component-based Astro conversion of the Infinity Works drift team website.

## 🎯 What is This?

Your original HTML website has been completely converted to **Astro**, a modern static site framework that offers:
- 🧩 **Component-based architecture** - Reusable, maintainable code
- ⚡ **Better performance** - Optimized builds and smaller bundle sizes
- 📱 **Responsive design** - Works perfectly on all devices
- 🎨 **Modern styling** - Scoped CSS and variables
- 🔧 **Easy customization** - Change content, components, and styling with ease
- 📚 **TypeScript support** - Type-safe development
- 🚀 **Ready to deploy** - Build and deploy anywhere

## ⚡ Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```

Visit `http://localhost:3000` to see your site live!

### 3. Make Changes
Edit files in the `src/` directory and see changes instantly.

### 4. Build for Production
```bash
npm run build
```

Your optimized site will be in the `dist/` folder.

## 📂 Where to Find Things

### 📝 Documentation (READ THESE FIRST)
1. **[CONVERSION_COMPLETE.md](./CONVERSION_COMPLETE.md)** - Overview and features
2. **[SETUP.md](./SETUP.md)** - Setup and development guide  
3. **[ASTRO_GUIDE.md](./ASTRO_GUIDE.md)** - Comprehensive project guide
4. **[EXAMPLES.md](./EXAMPLES.md)** - Code examples and how to extend
5. **[FILES_CREATED.md](./FILES_CREATED.md)** - Complete file structure

### 🔧 Configuration Files
- `package.json` - Dependencies and scripts
- `astro.config.mjs` - Astro configuration
- `tsconfig.json` - TypeScript config
- `.env.example` - Environment variables template

### 📁 Source Code
```
src/
├── components/    # Reusable components (11 total)
├── layouts/       # Layout templates
├── pages/         # Pages (currently just index)
├── styles/        # Global CSS
├── lib/           # Utilities and helpers
└── env.d.ts       # TypeScript definitions
```

### 🎨 Assets
```
public/
├── images/        # All images (members, gallery, etc.)
├── video/         # Video files
├── fonts/         # Custom fonts
└── [icons, favicon, manifest]
```

## 🎨 Customizing Your Site

### Change Content

**Update Members:**
- Edit `src/components/Members.astro`
- Modify the `members` array with new member data
- Add/remove members as needed

**Add Videos:**
- Edit `src/components/Videos.astro`
- Add YouTube video IDs to the `videos` array

**Update Colors:**
- Edit `src/styles/globals.css`
- Change CSS variables at the top:
  ```css
  :root {
    --primary-color: #your-color;
    --secondary-color: #your-color;
    /* ... */
  }
  ```

### Add New Pages

Create a new file in `src/pages/`:
```astro
---
// src/pages/about.astro
import Layout from '../layouts/Layout.astro';
---

<Layout title="About Us">
  <!-- Your content here -->
</Layout>
```

The page will be automatically available at `/about`

### Create New Components

Create a new file in `src/components/`:
```astro
---
// src/components/MyComponent.astro
interface Props {
  title: string;
}
const { title } = Astro.props;
---

<div class="my-component">
  <h2>{title}</h2>
</div>

<style>
  .my-component {
    /* Your styles */
  }
</style>
```

## 📚 Components Included

| Component | Location | Purpose |
|-----------|----------|---------|
| Navigation | `src/components/Navigation.astro` | Top navbar |
| Hero | `src/components/Hero.astro` | Hero section with video |
| About | `src/components/About.astro` | Team info |
| Members | `src/components/Members.astro` | Grid + carousel |
| Videos | `src/components/Videos.astro` | YouTube embeds |
| Gallery | `src/components/Gallery.astro` | Image gallery |
| GameAppearances | `src/components/GameAppearances.astro` | Game features |
| Footer | `src/components/Footer.astro` | Footer |
| Button | `src/components/Button.astro` | Reusable button |
| SocialLinks | `src/components/SocialLinks.astro` | Social icons |
| Section | `src/components/Section.astro` | Section wrapper |

## 🚀 Deployment

### Netlify (Recommended)
```bash
npm run build
```
Then:
1. Go to [netlify.com](https://netlify.com)
2. Connect your GitHub repo
3. Set build command to `npm run build`
4. Set publish directory to `dist`
5. Deploy!

### Vercel
Same as Netlify - just connect your repo and it auto-configures.

### GitHub Pages
```bash
npm run build
# Upload dist/ folder to GitHub Pages
```

### Traditional Hosting
```bash
npm run build
# Upload dist/ folder via FTP/SFTP
```

## 📦 Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run astro    # Run Astro CLI commands
```

## 🎓 Learning Resources

- **[Astro Docs](https://docs.astro.build/)** - Official documentation
- **[Bootstrap 5 Docs](https://getbootstrap.com/docs/5.3/)** - CSS framework
- **[MDN Web Docs](https://developer.mozilla.org/)** - Web standards
- **[TypeScript Handbook](https://www.typescriptlang.org/docs/)** - Type safety

## 🔥 Key Features

✅ **Responsive Design** - Works on all devices  
✅ **Fast Performance** - Optimized builds  
✅ **Component-Based** - Easy to maintain and extend  
✅ **Type-Safe** - TypeScript support  
✅ **SEO Friendly** - Meta tags and structured data  
✅ **Image Viewer** - Advanced gallery with zoom/pan  
✅ **Mobile Carousel** - Touch-friendly member carousel  
✅ **Smooth Navigation** - Click-scroll highlighting  
✅ **Social Integration** - Easy to add social links  
✅ **Well Documented** - Comprehensive guides included  

## 📋 Checklist

- [ ] Run `npm install`
- [ ] Run `npm run dev` and verify it works
- [ ] Customize member info
- [ ] Update social links
- [ ] Add your videos
- [ ] Update colors and branding
- [ ] Optimize images
- [ ] Test on mobile devices
- [ ] Run `npm run build`
- [ ] Deploy to your hosting

## ❓ FAQ

**Q: How do I add a new section?**  
A: Create a new component in `src/components/` and import it in `src/pages/index.astro`

**Q: Can I use it with a backend?**  
A: Yes! Astro supports API routes and integrations.

**Q: How do I make it a blog?**  
A: Create individual pages in `src/pages/blog/` or use Astro's content collections.

**Q: Is it SEO friendly?**  
A: Yes! Astro generates static HTML which is very SEO friendly.

**Q: Can I add animations?**  
A: Yes! Use CSS animations or add a library like Framer Motion or AOS.

## 🆘 Troubleshooting

**Port 3000 in use?**
```bash
npm run dev -- --port 3001
```

**Build fails?**
```bash
rm -rf .astro dist node_modules
npm install
npm run build
```

**Images not showing?**
- Check path starts with `/`
- Ensure file is in `public/` folder
- Verify filename matches exactly

**Styles not working?**
- Clear browser cache
- Check CSS is imported in Layout
- Use browser DevTools to debug

## 📞 Support

1. Check the documentation files (SETUP.md, ASTRO_GUIDE.md, etc.)
2. Look for examples in EXAMPLES.md
3. Check the component code in `src/components/`
4. Review the original HTML for reference
5. Consult Astro and Bootstrap documentation

## 🎉 You're All Set!

Your Infinity Works website is now a modern, maintainable Astro project!

**Next Step:** Run `npm install && npm run dev` to get started.

---

**Version:** 1.0.0 (Astro)  
**Framework:** Astro 4.1.0+  
**CSS Framework:** Bootstrap 5.3.0+  
**Node Version:** 18.0.0+  

**Documentation:** See ASTRO_GUIDE.md for comprehensive guide  
**Examples:** See EXAMPLES.md for code samples  
**Setup:** See SETUP.md for development guide  

Happy coding! 🚀
