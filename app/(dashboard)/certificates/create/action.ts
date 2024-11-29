'use server';

import { revalidatePath } from 'next/cache';

import { Schema } from '@/app/(dashboard)/certificates/create/schema';
import { auth0 } from '@/lib/auth0';
import { prisma } from '@/lib/prisma';
import { Certificate } from '@prisma/client';
import { z } from 'zod';

export async function createCertificate(
  certificate: z.infer<typeof Schema>
): Promise<Certificate> {
  const session = await auth0.getSession();

  try {
    const createdCertificate = await prisma.certificate.create({
      data: {
        certificateType: certificate.certificateType,
        date: certificate.date,
        technicianId: session!.user.sub,
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
