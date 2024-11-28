'use server';

import { User } from '@prisma/client';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';

import { Schema } from '@/app/(dashboard)/users/create/schema';
import { auth0Management } from '@/lib/auth0-management';
import { prisma } from '@/lib/prisma';

export async function createUser(user: z.infer<typeof Schema>): Promise<User> {
  try {
    const { data: createdUser } = await auth0Management.users.create({
      connection: 'Username-Password-Authentication',
      name: user.name,
      email: user.email,
      password: user.password,
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
  } catch {
    throw new Error('Failed to create user.');
  }
}
