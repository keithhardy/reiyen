import { z } from 'zod';

export const Schema = z.object({
  id: z.string(),
  position: z
    .string()
    .min(3, { message: 'Name must be at least 3 characters long' })
    .max(55, { message: 'Name must not exceed 55 characters' }),
  signature: z.string().optional(),
});
