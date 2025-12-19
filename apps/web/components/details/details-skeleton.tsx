import { Skeleton } from "../ui/skeleton";

export function DetailsSkeleton() {
  return (
    <div className="container mx-auto px-4 py-8 flex flex-col gap-8 m-32">
      <div className="flex flex-row items-center gap-2 justify-center">
        <Skeleton className="h-4 w-md" />
      </div>
      <div className="flex lg:flex-row lg:h-lg flex-col gap-8 justify-between items-center">
        <Skeleton className="w-72 h-72" />
        <div className="flex flex-col justify-evenly lg:w-md w-full lg:gap-4 gap-8 p-4 rounded-2xl">
          <div className="flex flex-col gap-4">
            <Skeleton className="h-4" />
            <Skeleton className="h-4" />
            <Skeleton className="h-4" />
          </div>
          <div className="flex flex-row md:flex-nowrap flex-wrap gap-4 items-center max-h-8">
            <Skeleton className="h-4" />
            <Skeleton className="h-4" />
          </div>
        </div>
      </div>
    </div>
  );
}
