'use client';

import { ColumnDef } from '@tanstack/react-table';
import Image from 'next/image';

import { RowActions } from '@/app/dashboard/users/components/data-table/row-actions';
import { User } from '@/lib/auth0-management';

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: 'picture',
    header: 'Picture',
    cell: ({ row }) => <Image src={row.getValue('picture')} width={30} height={0} alt='User picture' className='rounded-full' />,
  },
  {
    accessorKey: 'name',
    header: 'Name',
  },
  {
    accessorKey: 'email',
    header: 'Email',
  },
  {
    accessorKey: 'logins_count',
    header: 'Logins Count',
    cell: ({ row }) => (row.getValue('logins_count') ? row.getValue('logins_count') : '-'),
  },
  {
    accessorKey: 'last_login',
    header: 'Last Login',
    cell: ({ row }) => (row.getValue('last_login') ? new Date(row.getValue('last_login')).toLocaleDateString('en-GB') : '-'),
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      return <RowActions user={row.original} />;
    },
  },
];
