'use server';

import { revalidatePath } from 'next/cache';

import { deleteFile } from '@/lib/vercel-blob';
import { auth0Management, User, waitForOperationInLogs } from '@/lib/auth0-management';

export async function deleteUser(user: User): Promise<void> {
  try {
    await auth0Management.users.delete({
      id: user.user_id,
    });
    if (user.picture && !user.picture.includes('auth0.com')) {
      await deleteFile(user.picture);
    }
    await waitForOperationInLogs({
      userId: user.user_id,
      operationType: 'Delete a User',
    });
    revalidatePath('/users');
  } catch {
    throw new Error('Failed to delete user.');
  }
}
