import { Unlock, Lock } from 'lucide-react';
import { Badge } from '../ui/badge';

interface SSLBadgeProps {
  daysRemaining: number;
}

export function SSLBadge({ daysRemaining }: SSLBadgeProps) {
  function getSSLBadgeVariant() {
    if (daysRemaining <= 5) {
      return 'danger';
    } else if (daysRemaining > 5 && daysRemaining <= 30) {
      return 'warning';
    } else {
      return 'success';
    }
  }

  function getSSLBadgeText() {
    if (daysRemaining <= 0) {
      return 'Expirado';
    } else if (daysRemaining > 1 && daysRemaining <= 30) {
      return '05 Set';
    } else {
      return 'SSL Ativo';
    }
  }

  const badgeVariant = getSSLBadgeVariant();
  const sslText = getSSLBadgeText();
  const SslIcon = daysRemaining >= 0 ? Lock : Unlock;

  return (
    <Badge variant="outline" className="px-2 py-1" variantColor={badgeVariant}>
      <SslIcon className="mr-1 h-4 w-4" />
      <p className="text-xs font-medium">{sslText}</p>
    </Badge>
  );
}
