'use client';

import { Address, Client } from '@prisma/client';
import { ColumnDef } from '@tanstack/react-table';
import { Building2 } from 'lucide-react';

import { RowActions } from '@/app/dashboard/clients/components/data-table/row-actions';

export const columns: ColumnDef<
  Client & {
    address: Address | null;
  }
>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
    cell: ({ row }) => (
      <div className='flex items-center space-x-4'>
        <Building2 className='min-h-6 min-w-6 text-muted-foreground' />
        <div>
          <div className='font-medium'>{row.getValue('name')}</div>
          <div className='font-light text-muted-foreground'>
            {row.original.email} – {row.original.phone}
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      return (
        <div className='text-right'>
          <RowActions client={row.original} />
        </div>
      );
    },
  },
];
