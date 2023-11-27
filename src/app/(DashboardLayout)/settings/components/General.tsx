'use client';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { useSettings } from '../hooks/useSettings';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@tremor/react';
import { Loader2 } from 'lucide-react';

export function GeneralConfigs() {
  const { user } = useAuth();
  const {
    updateUserInfo,
    onChangePassword,
    changePasswordMutation,
    currentPassword,
    setCurrentPassword,
    newPassword,
    setNewPassword,
  } = useSettings();
  return (
    <div className="m-auto max-w-3xl rounded-md border border-b-border bg-background px-7 py-4">
      <div className="flex items-center justify-between">
        <p className="font-semibold text-card-foreground">
          Gostaria de receber relatórios semanais?
        </p>
        <Checkbox
          id="reports"
          className="h-6 w-6 border-border"
          defaultChecked={user?.weeklyReports}
          onCheckedChange={(value) => updateUserInfo('weeklyReports', value)}
        />
      </div>
      <Separator className="my-4 bg-zinc-400/40" />
      <div className="flex items-center justify-between">
        <p className="font-semibold text-card-foreground">Nome completo</p>
        <div className="w-full max-w-[320px]">
          <Input
            placeholder="Nome completo"
            defaultValue={user?.name}
            onBlur={(event) => updateUserInfo('name', event.target.value)}
          />
        </div>
      </div>

      <Separator className="my-4 bg-zinc-400/40" />
      <div className="flex items-center justify-between">
        <div className="max-w-[250px]">
          <p className="font-semibold text-card-foreground">
            Endereço de Email
          </p>
          <p className="mt-1 text-sm font-light text-gray-400">
            Será usado como e-mail primário para receber notificações sobre seus
            sites.
          </p>
        </div>
        <div className="w-full max-w-[320px]">
          <Input
            placeholder="Insira seu email"
            defaultValue={user?.email}
            onBlur={(event) => updateUserInfo('email', event.target.value)}
          />
        </div>
      </div>

      <Separator className="my-4 bg-zinc-400/40" />
      <div className="flex items-center justify-between">
        <div className="max-w-[250px]">
          <p className="font-semibold text-card-foreground">Email secundário</p>
          <p className="mt-1 text-sm font-light text-gray-400">
            Email secundário que receberá as mesmas informações sobre seus
            sites. (Ideal para equipes)
          </p>
        </div>
        <div className="w-full max-w-[320px]">
          <Input
            placeholder="Insira seu email"
            defaultValue={user?.secondary_email}
            onBlur={(event) =>
              updateUserInfo('secondary_email', event.target.value)
            }
          />
        </div>
      </div>

      <Separator className="my-4 bg-zinc-400/40" />
      <div className="flex items-center justify-between">
        <div className="max-w-[250px]">
          <p className="font-semibold text-card-foreground">Email terciário</p>
          <p className="mt-1 text-sm font-light text-gray-400">
            Email terciário que receberá as mesmas informações sobre seus sites.
            (Ideal para equipes)
          </p>
        </div>
        <div className="w-full max-w-[320px]">
          <Input
            placeholder="Insira seu email"
            defaultValue={user?.terciary_email}
            onBlur={(event) =>
              updateUserInfo('terciary_email', event.target.value)
            }
          />
        </div>
      </div>

      <Separator className="my-4 bg-zinc-400/40" />
      <div className="flex justify-between">
        <div className="max-w-[250px]">
          <p className="font-semibold text-card-foreground">Alterar senha</p>
          <p className="mt-1 text-sm font-light text-gray-400">
            Insira sua senha atual e a nova senha desejada para poder efetuar a
            alteração
          </p>
        </div>
        <form
          onSubmit={onChangePassword}
          className="w-full max-w-[250px] space-y-4"
        >
          <Input
            placeholder="Senha atual"
            name="current_password"
            type="password"
            value={currentPassword}
            onChange={(event) => setCurrentPassword(event.target.value)}
          />
          <Input
            placeholder="Nova senha"
            name="new_password"
            type="password"
            value={newPassword}
            onChange={(event) => setNewPassword(event.target.value)}
          />

          <div className="flex w-full justify-end">
            <Button type="submit" disabled={changePasswordMutation.isLoading}>
              {changePasswordMutation.isLoading && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              Alterar senha
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
