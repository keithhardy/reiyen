import { $Enums } from '@prisma/client';
import { z } from 'zod';

const CertificateTypeValues = [
  $Enums.CertificateType.MINOR_WORKS,
  $Enums.CertificateType.ELECTRICAL_INSTALLATION_CERTIFICATE,
  $Enums.CertificateType.ELECTRICAL_INSTALLATION_CONDITION_REPORT,
  $Enums.CertificateType.FIRE_SAFETY_DESIGN_SUMMARY,
  $Enums.CertificateType.DOMESTIC_VENTILATION_COMMISSIONING_SHEET,
] as const;

const StatusValues = [
  $Enums.CertificateStatus.IN_PROGRESS,
  $Enums.CertificateStatus.READY_FOR_SUPERVISOR,
  $Enums.CertificateStatus.COMPLETE,
] as const;

export const Schema = z.object({
  certificateType: z.enum(CertificateTypeValues),
  date: z.date(),
  userId: z.string(),
  status: z.enum(StatusValues),
  property: z.object({
    id: z.string(),
  }),
});
