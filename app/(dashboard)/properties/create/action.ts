'use server';

import { revalidatePath } from 'next/cache';

import { Schema } from '@/app/(dashboard)/properties/create/schema';
import { prisma } from '@/lib/prisma';
import { Property } from '@prisma/client';
import { z } from 'zod';

export async function createProperty(
  property: z.infer<typeof Schema>
): Promise<Property> {
  try {
    const createdProperty = await prisma.property.create({
      data: {
        uprn: property.uprn,
        occupier: property.occupier,
        client: {
          connect: { id: property.client.id },
        },
        address: {
          create: {
            streetAddress: property.address.streetAddress,
            city: property.address.city,
            county: property.address.county,
            postTown: property.address.postTown,
            postcode: property.address.postcode,
            country: property.address.country,
          },
        },
      },
    });

    revalidatePath('/properties');

    return createdProperty;
  } catch {
    throw new Error('Property creation failed');
  }
}
