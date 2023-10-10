import { TabsContent } from '@/components/ui/tabs';
import { MonitoringDetailsTabs } from './components/Tabs';
import { Header } from './components/Header';
import { SSLInfo } from './components/SSLInfo';
import { PerformanceChart } from './components/PerformanceChart';
import { UptimeTracker } from './components/UptimeTracker';
import { MainInfo } from './components/MainInfo';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';

interface MonitoringDetailsProps {
  params: {
    monitoringId: string;
    tab: string;
  };
}

export default function Page({ params }: MonitoringDetailsProps) {
  return (
    <section>
      <Header />
      <div className="mt-6">
        <MonitoringDetailsTabs>
          <TabsContent
            value="overview"
            className="mt-6 grid grid-cols-[65%_auto] gap-x-5"
          >
            <div className="space-y-4">
              <MainInfo />
              <UptimeTracker data={[]} />
              <PerformanceChart data={[]} />
            </div>
            <div>
              <SSLInfo />
            </div>
          </TabsContent>
          <TabsContent value="settings" className="mt-0">
            <Card className="m-auto max-w-3xl space-y-4 border border-border p-4 shadow-sm">
              <div className="space-y-1">
                <Label htmlFor="name">Nome do site</Label>
                <Input
                  name="name"
                  type="text"
                  placeholder="Insira um nome para o site"
                  className="sm:max-w-full md:max-w-xs"
                  defaultValue="Meu site lindo"
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="url">URL para monitorar</Label>
                <Input
                  name="url"
                  type="url"
                  placeholder="Insira um nome para o site"
                  className="sm:max-w-full md:max-w-xs"
                  defaultValue="https://meusite.com.br"
                />
              </div>
              <Separator className="!my-6" />
              <div className="space-y-1">
                <Label htmlFor="url">Emails para receber alertas</Label>
                <p className="text-sm text-gray-400">
                  Você pode adicionar até 3 E-mails para receber os alertas
                  sobre a sua página
                </p>
                <div className="!mt-2 space-y-2">
                  <Input
                    name="main-email"
                    type="email"
                    placeholder="Insira um email"
                    className="sm:max-w-full md:max-w-xs"
                  />
                  <Input
                    name="second-email"
                    type="email"
                    placeholder="Insira um email"
                    className="sm:max-w-full md:max-w-xs"
                  />
                  <Input
                    name="third-email"
                    type="email"
                    placeholder="Insira um email"
                    className="sm:max-w-full md:max-w-xs"
                  />
                </div>
              </div>
              <Separator className="!my-6" />
              <div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="daysRemind">
                      Alerta de expiração do SSL
                    </Label>
                    <p className="text-sm text-gray-400">
                      Quando enviaremos alerta antes do SSL expirar.
                    </p>
                  </div>
                  <Select>
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
                  <Switch id="reminds" />
                </div>
              </div>
              <Separator className="!my-6" />
              <div className="ml-2 mt-4 flex items-center justify-between">
                <div>
                  <Label htmlFor="daysRemind">Excluir monitoramento</Label>
                  <p className="max-w-sm text-sm text-gray-400">
                    Deseja excluir este monitoramento e todo seu registro salvo?
                    Esta ação é irreversível.
                  </p>
                </div>
                <Button variant="destructive">Excluir</Button>
              </div>
            </Card>
          </TabsContent>
        </MonitoringDetailsTabs>
      </div>
    </section>
  );
}

// adicionar sessão de ajuda
// deixar tela de teste de performance com informacoes mais clean e simples
// sessão de feedbacks
// secondz.io

// adicionar cancelamento de campanha do facebook
