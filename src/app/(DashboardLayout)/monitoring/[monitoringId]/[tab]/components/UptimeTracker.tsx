import { Card } from '@/components/ui/card';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Tracker } from '@tremor/react';
import { Info } from 'lucide-react';

interface UptimeTrackerProps {
  data: any[];
}

// interface Tracker {
//   color: Color;
//   tooltip: any;
// }

// const data: Tracker[] = [
//   { color: 'emerald', tooltip: 'Operational' },
//   { color: 'emerald', tooltip: 'Operational' },
//   { color: 'emerald', tooltip: 'Operational' },
//   { color: 'emerald', tooltip: 'Operational' },
//   { color: 'emerald', tooltip: 'Operational' },
//   { color: 'emerald', tooltip: 'Operational' },
//   { color: 'emerald', tooltip: 'Operational' },
//   { color: 'emerald', tooltip: 'Operational' },
//   { color: 'emerald', tooltip: 'Operational' },
//   { color: 'emerald', tooltip: 'Operational' },
//   { color: 'emerald', tooltip: 'Operational' },
//   { color: 'emerald', tooltip: 'Operational' },
//   { color: 'emerald', tooltip: 'Operational' },
//   { color: 'emerald', tooltip: 'Operational' },
//   { color: 'rose', tooltip: 'Downtime' },
//   { color: 'emerald', tooltip: 'Operational' },
//   { color: 'emerald', tooltip: 'Operational' },
//   { color: 'emerald', tooltip: 'Operational' },
//   { color: 'emerald', tooltip: 'Operational' },
//   { color: 'gray', tooltip: 'Maintenance' },
//   { color: 'emerald', tooltip: 'Operational' },
//   { color: 'emerald', tooltip: 'Operational' },
//   { color: 'emerald', tooltip: 'Operational' },
//   { color: 'yellow', tooltip: 'Degraded' },
//   { color: 'emerald', tooltip: 'Operational' },
//   { color: 'emerald', tooltip: 'Operational' },
//   { color: 'emerald', tooltip: 'Operational' },
//   { color: 'emerald', tooltip: 'Operational' },
//   { color: 'yellow', tooltip: 'Degraded' },
//   { color: 'emerald', tooltip: 'Operational' },
//   { color: 'emerald', tooltip: 'Operational' },
//   { color: 'emerald', tooltip: 'Operational' },
//   { color: 'emerald', tooltip: 'Operational' },
//   { color: 'emerald', tooltip: 'Operational' },
//   { color: 'emerald', tooltip: 'Operational' },
//   { color: 'emerald', tooltip: 'Operational' },
//   { color: 'emerald', tooltip: 'Operational' },
//   { color: 'emerald', tooltip: 'Operational' },
//   { color: 'emerald', tooltip: 'Operational' },
//   { color: 'emerald', tooltip: 'Operational' },
//   { color: 'emerald', tooltip: 'Operational' },
//   { color: 'emerald', tooltip: 'Operational' },
//   { color: 'emerald', tooltip: 'Operational' },
//   { color: 'emerald', tooltip: 'Operational' },
//   {
//     color: 'emerald',
//     tooltip: (
//       <div className="flex w-52 items-center justify-between px-3 py-2">
//         <p>10 Out 2023</p>
//         <p>-</p>
//         <p>100% Uptime</p>
//       </div>
//     ),
//   },
// ];

export function UptimeTracker({ data }: UptimeTrackerProps) {
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
        <Tracker data={data} className="mt-4" />
      )}
    </Card>
  );
}
