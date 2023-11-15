'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { FormEvent, useState } from 'react';
import { UserExperienceMetric } from './components/UserExperienceMetric';
import { Separator } from '@/components/ui/separator';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { PerformanceMainInfo } from './components/PerformanceMainInfo';
import { useMutation } from '@tanstack/react-query';
import { checkSitePerformance } from './services';
import { InderteminateProgress } from '@/components/IndeterminateProgress';
import { Opportunities } from './components/Opportunities';
import { Metrics } from './components/Metrics';

export default function PerformanceTest() {
  const { data, isLoading, mutate, isSuccess } = useMutation({
    mutationFn: checkSitePerformance,
  });

  const [isShowingDetails, setIsShowinDetails] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    mutate(String(formData.get('url')));
  }
  console.log(data);

  const loadingExperienceMetricsPartOne = data?.loadingExperienceMetrics?.slice(
    0,
    3,
  );
  const loadingExperienceMetricsPartTwo = data?.loadingExperienceMetrics?.slice(
    3,
    6,
  );

  return (
    <div className="mx-auto max-w-5xl">
      <form onSubmit={handleSubmit} className="flex items-center gap-2">
        <Input
          name="url"
          placeholder="Insira a URL da página que deseja realizar o teste"
          type="url"
          required
          disabled={isLoading}
        />
        <Button type="submit" disabled={isLoading}>
          Analisar
        </Button>
      </form>

      {isLoading && (
        <div className="flex h-[400px] flex-col items-center justify-center">
          <p className="text-gray-400">
            Estamos analisando o seu site. Por favor, aguarde...
          </p>
          <InderteminateProgress className="mt-4 max-w-md" />
        </div>
      )}

      {isSuccess && (
        <>
          <div className="m-auto mt-10 w-full text-center">
            <p className="text-2xl font-medium">
              Aqui está o resultado do seu análise:
            </p>
          </div>

          <div className="mt-10 shadow-sm">
            <div className="flex items-center justify-between">
              <p className="text-md font-normal leading-tight">
                Descubra o que seus usuários reais estão vivenciando
              </p>
              <Button
                variant="ghost"
                size="sm"
                className="text-gray-300"
                onClick={() => setIsShowinDetails(!isShowingDetails)}
              >
                {!isShowingDetails ? (
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
            <Card className="mt-2 border-b-border px-0 shadow-none">
              <CardContent>
                {data?.loadingExperienceMetrics &&
                  data?.loadingExperienceMetrics.length === 0 && (
                    <p className="text-center text-sm text-gray-300">
                      Infelizmente não conseguimos obter essas informações...
                    </p>
                  )}
                {data?.loadingExperienceMetrics &&
                  data?.loadingExperienceMetrics.length > 0 && (
                    <div className="space-y-6">
                      <div className="grid grid-cols-3 gap-y-12">
                        {loadingExperienceMetricsPartOne?.map((item) => (
                          <UserExperienceMetric
                            key={item.name}
                            experienceMetric={item}
                            isShowingDetails={isShowingDetails}
                          />
                        ))}
                      </div>
                      <Separator />
                      <div className="grid grid-cols-3 gap-x-5 gap-y-12">
                        {loadingExperienceMetricsPartTwo?.map((item) => (
                          <UserExperienceMetric
                            key={item.name}
                            experienceMetric={item}
                            isShowingDetails={isShowingDetails}
                          />
                        ))}
                      </div>
                    </div>
                  )}
              </CardContent>
            </Card>
          </div>

          <div className="mt-10 shadow-sm">
            <p className="text-md font-normal leading-tight">
              Diagnóstico de performance
            </p>
            <Card className="mt-4 border-b-border p-8 py-12 shadow-none">
              <CardContent className="p-0">
                <PerformanceMainInfo
                  score={data?.performanceInfo.score || 0}
                  siteScreenshot={data?.extras?.pageScreenshot?.img || ''}
                />
                <Separator className="my-12" />
                <Metrics
                  coreMetrics={data?.performanceInfo?.coreMetrics || []}
                />
                <Separator className="my-12" />
                <Opportunities
                  opportunities={data?.performanceInfo?.opportunities || []}
                />
              </CardContent>
            </Card>
          </div>
        </>
      )}
    </div>
  );
}
