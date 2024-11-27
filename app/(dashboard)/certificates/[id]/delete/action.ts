'use server';

import { Certificate } from '@prisma/client';
import { revalidatePath } from 'next/cache';

import { prisma } from '@/lib/prisma';

export async function deleteCertificate(
  certificate: Pick<Certificate, 'id'> & {
    certificateType: string;
  }
): Promise<void> {
  try {
    await prisma.certificate.delete({
      where: {
        id: certificate.id,
      },
    });

    revalidatePath('/certificates');
  } catch {
    throw new Error('Certificate deletion failed');
  }
}
