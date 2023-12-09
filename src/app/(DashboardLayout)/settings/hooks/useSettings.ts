import { useMutation } from '@tanstack/react-query';
import {
  IChangePassword,
  changePassword,
  updateUserProfile,
} from '../services';
import { useToast } from '@/components/ui/use-toast';
import { FormEvent, useState } from 'react';

export interface IUpdateUser {
  [key: string]: string | number | boolean | null;
}

export function useSettings() {
  const { toast } = useToast();
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const monitoringMutation = useMutation({
    mutationKey: ['UPDATE_PROFILE'],
    mutationFn: async (data: IUpdateUser) => updateUserProfile(data),
    onSuccess: () =>
      toast({
        variant: 'success',
        description: 'Informação atualizada com sucesso!',
      }),
    onError: (error: any) => {
      toast({
        variant: 'destructive',
        description: String(error.message),
      });
    },
  });

  const changePasswordMutation = useMutation({
    mutationFn: async (data: IChangePassword) => changePassword(data),
    onSuccess: () => {
      toast({
        variant: 'success',
        description: 'Senha alterada com sucesso!',
      });
    },
    onError: (error: any) => {
      toast({
        variant: 'destructive',
        description: String(error.message),
      });
    },
  });

  async function updateUserInfo(
    field: string,
    value: string | number | boolean,
  ) {
    if ((field === 'email' || field === 'name') && !value) {
      return toast({
        variant: 'destructive',
        description: 'Campo não pode ser vázio!',
      });
    }

    monitoringMutation.mutate({
      [field]: value ? value : null,
    });
  }

  async function onChangePassword(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!currentPassword || !newPassword) {
      return toast({
        variant: 'destructive',
        description:
          'É necessário informar a senha atual e a nova senha para efetuar a alteração.',
      });
    }

    if (newPassword.length < 6) {
      return toast({
        variant: 'destructive',
        description:
          'É necessário que a nova senha tenha pelo menos 6 caractéres.',
      });
    }

    changePasswordMutation.mutate(
      {
        current_password: String(currentPassword),
        new_password: String(newPassword),
      },
      {
        onSuccess: () => {
          setCurrentPassword('');
          setNewPassword('');
        },
      },
    );
  }

  return {
    updateUserInfo,
    onChangePassword,
    changePasswordMutation,
    currentPassword,
    setCurrentPassword,
    newPassword,
    setNewPassword,
  };
}
