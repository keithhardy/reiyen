'use client';

import { Certificate, Client, Property } from '@prisma/client';
import { ColumnDef } from '@tanstack/react-table';

import { RowActions } from './row-actions';

export const columns: ColumnDef<
  Certificate & { property: Property & { client: Client } }
>[] = [
  {
    accessorKey: 'type',
    header: 'Type',
  },
  {
    accessorKey: 'property.client.name',
    header: 'Client',
  },
  {
    accessorKey: 'property.address.streetAddress',
    header: 'Street Address',
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      return <RowActions certificate={row.original} />;
    },
  },
];
