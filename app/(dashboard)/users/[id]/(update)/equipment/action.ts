'use server';

import { Equipment } from '@prisma/client';
import { revalidatePath } from 'next/cache';

import { prisma } from '@/lib/prisma';
import { deleteFile, uploadFile } from '@/lib/vercel-blob';

export async function createEquipment(equipment: Omit<Equipment, 'id'>): Promise<void> {
  try {
    let certificateUrl;
    try {
      certificateUrl = await uploadFile(equipment.certificateUrl, 'certifictate');
    } catch {
      throw new Error('Failed to create qualification: Error updating file.');
    }

    await prisma.equipment.create({
      data: {
        userId: equipment.userId,
        type: equipment.type,
        make: equipment.make,
        model: equipment.model,
        serialNumber: equipment.serialNumber,
        testDate: equipment.testDate,
        certificateUrl: certificateUrl || '',
      },
    });

    revalidatePath('/users');
  } catch {
    throw new Error('Equipment creation failed');
  }
}

export async function deleteEquipment(
  equipment: Pick<Equipment, 'id' | 'certificateUrl'>
): Promise<void> {
  try {
    await prisma.equipment.delete({
      where: { id: equipment.id },
    });

    if (equipment.certificateUrl) {
      await deleteFile(equipment.certificateUrl);
    }

    revalidatePath('/users');
  } catch {
    throw new Error('Equipment deletion failed');
  }
}
