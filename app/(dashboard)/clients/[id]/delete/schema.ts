import { z } from 'zod';

export const Schema = z.object({
  id: z.string().optional(),
  name: z.string().optional(),
  logoUrl: z.string().optional(),
});
