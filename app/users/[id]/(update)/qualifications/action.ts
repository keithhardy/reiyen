'use server';

import { Qualification } from '@prisma/client';
import { revalidatePath } from 'next/cache';

import { prisma } from '@/lib/prisma';
import { deleteFile, uploadFile } from '@/lib/vercel-blob';

export async function createQualification(qualification: Omit<Qualification, 'id'>): Promise<void> {
  try {
    let certificateUrl;
    try {
      certificateUrl = await uploadFile(qualification.certificateUrl, 'certifictate');
    } catch {
      throw new Error('Failed to create qualification: Error updating file.');
    }

    await prisma.qualification.create({
      data: {
        userId: qualification.userId,
        awardingBody: qualification.awardingBody,
        qualification: qualification.qualification,
        qualificationNumber: qualification.qualificationNumber,
        awardDate: qualification.awardDate,
        certificateUrl: certificateUrl || '',
      },
    });

    revalidatePath('/users');
  } catch {
    throw new Error('Qualification creation failed');
  }
}

export async function deleteQualification(qualification: Qualification): Promise<void> {
  try {
    await prisma.qualification.delete({
      where: { id: qualification.id },
    });

    if (qualification.certificateUrl) {
      await deleteFile(qualification.certificateUrl);
    }

    revalidatePath('/users');
  } catch {
    throw new Error('Qualification deletion failed');
  }
}
