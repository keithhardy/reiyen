'use server';

import { Certificate, Property } from '@prisma/client';
import { revalidatePath } from 'next/cache';

import { prisma } from '@/lib/prisma';

export async function updateCertificate(
  certificate: Pick<Certificate, 'id'> & {
    property: Pick<Property, 'id'>;
  }
): Promise<void> {
  try {
    await prisma.certificate.update({
      where: {
        id: certificate.id,
      },
      data: {
        property: {
          connect: {
            id: certificate.property.id,
          },
        },
      },
    });

    revalidatePath('/certificates');
  } catch {
    throw new Error('Certificate update failed');
  }
}
