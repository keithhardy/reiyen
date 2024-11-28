'use server';

import { User } from '@prisma/client';
import { revalidatePath } from 'next/cache';

import { auth0Management } from '@/lib/auth0-management';
import { prisma } from '@/lib/prisma';
import { deleteFile } from '@/lib/vercel-blob';

export async function deleteUser(user: User): Promise<void> {
  try {
    await auth0Management.users.delete({
      id: user.auth0Id,
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
