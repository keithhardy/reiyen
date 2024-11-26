'use server';

import { Address, Client, Property } from '@prisma/client';
import { revalidatePath } from 'next/cache';

import { prisma } from '@/lib/prisma';

export async function updateProperty(
  property: Property & {
    address: Address | null;
    client: Client;
  }
): Promise<void> {
  try {
    await prisma.property.update({
      where: {
        id: property.id,
      },
      data: {
        uprn: property.uprn,
        occupier: property.occupier,
        client: {
          connect: { id: property.client.id },
        },
        address: {
          update: {
            streetAddress: property.address?.streetAddress,
            city: property.address?.city,
            county: property.address?.county,
            postTown: property.address?.postTown,
            postcode: property.address?.postcode,
            country: property.address?.country,
          },
        },
      },
    });

    revalidatePath('/properties');
  } catch {
    throw new Error('Failed to update property.');
  }
}
