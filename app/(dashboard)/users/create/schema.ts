import { z } from 'zod';

export const Schema = z.object({
  name: z.string().min(3).max(55),
  email: z.string().email(),
  password: z.string().min(7).max(55),
});
