import { SSLBadge } from '@/components/SSLBadge';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';
import { MoreHorizontal, Settings, Trash } from 'lucide-react';
import Link from 'next/link';

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
    <Link
      href={`/monitoring/${monitoringItemInfo.id}`}
      key={monitoringItemInfo.id}
      className={`flex w-full items-center justify-between hover:bg-zinc-300/40 ${
        !isLastItemToRender && 'border-b border-zinc-300'
      } px-7 py-4`}
    >
      <div className="flex items-center gap-7">
        <span className="relative flex h-4 w-4 rounded-full bg-green-600">
          <span className="absolute h-full w-full animate-pingSlow rounded-full bg-green-600 opacity-80"></span>
        </span>
        <div>
          <p className="text-md text-left font-semibold">
            {monitoringItemInfo.name}
          </p>
          <p className="mt-1 text-sm font-light">{monitoringItemInfo.url}</p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <SSLBadge daysRemaining={monitoringItemInfo.daysRemaining} />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              size="xs"
              variant="ghost"
              className="outline-none hover:bg-zinc-800/10 focus:outline-none"
            >
              <MoreHorizontal className=" h-5 w-5 " />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>
              <Link
                href={`/monitoring/${monitoringItemInfo.id}`}
                className="flex items-center"
              >
                <Settings className="mr-2 h-4 w-4" />
                <span className="text-xs">Configurações</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={(event) => {
                event.stopPropagation();
                console.log(monitoringItemInfo);
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
