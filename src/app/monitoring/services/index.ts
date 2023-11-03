import { api } from '@/lib/api';
import { IMonitoring } from '../types';

export async function getAllMonitorings() {
  try {
    const response = await api.get<IMonitoring[]>('/monitoring/list');
    return response.data;
  } catch (error) {
    return console.log(error);
  }
}
