import { Skeleton } from '@/components/ui/skeleton';

export function MonitoringDetailsSkeleton() {
  return (
    <>
      <div className="space-y-4">
        <Skeleton className="h-[100px] w-full rounded-lg" />
        <Skeleton className="h-[200px] w-full rounded-lg" />
        <Skeleton className="h-[200px] w-full rounded-lg" />
      </div>
      <div>
        <Skeleton className="h-[260px] w-full rounded-lg" />
      </div>
    </>
  );
}
