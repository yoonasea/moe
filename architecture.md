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

- **Zero client data fetching** — Data is fetched during server rendering and fully hydrated HTML is sent to the client.
- **SEO** — All content is present in the initial HTML response. No client-side waterfalls.
- **ISR support** — The homepage and about page use ISR (`revalidate = 60`) for periodic freshness.
- **Client components only handle interactivity** — `NewsControls` and `PaginationWrapper` are small `"use client"` wrappers that update URL search params via `useRouter()`. They never fetch data.

---

## 2. Directus Schema Design

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
- **pages**: Standalone collection. No direct relationships.

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
- **Directus** — setting up directus and creating collections and test data

### Left out (due to time / scope)

- **Middleware** — no rate limiting
- **Image pipeline** — Images are raw external URLs; no image storage

---

## 4. Scaling (Traffic Spike Scenario)

Scenario: The morning of national exam results release, with a sudden 100× traffic spike.

- Implement ISR
   - This is current project workflow, so html will be cache for a configurable period of time.
- Implement SSG
   - Not recommended because there might be many articles in database, causing long build time
   - but if we are going with this, will need to setup Directus webhook to revalidate the cache
   - can also pair with ISR will help keep data more fresh
- Implement CDN
   - Check if cloud/hosting provider have cdn feature, then set an appropriate revalidate time. Revalidate time value depends on whether u expect the data to change frequently or not
- Implement Redis
   - If current project tech stack does not have SSR/SSG, can use Redis to do caching of data, to prevent database from getting hit too many times
- Skeleton loading
   - already implemented via loading.tsx, to let user perceive that something is loading, rather than showing a blank page. 
- Auto scaling
   - if possible check if current server supports autoscaling like auto adding more instances during high load

