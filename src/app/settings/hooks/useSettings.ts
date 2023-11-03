import { useMutation } from '@tanstack/react-query';
import { updateUserProfile } from '../services';
import { useToast } from '@/components/ui/use-toast';

export interface IUpdateUser {
  [key: string]: string | number | boolean;
}

export function useSettings() {
  const { toast } = useToast();
  const monitoringMutation = useMutation({
    mutationKey: ['UPDATE_PROFILE'],
    mutationFn: async (data: IUpdateUser) => updateUserProfile(data),
  });

  async function updateUserInfo(
    field: string,
    value: string | number | boolean,
  ) {
    monitoringMutation.mutate(
      {
        [field]: value,
      },
      {
        onSuccess: () =>
          toast({
            variant: 'success',
            description: 'Informação atualizada com sucesso!',
          }),
        onError: () =>
          toast({
            variant: 'destructive',
            description: 'Houve um erro ao atualizar a informação',
          }),
      },
    );
  }

  return { updateUserInfo };
}
