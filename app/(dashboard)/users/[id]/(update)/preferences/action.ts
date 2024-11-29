'use server';

import { revalidatePath } from 'next/cache';

import { Schema } from '@/app/(dashboard)/users/[id]/(update)/preferences/schema';
import { prisma } from '@/lib/prisma';
import { updateFile } from '@/lib/vercel-blob';
import { Preferences } from '@prisma/client';
import { z } from 'zod';

export async function updatePreferences(
  preferences: z.infer<typeof Schema>
): Promise<Preferences> {
  try {
    const preferencesResponse = await prisma.preferences.findFirst({
      where: { id: preferences.id },
    });

    try {
      preferences.signature = await updateFile(
        preferences.signature,
        preferencesResponse?.signature,
        'signature'
      );
    } catch {
      throw new Error('Preferences update failed: Error updating file.');
    }

    const updatedPreferences = await prisma.preferences.update({
      where: {
        id: preferences.id,
      },
      data: {
        position: preferences.position,
        signature: preferences.signature,
      },
    });

    revalidatePath('/users');
    return updatedPreferences;
  } catch {
    throw new Error('Preferences update failed');
  }
}
