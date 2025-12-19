import { useEffect, useRef } from 'react';

type UseInfiniteScrollOptions = {
  onLoadMore: () => void;
  enabled?: boolean;
  threshold?: number;
  rootMargin?: string;
  loading?: boolean;
};

export function useInfiniteScroll({
  onLoadMore,
  enabled = true,
  threshold = 0.5,
  rootMargin = '200px',
  loading = false,
}: UseInfiniteScrollOptions) {
  const loaderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!enabled || !loaderRef.current || loading) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          onLoadMore();
        }
      },
      {
        root: null,
        rootMargin,
        threshold,
      }
    );

    observer.observe(loaderRef.current);

    return () => {
      if (loaderRef.current) {
        observer.unobserve(loaderRef.current);
      }
    };
  }, [enabled, loading, onLoadMore, rootMargin, threshold]);

  return { loaderRef };
}