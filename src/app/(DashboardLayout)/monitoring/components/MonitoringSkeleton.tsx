import { Skeleton } from '@/components/ui/skeleton';

export function MonitoringSkeleton() {
  return (
    <div className="space-y-2 px-7 py-4">
      <Skeleton className="h-4 " />
      <Skeleton className="h-4" />
    </div>
  );
}
