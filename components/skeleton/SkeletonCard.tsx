import { Skeleton } from './Skeleton';
import { cn } from '@/lib/utils/cn';

interface SkeletonCardProps {
  header?: boolean;
  contentLines?: number;
  className?: string;
}

export function SkeletonCard({ header = true, contentLines = 3, className }: SkeletonCardProps) {
  return (
    <div className={cn('border border-slate-200 dark:border-slate-700 rounded-lg p-4', className)} role="status" aria-label="Loading...">
      {header && (
        <div className="flex items-center justify-between mb-4">
          <Skeleton className="h-5 w-32" variant="title" />
          <Skeleton className="h-8 w-24" variant="pill" />
        </div>
      )}
      <div className="space-y-3">
        {Array.from({ length: contentLines }).map((_, i) => (
          <Skeleton key={i} className="w-full" variant="text" />
        ))}
      </div>
    </div>
  );
}
