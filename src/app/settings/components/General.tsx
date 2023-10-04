import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';

export function GeneralConfigs() {
  return (
    <div className="m-auto max-w-3xl rounded-md border border-b-border bg-background px-7 py-4">
      <div className="flex items-center justify-between">
        <div className="">
          <p className="font-semibold">
            Gostaria de receber relatórios semanais?
          </p>
        </div>
        <Checkbox id="reports" className="h-6 w-6 border-border" />
      </div>
      <Separator className="my-4 bg-zinc-400/40" />
      <div className="flex items-center justify-between">
        <div className="max-w-[250px]">
          <p className="font-semibold">Avatar</p>
        </div>
        <div className="flex w-full max-w-[320px]">
          <Avatar className="h-20 w-20">
            <AvatarImage src="https://github.com/fesilva-dev.png" />
            <AvatarFallback>FR</AvatarFallback>
          </Avatar>

          <div className="ml-6 flex items-center gap-3">
            <Button size="sm">Alterar avatar</Button>
            <Button
              size="sm"
              variant="ghost"
              className="text-red-500 hover:bg-transparent hover:text-red-700"
            >
              Remover
            </Button>
          </div>
        </div>
      </div>
      <Separator className="my-4 bg-zinc-400/40" />
      <div className="flex items-center justify-between">
        <div className="max-w-[250px]">
          <p className="font-semibold">Endereço de Email</p>
          <p className="mt-1 text-sm font-light text-zinc-600">
            Você receberá um link para confirmar seu novo email após alterá-lo.
          </p>
        </div>
        <div className="w-full max-w-[320px]">
          <Input placeholder="Insira seu email" className="bg-zinc-100" />
        </div>
      </div>
      <Separator className="my-4 bg-zinc-400/40" />
      <div className="flex items-center justify-between">
        <p className="font-semibold">Nome completo</p>
        <div className="w-full max-w-[320px]">
          <Input placeholder="Nome completo" className="bg-zinc-100" />
        </div>
      </div>
      <Separator className="my-8 bg-zinc-400/40" />
    </div>
  );
}
