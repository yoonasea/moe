import type { Hero, NewsArticle, Page, PaginatedResult } from "./types";
import {
  mockGetHero,
  mockGetCategories,
  mockGetLatestNews,
  mockGetNewsList,
  mockGetNewsBySlug,
  mockGetPageBySlug,
  mockGetAllNewsSlugs,
} from "./mock-api";

const useDirectus = process.env.DATA_SOURCE === "directus";

let directusImpl: typeof import("./directus-api") | null = null;

async function getDirectus() {
  if (!directusImpl) {
    directusImpl = await import("./directus-api");
  }
  return directusImpl;
}

export async function getHero(): Promise<Hero> {
  if (useDirectus) {
    const d = await getDirectus();
    return d.directusGetHero();
  }
  return mockGetHero();
}

export async function getCategories(): Promise<NewsArticle["category"][]> {
  if (useDirectus) {
    const d = await getDirectus();
    return d.directusGetCategories();
  }
  return mockGetCategories();
}

export async function getLatestNews(count: number = 3): Promise<NewsArticle[]> {
  if (useDirectus) {
    const d = await getDirectus();
    return d.directusGetLatestNews(count);
  }
  return mockGetLatestNews(count);
}

export async function getNewsList(
  page: number = 1,
  categorySlug?: string,
  perPage: number = 6
): Promise<PaginatedResult<NewsArticle>> {
  if (useDirectus) {
    const d = await getDirectus();
    return d.directusGetNewsList(page, categorySlug, perPage);
  }
  return mockGetNewsList(page, categorySlug, perPage);
}

export async function getNewsBySlug(
  slug: string
): Promise<NewsArticle | null> {
  if (useDirectus) {
    const d = await getDirectus();
    return d.directusGetNewsBySlug(slug);
  }
  return mockGetNewsBySlug(slug);
}

export async function getPageBySlug(slug: string): Promise<Page | null> {
  if (useDirectus) {
    const d = await getDirectus();
    return d.directusGetPageBySlug(slug);
  }
  return mockGetPageBySlug(slug);
}

export async function getAllNewsSlugs(): Promise<string[]> {
  if (useDirectus) {
    const d = await getDirectus();
    return d.directusGetAllNewsSlugs();
  }
  return mockGetAllNewsSlugs();
}
