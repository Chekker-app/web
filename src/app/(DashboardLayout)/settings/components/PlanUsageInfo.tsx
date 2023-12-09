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
import { useAuth } from '@/context/AuthContext';

export function PlanUsageInfo() {
  const { user } = useAuth();
  return (
    <>
      <Card className="m-auto w-full max-w-4xl border-b-border p-4 shadow-none">
        <CardHeader className="p-0">
          <CardDescription className="font-medium">
            Detalhes do plano
          </CardDescription>
          <CardTitle className="text-xl">{user?.Plan?.name} (Mensal)</CardTitle>
        </CardHeader>
        <CardFooter className="justify-end p-0">
          <a href="https://chekker.com.br" target="_blank" rel="noreferrer">
            <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
              Atualizar Assinatura
            </Button>
          </a>
        </CardFooter>
      </Card>

      <Card className="m-auto w-full max-w-4xl border-b-border p-4 shadow-none">
        <CardHeader className="p-0">
          <CardTitle className="text-xl">Resumo do uso em sua conta</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-5 px-0 py-5">
          <div className="w-full space-y-2">
            <div className="flex justify-between">
              <p>Páginas Monitoradas</p>
              <p>
                {user?.Subscription?.monitorings}/{user?.Plan?.monitorings}
              </p>
            </div>
            <Progress
              value={
                (100 / user?.Plan?.monitorings) *
                user?.Subscription?.monitorings
              }
              className="h-2.5 w-full"
            />
          </div>

          <div className="w-full space-y-2">
            <div className="flex justify-between">
              <p>Testes automáticos realizados</p>
              <p>
                {user?.Subscription?.performanceTests}/
                {user?.Plan?.performanceTests}
              </p>
            </div>
            <Progress
              value={
                (100 / user?.Plan?.performanceTests) *
                user?.Subscription?.performanceTests
              }
              className="h-2.5 w-full"
            />
          </div>

          <div className="w-full space-y-2">
            <div className="flex justify-between">
              <p>Emails para atualizações</p>
              <p>
                {user?.Subscription?.usedEmails}/
                {user?.Plan?.quantityEmailsAllowed}
              </p>
            </div>
            <Progress
              value={
                (100 / user?.Plan?.quantityEmailsAllowed) *
                user?.Subscription?.usedEmails
              }
              className="h-2.5 w-full"
            />
          </div>
        </CardContent>
      </Card>
    </>
  );
}
