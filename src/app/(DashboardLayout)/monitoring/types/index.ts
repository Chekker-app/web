export type IMonitoring = {
  name: string;
  url: string;
  status: 'up' | 'down';
  id: string;
  sslDaysRemaining: number;
};

export interface IPerfromanceTrackerInfo {
  date: string;
  performance: string;
  response: string;
}

export interface IPerformanceTestsTrackerInfo {
  date: string;
  score: number;
}

export interface IUptimeTrackerInfo {
  day: string;
  uptime: string;
  color:
    | 'slate'
    | 'gray'
    | 'zinc'
    | 'neutral'
    | 'stone'
    | 'red'
    | 'orange'
    | 'amber'
    | 'yellow'
    | 'lime'
    | 'green'
    | 'emerald'
    | 'teal'
    | 'cyan'
    | 'sky'
    | 'blue'
    | 'indigo'
    | 'violet'
    | 'purple'
    | 'fuchsia'
    | 'pink'
    | 'rose';
  tooltip: Element | string;
}

export interface IMonitoringDetails {
  id: string;
  name: string;
  url: string;
  status: 'up' | 'down';
  checkIntervalTime: number;
  createdAt: Date;
  sslDaysRemaining: number;
  sslValidFrom: string;
  sslValidTo: string;
  sslValidForDomains: string;
  sslRememberIn: number;
  sslSendReminders: boolean;
  userId: string;
  main_email: string;
  secondary_email: string;
  terciary_email: string;
  averageResponseTime: string;
  monitoringUpTime: string;
  upTimeTrackerInfo: IUptimeTrackerInfo[];
  performanceTrackerInfo: IPerfromanceTrackerInfo[];
  performanceTestsTrackerInfo: IPerformanceTestsTrackerInfo[];
}

export enum PageStatusEnum {
  up = 'Online',
  down = 'Offline',
}
