'use server';

import { revalidatePath } from 'next/cache';

import {
  auth0Management,
  User,
  waitForOperationInLogs,
} from '@/lib/auth0-management';
import { updateFile } from '@/lib/vercel-blob';

export async function updateUser(user: User): Promise<User> {
  try {
    const userResponse = await auth0Management.users.get({ id: user.user_id });
    const currentPicture = userResponse.data.picture;

    let pictureUrl;
    try {
      pictureUrl = await updateFile(
        user.picture,
        currentPicture,
        'profile-picture'
      );
    } catch {
      throw new Error('Failed to update user: Error updating file.');
    }

    const { data: updatedUser } = await auth0Management.users.update(
      {
        id: user.user_id,
      },
      {
        name: user.name,
        email: user.email,
        picture: pictureUrl,
      }
    );

    await waitForOperationInLogs({
      userId: user.user_id,
      operationType: 'Update a User',
    });

    revalidatePath('/users');

    return updatedUser;
  } catch {
    throw new Error('Failed to update user.');
  }
}
