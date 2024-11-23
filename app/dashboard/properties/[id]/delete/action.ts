'use server';

import { Property } from '@prisma/client';
import { revalidatePath } from 'next/cache';

import { prisma } from '@/lib/prisma';

export async function deleteProperty(
  data: Pick<Property, 'id'>
): Promise<void> {
  try {
    await prisma.property.delete({
      where: {
        id: data.id,
      },
    });

    revalidatePath('/properties');
  } catch {
    throw new Error('Property update failed');
  }
}
