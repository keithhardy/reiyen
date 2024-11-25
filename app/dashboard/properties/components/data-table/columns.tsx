'use client';

import { Address, Client, Property } from '@prisma/client';
import { ColumnDef } from '@tanstack/react-table';
import { House } from 'lucide-react';

import { RowActions } from '@/app/dashboard/properties/components/data-table/row-actions';

export const columns: ColumnDef<
  Property & {
    address: Address | null;
    client: Client;
  }
>[] = [
  {
    accessorKey: 'uprn',
    header: 'UPRN',
    cell: ({ row }) => (
      <div className='flex items-center space-x-4'>
        <House className='min-h-6 min-w-6' />
        <div>
          <div className='font-medium'>
            {row.getValue('uprn')} – {row.original.client.name}
          </div>
          <div className='font-light text-muted-foreground'>
            {row.original.address?.streetAddress},{' '}
            {row.original.address?.postTown}, {row.original.address?.postcode}
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
          <RowActions property={row.original} />
        </div>
      );
    },
  },
];
