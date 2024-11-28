import { z } from 'zod';

export const Schema = z.object({
  name: z.string().optional(),
  email: z.string().optional(),
  password: z.string().optional(),
});
