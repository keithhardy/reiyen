'use server';

import { revalidatePath } from 'next/cache';

import { Schema } from '@/app/(dashboard)/certificates/create/schema';
import { prisma } from '@/lib/prisma';
import { Certificate } from '@prisma/client';
import { z } from 'zod';

export async function createCertificate(
  certificate: z.infer<typeof Schema>
): Promise<Certificate> {
  try {
    const createdCertificate = await prisma.certificate.create({
      data: {
        certificateType: certificate.certificateType,
        date: certificate.date,
        userId: certificate.userId,
        status: certificate.status,
        propertyId: certificate.property.id,
      },
    });

    revalidatePath('/certificates');
    return createdCertificate;
  } catch (error) {
    console.log(error);
    throw new Error('Certificate creation failed');
  }
}
