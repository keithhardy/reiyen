'use server';

import { Preferences } from '@prisma/client';
import { revalidatePath } from 'next/cache';

import { prisma } from '@/lib/prisma';
import { updateFile } from '@/lib/vercel-blob';

export async function updatePreferences(data: Preferences): Promise<Preferences> {
  try {
    const preferencesResponse = await prisma.preferences.findUnique({
      where: { userId: data.userId },
    });
    const currentSignature = preferencesResponse?.signature;

    let signatureUrl;
    try {
      signatureUrl = await updateFile(data.signature, currentSignature, 'signature');
    } catch {
      throw new Error('Failed to update preferences: Error updating file.');
    }

    const updatedPreferences = await prisma.preferences.upsert({
      where: { userId: data.userId },
      update: {
        position: data.position,
        signature: signatureUrl || '',
      },
      create: {
        userId: data.userId,
        position: data.position,
        signature: signatureUrl || '',
      },
    });

    revalidatePath('/users');

    return updatedPreferences;
  } catch {
    throw new Error('Preferences update failed');
  }
}
