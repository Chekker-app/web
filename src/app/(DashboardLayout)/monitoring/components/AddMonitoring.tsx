import { Button } from '@/components/ui/button';
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
import { PlusIcon } from 'lucide-react';
import { FormEvent } from 'react';

export interface AddMonitoringProps {
  isOpenDialog: boolean;
  setIsOpenDialog: (state: boolean) => void;
  handleSubmit: (event: FormEvent<HTMLFormElement>) => void;
  isCreatingMonitoring: boolean;
}

export function AddMonitoring({
  isOpenDialog,
  setIsOpenDialog,
  handleSubmit,
  isCreatingMonitoring,
}: AddMonitoringProps) {
  return (
    <Dialog open={isOpenDialog} onOpenChange={setIsOpenDialog}>
      <DialogTrigger asChild className="flex justify-end">
        <Button size="sm">
          <PlusIcon className="mr-2" size={22} />
          Adicionar página
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Adicionar nova página</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="mt-4 flex w-full flex-col gap-4">
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="name">Nome</Label>
              <Input
                className="mt-1 "
                type="text"
                name="name"
                placeholder="Como você quer chamar este site?"
              />
            </div>

            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="url">Site</Label>
              <Input
                className="mt-1 "
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
  );
}
