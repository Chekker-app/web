import { Card } from '@/components/ui/card';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Tracker } from '@tremor/react';
import { Info } from 'lucide-react';
import { IUptimeTrackerInfo } from '../../../types';
import { getQuantityOfDaysInMonth } from '@/utils/date';

interface UptimeTrackerProps {
  data: IUptimeTrackerInfo[];
}

export function UptimeTracker({ data }: UptimeTrackerProps) {
  function formatUpTimeData(data: IUptimeTrackerInfo[]) {
    const amountDaysInMonth = getQuantityOfDaysInMonth();
    const remainingDays = amountDaysInMonth - data.length;

    const validUpTimeTracker = data.map((item) => {
      const info = {
        color: item.color,
        tooltip: (
          <div className="flex w-52 items-center justify-between px-3 py-2">
            <p>{item.day}</p>
            <p>-</p>
            <p>{item.uptime} Uptime</p>
          </div>
        ),
      };
      return info as any;
    });

    const notCollectedTracker =
      remainingDays <= 0
        ? []
        : Array.from({ length: remainingDays }).map(() => ({
            color: 'gray',
            tooltip: 'Não obtido',
          }));

    return [...validUpTimeTracker, ...notCollectedTracker];
  }

  return (
    <Card className="border-b-border p-4 shadow-sm">
      <h1 className="flex items-center gap-2">
        Relatório de Uptime
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <Info className="h-4 w-4 cursor-pointer" />
            </TooltipTrigger>
            <TooltipContent className="shadow-md">
              <p className="max-w-xs">
                O Relatório de Uptime mostra a porcentagem que seu site ficou
                online no dia. Passe o mouse sobre cada elemento para mais
                informações.
              </p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </h1>
      {data.length === 0 ? (
        <p className="mt-5 text-center text-sm font-light text-gray-300">
          Nenhuma informação de Uptime encontrada...
        </p>
      ) : (
        <Tracker data={formatUpTimeData(data)} className="mt-4" />
      )}
    </Card>
  );
}
