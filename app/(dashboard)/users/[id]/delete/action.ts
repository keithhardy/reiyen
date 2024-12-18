'use server';

import { revalidatePath } from 'next/cache';

import { Schema } from '@/app/(dashboard)/users/[id]/delete/schema';
import { auth0Management } from '@/lib/auth0-clients';
import { prisma } from '@/lib/prisma';
import { deleteFile } from '@/lib/vercel-blob';
import { z } from 'zod';

export async function deleteUser(user: z.infer<typeof Schema>): Promise<void> {
  try {
    await auth0Management.users.delete({
      id: user.auth0Id!,
    });

    if (user.picture) {
      await deleteFile(user.picture);
    }

    await prisma.user.delete({
      where: {
        id: user.id,
      },
    });

    revalidatePath('/users');
  } catch {
    throw new Error('Failed to delete user.');
  }
}
