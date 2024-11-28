import { z } from 'zod';

export const Schema = z.object({
  id: z.string().optional(),
  userId: z.string().optional(),
  make: z.string().optional(),
  model: z.string().optional(),
  serialNumber: z.string().optional(),
  testDate: z.string().optional(),
  certificateUrl: z.string().optional(),
  type: z.string().optional(),
});
