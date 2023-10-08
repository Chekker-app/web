import {
  CORE_LIGHTHOUSE_METRICS,
  CUSTOM_SORTING_EXPERIENCE_ORDER,
  CUSTOM_SORTING_CORE_METRICS_ORDER,
  CoreMetricDetailEnum,
  CoreMetricLinkEnum,
  CoreMetricTitleEnum,
  LoadingExperienceMetricsEnum,
  LoadingExperienceTitleEnum,
  LoadingExperienceLinkEnum,
} from '../constants';
import {
  ILighthouseAudits,
  ILoadingExperienceMetrics,
  ILoadingExperienceResponse,
  IOpportunities,
} from '../types';

export function filterAndFormatOptimizationOpportunities(
  opportunities: ILighthouseAudits,
) {
  const filteredOpportunities: IOpportunities[] = [];
  Object?.entries(opportunities)
    ?.filter(([, value]) => value['scoreDisplayMode'] !== 'notApplicable')
    ?.forEach(([, value]: any) => {
      const parts = value['description']?.match(/([^\[]+)\[(.*?)\]\((.*?)\)/);

      if (value['details']?.type === 'opportunity' && value['score'] <= 0.8) {
        // fazer tradução dos nomes em ingles para portugues
        const opoortunity = {
          ...value,
          score: Math.round(value['score'] * 100),
          numericValue: (value['numericValue'] / 1000).toFixed(2),
          displayValue: value['displayValue']?.replace(
            'Potential savings of',
            'Economia potencial de',
          ),
          description: {
            text: parts[1].trim(),
            knowMore: parts[2].trim(),
            url: parts[3].trim(),
          },
          // title: '',
        };
        filteredOpportunities.push(opoortunity);
      }
    });

  return filteredOpportunities;
}

export function getAllCruxMetrics(metrics: ILoadingExperienceResponse) {
  const cruxMetrics: ILoadingExperienceMetrics[] = [];

  Object?.entries(metrics)?.forEach(([key, value]: any) => {
    const sortedDistributions = value['distributions']?.sort(
      (a, b) => a.min - b.min,
    );

    const decimalNumDigits: number =
      key === 'CUMULATIVE_LAYOUT_SHIFT_SCORE' ? 3 : 1;

    cruxMetrics.push({
      name: LoadingExperienceTitleEnum[
        key as keyof typeof LoadingExperienceTitleEnum
      ],
      distributions: {
        good: {
          title: 'Bom',
          value: (sortedDistributions[0]?.max / 1000).toFixed(decimalNumDigits),
        },
        needImprove: {
          title: 'Precisa de melhoria',
          min: (sortedDistributions[1]?.min / 1000).toFixed(decimalNumDigits),
          max: (sortedDistributions[1]?.max / 1000).toFixed(decimalNumDigits),
        },
        bad: {
          title: 'Ruim',
          value: (sortedDistributions[2]?.min / 1000).toFixed(decimalNumDigits),
        },
      },
      category:
        LoadingExperienceMetricsEnum[
          value?.category as keyof typeof LoadingExperienceMetricsEnum
        ],
      link: LoadingExperienceLinkEnum[
        key as keyof typeof LoadingExperienceLinkEnum
      ],
      time: (value?.percentile / 1000).toFixed(decimalNumDigits),
    });
  });

  return cruxMetrics.sort((a, b) => {
    const nameA = a.name;
    const nameB = b.name;

    const indexA = CUSTOM_SORTING_EXPERIENCE_ORDER.indexOf(nameA);
    const indexB = CUSTOM_SORTING_EXPERIENCE_ORDER.indexOf(nameB);

    return indexA - indexB;
  });
}

export function getAllCoreLighthouseMetrics(audits: ILighthouseAudits) {
  const filteredCoreLighthouseMetrics: any[] = [];
  Object?.entries(audits)?.forEach(([key, value]: any) => {
    if (CORE_LIGHTHOUSE_METRICS.includes(key)) {
      const coreMetric = {
        displayValue: value?.displayValue,
        score: Math.round(value?.score * 100),
        title: CoreMetricTitleEnum[key as keyof typeof CoreMetricTitleEnum],
        details: CoreMetricDetailEnum[key as keyof typeof CoreMetricTitleEnum],
        link: CoreMetricLinkEnum[key as keyof typeof CoreMetricTitleEnum],
      };
      filteredCoreLighthouseMetrics.push(coreMetric);
    }
  });

  return filteredCoreLighthouseMetrics.sort((a, b) => {
    const nameA = a.name;
    const nameB = b.name;

    const indexA = CUSTOM_SORTING_CORE_METRICS_ORDER.indexOf(nameA);
    const indexB = CUSTOM_SORTING_CORE_METRICS_ORDER.indexOf(nameB);

    return indexA - indexB;
  });
}
