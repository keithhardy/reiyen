'use server';

import { revalidatePath } from 'next/cache';
import { z } from 'zod';

import { Schema } from '@/app/(dashboard)/properties/[id]/update/schema';
import { prisma } from '@/lib/prisma';

export async function updateProperty(property: z.infer<typeof Schema>): Promise<void> {
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
