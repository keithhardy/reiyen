'use server';

import { Certificate } from '@prisma/client';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';

import { Schema } from '@/app/(dashboard)/certificates/create/schema';
import { auth0 } from '@/lib/auth0';
import { prisma } from '@/lib/prisma';

export async function createCertificate(certificate: z.infer<typeof Schema>): Promise<Certificate> {
  const session = await auth0.getSession();

  if (!session) {
    throw new Error('No logged in user');
  }

  try {
    const createdCertificate = await prisma.certificate.create({
      data: {
        certificateType: certificate.certificateType,
        date: certificate.date,
        technicianId: session.user.sub,
        status: certificate.status,
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
    throw new Error('Certificate creation failed');
  }
}
