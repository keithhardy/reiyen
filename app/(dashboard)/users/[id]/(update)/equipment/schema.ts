import { z } from 'zod';

export const Schema = z.object({
  id: z.string().optional(),
  userId: z.string().min(1, { message: 'User ID cannot be empty' }),
  make: z.string().min(1, { message: 'Make cannot be empty' }),
  model: z.string().min(1, { message: 'Model cannot be empty' }),
  serialNumber: z.string().min(1, { message: 'Serial Number cannot be empty' }),
  testDate: z.string().min(1, { message: 'Test Date cannot be empty' }),
  certificateUrl: z.string().min(1, { message: 'Certificate URL cannot be empty' }),
  type: z.string().min(1, { message: 'Type cannot be empty' }),
});
