import { describe, it, expect } from "vitest";
import {
  getHero,
  getLatestNews,
  getNewsList,
  getNewsBySlug,
  getPageBySlug,

  getCategories,
} from "../api";

describe("getHero", () => {
  it("returns hero data with required fields", async () => {
    const hero = await getHero();
    expect(hero).toHaveProperty("title");
    expect(hero).toHaveProperty("subtitle");
    expect(hero).toHaveProperty("ctaText");
    expect(hero).toHaveProperty("ctaLink");
    expect(hero).toHaveProperty("backgroundImage");
  });
});

describe("getLatestNews", () => {
  it("returns requested number of articles", async () => {
    const articles = await getLatestNews(3);
    expect(articles).toHaveLength(3);
  });

  it("returns articles sorted by date descending", async () => {
    const articles = await getLatestNews(5);
    for (let i = 1; i < articles.length; i++) {
      const prev = new Date(articles[i - 1].publishDate).getTime();
      const curr = new Date(articles[i].publishDate).getTime();
      expect(prev).toBeGreaterThanOrEqual(curr);
    }
  });

  it("defaults to 3 articles", async () => {
    const articles = await getLatestNews();
    expect(articles).toHaveLength(3);
  });
});

describe("getCategories", () => {
  it("returns all categories", async () => {
    const categories = await getCategories();
    expect(categories.length).toBeGreaterThan(0);
    expect(categories[0]).toHaveProperty("id");
    expect(categories[0]).toHaveProperty("name");
    expect(categories[0]).toHaveProperty("slug");
  });
});

describe("getNewsList", () => {
  it("returns paginated results", async () => {
    const result = await getNewsList(1);
    expect(result).toHaveProperty("items");
    expect(result).toHaveProperty("total");
    expect(result).toHaveProperty("page");
    expect(result).toHaveProperty("totalPages");
    expect(result.items.length).toBeGreaterThan(0);
  });

  it("filters by category slug", async () => {
    const result = await getNewsList(1, "speeches");
    for (const article of result.items) {
      expect(article.category.slug).toBe("speeches");
    }
  });

  it("returns empty array for unknown category", async () => {
    const result = await getNewsList(1, "nonexistent");
    expect(result.items).toHaveLength(0);
    expect(result.total).toBe(0);
  });

  it("paginates correctly", async () => {
    const page1 = await getNewsList(1, undefined, 3);
    expect(page1.items.length).toBeLessThanOrEqual(3);
    expect(page1.page).toBe(1);
    expect(page1.totalPages).toBeGreaterThanOrEqual(1);
  });
});

describe("getNewsBySlug", () => {
  it("returns article for valid slug", async () => {
    const article = await getNewsBySlug("national-chinese-reading-competition-2026");
    expect(article).not.toBeNull();
    expect(article?.slug).toBe("national-chinese-reading-competition-2026");
  });

  it("returns null for invalid slug", async () => {
    const article = await getNewsBySlug("does-not-exist");
    expect(article).toBeNull();
  });
});

describe("getPageBySlug", () => {
  it("returns page for valid slug", async () => {
    const page = await getPageBySlug("about");
    expect(page).not.toBeNull();
    expect(page?.slug).toBe("about");
  });

  it("returns null for invalid slug", async () => {
    const page = await getPageBySlug("nonexistent");
    expect(page).toBeNull();
  });
});

