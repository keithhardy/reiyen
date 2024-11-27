import { z } from 'zod';

export const Schema = z.object({
  id: z.string().optional(),
  position: z.string().optional(),
  signature: z.string().optional(),
});
