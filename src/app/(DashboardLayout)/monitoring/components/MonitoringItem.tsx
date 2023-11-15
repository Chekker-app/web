import { SSLBadge } from '@/components/SSLBadge';
import { StatusIndicator } from '@/components/StatusIndicator';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';
import { MoreHorizontal, Settings, Trash } from 'lucide-react';
import Link from 'next/link';
import { IMonitoring } from '../types';

interface MonitoringItemProps {
  monitoringItemInfo: IMonitoring;
  isLastItemToRender: boolean;
  onDeleteMonitoring: (monitoringId: string) => void;
}

export function MonitoringItem({
  monitoringItemInfo,
  isLastItemToRender,
  onDeleteMonitoring,
}: MonitoringItemProps) {
  return (
    <Link
      href={`/monitoring/${monitoringItemInfo.id}/overview`}
      key={monitoringItemInfo.id}
      className={`flex w-full items-center justify-between hover:bg-muted ${
        !isLastItemToRender && 'border-b border-border'
      } px-7 py-4`}
    >
      <div className="flex items-center gap-7">
        <StatusIndicator status={monitoringItemInfo?.status ?? null} />
        <div>
          <p className="text-md text-left font-semibold">
            {monitoringItemInfo.name}
          </p>
          <p className="mt-1 text-sm font-light">{monitoringItemInfo.url}</p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <SSLBadge daysRemaining={monitoringItemInfo.sslDaysRemaining} />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              size="xs"
              variant="ghost"
              className="outline-none hover:bg-gray-700 focus:outline-none"
            >
              <MoreHorizontal className=" h-5 w-5 " />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>
              <Link
                href={`/monitoring/${monitoringItemInfo.id}/overview`}
                className="flex items-center"
              >
                <Settings className="mr-2 h-4 w-4" />
                <span className="text-xs">Configurações</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={(event) => {
                event.stopPropagation();
                onDeleteMonitoring(monitoringItemInfo.id);
              }}
              className="text-red-500"
            >
              <Trash className="mr-2 h-4 w-4" />
              <span className="text-xs">Excluir</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </Link>
  );
}
