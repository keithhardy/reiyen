'use server';

import { revalidatePath } from 'next/cache';

import { Schema } from '@/app/(dashboard)/clients/create/schema';
import { prisma } from '@/lib/prisma';
import { uploadFile } from '@/lib/vercel-blob';
import { Client } from '@prisma/client';
import { z } from 'zod';

export async function createClient(
  client: z.infer<typeof Schema>
): Promise<Client> {
  try {
    try {
      client.logoUrl = await uploadFile(client.logoUrl, 'certifictate');
    } catch {
      throw new Error('Client creation failed: Error uploading logo.');
    }

    const createdClient = await prisma.client.create({
      data: {
        name: client.name,
        email: client.email,
        phone: client.phone,
        logoUrl: client.logoUrl || '',
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
    throw new Error('Client creation failed');
  }
}
