'use client';

import { Address, Client, Property } from '@prisma/client';
import { ColumnDef } from '@tanstack/react-table';

import { RowActions } from '@/app/dashboard/properties/components/data-table/row-actions';

export const columns: ColumnDef<
  Property & {
    address: Address;
    client: Client;
  }
>[] = [
  {
    accessorKey: 'client.name',
    header: 'Client',
  },
  {
    accessorKey: 'uprn',
    header: 'UPRN',
  },
  {
    accessorKey: 'occupier',
    header: 'Occupier',
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
      return <RowActions property={row.original} />;
    },
  },
];
