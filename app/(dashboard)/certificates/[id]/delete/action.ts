'use server';

import { revalidatePath } from 'next/cache';

import { Schema } from '@/app/(dashboard)/certificates/[id]/delete/schema';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

export async function deleteCertificate(
  certificate: z.infer<typeof Schema>
): Promise<void> {
  try {
    await prisma.certificate.delete({
      where: {
        id: certificate.id,
      },
    });

    revalidatePath('/certificates');
  } catch {
    throw new Error('Certificate deletion failed');
  }
}
