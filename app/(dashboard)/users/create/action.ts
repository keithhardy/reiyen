'use server';

import { User } from '@prisma/client';
import { revalidatePath } from 'next/cache';

import { auth0Management, User as Auth0User, waitForOperationInLogs } from '@/lib/auth0-management';
import { prisma } from '@/lib/prisma';

export async function createUser(user: Omit<Auth0User, 'user_id'>): Promise<User> {
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

    const prismaUser = await prisma.user.create({
      data: {
        auth0Id: createdUser.user_id,
        email: createdUser.email,
        name: createdUser.name,
        picture: createdUser.picture,
        preferences: {
          create: {
            position: '',
            signature: '',
          },
        },
      },
    });

    revalidatePath('/users');

    return prismaUser;
  } catch(error) {
    console.log(error)
    throw new Error('Failed to create user.');
  }
}
