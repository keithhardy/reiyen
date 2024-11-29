'use server';

import { revalidatePath } from 'next/cache';

import { Schema } from '@/app/(dashboard)/properties/[id]/delete/schema';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

export async function deleteProperty(
  property: z.infer<typeof Schema>
): Promise<void> {
  try {
    await prisma.property.delete({
      where: {
        id: property.id,
      },
    });

    revalidatePath('/properties');
  } catch {
    throw new Error('Property deletion failed');
  }
}
