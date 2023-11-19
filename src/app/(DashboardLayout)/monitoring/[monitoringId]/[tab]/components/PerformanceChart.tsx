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

interface PerformanceChartProps {
  data: any[];
}

export function PerformanceChart({ data = [] }: PerformanceChartProps) {
  const customTooltip = ({ payload, active }: any) => {
    if (!active || !payload) return null;
    return (
      <div className="w-64 rounded-tremor-default bg-tremor-background p-2 text-tremor-default shadow-tremor-dropdown">
        {payload.map((category: any) => (
          <div key={category.payload.date} className="flex flex-1 px-1">
            <div className="space-y-1">
              <p className="text-tremor-content">Performance</p>
              <p className="font-medium text-tremor-content-emphasis">
                Tempo médio de resposta:{' '}
                <span className="font-normal">{category.value}s</span>
              </p>
            </div>
          </div>
        ))}
      </div>
    );
  };

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
          categories={['response']}
          noDataText="Nenhuma informação de Performance encontrada"
          customTooltip={customTooltip}
        />
      )}
    </Card>
  );
}
