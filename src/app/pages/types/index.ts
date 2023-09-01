export type PageData = {
  name: string;
  url: string;
  status: 'up' | 'down';
  id: string;
};

export enum PageStatusEnum {
  up = 'Online',
  down = 'Offline',
}
