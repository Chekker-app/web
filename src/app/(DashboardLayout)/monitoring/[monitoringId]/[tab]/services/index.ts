import { IMonitoringDetails } from '@/app/(DashboardLayout)/monitoring/types';
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
    if (error.response?.status === 401) {
      throw new Error(
        'Sessão expirada! Faça login novamente para renovar a sessão.',
      );
    }

    throw new Error(
      error?.response?.data?.message ||
        'Houve um erro ao atualizar a informação',
    );
  }
}

export async function updateMonitoringInfo(
  data: IUpdateMonitoring,
  id: string,
) {
  try {
    return await api.patch(`/monitoring/${id}`, data);
  } catch (error: any) {
    if (error.response?.status === 401) {
      throw new Error(
        'Sessão expirada! Faça login novamente para renovar a sessão.',
      );
    }

    throw new Error(
      error?.response?.data?.message ||
        'Houve um erro ao atualizar a informação',
    );
  }
}

export async function deleteMonitoring(monitoringId: string) {
  try {
    return await api.delete(`/monitoring/${monitoringId}`);
  } catch (error: any) {
    if (error.response?.status === 401) {
      throw new Error(
        'Sessão expirada! Faça login novamente para renovar a sessão.',
      );
    }

    throw new Error(
      error?.response?.data?.message ||
        'Houve um erro ao atualizar a informação',
    );
  }
}
