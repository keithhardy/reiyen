'use client';

import { certificateTypeNameMapping, statusNameMapping } from '@/lib/config';
import { Cross2Icon } from '@radix-ui/react-icons';
import { Table } from '@tanstack/react-table';

import { Button } from '@/components/ui/button';
import { FacetedFilter } from './faceted-filter';
import { ViewOptions } from './view-options';
import { Input } from '@/components/ui/input';

interface ToolbarProps<TData> {
  table: Table<TData>;
}

export function Toolbar<TData>({ table }: ToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;

  const clientColumn = table.getColumn('client');
  const clientOptions = clientColumn
    ? Array.from(clientColumn.getFacetedUniqueValues().entries()).map(
        ([value]) => ({
          label: String(value),
          value: String(value),
        })
      )
    : [];

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

  // Technician column filter
  const technicianColumn = table.getColumn('technician');
  const technicianOptions = technicianColumn
    ? Array.from(
        technicianColumn.getFacetedUniqueValues().entries()
      ).map(([value]) => ({
        label: String(value),
        value: String(value),
      }))
    : [];

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Search..."
          value={(table.getState().globalFilter as string) ?? ''}
          onChange={(event) => table.setGlobalFilter(event.target.value)}
          className="h-8 w-[150px] border-dashed lg:w-[250px]"
        />

        {certificateTypeColumn && (
          <FacetedFilter
            column={certificateTypeColumn}
            title="Type"
            options={certificateTypeOptions}
          />
        )}

        {clientColumn && (
          <FacetedFilter
            column={clientColumn}
            title="Client"
            options={clientOptions}
          />
        )}

        {technicianColumn && (
          <FacetedFilter
            column={technicianColumn}
            title="Technician"
            options={technicianOptions}
          />
        )}

        {statusColumn && (
          <FacetedFilter
            column={statusColumn}
            title="Status"
            options={statusOptions}
          />
        )}

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
