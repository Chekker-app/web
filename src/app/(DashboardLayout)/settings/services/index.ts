import { api } from '@/lib/api';
import { IUpdateUser } from '../hooks/useSettings';

export interface IChangePassword {
  current_password: string;
  new_password: string;
}

export async function updateUserProfile(data: IUpdateUser) {
  try {
    await api.patch('/settings', data);
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

export async function changePassword(data: IChangePassword) {
  try {
    await api.patch('/settings/change-password', data);
  } catch (error: any) {
    if (error.response?.status === 401) {
      throw new Error(
        'Sessão expirada! Faça login novamente para renovar a sessão.',
      );
    }

    throw new Error(
      error?.response?.data?.message || 'Houve um erro ao atualizar a senha',
    );
  }
}
