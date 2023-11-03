import { Button } from '@/components/ui/button';
import {
  CardHeader,
  CardDescription,
  CardTitle,
  CardContent,
  CardFooter,
  Card,
} from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

export function PlanUsageInfo() {
  return (
    <>
      <Card className="m-auto w-full max-w-4xl border-b-border p-4 shadow-none">
        <CardHeader className="p-0">
          <CardDescription className="font-medium">
            Detalhes do plano
          </CardDescription>
          <CardTitle className="text-xl">Básico (Mensal)</CardTitle>
        </CardHeader>
        <CardContent className="flex items-center gap-16 px-0 py-5">
          <div className="space-y-1">
            <CardDescription className="font-medium">Início</CardDescription>
            <CardTitle className="text-sm font-medium">12 Mai, 2023</CardTitle>
          </div>

          <div className="space-y-1">
            <CardDescription className="font-medium">
              Próxima Cobrança
            </CardDescription>
            <CardTitle className="text-sm font-medium">12 Jun, 2023</CardTitle>
          </div>

          <div className="space-y-1">
            <CardDescription className="font-medium">
              Valor da Próxima Cobrança
            </CardDescription>
            <CardTitle className="text-sm font-medium">R$ 23,00</CardTitle>
          </div>
        </CardContent>
        <CardFooter className="justify-end gap-6 p-0">
          <Button
            variant="ghost"
            className="p-0 text-red-500 hover:bg-transparent hover:text-red-700"
            size="sm"
          >
            Cancelar Assinatura
          </Button>
          <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
            Atualizar Assinatura
          </Button>
        </CardFooter>
      </Card>

      <Card className="m-auto w-full max-w-4xl border-b-border p-4 shadow-none">
        <CardHeader className="p-0">
          <CardTitle className="text-xl">Resumo do uso em sua conta</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-5 px-0 py-5">
          <div className="w-full space-y-2">
            <div className="flex justify-between">
              <p>Sites Monitorados</p>
              <p>3/5</p>
            </div>
            <Progress value={60} className="h-2.5 w-full" />
          </div>

          <div className="w-full space-y-2">
            <div className="flex justify-between">
              <p>Testes realizados</p>
              <p>7/20</p>
            </div>
            <Progress value={35} className="h-2.5 w-full" />
          </div>

          <div className="w-full space-y-2">
            <div className="flex justify-between">
              <p>Emails para atualizações</p>
              <p>2/3</p>
            </div>
            <Progress value={66.66} className="h-2.5 w-full" />
          </div>
        </CardContent>
      </Card>
    </>
  );
}
