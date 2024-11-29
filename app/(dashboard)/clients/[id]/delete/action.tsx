'use server';

import { revalidatePath } from 'next/cache';

import { Schema } from '@/app/(dashboard)/clients/[id]/delete/schema';
import { prisma } from '@/lib/prisma';
import { deleteFile } from '@/lib/vercel-blob';
import { z } from 'zod';

export async function deleteClient(
  client: z.infer<typeof Schema>
): Promise<void> {
  try {
    await prisma.client.delete({
      where: {
        id: client.id,
      },
    });

    if (client.logoUrl) {
      await deleteFile(client.logoUrl);
    }

    revalidatePath('/clients');
  } catch {
    throw new Error('Client deletion failed');
  }
}
