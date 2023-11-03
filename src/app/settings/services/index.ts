import { api } from '@/lib/api';
import { IUpdateUser } from '../hooks/useSettings';

export async function updateUserProfile(data: IUpdateUser) {
  try {
    await api.patch('/settings', data);
  } catch (error) {
    return error;
  }
}
