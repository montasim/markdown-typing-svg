import { Skeleton } from './Skeleton';

interface SVGSkeletonProps {
  className?: string;
}

export function SVGSkeleton({ className }: SVGSkeletonProps) {
  return (
    <div className={className}>
      <div className="relative bg-slate-50 dark:bg-slate-900/50 rounded-lg p-4">
        {/* SVG placeholder skeleton */}
        <div className="w-full h-24 sm:h-32 flex items-center justify-center">
          <Skeleton className="w-3/4 h-16 sm:h-20" variant="rounded" />
        </div>
      </div>
      {/* Controls skeleton */}
      <div className="flex items-center justify-between mt-4">
        <div className="flex items-center space-x-2">
          <Skeleton className="h-5 w-10" variant="pill" />
          <Skeleton className="h-4 w-24" variant="text-sm" />
        </div>
        <Skeleton className="h-4 w-16" variant="text-sm" />
      </div>
    </div>
  );
}
