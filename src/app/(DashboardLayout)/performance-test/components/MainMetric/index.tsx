import { getStatusColorByScore } from '@/utils/getColor';
import Link from 'next/link';

export interface MainMetricProps {
  title: string;
  details: string;
  url: string;
  score: number;
  time: string;
  isOpenDetails?: boolean;
}

export function MainMetric({
  title,
  details,
  url,
  score,
  time,
  isOpenDetails = false,
}: MainMetricProps) {
  const scoreTextColor = getStatusColorByScore(score);
  return (
    <div className="space-y-1">
      <div className="flex items-center gap-3">
        <span className={`h-3 w-3 rounded-full ${scoreTextColor.background}`} />
        <p className="font-light text-gray-400">{title}</p>
      </div>
      <div className="pl-5">
        <p className={`text-4xl tracking-tighter ${scoreTextColor[500]}`}>
          {time}
        </p>
        {isOpenDetails && (
          <span className="mt-1 block max-w-sm pl-2 text-sm font-light leading-relaxed">
            {details}.{' '}
            <Link
              className="cursor-pointer text-blue-600 hover:underline"
              target="_blank"
              rel="noreferrer noopener"
              href={url}
            >
              Saiba mais
            </Link>
          </span>
        )}
      </div>
    </div>
  );
}
