'use client';

import { ColumnDef } from '@tanstack/react-table';

import { RowActions } from './row-actions';

type Address = {
  id: string;
  streetAddress: string;
  city: string;
  county?: string | null;
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
};

type Property = {
  id: string;
  uprn: string;
  occupier: string;
  address: Address;
  client: Client;
};

export const columns: ColumnDef<Property>[] = [
  {
    accessorKey: 'client.name',
    header: 'Client',
  },
  {
    accessorKey: 'uprn',
    header: 'UPRN',
  },
  {
    accessorKey: 'occupier',
    header: 'Occupier',
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
      return <RowActions property={row.original} />;
    },
  },
];
