import { SSLBadge } from '@/components/SSLBadge';

interface MonitoringItemProps {
  monitoringItemInfo: {
    id: string;
    name: string;
    url: string;
    daysRemaining: number;
  };
  isLastItemToRender: boolean;
}

export function MonitoringItem({
  monitoringItemInfo,
  isLastItemToRender,
}: MonitoringItemProps) {
  return (
    <div
      key={monitoringItemInfo.id}
      className={`flex items-center justify-between ${
        !isLastItemToRender && 'border-b border-zinc-300'
      } px-7 py-4`}
    >
      <div className="flex items-center gap-7">
        <span className="relative flex h-4 w-4 rounded-full bg-green-600">
          <span className="animate-pingSlow absolute h-full w-full rounded-full bg-green-600 opacity-80"></span>
        </span>
        <div>
          <p className="text-md font-semibold">{monitoringItemInfo.name}</p>
          <p className="mt-1 text-sm font-light">{monitoringItemInfo.url}</p>
        </div>
      </div>
      <SSLBadge daysRemaining={monitoringItemInfo.daysRemaining} />
    </div>
  );
}
