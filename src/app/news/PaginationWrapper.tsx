"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import Pagination from "@/components/Pagination";

interface Props {
  currentPage: number;
  totalPages: number;
}

export default function PaginationWrapper({ currentPage, totalPages }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handlePageChange = useCallback(
    (page: number) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set("page", String(page));
      const qs = params.toString();
      router.push(`/news${qs ? `?${qs}` : ""}`);
    },
    [router, searchParams]
  );

  return (
    <Pagination
      page={currentPage}
      totalPages={totalPages}
      onPageChange={handlePageChange}
    />
  );
}
