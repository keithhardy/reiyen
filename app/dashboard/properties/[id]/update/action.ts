'use server';

import { Address, Client, Property } from '@prisma/client';
import { revalidatePath } from 'next/cache';

import { prisma } from '@/lib/prisma';

export async function updateProperty(
  data: Property & {
    address: Address;
    client: Client;
  }
): Promise<void> {
  const { id, address, client, ...propertyData } = data;

  await prisma.property.update({
    where: {
      id,
    },
    data: {
      uprn: propertyData.uprn,
      occupier: propertyData.occupier,
      client: {
        connect: { id: client.id },
      },
      address: {
        update: {
          streetAddress: address.streetAddress,
          city: address.city,
          county: address.county,
          postTown: address.postTown,
          postcode: address.postcode,
          country: address.country,
        },
      },
    },
  });

  revalidatePath('/properties');
}
