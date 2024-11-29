'use client';

import { RowActions } from '@/app/(dashboard)/properties/components/data-table/row-actions';
import { Address, Client, Property } from '@prisma/client';
import { ColumnDef } from '@tanstack/react-table';
import { ColumnHeader } from '@/app/(dashboard)/properties/components/data-table/column-header';

export const columns: ColumnDef<
  Property & {
    address: Address | null;
    client: Client;
  }
>[] = [
  {
    accessorKey: 'uprn',
    header: ({ column }) => <ColumnHeader column={column} title='UPRN' />,
  },
  {
    accessorKey: 'occupier',
    header: ({ column }) => <ColumnHeader column={column} title='Occupier' />,
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
