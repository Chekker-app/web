export interface IPageTest {
  loadingExperienceMetrics: ILoadingExperienceMetrics[];
  performanceInfo: {
    coreMetrics: ICoreMetrics[];
    opportunities: IOpportunities[];
    score: number;
  };
  extras: IPageCheckExtras;
}

export interface ILoadingExperienceMetrics {
  name: string;
  category: string;
  distributions: ILoadingExperienceMetricsDistributions;
  link: string;
  time: string;
}

export interface ILoadingExperienceMetricsDistributions {
  good: {
    title: string;
    value: string;
  };
  needImprove: {
    title: string;
    min: string;
    max: string;
  };
  bad: {
    title: string;
    value: string;
  };
}

export interface IOpportunities {
  id: string;
  title: string;
  description: {
    text: string;
    url: string;
    knowMore: string;
  };
  score: number;
  details: {
    items: {
      totalBytes: number;
      url: string;
      wastedBytes?: number;
      wastedMs?: number;
      responseTime?: number;
    }[];
    overallSavingsMs: number;
    overallSavingsBytes: number;
  };
  numericUnit: string;
  numericValue: string;
  displayValue: string;
}

export interface ICoreMetrics {
  details: string;
  displayValue: string;
  link: string;
  score: number;
  title: string;
}

export interface IPageCheckExtras {
  pageScreenshot: {
    height: number;
    width: number;
    img: string;
    nodes: {
      [key: string]: any;
    };
  };
}

export interface ILighthouseAudits {
  [key: string]: any;
}

export interface ILoadingExperienceResponse {
  [key: string]: any;
}
