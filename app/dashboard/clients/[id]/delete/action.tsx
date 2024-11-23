'use server';

import { Client } from '@prisma/client';
import { revalidatePath } from 'next/cache';

import { prisma } from '@/lib/prisma';
import { deleteFile } from '@/lib/vercel-blob';

export async function deleteClient(
  data: Pick<Client, 'id' | 'logoUrl'>
): Promise<void> {
  try {
    await prisma.client.delete({
      where: {
        id: data.id,
      },
    });

    if (data.logoUrl) {
      await deleteFile(data.logoUrl);
    }

    revalidatePath('/clients');
  } catch {
    throw new Error('Client update failed');
  }
}
