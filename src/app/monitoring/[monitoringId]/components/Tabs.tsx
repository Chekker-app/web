'use client';

import { usePathname } from 'next/navigation';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ReactNode } from 'react';

interface MonitoringDetailsTabs {
  children: ReactNode;
}

export function MonitoringDetailsTabs({ children }: MonitoringDetailsTabs) {
  const pathname = usePathname();

  function handleChangeTab(tab: string) {
    window.history.pushState(null, '', `${pathname}/${tab}`);
  }

  return (
    <Tabs defaultValue="overview">
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
