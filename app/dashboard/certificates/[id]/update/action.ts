'use server';

import { Certificate, Property } from '@prisma/client';
import { revalidatePath } from 'next/cache';

import { prisma } from '@/lib/prisma';

export async function updateCertificate(
  certificate: Pick<Certificate, 'id' | 'name'> & {
    property: Pick<Property, 'id'>;
  }
): Promise<void> {
  try {
    await prisma.certificate.update({
      where: {
        id: certificate.id,
      },
      data: {
        name: certificate.name,
        property: {
          connect: {
            id: certificate.property.id,
          },
        },
      },
    });

    revalidatePath('/certificates');
  } catch(error) {
    console.log(error)
    throw new Error('Certificate update failed');
  }
}
