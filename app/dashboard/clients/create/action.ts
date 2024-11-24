'use server';

import { Address, Client } from '@prisma/client';
import { revalidatePath } from 'next/cache';

import { prisma } from '@/lib/prisma';
import { uploadFile } from '@/lib/vercel-blob';

export async function createClient(
  client: Omit<Client, 'id' | 'addressId'> & {
    address: Omit<Address, 'id'>;
  }
): Promise<Client> {
  try {
    let logoUrl = client.logoUrl;

    try {
      if (logoUrl) {
        const fileName = `logo-${Date.now()}.png`;
        logoUrl = await uploadFile(logoUrl, fileName);
      }
    } catch {
      throw new Error('Failed to create client: Error updating file.');
    }

    const createdClient = await prisma.client.create({
      data: {
        name: client.name,
        email: client.email,
        phone: client.phone,
        logoUrl: logoUrl,
        address: {
          create: {
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

    return createdClient;
  } catch {
    throw new Error('Client update failed');
  }
}
