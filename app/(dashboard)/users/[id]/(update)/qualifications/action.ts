'use server';

import { revalidatePath } from 'next/cache';

import { Schema } from '@/app/(dashboard)/users/[id]/(update)/qualifications/schema';
import { prisma } from '@/lib/prisma';
import { deleteFile, uploadFile } from '@/lib/vercel-blob';
import { z } from 'zod';

export async function createQualification(
  qualification: z.infer<typeof Schema>
): Promise<void> {
  try {
    try {
      qualification.certificateUrl = await uploadFile(
        qualification.certificateUrl,
        'certifictate'
      );
    } catch {
      throw new Error('Qualification creation failed: Error updating file.');
    }

    await prisma.qualification.create({
      data: {
        userId: qualification.userId,
        awardingBody: qualification.awardingBody,
        qualification: qualification.qualification,
        qualificationNumber: qualification.qualificationNumber,
        awardDate: qualification.awardDate,
        certificateUrl: qualification.certificateUrl || '',
      },
    });

    revalidatePath('/users/[id]/qualifications');
  } catch {
    throw new Error('Qualification creation failed');
  }
}

export async function deleteQualification(
  qualification: z.infer<typeof Schema>
): Promise<void> {
  try {
    await prisma.qualification.delete({
      where: { id: qualification.id },
    });

    if (qualification.certificateUrl) {
      await deleteFile(qualification.certificateUrl);
    }

    revalidatePath('/users/[id]/qualifications');
  } catch {
    throw new Error('Qualification deletion failed');
  }
}
