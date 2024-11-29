'use client';

import { ColumnHeader } from '@/app/(dashboard)/users/components/data-table/column-header';
import { RowActions } from '@/app/(dashboard)/users/components/data-table/row-actions';
import { User } from '@prisma/client';
import { ColumnDef } from '@tanstack/react-table';

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: 'name',
    header: ({ column }) => <ColumnHeader column={column} title="Name" />,
  },
  {
    accessorKey: 'email',
    header: ({ column }) => <ColumnHeader column={column} title="Email" />,
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
