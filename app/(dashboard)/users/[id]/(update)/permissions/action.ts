'use server';

import { Permission } from '@prisma/client';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';

import { Schema } from '@/app/(dashboard)/users/[id]/(update)/permissions/schema';
import { prisma } from '@/lib/prisma';

export async function addPermissions(data: z.infer<typeof Schema>) {
  try {
    await prisma.permission.createMany({
      data: data.permissions,
    });

    revalidatePath('users');
  } catch {
    throw new Error('Failed to add permissions. Please try again later.');
  }
}

export async function removePermission(permission: Omit<Permission, 'id'>) {
  try {
    await prisma.permission.delete({
      where: {
        userId_permission_clientId: {
          userId: permission.userId,
          clientId: permission.clientId || '',
          permission: permission.permission,
        },
      },
    });

    revalidatePath('users');
  } catch {
    throw new Error('Failed to remove permissions. Please try again later.');
  }
}

export async function removeClientPermissions(userId: string, clientId: string | null) {
  try {
    await prisma.permission.deleteMany({
      where: {
        userId,
        clientId,
      },
    });

    revalidatePath('users');
  } catch {
    throw new Error('Failed to remove permissions. Please try again later.');
  }
}
