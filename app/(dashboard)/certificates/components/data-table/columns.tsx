'use client';

import { certificateTypeNameMapping, statusNameMapping } from '@/lib/config';
import { Certificate } from '@prisma/client';
import { ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';

import { RowActions } from './row-actions';
import { ColumnHeader } from './column-header';

export const columns: ColumnDef<Certificate>[] = [
  {
    accessorKey: 'certificateType',
    header: ({ column }) => <ColumnHeader column={column} title='Type' />,
    cell: ({ row }) => {
      return certificateTypeNameMapping[row.original.certificateType];
    },
    filterFn: (row, id, value) => value.includes(row.getValue(id)),
  },
  {
    accessorKey: 'status',
    header: ({ column }) => <ColumnHeader column={column} title='Status' />,
    cell: ({ row }) => {
      return statusNameMapping[row.original.status];
    },
  },
  {
    accessorKey: 'date',
    header: ({ column }) => <ColumnHeader column={column} title='Date' />,
    cell: ({ row }) => format(row.getValue('date'), 'dd/MM/yyyy'),
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      return (
        <div className="text-right">
          <RowActions certificate={row.original} />
        </div>
      );
    },
  },
];
