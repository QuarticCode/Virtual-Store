import { Skeleton } from "../ui/skeleton";

export function CategorySkeleton() {
  return (
    <div className="grow min-h-0 overflow-hidden mb-3 space-y-2">
      <Skeleton className="h-3 sm:h-4 w-full" />
      <Skeleton className="h-3 sm:h-4 w-5/6" />
    </div>
  );
}
