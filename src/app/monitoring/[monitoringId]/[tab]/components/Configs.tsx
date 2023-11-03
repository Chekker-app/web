import { IMonitoringDetails } from '@/app/monitoring/types';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { useMonitoringDetails } from '../hooks/useMonitoringDetails';
import { DeleteMonitoringModal } from './DeleteMonitoringModal';

interface ConfigProps {
  monitoringDetails?: IMonitoringDetails | null;
}

export function Configs({ monitoringDetails }: ConfigProps) {
  const {
    updateMonitoringField,
    monitoringToDelete,
    setMonitoringToDelete,
    deleteMonitoringInfo,
    isLoadingDelete,
  } = useMonitoringDetails({
    monitoringId: monitoringDetails?.id ?? '',
  });

  return (
    <>
      <Card className="m-auto max-w-3xl space-y-4 border border-border p-4 shadow-sm">
        <div className="space-y-1">
          <Label htmlFor="name">Nome do site</Label>
          <Input
            name="name"
            type="text"
            placeholder="Insira um nome para o site"
            className="sm:max-w-full md:max-w-xs"
            defaultValue={monitoringDetails?.name ?? ''}
            onBlur={(event) =>
              updateMonitoringField('name', event.target.value)
            }
          />
        </div>
        <div className="space-y-1">
          <Label htmlFor="url">URL para monitorar</Label>
          <Input
            name="url"
            type="url"
            placeholder="Insira um nome para o site"
            className="sm:max-w-full md:max-w-xs"
            defaultValue={monitoringDetails?.url ?? ''}
            onBlur={(event) =>
              updateMonitoringField('name', event.target.value)
            }
          />
        </div>
        <Separator className="!my-6" />
        <div className="space-y-1">
          <Label htmlFor="url">Emails para receber alertas</Label>
          <p className="text-sm text-gray-400">
            Você pode adicionar até 3 E-mails para receber os alertas sobre a
            sua página
          </p>
          <div className="!mt-2 space-y-2">
            <Input
              name="main_email"
              type="email"
              placeholder="Insira um email"
              className="sm:max-w-full md:max-w-xs"
              defaultValue={monitoringDetails?.main_email ?? ''}
              onBlur={(event) =>
                updateMonitoringField('main_email', event.target.value)
              }
            />
            <Input
              name="secondary_email"
              type="email"
              placeholder="Insira um email"
              className="sm:max-w-full md:max-w-xs"
              defaultValue={monitoringDetails?.secondary_email ?? ''}
              onBlur={(event) =>
                updateMonitoringField('secondary_email', event.target.value)
              }
            />
            <Input
              name="terciary_email"
              type="email"
              placeholder="Insira um email"
              className="sm:max-w-full md:max-w-xs"
              defaultValue={monitoringDetails?.terciary_email ?? ''}
              onBlur={(event) =>
                updateMonitoringField('terciary_email', event.target.value)
              }
            />
          </div>
        </div>
        <Separator className="!my-6" />
        <div>
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="daysRemind">Alerta de expiração do SSL</Label>
              <p className="text-sm text-gray-400">
                Quando enviaremos alerta antes do SSL expirar.
              </p>
            </div>
            <Select
              defaultValue={monitoringDetails?.sslRememberIn.toString()}
              onValueChange={(value) =>
                updateMonitoringField('sslRememberIn', Number(value))
              }
            >
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Selecione uma opção" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="0">Nunca</SelectItem>
                  <SelectItem value="1">Um dia antes</SelectItem>
                  <SelectItem value="3">3 dias antes</SelectItem>
                  <SelectItem value="7">7 dias antes</SelectItem>
                  <SelectItem value="15">15 dias antes</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div className="ml-2 mt-4 flex items-center justify-between">
            <div>
              <Label htmlFor="daysRemind">Enviar lembretes</Label>
              <p className="max-w-sm text-sm text-gray-400">
                Deseja receber mais alertas depois do primeiro? Se você
                selecionar 7 dias antes, você irá receber a primeira
                notificação, depois 3 dias antes e no dia que expirar
              </p>
            </div>
            <Switch
              id="reminds"
              defaultChecked={monitoringDetails?.sslSendReminders}
              onCheckedChange={(value) =>
                updateMonitoringField('sslSendReminders', value)
              }
            />
          </div>
        </div>
        <Separator className="!my-6" />
        <div className="ml-2 mt-4 flex items-center justify-between">
          <div>
            <Label htmlFor="daysRemind">Excluir monitoramento</Label>
            <p className="max-w-sm text-sm text-gray-400">
              Deseja excluir este monitoramento e todo seu registro salvo? Esta
              ação é irreversível.
            </p>
          </div>
          <Button
            variant="destructive"
            onClick={() => setMonitoringToDelete(monitoringDetails?.id ?? null)}
          >
            Excluir
          </Button>
        </div>
      </Card>
      <DeleteMonitoringModal
        open={Boolean(monitoringToDelete)}
        onClose={() => setMonitoringToDelete(null)}
        onDeleteMonitoring={deleteMonitoringInfo}
        isLoadingDelete={isLoadingDelete}
      />
    </>
  );
}
