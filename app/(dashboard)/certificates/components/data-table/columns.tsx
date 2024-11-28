'use client';

import { Certificate } from '@prisma/client';
import { ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';

import { certificateTypeNameMapping } from '@/lib/config';

import { RowActions } from './row-actions';

export const columns: ColumnDef<Certificate>[] = [
  {
    accessorKey: 'property.client.name',
    header: 'Client',
  },
  {
    accessorKey: 'certificateType',
    header: 'Type',
    cell: ({ row }) => {
      return certificateTypeNameMapping[row.original.certificateType];
    },
  },
  {
    accessorKey: 'property.address.streetAddress',
    header: 'Address',
  },
  {
    accessorKey: 'property.address.postcode',
    header: 'Postcode',
  },
  {
    accessorKey: 'technicianId',
    header: 'Technician',
  },
  {
    accessorKey: 'date',
    header: 'Date',
    cell: ({ row }) => format(row.getValue('date'), 'MM/dd/yyyy'),
  },
  {
    accessorKey: 'status',
    header: 'Status',
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
