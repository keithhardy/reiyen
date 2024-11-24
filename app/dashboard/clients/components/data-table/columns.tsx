'use client';

import { ColumnDef } from '@tanstack/react-table';

import { RowActions } from '@/app/dashboard/clients/components/data-table/row-actions';

type Address = {
  id: string;
  streetAddress: string;
  city: string;
  county: string | null;
  postTown: string;
  postcode: string;
  country: string;
};

type Client = {
  id: string;
  name: string;
  email: string;
  phone: string;
  logoUrl: string;
  addressId: string;
  address: Address;
};

export const columns: ColumnDef<Client>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
  },
  {
    accessorKey: 'email',
    header: 'Email',
  },
  {
    accessorKey: 'phone',
    header: 'Phone',
  },
  {
    accessorKey: 'address.streetAddress',
    header: 'Street Address',
  },
  {
    accessorKey: 'address.city',
    header: 'City',
  },
  {
    accessorKey: 'address.county',
    header: 'County',
  },
  {
    accessorKey: 'address.postTown',
    header: 'Post Town',
  },
  {
    accessorKey: 'address.postcode',
    header: 'Postcode',
  },
  {
    accessorKey: 'address.country',
    header: 'Country',
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      return <RowActions client={row.original} />;
    },
  },
];
