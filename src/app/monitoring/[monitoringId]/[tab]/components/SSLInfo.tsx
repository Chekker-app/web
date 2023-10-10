import { Card } from '@/components/ui/card';
import { Lock } from 'lucide-react';

export function SSLInfo() {
  return (
    <Card className="h-min border-b-border p-4 shadow-sm">
      <div className="flex items-center justify-between">
        <h1>Informações do SSL</h1>
        <Lock className="h-6 w-6 text-green-600" />
      </div>
      <div className="mt-2 space-y-2">
        <h3>
          Dias restantes:{' '}
          <span className="text-xl font-medium text-green-600">358</span>
        </h3>
        <div>
          <h3 className="font-medium">Válido para:</h3>
          <p className="font-light text-gray-300">
            {'["www.example.com", "example.com"]'}
          </p>
        </div>
        <div>
          <h3 className="font-medium">Data de ativação:</h3>
          <p className="font-light text-gray-300">09/10/2024</p>
        </div>
        <div>
          <h3 className="font-medium">Data de expiração:</h3>
          <p className="font-light text-gray-300">09/10/2024</p>
        </div>
      </div>
    </Card>
  );
}
