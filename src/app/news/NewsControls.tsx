"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import type { Category } from "@/lib/types";
import CategoryFilter from "@/components/CategoryFilter";

interface Props {
  categories: Category[];
  currentCategory?: string;
}

export default function NewsControls({
  categories,
  currentCategory,
}: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleCategoryChange = useCallback(
    (slug: string | undefined) => {
      const params = new URLSearchParams(searchParams.toString());
      if (slug) {
        params.set("category", slug);
      } else {
        params.delete("category");
      }
      params.delete("page");
      const qs = params.toString();
      router.push(`/news${qs ? `?${qs}` : ""}`);
    },
    [router, searchParams]
  );

  return (
    <CategoryFilter
      categories={categories}
      active={currentCategory}
      onChange={handleCategoryChange}
    />
  );
}
