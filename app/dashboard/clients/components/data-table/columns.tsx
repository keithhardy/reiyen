'use client';

import { Address, Client } from '@prisma/client';
import { ColumnDef } from '@tanstack/react-table';

import { RowActions } from '@/app/dashboard/clients/components/data-table/row-actions';

export const columns: ColumnDef<
  Client & {
    address: Address | null;
  }
>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
  },
  {
    accessorKey: 'email',
    header: 'Email',
  },
  {
    accessorKey: 'phone',
    header: 'Phone',
  },
  {
    accessorKey: 'address.streetAddress',
    header: 'Street Address',
  },
  {
    accessorKey: 'address.city',
    header: 'City',
  },
  {
    accessorKey: 'address.county',
    header: 'County',
  },
  {
    accessorKey: 'address.postTown',
    header: 'Post Town',
  },
  {
    accessorKey: 'address.postcode',
    header: 'Postcode',
  },
  {
    accessorKey: 'address.country',
    header: 'Country',
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      return <RowActions client={row.original} />;
    },
  },
];
