'use client';

import { Certificate, Client, Property } from '@prisma/client';
import { ColumnDef } from '@tanstack/react-table';

import { RowActions } from './row-actions';

export const columns: ColumnDef<
  Certificate & { property: Property & { client: Client } }
>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
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
    accessorKey: 'property.address.city',
    header: 'City',
  },
  {
    accessorKey: 'property.address.county',
    header: 'County',
  },
  {
    accessorKey: 'property.address.postTown',
    header: 'Post Town',
  },
  {
    accessorKey: 'property.address.postcode',
    header: 'Postcode',
  },
  {
    accessorKey: 'property.address.country',
    header: 'Country',
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      return <RowActions certificate={row.original} />;
    },
  },
];
