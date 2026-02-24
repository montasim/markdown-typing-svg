import { cn } from '@/lib/utils/cn';

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'text' | 'text-sm' | 'text-lg' | 'title' | 'avatar' | 'circle' | 'rounded' | 'pill';
}

export function Skeleton({ className, variant = 'default', ...props }: SkeletonProps) {
  return (
    <div
      className={cn(
        'skeleton',
        {
          'skeleton-text': variant === 'text',
          'skeleton-text-sm': variant === 'text-sm',
          'skeleton-text-lg': variant === 'text-lg',
          'skeleton-title': variant === 'title',
          'skeleton-avatar': variant === 'avatar',
          'skeleton-circle': variant === 'circle',
          'skeleton-rounded': variant === 'rounded',
          'skeleton-pill': variant === 'pill',
        },
        className
      )}
      role="status"
      aria-label="Loading..."
      {...props}
    />
  );
}
