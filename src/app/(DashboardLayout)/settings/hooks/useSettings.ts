import { useMutation } from '@tanstack/react-query';
import { updateUserProfile } from '../services';
import { useToast } from '@/components/ui/use-toast';

export interface IUpdateUser {
  [key: string]: string | number | boolean | null;
}

export function useSettings() {
  const { toast } = useToast();
  const monitoringMutation = useMutation({
    mutationKey: ['UPDATE_PROFILE'],
    mutationFn: async (data: IUpdateUser) => updateUserProfile(data),
    onSuccess: () =>
      toast({
        variant: 'success',
        description: 'Informação atualizada com sucesso!',
      }),
    onError: (error) =>
      toast({
        variant: 'destructive',
        description: String(error),
      }),
  });

  async function updateUserInfo(
    field: string,
    value: string | number | boolean,
  ) {
    if (field === 'email' || (field === 'name' && !value)) {
      return toast({
        variant: 'destructive',
        description: 'Campo não pode ser vázio!',
      });
    }

    monitoringMutation.mutate({
      [field]: value ? value : null,
    });
  }

  return { updateUserInfo };
}
