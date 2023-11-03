import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { GeneralConfigs } from '../components/General';
import { useRouter } from 'next/navigation';

interface SettingsTab {
  params: {
    tab: string;
  };
}

// pegar o máximo permitido por plano
// dividir por 100
// resultado multiplicar pela quantidade usada
// ex 5 páginas cadastradas = 100 / 5 = 20
// cadastrou 3 páginas = 20 / 3 = 60

// adicionar sessão de ajuda
// deixar tela de teste de performance com informacoes mais clean e simples
// sessão de feedbacks
// secondz.io

export default function Settings({ params }: SettingsTab) {
  const router = useRouter();
  return (
    <Tabs defaultValue={params.tab}>
      <TabsList className="w-full items-start justify-start rounded-none border-b border-b-border">
        <TabsTrigger value="geral" onClick={() => router.push('geral')}>
          Geral
        </TabsTrigger>
        <TabsTrigger value="billing" onClick={() => router.push('billing')}>
          Cobrança e Assinatura
        </TabsTrigger>
      </TabsList>
      <TabsContent value="geral" className="mt-5">
        <GeneralConfigs />
      </TabsContent>
      <TabsContent value="billing" className="mt-5 space-y-5"></TabsContent>
    </Tabs>
  );
}
