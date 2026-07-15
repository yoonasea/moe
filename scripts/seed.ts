import { config } from "dotenv";
config({ path: ".env.local" });

import { createDirectus, rest, staticToken, createItems, deleteItems, updateSingleton } from "@directus/sdk";
import heroData from "../src/data/hero.json";
import newsData from "../src/data/news.json";
import categoriesData from "../src/data/categories.json";
import pagesData from "../src/data/pages.json";

const url = process.env.DIRECTUS_URL || "http://localhost:8055";
const token = process.env.DIRECTUS_TOKEN || "";

const client = createDirectus(url).with(staticToken(token)).with(rest());

async function seed() {
  console.log("Clearing existing data...");

  try { await client.request(deleteItems("news", { limit: 1000 })); } catch { /* empty */ }
  try { await client.request(deleteItems("pages", { limit: 1000 })); } catch { /* empty */ }
  try { await client.request(deleteItems("categories", { limit: 1000 })); } catch { /* empty */ }

  console.log("Seeding categories...");
  const createdCategories = await client.request(
    createItems("categories", categoriesData.map((c) => ({ name: c.name, slug: c.slug })))
  );

  const categoryMap = new Map<string, number>();
  for (const cat of createdCategories as Array<{ id: number; name: string; slug: string }>) {
    categoryMap.set(cat.slug, cat.id);
  }
  console.log(`  Created ${createdCategories.length} categories`);

  console.log("Seeding news articles...");
  const newsPayload = newsData.map((article) => ({
    title: article.title,
    slug: article.slug,
    excerpt: article.excerpt,
    body: article.body,
    publishDate: article.publishDate,
    category: categoryMap.get(article.category.slug) || null,
    image: article.image,
    alt: article.alt,
  }));
  const createdNews = await client.request(createItems("news", newsPayload));
  console.log(`  Created ${(createdNews as unknown[]).length} articles`);

  console.log("Seeding pages...");
  const pagesPayload = pagesData.map((p) => ({
    title: p.title,
    slug: p.slug,
    body: p.body,
  }));
  const createdPages = await client.request(createItems("pages", pagesPayload));
  console.log(`  Created ${(createdPages as unknown[]).length} pages`);

  console.log("Seeding hero...");
  await client.request(
    updateSingleton("hero", {
      title: heroData.title,
      subtitle: heroData.subtitle,
      ctaText: heroData.ctaText,
      ctaLink: heroData.ctaLink,
      backgroundImage: heroData.backgroundImage,
    })
  );
  console.log("  Hero created");

  console.log("\nSeed complete!");
  console.log(`  Categories: ${createdCategories.length}`);
  console.log(`  News articles: ${(createdNews as unknown[]).length}`);
  console.log(`  Pages: ${(createdPages as unknown[]).length}`);
  console.log(`  Hero: 1`);
}

seed().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
