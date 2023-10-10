'use client';

import { useParams } from 'next/navigation';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ReactNode } from 'react';

interface MonitoringDetailsTabs {
  children: ReactNode;
}

export function MonitoringDetailsTabs({ children }: MonitoringDetailsTabs) {
  const params = useParams();

  function handleChangeTab(tab: string) {
    const url = location.origin;
    window.history.pushState(
      null,
      '',
      `${url}/monitoring/${params.monitoringId}/${tab}`,
    );
  }

  return (
    <Tabs defaultValue={(params?.tab as string) || ''}>
      <TabsList className="w-full items-start justify-start rounded-none border-b border-b-border">
        <TabsTrigger
          value="overview"
          onClick={() => handleChangeTab('overview')}
        >
          Visão geral
        </TabsTrigger>
        <TabsTrigger
          value="settings"
          onClick={() => handleChangeTab('settings')}
        >
          Configurações
        </TabsTrigger>
      </TabsList>
      {children}
    </Tabs>
  );
}
