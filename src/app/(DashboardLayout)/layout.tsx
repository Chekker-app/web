import { Analytics } from '@vercel/analytics/react';
import { Sidebar } from '@/components/Sidebar';
import { ReactNode } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';

interface DashboardLayoutProps {
  children: ReactNode;
}

export default async function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  return (
    <main className="flex h-full min-h-screen w-full flex-1 flex-wrap">
      <Sidebar />
      <div className="w-full flex-1 bg-primary-foreground">
        <ScrollArea className="h-[100vh]">
          <section className="px-5 py-10">{children}</section>
        </ScrollArea>
      </div>
      <Analytics />
    </main>
  );
}
