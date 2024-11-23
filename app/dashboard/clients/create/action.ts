'use server';

import { Address, Client } from '@prisma/client';
import { revalidatePath } from 'next/cache';

import { prisma } from '@/lib/prisma';
import { uploadFile } from '@/lib/vercel-blob';

export async function createClient(
  data: Omit<Client, 'id' | 'addressId'> & {
    address: Omit<Address, 'id'>;
  }
): Promise<Client> {
  try {
    let logoUrl = data.logoUrl;

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
        name: data.name,
        email: data.email,
        phone: data.phone,
        logoUrl: logoUrl,
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

    revalidatePath('/clients');

    return createdClient;
  } catch {
    throw new Error('Client update failed');
  }
}
