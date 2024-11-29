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
    enableSorting: false
  },
  {
    accessorKey: 'property.client.name',
    id: 'client',
    header: ({ column }) => <ColumnHeader column={column} title='Client' />,
    filterFn: (row, id, value) => value.includes(row.getValue(id)),
    enableSorting: false,
  },
  {
    accessorKey: 'user.name',
    id: 'technician',
    header: ({ column }) => <ColumnHeader column={column} title='Technician' />,
    filterFn: (row, id, value) => value.includes(row.getValue(id)),
    enableSorting: false
  },
  {
    accessorKey: 'property.address.streetAddress',
    header: ({ column }) => <ColumnHeader column={column} title='Address' />,
  },
  {
    accessorKey: 'property.address.postcode',
    header: ({ column }) => <ColumnHeader column={column} title='Postcode' />,
  },
  {
    accessorKey: 'date',
    header: ({ column }) => <ColumnHeader column={column} title='Date' />,
    cell: ({ row }) => format(row.getValue('date'), 'dd/MM/yyyy'),
    filterFn: (row, id, value) => {
      const rowDate = new Date(row.getValue(id));

      const startDate = value?.from ? new Date(value.from) : null;
      const endDate = value?.to ? new Date(value.to) : null;

      if (!rowDate || isNaN(rowDate.getTime())) {
        return false;
      }

      if (startDate && endDate) {
        return rowDate >= startDate && rowDate <= endDate;
      }

      if (startDate) {
        return rowDate >= startDate;
      }

      if (endDate) {
        return rowDate <= endDate;
      }

      return true;
    },
  },
  {
    accessorKey: 'status',
    header: ({ column }) => <ColumnHeader column={column} title='Status' />,
    cell: ({ row }) => {
      return statusNameMapping[row.original.status];
    },
    filterFn: (row, id, value) => value.includes(row.getValue(id)),
    enableSorting: false
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
