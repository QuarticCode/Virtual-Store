import { cn } from '@/lib/utils';

interface ProductCardSkeletonProps {
  viewMode: 'grid' | 'list';
  className?: string;
}

export function ProductCardSkeleton({ 
  viewMode, 
  className 
}: Readonly<ProductCardSkeletonProps>) {
  return (
    <div className={cn(
      'group relative overflow-hidden border-transparent',
      'w-full shadow-transparent bg-product-card-hover animate-pulse',
      viewMode === 'grid'
        ? 'flex flex-col max-w-[280px] mx-auto h-full rounded-lg'
        : 'flex flex-row items-stretch min-h-[100px] sm:min-h-[120px] md:min-h-[140px] rounded-lg',
      className
    )}>
      <div className={cn(
        'relative shrink-0 bg-gray-200 rounded-xl',
        viewMode === 'grid'
          ? 'aspect-square w-full'
          : 'h-full aspect-square w-[100px] sm:w-[120px] md:w-[140px] lg:w-[160px]'
      )} />
      
      <div className={cn(
        'flex flex-col h-full w-full min-w-0 p-0 relative',
        viewMode === 'grid'
          ? 'py-3 space-y-3 flex-1 px-3'
          : 'py-2 px-2 pb-2 sm:px-3 md:px-4 lg:px-5 grow min-h-[100px] sm:min-h-[120px] md:min-h-[140px] lg:min-h-[160px]'
      )}>
        <div className={cn(
          'bg-gray-300 rounded',
          viewMode === 'grid'
            ? 'h-6 w-3/4 mt-2 mb-1'
            : 'h-5 w-1/2 mb-1 sm:mb-2 md:mb-3'
        )} />
        
        {viewMode === 'list' && (
          <div className="grow space-y-2 mb-0 sm:mb-3 md:mb-4">
            <div className="h-3 bg-gray-300 rounded w-full" />
            <div className="h-3 bg-gray-300 rounded w-2/3" />
          </div>
        )}
        
        <div className={cn(
          'mt-auto',
          viewMode === 'list' && 'w-full'
        )}>
          {viewMode === 'grid' ? (
            <div className="h-7 bg-gray-300 rounded w-1/4" />
          ) : (
            <div className="flex items-center justify-between w-full">
              <div className="h-7 bg-gray-300 rounded w-1/5" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}