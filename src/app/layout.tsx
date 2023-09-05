import { Sidebar } from '@/components/Sidebar';
import '../styles/globals.css';
import type { Metadata } from 'next';
import { Roboto_Flex as Roboto } from 'next/font/google';
import { Toaster } from '@/components/ui/toaster';

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
        <main className="flex h-full min-h-screen w-full flex-1 flex-wrap">
          <Sidebar />
          <div className="w-full flex-1 bg-zinc-200 text-gray-600">
            <section className="px-5 py-10">{children}</section>
          </div>
          <Toaster />
        </main>
      </body>
    </html>
  );
}
