'use client';

import { RowActions } from '@/app/(dashboard)/properties/components/data-table/row-actions';
import { Address, Client, Property } from '@prisma/client';
import { ColumnDef } from '@tanstack/react-table';

export const columns: ColumnDef<
  Property & {
    address: Address;
    client: Client;
  }
>[] = [
  {
    accessorKey: 'uprn',
    header: 'UPRN',
  },
  {
    accessorKey: 'occupier',
    header: 'Occupier',
  },
  {
    accessorKey: 'client.name',
    header: 'Client',
  },
  {
    accessorKey: 'address.streetAddress',
    header: 'Address',
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      return (
        <div className="text-right">
          <RowActions property={row.original} />
        </div>
      );
    },
  },
];
