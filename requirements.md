Technical Assessment: MOE Corporate Website Prototype
1. Overview
You are required to implement a functional, vertical slice of the MOE Corporate
Website (inspired by www.moe.gov.sg) using the following stack:
 Next.js (App Router preferred)
 Directus (Headless CMS – Self-hosted/Local)
 TypeScript (Required for type-safe data fetching)
The Goal: We want to assess your ability to model content in a CMS, consume it via
a modern frontend, and write maintainable, well-tested React code. We value clean
architecture, accessibility, and logical data structures over pixel-perfect CSS
replication.

2. Scenario &amp; Setup
MOE is modernising its web stack by moving towards a decoupled, headless
architecture. You are building a minimal prototype to demonstrate how content
managed in Directus can be dynamically served to a Next.js frontend.
Please use one of the following:
1. Local Docker (Recommended): Run Directus locally using the official
Docker image (e.g., docker run -p 8055:8055 directus/directus).
2. Mocked API: If you are unable to run Docker, you may use a local JSON
server or mock the API responses. However, you must still provide the
Directus schema design (via screenshots or a JSON configuration) that your
mocks represent.

3. Functional Requirements
Your prototype should implement the following routes and features:
 Home Page (/)
o Hero Section: Title, subtitle, background image, and Call-to-Action
(CTA) button managed via Directus.
o Latest News Teaser: A section displaying the three most recent
articles fetched from the CMS.
 News Listing Page (/news)

2

o Fetch and display a list of news articles from the CMS.
o Implement pagination and basic filtering by category (e.g., ‘Press
Releases’, ‘Announcements’).
 News Detail Page (/news/[slug])
o A dynamic route that renders the full article (title, publish date, and rich
text body) based on the slug.
 Static Information Page (e.g., /about)
o Demonstrate a generic ‘Page’ model that can handle headings and rich
text managed via Directus.

4. Technical Requirements
4.1 Data Modelling
Organise a sensible schema in Directus. At a minimum, include:
 Collections: pages (for static content) and news (for articles).
 Supporting Collections: A categories collection linked to news.
 Fields: Use appropriate types (e.g., ‘Image’ for heroes,
‘WYSIWYG/Markdown’ for body text, ‘Slug’ for URLs).
4.2 Testing
We expect meaningful test coverage (aim for ~60–80% on critical logic).
 Unit Tests: For core UI components (e.g., NewsCard, Navigation).
 Integration Tests: Verify that page components correctly fetch and render
data from your (mocked or local) API.
 Framework: Use Jest + React Testing Library or Vitest.
4.3 Performance &amp; Accessibility
 Utilise appropriate Next.js data fetching strategies (e.g., Server Components,
Caching).
 Ensure basic accessibility: Semantic HTML, Alt text for images, and ARIA
labels where necessary.

5. README &amp; Visual Documentation

3

To verify your setup, your README.md must include:
 CMS Setup Screenshots:
1. Collections Sidebar: Showing your pages, news, and categories.
2. Schema Configuration: A screenshot of the fields defined for the
news collection.
3. Sample Data: A screenshot of 2–3 records within the Directus content
editor.

 Application Screenshots:
1. Home Page: The rendered hero section and news teaser.
2. Mobile View: The News Listing page viewed at a mobile breakpoint.
 Setup Instructions:
1. Clear steps to run the Next.js app and the CMS locally.
2. A list of required .env variables (e.g., DIRECTUS_URL).

6. Deliverables
Your submission must include:
1. Github Repository: (share the repo to johnny_lim@tech.gov.sg) containing
code, tests, and the README with screenshots.
2. Architecture Notes (~1 page):
o An explanation of your data fetching strategy (e.g., Why use Server
Components?).
o A brief justification for your Directus schema design.
o Trade-offs: What did you prioritise, and what did you leave out due to
the time limit?
o Scaling: How would this architecture handle a massive spike in traffic
(e.g., the morning of national exam results release)?