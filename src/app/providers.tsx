'use client';
import { AuthContextProvider } from '@/context/AuthContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AuthContextProvider>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </AuthContextProvider>
  );
}
