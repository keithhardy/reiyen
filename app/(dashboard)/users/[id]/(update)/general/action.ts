'use server';

import { User } from '@prisma/client';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';

import { Schema } from '@/app/(dashboard)/users/[id]/(update)/general/schema';
import { auth0Management } from '@/lib/auth0-management';
import { prisma } from '@/lib/prisma';
import { updateFile } from '@/lib/vercel-blob';

export async function updateUser(user: z.infer<typeof Schema>): Promise<User> {
  try {
    const currentUser = await prisma.user.findFirst({
      where: {
        id: user.id,
      },
    });

    let pictureUrl;
    try {
      pictureUrl = await updateFile(user.picture, currentUser?.picture, 'profile-picture');
    } catch {
      throw new Error('Failed to update user: Error updating file.');
    }

    await auth0Management.users.update(
      {
        id: user.auth0Id,
      },
      {
        name: user.name,
        email: user.email,
        picture: pictureUrl,
      }
    );

    const prismaUser = await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        email: user.email,
        name: user.name,
        picture: pictureUrl,
      },
    });

    revalidatePath('/users');

    return prismaUser;
  } catch {
    throw new Error('Failed to update user.');
  }
}
