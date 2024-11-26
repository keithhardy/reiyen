import { z } from 'zod';

export const Schema = z.object({
  id: z.string().optional(),
  position: z
    .string()
    .min(5, { message: 'Name should be at least 5 characters long.' })
    .max(50, { message: 'Name should not exceed 50 characters.' }),
  signature: z.string().optional(),
  userId: z.string().min(1, { message: 'User ID cannot be empty' }),
});
