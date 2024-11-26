'use server';

import { Certificate } from '@prisma/client';
import { revalidatePath } from 'next/cache';

import { prisma } from '@/lib/prisma';

export async function createCertificate(
  certificate: Omit<Certificate, 'id' | 'createdAt' | 'updatedAt'>
): Promise<Certificate> {
  try {
    const createdCertificate = await prisma.certificate.create({
      data: {
        certificateType: certificate.certificateType,
      },
    });

    revalidatePath('/certificates');

    return createdCertificate;
  } catch (error) {
    console.error('Certificate creation failed:', error);
    throw new Error('Certificate creation failed');
  }
}
