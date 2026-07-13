import { Suspense } from "react";
import { getCategories, getNewsList } from "@/lib/api";
import type { Category, PaginatedResult, NewsArticle } from "@/lib/types";
import NewsList from "@/components/NewsList";
import styles from "./page.module.css";
import NewsControls from "./NewsControls";
import PaginationWrapper from "./PaginationWrapper";

export default async function NewsPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; category?: string }>;
}) {
  const params = await searchParams;
  const page = Number(params.page) || 1;
  const category = params.category;

  const [data, categories]: [PaginatedResult<NewsArticle>, Category[]] =
    await Promise.all([getNewsList(page, category), getCategories()]);

  return (
    <div className={styles.page}>
      <h1 className={styles.heading}>News</h1>
      <Suspense fallback={<div>Loading filters...</div>}>
        <NewsControls
          categories={categories}
          currentCategory={category}
        />
      </Suspense>
      <NewsList articles={data.items} />
      <Suspense fallback={<div>Loading pagination...</div>}>
        <PaginationWrapper
          currentPage={page}
          totalPages={data.totalPages}
        />
      </Suspense>
    </div>
  );
}
