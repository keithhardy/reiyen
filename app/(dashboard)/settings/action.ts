'use server';

import { revalidatePath } from 'next/cache';

import { Schema } from '@/app/(dashboard)/settings/schema';
import { prisma } from '@/lib/prisma';
import { updateFile } from '@/lib/vercel-blob';
import { Settings } from '@prisma/client';
import { z } from 'zod';

export async function updateSettings(
  settings: z.infer<typeof Schema>
): Promise<Settings> {
  try {
    const settingsResponse = await prisma.settings.findFirst();

    try {
      settings.logoUrl = await updateFile(
        settings.logoUrl,
        settingsResponse?.logoUrl,
        'logo'
      );
    } catch {
      throw new Error('Settings update failed: Error updating file.');
    }

    const updatedSettings = await prisma.settings.update({
      where: {
        id: settings.id,
      },
      data: {
        name: settings.name,
        email: settings.email,
        phone: settings.phone,
        logoUrl: settings.logoUrl,
        governingBody: settings.governingBody,
        governingBodyNumber: settings.governingBodyNumber,
        address: {
          update: {
            streetAddress: settings.address?.streetAddress,
            city: settings.address?.city,
            county: settings.address?.county,
            postTown: settings.address?.postTown,
            postcode: settings.address?.postcode,
            country: settings.address?.country,
          },
        },
      },
    });

    revalidatePath('/settings');
    return updatedSettings;
  } catch (error) {
    console.log(error);
    throw new Error('Settings update failed');
  }
}
