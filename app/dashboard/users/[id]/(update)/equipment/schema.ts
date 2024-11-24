import { z } from 'zod';

export const Schema = z.object({
  userId: z.string(),
  make: z.string(),
  model: z.string(),
  serialNumber: z.string(),
  testDate: z.string(),
  certificateUrl: z.string(),
  type: z.string(),
});
