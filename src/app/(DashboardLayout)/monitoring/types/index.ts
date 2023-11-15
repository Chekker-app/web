export type IMonitoring = {
  name: string;
  url: string;
  status: 'up' | 'down';
  id: string;
  sslDaysRemaining: number;
};

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
}

export enum PageStatusEnum {
  up = 'Online',
  down = 'Offline',
}
