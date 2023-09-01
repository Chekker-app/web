'use client';

import { Routes } from '@/routes';
import { usePathname } from 'next/navigation';

export function ActivePage() {
  const path = usePathname();

  const currentPage = Routes[path as keyof typeof Routes];
  return <h1 className="text-2xl font-medium text-zinc-50">{currentPage}</h1>;
}
