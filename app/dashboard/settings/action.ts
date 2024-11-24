'use server';

import { Address, Settings } from '@prisma/client';
import { revalidatePath } from 'next/cache';

import { prisma } from '@/lib/prisma';
import { updateFile } from '@/lib/vercel-blob';

export async function updateSettings(
  settings: Omit<Settings, 'createdAt' | 'updatedAt'> & { address: Address }
): Promise<Settings> {
  try {
    const settingsResponse = await prisma.settings.findUnique({
      where: { id: settings.id },
    });
    const currentLogoUrl = settingsResponse?.logoUrl;

    let logoUrl;
    try {
      logoUrl = await updateFile(settings.logoUrl, currentLogoUrl, 'logo');
    } catch {
      throw new Error('Failed to update settings: Error updating file.');
    }

    const updatedSettings = await prisma.settings.upsert({
      where: {
        id: settings.id,
      },
      update: {
        name: settings.name,
        email: settings.email,
        phone: settings.phone,
        logoUrl: logoUrl,
        governingBody: settings.governingBody,
        governingBodyNumber: settings.governingBodyNumber,
        address: {
          upsert: {
            update: {
              streetAddress: settings.address.streetAddress,
              city: settings.address.city,
              county: settings.address.county,
              postTown: settings.address.postTown,
              postcode: settings.address.postcode,
              country: settings.address.country,
            },
            create: {
              streetAddress: settings.address.streetAddress,
              city: settings.address.city,
              county: settings.address.county,
              postTown: settings.address.postTown,
              postcode: settings.address.postcode,
              country: settings.address.country,
            },
          },
        },
      },
      create: {
        id: settings.id,
        name: settings.name,
        email: settings.email,
        phone: settings.phone,
        logoUrl: logoUrl || '',
        governingBody: settings.governingBody,
        governingBodyNumber: settings.governingBodyNumber,
        address: {
          create: {
            streetAddress: settings.address.streetAddress,
            city: settings.address.city,
            county: settings.address.county,
            postTown: settings.address.postTown,
            postcode: settings.address.postcode,
            country: settings.address.country,
          },
        },
      },
    });

    revalidatePath('/settings');

    return updatedSettings;
  } catch {
    throw new Error('Settings update failed');
  }
}
