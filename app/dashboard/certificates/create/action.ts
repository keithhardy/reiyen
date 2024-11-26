'use server';

import { Certificate, Client, Property } from '@prisma/client';
import { revalidatePath } from 'next/cache';

import { prisma } from '@/lib/prisma';

export async function createCertificate(
  certificate: Omit<
    Certificate,
    'id' | 'propertyId' | 'createdAt' | 'updatedAt'
  > & {
    property: Pick<Property, 'id'> & {
      client: Pick<Client, 'id'>;
    };
  }
): Promise<Certificate> {
  try {
    const typeData: Record<string, unknown> = {};

    switch (certificate.type) {
      case 'ELECTRICAL_INSTALLATION_CONDITION_REPORT':
        typeData.electricalInstallationConditionReport = { create: {} };
        break;
      case 'ELECTRICAL_INSTALLATION_CERTIFICATE':
        typeData.electricalInstallationCertificate = { create: {} };
        break;
      case 'MINOR_WORKS':
        typeData.minorWorks = { create: {} };
        break;
      case 'FIRE_SAFETY_DESIGN_SUMMARY':
        typeData.fireSafetyDesignSummary = { create: {} };
        break;
      case 'DOMESTIC_VENTILATION_COMMISSIONING_SHEET':
        typeData.domesticVentilationCommissioningSheet = { create: {} };
        break;
      default:
        throw new Error(`Unsupported certificate type: ${certificate.type}`);
    }

    const createdCertificate = await prisma.certificate.create({
      data: {
        type: certificate.type,
        property: {
          connect: {
            id: certificate.property.id,
          },
        },
        ...typeData,
      },
    });

    revalidatePath('/certificates');

    return createdCertificate;
  } catch (error) {
    console.error('Certificate creation failed:', error);
    throw new Error('Certificate creation failed');
  }
}
