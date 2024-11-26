'use server';

import { Client } from '@prisma/client';
import { revalidatePath } from 'next/cache';

import { prisma } from '@/lib/prisma';
import { deleteFile } from '@/lib/vercel-blob';

export async function deleteClient(client: Pick<Client, 'id' | 'logoUrl'>): Promise<void> {
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
