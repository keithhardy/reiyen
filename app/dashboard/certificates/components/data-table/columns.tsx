'use client';

import { ColumnDef } from '@tanstack/react-table';

import { RowActions } from './row-actions';

type Client = {
  id: string;
  name: string;
  email: string;
  phone: string;
  logoUrl: string;
  addressId: string;
};

type Address = {
  id: string;
  streetAddress: string;
  city: string;
  county?: string | null;
  postTown: string;
  postcode: string;
  country: string;
};

type Property = {
  id: string;
  uprn: string;
  occupier: string;
  addressId: string;
  clientId: string;
  address: Address;
  client: Client;
};

type Certificate = {
  id: string;
  name: string;
  property: Property;
};

export const columns: ColumnDef<Certificate>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
  },
  {
    accessorKey: 'property.client.name',
    header: 'Client',
  },
  {
    accessorKey: 'property.address.streetAddress',
    header: 'Street Address',
  },
  {
    accessorKey: 'property.address.city',
    header: 'City',
  },
  {
    accessorKey: 'property.address.county',
    header: 'County',
  },
  {
    accessorKey: 'property.address.postTown',
    header: 'Post Town',
  },
  {
    accessorKey: 'property.address.postcode',
    header: 'Postcode',
  },
  {
    accessorKey: 'property.address.country',
    header: 'Country',
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      return <RowActions certificate={row.original} />;
    },
  },
];
