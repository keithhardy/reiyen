import { z } from 'zod';

export const Schema = z.object({
  id: z.string(),
  position: z
    .string()
    .min(5, { message: 'Name should be at least 5 characters long.' })
    .max(50, { message: 'Name should not exceed 50 characters.' }),
  signature: z.string(),
  userId: z.string(),
});
