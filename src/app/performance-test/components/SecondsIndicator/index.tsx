import { ILoadingExperienceMetricsDistributions } from '@/app/api/performance-test/types';
import { Separator } from '@/components/ui/separator';

interface SecondsIndicatorProps {
  distributions: ILoadingExperienceMetricsDistributions;
}

export function SecondsIndicator({ distributions }: SecondsIndicatorProps) {
  return (
    <div className="space-y-3 pt-2">
      <Separator />
      <p className="text-xs">
        <span className="text-green-700">{distributions.good.title}</span>
        <span className="ml-1 text-gray-300">
          (≤ {distributions.good.value} s)
        </span>
      </p>
      <p className="text-xs">
        <span className="text-orange-400">
          {distributions.needImprove.title}
        </span>
        <span className="ml-1 text-gray-300">
          ({distributions.needImprove.min} s - {distributions.needImprove.max}{' '}
          s)
        </span>
      </p>
      <p className="text-xs">
        <span className="text-red-600">{distributions.bad.title}</span>
        <span className="ml-1 text-gray-300">
          (≥ {distributions.bad.value} s)
        </span>
      </p>
    </div>
  );
}
