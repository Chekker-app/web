import { useToast } from '@/components/ui/use-toast';
import { api } from '@/lib/api';
import { FormEvent, useState } from 'react';

export function useMonitoring() {
  const { toast } = useToast();
  const [isOpenDialog, setIsOpenDialog] = useState(false);
  const [isCreatingMonitoring, setIsCreatingMonitoring] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    setIsCreatingMonitoring(true);
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    try {
      const payload = {
        name: formData.get('name'),
        url: formData.get('url'),
      };

      await api.post('/monitoring/create', payload);
      setIsOpenDialog(false);
      setIsCreatingMonitoring(false);
      toast({
        variant: 'success',
        description: 'Página adicionada com sucesso!',
      });
    } catch (error) {
      setIsCreatingMonitoring(false);
      toast({
        variant: 'destructive',
        title: 'Ops! Algo deu errado.',
        description: 'Não foi possivel adicionar a página. Tente novamente.',
      });
      console.log(error);
    }
  }

  return {
    isOpenDialog,
    setIsOpenDialog,
    isCreatingMonitoring,
    handleSubmit,
  };
}
