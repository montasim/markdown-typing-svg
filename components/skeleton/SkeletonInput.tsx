import { Skeleton } from './Skeleton';
import { cn } from '@/lib/utils/cn';

interface SkeletonInputProps {
  className?: string;
}

export function SkeletonInput({ className }: SkeletonInputProps) {
  return <Skeleton className={cn('h-10 w-full', className)} />;
}
