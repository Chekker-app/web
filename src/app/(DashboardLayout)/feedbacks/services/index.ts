import { api } from '@/lib/api';

export interface IFeedbackProps {
  title: string;
  description: string;
}

export async function handleSendFeedback(data: IFeedbackProps) {
  try {
    await api.post('/feedbacks', data);
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
