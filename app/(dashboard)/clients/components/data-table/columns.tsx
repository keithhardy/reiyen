'use client';

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
