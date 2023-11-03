'use client';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { useSettings } from '../hooks/useSettings';
import { useAuth } from '@/context/AuthContext';

export function GeneralConfigs() {
  const { user } = useAuth();
  const { updateUserInfo } = useSettings();
  return (
    <div className="m-auto max-w-3xl rounded-md border border-b-border bg-background px-7 py-4">
      <div className="flex items-center justify-between">
        <div className="">
          <p className="font-semibold">
            Gostaria de receber relatórios semanais?
          </p>
        </div>
        <Checkbox
          id="reports"
          className="h-6 w-6 border-border"
          defaultChecked={user?.weeklyReports}
          onCheckedChange={(value) => updateUserInfo('weeklyReports', value)}
        />
      </div>
      <Separator className="my-4 bg-zinc-400/40" />
      <div className="flex items-center justify-between">
        <p className="font-semibold">Nome completo</p>
        <div className="w-full max-w-[320px]">
          <Input
            placeholder="Nome completo"
            className="bg-zinc-100"
            defaultValue={user?.name}
            onBlur={(event) => updateUserInfo('name', event.target.value)}
          />
        </div>
      </div>

      <Separator className="my-4 bg-zinc-400/40" />
      <div className="flex items-center justify-between">
        <div className="max-w-[250px]">
          <p className="font-semibold">Endereço de Email</p>
        </div>
        <div className="w-full max-w-[320px]">
          <Input
            placeholder="Insira seu email"
            className="bg-zinc-100"
            defaultValue={user?.email}
            onBlur={(event) => updateUserInfo('email', event.target.value)}
          />
        </div>
      </div>
    </div>
  );
}
