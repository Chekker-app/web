import { Card } from '@/components/ui/card';

export function MainInfo() {
  return (
    <Card className="grid grid-cols-[20%_35%_70%] border-b-border p-0 shadow-sm">
      <div className="space-y-1 border-r border-border p-4">
        <h1>Uptime</h1>
        <p className="text-sm text-gray-300">99.8%</p>
      </div>
      <div className="space-y-1 border-r border-border p-4">
        <h1>Ativo desde</h1>
        <p className="text-sm text-gray-300">09/10/2023 23:10:02</p>
      </div>
      <div className="space-y-1 p-4">
        <h1>Tempo médio de carregamento</h1>
        <p className="text-sm text-gray-300">1.3s</p>
      </div>
    </Card>
  );
}
