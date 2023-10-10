import { StatusIndicator } from '@/components/StatusIndicator';
import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';

export function Header() {
  return (
    <header>
      <Link href="/" className="rounded-lg hover:bg-zinc-100">
        <Button
          variant="ghost"
          className="px-1 text-sm text-gray-300 hover:text-gray-300"
        >
          <ChevronLeft className="mr-1 h-5 w-5 text-gray-300" />
          Monitoramento
        </Button>
      </Link>
      <div className="flex items-center gap-3">
        <StatusIndicator />
        <h1 className="text-3xl font-medium">Meu Site</h1>
        <p className="text-lg font-light text-gray-300">/</p>
        <p className="text-lg font-light text-gray-300">meusitelindo.com.br</p>
      </div>
    </header>
  );
}
