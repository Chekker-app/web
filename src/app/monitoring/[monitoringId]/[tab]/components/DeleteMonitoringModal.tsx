import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface DeleteMonitoringModalProps {
  open: boolean;
  onClose: () => void;
  onDeleteMonitoring: () => Promise<void>;
  isLoadingDelete: boolean;
}

export function DeleteMonitoringModal({
  onClose,
  open,
  onDeleteMonitoring,
  isLoadingDelete,
}: DeleteMonitoringModalProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-zinc-900">
            Adicionar nova página
          </DialogTitle>
        </DialogHeader>
        <div className="mt-4 flex w-full flex-col gap-4">
          <p className="text-gray-400">
            Tem certeza que deseja excluir o site e todo seu monitoramento
            registrado? Esta ação é irreversível.
          </p>
        </div>

        <DialogFooter className="mt-4">
          <Button
            className="text-black"
            size="sm"
            variant="outline"
            onClick={onClose}
            disabled={isLoadingDelete}
          >
            Cancelar
          </Button>
          <Button
            size="sm"
            variant="destructive"
            onClick={onDeleteMonitoring}
            disabled={isLoadingDelete}
          >
            Excluir
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
