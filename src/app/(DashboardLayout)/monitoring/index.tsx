'use client';
import { PlusIcon } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useMonitoring } from './hooks/useMonitoring';
import { MonitoringItem } from './components/MonitoringItem';
import { AddMonitoring } from './components/AddMonitoring';
import { MonitoringSkeleton } from './components/MonitoringSkeleton';
import { DeleteMonitoringModal } from './[monitoringId]/[tab]/components/DeleteMonitoringModal';

export function MonitoringList() {
  const {
    monitorings,
    isLoadingMonitorings,
    isOpenDialog,
    setIsOpenDialog,
    isCreatingMonitoring,
    handleSubmit,
    monitoringToDelete,
    setMonitoringToDelete,
    deleteMonitoringInfo,
    isLoadingDelete,
  } = useMonitoring();

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
        {!isLoadingMonitorings && (
          <p className="text-md leading-tight">
            Quantidade de páginas sendo monitoradas: {monitorings.length}
          </p>
        )}
        <div className="mt-3 rounded-md border border-b-border">
          {isLoadingMonitorings ? (
            <>
              <MonitoringSkeleton />
              <MonitoringSkeleton />
              <MonitoringSkeleton />
              <MonitoringSkeleton />
            </>
          ) : (
            <ScrollArea>
              {monitorings.map((item, index) => {
                const isLastItemToRender = index + 1 === monitorings.length;
                return (
                  <MonitoringItem
                    key={item.id}
                    monitoringItemInfo={item}
                    isLastItemToRender={isLastItemToRender}
                    onDeleteMonitoring={(id) => setMonitoringToDelete(id)}
                  />
                );
              })}
            </ScrollArea>
          )}
          <button
            onClick={() => setIsOpenDialog(true)}
            className={`text-md flex w-full items-center gap-2 ${
              monitorings.length > 0 && 'border-t'
            } border-b-border px-7 py-5 hover:bg-muted`}
          >
            <PlusIcon size={22} />
            Adicionar nova
          </button>
        </div>
      </div>
      <DeleteMonitoringModal
        open={Boolean(monitoringToDelete)}
        onClose={() => setMonitoringToDelete(null)}
        onDeleteMonitoring={deleteMonitoringInfo}
        isLoadingDelete={isLoadingDelete}
      />
    </div>
  );
}
