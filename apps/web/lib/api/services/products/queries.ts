import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchProductsClient } from './service';
import type { ProductsFilters } from './types';

export function useProductsInfiniteQuery(
  filters?: ProductsFilters, 
  itemsPerPage = 10
) {
  return useInfiniteQuery({
    queryKey: ['products', filters, itemsPerPage],
    queryFn: async ({ pageParam = 0 }) => {
      const result = await fetchProductsClient({
        lastProductIndex: pageParam,
        itemsPerPage,
        filters,
      });
      
      return result; 
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      const hasMore = lastPage.products.length === itemsPerPage;
      const nextIndex = lastPage.nextPageIndex ?? lastPage.pagination.lastProductIndex;
      return hasMore ? nextIndex : undefined;
    },
    staleTime: 30 * 1000,
    gcTime: 5 * 60 * 1000,
  });
}