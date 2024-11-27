import { $Enums } from '@prisma/client';
import { z } from 'zod';

const CertificateTypeValues = Object.values($Enums.CertificateType) as [string, ...string[]];

export const Schema = z.object({
  certificateType: z.enum(CertificateTypeValues),
  propertyId: z.string().optional(),
  date: z.string(),
  technicianId: z.string(),
  technicianSignature: z.string().optional(),
  technicianSignatureDate: z.string().optional(),
  supervisorId: z.string().optional(),
  supervisorSignature: z.string().optional(),
  supervisorSignatureDate: z.string().optional(),
  status: z.string(),
  property: z.object({
    id: z.string().min(1, { message: 'Property cannot be empty' }),
    client: z.object({
      id: z.string().min(1, { message: 'Client cannot be empty' }),
    }),
  }),
});
