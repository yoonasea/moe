import heroData from "@/data/hero.json";
import newsData from "@/data/news.json";
import categoriesData from "@/data/categories.json";
import pagesData from "@/data/pages.json";
import type { Hero, NewsArticle, Page, PaginatedResult } from "./types";

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function getHero(): Promise<Hero> {
  await delay(100);
  return heroData as Hero;
}

export async function getCategories(): Promise<NewsArticle["category"][]> {
  await delay(50);
  return categoriesData;
}

export async function getLatestNews(count: number = 3): Promise<NewsArticle[]> {
  await delay(100);
  return newsData
    .sort(
      (a, b) =>
        new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime()
    )
    .slice(0, count);
}

export async function getNewsList(
  page: number = 1,
  categorySlug?: string,
  perPage: number = 6
): Promise<PaginatedResult<NewsArticle>> {
  await delay(150);

  let filtered = [...newsData];

  if (categorySlug) {
    filtered = filtered.filter(
      (article) => article.category.slug === categorySlug
    );
  }

  filtered.sort(
    (a, b) =>
      new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime()
  );

  const total = filtered.length;
  const totalPages = Math.ceil(total / perPage);
  const start = (page - 1) * perPage;
  const items = filtered.slice(start, start + perPage);

  return { items, total, page, perPage, totalPages };
}

export async function getNewsBySlug(
  slug: string
): Promise<NewsArticle | null> {
  await delay(100);
  return newsData.find((article) => article.slug === slug) ?? null;
}

export async function getPageBySlug(slug: string): Promise<Page | null> {
  await delay(100);
  return pagesData.find((page) => page.slug === slug) ?? null;
}

export async function getAllNewsSlugs(): Promise<string[]> {
  await delay(50);
  return newsData.map((article) => article.slug);
}
