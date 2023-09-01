'use client';

import { ColumnDef } from '@tanstack/react-table';
import { PageData, PageStatusEnum } from './types';
import { Badge } from '@/components/ui/badge';

export const columns: ColumnDef<PageData>[] = [
  {
    accessorKey: 'name',
    header: 'Nome',
  },
  {
    accessorKey: 'url',
    header: 'URL',
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      const currentStatus: keyof typeof PageStatusEnum = row.getValue('status');
      const variant = currentStatus === 'up' ? 'success' : 'destructive';
      return <Badge variant={variant}>{PageStatusEnum[currentStatus]}</Badge>;
    },
  },
];
