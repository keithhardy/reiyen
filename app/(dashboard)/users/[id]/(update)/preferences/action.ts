'use server';

import { Preferences } from '@prisma/client';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';

import { Schema } from '@/app/(dashboard)/users/[id]/(update)/preferences/schema';
import { prisma } from '@/lib/prisma';
import { updateFile } from '@/lib/vercel-blob';

export async function updatePreferences(preferences: z.infer<typeof Schema>): Promise<Preferences> {
  try {
    const preferencesResponse = await prisma.preferences.findFirst({ where: { id: preferences.id } });

    let signatureUrl;
    try {
      signatureUrl = await updateFile(preferences.signature, preferencesResponse?.signature, 'signature');
    } catch {
      throw new Error('Failed to update preferences: Error updating file.');
    }

    const updatedPreferences = await prisma.preferences.update({
      where: {
        id: preferences.id,
      },
      data: {
        position: preferences.position,
        signature: signatureUrl,
      },
    });

    revalidatePath('/users');
    return updatedPreferences;
  } catch {
    throw new Error('Preferences update failed');
  }
}
