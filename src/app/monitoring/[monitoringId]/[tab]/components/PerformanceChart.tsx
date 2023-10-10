import { Card } from '@tremor/react';
import { Info } from 'lucide-react';
import { areaChartArgs } from '../constants';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { AreaChart } from '@tremor/react';

// export const performance: DailyPerformance[] = [
//   {
//     date: '2023-05-01',
//     Porcentagem: 0,
//   },
//   {
//     date: '2023-05-02',
//     Porcentagem: 10,
//   },
//   {
//     date: '2023-05-03',
//     Porcentagem: 15,
//   },
//   {
//     date: '2023-05-04',
//     Porcentagem: 20,
//   },
//   {
//     date: '2023-05-05',
//     Porcentagem: 28,
//   },
//   {
//     date: '2023-05-06',
//     Porcentagem: 32,
//   },
//   {
//     date: '2023-05-07',
//     Porcentagem: 50,
//   },
//   {
//     date: '2023-05-08',
//     Porcentagem: 70,
//   },
//   {
//     date: '2023-05-09',
//     Porcentagem: 92,
//   },
//   {
//     date: '2023-05-07',
//     Porcentagem: 50,
//   },
// ];

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
      {data.length === 0 ? (
        <p className="mt-5 text-center text-sm font-light text-gray-300">
          Nenhuma informação de Performance encontrada...
        </p>
      ) : (
        <AreaChart
          {...areaChartArgs}
          className="mt-10 h-52"
          data={data}
          categories={['Porcentagem']}
          noDataText="Nenhuma informação de Performance encontrada"
          valueFormatter={(number: number) => `${number}%`}
        />
      )}
    </Card>
  );
}
