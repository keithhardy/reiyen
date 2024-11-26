'use server';

import { Address, Settings } from '@prisma/client';
import { revalidatePath } from 'next/cache';

import { prisma } from '@/lib/prisma';
import { updateFile } from '@/lib/vercel-blob';

export async function updateSettings(
  settings: Omit<Settings, 'createdAt' | 'updatedAt'> & {
    address: Omit<Address, 'createdAt' | 'updatedAt' | 'settingsId' | 'clientId' | 'propertyId'> | null;
  }
): Promise<Settings> {
  try {
    const settingsResponse = await prisma.settings.findFirst();

    let logoUrl;
    try {
      logoUrl = await updateFile(settings.logoUrl, settingsResponse?.logoUrl, 'logo');
    } catch {
      throw new Error('Failed to update settings: Error updating file.');
    }

    const updatedSettings = await prisma.settings.update({
      where: {
        id: settings.id,
      },
      data: {
        name: settings.name,
        email: settings.email,
        phone: settings.phone,
        logoUrl: logoUrl,
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
