import { Product, ProductCard } from './product-card';
import { ProductCardSkeleton } from './product-card-skeleton';

interface ProductGridProps {
  products: Product[];
  viewMode: 'grid' | 'list';
  isLoading: boolean;
  isLoadingMore: boolean;
}

export function ProductGrid({
  products,
  viewMode,
  isLoading,
  isLoadingMore,
}: Readonly<ProductGridProps>) {
  const gridClasses = viewMode === 'grid'
    ? 'grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 md:gap-5 lg:gap-6'
    : 'grid grid-cols-1 gap-4';

  if (isLoading && products.length === 0) {
    return (
      <div className={gridClasses}>
        {Array.from({ length: 8 }).map((_, i) => (
          <ProductCardSkeleton key={i} viewMode={viewMode} />
        ))}
      </div>
    );
  }

  return (
    <div className={gridClasses}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} viewMode={viewMode} />
      ))}
      
      {isLoadingMore && 
        Array.from({ length: 4 }).map((_, i) => (
          <ProductCardSkeleton key={`skeleton-${i}`} viewMode={viewMode} />
        ))
      }
    </div>
  );
}