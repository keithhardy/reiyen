import { $Enums } from '@prisma/client';
import { z } from 'zod';

const CertificateTypeValues = [$Enums.CertificateType.MINOR_WORKS, $Enums.CertificateType.ELECTRICAL_INSTALLATION_CERTIFICATE, $Enums.CertificateType.ELECTRICAL_INSTALLATION_CONDITION_REPORT, $Enums.CertificateType.FIRE_SAFETY_DESIGN_SUMMARY, $Enums.CertificateType.DOMESTIC_VENTILATION_COMMISSIONING_SHEET] as const;

export const Schema = z.object({
  certificateType: z.enum(CertificateTypeValues).optional(),
  date: z.date().optional(),
  technicianId: z.string().optional(),
  status: z.string().optional(),
  property: z.object({
    id: z.string().optional(),
  }),
});
