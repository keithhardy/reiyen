'use server';

import { Equipment } from '@prisma/client';
import { revalidatePath } from 'next/cache';

import { prisma } from '@/lib/prisma';
import { deleteFile, uploadFile } from '@/lib/vercel-blob';

export async function createEquipment(
  equipment: Omit<Equipment, 'id'>
): Promise<void> {
  try {
    let certificateUrl = equipment.certificateUrl;

    try {
      if (certificateUrl) {
        const fileName = `certificate-${Date.now()}.png`;
        certificateUrl = await uploadFile(certificateUrl, fileName);
      }
    } catch {
      throw new Error('Failed to create certificate: Error updating file.');
    }

    await prisma.equipment.create({
      data: {
        userId: equipment.userId,
        type: equipment.type,
        make: equipment.make,
        model: equipment.model,
        serialNumber: equipment.serialNumber,
        testDate: equipment.testDate,
        certificateUrl,
      },
    });

    revalidatePath('/users');
  } catch (error) {
    console.error('Failed to create equipment:', error);
    throw new Error('Equipment creation failed');
  }
}

export async function deleteEquipment(
  equipment: Pick<Equipment, 'id' | 'certificateUrl'>
): Promise<void> {
  try {
    if (equipment.certificateUrl) {
      await deleteFile(equipment.certificateUrl);
    }

    await prisma.equipment.delete({
      where: { id: equipment.id },
    });

    revalidatePath('/users');
  } catch (error) {
    console.error('Failed to delete equipment:', error);
    throw new Error('Equipment deletion failed');
  }
}
