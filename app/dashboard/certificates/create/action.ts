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
  try {
    const createdCertificate = await prisma.certificate.create({
      data: {
        type: certificate.type,
        property: {
          connect: {
            id: certificate.property.id,
          },
        },
        electricalInstallationConditionReport: {
          create: {

          }
        }
      },
    });

    revalidatePath('/certificates');

    return createdCertificate;
  } catch(error) {
    console.log(error)
    throw new Error('Certificate create failed');
  }
}
