# Architecture Notes

## 1. Data Fetching Strategy

This project uses **Next.js App Router with async Server Components** as the sole data fetching pattern. Every page component is an `async` function that calls the API layer directly:

```tsx
// src/app/page.tsx
export const revalidate = 60;

export default async function Home() {
  const [hero, latestNews] = await Promise.all([
    getHero(),
    getLatestNews(3),
  ]);
  // ...
}
```

### Why Server Components?

- Primary data fetching occurs on the server. Client components are only responsible for UI interactions and do not fetch application data.
- **SEO** — All content is present in the initial HTML response. No client-side waterfalls.
- **ISR support** — The homepage and about page use ISR (`revalidate = 60`) for periodic freshness.
- **Client components only handle interactivity** — `NewsControls` and `PaginationWrapper` are small `"use client"` wrappers that update URL search params via `useRouter()`. They never fetch data.

---

## 2. Directus Schema Design

For Directus input type refer to readme.md

### Collections

#### `hero` (Singleton)

| Field             | Type        | Notes                        |
| ----------------- | ----------- | ---------------------------- |
| `title`           | String      | Hero heading text            |
| `subtitle`        | String      | Hero subheading              |
| `ctaText`         | String      | Call-to-action button label  |
| `ctaLink`         | String      | Internal route path          |
| `backgroundImage` | String (URL)| Full-width background image  |

#### `pages`

| Field  | Type          | Notes                        |
| ------ | ------------- | ---------------------------- |
| `id`   | UUID          | Primary key                  |
| `title`| String        | Page title                   |
| `slug` | String        | URL-friendly identifier      |
| `body` | String        | Rich text content            |

#### `categories`

| Field  | Type          | Notes                        |
| ------ | ------------- | ---------------------------- |
| `id`   | UUID          | Primary key                  |
| `name` | String        | Display name                 |
| `slug` | String        | URL-friendly identifier      |

#### `news`

| Field         | Type          | Notes                        |
| ------------- | ------------- | ---------------------------- |
| `id`          | UUID          | Primary key                  |
| `title`       | String        | Article headline             |
| `slug`        | String        | URL-friendly identifier      |
| `excerpt`     | String        | Short summary                |
| `body`        | String        | Full article content         |
| `publishDate` | Datetime      | Publication date             |
| `category`    | Many-to-One   | FK → `categories.id`         |
| `image`       | String        | Hero/thumbnail image         |
| `alt`         | String        | Alt text for image           |

### Key Relationships

- **news → categories**: Many-to-One. Each article belongs to one category.

### Rationale

- The singleton `hero` collection simplifies managing a single homepage hero.
- `categories` is a separate collection so it can be reused for filtering in the API
- Using `slug` fields (rather than raw IDs) for URL-based lookups keeps routes clean and user-friendly.
- `WYSIWYG` for body fields allows content editors to format rich content without HTML knowledge.

---

## 3. Trade-offs

### Prioritised

- **Server rendering by default** — All pages are Server Components, which gives good SEO and performance out of the box.
- **Clean Code** clean architecture and databse schema
- **ISR for freshness** — using ISR for caching content
- **Test coverage** — setting up unit test and integration tests using vitest
- **Responsive design** — making sure the content flows properly on both desktop and mobile 
- **Functions** — making sure all apis and pagination works
- **Accessibility** — aria label, alt text, semnatic
- **Directus** — setting up directus and creating collections and test data

### Left out (due to time / scope)

- **Middleware** — no rate limiting
- **Image pipeline** — Images are raw external URLs; no image storage

---

## 4. Scaling (Traffic Spike Scenario)

Scenario: The morning of national exam results release, with a sudden 100× traffic spike.

- ISR
   - Preferred for this project.
   - Pages are generated on demand and cached for a configurable period of time.
   - Reduces the number of requests to Directus and the database by serving cached HTML.
   - Directus webhooks can trigger `revalidatePath()` or `revalidateTag()` after editors publish or update content, allowing pages to be regenerated immediately instead of waiting for the next revalidation interval.
   - Provides a good balance between performance and content freshness for a CMS-driven website.
- SSG
   - Suitable only if the number of news articles is relatively small and content changes infrequently.
   - Large numbers of articles increase build time because every page is generated during the build.
   - If new articles are published frequently, rebuilding the entire site becomes impractical.
- CDN
   - Deploy behind a CDN (e.g. Vercel Edge Network or Cloudflare) so cached HTML, JavaScript, CSS and images are served from edge locations closer to users.
- Redis
   - Use Redis to cache expensive API responses or database queries when dynamic rendering is required. This reduces load on Directus and the database but does not replace HTML caching provided by ISR.
- Skeleton loading
   - Improves perceived performance by displaying placeholders while streamed content loads.
- Auto scaling
   - If deployed to a cloud platform, enable horizontal auto scaling so additional application instances are created automatically during periods of high traffic.
- Image optimisation
   - Use the next/image component to automatically serve responsive images in modern formats (WebP/AVIF).
   - Reduces bandwidth usage and improves page load performance.

