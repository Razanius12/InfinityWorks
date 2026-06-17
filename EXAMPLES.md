# Examples & Extensions

This document provides examples of how to extend and customize the Infinity Works Astro project.

## 🎨 Creating Custom Components

### Example 1: Card Grid Component

```astro
---
// src/components/CardGrid.astro
interface Card {
  title: string;
  description: string;
  image?: string;
  link?: string;
}

interface Props {
  cards: Card[];
  columns?: number;
}

const { cards, columns = 3 } = Astro.props;
---

<div class={`card-grid grid-${columns}`}>
  {cards.map((card) => (
    <div class="card-item">
      {card.image && <img src={card.image} alt={card.title} />}
      <h3>{card.title}</h3>
      <p>{card.description}</p>
      {card.link && <a href={card.link}>Learn More</a>}
    </div>
  ))}
</div>

<style>
  .card-grid {
    display: grid;
    gap: 2rem;
  }

  .grid-2 {
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  }

  .grid-3 {
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  }

  .grid-4 {
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  }
</style>
```

### Example 2: Testimonial Component

```astro
---
// src/components/Testimonial.astro
interface Props {
  quote: string;
  author: string;
  role?: string;
  image?: string;
}

const { quote, author, role, image } = Astro.props;
---

<div class="testimonial">
  <div class="testimonial-content">
    <p class="quote">"{quote}"</p>
    <div class="author-info">
      {image && <img src={image} alt={author} class="author-image" />}
      <div>
        <p class="author-name">{author}</p>
        {role && <p class="author-role">{role}</p>}
      </div>
    </div>
  </div>
</div>

<style>
  .testimonial {
    background: rgba(255, 107, 107, 0.1);
    border-left: 4px solid var(--secondary-color);
    padding: 2rem;
    border-radius: 4px;
  }

  .quote {
    font-size: 1.2rem;
    font-style: italic;
    margin-bottom: 1.5rem;
    color: white;
  }

  .author-info {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .author-image {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    object-fit: cover;
  }

  .author-name {
    font-weight: 700;
    color: white;
    margin: 0;
  }

  .author-role {
    color: var(--secondary-color);
    font-size: 0.9rem;
    margin: 0;
  }
</style>
```

## 📄 Adding New Pages

### Example: About Page

```astro
---
// src/pages/about.astro
import Layout from '../layouts/Layout.astro';
import Section from '../components/Section.astro';
import SocialLinks from '../components/SocialLinks.astro';
import Button from '../components/Button.astro';
---

<Layout title="About Us">
  <Section title="Our Story" subtitle="Learn more about Infinity Works">
    <div class="content-grid">
      <div>
        <p>Content about your team...</p>
      </div>
      <img src="/images/team.jpg" alt="Team" />
    </div>
  </Section>

  <Section title="Contact Us" dark={true}>
    <div class="contact-info">
      <p>Email: contact@example.com</p>
      <SocialLinks
        links={[
          { platform: 'discord', icon: 'bi-discord', url: 'https://discord.gg/...' }
        ]}
      />
    </div>
  </Section>
</Layout>

<style>
  .content-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
    align-items: center;
  }

  @media (max-width: 768px) {
    .content-grid {
      grid-template-columns: 1fr;
    }
  }
</style>
```

### Example: Blog Page

```astro
---
// src/pages/blog.astro
import Layout from '../layouts/Layout.astro';
import Section from '../components/Section.astro';

interface Post {
  title: string;
  date: string;
  author: string;
  excerpt: string;
  slug: string;
}

const posts: Post[] = [
  {
    title: 'Our Latest Event',
    date: '2024-01-15',
    author: 'Razanius12',
    excerpt: 'Recap of our amazing drift event...',
    slug: 'latest-event'
  }
  // Add more posts
];
---

<Layout title="Blog">
  <Section title="Latest Posts" subtitle="Stay updated with team news">
    <div class="posts-grid">
      {posts.map((post) => (
        <article class="post-card">
          <h3>{post.title}</h3>
          <p class="post-meta">{post.date} • {post.author}</p>
          <p>{post.excerpt}</p>
          <a href={`/blog/${post.slug}`}>Read More →</a>
        </article>
      ))}
    </div>
  </Section>
</Layout>

<style>
  .posts-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 2rem;
  }

  .post-card {
    background: rgba(255, 255, 255, 0.05);
    padding: 1.5rem;
    border-radius: 4px;
    border: 1px solid rgba(255, 107, 107, 0.2);
  }

  .post-meta {
    color: var(--secondary-color);
    font-size: 0.9rem;
  }
</style>
```

## 🔧 Using Astro Layouts for Different Page Types

### Create Specialized Layouts

```astro
---
// src/layouts/BlogLayout.astro
import Layout from './Layout.astro';

interface Props {
  title: string;
  author?: string;
  date?: string;
}

const { title, author, date } = Astro.props;
---

<Layout {title}>
  <article class="blog-article">
    <header class="article-header">
      <h1>{title}</h1>
      {author && <p class="author">By {author}</p>}
      {date && <p class="date">{new Date(date).toLocaleDateString()}</p>}
    </header>
    <div class="article-content">
      <slot />
    </div>
  </article>
</Layout>

<style>
  .blog-article {
    max-width: 800px;
    margin: 0 auto;
    padding: 2rem;
  }

  .article-header {
    border-bottom: 2px solid var(--secondary-color);
    padding-bottom: 2rem;
    margin-bottom: 2rem;
  }

  .author, .date {
    color: rgba(255, 255, 255, 0.7);
  }

  .article-content :global(p) {
    line-height: 1.8;
    margin-bottom: 1rem;
  }
</style>
```

## 🎬 Data Collections (Advanced)

### Example: Managing Team Events

```astro
---
// src/components/EventsList.astro
interface Event {
  id: string;
  name: string;
  date: string;
  location: string;
  description: string;
}

const events: Event[] = [
  {
    id: 'event-1',
    name: 'Summer Drift Battle',
    date: '2024-07-15',
    location: 'Stadium Parking Lot',
    description: 'Annual summer drift competition...'
  }
];
---

<div class="events-container">
  {events.map((event) => (
    <div class="event-card">
      <h3>{event.name}</h3>
      <p class="event-date">{new Date(event.date).toLocaleDateString()}</p>
      <p class="event-location">📍 {event.location}</p>
      <p>{event.description}</p>
    </div>
  ))}
</div>
```

## 🎯 Form Integration

### Example: Newsletter Signup

```astro
---
// src/components/NewsletterForm.astro
---

<form class="newsletter-form" method="POST" action="/api/subscribe">
  <input
    type="email"
    name="email"
    placeholder="Enter your email"
    required
  />
  <button type="submit" class="btn btn-primary">Subscribe</button>
</form>

<style>
  .newsletter-form {
    display: flex;
    gap: 1rem;
    max-width: 500px;
    margin: 0 auto;
  }

  input {
    flex: 1;
    padding: 0.75rem 1rem;
    border: 2px solid var(--secondary-color);
    background: rgba(255, 255, 255, 0.1);
    color: white;
    border-radius: 4px;
  }

  input::placeholder {
    color: rgba(255, 255, 255, 0.5);
  }

  @media (max-width: 576px) {
    .newsletter-form {
      flex-direction: column;
    }
  }
</style>
```

## 🔐 Environment Variables

### Use Secrets Safely

```astro
---
// src/components/ContactForm.astro
const apiKey = import.meta.env.PUBLIC_API_KEY;
const secret = import.meta.env.API_SECRET; // Private, not exposed
---
```

In `.env`:
```
PUBLIC_API_KEY=your_public_key
API_SECRET=your_secret_key
```

## 🚀 Advanced: Astro Integrations

### Example Package.json with Integrations

```json
{
  "dependencies": {
    "astro": "^4.1.0",
    "@astrojs/sitemap": "^3.0.0"
  }
}
```

## 📊 Dynamic Data Example

### Fetch External Data

```astro
---
// src/components/NewsSection.astro
const response = await fetch('https://api.example.com/news');
const news = await response.json();
---

<div class="news-grid">
  {news.map((item) => (
    <article>
      <h3>{item.title}</h3>
      <p>{item.content}</p>
    </article>
  ))}
</div>
```

## 🎓 Best Practices

### 1. Component Organization
```
src/components/
├── common/          # Shared components
│   ├── Button.astro
│   └── Card.astro
├── sections/        # Page sections
│   ├── Hero.astro
│   └── Footer.astro
└── layouts/         # Layout wrappers
    └── BlogLayout.astro
```

### 2. Props Validation
```astro
---
interface Props {
  title: string;
  subtitle?: string;
  items: Array<{ id: string; name: string }>;
}

const { title, subtitle, items } = Astro.props;
---
```

### 3. Styling Strategy
- Use global CSS for common styles
- Use scoped styles for component-specific styles
- Use CSS variables for theming
- Keep CSS organized and maintainable

## 💡 Tips & Tricks

1. **Image Optimization** - Use relative paths in public folder
2. **Performance** - Use `loading="lazy"` on images
3. **SEO** - Set proper title and meta tags in Layout
4. **Responsive** - Test with mobile-first approach
5. **Accessibility** - Use semantic HTML and ARIA labels

---

**Need help?** Check [ASTRO_GUIDE.md](./ASTRO_GUIDE.md) for more details.
