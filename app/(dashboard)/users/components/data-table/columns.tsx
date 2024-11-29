'use client';

import { RowActions } from '@/app/(dashboard)/users/components/data-table/row-actions';
import { User } from '@prisma/client';
import { ColumnDef } from '@tanstack/react-table';

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
  },
  {
    accessorKey: 'email',
    header: 'Email',
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      return (
        <div className="text-right">
          <RowActions user={row.original} />
        </div>
      );
    },
  },
];
