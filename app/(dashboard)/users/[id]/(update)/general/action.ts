'use server';

import { revalidatePath } from 'next/cache';

import { Schema } from '@/app/(dashboard)/users/[id]/(update)/general/schema';
import { auth0Management } from '@/lib/auth0-clients';
import { prisma } from '@/lib/prisma';
import { updateFile } from '@/lib/vercel-blob';
import { User } from '@prisma/client';
import { z } from 'zod';

export async function updateUser(user: z.infer<typeof Schema>): Promise<User> {
  try {
    const currentUser = await prisma.user.findFirst({
      where: {
        id: user.id,
      },
    });

    try {
      user.picture = await updateFile(
        user.picture,
        currentUser?.picture,
        'profile-picture'
      );
    } catch {
      throw new Error('User update failed: Error updating file.');
    }

    await auth0Management.users.update(
      {
        id: user.auth0Id,
      },
      {
        name: user.name,
        email: user.email,
        picture: user.picture,
      }
    );

    const prismaUser = await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        email: user.email,
        name: user.name,
        picture: user.picture,
      },
    });

    revalidatePath('/users');
    return prismaUser;
  } catch {
    throw new Error('User update failed.');
  }
}
