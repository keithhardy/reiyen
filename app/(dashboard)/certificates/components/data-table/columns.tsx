'use client';

import { Certificate } from '@prisma/client';
import { ColumnDef } from '@tanstack/react-table';

import { certificateTypeNameMapping } from '@/lib/config';

import { RowActions } from './row-actions';

export const columns: ColumnDef<Certificate>[] = [
  {
    accessorKey: 'id',
    header: 'ID',
  },
  {
    accessorKey: 'certificateType',
    header: 'Type',
    cell: ({ row }) => {
      return certificateTypeNameMapping[row.original.certificateType];
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      return (
        <div className='text-right'>
          <RowActions certificate={row.original} />
        </div>
      );
    },
  },
];
