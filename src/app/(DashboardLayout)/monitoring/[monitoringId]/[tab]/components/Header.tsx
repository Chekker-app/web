import { StatusIndicator } from '@/components/StatusIndicator';
import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';

interface HeaderProps {
  status: 'up' | 'down' | null;
  name: string;
  url: string;
}

export function Header({ status, name, url }: HeaderProps) {
  return (
    <header>
      <Link href="/" className="rounded-lg">
        <Button
          variant="ghost"
          className="p-1 text-sm text-gray-300 hover:text-gray-300"
        >
          <ChevronLeft className="mr-1 h-5 w-5 text-gray-300" />
          Monitoramento
        </Button>
      </Link>
      <div className="mt-2 flex items-center gap-3">
        <StatusIndicator status={status} />
        <h1 className="text-3xl font-medium">{name}</h1>
        <p className="text-lg font-light text-gray-300">/</p>
        <p className="text-lg font-light text-gray-300">{url}</p>
      </div>
    </header>
  );
}
