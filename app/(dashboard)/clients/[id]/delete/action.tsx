'use server';

import { revalidatePath } from 'next/cache';
import { z } from 'zod';

import { Schema } from '@/app/(dashboard)/clients/[id]/delete/schema';
import { prisma } from '@/lib/prisma';
import { deleteFile } from '@/lib/vercel-blob';

export async function deleteClient(client: z.infer<typeof Schema>): Promise<void> {
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
