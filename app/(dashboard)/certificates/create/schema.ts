import { $Enums } from '@prisma/client';
import { z } from 'zod';

const CertificateTypeValues = Object.values($Enums.CertificateType) as [string, ...string[]];

export const Schema = z.object({
  certificateType: z.enum(CertificateTypeValues),
});
