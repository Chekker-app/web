import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { GeneralConfigs } from './components/General';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';

// pegar o máximo permitido por plano
// dividir por 100
// resultado multiplicar pela quantidade usada
// ex 5 páginas cadastradas = 100 / 5 = 20
// cadastrou 3 páginas = 20 / 3 = 60

export default function Settings() {
  return (
    <Tabs defaultValue="geral">
      <TabsList className="w-full items-start justify-start rounded-none border-b border-b-border">
        <TabsTrigger value="geral">Geral</TabsTrigger>
        <TabsTrigger value="billing">Cobrança e Assinatura</TabsTrigger>
      </TabsList>
      <TabsContent value="geral" className="mt-5">
        <GeneralConfigs />
      </TabsContent>
      <TabsContent value="billing" className="mt-5 space-y-5">
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
              <CardTitle className="text-sm font-medium">
                12 Mai, 2023
              </CardTitle>
            </div>

            <div className="space-y-1">
              <CardDescription className="font-medium">
                Próxima Cobrança
              </CardDescription>
              <CardTitle className="text-sm font-medium">
                12 Jun, 2023
              </CardTitle>
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
            <CardTitle className="text-xl">
              Resumo do uso em sua conta
            </CardTitle>
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
                <p>Status Pages</p>
                <p>1/1</p>
              </div>
              <Progress value={100} className="h-2.5 w-full" />
            </div>

            <div className="w-full space-y-2">
              <div className="flex justify-between">
                <p>Emails para atualizações</p>
                <p>2/3</p>
              </div>
              <Progress value={66.66} className="h-2.5 w-full" />
            </div>

            <div className="w-full space-y-2">
              <div className="flex justify-between">
                <p>Projetos</p>
                <p>1/3</p>
              </div>
              <Progress value={20} className="h-2.5 w-full" />
            </div>
          </CardContent>
        </Card>

        <Card className="m-auto w-full max-w-4xl border-b-border p-4 shadow-none">
          <CardHeader className="p-0">
            <CardTitle className="text-xl">Cobranças</CardTitle>
          </CardHeader>
          <CardContent className="p-0 py-2">
            <p>
              Você pode ver suas faturas e o histórico de cobranças passadas no
              seu portal de assinatura.
            </p>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
