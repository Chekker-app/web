'use client';
import { PlusIcon } from 'lucide-react';
import { PageData } from './types';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useMonitoring } from './hooks/useMonitoring';
import { MonitoringItem } from './components/MonitoringItem';

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

export default function Pages() {
  const { isOpenDialog, setIsOpenDialog, isCreatingMonitoring, handleSubmit } =
    useMonitoring();

  return (
    <div className="px-20 py-6">
      <div className="flex justify-end">
        <Dialog open={isOpenDialog} onOpenChange={setIsOpenDialog}>
          <DialogTrigger asChild className="flex justify-end">
            <Button size="sm">
              <PlusIcon className="mr-2" size={22} />
              Adicionar página
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="text-zinc-900">
                Adicionar nova página
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit}>
              <div className="mt-4 flex w-full flex-col gap-4">
                <div className="grid w-full items-center gap-1.5">
                  <Label htmlFor="name" className="text-zinc-900">
                    Nome
                  </Label>
                  <Input
                    className="mt-1 text-zinc-900"
                    type="text"
                    name="name"
                    placeholder="Como você quer chamar este site?"
                  />
                </div>

                <div className="grid w-full items-center gap-1.5">
                  <Label htmlFor="url" className="text-zinc-900">
                    Site
                  </Label>
                  <Input
                    className="mt-1 text-zinc-900"
                    type="url"
                    name="url"
                    placeholder="Insira a URL"
                  />
                </div>
              </div>

              <DialogFooter className="mt-4">
                <Button type="submit" size="sm" disabled={isCreatingMonitoring}>
                  Adicionar
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      <div className="mt-6">
        <p className="text-md leading-tight text-zinc-800">
          Todos os {data.length} sistemas estão funcionando
        </p>
        <div className="mt-3 rounded-md border border-zinc-300">
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
            className="text-md flex w-full items-center gap-2 border-t border-zinc-300 px-7 py-5 hover:bg-zinc-300"
          >
            <PlusIcon size={22} />
            Adicionar novo
          </button>
        </div>
      </div>
    </div>
  );
}
