'use server';

import { Address, Client } from '@prisma/client';
import { revalidatePath } from 'next/cache';

import { prisma } from '@/lib/prisma';
import { updateFile } from '@/lib/vercel-blob';

export async function updateClient(
  client: Client & { address: Address | null }
): Promise<Client> {
  try {
    const clientResponse = await prisma.client.findUnique({
      where: {
        id: client.id,
      },
    });
    const currentLogo = clientResponse?.logoUrl;

    let logoUrl;
    try {
      logoUrl = await updateFile(client.logoUrl, currentLogo, 'certifictate');
    } catch {
      throw new Error('Failed to create qualification: Error updating file.');
    }

    const updatedClient = await prisma.client.update({
      where: {
        id: client.id,
      },
      data: {
        name: client.name,
        email: client.email,
        phone: client.phone,
        logoUrl: logoUrl,
        address: {
          update: {
            id: client.address?.id,
            streetAddress: client.address?.streetAddress,
            city: client.address?.city,
            county: client.address?.county,
            postTown: client.address?.postTown,
            postcode: client.address?.postcode,
            country: client.address?.country,
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
