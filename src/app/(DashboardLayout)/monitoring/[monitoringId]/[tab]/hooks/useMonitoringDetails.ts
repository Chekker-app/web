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
    onSuccess: () => {
      refetch();
      toast({
        variant: 'success',
        description: 'Informação atualizada com sucesso!',
      });
    },
    onError: (error: any) => {
      toast({
        variant: 'destructive',
        description: String(error.message),
      });
    },
  });

  const deleteMonitoringMutation = useMutation({
    mutationKey: ['DELETE_MONITORING', monitoringToDelete],
    mutationFn: async (monitoringId: string) => deleteMonitoring(monitoringId),
    onError: (error: any) => {
      toast({
        variant: 'destructive',
        description: String(error.message),
      });
    },
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
    refetchInterval: user?.Plan?.intervalMin * 1000 * 60,
    cacheTime: user?.Plan?.intervalMin * 1000 * 60,
    onError: (error: any) => {
      toast({
        variant: 'destructive',
        description: String(error.message),
      });
    },
  });

  async function updateMonitoringField(
    field: string,
    value: string | number | boolean,
  ) {
    monitoringMutation.mutate({
      [field]: value,
    });
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

  function updateMonitoringSslInfo(value: number) {
    if (!user?.Plan?.sendSslEmails) {
      return toast({
        variant: 'destructive',
        description:
          'Seu plano atual não permite receber alertas sobre a expiração do Certificado SSL',
      });
    }

    return updateMonitoringField('sslRememberIn', value);
  }

  function updateMonitoringSslRemindersInfo(value: boolean) {
    if (!user?.Plan?.sendSslEmails) {
      return toast({
        variant: 'destructive',
        description:
          'Seu plano atual não permite receber alertas sobre a expiração do Certificado SSL',
      });
    }
    return updateMonitoringField('sslSendReminders', value);
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
    updateMonitoringSslInfo,
    updateMonitoringSslRemindersInfo,
    isLoadingDelete: deleteMonitoringMutation.isLoading,
  };
}
