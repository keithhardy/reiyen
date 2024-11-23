'use server';

import { Address, Client } from '@prisma/client';
import { revalidatePath } from 'next/cache';

import { prisma } from '@/lib/prisma';

export async function updateClient(
  data: Client & { address: Address }
): Promise<Client> {
  try {
    const updatedClient = await prisma.client.update({
      where: {
        id: data.id,
      },
      data: {
        name: data.name,
        email: data.email,
        phone: data.phone,
        logoUrl: data.logoUrl,
        address: {
          update: {
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

    revalidatePath('/clients');

    return updatedClient;
  } catch {
    throw new Error('Client update failed');
  }
}
