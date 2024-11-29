'use client';

import { certificateTypeNameMapping, statusNameMapping } from '@/lib/config';
import { Certificate } from '@prisma/client';
import { ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';

import { RowActions } from './row-actions';

export const columns: ColumnDef<Certificate>[] = [
  {
    accessorKey: 'date',
    header: 'Date',
    cell: ({ row }) => format(row.getValue('date'), 'MM/dd/yyyy'),
  },
  {
    accessorKey: 'certificateType',
    header: 'Type',
    cell: ({ row }) => {
      return certificateTypeNameMapping[row.original.certificateType];
    },
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      return statusNameMapping[row.original.status];
    },
  },
  {
    accessorKey: 'property.address.streetAddress',
    header: 'Property',
  },
  {
    accessorKey: 'property.client.name',
    header: 'Client',
  },
  {
    accessorKey: 'user.name',
    header: 'Technician',
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
