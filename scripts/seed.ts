import { config } from "dotenv";
config({ path: ".env.local" });

import {
  createDirectus, rest, staticToken,
  createCollection, createField, createRelation,
  readCollections,
  createItems, deleteItems, updateSingleton,
} from "@directus/sdk";
import heroData from "../src/data/hero.json";
import newsData from "../src/data/news.json";
import categoriesData from "../src/data/categories.json";
import pagesData from "../src/data/pages.json";

const url = process.env.DIRECTUS_URL || "http://localhost:8055";
const token = process.env.DIRECTUS_TOKEN || "";

const client = createDirectus(url).with(staticToken(token)).with(rest());

async function createSchema() {
  console.log("Checking existing schema...");
  const existing = await client.request(readCollections());
  const names = existing.map((c: Record<string, any>) => c.collection);

  if (names.includes("hero") && names.includes("categories") && names.includes("news") && names.includes("pages")) {
    console.log("  All collections already exist, skipping schema creation.");
    return;
  }

  if (!names.includes("hero")) {
    console.log("Creating hero collection...");
    await client.request(createCollection({
      collection: "hero",
      meta: { singleton: true, icon: "article" },
      schema: {},
    }));
    await client.request(createField("hero", {
      field: "title", type: "string",
      meta: { interface: "input", width: "full" },
      schema: { is_nullable: true },
    }));
    await client.request(createField("hero", {
      field: "subtitle", type: "string",
      meta: { interface: "input", width: "full" },
      schema: { is_nullable: true },
    }));
    await client.request(createField("hero", {
      field: "ctaText", type: "string",
      meta: { interface: "input", width: "half" },
      schema: { is_nullable: true },
    }));
    await client.request(createField("hero", {
      field: "ctaLink", type: "string",
      meta: { interface: "input", width: "half" },
      schema: { is_nullable: true },
    }));
    await client.request(createField("hero", {
      field: "backgroundImage", type: "string",
      meta: { interface: "input", width: "full" },
      schema: { is_nullable: true },
    }));
  }

  if (!names.includes("categories")) {
    console.log("Creating categories collection...");
    await client.request(createCollection({
      collection: "categories",
      meta: { icon: "folder", note: "News categories" },
      schema: {},
    }));
    await client.request(createField("categories", {
      field: "name", type: "string",
      meta: { interface: "input", width: "full" },
      schema: { is_nullable: true },
    }));
    await client.request(createField("categories", {
      field: "slug", type: "string",
      meta: { interface: "input", width: "full" },
      schema: { is_nullable: true, is_unique: true },
    }));
  }

  if (!names.includes("news")) {
    console.log("Creating news collection...");
    await client.request(createCollection({
      collection: "news",
      meta: { icon: "article", note: "News articles" },
      schema: {},
    }));
    await client.request(createField("news", {
      field: "title", type: "string",
      meta: { interface: "input", width: "full" },
      schema: { is_nullable: true },
    }));
    await client.request(createField("news", {
      field: "slug", type: "string",
      meta: { interface: "input", width: "full" },
      schema: { is_nullable: true, is_unique: true },
    }));
    await client.request(createField("news", {
      field: "excerpt", type: "text",
      meta: { interface: "input-multiline", width: "full" },
      schema: { is_nullable: true },
    }));
    await client.request(createField("news", {
      field: "body", type: "text",
      meta: { interface: "input-rich-text-wysiwyg", width: "full" },
      schema: { is_nullable: true },
    }));
    await client.request(createField("news", {
      field: "publishDate", type: "date",
      meta: { interface: "datetime", width: "half" },
      schema: { is_nullable: true },
    }));
    await client.request(createField("news", {
      field: "category", type: "integer",
      meta: {
        interface: "select-dropdown-m2o",
        special: ["m2o"],
        options: { template: "{{name}}" },
        width: "half",
      },
      schema: { is_nullable: true },
    }));
    await client.request(createField("news", {
      field: "image", type: "string",
      meta: { interface: "input", width: "half" },
      schema: { is_nullable: true },
    }));
    await client.request(createField("news", {
      field: "alt", type: "string",
      meta: { interface: "input", width: "half" },
      schema: { is_nullable: true },
    }));

    console.log("Creating category relation...");
    await client.request(createRelation({
      collection: "news",
      field: "category",
      related_collection: "categories",
      meta: {
        one_collection: "categories",
        one_field: null,
        junction_field: null,
      },
      schema: {
        table: "news",
        column: "category",
        foreign_key_table: "categories",
        foreign_key_column: "id",
        on_delete: "SET NULL",
      },
    }));
  }

  if (!names.includes("pages")) {
    console.log("Creating pages collection...");
    await client.request(createCollection({
      collection: "pages",
      meta: { icon: "description", note: "Static pages" },
      schema: {},
    }));
    await client.request(createField("pages", {
      field: "title", type: "string",
      meta: { interface: "input", width: "full" },
      schema: { is_nullable: true },
    }));
    await client.request(createField("pages", {
      field: "slug", type: "string",
      meta: { interface: "input", width: "full" },
      schema: { is_nullable: true, is_unique: true },
    }));
    await client.request(createField("pages", {
      field: "body", type: "text",
      meta: { interface: "input-rich-text-wysiwyg", width: "full" },
      schema: { is_nullable: true },
    }));
  }
}

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

async function main() {
  await createSchema();
  await seed();
}

main().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
