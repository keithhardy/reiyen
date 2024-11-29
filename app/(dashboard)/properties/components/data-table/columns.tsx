'use client';

import { ColumnHeader } from '@/app/(dashboard)/properties/components/data-table/column-header';
import { RowActions } from '@/app/(dashboard)/properties/components/data-table/row-actions';
import { Address, Client, Property } from '@prisma/client';
import { ColumnDef } from '@tanstack/react-table';

export const columns: ColumnDef<
  Property & {
    address: Address | null;
    client: Client;
  }
>[] = [
  {
    accessorKey: 'uprn',
    header: ({ column }) => <ColumnHeader column={column} title="UPRN" />,
  },
  {
    accessorKey: 'occupier',
    header: ({ column }) => <ColumnHeader column={column} title="Occupier" />,
    filterFn: (row, id, value) => value.includes(row.getValue(id)),
  },
  {
    accessorKey: 'client.name',
    id: 'client',
    header: ({ column }) => <ColumnHeader column={column} title="Client" />,
    filterFn: (row, id, value) => value.includes(row.getValue(id)),
  },
  {
    accessorKey: 'address.streetAddress',
    header: ({ column }) => <ColumnHeader column={column} title="Address" />,
  },
  {
    accessorKey: 'address.postcode',
    header: ({ column }) => <ColumnHeader column={column} title="Postcode" />,
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
