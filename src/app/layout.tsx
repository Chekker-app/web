import '../styles/globals.css';
import type { Metadata } from 'next';
import { Roboto_Flex as Roboto } from 'next/font/google';
import { Toaster } from '@/components/ui/toaster';
import { Providers } from './providers';

const roboto = Roboto({
  subsets: ['latin'],
  variable: '--font-roboto',
});

export const metadata: Metadata = {
  title: 'Chekker | Monitoramento de Páginas',
  description:
    'Chekker é a solução perfeita para monitorar a disponibilidade das suas páginas. Receba alertas instantâneos caso uma de suas páginas caia. Ganhe tempo centralizando o monitoramento de suas páginas em um só lugar com a Chekker.',
  icons: '/favicon.ico',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className={`${roboto.variable} font-sans text-gray-50`}>
        <Providers>
          {children}
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
