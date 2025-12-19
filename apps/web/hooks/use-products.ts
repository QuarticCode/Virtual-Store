"use client";

import { useProductsInfiniteQuery } from "@/lib/api/services/products/queries";
import { useUIStore } from "@/lib/stores/ui.store";
import { useFilters } from "./use-filters";
import { useSearch } from "./use-search";

export function useProducts(initialData?: any) {
  const { viewMode, itemsPerPage } = useUIStore();
  const { getFilters } = useFilters();
  const { search } = useSearch();

  const query = useProductsInfiniteQuery(
    { categoryIds: getFilters(), keyword: search },
    itemsPerPage
  );

  const products = query.data?.pages.flatMap((page) => page.products) || [];
  const hasNextPage = query.hasNextPage;

  const loadMore = () => {
    if (hasNextPage && !query.isFetchingNextPage) {
      query.fetchNextPage();
    }
  };

  return {
    products,
    viewMode,
    isLoading: query.isLoading,
    isLoadingMore: query.isFetchingNextPage,
    error: query.error?.message || null,
    hasMore: !!hasNextPage,
    loadMore,
    refresh: () => query.refetch(),
  };
}
