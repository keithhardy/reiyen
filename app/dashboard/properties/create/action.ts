'use server';

import { Address, Client, Property } from '@prisma/client';
import { revalidatePath } from 'next/cache';

import { prisma } from '@/lib/prisma';

export async function createProperty(
  property: Omit<Property, 'id' | 'addressId' | 'clientId'> & {
    address: Omit<Address, 'id' | 'propertyId'>;
    client: Pick<Client, 'id'>;
  }
): Promise<Property> {
  try {
    const createdProperty = await prisma.property.create({
      data: {
        uprn: property.uprn,
        occupier: property.occupier,
        client: {
          connect: { id: property.client.id },
        },
        address: {
          create: {
            streetAddress: property.address.streetAddress,
            city: property.address.city,
            county: property.address.county,
            postTown: property.address.postTown,
            postcode: property.address.postcode,
            country: property.address.country,
          },
        },
      },
    });

    revalidatePath('/properties');

    return createdProperty;
  } catch {
    throw new Error('Failed to create property.');
  }
}
