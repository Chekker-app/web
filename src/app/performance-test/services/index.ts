import { IPageTest } from '@/app/api/performance-test/types';
import { api } from '@/lib/api';

export async function checkSitePerformance(url: string) {
  try {
    const response = await api.post<IPageTest>('/performance-test', { url });
    return response.data;
  } catch (error) {
    console.log(error);
  }
}
