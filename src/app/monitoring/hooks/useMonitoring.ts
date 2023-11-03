import { useToast } from '@/components/ui/use-toast';
import { api } from '@/lib/api';
import { useMutation, useQuery } from '@tanstack/react-query';
import { FormEvent, useState } from 'react';
import { getAllMonitorings } from '../services';
import { deleteMonitoring } from '../[monitoringId]/[tab]/services';

export function useMonitoring() {
  const { toast } = useToast();
  const [isOpenDialog, setIsOpenDialog] = useState(false);
  const [isCreatingMonitoring, setIsCreatingMonitoring] = useState(false);
  const [monitoringToDelete, setMonitoringToDelete] = useState<string | null>(
    null,
  );

  const deleteMonitoringMutation = useMutation({
    mutationKey: ['DELETE_MONITORING', monitoringToDelete],
    mutationFn: async (monitoringId: string) => deleteMonitoring(monitoringId),
  });

  const {
    data: monitorings = [],
    isLoading: isLoadingMonitorings,
    refetch,
  } = useQuery({
    queryKey: ['/monitorings'],
    queryFn: getAllMonitorings,
  });

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
      refetch();
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

  async function deleteMonitoringInfo() {
    deleteMonitoringMutation.mutate(monitoringToDelete ?? '', {
      onSuccess: () => {
        refetch();
        setMonitoringToDelete(null);
        toast({
          variant: 'success',
          description: 'Site excluido com sucesso!',
        });
      },
      onError: () =>
        toast({
          variant: 'destructive',
          description: 'Houve um erro ao excluir o site',
        }),
    });
  }

  return {
    isOpenDialog,
    setIsOpenDialog,
    isCreatingMonitoring,
    handleSubmit,
    monitorings,
    isLoadingMonitorings,
    monitoringToDelete,
    setMonitoringToDelete,
    deleteMonitoringInfo,
    isLoadingDelete: deleteMonitoringMutation?.isLoading,
  };
}
