import { readItems, readSingleton } from "@directus/sdk";
import { client } from "./directus";
import type { Hero, NewsArticle, Page, PaginatedResult, Category } from "./types";

interface DirectusNewsItem {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  body: string;
  publishDate: string;
  category: number | { id: number; name: string; slug: string } | null;
  image: string;
  alt: string;
}

interface DirectusPageItem {
  id: number;
  title: string;
  slug: string;
  body: string;
}

interface DirectusHeroItem {
  title: string;
  subtitle: string;
  ctaText: string;
  ctaLink: string;
  backgroundImage: string;
}

export async function directusGetHero(): Promise<Hero> {
  const result = await client.request<DirectusHeroItem>(
    readSingleton("hero")
  );
  return result as Hero;
}

export async function directusGetCategories(): Promise<Category[]> {
  const result = await client.request<{ id: number; name: string; slug: string }[]>(
    readItems("categories")
  );
  return result.map((c) => ({ id: String(c.id), name: c.name, slug: c.slug }));
}

export async function directusGetLatestNews(count: number = 3): Promise<NewsArticle[]> {
  const result = await client.request<DirectusNewsItem[]>(
    readItems("news", {
      sort: ["-publishDate"],
      limit: count,
      fields: ["*", "category.id", "category.name", "category.slug"],
    })
  );
  return result.map(mapNewsItem);
}

export async function directusGetNewsList(
  page: number = 1,
  categorySlug?: string,
  perPage: number = 6
): Promise<PaginatedResult<NewsArticle>> {
  const filter: Record<string, unknown> = {};
  if (categorySlug) {
    filter.category = { slug: { _eq: categorySlug } };
  }

  const items = await client.request<DirectusNewsItem[]>(
    readItems("news", {
      sort: ["-publishDate"],
      limit: perPage,
      offset: (page - 1) * perPage,
      filter,
      fields: ["*", "category.id", "category.name", "category.slug"],
    })
  );

  const allItems = await client.request<DirectusNewsItem[]>(
    readItems("news", {
      filter: categorySlug ? { category: { slug: { _eq: categorySlug } } } : undefined,
      fields: ["id"],
    })
  );

  const total = allItems.length;
  const totalPages = Math.ceil(total / perPage);

  return {
    items: items.map(mapNewsItem),
    total,
    page,
    perPage,
    totalPages,
  };
}

export async function directusGetNewsBySlug(slug: string): Promise<NewsArticle | null> {
  const result = await client.request<DirectusNewsItem[]>(
    readItems("news", {
      filter: { slug: { _eq: slug } },
      limit: 1,
      fields: ["*", "category.id", "category.name", "category.slug"],
    })
  );
  return result.length > 0 ? mapNewsItem(result[0]) : null;
}

export async function directusGetPageBySlug(slug: string): Promise<Page | null> {
  const result = await client.request<DirectusPageItem[]>(
    readItems("pages", {
      filter: { slug: { _eq: slug } },
      limit: 1,
    })
  );
  return result.length > 0 ? { id: String(result[0].id), title: result[0].title, slug: result[0].slug, body: result[0].body } : null;
}

function mapNewsItem(item: DirectusNewsItem): NewsArticle {
  return {
    id: String(item.id),
    title: item.title,
    slug: item.slug,
    excerpt: item.excerpt,
    body: item.body,
    publishDate: item.publishDate,
    category: item.category
      ? typeof item.category === "number"
        ? { id: String(item.category), name: "", slug: "" }
        : { id: String(item.category.id), name: item.category.name, slug: item.category.slug }
      : { id: "", name: "", slug: "" },
    image: item.image,
    alt: item.alt,
  };
}
