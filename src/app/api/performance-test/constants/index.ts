export enum LoadingExperienceTitleEnum {
  LARGEST_CONTENTFUL_PAINT_MS = 'Maior Renderização de Conteúdo (LCP)',
  FIRST_INPUT_DELAY_MS = 'Atraso da Primeira Entrada (FID)',
  FIRST_CONTENTFUL_PAINT_MS = 'Primeira renderização de conteúdo (FCP)',
  EXPERIMENTAL_TIME_TO_FIRST_BYTE = 'Tempo entre navegações de tela (TTFB)',
  CUMULATIVE_LAYOUT_SHIFT_SCORE = 'Mudanças de página inesperada (CLS)',
  INTERACTION_TO_NEXT_PAINT = 'Todas interações do usuário (INP)',
}

export enum LoadingExperienceLinkEnum {
  LARGEST_CONTENTFUL_PAINT_MS = 'https://web.dev/lcp/',
  FIRST_INPUT_DELAY_MS = 'https://web.dev/fid/',
  FIRST_CONTENTFUL_PAINT_MS = 'https://web.dev/fcp/',
  EXPERIMENTAL_TIME_TO_FIRST_BYTE = 'https://web.dev/ttfb/',
  CUMULATIVE_LAYOUT_SHIFT_SCORE = 'https://web.dev/cls/',
  INTERACTION_TO_NEXT_PAINT = 'https://web.dev/inp/',
}

export enum CoreMetricTitleEnum {
  'first-contentful-paint' = 'Primeira renderização de conteúdo',
  'total-blocking-time' = 'Tempo total de bloqueio',
  'speed-index' = 'Índice de velocidade',
  'largest-contentful-paint' = 'Maior Renderização de Conteúdo',
}

export enum CoreMetricDetailEnum {
  'first-contentful-paint' = 'A primeira renderização com conteúdo marca o momento em que o primeiro texto ou imagem é exibido',
  'total-blocking-time' = 'Soma de todos os períodos de tempo entre o FCP e Tempo de Interatividade quando a duração da tarefa excedeu 50ms',
  'speed-index' = 'O Índice de velocidade mostra a rapidez com que o conteúdo de uma página é visivelmente preenchido',
  'largest-contentful-paint' = 'Maior renderização de Conteúdo marca o momento em que o maior texto ou imagem é carregado',
}

export enum CoreMetricLinkEnum {
  'first-contentful-paint' = 'https://developer.chrome.com/docs/lighthouse/performance/first-contentful-paint/',
  'total-blocking-time' = 'https://developer.chrome.com/docs/lighthouse/performance/lighthouse-total-blocking-time/',
  'speed-index' = 'https://developer.chrome.com/docs/lighthouse/performance/speed-index/',
  'largest-contentful-paint' = 'https://developer.chrome.com/docs/lighthouse/performance/lighthouse-largest-contentful-paint/',
}

export enum LoadingExperienceMetricsEnum {
  FAST = 'Bom',
  AVERAGE = 'Precisa de Melhoria',
  SLOW = 'Ruim',
}

export const CUSTOM_SORTING_EXPERIENCE_ORDER = [
  'Maior Renderização de Conteúdo (LCP)',
  'Atraso da Primeira Entrada (FID)',
  'Mudanças de página inesperada (CLS)',
  'Primeira renderização de conteúdo (FCP)',
  'Todas interações do usuário (INP)',
  'Tempo entre navegações de tela (TTFB)',
];

export const CUSTOM_SORTING_CORE_METRICS_ORDER = [
  'Primeira renderização de conteúdo',
  'Tempo total de bloqueio',
  'Índice de velocidade',
  'Maior Renderização de Conteúdo',
];

export const CORE_LIGHTHOUSE_METRICS = [
  'first-contentful-paint',
  'total-blocking-time',
  'speed-index',
  'largest-contentful-paint',
];
