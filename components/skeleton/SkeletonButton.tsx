import { Skeleton } from './Skeleton';
import { cn } from '@/lib/utils/cn';

interface SkeletonButtonProps {
  size?: 'sm' | 'default' | 'lg';
  className?: string;
}

export function SkeletonButton({ size = 'default', className }: SkeletonButtonProps) {
  const sizeClasses = {
    sm: 'h-8 px-3 text-sm',
    default: 'h-10 px-4',
    lg: 'h-12 px-6 text-lg',
  };

  return (
    <Skeleton className={cn('inline-flex items-center justify-center', sizeClasses[size], className)} />
  );
}
