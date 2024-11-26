'use server';

import { revalidatePath } from 'next/cache';

import {
  auth0Management,
  User,
  waitForOperationInLogs,
} from '@/lib/auth0-management';

export async function createUser(user: Omit<User, 'user_id'>): Promise<User> {
  try {
    const { data: createdUser } = await auth0Management.users.create({
      connection: 'Username-Password-Authentication',
      name: user.name,
      email: user.email,
      password: user.password,
    });

    await waitForOperationInLogs({
      userId: createdUser.user_id,
      operationType: 'Create a User',
    });

    revalidatePath('/users');

    return createdUser;
  } catch {
    throw new Error('Failed to create user.');
  }
}
