import { z } from 'zod';

export const Schema = z.object({
  id: z.string(),
  name: z.string(),
  logoUrl: z.string().optional(),
});
