'use server';

import { Address, Client, Property } from '@prisma/client';
import { revalidatePath } from 'next/cache';

import { prisma } from '@/lib/prisma';

export async function createProperty(
  data: Omit<Property, 'id' | 'addressId' | 'clientId'> & {
    address: Omit<Address, 'id' | 'propertyId'>;
    client: Pick<Client, 'id'>;
  }
): Promise<Property> {
  const createdProperty = await prisma.property.create({
    data: {
      uprn: data.uprn,
      occupier: data.occupier,
      client: {
        connect: { id: data.client.id },
      },
      address: {
        create: {
          streetAddress: data.address.streetAddress,
          city: data.address.city,
          county: data.address.county,
          postTown: data.address.postTown,
          postcode: data.address.postcode,
          country: data.address.country,
        },
      },
    },
  });

  revalidatePath('/properties');

  return createdProperty;
}
