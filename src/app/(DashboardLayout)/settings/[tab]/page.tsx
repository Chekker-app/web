'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { GeneralConfigs } from '../components/General';
import { useRouter } from 'next/navigation';
import { PlanUsageInfo } from '../components/PlanUsageInfo';

interface SettingsTab {
  params: {
    tab: string;
  };
}

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
      <TabsContent value="billing" className="mt-5 space-y-5">
        <PlanUsageInfo />
      </TabsContent>
    </Tabs>
  );
}
