'use server';

import { revalidatePath } from 'next/cache';

import { Schema } from '@/app/(dashboard)/users/[id]/(update)/equipment/schema';
import { prisma } from '@/lib/prisma';
import { deleteFile, uploadFile } from '@/lib/vercel-blob';
import { z } from 'zod';

export async function createEquipment(
  equipment: z.infer<typeof Schema>
): Promise<void> {
  try {
    try {
      equipment.certificateUrl = await uploadFile(
        equipment.certificateUrl,
        'certifictate'
      );
    } catch {
      throw new Error('Equipment creation failed: Error updating file.');
    }

    await prisma.equipment.create({
      data: {
        userId: equipment.userId,
        type: equipment.type,
        make: equipment.make,
        model: equipment.model,
        serialNumber: equipment.serialNumber,
        testDate: equipment.testDate,
        certificateUrl: equipment.certificateUrl || '',
      },
    });

    revalidatePath('/users');
  } catch {
    throw new Error('Equipment creation failed');
  }
}

export async function deleteEquipment(
  equipment: z.infer<typeof Schema>
): Promise<void> {
  try {
    await prisma.equipment.delete({
      where: { id: equipment.id },
    });

    if (equipment.certificateUrl) {
      await deleteFile(equipment.certificateUrl);
    }

    revalidatePath('/users/[id]/equipment');
  } catch {
    throw new Error('Equipment deletion failed');
  }
}
