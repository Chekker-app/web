import { Info } from 'lucide-react';
import { areaChartArgs } from '../constants';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { AreaChart } from '@tremor/react';
import { Card } from '@/components/ui/card';

export const performance = [
  {
    date: '2023-05-01',
    Performance: 0,
    Resposta: `3.52s`,
  },
  {
    date: '2023-05-02',
    Performance: 10,
    Resposta: `3.52s`,
  },
  {
    date: '2023-05-03',
    Performance: 15,
    Resposta: `3.52s`,
  },
  {
    date: '2023-05-04',
    Performance: 20,
    Resposta: `3.52s`,
  },
  {
    date: '2023-05-05',
    Performance: 28,
    Resposta: `3.52s`,
  },
  {
    date: '2023-05-06',
    Performance: 32,
    Resposta: `3.52s`,
  },
  {
    date: '2023-05-07',
    Performance: 50,
    Resposta: `3.52s`,
  },
  {
    date: '2023-05-08',
    Performance: 70,
    Resposta: `3.52s`,
  },
  {
    date: '2023-05-09',
    Performance: 92,
    Resposta: `3.52s`,
  },
  {
    date: '2023-05-07',
    Performance: 50,
    Resposta: `3.52s`,
  },
];

interface PerformanceChartProps {
  data: any[];
}

export function PerformanceChart({ data = [] }: PerformanceChartProps) {
  return (
    <Card className="border-b-border p-4 shadow-sm">
      <h1 className="flex items-center gap-2">
        Gráfico de performance
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <Info className="h-4 w-4 cursor-pointer" />
            </TooltipTrigger>
            <TooltipContent className="shadow-md">
              <p className="max-w-xs">
                O Gráfico de performance mostra o tempo médio de carregamento do
                seu site no dia e o score de performance gerado pelo Google de
                acordo com o desempenho.
              </p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </h1>
      {performance.length === 0 ? (
        <p className="mt-5 text-center text-sm font-light text-gray-300">
          Nenhuma informação de Performance encontrada...
        </p>
      ) : (
        <AreaChart
          {...areaChartArgs}
          className="mt-10 h-52"
          data={performance}
          categories={['Performance']}
          noDataText="Nenhuma informação de Performance encontrada"
        />
      )}
    </Card>
  );
}
