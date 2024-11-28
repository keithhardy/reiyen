'use server';

import { Property } from '@prisma/client';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';

import { Schema } from '@/app/(dashboard)/properties/create/schema';
import { prisma } from '@/lib/prisma';

export async function createProperty(property: z.infer<typeof Schema>): Promise<Property> {
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
