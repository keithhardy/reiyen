import { z } from 'zod';

export const Schema = z.object({
  id: z.string().optional(),
  userId: z.string(),
  make: z.string(),
  model: z.string(),
  serialNumber: z.string(),
  testDate: z.string(),
  certificateUrl: z.string().optional(),
  type: z.string(),
});
