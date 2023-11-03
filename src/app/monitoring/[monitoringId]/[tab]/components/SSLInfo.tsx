import { IMonitoringDetails } from '@/app/monitoring/types';
import { Card } from '@/components/ui/card';
import { Lock, Unlock } from 'lucide-react';
import { useMemo } from 'react';

interface SSLInfoProps {
  monitoringDetails?: IMonitoringDetails | null;
}

export function SSLInfo({ monitoringDetails }: SSLInfoProps) {
  const daysRemaining = monitoringDetails?.sslDaysRemaining ?? 0;
  const SslIcon = daysRemaining >= 0 ? Lock : Unlock;
  const sslInfoColor = useMemo(() => {
    if (daysRemaining <= 5) {
      return 'text-red-500';
    }

    if (daysRemaining > 5 && daysRemaining <= 30) {
      return 'text-orange-400';
    }

    return 'text-green-600';
  }, [daysRemaining]);

  return (
    <Card className="h-min border-b-border p-4 shadow-sm">
      <div className="flex items-center justify-between">
        <h1>Informações do SSL</h1>
        <SslIcon className={`h-6 w-6 ${sslInfoColor}`} />
      </div>
      <div className="mt-2 space-y-2">
        <h3>
          Dias restantes:{' '}
          <span className={`text-xl font-medium ${sslInfoColor}`}>
            {monitoringDetails?.sslDaysRemaining}
          </span>
        </h3>
        <div>
          <h3 className="font-medium">Válido para:</h3>
          {monitoringDetails?.sslValidForDomains.split(',').map((domain) => (
            <p key={domain} className="font-light text-gray-300">
              {domain}
            </p>
          ))}
        </div>
        <div>
          <h3 className="font-medium">Data de ativação:</h3>
          <p className="font-light text-gray-300">
            {monitoringDetails?.sslValidFrom}
          </p>
        </div>
        <div>
          <h3 className="font-medium">Data de expiração:</h3>
          <p className="font-light text-gray-300">
            {monitoringDetails?.sslValidTo}
          </p>
        </div>
      </div>
    </Card>
  );
}
