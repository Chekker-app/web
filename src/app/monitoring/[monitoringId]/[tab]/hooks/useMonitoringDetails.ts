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
import { useAuth } from '@/context/AuthContext';

interface UseMonitoringDetailsProps {
  monitoringId: string;
  getMonitoring?: boolean;
}

export function useMonitoringDetails({
  monitoringId,
  getMonitoring = false,
}: UseMonitoringDetailsProps) {
  const router = useRouter();
  const { toast } = useToast();
  const { user } = useAuth();

  const [monitoringToDelete, setMonitoringToDelete] = useState<string | null>(
    null,
  );

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
        onError: (error: any) =>
          toast({
            variant: 'destructive',
            description:
              error?.response?.data?.message ||
              'Houve um erro ao atualizar a informação',
          }),
      },
    );
  }

  function updateMonitoringInterval(value: number) {
    if (user?.Plan?.intervalMin > value) {
      return toast({
        variant: 'destructive',
        description:
          'Seu plano atual não permite o tempo selecionado. Faça o upgrade do seu plano.',
      });
    }
    return updateMonitoringField('checkIntervalTime', value);
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
    updateMonitoringInterval,
    isLoadingDelete: deleteMonitoringMutation.isLoading,
  };
}
