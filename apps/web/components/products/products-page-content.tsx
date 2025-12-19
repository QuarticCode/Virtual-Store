'use client';

import { useProducts } from '@/hooks/use-products';
import { useInfiniteScroll } from '@/hooks/use-infinite-scroll';
import { useTranslations } from 'next-intl';
import { ViewToggle } from './view-toggle';
import { ProductGrid } from './product-grid';

interface ProductsInfiniteScrollProps {
  initialData?: any;
}

export default function ProductsInfiniteScroll({ 
  initialData 
}: Readonly<ProductsInfiniteScrollProps>) {
  const { 
    products, 
    isLoading, 
    isLoadingMore, 
    error, 
    hasMore, 
    loadMore,
    viewMode
  } = useProducts(initialData);

  const t = useTranslations("InfiniteScroll");

  const { loaderRef } = useInfiniteScroll({
    onLoadMore: loadMore,
    enabled: hasMore && !isLoading && !isLoadingMore,
    loading: isLoadingMore,
  });

  return (
    <div className="w-full space-y-8">
      <div className="flex items-center justify-between py-4">
        <ViewToggle />
        <p className="text-sm text-muted-foreground">
          {isLoading ? t("loading") : t("totalProducts", { total: products.length })}
        </p>
      </div>

      <ProductGrid
        products={products}
        viewMode={viewMode}
        isLoading={isLoading}
        isLoadingMore={isLoadingMore}
      />

      {hasMore && !isLoadingMore && (
        <div
          ref={loaderRef}
          className="h-20 w-full flex items-center justify-center mt-8"
        >
          <div className="text-sm text-muted-foreground animate-pulse">
            {t("loading")}
          </div>
        </div>
      )}

      {!hasMore && products.length > 0 && (
        <div className="text-center py-12 text-muted-foreground border-t">
          <p className="text-lg font-medium">{t('noMore')}</p>
          <p className="text-sm mt-1">{t('total', {total: products.length})}</p>
        </div>
      )}

      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-4">
          <div className="text-red-700 font-medium">{t('error')}</div>
          <div className="text-red-600 text-sm mt-1">{error}</div>
          <button
            onClick={() => window.location.reload()}
            className="mt-3 text-sm text-red-700 hover:text-red-900 underline"
          >
            {t('retry')}
          </button>
        </div>
      )}
    </div>
  );
}