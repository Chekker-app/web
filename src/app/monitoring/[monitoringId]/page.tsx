import { StatusIndicator } from '@/components/StatusIndicator';
import { Button } from '@/components/ui/button';
import { TabsContent } from '@/components/ui/tabs';
import { ChevronLeft, Lock } from 'lucide-react';
import { MonitoringDetailsTabs } from './components/Tabs';
import { Card } from '@/components/ui/card';
import Link from 'next/link';

interface MonitoringDetailsProps {
  params: {
    monitoringId: string;
  };
}

export default function Page({ params }: MonitoringDetailsProps) {
  return (
    <section>
      <div className="flex items-center gap-3">
        <Link href="/" className="rounded-lg hover:bg-zinc-100">
          <Button variant="link" size="icon">
            <ChevronLeft className="h-5 w-5 text-gray-400" />
          </Button>
        </Link>
        <StatusIndicator />
        <h1 className="text-3xl font-medium">Meu Site</h1>
        <p className="text-lg font-light text-gray-300">/</p>
        <p className="text-lg font-light text-gray-300">meusitelindo.com.br</p>
      </div>
      <div className="mt-6">
        <MonitoringDetailsTabs>
          <TabsContent
            value="overview"
            className="mt-6 grid grid-cols-[60%_auto] gap-x-5"
          >
            <div className="space-y-4">
              <Card className="grid grid-cols-[20%_40%_60%] border-b-border p-0 shadow-sm">
                <div className="border-r border-border p-4">
                  <h1>Uptime</h1>
                </div>
                <div className="border-r border-border p-4">
                  <h1>Tempo de atividade</h1>
                </div>
                <div className="p-4">
                  <h1>Tempo médio de carregamento</h1>
                </div>
              </Card>
              <Card className="border-b-border p-4 shadow-sm">
                <h1>Gráfico UpTime</h1>
              </Card>
              <Card className="border-b-border p-4 shadow-sm">
                <h1>Gráfico de performance</h1>
              </Card>
            </div>
            <div>
              <Card className="h-min border-b-border p-4 shadow-sm">
                <div className="flex items-center justify-between">
                  <h1>Informações do SSL</h1>
                  <Lock className="h-6 w-6 text-green-600" />
                </div>
                <h1>SSL</h1>
                <h1>SSL</h1>
              </Card>
            </div>
          </TabsContent>
          <TabsContent value="settings" className="mt-5">
            <h1>Configurações</h1>
          </TabsContent>
        </MonitoringDetailsTabs>
      </div>
    </section>
  );
}
