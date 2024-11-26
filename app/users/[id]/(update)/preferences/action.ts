'use server';

import { Preferences } from '@prisma/client';
import { revalidatePath } from 'next/cache';

import { prisma } from '@/lib/prisma';
import { updateFile } from '@/lib/vercel-blob';

export async function updatePreferences(
  preferences: Preferences
): Promise<Preferences> {
  try {
    const preferencesResponse = await prisma.preferences.findUnique({
      where: { userId: preferences.userId },
    });
    const currentSignature = preferencesResponse?.signature;

    let signatureUrl;
    try {
      signatureUrl = await updateFile(
        preferences.signature,
        currentSignature,
        'signature'
      );
    } catch {
      throw new Error('Failed to update preferences: Error updating file.');
    }

    const updatedPreferences = await prisma.preferences.upsert({
      where: {
        userId: preferences.userId,
      },
      update: {
        position: preferences.position,
        signature: signatureUrl,
      },
      create: {
        userId: preferences.userId,
        position: preferences.position,
        signature: signatureUrl || '',
      },
    });

    revalidatePath('/users');

    return updatedPreferences;
  } catch {
    throw new Error('Preferences update failed');
  }
}
