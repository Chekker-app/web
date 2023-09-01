import { Sidebar } from '@/components/Sidebar';
import '../styles/globals.css';
import type { Metadata } from 'next';
import { Roboto_Flex as Roboto } from 'next/font/google';
import { Navbar } from '@/components/Navbar';

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
        <main className="flex h-full w-full flex-1">
          <Sidebar />
          <div className="w-full bg-zinc-200  text-gray-600">
            <Navbar />
            <section className="p-5">{children}</section>
          </div>
        </main>
      </body>
    </html>
  );
}
