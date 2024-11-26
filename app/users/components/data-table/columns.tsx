'use client';

import { ColumnDef } from '@tanstack/react-table';
import Image from 'next/image';

import { RowActions } from '@/app/users/components/data-table/row-actions';
import { User } from '@/lib/auth0-management';

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
    cell: ({ row }) => (
      <div className='flex items-center space-x-4'>
        <Image
          src={row.original.picture || ''}
          width='64'
          height='64'
          alt='User picture'
          className='h-8 w-8 rounded-full'
        />
        <div>
          <div className='font-medium'>{row.getValue('name')}</div>
          <div className='font-light text-muted-foreground'>
            {row.original.email}
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
          <RowActions user={row.original} />
        </div>
      );
    },
  },
];
