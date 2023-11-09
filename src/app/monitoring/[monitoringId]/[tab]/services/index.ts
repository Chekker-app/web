import { IMonitoringDetails } from '@/app/monitoring/types';
import { api } from '@/lib/api';

export interface IUpdateMonitoring {
  [key: string]: string | number | boolean;
}

export async function getMonitoringDetails(
  id: string,
): Promise<IMonitoringDetails> {
  try {
    const response = await api.get<IMonitoringDetails>(`/monitoring/${id}`);
    return response.data;
  } catch (error: any) {
    return error;
  }
}

export async function updateMonitoringInfo(
  data: IUpdateMonitoring,
  id: string,
) {
  try {
    return await api.patch(`/monitoring/${id}`, data);
  } catch (error) {
    return error;
  }
}

export async function deleteMonitoring(monitoringId: string) {
  try {
    return await api.delete(`/monitoring/${monitoringId}`);
  } catch (error) {
    throw new Error('Não foi possível excluir o site');
  }
}
