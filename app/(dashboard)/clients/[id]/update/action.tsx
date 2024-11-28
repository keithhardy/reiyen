'use server';

import { Client } from '@prisma/client';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';

import { Schema } from '@/app/(dashboard)/clients/[id]/update/schema';
import { prisma } from '@/lib/prisma';
import { updateFile } from '@/lib/vercel-blob';

export async function updateClient(client: z.infer<typeof Schema>): Promise<Client> {
  try {
    const clientResponse = await prisma.client.findUnique({
      where: {
        id: client.id,
      },
    });

    try {
      client.logoUrl = await updateFile(client.logoUrl, clientResponse?.logoUrl, 'certifictate');
    } catch {
      throw new Error('Client update failed: Error updating logo.');
    }

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
