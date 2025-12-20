import { buildUrl, getAuthHeaders } from '@/lib/api/client/config';
import type { 
  ProductsResult, 
  RawProduct, 
  ProductsApiResponse, 
  ProductsFetchOptions, 
} from './types';

export async function fetchProductsServer(opts: ProductsFetchOptions): Promise<ProductsResult> {
  const { lastProductIndex, itemsPerPage, filters } = opts;
  
  const params: Record<string, string | number> = {
    lastProductIndex,
    itemsPerPage,
  };

  const arrayParams: Record<string, number[]> = {};

  if (filters?.keyword) {
    params.keyword = filters.keyword;
  }

  if (filters?.categoryIds?.length) {
    arrayParams.categoryIds = filters.categoryIds;
  }

  const url = buildUrl('/Products', params, arrayParams);
  
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 30000);

  try {
    const res = await fetch(url, {
      headers: getAuthHeaders(),
      cache: 'no-store',
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!res.ok) {
      throw new Error(`HTTP ${res.status}: ${res.statusText}`);
    }

    const data: ProductsApiResponse = await res.json();

    return {
      products: data.items.map((item: RawProduct) => ({
        id: String(item.id),
        name: item.name,
        description: item.description,
        price: item.price,
        imageUrl: item.imageUrl,
      })),
      pagination: {
        lastProductIndex: data.pagination.last_product_index,
        perPage: data.pagination.per_page,
      },
      nextPageIndex: data.pagination.last_product_index,
    };
  } catch (error) {
    clearTimeout(timeoutId);
    throw error;
  }
}

export async function fetchProductsClient(opts: ProductsFetchOptions): Promise<ProductsResult> {
  const params = new URLSearchParams();
  params.append('lastProductIndex', opts.lastProductIndex.toString());
  params.append('itemsPerPage', opts.itemsPerPage.toString());
  
  if (opts.filters?.keyword) {
    params.append('keyword', opts.filters.keyword);
  }
  
  if (opts.filters?.categoryIds) {
    opts.filters.categoryIds.forEach(id => {
      params.append('categoryIds', id.toString());
    });
  }

  const res = await fetch(`/api/products?${params.toString()}`);
  
  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`API Error ${res.status}: ${errorText}`);
  }

  return res.json();
}

export const fetchProducts = typeof window === 'undefined' 
  ? fetchProductsServer
  : fetchProductsClient;