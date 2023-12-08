import { CircularProgress } from '@/components/CircularProgress';
import { Separator } from '@/components/ui/separator';
import Image from 'next/image';

interface PerformanceMainInfoProps {
  score: number;
  siteScreenshot: string;
}

export function PerformanceMainInfo({
  score,
  siteScreenshot,
}: PerformanceMainInfoProps) {
  return (
    <div className="flex items-center justify-between space-x-10">
      <div className="flex w-[40%] flex-col items-center justify-center">
        <div>
          <CircularProgress
            percentage={score}
            className="h-24 w-24"
            text={score}
          />
        </div>
        <div className="mt-4">
          <h3 className="text-center text-xl">Performance</h3>
          <p className="mt-3 text-center text-xs leading-relaxed text-gray-300">
            Esses valores são estimados e podem variar. O{' '}
            <a
              href="https://developer.chrome.com/docs/lighthouse/performance/performance-scoring/"
              target="_blank"
              rel="noreferrer noopener"
              className="cursor-pointer text-blue-600 hover:text-blue-700 hover:underline"
            >
              Score de performance
            </a>{' '}
            é calculado a partir dessas metricas.{' '}
            <a
              href="https://googlechrome.github.io/lighthouse/scorecalc/#FCP=1775&LCP=6129&TBT=524&CLS=0&SI=3999&TTI=6205&FMP=2689&device=desktop&version=11.0.0"
              target="_blank"
              rel="noreferrer noopener"
              className="cursor-pointer text-blue-600 hover:text-blue-700 hover:underline"
            >
              Vejá o cálculo.
            </a>
          </p>
          <p className="mt-5 flex items-center justify-center space-x-10 text-center text-xs text-gray-300">
            <span className="flex items-center gap-3">
              <span className="h-3 w-3 rounded-full bg-red-500" />
              0–49
            </span>
            <span className="flex items-center gap-3">
              <span className="h-3 w-3 rounded-full bg-orange-500" />
              50–89
            </span>
            <span className="flex items-center gap-3">
              <span className="h-3 w-3 rounded-full bg-green-500" />
              90–100
            </span>
          </p>
        </div>
      </div>
      <Separator orientation="vertical" className="h-28" />
      <div className="flex w-[50%] flex-col items-center justify-center">
        <Image
          alt="Printscreen do site analisado"
          className="rounded-lg border border-border p-1"
          width={336}
          height={236}
          src={siteScreenshot}
        />
      </div>
    </div>
  );
}
