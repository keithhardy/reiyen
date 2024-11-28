'use server';

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
    throw new Error('Failed to add permissions.');
  }
}
