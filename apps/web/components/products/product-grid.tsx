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
      <div className={`${gridClasses} transition-all duration-1000 ease-out`}>
        {Array.from({ length: 8 }).map((_, i) => (
          <ProductCardSkeleton key={i} viewMode={viewMode} />
        ))}
      </div>
    );
  }

  return (
    <div 
      className={`
        ${gridClasses}
        transition-all duration-700 ease-out-expo
        will-change-auto
      `}
      key={viewMode}
    >
      {products.map((product, index) => (
        <div
          key={product.id}
          className={`
            transition-all duration-500 ease-out
            transform-gpu
            ${viewMode === 'grid' 
              ? 'animate-in fade-in zoom-in-95' 
              : 'animate-in slide-in-from-bottom-4'
            }
            ${index < 4 ? `delay-${index * 75}` : 'delay-300'}
          `}
        >
          <ProductCard 
            product={product} 
            viewMode={viewMode}
          />
        </div>
      ))}
      
      {isLoadingMore && 
        Array.from({ length: 4 }).map((_, i) => (
          <div
            key={`skeleton-${i}`}
            className={`
              animate-in fade-in duration-500
            `}
          >
            <ProductCardSkeleton viewMode={viewMode} />
          </div>
        ))
      }
    </div>
  );
}