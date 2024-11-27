'use server';

import { User } from '@prisma/client';
import { revalidatePath } from 'next/cache';

import { auth0Management, waitForOperationInLogs } from '@/lib/auth0-management';
import { prisma } from '@/lib/prisma';
import { updateFile } from '@/lib/vercel-blob';

export async function updateUser(user: User): Promise<User> {
  console.log(user)

  try {
    const userResponse = await auth0Management.users.get({ id: user.auth0Id });
    const currentPicture = userResponse.data.picture;

    let pictureUrl;
    try {
      pictureUrl = await updateFile(user.picture, currentPicture, 'profile-picture');
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

    await waitForOperationInLogs({
      userId: user.auth0Id,
      operationType: 'Update a User',
    });

    const prismaUser = await prisma.user.update({
      where: {
        id: user.id
      },
      data: {
        email: user.email,
        name: user.name,
        picture: user.picture,
      }
    })

    revalidatePath('/users');

    return prismaUser;
  } catch(error) {
    console.log(error)
    throw new Error('Failed to update user.');
  }
}
