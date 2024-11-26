'use client';

import { Certificate, Client, Property } from '@prisma/client';
import { ColumnDef } from '@tanstack/react-table';

import { certificateTypeOptions } from '@/lib/config';

import { RowActions } from './row-actions';

export const columns: ColumnDef<
  Certificate & { property: Property & { client: Client } }
>[] = [
  {
    accessorKey: 'property.client.name',
    header: 'Client',
  },
  {
    accessorKey: 'property.address.streetAddress',
    header: 'Street Address',
  },
  {
    accessorKey: 'type',
    header: 'Type',
    cell: ({ row }) => {
      const value = row.getValue('type');
      const option = certificateTypeOptions.find((opt) => opt.value === value);
      return option?.label || value;
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      return <RowActions certificate={row.original} />;
    },
  },
];
