'use server';

import { Certificate, Client, Property } from '@prisma/client';
import { revalidatePath } from 'next/cache';

import { prisma } from '@/lib/prisma';

export async function createCertificate(
  certificate: Omit<
    Certificate,
    'id' | 'propertyId' | 'createdAt' | 'updatedAt'
  > & {
    property: Pick<Property, 'id'> & {
      client: Pick<Client, 'id'>;
    };
  }
): Promise<Certificate> {
  console.log(certificate);
  try {
    const createdCertificate = await prisma.certificate.create({
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

    return createdCertificate;
  } catch {
    throw new Error('Certificate create failed');
  }
}
