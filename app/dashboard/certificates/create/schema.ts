import { $Enums } from '@prisma/client';
import { z } from 'zod';

const CertificateTypeValues = Object.values($Enums.CertificateType) as [string, ...string[]];

export const Schema = z.object({
  type: z.enum(CertificateTypeValues),
  property: z.object({
    id: z.string().min(1, { message: 'Property cannot be empty' }),
    client: z.object({
      id: z.string().min(1, { message: 'Client cannot be empty' }),
    }),
  }),
});
