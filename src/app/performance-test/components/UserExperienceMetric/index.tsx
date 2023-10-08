import { ILoadingExperienceMetrics } from '@/app/api/performance-test/types';
import { SecondsIndicator } from '../SecondsIndicator';
import { useMemo } from 'react';

interface UserExperienceMetricProps {
  experienceMetric: ILoadingExperienceMetrics;
  isShowingDetails?: boolean;
}

export function UserExperienceMetric({
  experienceMetric,
  isShowingDetails = false,
}: UserExperienceMetricProps) {
  const performanceTextColor = useMemo(() => {
    if (
      Number(experienceMetric.time) <=
      Number(experienceMetric.distributions.good.value)
    ) {
      return 'text-green-700';
    }

    if (
      Number(experienceMetric.time) >=
      Number(experienceMetric.distributions.bad.value)
    ) {
      return 'text-green-700';
    }

    return 'text-orange-400';
  }, [experienceMetric]);

  return (
    <div>
      <span className="flex items-center gap-2">
        <div className={`h-3 w-3 rounded-full ${performanceTextColor}`} />
        <a
          target="_blank"
          rel="noreferrer noopener"
          className="text-md cursor-pointer hover:underline"
          href={experienceMetric.link}
        >
          {experienceMetric.name}
        </a>
      </span>
      <div className="mt-2 space-y-1.5 pl-5">
        <p className="text-sm font-light">
          Tempo:{' '}
          <span className={`font-medium ${performanceTextColor}`}>
            {experienceMetric.time} s
          </span>
        </p>
        <p className="text-sm font-light">
          Classificação:{' '}
          <span className={`font-medium ${performanceTextColor}`}>
            {experienceMetric.category}
          </span>
        </p>

        {isShowingDetails && (
          <SecondsIndicator distributions={experienceMetric.distributions} />
        )}
      </div>
    </div>
  );
}
