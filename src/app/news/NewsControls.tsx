"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import type { Category } from "@/lib/types";
import CategoryFilter from "@/components/CategoryFilter";
import Pagination from "@/components/Pagination";

interface Props {
  categories: Category[];
  currentCategory?: string;
  currentPage: number;
  totalPages: number;
}

export default function NewsControls({
  categories,
  currentCategory,
  currentPage,
  totalPages,
}: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const buildUrl = useCallback(
    (updates: Record<string, string | undefined>) => {
      const params = new URLSearchParams(searchParams.toString());
      for (const [key, value] of Object.entries(updates)) {
        if (value === undefined || value === "") {
          params.delete(key);
        } else {
          params.set(key, value);
        }
      }
      const qs = params.toString();
      return `/news${qs ? `?${qs}` : ""}`;
    },
    [searchParams]
  );

  const handleCategoryChange = useCallback(
    (slug: string | undefined) => {
      router.push(buildUrl({ category: slug, page: undefined }));
    },
    [router, buildUrl]
  );

  const handlePageChange = useCallback(
    (page: number) => {
      router.push(buildUrl({ page: String(page) }));
    },
    [router, buildUrl]
  );

  return (
    <>
      <CategoryFilter
        categories={categories}
        active={currentCategory}
        onChange={handleCategoryChange}
      />
      <Pagination
        page={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </>
  );
}
