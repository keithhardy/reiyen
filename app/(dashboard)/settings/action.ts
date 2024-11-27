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
    const currentLogoUrl = settingsResponse?.logoUrl;

    let logoUrl;
    try {
      logoUrl = await updateFile(settings.logoUrl, currentLogoUrl, 'logo');
    } catch {
      throw new Error('Failed to update settings: Error updating file.');
    }

    if (settingsResponse) {
      const updatedSettings = await prisma.settings.update({
        where: { id: settingsResponse.id },
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
    } else {
      const createdSettings = await prisma.settings.create({
        data: {
          name: settings.name,
          email: settings.email,
          phone: settings.phone,
          logoUrl: logoUrl || '',
          governingBody: settings.governingBody,
          governingBodyNumber: settings.governingBodyNumber,
          address: {
            create: {
              streetAddress: settings.address?.streetAddress || '',
              city: settings.address?.city || '',
              county: settings.address?.county || '',
              postTown: settings.address?.postTown || '',
              postcode: settings.address?.postcode || '',
              country: settings.address?.country || '',
            },
          },
        },
      });

      revalidatePath('/settings');
      return createdSettings;
    }
  } catch {
    throw new Error('Settings update failed');
  }
}
