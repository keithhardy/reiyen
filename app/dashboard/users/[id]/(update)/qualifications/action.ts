'use server';

import { Qualification } from '@prisma/client';
import { revalidatePath } from 'next/cache';

import { prisma } from '@/lib/prisma';
import { deleteFile, uploadFile } from '@/lib/vercel-blob';

export async function createQualification(
  qualification: Omit<Qualification, 'id'>
): Promise<void> {
  try {
    let certificateUrl = qualification.certificateUrl;

    if (certificateUrl) {
      const fileName = `certificate-${Date.now()}.png`;
      certificateUrl = await uploadFile(certificateUrl, fileName);
    }

    await prisma.qualification.create({
      data: {
        userId: qualification.userId,
        awardingBody: qualification.awardingBody,
        qualification: qualification.qualification,
        qualificationNumber: qualification.qualificationNumber,
        awardDate: qualification.awardDate,
        certificateUrl,
      },
    });

    revalidatePath('/users');
  } catch (error) {
    console.error('Failed to create qualification:', error);
    throw new Error('Qualification creation failed');
  }
}

export async function deleteQualification(
  qualification: Qualification
): Promise<void> {
  try {
    if (qualification.certificateUrl) {
      await deleteFile(qualification.certificateUrl);
    }

    await prisma.qualification.delete({
      where: { id: qualification.id },
    });

    revalidatePath('/users');
  } catch (error) {
    console.error('Failed to delete qualification:', error);
    throw new Error('Qualification deletion failed');
  }
}
