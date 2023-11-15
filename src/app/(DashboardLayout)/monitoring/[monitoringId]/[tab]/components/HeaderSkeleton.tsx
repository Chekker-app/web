import { Skeleton } from '@/components/ui/skeleton';

export function HeaderSkeleton() {
  return (
    <div className="flex w-full items-center gap-4">
      <Skeleton className="h-6 w-6 rounded-full" />
      <div className="space-y-3">
        <Skeleton className="h-5 w-[150px]" />
        <Skeleton className="h-5 w-[300px]" />
      </div>
    </div>
  );
}
