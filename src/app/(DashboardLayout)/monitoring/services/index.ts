import { api } from '@/lib/api';
import { IMonitoring } from '../types';

export async function getAllMonitorings() {
  try {
    const response = await api.get<IMonitoring[]>('/monitoring/list');
    return response?.data;
  } catch (error: any) {
    console.log('ERROR', error);
    if (error.response?.status === 401) {
      throw new Error(
        'Sessão expirada! Faça login novamente para renovar a sessão.',
      );
    }
    throw new Error(
      error?.response?.data?.message ||
        'Não foi possível listar os monitoramentos. Tente novamente.',
    );
  }
}
