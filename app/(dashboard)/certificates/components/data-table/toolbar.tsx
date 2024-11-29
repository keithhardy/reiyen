'use client';

import { certificateTypeNameMapping, statusNameMapping } from '@/lib/config';
import { Cross2Icon } from '@radix-ui/react-icons';
import { Table } from '@tanstack/react-table';

import { Button } from '@/components/ui/button';

import { FacetedFilter } from './faceted-filter';
import { ViewOptions } from './view-options';

interface ToolbarProps<TData> {
  table: Table<TData>;
}

export function Toolbar<TData>({ table }: ToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;

  // Client Options
  const clientColumn = table.getColumn('client');
  const clientOptions = clientColumn
    ? Array.from(clientColumn.getFacetedUniqueValues().entries()).map(
        ([value]) => ({
          label: String(value),
          value: String(value),
        })
      )
    : [];

  // Certificate Type Options
  const certificateTypeColumn = table.getColumn('certificateType');
  const certificateTypeOptions = certificateTypeColumn
    ? Array.from(certificateTypeColumn.getFacetedUniqueValues().entries()).map(
        ([value]) => ({
          label:
            certificateTypeNameMapping[
              value as keyof typeof certificateTypeNameMapping
            ] || String(value),
          value: String(value),
        })
      )
    : [];

  // Status Options
  const statusColumn = table.getColumn('status');
  const statusOptions = statusColumn
    ? Array.from(statusColumn.getFacetedUniqueValues().entries()).map(
        ([value]) => ({
          label:
            statusNameMapping[
              value as keyof typeof statusNameMapping
            ] || String(value),
          value: String(value),
        })
      )
    : [];

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        {/* Certificate Type Filter */}
        {certificateTypeColumn && (
          <FacetedFilter
            column={certificateTypeColumn}
            title="Type"
            options={certificateTypeOptions}
          />
        )}

        {/* Client Filter */}
        {clientColumn && (
          <FacetedFilter
            column={clientColumn}
            title="Client"
            options={clientOptions}
          />
        )}

        {/* Status Filter */}
        {statusColumn && (
          <FacetedFilter
            column={statusColumn}
            title="Status"
            options={statusOptions}
          />
        )}

        {/* Reset Button */}
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

      {/* View Options */}
      <ViewOptions table={table} />
    </div>
  );
}
