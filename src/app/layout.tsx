import { Sidebar } from '@/components/Sidebar';
import '../styles/globals.css';
import type { Metadata } from 'next';
import { Roboto_Flex as Roboto } from 'next/font/google';
import { Toaster } from '@/components/ui/toaster';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Providers } from './providers';

const roboto = Roboto({
  subsets: ['latin'],
  variable: '--font-roboto',
});

export const metadata: Metadata = {
  title: 'PageCheck',
  description: 'Check if your page is up',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className={`${roboto.variable} font-sans text-gray-50`}>
        <Providers>
          <main className="flex h-full min-h-screen w-full flex-1 flex-wrap">
            <Sidebar />
            <div className="w-full flex-1 bg-primary-foreground text-gray-600">
              <ScrollArea className="h-[100vh]">
                <section className="px-5 py-10">{children}</section>
              </ScrollArea>
            </div>
            <Toaster />
          </main>
        </Providers>
      </body>
    </html>
  );
}
