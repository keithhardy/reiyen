'use client';

import { ColumnHeader } from '@/app/(dashboard)/clients/components/data-table/column-header';
import { RowActions } from '@/app/(dashboard)/clients/components/data-table/row-actions';
import { Address, Client } from '@prisma/client';
import { ColumnDef } from '@tanstack/react-table';

export const columns: ColumnDef<
  Client & {
    address: Address | null;
  }
>[] = [
  {
    accessorKey: 'name',
    header: ({ column }) => <ColumnHeader column={column} title="Name" />,
  },
  {
    accessorKey: 'email',
    header: ({ column }) => <ColumnHeader column={column} title="Email" />,
  },
  {
    accessorKey: 'phone',
    header: ({ column }) => <ColumnHeader column={column} title="Phone" />,
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      return (
        <div className="text-right">
          <RowActions client={row.original} />
        </div>
      );
    },
  },
];
