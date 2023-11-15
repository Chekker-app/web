'use client';
import { Button } from '@/components/ui/button';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { MainMetric } from '../MainMetric';
import { useState } from 'react';
import { ICoreMetrics } from '@/app/api/performance-test/types';

interface MetricsProps {
  coreMetrics: ICoreMetrics[];
}

export function Metrics({ coreMetrics }: MetricsProps) {
  const [isShowingMetricsDetails, setIsShowinMetricsDetails] = useState(false);
  return (
    <div>
      <div className="flex items-center justify-between">
        <p className="tracking-wide">Métricas</p>
        <Button
          variant="ghost"
          size="sm"
          className="text-gray-300"
          onClick={() => setIsShowinMetricsDetails(!isShowingMetricsDetails)}
        >
          {!isShowingMetricsDetails ? (
            <>
              Exibir detalhes
              <ChevronDown className="ml-1 h-4 w-4" />
            </>
          ) : (
            <>
              Esconder detalhes
              <ChevronUp className="ml-1 h-4 w-4" />
            </>
          )}
        </Button>
      </div>
      <div className="mt-6 grid grid-cols-2 gap-y-8">
        {coreMetrics?.map((metric) => (
          <MainMetric
            key={metric.title}
            title={metric.title}
            time={metric.displayValue}
            url={metric.link}
            details={metric.details}
            score={metric.score}
            isOpenDetails={isShowingMetricsDetails}
          />
        ))}
      </div>
    </div>
  );
}
