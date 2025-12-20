import type { Product as UiProduct } from '@/components/products/product-card';

export type RawProduct = {
  id: number;
  discount_price: number;
  isFromFutureInventory: boolean;
  name: string;
  description: string;
  long_description: string;
  price: number;
  imageUrl: string;
  productsGroupId: number;
  metadata: string;
};

export type ProductsApiResponse = {
  pagination: {
    last_product_index: number;
    per_page: number;
  };
  items: RawProduct[];
};

export type ProductsResult = {
  products: UiProduct[];
  pagination: {
    lastProductIndex: number;
    perPage: number;
  };
  nextPageIndex: number;
};

export type ProductsFilters = {
  categoryIds?: number[];
  keyword?: string;
};

export type ProductsFetchOptions = {
  lastProductIndex: number;
  itemsPerPage: number;
  filters?: ProductsFilters;
};

export type ProductsState = {
  products: UiProduct[];
  isLoading: boolean;
  isLoadingMore: boolean;
  error: string | null;
  pagination: {
    lastProductIndex: number;
    perPage: number;
    hasMore: boolean;
  };
  filters: ProductsFilters;
  initialized: boolean;
};