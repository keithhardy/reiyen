import { z } from 'zod';

export const Schema = z.object({
  id: z.string().min(1, { message: 'ID cannot be empty' }),
  name: z.string().min(1, { message: 'Name cannot be empty' }),
  logoUrl: z.string().optional(),
});
