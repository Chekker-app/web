'use client';
import { PlusIcon } from 'lucide-react';
import { PageData } from './types';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useMonitoring } from './hooks/useMonitoring';
import { MonitoringItem } from './components/MonitoringItem';
import { AddMonitoring } from './components/AddMonitoring';

const data: PageData[] = [
  {
    name: 'Protocolo gordura zero',
    url: 'https://protocologorduraz.online',
    status: 'up',
    id: '1231asf2eg',
    daysRemaining: 392,
  },
  {
    name: 'Protocolo estria morta',
    url: 'https://estriamorta.online',
    status: 'down',
    id: '9u8huh17',
    daysRemaining: 200,
  },
  {
    name: 'Coluna de ferro',
    url: 'https://colunadeferro.web',
    status: 'down',
    id: '7141gascyjd',
    daysRemaining: 50,
  },
  {
    name: 'Coluna de ferro',
    url: 'https://colunadeferro.web',
    status: 'down',
    id: '7141gascyjd',
    daysRemaining: 30,
  },
  {
    name: 'Coluna de ferro',
    url: 'https://colunadeferro.web',
    status: 'down',
    id: '7141gascyjd',
    daysRemaining: 31,
  },
  {
    name: 'Coluna de ferro',
    url: 'https://colunadeferro.web',
    status: 'down',
    id: '7141gascyjd',
    daysRemaining: 29,
  },
  {
    name: 'Coluna de ferro',
    url: 'https://colunadeferro.web',
    status: 'down',
    id: '7141gascyjd',
    daysRemaining: 20,
  },
  {
    name: 'Coluna de ferro',
    url: 'https://colunadeferro.web',
    status: 'down',
    id: '7141gascyjd',
    daysRemaining: 10,
  },
  {
    name: 'Coluna de ferro',
    url: 'https://colunadeferro.web',
    status: 'down',
    id: '7141gascyjd',
    daysRemaining: 5,
  },
  {
    name: 'Coluna de ferro',
    url: 'https://colunadeferro.web',
    status: 'down',
    id: '7141gascyjd',
    daysRemaining: 3,
  },
  {
    name: 'Coluna de ferro',
    url: 'https://colunadeferro.web',
    status: 'down',
    id: '7141gascyjd',
    daysRemaining: 1,
  },
  {
    name: 'Coluna de ferro',
    url: 'https://colunadeferro.web',
    status: 'down',
    id: '7141gascyjd',
    daysRemaining: 0,
  },
  {
    name: 'Coluna de ferro',
    url: 'https://colunadeferro.web',
    status: 'down',
    id: '7141gascyjd',
    daysRemaining: -10,
  },
  {
    name: 'Coluna de ferro',
    url: 'https://colunadeferro.web',
    status: 'down',
    id: '7141gascyjd',
    daysRemaining: 392,
  },
  {
    name: 'Coluna de ferro',
    url: 'https://colunadeferro.web',
    status: 'down',
    id: '7141gascyjd',
    daysRemaining: 392,
  },
];

export function MonitoringList() {
  const { isOpenDialog, setIsOpenDialog, isCreatingMonitoring, handleSubmit } =
    useMonitoring();

  return (
    <div className="px-20 py-6">
      <div className="flex justify-end">
        <AddMonitoring
          handleSubmit={handleSubmit}
          isCreatingMonitoring={isCreatingMonitoring}
          isOpenDialog={isOpenDialog}
          setIsOpenDialog={setIsOpenDialog}
        />
      </div>
      <div className="mt-6">
        <p className="text-md leading-tight text-zinc-800">
          Todos os {data.length} sistemas estão funcionando
        </p>
        <div className="mt-3 rounded-md border border-b-border">
          <ScrollArea className="h-[60vh]">
            {data.map((item, index) => {
              const isLastItemToRender = index + 1 === data.length;
              return (
                <MonitoringItem
                  key={item.id}
                  monitoringItemInfo={item}
                  isLastItemToRender={isLastItemToRender}
                />
              );
            })}
          </ScrollArea>
          <button
            onClick={() => setIsOpenDialog(true)}
            className="text-md flex w-full items-center gap-2 border-t border-b-border px-7 py-5 hover:bg-zinc-300"
          >
            <PlusIcon size={22} />
            Adicionar novo
          </button>
        </div>
      </div>
    </div>
  );
}
