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

- **Zero client data fetching** — No `useEffect`, SWR, or React Query. Data is fetched during server rendering and fully hydrated HTML is sent to the client.
- **SEO** — All content is present in the initial HTML response. No client-side waterfalls.
- **Simpler code** — No loading/error states to manage on the client. Server Components can `throw` or `notFound()` directly.
- **ISR & SSG support** — The homepage and about page use ISR (`revalidate = 60`) for periodic freshness. News detail pages are pre-built at build time via `generateStaticParams()`.
- **Client components only handle interactivity** — `NewsControls` and `PaginationWrapper` are small `"use client"` wrappers that update URL search params via `useRouter()`. They never fetch data.

### Current Data Flow

```
JSON files (src/data/*.json)
    → src/lib/api.ts  (async functions with simulated delay)
    → Server Components (src/app/**/page.tsx)
    → Client components via props  (src/components/)
```

---

## 2. Schema Design

This section documents the Directus schema that the mock data layer represents.

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
| `slug` | String (Slug) | URL-friendly identifier      |
| `body` | WYSIWYG       | Rich text content            |

#### `categories`

| Field  | Type          | Notes                        |
| ------ | ------------- | ---------------------------- |
| `id`   | UUID          | Primary key                  |
| `name` | String        | Display name                 |
| `slug` | String (Slug) | URL-friendly identifier      |

#### `news`

| Field         | Type          | Notes                        |
| ------------- | ------------- | ---------------------------- |
| `id`          | UUID          | Primary key                  |
| `title`       | String        | Article headline             |
| `slug`        | String (Slug) | URL-friendly identifier      |
| `excerpt`     | String        | Short summary (teaser text)  |
| `body`        | WYSIWYG       | Full article content         |
| `publishDate` | Datetime      | Publication date             |
| `category`    | Many-to-One   | FK → `categories.id`         |
| `image`       | String (URL)  | Hero/thumbnail image         |
| `alt`         | String        | Alt text for image           |

### Key Relationships

- **news → categories**: Many-to-One. Each article belongs to one category.
- **pages**: Standalone collection. No direct relationships.

### Rationale

- The singleton `hero` collection simplifies managing a single homepage hero.
- `categories` is a separate collection so it can be reused for filtering in the API and future features (e.g., category landing pages).
- Using `slug` fields (rather than raw IDs) for URL-based lookups keeps routes clean and user-friendly.
- `WYSIWYG` for body fields allows content editors to format rich content without HTML knowledge.

---

## 3. Trade-offs

### Prioritised

- **Mock-first development** — JSON files replace a real Directus instance, enabling fast iteration without infrastructure.
- **Server rendering by default** — All pages are Server Components, which gives good SEO and performance out of the box.
- **Clean API abstraction** — `src/lib/api.ts` isolates all data access behind async functions. Switching from JSON to a real API requires no component changes — only the `api.ts` internals.
- **ISR for freshness** — The homepage and about page revalidate every 60 seconds, balancing performance with content currency.
- **Test coverage** — API layer, component rendering, and navigation are tested.

### Left out (due to time / scope)

- **Real database** — No Directus or PostgreSQL connection. Data is static JSON in memory.
- **Authentication** — No admin auth, no protected routes.
- **Search** — No full-text search across news articles.
- **Image pipeline** — Images are raw external URLs; no next/image optimisation or CDN delivery.
- **Dedicated caching** — No Redis or external cache; only relies on Next.js ISR and HTTP caching.
- **Preview mode** — No draft/preview support for content editors.
- **Dynamic data** — The dataset is static at build time. There is no way for content editors to publish changes without a rebuild.

---

## 4. Scaling (Traffic Spike Scenario)

Scenario: The morning of national exam results release, with a sudden 100× traffic spike.

### Current Bottlenecks

- **JSON in memory** — Each server instance loads all JSON files into RAM. This is fast but doesn't scale horizontally beyond what the process can hold.
- **No external cache** — Relies entirely on ISR and browser caching. Repeated page visits still re-execute the Server Component every 60 seconds.
- **No DB connection pooling** — Not an issue now (JSON data), but a real Directus instance would need connection management under load.

### How to Scale

1. **Replace JSON with a real Directus instance + PostgreSQL.**
   The API abstraction in `src/lib/api.ts` already returns `Promise<Hero>`, `Promise<NewsArticle[]>`, etc. Swapping the implementation to hit Directus REST endpoints is a purely internal change.

2. **Add a Redis caching layer.**
   Wrap data functions with a cache (e.g., Upstash Redis, Vercel KV):

   ```
   getHero() → check Redis → miss → fetch Directus → write Redis → return
   ```

   Cache frequently accessed data (hero, news list, categories) with a TTL of 30–60 seconds. Bust the cache when content is updated via Directus webhooks.

3. **Use a CDN with stale-while-revalidate.**
   Configure `Cache-Control: public, s-maxage=30, stale-while-revalidate=300` on response headers. The CDN (Vercel Edge, Cloudflare) serves stale content instantly while the fresh page is generated in the background.

4. **Leverage ISR + `generateStaticParams()`.**
   News detail pages are already statically generated at build time. For exam results, pre-build the most-visited pages and let ISR refresh the rest on demand.

5. **Horizontal auto-scaling.**
   Deploy on Vercel — it auto-scales to handle traffic bursts. Each instance is stateless, so adding more instances is transparent.

6. **Streaming & Suspense.**
   Already in place — `loading.tsx` files and `Suspense` boundaries ensure the shell HTML renders immediately while data streams in. Under load, users see a loading state rather than a blank page or timeout.

7. **Fallback & Graceful Degradation.**
   If Directus is overwhelmed, serve stale cached data. If Redis is down, fall through to Directus. The system should never hard-fail on the user — serve something, even if slightly stale.
