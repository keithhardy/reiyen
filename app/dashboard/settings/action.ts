'use server';

import { Address, Settings } from '@prisma/client';
import { revalidatePath } from 'next/cache';

import { prisma } from '@/lib/prisma';
import { updateFile } from '@/lib/vercel-blob';

export async function updateSettings(
  data: Settings & { address: Address }
): Promise<Settings> {
  try {
    const settingsResponse = await prisma.settings.findUnique({
      where: { id: data.id },
    });
    const currentLogoUrl = settingsResponse?.logoUrl;

    let logoUrl;
    try {
      logoUrl = await updateFile(data.logoUrl, currentLogoUrl, 'logo');
    } catch {
      throw new Error('Failed to update settings: Error updating file.');
    }

    const updatedSettings = await prisma.settings.upsert({
      where: {
        id: data.id,
      },
      update: {
        name: data.name,
        email: data.email,
        phone: data.phone,
        logoUrl: logoUrl,
        governingBody: data.governingBody,
        governingBodyNumber: data.governingBodyNumber,
        address: {
          upsert: {
            update: {
              streetAddress: data.address.streetAddress,
              city: data.address.city,
              county: data.address.county,
              postTown: data.address.postTown,
              postcode: data.address.postcode,
              country: data.address.country,
            },
            create: {
              streetAddress: data.address.streetAddress,
              city: data.address.city,
              county: data.address.county,
              postTown: data.address.postTown,
              postcode: data.address.postcode,
              country: data.address.country,
            },
          },
        },
      },
      create: {
        id: data.id,
        name: data.name,
        email: data.email,
        phone: data.phone,
        logoUrl: logoUrl || '',
        governingBody: data.governingBody,
        governingBodyNumber: data.governingBodyNumber,
        address: {
          create: {
            streetAddress: data.address.streetAddress,
            city: data.address.city,
            county: data.address.county,
            postTown: data.address.postTown,
            postcode: data.address.postcode,
            country: data.address.country,
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
