import { Skeleton } from './Skeleton';
import { SkeletonCard } from './SkeletonCard';
import { SkeletonButton } from './SkeletonButton';

export function PageSkeleton() {
  return (
    <div className="py-6 sm:py-8">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Header with Quick Actions Bar */}
        <div className="mb-4 sm:mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <Skeleton className="h-8 sm:h-10 w-64 sm:w-80 mb-2" variant="title" />
              <Skeleton className="h-4 sm:h-5 w-48 sm:w-56" variant="text-sm" />
            </div>
            <div className="flex flex-wrap gap-2">
              <SkeletonButton size="sm" />
              <SkeletonButton size="sm" />
              <SkeletonButton size="sm" />
              <SkeletonButton size="sm" />
              <SkeletonButton size="sm" />
            </div>
          </div>
        </div>

        {/* Preview Section */}
        <div className="mb-6">
          <div className="border-2 border-slate-200 dark:border-slate-700 rounded-lg shadow-lg p-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Skeleton className="h-6 w-24" variant="pill" />
                <div className="flex gap-1">
                  <Skeleton className="h-8 w-8" variant="rounded" />
                  <Skeleton className="h-8 w-8" variant="rounded" />
                </div>
              </div>
              <div className="flex gap-2">
                <Skeleton className="h-8 w-28" variant="pill" />
              </div>
            </div>
            <div className="space-y-4">
              <div className="relative bg-slate-50 dark:bg-slate-900/50 rounded-lg p-4">
                <Skeleton className="w-full h-24 sm:h-32" variant="rounded" />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Skeleton className="h-5 w-10" variant="pill" />
                  <Skeleton className="h-4 w-24" variant="text-sm" />
                </div>
                <Skeleton className="h-4 w-16" variant="text-sm" />
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Panel - Lines Editor */}
          <div className="space-y-6">
            <div className="border-2 border-indigo-200 dark:border-indigo-800 rounded-lg p-4">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
                <div className="flex items-center gap-2">
                  <Skeleton className="h-5 w-5" variant="circle" />
                  <Skeleton className="h-5 w-32" variant="title" />
                </div>
                <div className="flex flex-wrap gap-2">
                  <SkeletonButton size="sm" />
                  <SkeletonButton size="sm" />
                  <SkeletonButton size="sm" />
                </div>
              </div>
              <div className="space-y-3">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="flex gap-2 items-start">
                    <Skeleton className="flex-1 h-10" />
                    <Skeleton className="h-10 w-10" variant="rounded" />
                  </div>
                ))}
              </div>
            </div>

            {/* My Presets Panel */}
            <SkeletonCard header={true} contentLines={3} />

            {/* Templates Panel */}
            <SkeletonCard header={true} contentLines={3} />
          </div>

          {/* Right Panel - Options */}
          <div className="space-y-6">
            {/* Options Panel with Tabs */}
            <div className="border border-slate-200 dark:border-slate-700 rounded-lg p-4">
              <div className="mb-4">
                <Skeleton className="h-5 w-48 mb-2" variant="title" />
              </div>
              {/* Tab Navigation */}
              <div className="flex flex-wrap gap-1 mb-6 border-b border-slate-200 dark:border-slate-700 pb-2">
                {Array.from({ length: 4 }).map((_, i) => (
                  <Skeleton key={i} className="h-9 w-20" variant="pill" />
                ))}
              </div>
              {/* Tab Content */}
              <div className="space-y-4">
                <Skeleton className="h-4 w-24" variant="text-sm" />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-20" variant="text-sm" />
                    <Skeleton className="h-10 w-full" />
                  </div>
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-20" variant="text-sm" />
                    <Skeleton className="h-10 w-full" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Skeleton className="h-4 w-28" variant="text-sm" />
                  <Skeleton className="h-10 w-full" />
                </div>
              </div>
            </div>

            {/* Embed Code Section */}
            <SkeletonCard header={true} contentLines={4} />
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-16 sm:mt-20">
          <div className="text-center mb-8 sm:mb-10">
            <Skeleton className="h-6 sm:h-7 w-32 mx-auto mb-2" variant="title" />
            <Skeleton className="h-4 sm:h-5 w-56 mx-auto" variant="text-sm" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {Array.from({ length: 9 }).map((_, i) => (
              <div key={i} className="border border-slate-200 dark:border-slate-700 rounded-lg p-4 sm:p-6">
                <div className="flex items-start gap-3 sm:gap-4">
                  <Skeleton className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12" variant="rounded" />
                  <div className="flex-1 space-y-2">
                    <Skeleton className="h-4 sm:h-5 w-32" variant="text" />
                    <Skeleton className="h-3 sm:h-4 w-full" variant="text-sm" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="my-16 sm:my-20">
          <div className="text-center mb-8 sm:mb-10">
            <Skeleton className="h-6 sm:h-7 w-48 mx-auto mb-2" variant="title" />
            <Skeleton className="h-4 sm:h-5 w-64 mx-auto" variant="text-sm" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="border border-slate-200 dark:border-slate-700 rounded-lg p-0">
                <div className="w-full text-left p-4 sm:p-5 flex items-center justify-between">
                  <Skeleton className="h-4 sm:h-5 w-full pr-4" variant="text" />
                  <Skeleton className="h-5 w-5 flex-shrink-0" variant="circle" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
