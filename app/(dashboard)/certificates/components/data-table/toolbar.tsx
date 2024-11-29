'use client';

import { Cross2Icon } from '@radix-ui/react-icons';
import { Table } from '@tanstack/react-table';

import { Button } from '@/components/ui/button';

import { ViewOptions } from './view-options';
import { FacetedFilter } from './faceted-filter';
import { certificateTypeNameMapping } from '@/lib/config';

interface ToolbarProps<TData> {
  table: Table<TData>;
}

const typeOptions = Object.entries(certificateTypeNameMapping).map(([key, value]) => ({
  label: value,
  value: key,
}))

export function Toolbar<TData>({ table }: ToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;

  return (
    <div className="flex items-center justify-between">
      {table.getColumn('certificateType') && <FacetedFilter column={table.getColumn('certificateType')} title='Type' options={typeOptions} />}
      
      <div className="flex flex-1 items-center space-x-2">
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <Cross2Icon className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
      <ViewOptions table={table} />
    </div>
  );
}
