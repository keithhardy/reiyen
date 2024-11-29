'use server';

import { revalidatePath } from 'next/cache';

import { Schema } from '@/app/(dashboard)/users/[id]/(update)/permissions/schema';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

export async function addPermissions(data: z.infer<typeof Schema>) {
  try {
    await prisma.permission.createMany({
      data: data.permissions,
    });

    revalidatePath('users');
  } catch {
    throw new Error('Failed to add permissions.');
  }
}

export async function deletePermission(id: string) {
  try {
    await prisma.permission.delete({
      where: {
        id: id,
      },
    });

    revalidatePath('users');
  } catch {
    throw new Error('Failed to delete permissions.');
  }
}
