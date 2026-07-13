# MOE Corporate Website — Implementation Todo (No Directus)

> Replace Directus with a local JSON data layer + mock API pattern, keeping the schema design documented for reference.

---

## Phase 1: Project Scaffolding

- [x] Initialize Next.js project with TypeScript and App Router
- [x] Configure ESLint, Prettier, and path aliases (`@/`)
- [x] Set up project folder structure:
  ```
  src/
    app/          (routes)
    components/   (shared UI)
    lib/          (data fetching, types, utils)
    data/         (mock JSON / API layer)
  ```

## Phase 2: Data Modelling & Mock Layer

- [x] Define TypeScript types/interfaces:
  - `NewsArticle` (id, title, slug, excerpt, body, publishDate, category, image)
  - `Category` (id, name, slug)
  - `Page` (id, title, slug, body, heroImage)
  - `Hero` (title, subtitle, ctaText, ctaLink, backgroundImage)
- [x] Create mock JSON files in `src/data/`:
  - `hero.json` (hero section content)
  - `news.json` (array of articles)
  - `categories.json` (array of categories)
  - `pages.json` (about page etc.)
- [x] Build data-access layer (`src/lib/api.ts`):
  - `getHero()`
  - `getLatestNews(count)`
  - `getNewsList(page, category?)`
  - `getNewsBySlug(slug)`
  - `getPageBySlug(slug)`
  - Simulate pagination, filtering, and async delay
- [x] Document the Directus schema design (collections, fields, relationships) in a markdown doc or schema diagram — since we skipped Directus, this needs to exist for the deliverable

## Phase 3: Shared UI Components

- [x] `Header` (navigation)
- [x] `Footer`
- [x] `HeroSection` (title, subtitle, CTA, background image)
- [x] `NewsCard` (thumbnail, title, date, category, link)
- [x] `NewsList` (grid of NewsCards)
- [x] `Pagination` (page numbers, prev/next)
- [x] `CategoryFilter` (buttons/select for filtering)
- [x] `RichTextRenderer` (renders HTML/markdown body safely)
- [x] Ensure semantic HTML, alt text, ARIA labels throughout

## Phase 4: Routes / Pages

- [x] **Home (`/`)** — Hero section + Latest 3 news items
- [x] **News Listing (`/news`)** — Paginated list + category filter
- [x] **News Detail (`/news/[slug]`)** — Full article with rich text body
- [x] **About (`/about`)** — Generic page rendered from `pages` model
- [x] **404 page** — Fallback for unknown routes
- [x] Apply consistent layout (Header/Footer wrapping)

## Phase 5: Data Fetching Strategy

- [x] Use **Server Components** for primary data fetching (SSR/SSG)
- [x] Add `generateStaticParams` for news detail pages (static generation)
- [x] Add appropriate caching (`revalidate` or `cache` options)
- [x] Handle loading states (suspense boundaries)
- [x] Handle errors and empty states gracefully

## Phase 6: Testing

- [x] Set up Vitest + React Testing Library
- [x] Write **unit tests**:
  - `NewsCard` renders correctly
  - `Pagination` triggers callbacks
  - `CategoryFilter` calls onChange
  - `HeroSection` renders content
- [x] Write **integration tests**:
  - Home page fetches and renders hero + news
  - News listing page fetches and renders articles
  - News detail page renders article content
  - Filtering updates the displayed list
- [x] Mock data layer in tests (`vi.mock` or similar)
- [x] Aim for ~60-80% coverage on critical logic

## Phase 7: Performance & Accessibility

- [x] Audit semantic HTML structure
- [x] Add alt text to all images
- [x] Add ARIA labels to interactive elements (pagination, filters)
- [x] Test keyboard navigation
- [x] Optimize images (Next.js `Image` component)
- [x] Add responsive styling (mobile breakpoint)
- [ ] Run Lighthouse audit (manual)

## Phase 8: README & Documentation

- [ ] Write setup instructions (install, run dev, run tests)
- [ ] List required environment variables (none needed without Directus)
- [ ] Document mock data layer architecture
- [ ] Include Directus schema design doc (for submission requirement)
- [ ] Take/paste screenshots:
  - Home page hero + news teaser
  - News listing mobile view
  - (Screenshots of Directus schema if applicable)
- [ ] Write architecture notes (~1 page):
  - Data fetching strategy justification
  - Schema design rationale
  - Trade-offs and priorities
  - Scaling considerations

## Phase 9: Final Polish

- [ ] Run full test suite — all pass
- [ ] Run `next build` — no errors
- [ ] Review all routes for correctness
- [ ] Final README review
