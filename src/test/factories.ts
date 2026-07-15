import type { Hero, Category, NewsArticle, Page, PaginatedResult } from "@/lib/types";

export function createHero(overrides?: Partial<Hero>): Hero {
  return {
    title: "Test Hero Title",
    subtitle: "Test subtitle",
    ctaText: "Learn More",
    ctaLink: "/about",
    backgroundImage: "/images/test.jpg",
    ...overrides,
  };
}

export function createCategory(overrides?: Partial<Category>): Category {
  return {
    id: "cat-1",
    name: "Press Releases",
    slug: "press-releases",
    ...overrides,
  };
}

export function createNewsArticle(overrides?: Partial<NewsArticle>): NewsArticle {
  return {
    id: "news-1",
    title: "Test Article",
    slug: "test-article",
    excerpt: "Test excerpt",
    body: "## Test body\n\nSome content here.",
    publishDate: "2025-12-05T08:00:00.000Z",
    category: createCategory(),
    image: "/images/test.jpg",
    alt: "Test image",
    ...overrides,
  };
}

export function createPage(overrides?: Partial<Page>): Page {
  return {
    id: "page-1",
    title: "Test Page",
    slug: "test-page",
    body: "## Heading\n\nSome content.",
    ...overrides,
  };
}

export function createPaginatedResult<T>(
  items: T[],
  overrides?: Partial<PaginatedResult<T>>
): PaginatedResult<T> {
  return {
    items,
    total: items.length,
    page: 1,
    perPage: 6,
    totalPages: Math.ceil(items.length / 6),
    ...overrides,
  };
}
