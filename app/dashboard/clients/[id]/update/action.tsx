'use server';

import { Address, Client } from '@prisma/client';
import { revalidatePath } from 'next/cache';

import { prisma } from '@/lib/prisma';

export async function updateClient(
  client: Client & { address: Address }
): Promise<Client> {
  try {
    const updatedClient = await prisma.client.update({
      where: {
        id: client.id,
      },
      data: {
        name: client.name,
        email: client.email,
        phone: client.phone,
        logoUrl: client.logoUrl,
        address: {
          update: {
            streetAddress: client.address.streetAddress,
            city: client.address.city,
            county: client.address.county,
            postTown: client.address.postTown,
            postcode: client.address.postcode,
            country: client.address.country,
          },
        },
      },
    });

    revalidatePath('/clients');

    return updatedClient;
  } catch {
    throw new Error('Client update failed');
  }
}
