import { useMutation, useQuery } from '@tanstack/react-query';
import {
  IUpdateMonitoring,
  deleteMonitoring,
  getMonitoringDetails,
  updateMonitoringInfo,
} from '../services';
import { useToast } from '@/components/ui/use-toast';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface UseMonitoringDetailsProps {
  monitoringId: string;
  getMonitoring?: boolean;
}

export function useMonitoringDetails({
  monitoringId,
  getMonitoring = false,
}: UseMonitoringDetailsProps) {
  const router = useRouter();
  const [monitoringToDelete, setMonitoringToDelete] = useState<string | null>(
    null,
  );

  const { toast } = useToast();
  const monitoringMutation = useMutation({
    mutationKey: ['UPDATE_MONITORING', monitoringId],
    mutationFn: async (data: IUpdateMonitoring) =>
      updateMonitoringInfo(data, monitoringId),
  });

  const deleteMonitoringMutation = useMutation({
    mutationKey: ['DELETE_MONITORING', monitoringToDelete],
    mutationFn: async (monitoringId: string) => deleteMonitoring(monitoringId),
  });

  const {
    data: monitoringDetails,
    isLoading: isLoadingMonitoringDetails,
    refetch,
  } = useQuery({
    queryKey: ['/monitoring', monitoringId],
    queryFn: async () => getMonitoringDetails(monitoringId),
    enabled: Boolean(monitoringId) && getMonitoring,
    refetchOnWindowFocus: false,
  });

  async function updateMonitoringField(
    field: string,
    value: string | number | boolean,
  ) {
    monitoringMutation.mutate(
      {
        [field]: value,
      },
      {
        onSuccess: () => {
          refetch();
          toast({
            variant: 'success',
            description: 'Informação atualizada com sucesso!',
          });
        },
        onError: () =>
          toast({
            variant: 'destructive',
            description: 'Houve um erro ao atualizar a informação',
          }),
      },
    );
  }

  async function deleteMonitoringInfo() {
    deleteMonitoringMutation.mutate(monitoringToDelete ?? '', {
      onSuccess: () => {
        toast({
          variant: 'success',
          description: 'Site excluido com sucesso!',
        });
        router.push('/');
        setMonitoringToDelete(null);
      },
      onError: () =>
        toast({
          variant: 'destructive',
          description: 'Houve um erro ao excluir o site',
        }),
    });
  }

  return {
    monitoringDetails,
    isLoadingMonitoringDetails,
    updateMonitoringField,
    monitoringToDelete,
    setMonitoringToDelete,
    deleteMonitoringInfo,
    isLoadingDelete: deleteMonitoringMutation.isLoading,
  };
}
