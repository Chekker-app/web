import React from 'react';
import { cn } from '@/lib/utils';
import { getStatusColorByScore } from '@/utils/getColor';

interface CircularProgressProps {
  percentage: number;
  className?: string;
  text?: string | number;
}

export function CircularProgress({
  percentage,
  className,
  text = '',
}: CircularProgressProps) {
  const radius = 50;
  const circumference = 2 * Math.PI * radius;
  const offset = (1 - percentage / 100) * circumference;

  const scoreColors = getStatusColorByScore(percentage);

  return (
    <div className={cn('relative h-24 w-24', className)}>
      <svg
        className={`absolute -rotate-90 rounded-full ${scoreColors[50]}`}
        width="100%"
        height="100%"
        viewBox="0 0 100 100"
      >
        <circle
          cx="50"
          cy="50"
          r={radius}
          fill="transparent"
          stroke={scoreColors.border}
          strokeWidth="12"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        {text && (
          <span
            className={`text-3xl font-medium tracking-wide ${scoreColors[500]}`}
          >
            {text}
          </span>
        )}
      </div>
    </div>
  );
}
